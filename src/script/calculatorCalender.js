import { NGAYHOANGDAO_NGAYHACDAO } from "./Constant";

const getSunLongitude = (jdn, timeZone) => {
  var T, T2, dr, M, L0, DL, L;
  T = Math.floor((jdn - 2451545.5 - timeZone / 24) / 36525); // Time in Julian centuries from 2000-01-01 12:00:00 GMT
  T2 = T * T;
  dr = Math.PI / 180; // degree to radian
  M = 357.5291 + 35999.0503 * T - 0.0001559 * T2 - 0.00000048 * T * T2; // mean anomaly, degree
  L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2; // mean longitude, degree
  DL = (1.9146 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
  DL =
    DL +
    (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) +
    0.00029 * Math.sin(dr * 3 * M);
  L = L0 + DL; // true longitude, degree
  L = L * dr;
  L = L - Math.PI * 2 * Math.floor(L / (Math.PI * 2)); // Normalize to (0, 2*PI)
  return Math.floor((L / Math.PI) * 6);
};

const getLeapMonthOffset = (a11, timeZone) => {
  var k, last, arc, i;
  k = Math.floor((a11 - 2415021.076998695) / 29.530588853 + 0.5);
  last = 0;
  i = 1; // We start with the month following lunar month 11
  arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
  do {
    last = arc;
    i++;
    arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
  } while (arc != last && i < 14);
  return i - 1;
};
const jdFromDate = (dd, mm, yy) => {
  var a, y, m, jd;
  a = Math.floor((14 - mm) / 12);
  y = yy + 4800 - a;
  m = mm + 12 * a - 3;
  jd =
    dd +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045;
  if (jd < 2299161) {
    jd =
      dd + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - 32083;
  }
  return jd;
};

const getLunarMonth11 = (yy, timeZone) => {
  var k, off, nm, sunLong;
  off = jdFromDate(31, 12, yy) - 2415021;
  k = Math.floor(off / 29.530588853);
  nm = getNewMoonDay(k, timeZone);
  sunLong = getSunLongitude(nm, timeZone); // sun longitude at local midnight
  if (sunLong >= 9) {
    nm = getNewMoonDay(k - 1, timeZone);
  }
  return nm;
};

const getNewMoonDay = (k, timeZone) => {
  var T, T2, T3, dr, Jd1, M, Mpr, F, C1, deltat, JdNew;
  T = k / 1236.85; // Time in Julian centuries from 1900 January 0.5
  T2 = T * T;
  T3 = T2 * T;
  dr = Math.PI / 180;
  Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
  Jd1 = Jd1 + 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr); // Mean new moon
  M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3; // Sun's mean anomaly
  Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3; // Moon's mean anomaly
  F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3; // Moon's argument of latitude
  C1 =
    (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
  C1 = C1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr);
  C1 = C1 - 0.0004 * Math.sin(dr * 3 * Mpr);
  C1 = C1 + 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
  C1 =
    C1 -
    0.0074 * Math.sin(dr * (M - Mpr)) +
    0.0004 * Math.sin(dr * (2 * F + M));
  C1 =
    C1 -
    0.0004 * Math.sin(dr * (2 * F - M)) -
    0.0006 * Math.sin(dr * (2 * F + Mpr));
  C1 =
    C1 +
    0.001 * Math.sin(dr * (2 * F - Mpr)) +
    0.0005 * Math.sin(dr * (2 * Mpr + M));
  if (T < -11) {
    deltat =
      0.001 +
      0.000839 * T +
      0.0002261 * T2 -
      0.00000845 * T3 -
      0.000000081 * T * T3;
  } else {
    deltat = -0.000278 + 0.000265 * T + 0.000262 * T2;
  }
  JdNew = Jd1 + C1 - deltat;
  return Math.floor(JdNew + 0.5 + timeZone / 24);
};

const convertSolar2Lunar = (dd, mm, yy, timeZone) => {
  var k,
    dayNumber,
    monthStart,
    a11,
    b11,
    lunarDay,
    lunarMonth,
    lunarYear,
    lunarLeap;
  dayNumber = jdFromDate(dd, mm, yy);
  k = Math.floor((dayNumber - 2415021.076998695) / 29.530588853);
  monthStart = getNewMoonDay(k + 1, timeZone);
  if (monthStart > dayNumber) {
    monthStart = getNewMoonDay(k, timeZone);
  }
  a11 = getLunarMonth11(yy, timeZone);
  b11 = a11;
  if (a11 >= monthStart) {
    lunarYear = yy;
    a11 = getLunarMonth11(yy - 1, timeZone);
  } else {
    lunarYear = yy + 1;
    b11 = getLunarMonth11(yy + 1, timeZone);
  }
  lunarDay = dayNumber - monthStart + 1;
  let diff = Math.floor((monthStart - a11) / 29);
  lunarLeap = 0;
  lunarMonth = diff + 11;
  if (b11 - a11 > 365) {
    let leapMonthDiff = getLeapMonthOffset(a11, timeZone);
    if (diff >= leapMonthDiff) {
      lunarMonth = diff + 10;
      if (diff === leapMonthDiff) {
        lunarLeap = 1;
      }
    }
  }
  if (lunarMonth > 12) {
    lunarMonth = lunarMonth - 12;
  }
  if (lunarMonth >= 11 && diff < 4) {
    lunarYear -= 1;
  }
  return { lunarDay, lunarMonth, lunarYear };
};
export const Gregorian2JD = (d, m, y) => {
  return (
    (1461 * (y + 4800 + (m - 14) / 12)) / 4 +
    (367 * (m - 2 - 12 * ((m - 14) / 12))) / 12 -
    (3 * ((y + 4900 + (m - 14) / 12) / 100)) / 4 +
    d -
    32075
  );
};

export const DefineHacDaoHoangDao = (m, NgayHoangDao) => {
  const arr = NGAYHOANGDAO_NGAYHACDAO[Math.floor(m % 6)];
  return arr?.hoangDao?.includes(NgayHoangDao);
};
export default convertSolar2Lunar;
