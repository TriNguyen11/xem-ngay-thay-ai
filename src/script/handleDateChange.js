import moment from "moment";
import {
  canVi,
  chiVi,
  DiaChi,
  getCanHour0,
  getGioHoangDao,
  jdn,
  ThienCan,
  TIET,
  TietKhi,
  TINH28,
  Tinh28Tu,
  TRUC12,
  TrucKien,
  TueChiVi,
} from "./AmLich";
import { DefineHacDaoHoangDao } from "./calculatorCalender";
import {
  CAN,
  CAN_NAM,
  CHI,
  CHI_HOANG_DAO,
  CHI_NAM,
  COMBINE_THIEN_CAN,
  DAI_BAI,
  DUONG_CONG,
  GIO_DIA_CHI,
  GIO_SAT_CHU,
  GIO_THO_TU,
  HOANG_OC,
  NGU_HANH,
  NGU_HANH_TUONG_KHAC,
  NGU_HANH_TUONG_KHAC_KHAU_QUYET,
  NGU_HANH_TUONG_SINH,
  TAM_TAI,
  THIEN_TAI_DIA_HOA,
  TRUC_XUNG_HAI,
  TUAN,
} from "./Constant";

import {
  CanHanh,
  chi3HopVi,
  ChiHanh,
  chiViHop,
  chiViTamHinh,
  HANH,
  soCanChiVi,
} from "./CanChi";
import {
  lucHai,
  lucHinh,
  LuuNien,
  tamHinh,
  tamSatLuuNien,
  tamSatMenh,
  tamSatPhuong,
  thuCatThan,
  thuHungThan,
  tuongPha,
  tuTuyet,
  xungTuoi,
} from "./HungThan";
import {
  AmLich,
  countTag,
  iBanhToCan,
  iBanhToChi,
  iCatNhat2,
  iCatNhat3,
  iHungNhat2,
  iHungNhat3,
  iTrucNghiKi,
  layTiet,
  LC1,
  LC2,
  LH1,
  LH2,
  lunarFest,
  solarFest,
  storeIt,
  tag2Str,
} from "./linhTinh";
import {
  napAm5Hanh,
  napAmCanChi,
  napAmHanhKhac,
  napAmHop,
  napAmKiTuoi,
  napAmVi,
} from "./NapAm";
const handleDateChange = (date) => {
  const lunar = AmLich(date.day, date.month, date.year);
  const jd = jdn(date.day, date.month, date.year);
  const iTruc = TrucKien(1, date.month, date.year);
  const iTinh = Tinh28Tu(date.year, date.month);
  let ngayCan = CAN[canVi(ThienCan(lunar.daysTotalInLunar))];
  let ngayChi = CHI[chiVi(DiaChi(lunar.daysTotalInLunar))];
  let namCan = CAN_NAM[lunar.yearLunar % 10];
  let namChi = CHI_NAM[lunar.yearLunar % 12];
  let nameDaySolar = TUAN[moment(date.dateString).days()];
  let gioHoangDao = getGioHoangDao(jd).split(",");
  let thangCan = CAN[(lunar.yearLunar * 12 + lunar.monthLunar + 3) % 10];
  let thangChi = CHI[(lunar.monthLunar + 1) % 12];
  //day Solar
  let daySolar = date.day;
  let monthSolar = date.month;
  let yearSolar = date.year;
  let selectedDay = moment(date.dateString).format("YYYY-MM-DD");
  //day Lunar
  let dayLunar = lunar.dayLunar;
  let monthLunar = lunar.monthLunar;
  let yearLunar = lunar.yearLunar;
  let daysTotalInLunar = lunar.daysTotalInLunar;
  let isNotHacDao = DefineHacDaoHoangDao(
    lunar.monthLunar,
    CHI[chiVi(DiaChi(lunar.daysTotalInLunar))]
  );

  //Ngay Tiet Khi
  const tietDays =
    TietKhi(date.year, (date.month - 1) * 2) +
    "/" +
    lunar.monthSolar +
    "/" +
    yearSolar;
  const tietKhiDays =
    TietKhi(date.year, (date.month - 1) * 2 + 1) +
    "/" +
    lunar.monthSolar +
    "/" +
    yearSolar;
  // tiết khí

  const tiet = TIET[(date.month - 1) * 2];
  const tietKhi = TIET[(date.month - 1) * 2 + 1];

  // Le/Tet
  let leTet = "";
  if (solarFest[`${lunar.monthSolar}-${lunar.daySolar}`]) {
    leTet = solarFest[`${lunar.monthSolar}-${lunar.daySolar}`];
  }
  if (lunarFest[`${lunar.monthLunar}-${lunar.dayLunar}`])
    if (leTet.length !== 0)
      leTet = leTet + "\n" + lunarFest[`${lunar.monthLunar}-${lunar.dayLunar}`];
    else leTet = lunarFest[`${lunar.monthLunar}-${lunar.dayLunar}`];
  //Cát thần + Nghi + Hung Thần + Kị +Bành Tổ

  let CS = []; // cát sự
  let C2 = []; // cát sự
  let HS = []; // hung sự
  let H2 = []; // hung sự
  const nghiKiSu = iTrucNghiKi(TRUC12[iTruc[i]]);
  // Cát thần
  let than = thuCatThan(lunar, iTruc[date.day - 1]);

  if (than.length) {
    than.sort();
    catThan = "";
    for (i = 0; i < than.length; i++) {
      if (iCatNhat2(than[i]) == "*")
        catThan += LC1(than[i]) + (i + 1 < than.length ? ", " : ".");
      else catThan += LC2(than[i]) + (i + 1 < than.length ? ", " : ".");
      let c_su = iCatNhat3(than[i]);
      if (c_su.length) {
        CS = storeIt(CS, c_su);
        C2 = countTag(C2, c_su);
      }
    }
    for (i = 0; i < than.length; i++) than.pop();
  }
  let nghiSu = "";
  let kiSu = "";
  if (nghiKiSu != "") {
    if (nghiKiSu.match(/^(.+)(\;\s)(.+)$/)) {
      nghiSu = RegExp.$1;
      kiSu = RegExp.$3;
    }
  }
  if (nghiSu.length) {
    CS = storeIt(CS, nghiSu);
    C2 = countTag(C2, nghiSu);
  }
  //Hung Thần
  hungThan = "";
  than = thuHungThan(lunar, iTruc[date.day - 1]);
  if (than.length) {
    than.sort();
    hungThan = "";
    for (i = 0; i < than.length; i++) {
      if (iHungNhat2(than[i]) == "*")
        hungThan += LH1(than[i]) + (i + 1 < than.length ? ", " : ".");
      else hungThan += LH2(than[i]) + (i + 1 < than.length ? ", " : ".");
      var h_su = iHungNhat3(than[i]);
      if (h_su.length) {
        H2 = countTag(H2, h_su);
        HS = storeIt(HS, h_su);
      }
    }
    for (i = 0; i < than.length; i++) than.pop();
  }
  if (kiSu.length) {
    HS = storeIt(HS, kiSu);
    H2 = countTag(H2, h_su);
  }
  nghiSu = "";
  nghiSu = tag2Str(C2, "bách sự nghi dụng");

  //Kị
  kiSu = "";
  kiSu = tag2Str(H2, "bách sự bất nghi");

  //Bành Tổ
  const banhTo =
    iBanhToCan(CAN[canVi(ThienCan(lunar.daysTotalInLunar))]) +
    " " +
    iBanhToChi(CHI[chiVi(DiaChi(lunar.daysTotalInLunar))]);

  //Ngũ hành (1)
  let nguHanh1 =
    "Ngày: " +
    CAN[canVi(ThienCan(lunar.daysTotalInLunar))] +
    " " +
    CHI[chiVi(DiaChi(lunar.daysTotalInLunar))];
  cc = soCanChiVi(
    canVi(ThienCan(lunar.daysTotalInLunar)),
    chiVi(DiaChi(lunar.daysTotalInLunar))
  );
  switch (cc) {
    case 0:
      nguHanh1 += "<lỗi kỹ thuật!>";
      break;
    case 1:
      nguHanh1 +=
        "; tức Can Chi tương đồng (" +
        ChiHanh[chiVi(DiaChi(lunar.daysTotalInLunar))] +
        "), là ngày cát.";
      break;
    case 2:
      nguHanh1 +=
        "; tức Can sinh Chi (" +
        CanHanh[canVi(ThienCan(lunar.daysTotalInLunar))] +
        ", " +
        ChiHanh[chiVi(DiaChi(lunar.daysTotalInLunar))] +
        "), là ngày cát (bảo nhật).";
      break;
    case 3:
      nguHanh1 +=
        "; tức Chi sinh Can (" +
        ChiHanh[chiVi(DiaChi(lunar.daysTotalInLunar))] +
        ", " +
        CanHanh[canVi(ThienCan(lunar.daysTotalInLunar))] +
        "), là ngày cát (nghĩa nhật).";
      break;
    case 4:
      nguHanh1 +=
        "; tức Can khắc Chi (" +
        CanHanh[canVi(ThienCan(lunar.daysTotalInLunar))] +
        ", " +
        ChiHanh[chiVi(DiaChi(lunar.daysTotalInLunar))] +
        "), là ngày cát trung bình (chế nhật).";
      break;
    case 5:
      nguHanh1 +=
        "; tức Chi khắc Can (" +
        ChiHanh[chiVi(DiaChi(lunar.daysTotalInLunar))] +
        ", " +
        CanHanh[canVi(ThienCan(lunar.daysTotalInLunar))] +
        "), là ngày hung (phạt nhật).";
      break;
  }
  //Ngũ hành (2)

  var na = napAmVi(
    canVi(ThienCan(lunar.daysTotalInLunar)),
    chiVi(DiaChi(lunar.daysTotalInLunar))
  );
  var kt = napAmKiTuoi(na);
  var HK = napAmHanhKhac(
    canVi(ThienCan(lunar.daysTotalInLunar)),
    chiVi(DiaChi(lunar.daysTotalInLunar))
  );
  var nguHanh2 = "Nạp Âm: " + napAm5Hanh[na] + " kị tuổi: ";
  var cc;
  for (i = 0; i < kt.length; i++) {
    cc = napAmCanChi(kt[i], CAN[canVi(ThienCan(lunar.daysTotalInLunar))]);
    nguHanh2 += CAN[cc[0]] + " " + CHI[cc[1]] + " ";
  }

  //Ngũ hành (3)
  nguHanh3 =
    "Ngày thuộc hành " +
    HANH[HK[0]] +
    " khắc hành " +
    HANH[HK[1]] +
    ", đặc biệt tuổi: ";
  var kt = napAmHop(na);
  for (i = 0; i < kt.length; i++) {
    cc = napAmCanChi(kt[i], CAN[canVi(ThienCan(lunar.daysTotalInLunar))]);
    nguHanh3 += CAN[cc[0]] + " " + CHI[cc[1]];
    nguHanh3 += i + 1 == kt.length ? " " : ", ";
  }
  if (i == 1) nguHanh3 += " nhờ " + HANH[HK[0]] + " khắc mà được lợi.";
  else
    nguHanh3 += "thuộc hành " + HANH[HK[1]] + " không sợ " + HANH[HK[0]] + ".";

  //Ngũ hành (4)
  var KT = [];
  nguHanh4 = "";
  KT.push("xung " + xungTuoi(lunar.daysTotalInLunar));
  var hinh = tamHinh(lunar.daysTotalInLunar);
  if (hinh != -1) KT.push("hình " + CHI[hinh]);
  var hinh6 = lucHinh(lunar.daysTotalInLunar);
  if (hinh6 != -1 && hinh != hinh6) KT.push("hình " + CHI[hinh6]);
  KT.push("hại " + lucHai(lunar.daysTotalInLunar));
  var pha = tuongPha(lunar.daysTotalInLunar);
  if (pha != -1) KT.push("phá " + CHI[pha]);
  KT.push("tuyệt " + tuTuyet(lunar.daysTotalInLunar));
  var h3 = chi3HopVi(chiVi(DiaChi(lunar.daysTotalInLunar)));
  nguHanh4 +=
    "Ngày " +
    CHI[chiVi(DiaChi(lunar.daysTotalInLunar))] +
    " lục hợp " +
    CHI[chiViHop(chiVi(DiaChi(lunar.daysTotalInLunar)))] +
    ", tam hợp " +
    CHI[h3[0]] +
    " và " +
    CHI[h3[1]] +
    " thành " +
    HANH[h3[2]] +
    " cục; ";
  for (
    i = 0;
    i < KT.length;
    i++ // Kị tuổi
  )
    nguHanh4 += KT[i] + (i + 1 < KT.length ? ", " : ". ");

  var s3 = tamSatMenh(lunar.daysTotalInLunar); // Tam Sát mệnh
  if (s3.length) {
    nguHanh4 += "@@Tam Sát kị mệnh tuổi ";
    for (i = 0; i < 3; i++) nguHanh4 += CHI[s3[i]] + (i + 1 == 3 ? "." : ", ");
  }
  //Khai Sơn Lập Hướng
  var PHUONG = [
    "Trung Cung",
    "Khảm (Bắc)",
    "Khôn (Tây Nam)",
    "Chấn (Đông)",
    "Tốn (Đông Nam)",
    "Trung ương",
    "Kiền (Tây Bắc)",
    "Đoài (Tây)",
    "Cấn (Đông Bắc)",
    "Ly (Nam)",
  ];
  var c = LuuNien(lunar.yearLunar); // Phi Tinh Lưu Niên
  var n = (lunar.yearLunar - 1900 + 36) % 12; // Chi Vị của năm
  var i;
  // Ngũ Hoàng
  if (c == 5) i = 0; // Trung cung
  else i = 10 - c;
  var Tiet = layTiet(lunar.yearSolar, lunar.monthSolar, lunar.daySolar);
  var N3 = tamSatLuuNien(TueChiVi(lunar.yearLunar));
  var n3 = tamSatPhuong(Tiet);
  var N5 =
    "Lưu niên tại cung " +
    PHUONG[i] +
    ". Nghi tĩnh." +
    (i ? " Bất nghi tu phương, lập hướng." : "");

  //Tam Sát
  var Sat = "";
  var tamSat = [];
  let Arr3CungTamSat = [
    "Tam Sát từ trái sang phải phân ra 3 cung:",
    "Kiếp Sát: phạm nhằm chủ bị ăn cướp, mất cắp; hoặc gặp sự bị thương đau;",
    "Tai Sát: phạm nhằm chủ có bệnh hoạn;",
    "Tuế Sát: phạm nhằm con cháu trong nhà hay bị thương tật. Ngay cả súc vật cũng ảnh hưởng.",
  ];
  Sat +=
    PHUONG[N3[0]] +
    " tức " +
    CHI[N3[1]] +
    ", " +
    CHI[N3[2]] +
    ", " +
    CHI[N3[3]] +
    "; ";
  Sat +=
    "Lưu Nguyệt tại cung " +
    PHUONG[n3[0]] +
    " tức " +
    CHI[n3[1]] +
    ", " +
    CHI[n3[2]] +
    ", " +
    CHI[n3[3]] +
    ". Kị động thổ hoặc tu tạo.";

  // tamSat.push('Sát Phương Năm ' + CHI[n]);
  tamSat.push("Tam Sát Lưu niên tại cung " + Sat);

  // Tuế Phá
  i = n + 6;
  if (i > 11) i -= 12;
  Sat =
    ". Phương " +
    CHI[i] +
    " là tọa bất khả hưng tạo. Phạm nhằm chủ tổn tài, sự vật hại trạch trường.";
  Sat += " Tuy nhiên, tọa " + CHI[n] + " hướng " + CHI[i] + " thì lại cát.";
  tuePha =
    "Thái Tuế tại cung " +
    CHI[n] +
    " và cung xung là Tuế Phá tại cung " +
    CHI[i] +
    Sat;
  //Lực Sĩ
  var LS;
  switch (n) {
    case 0:
    case 1:
    case 11:
      LS = "Cấn (Đông Bắc)";
      break;
    case 2:
    case 3:
    case 4:
      LS = "Tốn (Đông Nam)";
      break;
    case 5:
    case 6:
    case 7:
      LS = "Khôn (Tây Nam)";
      break;
    case 8:
    case 9:
    case 10:
      LS = "Kiền (Tây Bắc)";
      break;
  }

  Sat =
    "Cung này bất nghi hưng tạo trong năm " +
    CHI[n] +
    ". Phạm nhằm chủ sinh ra nhiều chứng ôn tật.";
  lucSi = "Lực Sĩ Thiên tử hộ vệ ngự lâm quân tại cung " + LS + ". " + Sat;

  lucSi = "Hung Thần";
  // Tuế Hình
  tueHinh = " Năm " + CHI[n] + " tại cung " + CHI[chiViTamHinh(n)];

  switch (c) {
    case 1:
      i = 6;
      break;
    case 2:
      i = 0;
      break;
    case 3:
      i = 4;
      break;
    case 4:
      i = 3;
      break;
    case 5:
      i = 2;
      break;
    case 6:
      i = 1;
      break;
    case 7:
      i = 9;
      break;
    case 8:
      i = 8;
      break;
    case 9:
      i = 7;
      break;
  }

  nhiHac = "Năm " + CHI[n] + " tại cung " + PHUONG[i];

  i = n - 1;
  if (i < 0) i += 12;
  benhPhu = "Năm " + CHI[n] + " tại cung " + CHI[i];

  return {
    nhiHac,
    benhPhu,
    tueHinh,
    lucSi,
    tuePha,
    tamSat,
    Arr3CungTamSat,
    N5,
    nguHanh1,
    nguHanh2,
    nguHanh3,
    nguHanh4,
    banhTo,
    catThan,
    nghiSu,
    hungThan,
    kiSu,
    leTet,
    tietKhi,
    tietKhiDays,
    tiet,
    tietDays,
    ngayCan,
    ngayChi,
    thangCan,
    thangChi,
    namCan,
    namChi,
    nameDaySolar,
    gioHoangDao,

    daySolar,
    monthSolar,
    yearSolar,
    selectedDay,
    dayLunar,
    monthLunar,
    yearLunar,
    daysTotalInLunar,
    isNotHacDao,
    iTinh,
    iTruc,
  };
};

export const getCanChi = async (day, month, year) => {
  const lunar = await AmLich(day, month, year);
  const iTruc = TrucKien(1, month, year);
  const iTinh = Tinh28Tu(year, month);
  let ngayCan = CAN[canVi(ThienCan(lunar.daysTotalInLunar))];
  let ngayChi = CHI[chiVi(DiaChi(lunar.daysTotalInLunar))];
  let namCan = CAN_NAM[lunar.yearLunar % 10];
  let namChi = CHI_NAM[lunar.yearLunar % 12];
  let thangCan =
    CAN[Math.floor((lunar.yearLunar * 12 + lunar.monthLunar + 3) % 10)];
  let thangChi = CHI[(lunar.monthLunar + 1) % 12];
  let gioCan = getCanHour0(jdn(day, month, year));
  let arrGioCan = [];
  for (let i = 0; i < 12; i++) {
    arrGioCan.push(
      CAN_NAM[(CAN_NAM.indexOf(getCanHour0(jdn(day, month, year))) + i) % 10]
    );
  }
  // console.log(arrGioCan, "varrGioCan");
  let hanhNgay = NGU_HANH[CAN[canVi(ThienCan(lunar.daysTotalInLunar))]];

  let hanhThang =
    NGU_HANH[
      CAN[Math.floor((lunar.yearLunar * 12 + lunar.monthLunar + 3) % 10)]
    ];
  return {
    daySolar: day,
    gioCan,
    arrGioCan,
    hanhNgay,
    hanhThang,
    monthSolar: month,
    yearSolar: year,
    dayLunar: lunar.dayLunar,
    monthLunar: lunar.monthLunar,
    yearLunar: lunar.yearLunar,
    ngayCan,
    ngayChi,
    thangCan,
    thangChi,
    namCan,
    namChi,
    truc: TRUC12[iTruc[day - 1]],
    tu: TINH28[iTinh[Number(day) % 28]],
  };
};
export const CheckTrucXungNgayThangNam = (Chi1, Chi2) => {
  if (!CHI_NAM.includes(Chi1)) {
    return false;
  }
  if (Chi1) return TRUC_XUNG_HAI[Chi1][0] === Chi2;
};
export const CheckTrucXungTyHoa = (Chi1, Chi2) => {
  if (!CHI_NAM.includes(Chi1)) {
    return false;
  }
  if (Chi1)
    return (
      TRUC_XUNG_HAI[Chi1][1] === Chi2 ||
      TRUC_XUNG_HAI[Chi1][0] === Chi2 ||
      TRUC_XUNG_HAI[Chi1][2] === Chi2
    );
};
export const CheckGioThoTu = (ngayChi, gioChi) => {
  return GIO_THO_TU[ngayChi] === gioChi;
};
export const CheckGioSatChu = (monthLunar, gioChi) => {
  return GIO_SAT_CHU[monthLunar - 1] === gioChi;
};
export const CheckTrucXungGio = (
  toaChi,
  ngayChi,
  thangChi,
  tuoiGiaChu,
  monthLunar
) => {
  const arrGioHoangDao = CheckHoangDao(ngayChi);
  // console.log(arrGioHoangDao, "arrGioHoangDao");
  return CHI.filter((item) => {
    // console.log(arrGioHoangDao.includes(item), item, "check hoang dao");
    if (
      CheckTrucXungNgayThangNam(item, toaChi) === false &&
      CheckTrucXungNgayThangNam(item, ngayChi) === false &&
      CheckTrucXungNgayThangNam(item, thangChi) === false &&
      arrGioHoangDao.includes(item) === true &&
      CheckGioThoTu(ngayChi, item) === false &&
      CheckGioSatChu(monthLunar, item) === false
    ) {
      if (CheckTrucXungTyHoa(item, tuoiGiaChu) === false) {
        // console.log(item, tuoiGiaChu, "check itme voi tuoxi gia chu");

        return item;
      }
      // console.log({ item, toaChi: toaChi, ngayChi, thangChi, tuoiGiaChu });
    }
  });
};
export const CheckHoangDao = (ngayChi) => {
  return CHI_HOANG_DAO[ngayChi];
};
export const CheckHopHoa = (Chi1, Chi2) => {
  return TRUC_XUNG_HAI[Chi1][0] === Chi2;
};
export const CheckTuongXungTuongHaiTuoi = (Chi1, Chi2) => {
  if (Chi1)
    return (
      TRUC_XUNG_HAI[Chi1][1] === Chi2 ||
      TRUC_XUNG_HAI[Chi1][0] === Chi2 ||
      TRUC_XUNG_HAI[Chi1][2] === Chi2
    );
};
export const CheckTrucXungTuoi = (Chi1, Chi2) => {
  return TRUC_XUNG_HAI[Chi1][0] === Chi2;
};
export const CheckNguHanhTuongSinh = (NguHanh1, NguHanh2) => {
  return NGU_HANH_TUONG_SINH[NguHanh1].includes(NguHanh2);
};
export const CheckNguHanhTuongKhac = (NguHanh1, NguHanh2) => {
  // console.log(NguHanh1, NguHanh2, "nh 1, nh2");
  // console.log(NGU_HANH_TUONG_KHAC[NguHanh1], "check condition");
  return NGU_HANH_TUONG_KHAC[NguHanh1].includes(NguHanh2);
};
export const CheckNguHanhTuongKhacKhauQuyet = (NguHanh1, NguHanh2) => {
  console.log(NguHanh1, NguHanh2, "nh 1, nh2");
  console.log(
    NGU_HANH_TUONG_KHAC_KHAU_QUYET[NguHanh1] === NguHanh2,
    "nh 1, nh2"
  );
  // console.log(NGU_HANH_TUONG_KHAC[NguHanh1], "check condition");
  return NGU_HANH_TUONG_KHAC_KHAU_QUYET[NguHanh1] === NguHanh2;
};
export const CheckNgayBachKy = (Chi1, Chi2) => {
  return TRUC_XUNG_HAI[Chi1][0] === Chi2;
};
export const CheckKimLau = (NamLamNha, NamSinhGiaChu) => {
  const arrKimLau = [
    "",
    "Kim Lâu Thân",
    "",
    "Kim Lâu Thê",
    "",
    "",
    "Kim Lâu Tử",
    "",
    "Kim Lâu Súc",
  ];
  const KimLau = (NamLamNha - NamSinhGiaChu + 1) % 9;
  if (KimLau >= 0) {
    //check length de xac dinh co Kiem Lau hay khong
    return arrKimLau[KimLau];
  } else {
    return "";
  }
};
export const CheckHoangOc = (age) => {
  // - Nhất Cát: Làm nhà tuổi này thì mọi việc đều tốt, gia đạo êm ấm, sự nghiệp hanh thông.
  // - Nhị Nghi: Làm nhà tuổi này thì gia đình hưng vượng.
  // - Tam Địa sát: Làm nhà tuổi này thì gia chủ gặp nhiều bệnh tật, đau ốm triền miên.
  // - Tứ Tấn tài: Làm nhà tuổi này thì phúc lộc vẹn toàn.
  // - Ngũ Thọ tử: Làm nhà tuổi này thì rất xấu nhẹ thì đau ốm nặng thì sẽ lâm vào cảnh sinh ly tử biệt.
  // - Lục Hoang ốc: Làm nhà tuổi này thì gia đạo không yên, dù có cố gắng cũng khó mà thành đạt được.
  // const arrHoangOc = [
  //   "",
  //   "",
  //   "phạm hạn Hoang Ốc",
  //   "",
  //   "phạm hạn Hoang Ốc",
  //   "phạm hạn Hoang Ốc",
  // ];
  const arrHoangOc = [
    "Nhất Cát",
    "Nhị Nghi",
    "Tam Địa sát",
    "Tứ Tấn tài",
    "Ngũ Thọ tử",
    "Lục Hoang ốc",
  ];
  console.log(age, (age % 10) + Math.floor(age / 10), " tong tuoi gia chu");
  return HOANG_OC[((age % 10) + Math.floor(age / 10) - 1) % 6];
};
export const CheckTamTai = (ChiTuoi, ChiNam) => {
  // console.log(ChiTuoi, ChiNam, "ChiNam");
  return TAM_TAI[ChiTuoi].includes(ChiNam);
};

export const CheckDaiBai = (CanNam, mLunar, CanChiNgay, item) => {
  // console.log(CanNam, "CanNam", mLunar, "mLunar", CanChiNgay);

  return DAI_BAI[CanNam]
    ? Object.keys(DAI_BAI[CanNam]).includes(mLunar.toString())
      ? DAI_BAI[CanNam][mLunar] === CanChiNgay
      : false
    : false;
};
export const CheckThienTaiDiaHoa = (ChiNgay, mLunar) => {
  return THIEN_TAI_DIA_HOA[ChiNgay]
    ? THIEN_TAI_DIA_HOA[ChiNgay].includes(mLunar)
    : false;
};
export const GetHoangVuTuQuy = (NumberTietKhi) => {
  // return TAM_TAI[ChiTuoi].includes(ChiNam);
  if (NumberTietKhi >= 3 && NumberTietKhi < 9) {
    return "Hạ";
  }
  if (NumberTietKhi >= 9 && NumberTietKhi < 15) {
    return "Thu";
  }
  if (NumberTietKhi >= 15 && NumberTietKhi < 21) {
    return "Đông";
  }

  return "Xuân";
};

export const CheckDuongCong = (mLunar, dLunar) => {
  return DUONG_CONG[mLunar - 1].includes(dLunar);
};
export const CheckKhongPhong = (ChiTuoi, ChiNam) => {
  return TAM_TAI[ChiTuoi].includes(ChiNam);
};
export const CombineThienCan = (Can1, Can2) => {
  let Combine = "";
  COMBINE_THIEN_CAN.map((item) => {
    if (item.includes(Can1) && item.includes(Can2) && Can1 !== Can2) {
      Combine = item[2];
    }
  });
  return Combine;
};
export const getDateByTietKhi = (tiet_khi) => {
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
};
export default handleDateChange;
