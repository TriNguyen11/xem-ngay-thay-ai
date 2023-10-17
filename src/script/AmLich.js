// AmLich
// Prepared by Harry Tran (a.k.a Thiên Y) in USA (email: thien.y@operamail.com)

//*****************************************************************************
//                                   Nhật kì tư liệu
//*****************************************************************************

var amLich = [
  0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0,
  0x09ad0, 0x055d2, 0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540,
  0x0d6a0, 0x0ada2, 0x095b0, 0x14977, 0x04970, 0x0a4b0, 0x0b4b5, 0x06a50,
  0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, 0x06566, 0x0d4a0,
  0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
  0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2,
  0x0a950, 0x0b557, 0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5d0, 0x14573,
  0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, 0x0aea6, 0x0ab50, 0x04b60, 0x0aae4,
  0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, 0x096d0, 0x04dd5,
  0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b5a0, 0x195a6,
  0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46,
  0x0ab60, 0x09570, 0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58,
  0x055c0, 0x0ab60, 0x096d5, 0x092e0, 0x0c960, 0x0d954, 0x0d4a0, 0x0da50,
  0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, 0x0a950, 0x0b4a0,
  0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
  0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260,
  0x0ea65, 0x0d530, 0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0,
  0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, 0x0b5a0, 0x056d0, 0x055b2, 0x049b0,
  0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, 0x04b63, 0x0937f,
  0x049f8, 0x04970, 0x064b0, 0x068a6, 0x0ea5f, 0x06b20, 0x0a6c4, 0x0aaef,
  0x092e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0,
  0x0a6d0, 0x055d4, 0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50,
  0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, 0x0b273, 0x06930, 0x07337, 0x06aa0,
  0x0ad50, 0x04b55, 0x04b6f, 0x0a570, 0x054e4, 0x0d260, 0x0e968, 0x0d520,
  0x0daa0, 0x06aa6, 0x056df, 0x04ae0, 0x0a9d4, 0x0a4d0, 0x0d150, 0x0f252,
  0x0d520,
];

//== y là năm Âm Lịch
export function lunarYearDays(y) {
  var i,
    sum = 348;
  for (i = 0x8000; i > 0x8; i >>= 1) sum += amLich[y - 1900] & i ? 1 : 0;
  return sum + leapDays(y);
}

export function getPhatLich(ld, lm, ly) {
  ld = ld == null ? this.dd : ld;
  lm = lm == null ? this.mm : lm;
  ly = ly == null ? this.yy : ly;
  return lm > 4 || (lm >= 4 && ld >= 15) ? ly + 544 : ly + 544 - 1;
}

//== y là năm Âm Lịch, trở về tháng 29 hay 30 ngày
export function leapDays(y) {
  if (leapMonth(y)) return amLich[y - 1900] & 0x10000 ? 30 : 29;
  else return 0;
}

//== y là năm Âm Lịch
export function leapMonth(y) {
  return amLich[y - 1900] & 0xf;
}

//== y là năm Âm Lịch, m là tháng Âm Lịch
export function monthDays(y, m) {
  return amLich[y - 1900] & (0x10000 >> m) ? 30 : 29;
}

//== Input Solar Date Format; return Lunar Date Object
export const LunarDate = (day, month, year) => {
  let daySolar = day;
  let monthSolar = month;
  let yearSolar = year;

  if (year < 1900) year = 1900;
  else if (year > 2100) year = 2100;
  var SolarDate = year + "-" + month + "-" + day;
  var objDate = new Date(SolarDate);
  var isLeap = true;
  var i,
    leap = 0,
    dd = 0,
    mm = 0,
    temp = 0;
  var offset =
    (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) -
      Date.UTC(1900, 0, 31)) /
    86400000;

  dd = offset + 40; // The total days in a cycle
  mm = 14; // The total months in a cycle

  for (i = 1900; i < 2100 && offset > 0; i++) {
    temp = lunarYearDays(i);
    offset -= temp;
    mm += 12;
  }

  if (offset < 0) {
    offset += temp;
    i--;
    mm -= 12;
  }

  year = i; // The total years in a cycle that starts since 1864
  let yy = i - 1864;

  leap = leapMonth(i);
  isLeap = false;

  for (i = 1; i < 13 && offset > 0; i++) {
    if (leap > 0 && i == leap + 1 && isLeap == false) {
      --i;
      isLeap = true;
      temp = leapDays(year);
    } else {
      temp = monthDays(year, i);
    }

    if (isLeap == true && i == leap + 1) isLeap = false;

    offset -= temp;
    if (isLeap == false) mm++;
  }

  if (offset == 0 && leap > 0 && i == leap + 1) {
    if (isLeap) isLeap = false;
    else {
      isLeap = true;
      --i;
      --mm;
    }
  }

  if (offset < 0) {
    offset += temp;
    --i;
    --mm;
  }
  day = offset + 1;
  month = i;

  return {
    isLeap: isLeap,
    dayLunar: day,
    monthLunar: month,
    yearLunar: year,
    daysTotalInLunar: dd,
    totalMonth: mm,
    daySolar: daySolar,
    monthSolar: monthSolar,
    yearSolar: yearSolar,
  };
};

export function TueCanVi(lunaryear) {
  return (lunaryear + 6) % 10;
}

export function TueChiVi(lunaryear) {
  return (lunaryear + 8) % 12;
}

export var CAN = [
  "Giáp",
  "Ất",
  "Bính",
  "Đinh",
  "Mậu",
  "Kỷ",
  "Canh",
  "Tân",
  "Nhâm",
  "Quý",
];

export var CHI = [
  "Tý",
  "Sửu",
  "Dần",
  "Mão",
  "Thìn",
  "Tỵ",
  "Ngọ",
  "Mùi",
  "Thân",
  "Dậu",
  "Tuất",
  "Hợi",
];

// Năm Mậu Quý khởi tháng, ngày Giáp Kỷ khởi giờ
var can12 = [
  "Giáp",
  "Ất",
  "Bính",
  "Đinh",
  "Mậu",
  "Kỷ",
  "Canh",
  "Tân",
  "Nhâm",
  "Quý",
  "Giáp",
  "Ất",
];

// Năm Giáp Kỷ khởi tháng, ngày Ất Canh khởi giờ
var can24 = [
  "Bính",
  "Đinh",
  "Mậu",
  "Kỷ",
  "Canh",
  "Tân",
  "Nhâm",
  "Quý",
  "Giáp",
  "Ất",
  "Bính",
  "Đinh",
];
// Năm Ất Canh khởi tháng, ngày Bính Tân khởi giờ
var can36 = [
  "Mậu",
  "Kỷ",
  "Canh",
  "Tân",
  "Nhâm",
  "Quý",
  "Giáp",
  "Ất",
  "Bính",
  "Đinh",
  "Mậu",
  "Kỷ",
];
// Năm Bính Tân khởi tháng, ngày Đinh Nhâm khởi giờ
var can48 = [
  "Canh",
  "Tân",
  "Nhâm",
  "Quý",
  "Giáp",
  "Ất",
  "Bính",
  "Đinh",
  "Mậu",
  "Kỷ",
  "Canh",
  "Tân",
];
// Năm Đinh Nhâm khởi tháng, ngày Mậu Quý khởi giờ
var can64 = [
  "Nhâm",
  "Quý",
  "Giáp",
  "Ất",
  "Bính",
  "Đinh",
  "Mậu",
  "Kỷ",
  "Canh",
  "Tân",
  "Nhâm",
  "Quý",
];

// Lấy can giờ, nhập vào can ngày và giờ (0-11)
export function ThoiCan(NhatCan, gio) {
  if (gio >= 12) gio -= 12;
  if (NhatCan?.charAt(0) == "G" || NhatCan?.charAt(0) == "K") return can12[gio];
  else if (NhatCan?.charAt(0) == "Ấ" || NhatCan?.charAt(0) == "C")
    return can24[gio];
  else if (NhatCan?.charAt(0) == "B" || NhatCan?.charAt(0) == "T")
    return can36[gio];
  else if (NhatCan?.charAt(0) == "Đ" || NhatCan?.charAt(0) == "N")
    return can48[gio];
  else if (NhatCan?.charAt(0) == "M" || NhatCan?.charAt(0) == "Q")
    return can64[gio];
}

// Lấy can tháng, nhập vào can năm và tháng (0-11)
export function NguyetCan(TueCan, thang) {
  if (thang >= 12) thang -= 12;
  if (TueCan?.charAt(0) == "G" || TueCan?.charAt(0) == "K") return can24[thang];
  else if (TueCan?.charAt(0) == "Ấ" || TueCan?.charAt(0) == "C")
    return can36[thang];
  else if (TueCan?.charAt(0) == "B" || TueCan?.charAt(0) == "T")
    return can48[thang];
  else if (TueCan?.charAt(0) == "Đ" || TueCan?.charAt(0) == "N")
    return can64[thang];
  else if (TueCan?.charAt(0) == "M" || TueCan?.charAt(0) == "Q")
    return can12[thang];
}

export function TueCan(lunaryear) {
  return CAN[TueCanVi(lunaryear)];
}

export function TueChi(lunaryear) {
  return CHI[TueChiVi(lunaryear)];
}

//== Nhập tổng số ngày từ AL (al.dd), phản hồi can Giáp nếu CanVi là 0
export function ThienCan(num) {
  return CAN[num % 10];
}

//== Nhập tổng số ngày từ AL (al.dd), phản hồi chi Tý nếu ChiVi là 0
export function DiaChi(num) {
  return CHI[num % 12];
}

export function canVi(can) {
  for (var i = 0; i < CAN.length; i++) if (can == CAN[i]) break;
  return i;
}

export function chiVi(chi) {
  for (var i = 0; i < CHI.length; i++) if (chi == CHI[i]) break;
  return i;
}

export var GIO_HD = [
  "110100101100",
  "001101001011",
  "110011010010",
  "101100110100",
  "001011001101",
  "010010110011",
];
export var TIET = [
  "Tiểu Hàn",
  "Đại Hàn",
  "Lập Xuân",
  "Vũ Thủy",
  "Kinh Trập",
  "Xuân Phân",
  "Thanh Minh",
  "Cốc Vũ",
  "Lập Hạ",
  "Tiểu Mãn",
  "Mang Chủng",
  "Hạ Chí",
  "Tiểu Thử",
  "Đại Thử",
  "Lập Thu",
  "Xử Thử",
  "Bạch Lộ",
  "Thu Phân",
  "Hàn Lộ",
  "Sương Giáng",
  "Lập Đông",
  "Tiểu Tuyết",
  "Đại Tuyết",
  "Đông Chí",
];
export const TIET24 = [
  0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072,
  240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210,
  440795, 462224, 483532, 504758,
];
var LE = {
  solar: [
    { d: 1, m: 1, i: "Tết Dương lịch" },
    { d: 9, m: 1, i: "Ngày Học sinh - Sinh viên Việt Nam" },
    { d: 3, m: 2, i: "Ngày thành lập Đảng Cộng sản Việt Nam" },
    { d: 14, m: 2, i: "Ngày Valentine – Lễ Tình Nhân" },
    { d: 27, m: 2, i: "Ngày Thầy thuốc Việt Nam" },
    { d: 8, m: 3, i: "Ngày Quốc tế Phụ nữ" },
    { d: 20, m: 3, i: "Quốc tế Hạnh Phúc" },
    { d: 22, m: 3, i: "Ngày Nước sạch Thế giới" },
    { d: 27, m: 3, i: "Ngày Thể Thao Việt Nam" },
    { d: 28, m: 3, i: "Thành lập Lực Lượng Dân Quân Tự Vệ" },
    { d: 26, m: 3, i: "Ngày thành lập Đoàn Thanh niên Cộng sản Hồ Chí Minh" },
    { d: 22, m: 4, i: "Ngày Trái Đất" },
    { d: 21, m: 4, i: "Ngày Sách Việt Nam" },
    { d: 30, m: 4, i: "Ngày Thống nhất đất nước" },
    { d: 1, m: 5, i: "Ngày Quốc tế Lao động" },
    { d: 7, m: 5, i: "Mừng Chiến thắng Điện Biên Phủ " },
    { d: 15, m: 5, i: "Ngày thành lập Đội Thiếu niên Tiền phong Hồ Chí Minh" },
    { d: 19, m: 5, i: "Ngày sinh của Chủ tịch Hồ Chí Minh" },
    { d: 1, m: 6, i: "Ngày Quốc tế Thiếu nhi" },
    { d: 5, m: 6, i: "Ngày Bác Hồ ra đi tìm đường cứu nước" },
    { d: 28, m: 6, i: "Gia đình Việt Nam" },
    { d: 27, m: 7, i: "Ngày Thương binh Liệt sĩ" },
    { d: 10, m: 8, i: "Vì các nạn nhân nhiễm chất độc màu da cam" },
    { d: 19, m: 8, i: "Ngày Cách mạng tháng Tám thành công" },
    { d: 2, m: 9, i: "Ngày Quốc khánh" },
    { d: 7, m: 9, i: "Thành lập Đài Truyền Hình Việt Nam" },
    { d: 10, m: 10, i: "Ngày giải phóng Thủ Đô" },
    { d: 13, m: 10, i: "Thành lập Hội Nông Dân Việt Nam" },
    { d: 14, m: 10, i: "Ngày Doanh nhân Việt Nam" },
    { d: 20, m: 10, i: "Ngày thành lập Hội Phụ nữ Việt Nam" },
    { d: 9, m: 11, i: "Mừng ngày Pháp Luật Việt Nam" },
    { d: 19, m: 11, i: "Quốc tế Nam Giới" },
    { d: 20, m: 11, i: "Ngày Nhà giáo Việt Nam" },
    { d: 22, m: 12, i: "Ngày thành lập Quân đội Nhân dân Việt Nam" },
    { d: 24, m: 12, i: "Ngày Lễ Giáng Sinh" },
  ],
  lunar: [
    { d: 1, m: 1, i: "Tết Nguyên Đán" },
    { d: 15, m: 1, i: "Tết Nguyên tiêu" },
    { d: 3, m: 3, i: "Tết Hàn thực" },
    { d: 10, m: 3, i: "Giỗ Tổ Hùng Vương" },
    { d: 15, m: 4, i: "Lễ Phật Đản" },
    { d: 5, m: 5, i: "Tết Đoan ngọ" },
    { d: 15, m: 7, i: "Vu Lan" },
    { d: 15, m: 8, i: "Tết Trung thu" },
    { d: 23, m: 12, i: "Ông Táo chầu trời" },
  ],
};

//== y là năm, n là số thứ tự (0-23) để lấy Tiết
export function TietKhi(y, n) {
  if (y < 1900) y = 1900;
  else if (y > 2100) y = 2100;
  if (n < 0) n = 0;
  else if (n > 23) n = 23;
  var offDate = new Date(
    31556925974.7 * (y - 1900) + TIET24[n] * 60000 + Date.UTC(1900, 0, 6, 2, 5)
  );
  return offDate.getUTCDate();
}
const surplusArr = [0, 3, 6, 9, 11, 14, 17];
export function isLeapYearLunar(year) {
  let surplus = year % 19;
  return surplusArr.includes(surplus);
  // is it leap year ? returns a boolean
  // ie, if the year divides by 4, but not by 100 except when it divides by
  // 400, it is leap year
}
// year là năm Dương Lịch
export function isLeapYear(year) {
  return 0 == year % 4 && (0 != year % 100 || 0 == year % 400);
  // is it leap year ? returns a boolean
  // ie, if the year divides by 4, but not by 100 except when it divides by
  // 400, it is leap year
}

// Tổng số ngày. mon [1...12]
export function TongSoNgay(year, mon) {
  var mdays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var nd = mdays[mon - 1];
  if (mon == 2 && isLeapYear(year)) nd++;
  return nd;
}

export const TRUC12 = [
  "Kiến",
  "Trừ",
  "Mãn",
  "Bình",
  "Định",
  "Chấp",
  "Phá",
  "Nguy",
  "Thành",
  "Thu",
  "Khai",
  "Bế",
];
export const INDEX_CAN_12 = {
  Dần: 1,
  Mão: 2,
  Thìn: 3,
  Tỵ: 4,
  Ngọ: 5,
  Mùi: 6,
  Thân: 7,
  Dậu: 8,
  Tuất: 9,
  Hợi: 10,
  Tý: 11,
  Sửu: 12,
};
export const TINH28 = [
  "Hư",
  "Nguy",
  "Thất",
  "Bích",
  "Khuê",
  "Lâu",
  "Vị",
  "Mão",
  "Tất",
  "Chủy",
  "Sâm",
  "Tỉnh",
  "Quỷ",
  "Liễu",
  "Tinh",
  "Trương",
  "Dực",
  "Chẩn",
  "Giác",
  "Cang",
  "Đê",
  "Phòng",
  "Tâm",
  "Vĩ",
  "Cơ",
  "Đẩu",
  "Ngưu",
  "Nữ",
];

// lấy Trực (Trực Kiến): dd/mm/yy là ngày Dương Lịch
export function TrucKien(dd, mm, yy) {
  var amLich = LunarDate(dd, mm, yy);
  var t = TietKhi(yy, (mm - 1) * 2);
  var oTiet = LunarDate(t, mm, yy); // Tiết lệnh

  var tiet = mm - 1;
  if (tiet == 0) tiet = 12;
  var kien = (tiet + 1) % 12; // Trực "Kiến" tùy theo mỗi tiết, tháng 1 "Kiến" tại ngày Dần
  var dd = 0,
    i = 0;
  var oTruc = []; // Vector: Trực trong 1 tháng DL

  var T = tiet * 2;
  if (T >= 24) T = 0;

  for (i = 0; i < CHI.length; i++) {
    dd = oTiet.daysTotalInLunar + i;
    if (DiaChi(dd) == CHI[kien]) break;
  }
  if (i >= CHI.length) return "";

  var k,
    n,
    d = t - 1;
  for (k = 1; k < t; k++) {
    n = i + (d - k);
    if (n >= 12) n -= 12;
    oTruc.push((12 - n) % 12);
  }
  var dm = TongSoNgay(yy, mm) - d;
  for (k = 0; k < dm; k++) oTruc.push((12 - i + k) % 12);
  return oTruc;
}

// lấy Nhị Thập Bát Tú cho nguyên tháng dự muốn
export function Tinh28Tu(yy, mm) {
  var amLich = LunarDate(1, mm, yy);
  var dm = TongSoNgay(yy, mm);
  var oTu = []; // 28 Tú
  for (var i = 0; i < dm; i++)
    oTu.push((amLich.daysTotalInLunar + i + 11) % 28);
  return oTu;
}

export function INT(d) {
  return Math.floor(d);
}

export function SunLongitude(jdn) {
  var T, T2, dr, M, L0, DL, lambda, theta, omega;
  T = (jdn - 2451545.0) / 36525; // Time in Julian centuries from 2000-01-01 12:00:00 GMT
  T2 = T * T;
  dr = Math.PI / 180; // degree to radian
  M = 357.5291 + 35999.0503 * T - 0.0001559 * T2 - 0.00000048 * T * T2; // mean anomaly, degree
  L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2; // mean longitude, degree
  DL = (1.9146 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
  DL =
    DL +
    (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) +
    0.00029 * Math.sin(dr * 3 * M);
  theta = L0 + DL; // true longitude, degree
  // obtain apparent longitude by correcting for nutation and aberration
  omega = 125.04 - 1934.136 * T;
  lambda = theta - 0.00569 - 0.00478 * Math.sin(omega * dr);

  // Convert to radians
  lambda = lambda * dr;
  lambda = lambda - Math.PI * 2 * INT(lambda / (Math.PI * 2)); // Normalize to (0, 2*PI)
  return lambda;
}

export function getSunLongitude(dayNumber, timeZone) {
  return INT((SunLongitude(dayNumber - timeZone / 24) / Math.PI) * 12);
}

export function jdn(dd, mm, yy, hh, minutes, seconds = 0) {
  var a = INT((14 - mm) / 12);
  var y = yy + 4800 - a;
  var m = mm + 12 * a - 3;
  var jd =
    dd +
    INT((153 * m + 2) / 5) +
    365 * y +
    INT(y / 4) -
    INT(y / 100) +
    INT(y / 400) -
    32045;
  if ((hh !== undefined, minutes !== undefined)) {
    jd = jd + (hh - 12) / 24 + minutes / 1440 + seconds / 86400;
  }
  return jd;
}

// AmLich
export function getCanHour0(jdn) {
  return CAN[((jdn - 1) * 2) % 10];
}

export function getGioHoangDao(jd) {
  var chiOfDay = (jd + 1) % 12;
  var gioHD = GIO_HD[chiOfDay % 6]; // same values for Ty' (1) and Ngo. (6), for Suu and Mui etc.
  var ret = "";
  var count = 0;
  for (var i = 0; i < 12; i++) {
    if (gioHD?.charAt(i) == "1") {
      ret += CHI[i];
      ret += " (" + ((i * 2 + 23) % 24) + "-" + ((i * 2 + 1) % 24) + ")";
      if (count++ < 5) ret += ", ";
      if (count == 3) ret += "\n";
    }
  }
  return ret;
}

export function checkHolidaySolar(dd, mm) {
  var res = "";

  for (const item of LE.solar) {
    if (item.d == dd && item.m == mm) {
      res = item.i + " (" + item.d + "/" + item.m + " DL)";
      break;
    }
  }

  return res;
}

export function checkHolidayLunar(dd, mm) {
  var res = "";
  for (const item of LE.lunar) {
    if (item.d == dd && item.m == mm) {
      res = item.i + " (" + item.d + "/" + item.m + " ÂL)";
      break;
    }
  }

  if (res == "") {
    //Hotfix
    if (dd == 15) res = "Ngày rằm";
  }

  return res;
}

export function getHolodayString(sd, sm, ld, lm) {
  var tmp = checkHolidayLunar(ld, lm),
    res = "";

  if (tmp != "") {
    res = tmp;
  }
  tmp = checkHolidaySolar(sd, sm);
  if (tmp != "") {
    res = res == "" ? tmp : res + ", " + tmp;
  }
  return res;
}
