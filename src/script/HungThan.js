//
// Hung Thần Kị Nhật
// Author: Harry Tran (a.k.a Thiên Y) in USA (email: thien.y@operamail.com)
// Tham khảo: Ngọc Hạp Ký, Đổng Công Tuyển Yếu Lãm, Đạo Gia Trạch Nhật Học, PSD Trạch Nhật Học
//

import {
  canVi,
  chiVi,
  DiaChi,
  NguyetCan,
  ThienCan,
  TietKhi,
  TRUC12,
  TueCan,
  TueCanVi,
  TueChiVi,
} from "./AmLich";
import {
  chiHai,
  chiLucHinh,
  chiPha,
  chiTamHinh,
  chiTuyet,
  chiXung,
} from "./CanChi";
import {
  catKhanh,
  catKyNhat,
  chiDuc,
  danNhat,
  giaiThan,
  kimDuong,
  kimQuy,
  lamNhat,
  locKho,
  lucHop,
  mauThuong,
  minhDuong,
  minhPhe,
  minhPheDoi,
  minhTinh,
  ngocDuong,
  nguHop,
  nguPhu,
  nguyetAn,
  nguyetDuc,
  nguyetDucHop,
  nguyetDucQuiNhan,
  nguyetKhong,
  nguyetTai,
  phucDuc,
  phucSinh,
  quanNhat,
  tamHop,
  thanhLong,
  thienAn,
  thienDuc,
  thienDucHD,
  thienDucHop,
  thienMa,
  thienQuy,
  thienThanh,
  thienXa,
  thienY,
  thoiAm,
  thoiDuc,
  thoiDuong,
  tuMenh,
  tuongNhat,
  tuTuong,
  vuongNhat,
  vuongNhat100,
  thuNhat,
  thienNhac,
  yeuYen,
  ngocVu,
  kinhAn,
  phoHo,
  thanhTam,
  ichHau,
  tucThe,
  thienNguyen,
  lucNghi,
  thienThuong,
  batTuong,
  amDuc,
  thanTai,
  truThan,
  thienPhuc,
  thienThuy,
  bangChanhPhe,
  daiMinhCatNhat,
  daiThauTuNhat,
  thienQuan,
  hienTinh,
  khucTinh,
  phoTinh,
  thatThanh,
  tueDuc,
  tueDucHop,
  tueLoc,
  manDuc,
  thienDe,
  thienHau,
  uViTinh,
  daiHongSa,
  nguDeSinh,
  laThienDaiTien,
  hoiDong,
  dichMa,
} from "./CatNhat";
import { CAN, CHI } from "./Constant";
import { khiHau, lay4Thoi, layTiet, ngayKhoiTiet, tietHau } from "./linhTinh";

// Tứ Ly 四離 [ DGTNH ]
//   Mỗi năm có 4 ngày trước Xuân Phân, Thu Phân, Đông Chí, Hạ Chí một ngày
// Kị: xuất hành, chinh chiến
// Kị: chư sự bất nghi, tạo táng, giá thú đại hung
// Kị khởi tạo,  thượng quan, viễn hành, xuất hành, giá thú, hòa hợp sự
export function tuLy(yy, mm, dd) {
  // mm: DL (1..12)
  var n = 0;
  if (mm == 3) n = TietKhi(yy, 5); // Xuân Phân
  else if (mm == 6) n = TietKhi(yy, 11); // Hạ Chí: 21,22
  else if (mm == 9) n = TietKhi(yy, 17); // Thu Phân
  else if (mm == 12) n = TietKhi(yy, 23); // Đông Chí: 21,22
  if (n) n--; // 1 Ngày trước những ngày trên
  return n == dd ? 1 : 0;
}

// Tứ Lập: lập xuân, lập hạ, lập thu, lập đông
export function tuLap(yy, mm, dd) {
  // mm: DL (1..12)
  var n = 0;
  if (mm == 2) n = TietKhi(yy, 2); // Lập Xuân
  else if (mm == 5) n = TietKhi(yy, 8); // Lập Hạ
  else if (mm == 8) n = TietKhi(yy, 14); // Lập Thu
  else if (mm == 11) n = TietKhi(yy, 20); // Lập Đông
  return n == dd ? 1 : 0;
}

// Tứ Tuyệt 四絕 [ DGTNH-16 ]
//   4 ngày Tứ Tuyệt (trước Lập Xuân, Lập Hạ, Lập Thu, Lập Đông một ngày).
// Kị: xuất quân đi xa
// Kị: chư sự bất nghi, tạo táng, giá thú đại hung
// Kị khởi tạo,  thượng quan, viễn hành, xuất hành, giá thú, hòa hợp sự
export function tuTuyetNhat(yy, mm, dd) {
  // mm: DL (1..12)
  var n = 0;
  if (mm == 2) n = TietKhi(yy, 2); // Lập Xuân
  else if (mm == 5) n = TietKhi(yy, 8); // Lập Hạ
  else if (mm == 8) n = TietKhi(yy, 14); // Lập Thu
  else if (mm == 11) n = TietKhi(yy, 20); // Lập Đông
  if (n) n--; // 1 Ngày trước những ngày trên
  return n == dd ? 1 : 0;
}

// Tiểu Không Vong 小空亡 [ DGTNH-16 ] return 3 ngày
// kị xuất hành, kinh thương, cầu tài, xuất tài, nghi tác thọ mộc
export function tieuKhongVong(th) {
  // th: tháng âm lịch bắt đầu từ mồng 1
  var kv = [0, 0, 0];
  switch (th) {
    case 1:
      kv = [1, 10, 18];
      break;
    case 2:
      kv = [1, 9, 17];
      break;
    case 3:
      kv = [8, 16, 24];
      break;
    case 4:
      kv = [3, 15, 23];
      break;
    case 5:
      kv = [6, 14, 22];
      break;
    case 6:
      kv = [5, 13, 29];
      break;
    case 7:
      kv = [12, 20, 28];
      break;
    case 8:
      kv = [3, 11, 19];
      break;
    case 9:
      kv = [2, 10, 26];
      break;
    case 10:
      kv = [9, 17, 25];
      break;
    case 11:
      kv = [2, 16, 24];
      break;
    case 12:
      kv = [7, 15, 23];
      break;
  }
  return kv;
}

// Đại Không Vong 大空亡  [ DGTNH-16 ] return 4 ngày
// kị cầu tài, xuất hành, kinh thương, xuất tài, thượng quan
export function daiKhongVong(th) {
  // th: tháng âm lịch bắt đầu từ mồng 1
  var kv = [0, 0, 0, 0];
  switch (th) {
    case 1:
      kv = [6, 14, 22, 30];
      break;
    case 2:
      kv = [5, 13, 21, 29];
      break;
    case 3:
      kv = [4, 12, 20, 28];
      break;
    case 4:
      kv = [3, 11, 19, 27];
      break;
    case 5:
      kv = [2, 10, 18, 26];
      break;
    case 6:
      kv = [1, 9, 17, 25];
      break;
    case 7:
      kv = [8, 16, 24, 30];
      break;
    case 8:
      kv = [7, 15, 23, 29];
      break;
    case 9:
      kv = [6, 14, 22, 30];
      break;
    case 10:
      kv = [5, 13, 21, 29];
      break;
    case 11:
      kv = [4, 12, 20, 28];
      break;
    case 12:
      kv = [3, 11, 19, 27];
      break;
  }
  return kv;
}

// Xung Tuổi
export function xungTuoi(nn) {
  var chi = DiaChi(nn);
  return chiXung(chi); // CHI
}

// Tam Hình
export function tamHinh(nn) {
  var chi = DiaChi(nn);
  return chiTamHinh(chi); // CHI vị
}

// Lục Hình
export function lucHinh(nn) {
  var chi = DiaChi(nn);
  return chiLucHinh(chi); // CHI vị
}

// Lục Hại
export function lucHai(nn) {
  var chi = DiaChi(nn);
  return CHI[chiHai(chi)]; // CHI
}
// Tương Phá
export function tuongPha(nn) {
  var chi = DiaChi(nn);
  return chiPha(chi); // CHI vị
}

// Tứ Tuyệt
export function tuTuyet(nn) {
  var chi = DiaChi(nn);
  return CHI[chiTuyet(chi)]; // CHI
}

// Mệnh Tam Sát, nếu phạm tất gặp đại hung. Nhập Chi (Tý...Hợi)
export function menh3Sat(chi) {
  c = chiVi(chi);
  if (c == CHI.length) return 0;

  var s = 0; // Return a true CHI VI + 1 (1...12)
  switch (c) {
    // Tuổi: Thân, Tý, Thìn; kỵ năm, tháng, ngày, và giờ Mùi
    case 0:
    case 4:
    case 8:
      s = 8;
      break; // Đừng dùng ngày và giờ Mùi
    // Tuổi: Tỵ, Dậu, Sửu; kỵ năm, tháng, ngày, và giờ Thìn
    case 1:
    case 5:
    case 9:
      s = 5;
      break; // Đừng dùng ngày và giờ Thìn
    // Tuổi: Dần, Ngọ, Tuất; kỵ năm, tháng, ngày, và giờ Sửu
    case 2:
    case 6:
    case 10:
      s = 2;
      break; // Đừng dùng ngày và giờ Sửu
    // Tuổi: Hợi, Mão, Mùi; kỵ năm, tháng, ngày, và giờ Tuất
    case 3:
    case 7:
    case 11:
      s = 11;
      break; // Đừng dùng ngày và giờ Tuất
  }
  return s;
}

// Mệnh Tam Sát.
export function tamSatMenh(nn) {
  var chi = chiVi(DiaChi(nn));
  var m = [];
  switch (chi) {
    case 1:
      m = [2, 6, 10];
      break; // ngày và giờ Sửu kị mệnh Dần, Ngọ, Tuất
    case 4:
      m = [5, 9, 1];
      break; // ngày và giờ Thìn kị mệnh Tỵ, Dậu, Sửu
    case 7:
      m = [8, 0, 4];
      break; // ngày và giờ Mùi kị mệnh Thân, Tý, Thìn
    case 10:
      m = [11, 3, 7];
      break; // ngày và giờ Tuất kị mệnh Hợi, Mão, Mùi
  }
  return m;
}

// Lưu Nguyệt Tam Sát, N: 1...12
export function tamSatPhuong(t) {
  var p = []; // [ phương (0..3), chi (0..11), chi, chi ]
  switch (t) {
    case 1:
    case 5:
    case 9:
      p = [1, 11, 0, 1];
      break;
    case 2:
    case 6:
    case 10:
      p = [7, 8, 9, 10];
      break;
    case 3:
    case 7:
    case 11:
      p = [9, 5, 6, 7];
      break;
    case 4:
    case 8:
    case 12:
      p = [3, 2, 3, 4];
      break;
  }
  return p;
}

// Lưu Niên Tam Sát, N: 0...11
export function tamSatLuuNien(N) {
  var p = []; // [ phương (0..3), chi (0..11), chi, chi ]
  switch (N) {
    case 0:
    case 4:
    case 8:
      p = [9, 5, 6, 7];
      break;
    case 1:
    case 5:
    case 9:
      p = [3, 2, 3, 4];
      break;
    case 2:
    case 6:
    case 10:
      p = [1, 11, 0, 1];
      break;
    case 3:
    case 7:
    case 11:
      p = [7, 8, 9, 10];
      break;
  }
  return p;
}

// Nguyệt Kỵ 月忌 [ DGTNH,  NHK ]
// bách sự kị
// sơ ngũ, thập tứ, nhị thập tam, dĩ ngũ hoàng trị nhật
// Kị: nguyệt kị nhật bất nghi nhập học, phó nhậm, khai thị, lập khoán, giao dịch, di đồ,
//     kết hôn nhân, giá thú, tu tạo, an sàng, động thổ, thụ trụ, thượng lương, phá thổ,
//     khải toản, an táng.
export function nguyetKy(n) {
  // n là ngày ÂL (1..30)
  var k = 0;
  switch (n) {
    case 5: // sơ ngũ phạm trứ gia trường tử
    case 14: // thập tứ phùng chi thân tự đương
    case 23: // hành thuyền lạc thủy tao quan sự, giai nhân ngộ trứ nhị thập tam
      k = 1;
      break; // Thế gian lấy dùng hãy suy lường.
  }
  return k;
}

// Tam Nương 三娘
// Kị: Tác sự cầu mưu định bất xương,
//   Nghinh thân giá thú rã uyên ương,
//   Xây nhà dựng cửa giảm nhân đinh,
//   Viễn du phó nhậm bất hồi hương.
export function tamNuong(n) {
  // n là ngày ÂL (1..30)
  var k = 0;
  switch (n) {
    case 3:
    case 7: // Thượng tuần mùng 3 với mùng 7
    case 13:
    case 18: // Trung tuần 13, 18 đương
    case 22:
    case 27:
      k = 1;
      break; // Hạ Tuần 22 với 27
  }
  return k;
}

// Tứ Bất Tường 四不祥 [ DGTNH-17, NHK ]
// thông thư dĩ mỗi nguyệt sơ tứ, sơ thất, thập lục, thập cửu, nhị thập bát, phàm ngũ nhật vị chi tứ bất tường.
// kị thượng quan phó nhậm, lâm chánh thân dân, nhập trạch, giá thú, xuất hành
export function tuBatTuong(n) {
  // n là ngày ÂL (1..30)
  var k = 0;
  switch (n) {
    case 4:
    case 7:
    case 16:
    case 19:
    case 28:
      k = 1;
      break;
  }
  return k;
}

// Long Cấm 龍禁 [ DGTNH-17 ]
// thi lệ: sơ nhị sơ bát tịnh thập tứ, nhị thập nhập lục giai long cấm, lập thạch an kiều cập hành chu, ngộ thử chung tao phá tổn lưu
// kị hành thuyền, tạo kiều lương
export function longCam(n) {
  // n là ngày ÂL (1..30)
  var k = 0;
  switch (n) {
    case 2:
    case 8:
    case 14:
    case 20:
    case 26:
      k = 1;
      break;
  }
  return k;
}

// Tiểu Hồng Sa Sát 紅沙殺 [ DCTYL, NHK (PSD) ]
//   != thi viết:  tý ngọ mão dậu tị, dần thân tị hợi dậu, thìn tuất sửu mùi sửu
//  != DGTNH: "tứ mạnh nguyệt kim kê tứ trọng xà, tứ quý kiến sửu nhật thị hồng sa"
// Kị:
// Làm nhà phạm ngày Hồng Sa, sau 100 ngày bị hỏa hoạn
// Giá thú phạm phải, 1 nữ lấy chồng 3 nhà
// Xuất hành phạm phải, tất định không trở lại
export function tieuHongSa(t, nn) {
  // t: tiết
  var chi = DiaChi(nn); // phải nhập vào Lunar.dd
  var k = 0;
  switch (
    t // (DCTYL)
  ) {
    case 1:
    case 4:
    case 7:
    case 10:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 2:
    case 5:
    case 8:
    case 11:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
    case 3:
    case 6:
    case 9:
    case 12:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
  }
  return k;
}

// Tứ Đại Kị Nhật 四大忌 hàng tháng, nhập Ngày
export function tuDaiKy(n) {
  var k = 0;
  switch (
    n // Trong mỗi tháng 1, 9, 17, & 25
  ) {
    case 1:
      k = 1;
      break; // Giá thú, chồng chết gả chồng khác
    case 9:
      k = 2;
      break; // Thượng lương, xây cất lửa cháy nhà
    case 17:
      k = 3;
      break; // An táng, khởi bệnh ôn hoàng
    case 25:
      k = 4;
      break; // Di cư, nhân tài lưỡng tổn thương
  }
  return k;
}

// Hoành Thiên Chu Tước 橫天朱雀 = Tứ Đại Kị [ DGTNH *** ]
// cái giá thú chu đường; mỗi ngộ sơ nhất, sơ cửu, thập thất, nhị thập ngũ đẳng nhật; nguyệt đại tắc trị phu, nguyệt tiểu tắc trị phụ
// mồng 1 bất hành giá; mồng 9 kị thượng lương; ngày 17 kị an táng; ngày 25 kị bàn di
export function hoanhThienChuTuoc(n) {
  // n là ngày ÂL (1..30)
  var k = 0;
  switch (n) {
    case 1:
    case 9:
    case 17:
    case 25:
      k = 1;
      break;
  }
  return k;
}

// Ngày Sát Chủ (殺主 ?) t (1..12); nn: là tổng số ngày như Lunar.dd
export function satChu(t, nn) {
  // t: tiết
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 2:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 3:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 4:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 5:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 6:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
    case 7:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 8:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 9:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
    case 10:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
    case 11:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 12:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
  }
  return k;
}

// Thụ Tử (Thọ Tử) 受死 [ DCTYL, DGTNH, NHK ]
// thi lệ: chánh tuất nhị thìn tam hợi thủ, tứ tị ngũ tý lục ngọ tê, thất sửu bát mùi cửu dần nhật, thập thân thập nhất thỏ chạp kê
//   tuất thìn hợi tị tý ngọ sửu mùi dần thân mão dậu
// kị bách sự kị; duy điền liệp, thủ ngư, nhập liễm, di cữu, thành phục, trừ phục, phá thổ, khải toàn, an táng cát.
export function thuTu(t, nn) {
  //  t (1..12); nn: Lunar.dd
  var chi = DiaChi(nn);
  var k = 0;
  switch (
    t // DGTNH = DCTYL = NHK :
  ) {
    case 1:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
    case 2:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
    case 3:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 4:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 5:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 6:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
    case 7:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 8:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 9:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 10:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 11:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 12:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
  }
  return k;
}

// Vô Kiều 無翹 = Lục Hợp (cát nhật) [ DGTNH *** ]
// chánh nguyệt tại hợi, nghịch hành thập nhị thần
// kị giá thú, hòa hợp sự
export function voKieu(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 2:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
    case 3:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
    case 4:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 5:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 6:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
    case 7:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 8:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
    case 9:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 10:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 11:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 12:
      if (chi == CHI[0]) k = 1;
      break; // Tý
  }
  return k;
}

// Lục Bất Thành 六不成 = Đại Bại 大敗 [ NHK, DGTNH-7 ]
//   dần ngọ tuất tị dậu sửu thân tý thìn hợi mão mùi
// Lục Bất Thành: bách sự bất nghi: xuất quân, doanh mưu, cầu hôn, bách sự tịnh hung
// kị khởi tạo, xỏ tai
export function lucBatThanh(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 2:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
    case 3:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
    case 4:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 5:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
    case 6:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 7:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 8:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 9:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
    case 10:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 11:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 12:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
  }
  return k;
}

// Hoàng Sa 黃沙 [ NHK ]
//   Ngọ Dần Tý Ngọ Dần Tý Ngọ Dần Tý Ngọ Dần Tý
// tối kị xuất hành.
export function hoangSa(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 4:
    case 7:
    case 10:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
    case 2:
    case 5:
    case 8:
    case 11:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 3:
    case 6:
    case 9:
    case 12:
      if (chi == CHI[0]) k = 1;
      break; // Tý
  }
  return k;
}

// Ngâm Thần 吟神 = Thân Ngâm 呻吟 [ DGTNH-11 ]
//   dậu tị sửu dậu tị sửu dậu tị sửu dậu tị sửu
// kị giá thú (phương vị)
export function ngamThan(t, nn) {
  // t: tiết
  var chi = DiaChi(nn); // phải nhập vào Lunar.dd
  var k = 0;
  switch (t) {
    case 1:
    case 4:
    case 7:
    case 10:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
    case 2:
    case 5:
    case 8:
    case 11:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 3:
    case 6:
    case 9:
    case 12:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
  }
  return k;
}

// Thiên Tặc 天賊 [ DGTNH-5, NHK, DCTYL ]
//  DGTNH: dần, thân, tị, hợi nguyệt trị mãn nhật; tý, ngọ, mão, dậu nguyệt trị phá nhật;
//   thìn, tuất, sửu, mùi nguyệt trị khai nhật; bất tri tài bạch xuất nhập
//   [ thìn dậu dần mùi tý tị tuất mão thân sửu ngọ hợi ]
// kị khởi tạo, động thổ, thụ tạo, thượng quan, nhập trạch, an táng, giao dịch, khai thương khố, khai thị
export function thienTac(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
    case 2:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
    case 3:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 4:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 5:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 6:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 7:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
    case 8:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 9:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 10:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 11:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
    case 12:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
  }
  return k;
}

// Nguyệt Yếm 月厭 (nguyệt áp) = Đại Họa 大禍 = Địa Hỏa 地火 [ DGTNH-12, NHK, DCTYL ]
//   chánh nguyệt tại tuất, nghịch hành thập nhị thần
//    tuất dậu thân mùi ngọ tị thìn mão dần sửu tý hợi
// Nguyệt Yếm kị giá thú (rước dâu), xuất hành
// Địa Hỏa kị khởi tạo
export function nguyetYem(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
    case 2:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
    case 3:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 4:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 5:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
    case 6:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 7:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
    case 8:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 9:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 10:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 11:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 12:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
  }
  return k;
}

// Băng Tiêu Ngõa Hãm 冰消瓦陷 [ DGTNH-27, DCTYL ]
// 冰消瓦陷 巳 子 丑 申 卯 戌 亥 午 未 寅 酉 辰
// Băng Tiêu Ngõa Hãm (NHK)
// bách sự giai kị
export function bangTieuNgoaHam(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 2:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 3:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 4:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 5:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 6:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
    case 7:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 8:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
    case 9:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 10:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 11:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
    case 12:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
  }
  return k;
}

// Băng Tiêu Ngõa Giải 冰消瓦解 [ DGTNH-27, DCTYL ]
// http://hi.baidu.com/%C4%AB%CF%E7%C9%BD%C8%CB%5F/blog/item/46c74181015f64dcbc3e1eb6.html
// băng tiêu ngõa giải nhật, kì lệ tòng thái tuế vị thượng khởi chánh nguyệt, thuận số chí sở dụng chi nguyệt chỉ, hựu tòng sở dụng chi nguyệt sơ nhất thuận số, ngộ tý thượng vi băng tiêu, ngọ thượng vi ngõa giải
/*
冰消瓦解（即子午頭殺）
子年 正 二 三 四 五 六 七 八 九 十 十一 十二 
丑年 十二 正 二 三 四 五 六 七 八 九 十 十一 
寅年 十一 十二 正 二 三 四 五 六 七 八 九 十 
卯年 十 十一 十二 正 二 三 四 五 六 七 八 九 
辰年 九 十 十一 十二 正 二 三 四 五 六 七 八 
巳年 八 九 十 十一 十二 正 二 三 四 五 六 七 
午年 七 八 九 十 十一 十二 正 二 三 四 五 六 
未年 六 七 八 九 十 十一 十二 正 二 三 四 五 
申年 五 六 七 八 九 十 十一 十二 正 二 三 四 
酉年 四 五 六 七 八 九 十 十一 十二 正 二 三 
戌年 三 四 五 六 七 八 九 十 十一 十二 正 二 
亥年 二 三 四 五 六 七 八 九 十 十一 十二 正 
冰消忌安葬 初一十二十一初十初九初八初七初六初五初四初三初二
不值午日不忌 十三廿四廿三廿二廿一二十十九十八十七十六十五十四
廿五 三十廿九廿八廿七廿六
瓦解忌豎造 初七初六初五初四初三初二初一十二十一初十初九初八
不值子日不忌 十九十八十七十六十五十四十三廿四廿三廿二廿一二十
三十廿九廿八廿七廿六廿五
*/
// băng tiêu kị an táng, ngõa giải kị thụ tạo
export function bangTieuNgoaGiai(nien, nguyet, nhat) {
  var n = TueChiVi(nien); // Niên Chi
  var k = 0;
  var i = n + nguyet;
  if (i > 11) i -= 12;
  var bt1 = [1, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
  var ng1 = [7, 6, 5, 4, 3, 2, 1, 12, 11, 10, 9, 8];
  //alert('Index='+i);
  //alert('Băng Tiêu Ngõa Giải n='+nien+' n='+n+' t='+nguyet+' n='+nhat);
  return k;
}

// Thu Nhật 收 = dương nguyệt hà khôi 陽月河魁 = âm nguyệt thiên cương 陰月天罡
// 收日陽月河魁陰月天罡 亥 子 丑 寅 卯 辰 巳 午 未 申 酉 戌
//  [ NHK: Địa Phá = Thu nhật ]
// kị: khởi tạo (chế tạo), an táng, an môn
export function thuNhatDiaPha(t, truc, nn) {
  // t (tiết)
  var thu = CHI[(t + 10) % 12];
  var chi = DiaChi(nn);
  var k = 0;

  if ("Thu" == TRUC12[truc] && chi == thu) k = 1;

  return k;
}

// Thiên Cương (Câu Giảo) 天罡勾絞 [ DGTNH-8] = Diệt Môn [ = NHK *** ]
// Diệt Môn kị tạo tác, an môn, táng mai tổn nhân đinh
export function thienCuong(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 2:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 3:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 4:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 5:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
    case 6:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
    case 7:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 8:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
    case 9:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 10:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 11:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 12:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
  }
  return k;
}

// Tử Thần 死神 = Bình nhật 平日 (đồng hành) = Địa Hỏa 地火 [!= Nguyệt Yếm (Địa Hỏa)]
// = dương nguyệt thiên cương 陽月天罡 = âm nguyệt hà khôi 陰月河魁
// 平日陽月天罡陰月河魁 巳 午 未 申 酉 戌 亥 子 丑 寅 卯 辰
//    tị ngọ mùi thân dậu tuất hợi tý sửu dần mão thìn
// Tử Thần kị thỉnh y, phục dược, xuất sư, chinh thảo, chủng thực thụ mộc, tiến nhân, nạp súc
// dương nguyệt thiên cương: bách sự bất nghi  [ *** ]
// âm nguyệt hà khôi: bách sự bất nghi  [ *** ]
export function tuThan(t, truc, nn) {
  // t (tiết)
  var binh = CHI[(t + 4) % 12];
  var chi = DiaChi(nn);
  var k = 0;

  if ("Bình" == TRUC12[truc] && chi == binh) k = 1;

  return k;
}

// Hà Khôi (Câu Giảo) 河魁勾絞 [ DGTNH-8, NHK ]
// Hợi Ngọ Sửu Thân Mão Tuất Tỵ Tý Mùi Dần Dậu Thìn
// kị khởi tạo, an môn
export function haKhoi(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 2:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
    case 3:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 4:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 5:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 6:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
    case 7:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 8:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 9:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 10:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 11:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
    case 12:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
  }
  return k;
}

// Câu Giảo 勾絞 [ DCTYL ] [ Hà Khôi hoặc Thiên Cương Hà Khôi ? ]
// Kị bách sự, giá thú (rước dâu), xuất hành
export function cauGiao(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
    case 2:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
    case 3:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 4:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 5:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 6:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
    case 7:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 8:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 9:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 10:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 11:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 12:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
  }
  return k;
}

// Bát Tọa 八座 [ DGTNH-32 ]
//   dậu tuất hợi tý sửu dần mão thìn tị ngọ mùi thân
// Kị phá thổ, an táng, tu phần, khai sanh phần hung; bất kị tu trạch, tạo trạch.
export function batToa(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
    case 2:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
    case 3:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 4:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 5:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 6:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 7:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 8:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
    case 9:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 10:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
    case 11:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 12:
      if (chi == CHI[8]) k = 1;
      break; // Thân
  }
  return k;
}
export function LuuNien(year) {
  var t = Math.floor(eval(year) % 9);
  if (t > 1) t = 11 - t;
  else t = 2 - t;
  return t;
}
// Thiên Hình hắc đạo 天刑黑道 [ DGTNH-28, NHK ]
// 天刑黑道 寅 辰 午 申 戌 子 寅 辰 午 申 戌 子
// Thi lệ: chánh thất phùng dần nhị bát thìn, tam cửu ngọ thượng tứ thập thân, ngũ thập nhất nguyệt nguyên cư tuất, lục thập nhị nguyệt tý vi chân.
//   dần thìn ngọ thân tuất tý dần thìn ngọ thân tuất tý
// Thiên Hình hắc đạo, thiên hình tinh, lợi vu xuất sư, chiến vô bất khắc, kì tha động tác mưu vi giai
// bất nghi dụng, đại kị từ tụng.
export function thienHinh(t, nn) {
  // t: tiet (1..12)
  var chi = DiaChi(nn);
  var k = 0;

  switch (t) {
    case 1:
    case 7:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 2:
    case 8:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
    case 3:
    case 9:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
    case 4:
    case 10:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 5:
    case 11:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
    case 6:
    case 12:
      if (chi == CHI[0]) k = 1;
      break; // Tý
  }
  return k;
}

// Chu Tước hắc đạo 朱雀黑道 [ DGTNH-28, NHK ]
// 朱雀黑道 卯 巳 未 酉 亥 丑 卯 巳 未 酉 亥 丑
// thi lệ: chánh thất cầu mão nhị bát tị, tam cửu mùi thượng tứ thập dậu, ngũ thập nhất nguyệt hợi vi chân, lục thập nhị nguyệt sửu thượng tê.
//   mão tị mùi dậu hợi sửu mão tị mùi dậu hợi sửu
// chu tước hắc đạo, thiên tụng tinh, lợi dụng công sự, thường nhân hung, chư sự kị dụng, cẩn phòng tranh tụng.
// kị giá thú, di đồ, phân cư,  xuất hành, di cư, nhập trạch, an hương, từ tụng. dĩ kì lân phù, phượng hoàng phù chế hóa.
export function chuTuoc(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 7:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 2:
    case 8:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 3:
    case 9:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 4:
    case 10:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
    case 5:
    case 11:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 6:
    case 12:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
  }
  return k;
}

// Bạch Hổ hắc đạo 白虎黑道 [ DGTNH ] = Thiên Bồng [ NHK ] = Thiên Mã 天馬 (cát nhật)
// 白虎黑道 午 申 戌 子 寅 辰 午 申 戌 子 寅 辰
// thi lệ: chánh thất mã triêu thiên, nhị bát cận hầu biên, tam cửu khuyển vi bạn, tứ thập thử chánh minh, ngũ thập nhất úy hổ, lục thập nhị long miên.
//   ngọ thân tuất tý dần thìn ngọ thân tuất tý dần thìn
// Bạch Hổ hắc đạo:  thiên sát tinh, nghi xuất sư điền liệp tế tự, giai cát, kì dư đô bất lợi.
// Bạch Hổ: kị tu tạo, giá thú, di cư, châm cứu, an táng
// Thiên Bồng: kị giá thú, khởi tạo, an táng, di cư, từ tụng (NHK)
export function bachHo(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 7:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
    case 2:
    case 8:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 3:
    case 9:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
    case 4:
    case 10:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 5:
    case 11:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 6:
    case 12:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
  }
  return k;
}

// Thiên Lao hắc đạo 天牢黑道 [ DGTNH ]
// 天牢黑道 申 戌 子 寅 辰 午 申 戌 子 寅 辰 午
// Thiên Lao hắc đạo: trấn thần tinh, âm nhân dụng sự giai cát, kì dư đô bất lợi.
// kị khởi tạo, nhập trạch, di cư,  xuất hành, giá thú, an táng, từ tụng
export function thienLao(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 7:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 2:
    case 8:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
    case 3:
    case 9:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 4:
    case 10:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 5:
    case 11:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
    case 6:
    case 12:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
  }
  return k;
}

// Huyền Vũ hắc đạo 玄武黑道 = Nguyên Vũ 元武 [ DGTNH ]
// 玄武黑道 酉 亥 丑 卯 巳 未 酉 亥 丑 卯 巳 未
// thi lệ: chánh thất phùng kê nhị bát trư, tam cửu tầm ngưu tứ thập thỏ, ngũ thập nhất nguyệt hội xà khứ, lục thập nhị nguyệt tầm dương vị
// Huyền Vũ hắc đạo: thiên ngục tinh, quân tử dụng chi cát, tiểu nhân dụng chi hung.
// kì nhật kị khai quật, thủ thổ, lập trụ thượng lương, giá thú, xuất hành, lâm quan thị sự.
// Phạm chủ nữ nhân tư tình, đạo thất tài vật
// Nguyên Vũ kị táng mai
export function huyenVu(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 7:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
    case 2:
    case 8:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 3:
    case 9:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 4:
    case 10:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 5:
    case 11:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 6:
    case 12:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
  }
  return k;
}

// Câu Trần hắc đạo 勾陳黑道 [ DGTNH ]
// 勾陳黑道 亥 丑 卯 巳 未 酉 亥 丑 卯 巳 未 酉
// thi lệ: chánh thất tầm trư nhị bát ngưu, tam cửu mão tứ thập xà hưu, ngũ thập nhất dương trình bôn tẩu, lục thập nhị lộ thượng kê lưu
//   hợi sửu mão tị mùi dậu hợi sửu mão tị mùi dậu
// Câu Trần hắc đạo: địa ngục tinh, thử thời sở tác nhất thiết sự, hữu thủy vô chung, tiên hỉ hậu bi,
//   bất lợi du vãng. Khởi tạo an táng, phạm thử tuyệt tự.
// câu trần hắc đạo kị khởi tạo, nhập trạch, tu cư, giá thú
export function cauTran(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 7:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 2:
    case 8:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 3:
    case 9:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 4:
    case 10:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 5:
    case 11:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 6:
    case 12:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
  }
  return k;
}

// Đại Sát Bạch Hổ Nhập Trung Cung (DGTNH-27)
// 大殺白虎入中宮 戊辰、丁丑、丙戌、乙未、甲辰、癸丑、壬戌
// đại sát, bách sự giai kị
export function bachHoTrungCung(nn) {
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;

  if (can == CAN[4] && chi == CHI[4]) k = 1; // mậu thìn
  else if (can == CAN[3] && chi == CHI[1]) k = 1; // đinh sửu
  else if (can == CAN[2] && chi == CHI[10]) k = 1; // bính tuất
  else if (can == CAN[1] && chi == CHI[7]) k = 1; // ất mùi
  else if (can == CAN[0] && chi == CHI[4]) k = 1; // giáp thìn
  else if (can == CAN[9] && chi == CHI[1]) k = 1; // quý sửu
  else if (can == CAN[8] && chi == CHI[11]) k = 1; // nhâm tuất
  return k;
}

// Cửu Thổ Quỷ 九土鬼 [ DCTYL, NHK, DGTNH ]
// 九土鬼 辛丑、癸巳、丁巳、乙酉、庚戌、甲午、壬寅、己酉、戊午
// kị thượng nhậm, xuất hành, khởi tạo, động thổ, giao dịch, an môn
export function cuuThoQuyNhat(nn) {
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;

  if (can == CAN[1] && chi == CHI[9]) k = 1; // ất dậu
  else if (can == CAN[9] && chi == CHI[5]) k = 1; // quý tị
  else if (can == CAN[0] && chi == CHI[6]) k = 1; // giáp ngọ
  else if (can == CAN[7] && chi == CHI[1]) k = 1; // tân sửu
  else if (can == CAN[8] && chi == CHI[2]) k = 1; // nhâm dần
  else if (can == CAN[5] && chi == CHI[9]) k = 1; // kỷ dậu
  else if (can == CAN[6] && chi == CHI[11]) k = 1; // canh tuất
  else if (can == CAN[3] && chi == CHI[5]) k = 1; // đinh tị
  else if (can == CAN[4] && chi == CHI[6]) k = 1; // mậu ngọ
  return k;
}

// Thiên Cách 天隔 [ DGTNH ]
// lịch lệ viết: chánh nguyệt khởi dần, nghịch hành lục dương thần;
// thi lệ: chánh thất phùng hổ nhị bát thử; tam cửu khuyển tứ thập hầu thị; ngũ thập nhất nguyệt mã đề hương; lục chạp hoàng long hạ hải khứ; xuất hành cầu tài thiên bất hữu; thân văn tiến chương tổng thành không
//   dần tý tuất thân ngọ thìn dần tý tuất thân ngọ thìn
// kị xuất hành, cầu tài, cầu quan
export function thienCach(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 7:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 2:
    case 8:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 3:
    case 9:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
    case 4:
    case 10:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 5:
    case 11:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
    case 6:
    case 12:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
  }
  return k;
}

// Lâm Cách 林隔 [ DGTNH ]
// thi lệ: chánh thất phùng mão thị, nhị bát lâm sửu chi, tam cửu phùng hợi thượng, tứ thập dậu nhật thị, ngũ thập nhất vị nhật, lục thập nhị tị khuy, xuất hành tịnh bộ liệp, phạm thử không hồi khứ
// kị xuất hành, bộ liệp (săn bắn)
export function lamCach(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 7:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 2:
    case 8:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 3:
    case 9:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 4:
    case 10:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
    case 5:
    case 11:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 6:
    case 12:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
  }
  return k;
}

// Địa Cách 地隔 [ DGTNH ]
// thi lệ: chánh thất long thổ vị, nhị bát hổ khiếu phong, tam cửu thử tử khiếu; tứ thập khuyển tương phùng;
//   ngũ thập nhất hầu vũ, lục chạp mã đằng không; mai táng kiêm chủng thực, phí lực tổng vô công
// kị chủng thực, an táng
export function diaCach(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 7:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
    case 2:
    case 8:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 3:
    case 9:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 4:
    case 10:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
    case 5:
    case 11:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 6:
    case 12:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
  }
  return k;
}

// Thần Cách 神隔 [ DGTNH, NHK ]
// thi lệ: chánh thất xà thổ diễm, nhị bát thỏ nhi miên, tam cửu lưỡng ngưu vọng, tứ thập viễn trư nguyện,
//   ngũ thập nhất kê khiếu, lục chạp dương quy quyển, cầu thần không phí lực, hội tố vô linh nghiệm
//   [ tị mão sửu hợi dậu mùi tị mão sửu hợi dậu mùi ]
// kị kì phúc, tế tự
export function thanCach(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 7:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 2:
    case 8:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 3:
    case 9:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 4:
    case 10:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 5:
    case 11:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
    case 6:
    case 12:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
  }
  return k;
}

// Hỏa Cách 火隔 [ DGTNH ]
//   chánh thất mã đằng không, nhị bát long quy hải, tam cửu hổ khiếu phong,
//   tứ thập thử quá nhai, ngũ thập nhất khuyển phệ, lục chạp viên hầu lai, diêu dã lô cập táo, ổi tận ki đa sài
// kị châm cứu, diêu dã (đúc lò)
export function hoaCach(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 7:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
    case 2:
    case 8:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
    case 3:
    case 9:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 4:
    case 10:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 5:
    case 11:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
    case 6:
    case 12:
      if (chi == CHI[8]) k = 1;
      break; // Thân
  }
  return k;
}

// Sơn Cách 山隔 [ DGTNH ]
// thi lệ: chánh thất phùng mùi nhị bát tị, tam cửu mão tứ thập sửu thị,
//    ngũ thập nhất hợi lạp nguyên dậu, nhập sơn bộ liệp không lao khứ
// kị bộ liệp, nhập sơn phạt mộc
export function sonCach(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 7:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 2:
    case 8:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 3:
    case 9:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 4:
    case 10:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 5:
    case 11:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 6:
    case 12:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
  }
  return k;
}

// Quỷ Cách 鬼隔 [ DGTNH ]
// thi lệ: chánh thất nguyên thân nhị bát ngọ; tam cửu thần tứ thập thị hổ;
//   ngũ thập nhất tý chạp tuất chân, tế tự túy tà vô ứng hộ
//   thân ngọ thìn dần tý tuất thân ngọ thìn dần tý tuất
// kị tế tự, kì phúc
export function quyCach(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 7:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 2:
    case 8:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
    case 3:
    case 9:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
    case 4:
    case 10:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 5:
    case 11:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 6:
    case 12:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
  }
  return k;
}

// Nhân Cách 人隔 [ DGTNH = NHK ]
// thi lệ: chánh thất kim kê khiếu, nhị bát đê dương miên, tam cửu xà đương lộ, tứ thập thỏ nhi phì, ngũ thập nhất ngưu khiếu, lục chạp trư tác biến
//   chánh nguyệt khởi dậu, nghịch hành lục âm thần
// kị tiến nhân khẩu, giá thú
export function nhanCach(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 7:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
    case 2:
    case 8:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 3:
    case 9:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 4:
    case 10:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 5:
    case 11:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 6:
    case 12:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
  }
  return k;
}

// Thủy Cách 水隔 [ DGTNH ]
// thi lệ: chánh thất tu tri khuyển, nhị bát khán viên hầu, tam cửu kị mã tẩu;
//    tứ thập bản long đầu, ngũ thập nhất hổ khiếu, lục thập nhị tý sầu
// kị khai đường, bộ ngư, xuyên tỉnh, hành thuyền, chủng cốc, tài mộc
export function thuyCach(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 7:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
    case 2:
    case 8:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 3:
    case 9:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
    case 4:
    case 10:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
    case 5:
    case 11:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 6:
    case 12:
      if (chi == CHI[0]) k = 1;
      break; // Tý
  }
  return k;
}

// Châu Cách 州隔 [ DGTNH-10 ]
// thi lệ: chánh thất tầm trư nhị bát kê, tam cửu dương tứ thập xà thị,
//    ngũ thập nhất thỏ chạp ngưu tẩu, đầu từ cáo tụng vô chuẩn thời
// kị từ tụng
export function chauCach(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 7:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 2:
    case 8:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
    case 3:
    case 9:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 4:
    case 10:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 5:
    case 11:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 6:
    case 12:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
  }
  return k;
}

// Nguyệt Hình 月刑 [ DGTNH-05 ]
//   tị tý thìn thân ngọ sửu dần dậu mùi hợi mão tuất
// Kị: xuất quân, công chiến, dưỡng dục, sanh tài, kết hôn nhân, doanh tạo ốc xá
export function nguyetHinh(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 2:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 3:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
    case 4:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 5:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
    case 6:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 7:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 8:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
    case 9:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 10:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 11:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 12:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
  }
  return k;
}

// Phá Bại Tinh 破敗星 [ DGTNH-10, NHK ] = Thiên Lao
// 天牢黑道 申 戌 子 寅 辰 午 申 戌 子 寅 辰 午
//   chánh nguyệt khởi thân, thuận hành lục dương thần
//   thân tuất tý dần thìn ngọ thân tuất tý dần thìn ngọ
// kị tạo tác (chế tạo)
export function phaBai(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 7:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 2:
    case 8:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
    case 3:
    case 9:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 4:
    case 10:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 5:
    case 11:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
    case 6:
    case 12:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
  }
  return k;
}

// Ương Bại 殃敗 [ DGTNH-13, DCTY, NHK ]
//    chánh nguyệt mỗi chí mão cung khởi, nghịch tòng dần sửu tý hợi khứ,
//    chu hồi thập nhị chi thần thủ. (mão dần sửu tý hợi tuất dậu thân mùi ngọ tị thìn)
// Ương Bại kị xuất quân, phó nhậm, tu thương khố, khai thị, giao dịch, nạp tài
export function uongBai(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 2:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 3:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 4:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 5:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 6:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
    case 7:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
    case 8:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 9:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 10:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
    case 11:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 12:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
  }
  return k;
}

// Kiếp Sát 劫煞 [ DGTNH-4 ]
// chánh nguyệt khởi hợi, nghịch hành tứ mạnh:
//   dần, thân, tị, hợi nguyệt trị thu nhật;
//   thìn, tuất, sửu, mùi nguyệt trị trừ nhật;
//   tý, ngọ, mão, dậu nguyệt trị chấp nhật
//   [ hợi thân tị dần hợi thân tị dần hợi thân tị dần ]
// Kị mọi thứ mọi sự: kị động thổ, lâm quan thị sự, nạp lễ thành thân, chiến phạt hành quân, xuất nhập hưng phiến
export function kiepSat(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 5:
    case 9:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 2:
    case 6:
    case 10:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 3:
    case 7:
    case 11:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 4:
    case 8:
    case 12:
      if (chi == CHI[2]) k = 1;
      break; // Dần
  }
  return k;
}

// Mộ Khố Sát 墓庫煞 (PSD m1018b.html)
// Nguyệt Lưu Tam Sát: Kiếp, Tai, & Mộ khố Sát
//   sửu tuất mùi thìn sửu tuất mùi thìn sửu tuất mùi thìn
export function moKhoSat(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 5:
    case 9:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 2:
    case 6:
    case 10:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
    case 3:
    case 7:
    case 11:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 4:
    case 8:
    case 12:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
  }
  return k;
}

// Nguyệt Sát 月煞 = Nguyệt Hư 月虛 [ DGTNH-4 ]
//   chánh nguyệt khởi sửu, nghịch hành tứ quý:
//   [ sửu tuất mùi thìn sửu tuất mùi thìn sửu tuất mùi thìn ]
// Kị: tiếp khách, xuyên đục, trồng trọt, nạp gia xúc
// nguyệt sát: kị khai thương khố, xuất tài vật, kết hôn, xuất hành, đình tân khách, hưng xuyên quật, doanh chủng thực, nạp quần súc
// nguyệt hư: kị tu thương khố, khai thương khố, xuất hóa tài, vận động, chinh hành, thành thân lễ
export function nguyetSat(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 5:
    case 9:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 2:
    case 6:
    case 10:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
    case 3:
    case 7:
    case 11:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 4:
    case 8:
    case 12:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
  }
  return k;
}

// Nguyệt Hại 月害 [ DGTNH ] = Nguyệt Hỏa 月火= Độc Hỏa 獨火 (NHK)
//   chánh nguyệt khởi tị, nghịch hành thập nhị thần
//   tị thìn mão dần sửu tý hợi tuất dậu thân mùi ngọ
// Kị: kết hôn, mời thầy chữa bệnh, công thành, giã chiến, mướn người làm, chăn nuôi
// Nguyệt Hỏa kị khởi tạo, châm cứu, cái ốc, tác táo, tố họa thần tượng
// Độc Hỏa kị khởi tạo, châm cứu, cái ốc, tác táo, tố họa thần tượng
export function nguyetHai(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 2:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
    case 3:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 4:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 5:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 6:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 7:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 8:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
    case 9:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
    case 10:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 11:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 12:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
  }
  return k;
}

// Dương Công Kị 楊公忌 [ DGTNH, NHK ]
// 民间口诀描述：
//    神仙留下十三日，举动须防多损失；一切起造和兴工，不遭火盗定遭凶；
//    婚姻嫁娶亦非宜，不到白头终不吉；人生出世遇此日，劳劳碌碌得还失；
//    安葬若还逢此日，后代儿孙必乞食；上官赴任用此日，破贼多愁主革职。
// bách sự kị
// Việc: cưới xin, làm nhà cửa, vui mừng khai hạ, xuất hành đi xa, khai trương cửa hàng,
// cửa hiệu, gieo mạ cấy lúa, tế tự, thương biểu, nhập học, xuất quân, an táng v.v.
// Thường bắt đầu làm bất cứ việc gì như động thổ, khai bút, khai ấn, nhậm chức v.v.
export function duongCong(th, n) {
  // th: tháng âm lịch bắt đầu từ mồng 1
  var k = 0;
  switch (th) {
    case 1:
      if (n == 13) k = 1;
      break;
    case 2:
      if (n == 11) k = 1;
      break;
    case 3:
      if (n == 9) k = 1;
      break;
    case 4:
      if (n == 7) k = 1;
      break;
    case 5:
      if (n == 5) k = 1;
      break;
    case 6:
      if (n == 3) k = 1;
      break;
    case 7:
      if (n == 1 || n == 29) k = 1;
      break;
    case 8:
      if (n == 27) k = 1;
      break;
    case 9:
      if (n == 25) k = 1;
      break;
    case 10:
      if (n == 23) k = 1;
      break;
    case 11:
      if (n == 21) k = 1;
      break;
    case 12:
      if (n == 19) k = 1;
      break;
  }
  return k;
}

// Thiên Địa Hung Bại 天地凶敗 [ DGTNH ]
// kị thượng quan, xuất hành, khai thị, giao dịch, nhập trạch
export function thienDiaHungBai(th, n) {
  // th: tháng âm lịch bắt đầu từ mồng 1
  var k = 0;
  switch (th) {
    case 1:
      if (n == 7 || n == 21) k = 1;
      break;
    case 2:
      if (n == 8 || n == 19) k = 1;
      break;
    case 3:
      if (n == 1 || n == 12) k = 1;
      break;
    case 4:
      if (n == 9 || n == 25) k = 1;
      break;
    case 5:
      if (n == 15 || n == 25) k = 1;
      break;
    case 6:
      if (n == 1 || n == 20) k = 1;
      break;
    case 7:
      if (n == 8 || n == 21) k = 1;
      break;
    case 8:
      if (n == 2 || n == 18) k = 1;
      break;
    case 9:
      if (n == 3 || n == 16) k = 1;
      break;
    case 10:
      if (n == 1 || n == 14) k = 1;
      break;
    case 11:
      if (n == 14 || n == 15) k = 1;
      break;
    case 12:
      if (n == 9 || n == 25) k = 1;
      break;
  }
  return k;
}

// Xích Tùng Tử Hạ Giáng 赤松子忌
// kị giá thú, nhập trạch
export function xichTungTu(t, n) {
  // th: tháng âm lịch bắt đầu từ mồng 1
  var k = 0;
  switch (t) {
    case 1:
      if (n == 7 || n == 11) k = 1;
      break;
    case 2:
      if (n == 9 || n == 19) k = 1;
      break;
    case 3:
      if (n == 15 || n == 16) k = 1;
      break;
    case 4:
      if (n == 9 || n == 22) k = 1;
      break;
    case 5:
      if (n == 9 || n == 14) k = 1;
      break;
    case 6:
      if (n == 10 || n == 20) k = 1;
      break;
    case 7:
      if (n == 8 || n == 23) k = 1;
      break;
    case 8:
      if (n == 18 || n == 29) k = 1;
      break;
    case 9:
      if (n == 2 || n == 30) k = 1;
      break;
    case 10:
      if (n == 1 || n == 14) k = 1;
      break;
    case 11:
      if (n == 2 || n == 21) k = 1;
      break;
    case 12:
      if (n == 1 || n == 30) k = 1;
      break;
  }
  return k;
}

// Thiên Cẩu 天狗 = Mãn nhật 滿 [ DGTNH-07 ] = Địa Thư 地雌 = Thổ Ôn 土瘟
//   thìn tị ngọ mùi thân dậu tuất hợi tý sửu dần mão
// Thiên Cẩu kị giá thú, sanh sản
// Thổ Ôn kị động thổ, xuyên tỉnh
// Địa Thư kị giá thú
export function thienCau(t, truc, nn) {
  // t (tiết)
  var man = CHI[(t + 3) % 12];
  var chi = DiaChi(nn);
  var k = 0;

  if ("Mãn" == TRUC12[truc] && chi == man) k = 1;

  return k;
}

// Tử Khí 死氣 = trực Định 定 = Quan Phù 官符 = Thời Âm 時陰 (cát nhật) [ DGTNH, NHK ]
//   thường cư nguyệt kiến tiền tứ thần (trực Định)
//   chánh nguyệt khởi ngọ thuận hành thập nhị thần
// Quan Phù: kị bái quan, thị sự, thượng biểu chương, trần từ tụng
// Tử Khí: kị khởi tạo, động thổ, di cư, tạo tửu khúc tương thố
export function tuKhi(t, truc, nn) {
  var dinh = CHI[(t + 5) % 12];
  var chi = DiaChi(nn);
  var k = 0;

  if ("Định" == TRUC12[truc] && chi == dinh) k = 1;

  return k;
}

// Tiểu Hao 小耗 = trực Chấp 執 = Chi Đức 枝德 (cát tinh) [ DGTNH, NHK, lịch lệ ]
//   chánh nguyệt tại mùi, thuận hành thập nhị thần
// kị kinh doanh, chủng thi (trồng cấy lại), nạp tài, giao dịch, khai thị, lập khoán, xuất hóa tài
// với thiên đức, nguyệt đức, thiên đức hợp, nguyệt đức hợp, thiên nguyện tinh, tắc bất kị
export function tieuHao(t, truc, nn) {
  // t (tiết)
  var chap = CHI[(t + 6) % 12];
  var chi = DiaChi(nn);
  var k = 0;

  if ("Chấp" == TRUC12[truc] && chi == chap) k = 1;

  return k;
}

// Đại Hao 大耗 = Nguyệt Phá 月破 = trực Phá 破 [ DGTNH, NHK  lịch lệ ]
//   chánh nguyệt khởi thân, thuận hành thập nhị thần
// đại hao: kị khai thị, lập khoán, giao dịch, nạp tài, kì phúc, cầu tự, yến hội, kết hôn nhân, giá thú, an sàng, phá thổ, an táng
// nguyệt phá: bách sự bất nghi
export function daiHao(t, truc, nn) {
  // t (tiết)
  var pha = CHI[(t + 7) % 12];
  var chi = DiaChi(nn);
  var k = 0;

  if ("Phá" == TRUC12[truc] && chi == pha) k = 1;

  return k;
}

// Thổ Cấm 土禁 , Phục Tội 伏罪, Kim Đao 金刀 [ DGTNH-06, NHK ]
// Lịch lệ: xuân hợi, hạ dần, thu tị, đông thân
// thổ cấm kị an táng
// phục tội kị thượng quan, luận tụng
// kim đao kị phạt mộc, khởi tạo, giá mã
export function thoCam(T, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (T) {
    case 0:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 1:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 2:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 3:
      if (chi == CHI[8]) k = 1;
      break; // Thân
  }
  return k;
}

// Vãng Vong 往亡 = Thổ Kỵ 土忌 [ DGTNH, DCTYL, NHK ]
//   dần tị thân hợi mão ngọ dậu tý thìn mùi tuất sửu
// kị bái quan thượng nhậm, viễn hành, quy gia, xuất quân chinh thảo, giá thú, tầm y, phó nhậm, xuất hành, giá thú, cầu mưu
// thổ kị: kị an táng
export function vangVong(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 2:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 3:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 4:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 5:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 6:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
    case 7:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
    case 8:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 9:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
    case 10:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 11:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
    case 12:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
  }
  return k;
}

// Khí Vãng Vong 氣往亡 [ DGTNH-17, PSD *** ]
// lịch lệ viết: khí vãng vong giả; lập xuân hậu thất nhật, kinh chập hậu thập tứ nhật, thanh minh hậu nhị thập nhất nhật, lập hạ hậu bát nhật, mang chủng hậu thập lục nhật, tiểu thử hậu nhị thập tứ nhật, lập thu hậu cửu nhật, bạch lộ hậu thập bát nhật, hàn lộ hậu nhị thập thất nhật, lập đông hậu thập nhật, đại tuyết hậu nhị thập nhật, tiểu hàn hậu tam thập nhật; giai tự giao tiết nhật sổ chi.
// kị hành binh, giá thú, xuất hành, cầu tài
export function khiVangVong(t, tn, nn) {
  // t: tiet (1..12)
  var k = 0;
  switch (t) {
    case 1:
      if (nn - tn == 7) k = 1;
      break; // sau lập xuân 7 ngày
    case 2:
      if (nn - tn == 14) k = 1;
      break; // sau kinh chập 14 ngày
    case 3:
      if (nn - tn == 21) k = 1;
      break; // sau thanh minh 21 ngày
    case 4:
      if (nn - tn == 8) k = 1;
      break; // sau lập hạ 8 ngày
    case 5:
      if (nn - tn == 16) k = 1;
      break; // sau mang chủng 16 ngày
    case 6:
      if (nn - tn == 24) k = 1;
      break; // sau tiểu thử 24 ngày
    case 7:
      if (nn - tn == 9) k = 1;
      break; // sau lập thu 9 ngày
    case 8:
      if (nn - tn == 18) k = 1;
      break; // sau bạch lộ 18 ngày
    case 9:
      if (nn - tn == 27) k = 1;
      break; // sau hàn lộ 27 ngày
    case 10:
      if (nn - tn == 10) k = 1;
      break; // sau lập đông 10 ngày
    case 11:
      if (nn - tn == 20) k = 1;
      break; // sau đại tuyết 20 ngày
    case 12:
      if (nn - tn == 30) k = 1;
      break; // sau tiểu hàn 30 ngày
  }
  return k;
}

// Tai Sát 災煞 = Thiên Hỏa 天火 = Phi Ma Sát 披麻煞 = Thiên Ngục 天獄 [ DGTNH-4,27 ] (FSD m1018b.html)
// 天獄  子  卯 午  酉  子  卯  午  酉  子  卯  午  酉
//    chánh nguyệt tại tý, thuận hành tứ trọng:
//    dần, ngọ, tuất nguyệt tý nhật;
//    hợi, mão, mùi nguyệt mão nhật;
//    thân, tý, thìn nguyệt ngọ nhật;
//    tị, dậu, sửu nguyệt dậu nhật
//   [ tý mão ngọ dậu tý mão ngọ dậu tý mão ngọ dậu ]
// kị giá thú, hội họp thân quyến, lập gia đình
// Thiên Hỏa kị xây cất nhà cửa, xuất thân chinh phạt
// Phi Ma Sát kị giá thú, nhập trạch
// Thiên Ngục kị hiến phong chương, hưng từ tụng, phó nhậm, chinh thảo
export function taiSatPhiMa(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 5:
    case 9:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 2:
    case 6:
    case 10:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 3:
    case 7:
    case 11:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
    case 4:
    case 8:
    case 12:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
  }
  return k;
}

// Tọa Sát đại họa 坐煞 [ DGTNH *** ]
//   quý tân đinh ất quý tân đinh ất quý tân đinh ất
// tu phương bất khả dụng
export function toaSat(t, nn) {
  var can = ThienCan(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 5:
    case 9:
      if (can == CAN[9]) k = 1;
      break; // Quý
    case 2:
    case 6:
    case 10:
      if (can == CAN[7]) k = 1;
      break; // Tân
    case 3:
    case 7:
    case 11:
      if (can == CAN[3]) k = 1;
      break; // Đinh
    case 4:
    case 8:
    case 12:
      if (can == CAN[1]) k = 1;
      break; // Ất
  }
  return k;
}

// Hỏa Tinh 火星凶日 [ DGTNH-17 ]
// dần thân tị hợi nguyệt: ất sửu, giáp tuất, quý mùi, nhâm thìn, tân sửu, canh tuất, kỷ mùi.
// tý ngọ mão dậu nguyệt: giáp tý, quý dậu, nhâm ngọ, tân mão, canh tý, kỷ dậu, mậu ngọ.
// thìn tuất sửu mùi nguyệt: nhâm thân, tân tị, canh dần, kỷ hợi, mậu thân, đinh tị.
// kị thụ tạo, tu cái ốc vũ, tảo xá, tài y, tạo tác mộc giới, long táo
export function hoaTinh(t, nn) {
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 4:
    case 7:
    case 10:
      if ((can == CAN[1] || can == CAN[7]) && chi == CHI[1])
        k = 1; // Ất Sửu, Tân Sửu
      else if ((can == CAN[0] || can == CAN[6]) && chi == CHI[10])
        k = 1; // Giáp Tuất, Canh Tuất
      else if ((can == CAN[5] || can == CAN[9]) && chi == CHI[7])
        k = 1; // Kỷ Mùi, Quý Mùi
      else if (can == CAN[8] && chi == CHI[4]) k = 1; // Nhâm Thìn
      break;
    case 2:
    case 5:
    case 8:
    case 11:
      if ((can == CAN[0] || can == CAN[6]) && chi == CHI[0])
        k = 1; // Giáp Tý, Canh Tý
      else if ((can == CAN[5] || can == CAN[9]) && chi == CHI[9])
        k = 1; // Kỷ Dậu, Quý Dậu
      else if ((can == CAN[8] || can == CAN[4]) && chi == CHI[6])
        k = 1; // Nhâm Ngọ, Mậu Ngọ
      else if (can == CAN[7] && chi == CHI[3]) k = 1; // Tân Mão
      break;
    case 3:
    case 6:
    case 9:
    case 12:
      if ((can == CAN[0] || can == CAN[8]) && chi == CHI[4])
        k = 1; // Giáp Thìn, Nhâm Thìn (DCTYL: nhâm thân, mậu thân ?)
      else if ((can == CAN[7] || can == CAN[3]) && chi == CHI[5])
        k = 1; // Tân Tỵ, Đinh Tỵ
      else if (can == CAN[5] && chi == CHI[11]) k = 1; // Kỷ Hợi
      else if (can == CAN[6] && chi == CHI[2]) k = 1; // Canh Dần
      break;
  }
  return k;
}

// Bát Phong 八風 [ DGTNH ]
//  lịch lệ: xuân đinh sửu, kỷ dậu; hạ giáp thân, giáp thìn; thu thu tân mùi, đinh mùi; đông giáp tuất, giáp dần
// kị: thừa ngư, hành thuyền, thừa thuyền, độ thủy, cái ốc (lợp nhà).
// Đi với thiên đức, nguyệt đức, thiên đức hợp, nguyệt đức hợp, lục hợp tinh không kị
export function batPhong(T, nn) {
  // T (0...3) & nn: lunar.dd
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;

  switch (T) {
    case 0: // Xuân Đinh Sửu, Kỷ Dậu
      if ((can == CAN[3] && chi == CHI[1]) || (can == CAN[5] && chi == CHI[9]))
        k = 1;
      break;
    case 1: // Hạ Giáp Thân, Giáp Thìn
      if ((can == CAN[0] && chi == CHI[8]) || (can == CAN[0] && chi == CHI[4]))
        k = 1;
      break;
    case 2: // Thu Tân Mùi, Đinh Mùi
      if ((can == CAN[7] && chi == CHI[7]) || (can == CAN[3] && chi == CHI[7]))
        k = 1;
      break;
    case 3: // Đông Giáp Tuất, Giáp Dần
      if ((can == CAN[0] && chi == CHI[10]) || (can == CAN[2] && chi == CHI[4]))
        k = 1;
      break;
  }
  return k;
}

// Khước Sát ????????????????????
export function khuocSat(nn) {
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;
  // Đinh Sửu, Đinh Mùi, Đinh Tị, Đinh Hợi; Giáp Thân, Giáp Tuất, Giáp Thìn, Giáp Dần
  if (
    can == CAN[3] &&
    (chi == CHI[1] || chi == CHI[7] || chi == CHI[5] || chi == CHI[11])
  )
    k = 1;
  else if (
    can == CAN[0] &&
    (chi == CHI[8] || chi == CHI[10] || chi == CHI[4] || chi == CHI[2])
  )
    k = 1;
  return k;
}

// Thần Hiệu 神號, 神嚎 [ PSD, NHK *** ]
// Tuất, Hợi, Tý, Sửu, Dần, Mão, Thìn, Tỵ, Ngọ, Mùi, Thân, Dậu
// Kị kì phúc, trai tiếu; phùng thiên hỉ tắc cát, kị chữa bệnh
export function thanHieu(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
    case 2:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 3:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 4:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 5:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 6:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 7:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
    case 8:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 9:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
    case 10:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 11:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 12:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
  }
  return k;
}

// Quỷ Khốc 鬼哭 [ PSD, NHK *** ]
// Mùi, Tuất, Thìn, Dần, Ngọ, Tý, Dậu, Thân, Tỵ, Hợi, Sửu, Mão
// quỷ khốc kị thành phục, trừ phụ; kị chữa bệnh
export function quyKhoc(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 2:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
    case 3:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
    case 4:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 5:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
    case 6:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 7:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
    case 8:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 9:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 10:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 11:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 12:
      if (chi == CHI[3]) k = 1;
      break; // Mão
  }
  return k;
}

// Thượng Sóc nhật 上朔 [ DGTNH-28 ]
// Lịch lệ: giáp niên quý hợi, ất niên kỷ tị, bính niên ất hợi, đinh niên tân tị, mậu niên đinh hợi, kỷ niên quý tị, canh niên kỷ hợi, tân niên ất tị, nhâm niên tân hợi, quý niên đinh tị
// Kị: yến hội, giá thú, viễn hành, thượng quan, nhập trạch
export function thuongSoc(nien, nn) {
  // nien (2007=Đinh+Sửu ... Tân Tỵ
  var nc = TueCanVi(nien); // Niên Can
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;

  switch (nc) {
    case 0:
      if (can == CAN[9] && chi == CHI[11]) k = 1;
      break; // Quí Hợi
    case 1:
      if (can == CAN[5] && chi == CHI[5]) k = 1;
      break; // Kỷ Tỵ
    case 2:
      if (can == CAN[1] && chi == CHI[11]) k = 1;
      break; // Ất Hợi
    case 3:
      if (can == CAN[7] && chi == CHI[5]) k = 1;
      break; // Tân Tỵ
    case 4:
      if (can == CAN[3] && chi == CHI[11]) k = 1;
      break; // Đinh Hợi
    case 5:
      if (can == CAN[9] && chi == CHI[5]) k = 1;
      break; // Quí Tỵ
    case 6:
      if (can == CAN[5] && chi == CHI[11]) k = 1;
      break; // Kỷ Hợi
    case 7:
      if (can == CAN[1] && chi == CHI[11]) k = 1;
      break; // Ất Tỵ
    case 8:
      if (can == CAN[7] && chi == CHI[11]) k = 1;
      break; // Quí Hợi
    case 9:
      if (can == CAN[3] && chi == CHI[11]) k = 1;
      break; // Quí Tỵ
  }
  return k;
}

// Xích Khẩu 赤口 [ DGTNH *** ]
// bất nghi hội khách, phạm chi chủ khẩu thiệt tranh cạnh
export function xichKhau(nien, th, n) {
  // nien (2007)
  var am = TueCanVi(nien) % 2; // Âm Dương Niên
  var k = 0;

  switch (th) {
    case 1:
    case 7:
      if (!am) {
        if (n == 6 || n == 12 || n == 18 || n == 24 || n == 30) k = 1;
      } else {
        if (n == 3 || n == 9 || n == 15 || n == 21 || n == 27) k = 1;
      }
      break;
    case 2:
    case 8:
      if (!am) {
        if (n == 5 || n == 11 || n == 17 || n == 23 || n == 29) k = 1;
      } else {
        if (n == 2 || n == 8 || n == 14 || n == 20 || n == 30) k = 1;
      }
      break;
    case 3:
    case 9:
      if (!am) {
        if (n == 4 || n == 10 || n == 16 || n == 22 || n == 28) k = 1;
      } else {
        if (n == 1 || n == 7 || n == 13 || n == 19 || n == 25) k = 1;
      }
      break;
    case 4:
    case 10:
      if (!am) {
        if (n == 3 || n == 9 || n == 15 || n == 21 || n == 27) k = 1;
      } else {
        if (n == 6 || n == 12 || n == 18 || n == 24 || n == 30) k = 1;
      }
      break;
    case 5:
    case 11:
      if (!am) {
        if (n == 2 || n == 8 || n == 14 || n == 20 || n == 26) k = 1;
      } else {
        if (n == 5 || n == 11 || n == 17 || n == 23 || n == 29) k = 1;
      }
      break;
    case 6:
    case 12:
      if (!am) {
        if (n == 1 || n == 7 || n == 13 || n == 19 || n == 25) k = 1;
      } else {
        if (n == 4 || n == 10 || n == 16 || n == 22 || n == 29) k = 1;
      }
      break;
  }
  return k;
}

// Phản Chi 反支 [ DGTNH-16 ]
//  phản chi dĩ nguyệt sóc: đắc tuất hợi nhật giả, sơ nhất nhật; đắc thân dậu nhật giả, sơ nhị nhật;
//  đắc ngọ vị nhật giả, sơ tam nhật; đắc thần tị nhật giả, sơ tứ nhật;
//  đắc dần mão nhật giả, sơ ngũ nhật; đắc tý sửu nhật giả, sơ lục nhật
// kị thượng sách, tiến biểu chương, trần từ tụng
export function phanChi(n, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (chiVi(chi)) {
    case 0:
    case 1:
      if (n == 6) k = 1;
      break;
    case 2:
    case 3:
      if (n == 5) k = 1;
      break;
    case 4:
    case 5:
      if (n == 4) k = 1;
      break;
    case 6:
    case 7:
      if (n == 3) k = 1;
      break;
    case 8:
    case 9:
      if (n == 2) k = 1;
      break;
    case 10:
    case 11:
      if (n == 1) k = 1;
      break;
  }
  return k;
}

// Cửu Tiêu 九焦 = Khô Tiêu 枯焦 = Cửu Khảm 九坎 [ DGTNH]
//   chánh nguyệt tại thìn, nghịch hành tứ quý; ngũ nguyệt tại mão, nghịch hành tứ trọng, cửu nguyệt tại dần, nghịch hành tứ mạnh
//   chánh nguyệt phùng long nhị nguyệt ngưu, tam khuyển tứ dương ngũ thỏ đầu, lục thử thất kê bát thị mã,
//   cửu hổ thập trư canh lao sầu, thập nhất nguyệt trung thân thượng tọa, thập nhị nguyệt tị canh vi ưu
// cửu tiêu, cửu khảm: kị chủng thực, chú tả (đúc rót), thiêu diêu (đốt lò)
export function cuuTieu(t, nn) {
  // t: tiet (1..12)
  var chi = DiaChi(nn);
  var k = 0;

  switch (t) {
    case 1:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
    case 2:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 3:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
    case 4:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 5:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 6:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 7:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
    case 8:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
    case 9:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 10:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 11:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 12:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
  }
  return k;
}

// Tài Ly 財離 = Tuế Không 歲空 [ DGTNH-05,27 ]
// chánh long nhị ngưu tam khuyển thị; tứ dương ngũ hổ lục thử tý; thất kê bát mã cửu trư đầu; thập thỏ thập nhất thân chạp tị
// 財離歲空 辰 丑 戌 未 寅 子 酉 午 亥 卯 申 巳
// thìn, sửu, tuất, mùi, dần, tý, dậu, ngọ, hợi, mão, thân, tị
export function taiLyTueKhong(t, nn) {
  // t: tiet (1..12)
  var chi = DiaChi(nn);
  var k = 0;

  switch (t) {
    case 1:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
    case 2:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 3:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
    case 4:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 5:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 6:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 7:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
    case 8:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
    case 9:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 10:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 11:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 12:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
  }
  return k;
}

// Cửu Không 九空 [ DGTNH-27 ]
// 九空 辰 丑 戌 未 辰 丑 戌 未 辰 丑 戌 未
//   chánh nguyệt tại thìn, nghịch hành tứ quý
//   thìn sửu tuất mùi thìn sửu tuất mùi thìn sửu tuất mùi
// [ != NHK: thìn sửu tuất mùi mão tý dậu ngọ dần hợi thân tị  ]
// Kị: xuất hành, cầu tài, khai thương
// cửu không kị xuất hành, khai thương khố điếm, an sàng, tố họa thần tượng, tu lục súc lan phương
export function cuuKhong(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 5:
    case 9:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
    case 2:
    case 6:
    case 10:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 3:
    case 7:
    case 11:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
    case 4:
    case 8:
    case 12:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
  }
  return k;
}

// Tuế Phá 歲破 [ PSD, DGTNH-29 ]
// 歲破 午 未 申 酉 戌 亥 子 丑 寅 卯 辰 巳
// ngọ mùi thân dậu tuất hợi tý sửu dần mão thìn tị
// bách sự kị
export function tuePha(nien, nn) {
  // nien (2007)
  var nc = TueChiVi(nien); // Niên Chi
  var chi = DiaChi(nn);
  var k = 0;

  switch (nc) {
    case 0:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
    case 1:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 2:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 3:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
    case 4:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
    case 5:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 6:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 7:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 8:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 9:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 10:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
    case 11:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
  }
  return k;
}

// Ngũ Mộ 五墓 [ DGTNH ]
//   chánh, nhị nguyệt ất mùi; tứ, ngũ nguyệt bính tuất; thất, bát nguyệt tân sửu;
//   thập nguyệt, thập nhất nguyệt nhâm thìn; tứ quý nguyệt mậu thìn
// Kị: doanh tạo, khởi thổ, động thổ, giá thú, xuất quân
export function nguMo(t, nn) {
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 2:
      if (can == CAN[1] && chi == CHI[7]) k = 1;
      break; // Ất Mùi
    case 4:
    case 5:
      if (can == CAN[2] && chi == CHI[10]) k = 1;
      break; // Bính Tuất
    case 7:
    case 8:
      if (can == CAN[7] && chi == CHI[1]) k = 1;
      break; // Tân Sửu
    case 10:
    case 11:
      if (can == CAN[8] && chi == CHI[4]) k = 1;
      break; // Nhâm Thìn
    case 3:
    case 6:
    case 9:
    case 12:
      if (can == CAN[4] && chi == CHI[4]) k = 1;
      break; // Tứ Quí: Mậu Thìn
  }
  return k;
}

// [ TCTB *** ]
// Đại Phạm Thổ: Canh Ngọ, Tân Mùi, Nhâm Thân, Quí Dậu, Giáp Tuất, Ất Hợi, và Bính Tý
export function daiPhamTho(nn) {
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;
  if (can == CAN[6] && chi == CHI[6]) k = 1; // Canh Ngọ
  else if (can == CAN[7] && chi == CHI[7]) k = 1; // Tân Mùi
  else if (can == CAN[8] && chi == CHI[8]) k = 1; // Nhâm Thân
  else if (can == CAN[9] && chi == CHI[9]) k = 1; // Quí Dậu
  else if (can == CAN[0] && chi == CHI[10]) k = 1; // Giáp Tuất
  else if (can == CAN[1] && chi == CHI[11]) k = 1; // Ất Hợi
  else if (can == CAN[2] && chi == CHI[0]) k = 1; // Bính Tý
  return k;
}

// [ TCTB *** ]
// Tiểu Phạm Thổ: Mậu Dần, Kỷ Mão, Canh Thìn, Tân Tỵ, Nhâm Ngọ, Quí Mùi, Giáp Thân
export function tieuPhamTho(nn) {
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;
  if (can == CAN[4] && chi == CHI[2]) k = 1; // Mậu Dần
  else if (can == CAN[5] && chi == CHI[3]) k = 1; // Kỷ Mão
  else if (can == CAN[6] && chi == CHI[4]) k = 1; // Canh Thìn
  else if (can == CAN[7] && chi == CHI[5]) k = 1; // Tân Tỵ
  else if (can == CAN[8] && chi == CHI[6]) k = 1; // Nhâm Ngọ
  else if (can == CAN[9] && chi == CHI[7]) k = 1; // Quí Mùi
  else if (can == CAN[0] && chi == CHI[9]) k = 1; // Giáp Thân
  return k;
}

// Tuyệt Yên Hỏa 絕煙火 [ DGTNH ]
// Kị: cưới hỏi, làm nhà, chôn cất, dọn nhà
// kị phân cư, nhập trạch, tác táo, tạo diêu (lò), liệu bệnh
export function tuyetYenHoa(t, nn) {
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    // PSD 論擇日: chánh, ngũ, cửu nguyệt đinh mão nhật; nhị, lục, thập nguyệt giáp tý nhật;
    // tam, thất, thập nhất nguyệt quý dậu nhật; tứ, bát, thập nhị nguyệt canh ngọ nhật
    case 1:
    case 5:
    case 9:
      if (can == CAN[3] && chi == CHI[3]) k = 1;
      break; // Đinh Mão
    case 2:
    case 6:
    case 10:
      if (can == CAN[0] && chi == CHI[0]) k = 1;
      break; // Giáp Tý
    case 3:
    case 7:
    case 11:
      if (can == CAN[9] && chi == CHI[9]) k = 1;
      break; // Quí Dậu
    case 4:
    case 8:
    case 12:
      if (can == CAN[6] && chi == CHI[6]) k = 1;
      break; // Canh Ngọ
  }

  if (k) return k;

  // thi lệ: chánh thất thìn tuất mạc phân cư , nhị bát tị hợi hương đồng kị, tam cửu tý ngọ hưu quy hỏa, tứ thập sửu mùi bất kham vi, ngũ thập nhất nguyệt dần thân nhật, lục thập nhị nguyệt mão dậu ương, di cư nhập trạch quân tu kí; phạm trứ táo diệt nhân đa nguy.

  switch (
    t // DGTNH-14
  ) {
    case 1:
    case 7:
      if (chi == CHI[4] || chi == CHI[10]) k = 1;
      break; // Thìn Tuất
    case 2:
    case 8:
      if (chi == CHI[5] || chi == CHI[11]) k = 1;
      break; // Tỵ Hợi
    case 3:
    case 9:
      if (chi == CHI[0] || chi == CHI[6]) k = 1;
      break; // Tý Ngọ
    case 4:
    case 10:
      if (chi == CHI[1] || chi == CHI[7]) k = 1;
      break; // Sửu Mùi
    case 5:
    case 11:
      if (chi == CHI[2] || chi == CHI[8]) k = 1;
      break; // Dần Thân
    case 6:
    case 12:
      if (chi == CHI[3] || chi == CHI[9]) k = 1;
      break; // Mão Dậu
  }
  return k;
}

// Đại Thời 大時 = Đại Bại 大敗 = Hàm Trì 咸池 [ DGTNH ]
//   chánh nguyệt khởi mão, nghịch hành tứ trọng
// 大時大敗咸池 卯 子 酉 午 卯 子 酉 午 卯 子 酉 午
//   [ mão tý dậu ngọ mão tý dậu ngọ mão tý dậu ngọ ]
// Kị: kết hôn, an táng, thăng quan nhậm chức
// đại bại: bách sự bất nghi
// Hàm Trì kị giá thú, thủ ngư, thừa thuyền, độ thủy
export function daiThoi(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 5:
    case 9:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 2:
    case 6:
    case 10:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 3:
    case 7:
    case 11:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
    case 4:
    case 8:
    case 12:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
  }
  return k;
}

// Thiên Lại 天吏 = Trí Tử 致死 [ DGTNH = NHK ]
//   chánh nguyệt khởi dậu, nghịch hành tứ trọng
// 天吏 酉 午 卯 子 酉 午 卯 子 酉 午 卯 子
//   dậu ngọ mão tý dậu ngọ mão tý dậu ngọ mão tý
// Thiên Lại: kị lâm quan, phó nhậm, viễn hành, từ tụng, đi xa (để tránh cướp)
// Trí Tử: kị cầu y dược
export function thienLai(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 5:
    case 9:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
    case 2:
    case 6:
    case 10:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
    case 3:
    case 7:
    case 11:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 4:
    case 8:
    case 12:
      if (chi == CHI[0]) k = 1;
      break; // Tý
  }
  return k;
}

// Du Họa 遊禍 [ DGTNH-5 ]
// 遊禍 巳 寅 亥 申 巳 寅 亥 申 巳 寅 亥 申
//   chánh nguyệt khởi tị, nghịch hành tứ mạnh
//   tị dần hợi thân tị dần hợi thân tị dần hợi thân
// Kị: cúng tế, mời thầy chữa bệnh, phục dược, xuất hành
export function duHoa(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 5:
    case 9:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 2:
    case 6:
    case 10:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 3:
    case 7:
    case 11:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 4:
    case 8:
    case 12:
      if (chi == CHI[8]) k = 1;
      break; // Thân
  }
  return k;
}

// Thổ Phù 土符 [ DGTNH-09 ]
// 土符 丑 巳 酉 寅 午 戌 卯 未 亥 辰 申 子
//    sửu tị dậu dần ngọ tuất mão mùi hợi thìn thân tý
// Kị: phá thổ, động thổ, xuyên tỉnh, khai cừ, trúc tường
export function thoPhu(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 2:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 3:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
    case 4:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 5:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
    case 6:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
    case 7:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 8:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 9:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 10:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
    case 11:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 12:
      if (chi == CHI[0]) k = 1;
      break; // Tý
  }
  return k;
}

// Thiên Cùng 天窮 [ DGTNH-05 ]
// 天窮 子 寅 午 酉 子 寅 午 酉 子 寅 午 酉
//   tý dần ngọ dậu tý dần ngọ dậu tý dần ngọ dậu
// bất nghi khai nghiệp
export function thienCung(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 5:
    case 9:
      if (chi == CHI[0]) k = 1;
      break; // tý
    case 2:
    case 6:
    case 10:
      if (chi == CHI[2]) k = 1;
      break; // dần
    case 3:
    case 7:
    case 11:
      if (chi == CHI[6]) k = 1;
      break; // ngọ
    case 4:
    case 8:
    case 12:
      if (chi == CHI[9]) k = 1;
      break; // dậu
  }
  return k;
}

// Thiên Binh 天兵 [ Res *** ]
//   chánh, ngũ, cửu nguyệt đinh hợi nhật; nhị, lục, thập nguyệt bính thân nhật;
//   tam, thất, thập nhất nguyệt đinh tị nhật; tứ, bát, thập nhị nguyệt bính dần nhật;
//   thử dữ dần ngọ tuất nguyệt đinh hợi binh đồng lệ
export function thienBinh(t, nn) {
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 5:
    case 9:
      if (can == CAN[3] && chi == CHI[11]) k = 1;
      break; // đinh hợi
    case 2:
    case 6:
    case 10:
      if (can == CAN[2] && chi == CHI[8]) k = 1;
      break; // bính thân
    case 3:
    case 7:
    case 11:
      if (can == CAN[3] && chi == CHI[5]) k = 1;
      break; // đinh tị
    case 4:
    case 8:
    case 12:
      if (can == CAN[2] && chi == CHI[2]) k = 1;
      break; // bính dần
  }
  return k;
}

// Yếm Đối 厭對 = Lục Nghi 六儀 (cát nhật) = Chiêu Diêu 招搖 [ DGTNH-09 ]
// 厭對招搖六儀 辰 卯 寅 丑 子 亥 戌 酉 申 未 午 巳
//   thần xung của [Nguyệt Yếm: tuất dậu thân mùi ngọ tị thìn mão dần sửu tý hợi]
// Kị: giá thú
// Chiêu Diêu kị hành thuyền [ DGTNH *** ]
export function yemDoi(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
      if (chi == CHI[4]) k = 1;
      break; // Thìn<-Tuất
    case 2:
      if (chi == CHI[3]) k = 1;
      break; // Mão<-Dậu
    case 3:
      if (chi == CHI[2]) k = 1;
      break; // Dần<-Thân
    case 4:
      if (chi == CHI[1]) k = 1;
      break; // Sửu<-Mùi
    case 5:
      if (chi == CHI[0]) k = 1;
      break; // Tý<-Ngọ
    case 6:
      if (chi == CHI[11]) k = 1;
      break; // Hợi<-Tỵ
    case 7:
      if (chi == CHI[10]) k = 1;
      break; // Tuất<-Thìn
    case 8:
      if (chi == CHI[9]) k = 1;
      break; // Dậu<-Mão
    case 9:
      if (chi == CHI[8]) k = 1;
      break; // Thân<-Dần
    case 10:
      if (chi == CHI[7]) k = 1;
      break; // Mùi<-Sửu
    case 11:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ<-Tý
    case 12:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ<-Hợi
  }
  return k;
}

// Cửu Xú 九醜 [ DGTNH-16 ]
// 九醜 乙卯、己卯、辛卯、乙酉、己酉、辛酉、戊午、戊子、壬午、壬子
// Ngày: ất mão, kỷ mão, tân mão, ất dậu, kỷ dậu, tân dậu, mậu ngọ, mậu tý, nhâm ngọ, nhâm tý
// Kị: dựng nhà, giá thú, di chuyển, xuất quân
// kị xuất sư, giá thú, xuất hành, di tỉ, an táng
export function cuuXu(nn) {
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;
  if (can == CAN[1] && chi == CHI[3]) k = 1; // Ất Mão
  else if (can == CAN[1] && chi == CHI[9]) k = 1; // Ất Dậu
  else if (can == CAN[4] && chi == CHI[6]) k = 1; // Mậu Ngọ
  else if (can == CAN[4] && chi == CHI[0]) k = 1; // Mậu Tý
  else if (can == CAN[5] && chi == CHI[3]) k = 1; // Kỷ Mão
  else if (can == CAN[5] && chi == CHI[9]) k = 1; // Kỷ Dậu
  else if (can == CAN[7] && chi == CHI[3]) k = 1; // Tân Mão
  else if (can == CAN[7] && chi == CHI[9]) k = 1; // Tân Dậu
  else if (can == CAN[8] && chi == CHI[0]) k = 1; // Nhâm Tý
  else if (can == CAN[8] && chi == CHI[6]) k = 1; // Nhâm Ngọ
  return k;
}

// Bát Chuyên 八專 [ DGTNH-14 ]
// thi lệ: đinh mùi, quý sửu liên giáp dần; ất mão, kỷ mùi cập canh thân; tự cổ lưu truyền bát chuyên nhật; hành quân xuất trận hựu an doanh
// Kị: giá thú, xuất quân
export function batChuyen(nn) {
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;
  if (can == CAN[3] && chi == CHI[7]) k = 1; // Đinh Mùi
  else if (can == CAN[9] && chi == CHI[1]) k = 1; // Quí Sửu
  else if (can == CAN[0] && chi == CHI[2]) k = 1; // Giáp Dần
  else if (can == CAN[1] && chi == CHI[3]) k = 1; // Ất Mão
  else if (can == CAN[5] && chi == CHI[7]) k = 1; // Kỷ Mùi
  else if (can == CAN[6] && chi == CHI[8]) k = 1; // Canh Thân
  return k;
  /*
// Bát Chuyên 八專 [ NHK, TCTB ] *** 
// Hung Nhật: trời đất mông lung, nhân duyên thất hòa, mọi việc bất thuận lợi
  if      (can==CAN[8] && chi==CHI[0]) k=1; // Nhâm Tý // ?
  else if (can==CAN[0] && chi==CHI[2]) k=1; // Giáp Dần
  else if (can==CAN[1] && chi==CHI[3]) k=1; // Ất Mão
  else if (can==CAN[3] && chi==CHI[5]) k=1; // Đinh Tỵ // ?
  else if (can==CAN[5] && chi==CHI[7]) k=1; // Kỷ Mùi
  else if (can==CAN[6] && chi==CHI[8]) k=1; // Canh Thân
  else if (can==CAN[7] && chi==CHI[9]) k=1; // Tân Dậu // ?
  else if (can==CAN[9] && chi==CHI[11]) k=1; // Quí Hợi // ?
*/
}

// Thập Phương Mộ nhật
// Hung Nhật: can chi tương khắc
// Kị: giá thú, hôn nhân
export function thapPhuong(nn) {
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;
  if (can == CAN[0] && chi == CHI[8]) k = 1; // Giáp Thân
  else if (can == CAN[1] && chi == CHI[9]) k = 1; // Ất Dậu
  else if (can == CAN[3] && chi == CHI[11]) k = 1; // Đinh Hợi
  else if (can == CAN[4] && chi == CHI[0]) k = 1; // Mậu Tý
  else if (can == CAN[6] && chi == CHI[2]) k = 1; // Canh Dần
  else if (can == CAN[7] && chi == CHI[3]) k = 1; // Tân Mão
  else if (can == CAN[8] && chi == CHI[4]) k = 1; // Nhâm Thìn
  else if (can == CAN[9] && chi == CHI[5]) k = 1; // Quí Tỵ
  else if (can == CAN[7] && chi == CHI[9]) k = 1; // Tân Dậu
  else if (can == CAN[8] && chi == CHI[10]) k = 1; // Nhâm Tuất
  return k;
}

// Vô Lộc, Thập Ác Đại Bại 無祿、十惡大敗 [ DGTNH-15,28 ]
// thi lệ: giáp kỷ chánh (tam?) nguyệt mậu tuất chinh; quý hợi thất nguyệt thập bính thân; thập nhất đinh hợi nhật đại kị; bính tân tam nguyệt tân tị sân; cửu kị canh thìn thập giáp thìn; ất canh tứ nguyệt nhâm thân chân; ất tị cửu nguyệt mạc tương thân; mậu quý lục nguyệt kỷ sửu xâm; niên trị đinh nhâm vô ác bại; ngộ thử tu tri tội bất nhân
//   giáp kỷ niên tam nguyệt mậu tuất, thất nguyệt quý hợi, thập nguyệt bính thân, thập nhất nguyệt đinh hợi
//   ất canh niên tứ nguyệt nhâm thân, cửu nguyệt ất tị
//   bính tân niên tam nguyệt tân tị, cửu nguyệt canh thìn, thập nguyệt giáp thìn
//   mậu quý niên lục nguyệt kỷ sửu
// Kị: Vô Lộc, bách sự bất nghi
// Bất kị tế tự, giải trừ, mộc dục, tảo trừ, bình chỉnh, phá ốc, tu sức
export function voLoc(nien, t, nn) {
  var nic = TueCanVi(nien); // Niên Can vị
  var ngc = canVi(NguyetCan(TueCan(nien), t - 1)); // Nguyệt Can vị
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;

  switch (nic) {
    case 0:
    case 4: // giáp kỷ niên
      if (t == 3 && can == CAN[4] && chi == CHI[10]) k = 1; // mậu tuất
      else if (t == 7 && can == CAN[9] && chi == CHI[11]) k = 1; // quý hợi
      else if (t == 10 && can == CAN[2] && chi == CHI[8]) k = 1; // bính thân
      else if (t == 11 && can == CAN[3] && chi == CHI[11]) k = 1; // đinh hợi
      break;
    case 1:
    case 6: // ất canh niên
      if (t == 4 && can == CAN[8] && chi == CHI[8]) k = 1; // nhâm thân
      else if (t == 9 && can == CAN[1] && chi == CHI[5]) k = 1; // ất tị
      break;
    case 2:
    case 7: // bính tân niên
      if (t == 3 && can == CAN[7] && chi == CHI[5]) k = 1; // tân tị
      else if (t == 9 && can == CAN[6] && chi == CHI[4]) k = 1; // canh thìn
      else if (t == 10 && can == CAN[0] && chi == CHI[4]) k = 1; // giáp thìn
      break;
    case 3:
    case 8: // đinh nhâm niên
      break;
    case 4:
    case 9: // mậu quý niên
      if (t == 6 && can == CAN[4] && chi == CHI[1]) k = 1; // kỷ sửu
      break;
  }
  return k;
}

// Ngũ Ly 五離 [ DGTNH-14 ] = Trừ Thần 除神 (cát nhật)
//  giáp thân ất dậu thiên địa li, bính thân đinh dậu nhật nguyệt li,
//  mậu thân kỷ dậu nhân dân li, nhâm thân quý dậu hán hà li
// Kị: kết hôn, giá thú, họp bạn, lập khế ước
export function nguLy(nn) {
  var chi = DiaChi(nn);
  var k = 0;
  if (chi == CHI[8] || chi == CHI[9]) k = 1; // Thân, Dậu
  return k;
}

// Trùng Nhật 重日 = Trùng Phục 重復 [ DGTNH ]
// mỗi nguyệt tị, hợi nhật thị dã
// (3Tong) chuyên chỉ mỗi nguyệt thìn nhật ? ***
// Kị: kị việc HUNG nhưng lại tốt việc CÁT
export function trungNhat(nn) {
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;
  if (chi == CHI[5] || chi == CHI[11]) k = 1; // Tỵ hoặc Hợi
  return k;
}

// Tứ Hao 四耗 [ DGTNH-06 ]
//   xuân nhâm tý, hạ ất mão, thu mậu ngọ, đông tân dậu
// Kị: cầu tài, khai nghiệp, kiến thương khố
export function tuHao(T, nn) {
  // T (0...3) & nn: lunar.dd
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;

  switch (T) {
    case 0:
      if (can == CAN[8] && chi == CHI[0]) k = 1;
      break; // Xuân Nhâm Tý
    case 1:
      if (can == CAN[1] && chi == CHI[3]) k = 1;
      break; // Hạ Ất Mão
    case 2:
      if (can == CAN[4] && chi == CHI[6]) k = 1;
      break; // Thu Mậu Ngọ
    case 3:
      if (can == CAN[7] && chi == CHI[9]) k = 1;
      break; // Đông Tân Dậu
  }

  return k;
}

// Tứ Kị 四忌 [ DGTNH ]
//   Xuân giáp tý, Hạ bính tý, Thu canh tý, Đông nhâm tý
// Kị: hôn nhân, giá thú, xuất sư, nạp thải vấn danh, an táng
export function tuKi(T, nn) {
  // T (0...3) & nn: lunar.dd
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;

  // A quick check
  if (chi != CHI[0]) return k;

  switch (T) {
    case 0:
      if (can == CAN[0]) k = 1;
      break; // Xuân Giáp Tý
    case 1:
      if (can == CAN[2]) k = 1;
      break; // Hạ Bính Tý
    case 2:
      if (can == CAN[6]) k = 1;
      break; // Thu Canh Tý
    case 3:
      if (can == CAN[8]) k = 1;
      break; // Đông Nhâm Tý
  }

  return k;
}

// Tứ Cùng 四窮 [ DGTNH-06 ]
//   Xuân Ất Hợi; Hạ Đinh Hợi; Thu Tân Hợi; Đông Quí Hợi
// Kị: khai nghiệp cầu tài, kết hôn nhân, giá thú, xuất sư, an táng ; thụ tạo di động thận dụng
export function tuCung(T, nn) {
  // T (0...3) & nn: lunar.dd
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;

  // A quick check
  if (chi != CHI[11]) return k;

  switch (T) {
    case 0:
      if (can == CAN[1]) k = 1;
      break; // Xuân Ất Hợi
    case 1:
      if (can == CAN[3]) k = 1;
      break; // Hạ Đinh Hợi
    case 2:
      if (can == CAN[7]) k = 1;
      break; // Thu Tân Hợi
    case 3:
      if (can == CAN[9]) k = 1;
      break; // Đông Quí Hợi
  }

  return k;
}

// Bát Long 八龍 Thất Điểu 七鳥 Cửu Hổ 九虎 Lục Xà 六蛇 [ DGTNH-06 ]
//   xuân giáp tý, ất hợi vi bát long; hạ bính tý, đinh hợi vi thất điểu; thu canh tý, tân hợi vi cửu hổ; đông nhâm tý, quý hợi vi lục xà
// kị giá thú, khởi tạo, hành thuyền, giao dịch, khai khố điếm
export function batLong7Dieu9Ho6Xa(T, nn) {
  // T (0...3) & nn: lunar.dd
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;

  switch (T) {
    case 0:
      if ((can == CAN[0] && chi == CHI[0]) || (can == CAN[1] && chi == CHI[11]))
        k = 1;
      break; // Xuân: giáp tý, ất hợi: Bát Long
    case 1:
      if ((can == CAN[2] && chi == CHI[0]) || (can == CAN[3] && chi == CHI[11]))
        k = 2;
      break; // Hạ: bính tý, đinh hợi: Thất Điểu
    case 2:
      if ((can == CAN[6] && chi == CHI[0]) || (can == CAN[7] && chi == CHI[11]))
        k = 3;
      break; // Thu: canh tý, tân hợi: Cửu Hổ
    case 3:
      if ((can == CAN[8] && chi == CHI[0]) || (can == CAN[9] && chi == CHI[11]))
        k = 4;
      break; // Đông: nhâm tý, quý hợi: Lục Xà
  }

  return k;
}

// Tứ Phế 四廢 [ DGTNH, NHK ]
//   Xuân: Tân Dậu & Canh Thân
//   Hạ:   Quí Hợi & Nhâm Tý
//   Thu:  Ất Mão & Giáp Dần
//   Đông: Đinh Tỵ & Bính Ngọ
// Kị: kị xuất hành, cầu tài khai nghiệp, thụ tạo di bộ, giá thú (bách sự kị dụng), xuất quân chinh phạt, tạo xá, nghênh thân,
// bái quan, nạp tài, khai thị
export function tuPhe(T, nn) {
  // T (0...3) & nn: lunar.dd
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;

  switch (T) {
    case 0:
      if (can == CAN[7] && chi == CHI[9]) k = 1; // Xuân: Tân Dậu & Canh Thân
      else if (can == CAN[6] && chi == CHI[8]) k = 1;
      break;
    case 1:
      if (can == CAN[9] && chi == CHI[11]) k = 1; // Hạ:   Quí Hợi & Nhâm Tý
      else if (can == CAN[8] && chi == CHI[0]) k = 1;
      break;
    case 2:
      if (can == CAN[1] && chi == CHI[3])
        k = 1; // Thu:  Ất Mão & Giáp Dần (DCTYL: Tân Mão ?)
      else if (can == CAN[0] && chi == CHI[2]) k = 1;
      break;
    case 3:
      if (can == CAN[3] && chi == CHI[5]) k = 1; // Đông: Đinh Tỵ & Bính Ngọ
      else if (can == CAN[2] && chi == CHI[6]) k = 1;
      break;
  }

  return k;
}

// Tứ Thời Đại Mộ 四時大墓 [ DGTNH-32 ]
// 四時大墓 春乙未 夏丙戌 秋辛丑 冬壬辰
// kị giá thú, cầu y, xuất hành
export function tuThoiDaiMo(T, nn) {
  // T (0...3) & nn: lunar.dd
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;

  switch (T) {
    case 0:
      if (can == CAN[1] && chi == CHI[7]) k = 1;
      break; // Xuân: Ất Mùi
    case 1:
      if (can == CAN[2] && chi == CHI[10]) k = 1;
      break; // Hạ:  Bính Tuất
    case 2:
      if (can == CAN[7] && chi == CHI[1]) k = 1;
      break; // Thu:  Tân Sửu
    case 3:
      if (can == CAN[8] && chi == CHI[4]) k = 1;
      break; // Đông: Nhâm Thìn
  }

  return k;
}

// La Thiên Đại Thoái 羅天大退 [ Res *** ]
// 羅天大退日：
// 初一休逢鼠［子］，初三莫遇羊［未］，初五馬頭上［午］，初九問雞鄉［酉］，十一莫遇兔［卯］，十三虎在旁［寅］，
// 十七牛耕地［丑］，廿一鼠絕糧［子］，廿五怕犬吠［戍］，廿七兔遭傷［卯］，廿九猴作戲［申］。
// Sơ nhất hưu vấn tý, sơ tam mạc ngộ dương,
// Sơ ngũ mã thượng tọa, sơ cửu vấn kê hương,
// Thập nhất hưu phùng thố, thập tam hổ tại bàng,
// Thập thất ngưu miên địa, chấp nhất thử thâu lương,
// Chấp ngũ phạ khuyển phệ, chấp thất tao thố thương,
// Chấp cửu hầu tác sọa, nhật thoái tối nan đương.
// 一鼠三羊五馬收，九雞一兔十三虎，七牛一鼠念五犬，念七兔子廿九猴。
// nhất thử tam dương ngũ mã thu, cửu kê nhất thỏ thập tam hổ, thất ngưu nhất thử niệm ngũ khuyển, niệm thất thỏ tử nhập cửu hầu
// Kị tu phương, tạo táng; phạm nhằm chủ thoái bại
export function laThienDaiThoai(n, nn) {
  // n: ngày âm lịch & nn: lunar.dd
  var chi = DiaChi(nn);
  var k = 0;
  switch (n) {
    case 1:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 3:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 5:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
    case 9:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
    case 11:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 13:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 17:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 21:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 25:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
    case 27:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 29:
      if (chi == CHI[8]) k = 1;
      break; // Thân
  }
  return k;
}

// Ngũ Hư 五虛 = Hoang Vu 荒蕪 [ DGTNH-06 ] = cửu khổ bát cùng nhật 九苦八窮日
//   xuân Tỵ Dậu Sửu, hạ Thân Tý Thìn, thu Hợi Mão Mùi, đông Dần Ngọ Tuất
// Ngũ Hư kị tu thương khố, khai thương khố, xuất hóa tài, xuất hành, an sàng
//   Đi với thiên đức, nguyệt đức, thiên đức hợp, nguyệt đức hợp, lục hợp tinh, không kị
// Hoang Vu: kị tu thương khố, khai thương khố, xuất hóa tài
// cửu khổ bát cùng nhật bách sự hung
export function nguHu(T, nn) {
  // T (0...3) & nn: lunar.dd
  var chi = DiaChi(nn);
  var k = 0;

  switch (T) {
    case 0:
      if (chi == CHI[5] || chi == CHI[9] || chi == CHI[1]) k = 1;
      break; // Xuân mộc vượng kị tị dậu sửu
    case 1:
      if (chi == CHI[8] || chi == CHI[0] || chi == CHI[4]) k = 1;
      break; // Hạ hỏa vượng kị thân tý thìn
    case 2:
      if (chi == CHI[11] || chi == CHI[3] || chi == CHI[7]) k = 1;
      break; // Thu kim vượng kị hợi mão mùi
    case 3:
      if (chi == CHI[2] || chi == CHI[6] || chi == CHI[10]) k = 1;
      break; // Đông thủy vượng kị dần ngọ tuất
  }

  return k;
}

// Lỗ Ban Sát 魯般煞 = Bại Nhật 敗日= Bất Cử 不舉 = đao châm 刀砧 [ DGTNH-06 ]
//   xuân tý, hạ mão, thu ngọ, đông dậu
// lỗ ban sát kị khởi công, khởi tạo, giá mã
// đao châm kị phạt mộc, khởi tạo, giá mã
// bất cử kị thượng quan, di cư, kết hôn nhân, giao dịch, nhập học
export function loBanSat(T, nn) {
  // T (0...3) & nn: lunar.dd
  var chi = DiaChi(nn);
  var k = 0;

  switch (T) {
    case 0:
      if (chi == CHI[0]) k = 1;
      break; // Xuân Tý
    case 1:
      if (chi == CHI[3]) k = 1;
      break; // Hạ  Mão
    case 2:
      if (chi == CHI[6]) k = 1;
      break; // Thu Ngọ
    case 3:
      if (chi == CHI[9]) k = 1;
      break; // Đông Dậu
  }

  return k;
}

// Nguyệt Kiến 月建 đồng hành (trực Kiến 建) = Tiểu Thời 小時 = Thổ Phủ 土府
//   dần mão thìn tị ngọ mùi thân dậu tuất hợi tý sửu
// Tiểu Thời kị kết hôn nhân, khai thương khố, xuất hóa tài
// Nguyệt Kiến kị hưng tạo thổ công, kết thân lễ
// Thổ Phủ kị doanh kiến cung thất, tu cung thất, thiện thành quách, trúc đê phòng, hưng tạo động thổ,  phá thổ,
//    tu thương khố, tu trí sản thất, khai cừ, xuyên tỉnh, phá ốc hoại viên, phạt mộc, tài chủng
export function nguyetKien(t, nn) {
  var kien = CHI[(t + 1) % 12];
  var chi = DiaChi(nn);
  var k = 0;

  if (chi == kien) k = 1;

  return k;
}

// Tứ Hư 四虛 = trực Nguy 危 = Long Hội 龍會 [ DGTNH-08 ]
// Long Hội kị tu trì, tác yển (đắp đất)
export function tuHu(t, truc, nn) {
  // t (tiết)
  var nguy = CHI[(t + 8) % 12];
  var chi = DiaChi(nn);
  var k = 0;

  if ("Nguy" == TRUC12[truc] && chi == nguy) k = 1;

  return k;
}

// Thiên Hùng 天雄 = trực Thành 成 = Thiên Y 天醫 = Thiên Hỷ 天喜 (cát nhật)
//    chánh nguyệt khởi tuất, thuận hành thập nhị thần
// thiên hùng kị giá thú
export function thienHung(t, truc, nn) {
  // t (tiết)
  var thanh = CHI[(t + 9) % 12];
  var chi = DiaChi(nn);
  var k = 0;

  if ("Thành" == TRUC12[truc] && chi == thanh) k = 1;

  return k;
}

// Huyết Chi 血支= trực Bế 閉 = hiệp tỉ 俠俾 [ DGTNH-09 ]
//   sửu dần mão thìn tị ngọ mùi thân dậu tuất hợi tý
// Huyết Chi kị châm thứ xuất huyết
// hiệp tỉ kị giá thú
export function huyetChi(t, truc, nn) {
  // t (tiết)
  var be = CHI[(t + 12) % 12];
  var chi = DiaChi(nn);
  var k = 0;

  if ("Bế" == TRUC12[truc] && chi == be) k = 1;

  return k;
}

// Địa Nang 地囊 [ DGTNH-9 ]
// kị: doanh kiến cung thất, tu cung thất, thiện thành quách, trúc đê phòng, hưng tạo động thổ,
// tu thương khố, tu trí sản thất, khai cừ xuyên tỉnh, an đối ngại, bổ viên, tu sức viên tường, bình trì đạo đồ,
// phá ốc hoại viên, tài chủng, phá thổ
export function diaNang(t, nn) {
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;

  switch (
    t // DGTNH
  ) {
    case 1:
      if (can == CAN[6] && (chi == CHI[0] || chi == CHI[6])) k = 1;
      break; // Canh Tý Canh Ngọ
    case 2:
      if (can == CAN[9] && (chi == CHI[7] || chi == CHI[1])) k = 1;
      break; // Quí Mùi Quí Sửu
    case 3:
      if (can == CAN[0] && (chi == CHI[0] || chi == CHI[2])) k = 1;
      break; // Giáp Tý Giáp Dần
    case 4:
      if (can == CAN[5] && (chi == CHI[3] || chi == CHI[1])) k = 1;
      break; // Kỷ Mão Kỷ Sửu
    case 5:
      if (can == CAN[4] && (chi == CHI[4] || chi == CHI[6])) k = 1;
      break; // Mậu Thìn Mậu Ngọ
    case 6:
      if (can == CAN[9] && (chi == CHI[7] || chi == CHI[5])) k = 1;
      break; // Quí Mùi Quí Tỵ
    case 7:
      if (can == CAN[2] && (chi == CHI[2] || chi == CHI[8])) k = 1;
      break; // Bính Dần Bính Thân
    case 8:
      if (can == CAN[2] && (chi == CHI[3] || chi == CHI[5])) k = 1;
      break; // Đinh Mão Đinh Tỵ
    case 9:
      if (can == CAN[4] && (chi == CHI[4] || chi == CHI[0])) k = 1;
      break; // Mậu Thìn Mậu Tý
    case 10:
      if (can == CAN[6] && (chi == CHI[10] || chi == CHI[0])) k = 1;
      break; // Canh Tuất Canh Tý
    case 11:
      if (can == CAN[7] && (chi == CHI[7] || chi == CHI[9])) k = 1;
      break; // Tân Mùi Tân Dậu
    case 12:
      if (can == CAN[1] && (chi == CHI[9] || chi == CHI[7])) k = 1;
      break; // Ất Dậu Ất Mùi
  }
  return k;
}

// Quy Kị 歸忌 [ DGTNH ]
//   mạnh nguyệt kị sửu, trọng nguyệt kị dần, quý nguyệt kị tý
// kị đi xa (viễn hành), về nhà (quy gia), di dời chỗ, lấy vợ
// kị di đồ, nhập trạch, xuất hỏa, giá thú, viễn hồi quy ninh hung
export function quyKi(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 4:
    case 7:
    case 10:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 2:
    case 5:
    case 8:
    case 11:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 3:
    case 6:
    case 9:
    case 12:
      if (chi == CHI[0]) k = 1;
      break; // Tý
  }
  return k;
}

// Huyết Kị 血忌 = Tục Thế 續世 (cát tinh) [ DGTN = NHK ]
// lịch lệ viết: chánh nguyệt sửu, nhị nguyệt mùi, tam nguyệt dần, tứ nguyệt thân, ngũ nguyệt mão, lục nguyệt dậu, thất nguyệt thìn, bát nguyệt tuất, cửu nguyệt tị, thập nguyệt hợi, thập nhất nguyệt ngọ, thập nhị nguyệt tý
// kị: châm chích, yết lục súc, xuyên ngưu tị (xỏ mũi trâu), xuyên tỉnh (đào giếng)
export function huyetKi(t, nn) {
  // t (tiết)
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 2:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 3:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 4:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 5:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 6:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
    case 7:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
    case 8:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
    case 9:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 10:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 11:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
    case 12:
      if (chi == CHI[0]) k = 1;
      break; // Tý
  }
  return k;
}

// Long Hổ 龍虎 [ DGTNH-12 ]
// 龍虎 巳 亥 午 子 未 丑 申 寅 酉 卯 戌 辰
//   tị hợi ngọ tý mùi sửu thân dần dậu mão tuất thìn
// kị khởi tạo, giá thú, an táng, xuất hành, nhập sơn, tu trai, tế tự, nhập trạch, lập khế mãi mại.
export function longHo(t, nn) {
  // t (tiết)
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 2:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 3:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
    case 4:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 5:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 6:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 7:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 8:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 9:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
    case 10:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 11:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
    case 12:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
  }
  return k;
}

// tội chí 罪至 [ DGTNH-12 ]
// thi lệ: chánh ngọ nhị tý tam mùi thị, tứ sửu ngũ thân lục dần tự, thất dậu bát mão cửu tuất phùng, thập thìn thập nhất hợi chạp tị
// tội chí kị khởi tạo, di cư, hôn nhân, an táng, từ tụng, thượng quan, tiến biểu chương; chư sự hung.
export function toiChi(t, nn) {
  // t (tiết)
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
    case 2:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 3:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 4:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 5:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 6:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 7:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
    case 8:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 9:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
    case 10:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
    case 11:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 12:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
  }
  return k;
}

// Nhật Lưu Tài 日流財 [ DGTNH-28 ]
// 日流財 亥 申 巳 寅 卯 午 子 酉 丑 未 辰 戌
//   hợi thân tị dần mão ngọ tý dậu sửu mùi thìn tuất
export function nhatLuuTai(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 2:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 3:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 4:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 5:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 6:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
    case 7:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 8:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
    case 9:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 10:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 11:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
    case 12:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
  }
  return k;
}

// Thiên Địa Tranh Hùng 天地爭雄 [ DGTNH-12 ]
//    chánh tị ngọ nhật nhị hợi tý, tam ngọ mùi tứ tý sửu đắc, ngũ mùi thân lục sửu dần phùng;
//    thất thân dậu bát hổ thỏ kiến, cửu dậu tuất thập mão thìn đương, thập nhất tuất hợi chạp thìn tị
// kị xuất quân, hành binh, xuất quân, lập trại doanh, an doanh, giá thú, xuất hành, kinh thương, tạo thuyền, hành thuyền
export function thienDiaTranhHung(t, nn) {
  // t (tiết)
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
      if (chi == CHI[5] || chi == CHI[6]) k = 1;
      break; // Tỵ Ngọ
    case 2:
      if (chi == CHI[11] || chi == CHI[0]) k = 1;
      break; // Hợi Tý
    case 3:
      if (chi == CHI[6] || chi == CHI[7]) k = 1;
      break; // Ngọ Mùi
    case 4:
      if (chi == CHI[0] || chi == CHI[1]) k = 1;
      break; // Tý Sửu
    case 5:
      if (chi == CHI[7] || chi == CHI[8]) k = 1;
      break; // Mùi Thân
    case 6:
      if (chi == CHI[1] || chi == CHI[2]) k = 1;
      break; // Sửu Dần
    case 7:
      if (chi == CHI[8] || chi == CHI[9]) k = 1;
      break; // Thân Dậu
    case 8:
      if (chi == CHI[2] || chi == CHI[3]) k = 1;
      break; // Dần Mão
    case 9:
      if (chi == CHI[9] || chi == CHI[10]) k = 1;
      break; // Dậu Tuất
    case 10:
      if (chi == CHI[3] || chi == CHI[4]) k = 1;
      break; // Mão Thìn
    case 11:
      if (chi == CHI[10] || chi == CHI[11]) k = 1;
      break; // Tuất Hợi
    case 12:
      if (chi == CHI[4] || chi == CHI[5]) k = 1;
      break; // Thìn Tỵ
  }
  return k;
}

// Trùng Tang 重喪 [ DGTNH, NHK ]
// Trùng Phục: chánh, thất nguyệt giáp, canh; nhị, bát nguyệt ất, tân; tứ, thập nguyệt bính, nhâm; ngũ, thập nhất nguyệt đinh, quý; tam, cửu, lục, thập nhị nguyệt mậu, kỷ nhật dã
// kị an táng, mai táng
export function trungTang(t, nn) {
  var can = ThienCan(nn);
  var k = 0;
  switch (t) {
    case 1:
      if (can == CAN[0]) k = 1;
      break; // giáp
    case 2:
      if (can == CAN[1]) k = 1;
      break; // ất
    case 3:
      if (can == CAN[5]) k = 1;
      break; // kỷ
    case 4:
      if (can == CAN[2]) k = 1;
      break; // bính
    case 5:
      if (can == CAN[3]) k = 1;
      break; // đinh
    case 6:
      if (can == CAN[5]) k = 1;
      break; // kỷ
    case 7:
      if (can == CAN[6]) k = 1;
      break; // canh
    case 8:
      if (can == CAN[7]) k = 1;
      break; // tân
    case 9:
      if (can == CAN[5]) k = 1;
      break; // kỷ
    case 10:
      if (can == CAN[8]) k = 1;
      break; // nhâm
    case 11:
      if (can == CAN[9]) k = 1;
      break; // quý
    case 12:
      if (can == CAN[5]) k = 1;
      break; // kỷ
  }
  return k;
}

// Trùng Phục 重復 = Phục Tang 復喪 [ NHK ]
//   canh, tân, mậu, nhâm, quí, mậu, giáp, ất, mậu, bính, đinh, mậu
// kị hôn nhân, mai táng
export function trungPhuc(t, nn) {
  var can = ThienCan(nn);
  var k = 0;
  switch (t) {
    case 1:
      if (can == CAN[6]) k = 1;
      break; // canh
    case 2:
      if (can == CAN[7]) k = 1;
      break; // tân
    case 3:
      if (can == CAN[4]) k = 1;
      break; // mậu
    case 4:
      if (can == CAN[8]) k = 1;
      break; // nhâm
    case 5:
      if (can == CAN[9]) k = 1;
      break; // quý
    case 6:
      if (can == CAN[4]) k = 1;
      break; // mậu
    case 7:
      if (can == CAN[0]) k = 1;
      break; // giáp
    case 8:
      if (can == CAN[1]) k = 1;
      break; // ất
    case 9:
      if (can == CAN[4]) k = 1;
      break; // mậu
    case 10:
      if (can == CAN[2]) k = 1;
      break; // bính
    case 11:
      if (can == CAN[3]) k = 1;
      break; // đinh
    case 12:
      if (can == CAN[4]) k = 1;
      break; // mậu
  }
  return k;
}

// Phục Nhật 復日 = Trùng Tang 重喪 [ DGTNH ]
// Lịch lệ: chánh, thất nguyệt giáp, canh; nhị, bát nguyệt ất, tân; tứ, thập nguyệt bính, nhâm; ngũ, thập nhất nguyệt đinh, quý; tam, cửu, lục, thập nhị nguyệt mậu, kỷ nhật dã
// kị hung sự; nghi nhất thiết hỉ sự
export function phucNhat(t, nn) {
  var can = ThienCan(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 7:
      if (can == CAN[0] || can == CAN[6]) k = 1;
      break; // Giáp Canh
    case 2:
    case 8:
      if (can == CAN[1] || can == CAN[7]) k = 1;
      break; // Ất Tân
    case 4:
    case 10:
      if (can == CAN[2] || can == CAN[8]) k = 1;
      break; // Bính Nhâm
    case 5:
    case 11:
      if (can == CAN[3] || can == CAN[9]) k = 1;
      break; // Đinh Quý
    case 3:
    case 6:
    case 9:
    case 12:
      if (can == CAN[4] || can == CAN[5]) k = 1;
      break; // Mậu Kỷ
  }
  return k;
}

// Địa Tặc 地賊 [ DGTNH-28, Res ]
//   chánh thất phùng khai nhị bát thu (1 & 7 trực Khai; 2 & 8 trực Thu)
//   tam cửu phùng nguy tứ thập chấp (3 & 9 trực Nguy; 4 & 10 trực Chấp)
//   ngũ thập nhất nguyệt hướng bình cầu (5 & 11 trực Bình)
//   lục thập nhị nguyệt phùng bế vị (6 & 12 trực Bế)
//   phạm trứ quỷ tinh chiêu tặc thâu.
//   [ tý tý hợi tuất dậu ngọ ngọ ngọ tị thìn mão tý ]
// [ != NHK: sửu tý hợi tuất dậu thân mùi ngọ tị thìn mão dần ]
// Kị tạo táng, xuất hành, nhập trạch, thương khố, tài chủng, khai trì.
export function diaTac(t, truc) {
  // t (tiết)
  var k = 0;
  switch (t) {
    case 1:
    case 7:
      if (TRUC12[truc] == "Khai") k = 1;
      break;
    case 2:
    case 8:
      if (TRUC12[truc] == "Thu") k = 1;
      break;
    case 3:
    case 9:
      if (TRUC12[truc] == "Nguy") k = 1;
      break;
    case 4:
    case 10:
      if (TRUC12[truc] == "Chấp") k = 1;
      break;
    case 5:
    case 11:
      if (TRUC12[truc] == "Bình") k = 1;
      break;
    case 6:
    case 12:
      if (TRUC12[truc] == "Bế") k = 1;
      break;
  }
  return k;
}

// ===========================

// Thiên Ôn 天瘟 [ DGTNH, NHK ]
//   chánh nguyệt dương vị chấp ti quyền (1 chấp)
//   nhị nguyệt phùng nguy sự khước thiên (2 nguy)
//   tam ngũ thập nguyệt tầm kiến thượng (3 & 5 kiến)
//   thất thập nhất trừ bất chu toàn (7 & 11 trừ)
//   tứ thu bát khai lạp (chạp) mãn vị (4 thu; 8 khai; 12 mãn)
//   kí thủ thiên ôn mạc phạm yên
//   [ mùi tuất thìn dần ngọ tý dậu thân tị hợi sửu mão ]
// kị tu tạo, nhập trạch, quy hỏa, lục súc, mục dưỡng, trì bệnh
export function thienOn(t, truc) {
  // t (tiết)
  var k = 0;
  switch (t) {
    case 1:
      if (TRUC12[truc] == "Chấp") k = 1;
      break;
    case 2:
      if (TRUC12[truc] == "Nguy") k = 1;
      break;
    case 3:
    case 5:
    case 10:
      if (TRUC12[truc] == "Kiến") k = 1;
      break;
    case 4:
      if (TRUC12[truc] == "Thu") k = 1;
      break;
    case 7:
    case 11:
      if (TRUC12[truc] == "Trừ") k = 1;
      break;
    case 12:
      if (TRUC12[truc] == "Mãn") k = 1;
      break;
  }
  return k;
}

// Mộc Mã Sát 木馬殺 [ DGTNH, NHK ]
// thi lệ: chánh xà nhị dương tam phượng vũ; tứ viên ngũ khuyển lục thử lộ; thất trư bát ngưu cửu thỏ đầu; thập hổ thập nhất long chạp ngọ.
// Kị: khởi công, giá mã, phạt mộc, tố lương
export function mocMaSat(t, nn) {
  // t (tiết)
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 2:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 3:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
    case 4:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 5:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
    case 6:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 7:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 8:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 9:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 10:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 11:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
    case 12:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
  }
  return k;
}

// Giao Long 蛟龍 [ DGTNH *** ]
// thi lệ: chánh bát mùi nhị tứ thập thân; tam ngũ phùng khuyển lãng đào thâm; lục ngưu thất cửu long hành thủy; thập nhất thử chạp xà sanh sân.
// Kị: hành thuyền, tạo kiều lương (làm cầu)
export function giaoLong(t, nn) {
  // t (tiết)
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 8:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 2:
    case 4:
    case 10:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 3:
    case 5:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
    case 6:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 7:
    case 9:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
    case 11:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 12:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
  }
  return k;
}

// Ngũ Bất Ngộ 五不遇 [ DGTNH ]
// Thi lệ: chánh khuyển nhị hợi cầu; tam mã tứ dương du; ngũ hổ lục thị thỏ; thất long bát xà đầu; cửu phùng thử tử vị; thập ngưu thập nhất hầu; chạp nguyệt thính kê xướng; tự tổn tắc nan thủ.
// Kị: xuất hành, cầu tài, thu bộ, bái yết
export function nguBatNgo(t, nn) {
  // t (tiết)
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
    case 2:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 3:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
    case 4:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 5:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 6:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 7:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
    case 8:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 9:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 10:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 11:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 12:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
  }
  return k;
}

// Tam Bất Phản 三不返 [ DGTNH ]
// thi lệ: chánh nguyệt canh tuất tân hợi cộng; nhị tý ngọ mão dậu nhật đồng; tam nguyệt thân thìn, tứ dần mùi; ngũ nguyệt mão ngọ viễn hành hung; lục nguyệt thìn tị mùi nhật kị; thất nguyệt thìn tị thân mạc phùng; bát nguyệt mão dậu ngọ bất túc; cửu nguyệt tuất mùi dần vô chung; thập nguyệt tuất hợi thân vưu úy (rất sợ); thập nhất tu tướng dậu nhật cùng; thập nhị nguyệt tầm sửu tuất hợi; viễn hành định thị bất hồi tung.
// Kị: thượng quan phó nhậm, xuất hành, trần binh, ứng thí, phó cử, cầu tài hung
export function tamBatPhan(t, nn) {
  // t (tiết)
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
      if (
        (can == CAN[6] && chi == CHI[10]) ||
        (can == CAN[7] && chi == CHI[11])
      )
        k = 1;
      break; // Canh Tuất Tân Hợi
    case 2:
      if (chi == CHI[0] || chi == CHI[6] || chi == CHI[3] || chi == CHI[10])
        k = 1;
      break; // Tý Ngọ Mão Dậu
    case 3:
      if (chi == CHI[8] || chi == CHI[4]) k = 1;
      break; // Thân Thìn
    case 4:
      if (chi == CHI[2] || chi == CHI[7]) k = 1;
      break; // Dần Mùi
    case 5:
      if (chi == CHI[3] || chi == CHI[6]) k = 1;
      break; // Mão Ngọ
    case 6:
      if (chi == CHI[4] || chi == CHI[5] || chi == CHI[7]) k = 1;
      break; // Thìn Tỵ Mùi
    case 7:
      if (chi == CHI[4] || chi == CHI[5] || chi == CHI[8]) k = 1;
      break; // Thìn Tỵ Thân
    case 8:
      if (chi == CHI[3] || chi == CHI[9] || chi == CHI[6]) k = 1;
      break; // Mão Dậu Ngọ
    case 9:
      if (chi == CHI[10] || chi == CHI[7] || chi == CHI[2]) k = 1;
      break; // Tuất Mùi Dần
    case 10:
      if (chi == CHI[10] || chi == CHI[11] || chi == CHI[8]) k = 1;
      break; // Tuất Hợi Thân
    case 11:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
    case 12:
      if (chi == CHI[1] || chi == CHI[10] || chi == CHI[11]) k = 1;
      break; // Sửu Tuất Hợi
  }
  return k;
}

// Ly Biệt 離別 [ DGTN ]
// Thi lệ: chánh thất bính tý, nhị quý sửu; tứ nguyệt bính thìn, tam bính dần; ngũ lục đinh tị, bát canh thìn; thập nhị quý tị, cửu tân mùi; thập nguyệt thập nhất bính ngọ lâm.
// Kị: giá thú, xuất hành.
export function lyBiet(t, nn) {
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 7:
      if (can == CAN[2] && chi == CHI[0]) k = 1;
      break; // Bính Tý
    case 2:
      if (can == CAN[9] && chi == CHI[1]) k = 1;
      break; // Quí Sửu
    case 3:
      if (can == CAN[2] && chi == CHI[2]) k = 1;
      break; // Bính Dần
    case 4:
      if (can == CAN[2] && chi == CHI[4]) k = 1;
      break; // Bính Thìn
    case 5:
    case 6:
      if (can == CAN[3] && chi == CHI[5]) k = 1;
      break; // Đinh Tỵ
    case 8:
      if (can == CAN[6] && chi == CHI[4]) k = 1;
      break; // Canh Thìn
    case 9:
      if (can == CAN[7] && chi == CHI[7]) k = 1;
      break; // Tân Mùi
    case 10:
    case 11:
      if (can == CAN[2] && chi == CHI[6]) k = 1;
      break; // Bính Ngọ
    case 12:
      if (can == CAN[9] && chi == CHI[5]) k = 1;
      break; // Quí Tỵ
  }
  return k;
}

// Xúc Thủy Long 觸水龍 [ 3T != DGTNH ]
// lịch lệ viết: 'xúc thủy long giả, bính tử, quý sửu, quý mùi dã'
// (3Tong) xuân đinh sửu, đinh tị nhật; hạ giáp thân, giáp thìn; thu đinh hợi, đinh mùi; đông giáp tuất, giáp thìn
// kị: thủ ngư, hành thuyền, thừa thuyền, độ thủy
export function xucThuyLong(nn) {
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;
  // [ DGTNH : Lịch lệ ]
  if (can == CAN[2] && chi == CHI[0]) k = 1; // Bính Tý
  else if (can == CAN[9] && chi == CHI[1]) k = 1; // Quí Sửu
  else if (can == CAN[9] && chi == CHI[7]) k = 1; // Quí Mùi
  /* 3Tong *** 
  switch(T) {
  case 0: if (can==CAN[3] && chi==CHI[1]) k=1;  // Xuân: đinh sửu, đinh tị 
     else if (can==CAN[3] && chi==CHI[5]) k=1; break;
  case 1: if (can==CAN[0] && chi==CHI[8]) k=1; // Hạ:   giáp thân, giáp thìn
     else if (can==CAN[0] && chi==CHI[4]) k=1; break;
  case 2: if (can==CAN[3] && chi==CHI[11]) k=1;  // Thu:  đinh hợi, đinh mùi
     else if (can==CAN[3] && chi==CHI[7]) k=1; break;
  case 3: if (can==CAN[0] && chi==CHI[10]) k=1;  // Đông: giáp tuất, giáp thìn
     else if (can==CAN[0] && chi==CHI[4]) k=1; break;
  }
  */
  return k;
}

// Trường Tinh 長星 [ DGTNH, NHK ]
// kị: tiến nhân khẩu, tài chế, kinh lạc, khai thị, lập khoán, giao dịch, nạp tài, nạp súc
// NHK kị tài y, nạp tài
export function truongTinh(th, n) {
  // t: tiet (1..12)
  var k = 0;

  switch (th) {
    case 1:
      if (n == 7) k = 1;
      break;
    case 2:
      if (n == 4) k = 1;
      break;
    case 3:
      if (n == 1) k = 1;
      break;
    case 4:
      if (n == 9) k = 1;
      break;
    case 5:
      if (n == 15) k = 1;
      break;
    case 6:
      if (n == 10) k = 1;
      break;
    case 7:
      if (n == 8) k = 1;
      break;
    case 8:
      if (n == 2 || n == 5) k = 1;
      break;
    case 9:
      if (n == 3 || n == 4) k = 1;
      break;
    case 10:
      if (n == 1) k = 1;
      break;
    case 11:
      if (n == 12) k = 1;
      break;
    case 12:
      if (n == 9) k = 1;
      break;
  }
  return k;
}

// Đoản Tinh 短星 [ DGTNH, NHK ]
// kị: tiến nhân khẩu, tài chế, kinh lạc, khai thị, lập khoán, giao dịch, nạp tài, nạp súc
// NHK kị tài y, nạp tài
export function doanTinh(th, n) {
  // t: tiet (1..12)
  var k = 0;

  switch (th) {
    case 1:
      if (n == 21) k = 1;
      break;
    case 2:
      if (n == 19) k = 1;
      break;
    case 3:
      if (n == 16) k = 1;
      break;
    case 4:
      if (n == 25) k = 1;
      break;
    case 5:
      if (n == 25) k = 1;
      break;
    case 6:
      if (n == 20) k = 1;
      break;
    case 7:
      if (n == 22) k = 1;
      break;
    case 8:
      if (n == 18 || n == 19) k = 1;
      break;
    case 9:
      if (n == 16 || n == 17) k = 1;
      break;
    case 10:
      if (n == 14) k = 1;
      break;
    case 11:
      if (n == 22) k = 1;
      break;
    case 12:
      if (n == 25) k = 1;
      break;
  }
  return k;
}

// Đại Tiểu Khốc Nhật [ PSD *** ]
// Kị kiến trạch, nhập trạch.
export function daiTieuKhoc(t, nn) {
  // t (tiết)
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
      if (chi == CHI[0] || chi == CHI[9]) k = 1;
      break; // Tý Dậu
    case 2:
      if (chi == CHI[1] || chi == CHI[10]) k = 1;
      break; // Sửu Tuất
    case 3:
      if (chi == CHI[2] || chi == CHI[7]) k = 1;
      break; // Dần Mùi
    case 4:
      if (chi == CHI[2] || chi == CHI[11]) k = 1;
      break; // Dần Hợi
    case 5:
      if (chi == CHI[4] || chi == CHI[1]) k = 1;
      break; // Thìn Sửu
    case 6:
      if (chi == CHI[2] || chi == CHI[5]) k = 1;
      break; // Dần Tỵ
    case 7:
      if (chi == CHI[2] || chi == CHI[6]) k = 1;
      break; // Dần Ngọ
    case 8:
      if (chi == CHI[7] || chi == CHI[4]) k = 1;
      break; // Mùi Thìn
    case 9:
      if (chi == CHI[8] || chi == CHI[7]) k = 1;
      break; // Thân Mùi
    case 10:
      if (chi == CHI[8] || chi == CHI[5]) k = 1;
      break; // Thân Tỵ
    case 11:
      if (chi == CHI[10] || chi == CHI[11]) k = 1;
      break; // Tuất Hợi
    case 12:
      if (chi == CHI[11] || chi == CHI[8]) k = 1;
      break; // Hợi Thân
  }
  return k;
}

// Tứ Kích 四擊 = Tử Biệt 死別 [ PSD, DGTNH *** ]
// Lịch lệ: xuân tuất, hạ sửu, thu thìn, đông mùi
// Tử Biệt kị thượng quan phó nhậm, kết hôn, giá thú, an sàng, nhập trạch, xuất hành, di tỉ (di chuyển)
// Tứ Kích kị viễn hành, khai trì tỉnh (đào giếng, ao hồ)
export function tuBietNhat(T, nn) {
  // T (0...3) & nn: lunar.dd
  var chi = DiaChi(nn);
  var k = 0;

  switch (T) {
    case 0:
      if (chi == CHI[10]) k = 1;
      break; // Xuân Tuất
    case 1:
      if (chi == CHI[1]) k = 1;
      break; // Hạ  Sửu
    case 2:
      if (chi == CHI[4]) k = 1;
      break; // Thu  Thìn
    case 3:
      if (chi == CHI[7]) k = 1;
      break; // Đông Mùi
  }

  return k;
}

// Trạch Không 宅空
//   xuân thân, hạ dần, thu tị, đông hợi
// trạch không kị di trạch, nhập trạch, quy hỏa
export function trachKhong(T, nn) {
  // T (0...3) & nn: lunar.dd
  var chi = DiaChi(nn);
  var k = 0;

  switch (T) {
    case 0:
      if (chi == CHI[8]) k = 1;
      break; // Xuân thân
    case 1:
      if (chi == CHI[2]) k = 1;
      break; // Hạ dần
    case 2:
      if (chi == CHI[5]) k = 1;
      break; // Thu tị
    case 3:
      if (chi == CHI[11]) k = 1;
      break; // Đông hợi
  }

  return k;
}

// đồ đãi 徒隸 (tỉ đãi 徙隸 ? ) [ DGTNH *** ]
//   xuân thân, hạ hợi, thu dần, đông tị
// đồ đãi kị thượng quan thụ nhậm, tiến nhân khẩu
export function doDai(T, nn) {
  // T (0...3) & nn: lunar.dd
  var chi = DiaChi(nn);
  var k = 0;

  switch (T) {
    case 0:
      if (chi == CHI[8]) k = 1;
      break; // Xuân thân
    case 1:
      if (chi == CHI[11]) k = 1;
      break; // Hạ hợi
    case 2:
      if (chi == CHI[2]) k = 1;
      break; // Thu dần
    case 3:
      if (chi == CHI[5]) k = 1;
      break; // Đông tị
  }

  return k;
}

// Hình Ngục 刑獄 = Tội Hình 罪刑 [ DGTNH *** ]
//   xuân sửu hạ thìn thu mùi đông tuất
// kị thượng quan, kiến quý, tham yết, từ tụng, xuất hành
export function hinhNguc(T, nn) {
  // T (0...3) & nn: lunar.dd
  var chi = DiaChi(nn);
  var k = 0;

  switch (T) {
    case 0:
      if (chi == CHI[1]) k = 1;
      break; // Xuân sửu
    case 1:
      if (chi == CHI[4]) k = 1;
      break; // Hạ thìn
    case 2:
      if (chi == CHI[7]) k = 1;
      break; // Thu mùi
    case 3:
      if (chi == CHI[10]) k = 1;
      break; // Đông tuất
  }

  return k;
}

// Tam Tang 三丧 [ 3Tong ]
//    xuân thìn nhật, hạ mùi nhật, thu tuất nhật, đông sửu nhật
// đặc kị mai táng
export function tamTang(T, nn) {
  // T (0...3) & nn: lunar.dd
  var chi = DiaChi(nn);
  var k = 0;

  switch (T) {
    case 0:
      if (chi == CHI[4]) k = 1;
      break; // Xuân Thìn
    case 1:
      if (chi == CHI[7]) k = 1;
      break; // Hạ  Mùi
    case 2:
      if (chi == CHI[10]) k = 1;
      break; // Thu Tuất
    case 3:
      if (chi == CHI[1]) k = 1;
      break; // Đông Sửu
  }

  return k;
}

// Sát Sư Nhật (3 ***)
// (3Tong) xuân dậu nhật, hạ ngọ nhật, thu mão nhật, đông tý nhật
// địa sư trạch sư kị đáo hiện tràng
export function satSuNhat(T, nn) {
  // T (0...3) & nn: lunar.dd
  var chi = DiaChi(nn);
  var k = 0;

  switch (T) {
    case 0:
      if (chi == CHI[9]) k = 1;
      break; // Xuân: Dậu
    case 1:
      if (chi == CHI[6]) k = 1;
      break; // Hạ:   Ngọ
    case 2:
      if (chi == CHI[3]) k = 1;
      break; // Thu:  Mão
    case 3:
      if (chi == CHI[0]) k = 1;
      break; // Đông: Tý
  }

  return k;
}

// Tổn Sư Nhật (3 ***)
// (3Tong):  chánh nguyệt tuất hợi nhật, nhị nguyệt thân nhật, tứ ngũ nguyệt ngọ dậu nhật, lục nguyệt mão nhật,
// thất nguyệt dần nhật, thập nguyệt hợi nhật, thập nhất nguyệt thân nhật
// địa sư trạch sư kị đáo hiện tràng
export function tonSuNhat(t, nn) {
  // t (tiết)
  var chi = DiaChi(nn);
  var k = 0;

  switch (t) {
    case 1:
      if (chi == CHI[10] || chi == CHI[11]) k = 1;
      break; // Tuất Hợi
    case 2:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 4:
    case 5:
      if (chi == CHI[6] || chi == CHI[9]) k = 1;
      break; // Ngọ Dậu
    case 6:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 7:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 10:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 11:
      if (chi == CHI[8]) k = 1;
      break; // Thân
  }
  return k;
}

// Lao Nhật 牢日 [ DGTNH *** ]
//   xuân thìn, hạ mùi, thu tuất, đông sửu
// kị thượng quan, xuất hành, di cư, từ tụng
export function laoNhat(T, nn) {
  // T (0...3) & nn: lunar.dd
  var chi = DiaChi(nn);
  var k = 0;

  switch (T) {
    case 0:
      if (chi == CHI[4]) k = 1;
      break; // Xuân Thìn
    case 1:
      if (chi == CHI[7]) k = 1;
      break; // Hạ Mùi
    case 2:
      if (chi == CHI[10]) k = 1;
      break; // Thu Tuất
    case 3:
      if (chi == CHI[1]) k = 1;
      break; // Đông Sửu
  }

  return k;
}

// Hư Bại 虛敗 = Tứ Hư Bại 四虛敗
//   xuân kỷ dậu, hạ giáp tý, thu tân mão, đông mậu ngọ
// kị khai thương khố, phân cư, nhập trạch
export function tuHuBai(T, nn) {
  // T (0...3) & nn: lunar.dd
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;

  switch (T) {
    case 0:
      if (can == CAN[5] && chi == CHI[9]) k = 1;
      break; // Xuân: Kỷ Dậu
    case 1:
      if (can == CAN[0] && chi == CHI[0]) k = 1;
      break; // Hạ:   Giáp Tý
    case 2:
      if (can == CAN[7] && chi == CHI[3]) k = 1;
      break; // Thu:  Tân Mão
    case 3:
      if (can == CAN[4] && chi == CHI[6]) k = 1;
      break; // Đông: Mậu Ngọ
  }

  return k;
}

// Thiên Địa Chánh Chuyển 天地正轉 [ DGTNH ]
//   xuân quý mão, hạ bính ngọ, thu đinh dậu, đông canh tý
//   quý mão xuân lai kị, bính ngọ hạ bất lương, thu trị đinh dậu nhật, canh tý đông bất tường
// kị khởi tạo, tu doanh, động thổ, cơ địa, khai trì (ao), xuyên tỉnh
export function thienDiaChuyen(T, nn) {
  // T (0...3) & nn: lunar.dd
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;

  switch (T) {
    case 0:
      if (can == CAN[9] && chi == CHI[3]) k = 1;
      break; // Xuân Quý Mão
    case 1:
      if (can == CAN[2] && chi == CHI[6]) k = 1;
      break; // Hạ Bính Ngọ
    case 2:
      if (can == CAN[3] && chi == CHI[9]) k = 1;
      break; // Thu Đinh Dậu
    case 3:
      if (can == CAN[6] && chi == CHI[0]) k = 1;
      break; // Đông Canh Tý
  }

  return k;
}

// Thiên Địa Chuyển Sát 天地轉殺 [ DGTNH, DCTYL = NHK ]
// xuân ất mão, tân mão; hạ bính ngọ, mậu ngọ; thu tân dậu, quý dậu; đông nhâm tý, bính tý
// kị thổ, động thổ, tu tác xí sở, trì đường, khai tạc trì đường, an trí sản thất hung.
export function thienDiaChuyenSat(T, nn) {
  // T (0...3) & nn: lunar.dd
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;

  switch (T) {
    case 0:
      if ((can == CAN[1] && chi == CHI[3]) || (can == CAN[7] && chi == CHI[3]))
        k = 1;
      break; // Xuân: Ất Mão, Tân Mão
    case 1:
      if ((can == CAN[2] && chi == CHI[6]) || (can == CAN[4] && chi == CHI[6]))
        k = 1;
      break; // Hạ: Bính Ngọ, Mậu Ngọ
    case 2:
      if ((can == CAN[7] && chi == CHI[9]) || (can == CAN[9] && chi == CHI[9]))
        k = 1;
      break; // Thu: Tân Dậu, Quý Dậu
    case 3:
      if ((can == CAN[8] && chi == CHI[0]) || (can == CAN[2] && chi == CHI[0]))
        k = 1;
      break; // Đông: Nhâm Tý, Bính Tý
  }

  return k;
}

// Nguyệt Kiến Chuyển Sát 月建轉煞 [ NHK ] = thiên chuyển địa chuyển 天轉地轉 [ DGTNH ]
// xuân mão, hạ ngọ, thu dậu, đông tý
// kị khởi thủ tu tác, chủ kiến họa; động thổ
export function nguyetKienChuyenSat(T, nn) {
  // T (0...3) & nn: lunar.dd
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;

  switch (T) {
    case 0:
      if (chi == CHI[3]) k = 1;
      break; // Xuân: Mão
    case 1:
      if (chi == CHI[6]) k = 1;
      break; // Hạ: Ngọ
    case 2:
      if (chi == CHI[9]) k = 1;
      break; // Thu: Dậu
    case 3:
      if (chi == CHI[0]) k = 1;
      break; // Đông: Tý
  }

  return k;
}

// Tứ Quý Bát Tọa 四季八座 [ DGTNH ***]
// xuân ất mão, hạ bính ngọ, thu canh thân, đông tân dậu
// Kị khởi thủ tu tác.
export function tuQuyBatToa(T, nn) {
  // T (0...3) & nn: lunar.dd
  var chi = DiaChi(nn);
  var k = 0;

  switch (T) {
    case 0:
      if (chi == CHI[1] || chi == CHI[3]) k = 1;
      break; // Xuân: ất mão
    case 1:
      if (chi == CHI[2] || chi == CHI[6]) k = 1;
      break; // Hạ: bính ngọ
    case 2:
      if (chi == CHI[6] || chi == CHI[8]) k = 1;
      break; // Thu: canh thân
    case 3:
      if (chi == CHI[7] || chi == CHI[9]) k = 1;
      break; // Đông: tân dậu
  }

  return k;
}

// Phản Kích 返激 [ DGTNH *** ]
//   xuân phùng kỷ mùi mạc hành chu, hạ ngộ mậu thìn tối chủ sầu, thu trị kỷ sửu bất như vị, đông úy mậu tuất hữu ưu tiên
// kị thượng quan, xuất hành, từ tụng, vấn bệnh, hành thuyền
export function phanKich(T, nn) {
  // T (0...3) & nn: lunar.dd
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;

  switch (T) {
    case 0:
      if (can == CAN[5] && chi == CHI[7]) k = 1;
      break; // Xuân: Kỷ Mùi
    case 1:
      if (can == CAN[4] && chi == CHI[4]) k = 1;
      break; // Hạ: Mậu Thìn
    case 2:
      if (can == CAN[5] && chi == CHI[1]) k = 1;
      break; // Thu: Kỷ Sửu
    case 3:
      if (can == CAN[4] && chi == CHI[10]) k = 1;
      break; // Đông: Mậu Tuất
  }

  return k;
}

// Phục Thi 伏尸 [ DGTNH,  Res *** ]
//   xuân phạ hầu kê, hạ hổ ngưu, thu hiềm trư khuyển lưỡng ưu tiên, đông phạ long xà tương hội xử;
//   viễn hành liệu bệnh nhập sơn sầu
// kị an sàng, liệu bệnh, viễn hành, nhập sơn, xuất quân
export function phucThi(T, nn) {
  // T (0...3) & nn: lunar.dd
  var chi = DiaChi(nn);
  var k = 0;

  switch (T) {
    case 0:
      if (chi == CHI[8] || chi == CHI[9]) k = 1;
      break; // Xuân Thân Dậu
    case 1:
      if (chi == CHI[1] || chi == CHI[2]) k = 1;
      break; // Hạ  Sửu Dần
    case 2:
      if (chi == CHI[10] || chi == CHI[11]) k = 1;
      break; // Thu Tuất Hợi
    case 3:
      if (chi == CHI[4] || chi == CHI[5]) k = 1;
      break; // Đông Thìn Tỵ
  }

  return k;
}

// Đại Sát 大殺 [ DGTNH-10, Res ] = Phi Liêm 飛廉
//   tuất tị ngọ vị dần mão thần hợi tử sửu thân dậu
// Đại Sát kị an phủ biên cảnh, tuyển tướng huấn binh, xuất sư, hành binh
// Phi Liêm kị thu dưỡng lục súc (thu nạp)
export function phiLiem(t, truc) {
  // t (tiết)
  var k = 0;
  switch (t) {
    case 1:
    case 5:
    case 6:
    case 7:
    case 11:
    case 12:
      if (TRUC12[truc] == "Thành") k = 1;
      break;
    case 2:
    case 3:
    case 4:
    case 8:
    case 9:
    case 10:
      if (TRUC12[truc] == "Mãn") k = 1;
      break;
  }
  return k;
}

// Lôi Công 雷公 [ NHK ]
// thi lệ: chánh thất nguyên thử nhị bát hổ, tam cửu phùng thần tứ thập ngọ, ngũ thập nhất nguyệt lộng viên hầu, lục thập nhị thượng tuất vi tổ.
// kị động thổ, di cư
export function loiCong(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 5:
    case 9:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 2:
    case 6:
    case 10:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 3:
    case 7:
    case 11:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 4:
    case 8:
    case 12:
      if (chi == CHI[8]) k = 1;
      break; // Thân
  }
  return k;
}

// Vong Doanh 亡贏 [ DGTNH *** ]
//  giáp dần giáp ngọ giáp tuất đinh mão đinh tị canh thìn canh dần canh tý mậu thìn quý hợi quý tị quý hợi.
// kị thượng quan, giá thú, nạp tài súc, xuất hành, khai thương khố điếm tứ.
export function vongDoanh(t, nn) {
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
      if (can == CAN[0] && chi == CHI[2]) k = 1;
      break; // giáp dần
    case 2:
      if (can == CAN[0] && chi == CHI[6]) k = 1;
      break; // giáp ngọ
    case 3:
      if (can == CAN[0] && chi == CHI[10]) k = 1;
      break; // giáp tuất
    case 4:
      if (can == CAN[3] && chi == CHI[3]) k = 1;
      break; // đinh mão
    case 5:
      if (can == CAN[3] && chi == CHI[5]) k = 1;
      break; // đinh tị
    case 6:
      if (can == CAN[6] && chi == CHI[4]) k = 1;
      break; // canh thìn
    case 7:
      if (can == CAN[6] && chi == CHI[2]) k = 1;
      break; // canh dần
    case 8:
      if (can == CAN[6] && chi == CHI[0]) k = 1;
      break; // canh tý
    case 9:
      if (can == CAN[4] && chi == CHI[4]) k = 1;
      break; // mậu thìn
    case 10:
      if (can == CAN[9] && chi == CHI[11]) k = 1;
      break; // quý hợi
    case 11:
      if (can == CAN[9] && chi == CHI[5]) k = 1;
      break; // quý tị
    case 12:
      if (can == CAN[9] && chi == CHI[11]) k = 1;
      break; // quý hợi
  }
  return k;
}

// Dương Thác 陰差 [ DGTNH = NHK *** ]
//   giáp dần ất mão giáp thìn đinh tị kỷ tị bính ngọ đinh mùi kỷ mùi canh thân tân dậu
//   canh tuất quý hợi nhâm tý quý sửu
// kị xuất hành, di cư, giá thú
export function duongThac(t, nn) {
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
      if (can == CAN[0] && chi == CHI[2]) k = 1;
      break; // giáp dần
    case 2:
      if (can == CAN[1] && chi == CHI[3]) k = 1;
      break; // ất mão
    case 3:
      if (can == CAN[0] && chi == CHI[4]) k = 1;
      break; // giáp thìn
    case 4:
      if (can == CAN[3] && chi == CHI[5]) k = 1;
      break; // đinh tị
    case 5:
      if (can == CAN[2] && chi == CHI[6]) k = 1;
      break; // bính ngọ
    case 6:
      if (can == CAN[3] && chi == CHI[7]) k = 1;
      break; // đinh mùi
    case 7:
      if (can == CAN[6] && chi == CHI[8]) k = 1;
      break; // canh thân
    case 8:
      if (can == CAN[7] && chi == CHI[9]) k = 1;
      break; // tân dậu
    case 9:
      if (can == CAN[6] && chi == CHI[10]) k = 1;
      break; // canh tuất
    case 10:
      if (can == CAN[9] && chi == CHI[11]) k = 1;
      break; // quý hợi
    case 11:
      if (can == CAN[8] && chi == CHI[0]) k = 1;
      break; // nhâm tý
    case 12:
      if (can == CAN[9] && chi == CHI[1]) k = 1;
      break; // quý sửu
  }
  return k;
}

// Âm Thác 阴差 [ DGTNH = NHK *** ]
//   canh tuất tân dậu canh thân đinh mùi kỷ mùi bính ngọ đinh tị kỷ tị giáp thìn ất mão
//   giáp dần quý sửu nhâm tý quý hợi
// kị khởi tạo, khai thương khố, di cư, xuất hành, nhập học, giá thú, an táng
export function amThac(t, nn) {
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
      if (can == CAN[6] && chi == CHI[11]) k = 1;
      break; // canh tuất
    case 2:
      if (can == CAN[7] && chi == CHI[9]) k = 1;
      break; // tân dậu
    case 3:
      if (can == CAN[6] && chi == CHI[8]) k = 1;
      break; // canh thân
    case 4:
      if (can == CAN[3] && chi == CHI[7]) k = 1;
      break; // đinh mùi
    case 5:
      if (can == CAN[2] && chi == CHI[6]) k = 1;
      break; // bính ngọ
    case 6:
      if (can == CAN[3] && chi == CHI[5]) k = 1;
      break; // đinh tị
    case 7:
      if (can == CAN[0] && chi == CHI[4]) k = 1;
      break; // giáp thìn
    case 8:
      if (can == CAN[1] && chi == CHI[3]) k = 1;
      break; // ất mão
    case 9:
      if (can == CAN[0] && chi == CHI[10]) k = 1;
      break; // giáp tuất
    case 10:
      if (can == CAN[9] && chi == CHI[1]) k = 1;
      break; // quý sửu
    case 11:
      if (can == CAN[8] && chi == CHI[0]) k = 1;
      break; // nhâm tý
    case 12:
      if (can == CAN[9] && chi == CHI[11]) k = 1;
      break; // quý hợi
  }
  return k;
}

// Ngũ Bất Quy 五不歸 [ DGTNH *** ]
// kị ứng thí, phó cử, cầu tài, xuất hành hung.
export function nguBatQuy(nn) {
  // nn: lunar.dd
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;

  if (can == CAN[2] && chi == CHI[4]) k = 1; // bính thìn
  else if (can == CAN[5] && chi == CHI[8]) k = 1; // bính thân
  else if (can == CAN[5] && chi == CHI[10]) k = 1; // bính tuất
  else if (can == CAN[5] && chi == CHI[3]) k = 1; // kỷ mão
  else if (can == CAN[5] && chi == CHI[9]) k = 1; // kỷ dậu
  else if (can == CAN[6] && chi == CHI[8]) k = 1; // canh thân
  else if (can == CAN[7] && chi == CHI[5]) k = 1; // tân tị
  else if (can == CAN[7] && chi == CHI[9]) k = 1; // tân dậu
  else if (can == CAN[7] && chi == CHI[11]) k = 1; // tân hợi
  else if (can == CAN[8] && chi == CHI[0]) k = 1; // nhâm tý
  else if (can == CAN[8] && chi == CHI[4]) k = 1; // nhâm thìn

  return k;
}

// Ly Khoa [ DGTNH *** ]
// kị xuất hành, di cư, giá thú, an sàng, nhập học
export function lyKhoa(nn) {
  // nn: lunar.dd
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;

  if (can == CAN[3] && chi == CHI[3]) k = 1; // đinh mão
  else if (can == CAN[4] && chi == CHI[0]) k = 1; // mậu tý
  else if (can == CAN[4] && chi == CHI[2]) k = 1; // mậu dần
  else if (can == CAN[4] && chi == CHI[4]) k = 1; // mậu thìn
  else if (can == CAN[4] && chi == CHI[6]) k = 1; // mậu ngọ
  else if (can == CAN[4] && chi == CHI[8]) k = 1; // mậu thân
  else if (can == CAN[4] && chi == CHI[10]) k = 1; // mậu tuất
  else if (can == CAN[5] && chi == CHI[2]) k = 1; // kỷ sửu
  else if (can == CAN[5] && chi == CHI[5]) k = 1; // kỷ tị
  else if (can == CAN[5] && chi == CHI[11]) k = 1; // kỷ hợi
  else if (can == CAN[7] && chi == CHI[1]) k = 1; // tân sửu
  else if (can == CAN[7] && chi == CHI[5]) k = 1; // tân tị
  else if (can == CAN[7] && chi == CHI[11]) k = 1; // tân hợi
  else if (can == CAN[8] && chi == CHI[6]) k = 1; // nhâm ngọ
  else if (can == CAN[8] && chi == CHI[8]) k = 1; // nhâm thân
  else if (can == CAN[8] && chi == CHI[10]) k = 1; // nhâm tuất
  else if (can == CAN[9] && chi == CHI[11]) k = 1; // quý hợi

  return k;
}

// Thiên Thượng Đại Không Vong [ DGTNH *** ]
// kị xuất hành, kinh thương, xuất tài
export function thienThuongDaiKV(nn) {
  // nn: lunar.dd
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;

  if (can == CAN[3] && chi == CHI[3]) k = 1; // đinh mão
  else if (can == CAN[3] && chi == CHI[7]) k = 1; // đinh mùi
  else if (can == CAN[4] && chi == CHI[2]) k = 1; // mậu dần
  else if (can == CAN[4] && chi == CHI[8]) k = 1; // mậu thân
  else if (can == CAN[8] && chi == CHI[4]) k = 1; // nhâm thìn
  else if (can == CAN[8] && chi == CHI[10]) k = 1; // nhâm tuất
  else if (can == CAN[9] && chi == CHI[5]) k = 1; // quý tị
  else if (can == CAN[9] && chi == CHI[11]) k = 1; // quý hợi

  return k;
}

// Tang Môn (phương vị) [ DGTNH *** ]
//   mùi tuất sửu thìn mùi tuất sửu thìn mùi tuất sửu thìn
export function tangMon(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 5:
    case 9:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 2:
    case 6:
    case 10:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
    case 3:
    case 7:
    case 11:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 4:
    case 8:
    case 12:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
  }
  return k;
}

// Thiên Quả 天寡 [ DGTNH **** ]
//   xuân mão hạ ngọ thu dậu đông tý
// kị giá thú
export function thienQua(T, nn) {
  // T (0...3) & nn: lunar.dd
  var chi = DiaChi(nn);
  var k = 0;

  switch (T) {
    case 0:
      if (chi == CHI[3]) k = 1;
      break; // Thu:  mão
    case 1:
      if (chi == CHI[6]) k = 1;
      break; // Đông: ngọ
    case 2:
      if (chi == CHI[9]) k = 1;
      break; // Thu:  dậu
    case 3:
      if (chi == CHI[0]) k = 1;
      break; // Đông: tý
  }

  return k;
}

// Địa Quả 地寡 [ DGTNH *** ]
//   xuân dậu hạ tý thu mão đông ngọ
// kị giá thú
export function diaQua(T, nn) {
  // T (0...3) & nn: lunar.dd
  var chi = DiaChi(nn);
  var k = 0;

  switch (T) {
    case 0:
      if (chi == CHI[9]) k = 1;
      break; // Xuân dậu
    case 1:
      if (chi == CHI[0]) k = 1;
      break; // Hạ tý
    case 2:
      if (chi == CHI[3]) k = 1;
      break; // Thu mão
    case 3:
      if (chi == CHI[6]) k = 1;
      break; // Đông ngọ
  }

  return k;
}

// Ngục Nhật 獄日 = Phân Hài 分骸 [ DGTNH *** ]
//   xuân mùi, hạ tuất, thu sửu, đông thìn
// ngục nhật kị thượng quan, xuất hành, di cư, từ tụng
// phân hài kị xuất hành, nhập trạch, di cư, vấn bệnh, tế tự
export function ngucNhat(T, nn) {
  // T (0...3) & nn: lunar.dd
  var chi = DiaChi(nn);
  var k = 0;

  switch (T) {
    case 0:
      if (chi == CHI[7]) k = 1;
      break; // Xuân mùi
    case 1:
      if (chi == CHI[10]) k = 1;
      break; // Hạ  tuất
    case 2:
      if (chi == CHI[1]) k = 1;
      break; // Thu  sửu
    case 3:
      if (chi == CHI[4]) k = 1;
      break; // Đông thìn
  }

  return k;
}

// Đao Khảm Sát [ NHK *** ]
// kị châm cứu
export function daoKhamSat(T, nn) {
  // T (0...3) & nn: lunar.dd
  var chi = DiaChi(nn);
  var k = 0;

  switch (T) {
    case 0:
      if (chi == CHI[0] || chi == CHI[11]) k = 1;
      break; // Xuân: Tý hợi
    case 1:
      if (chi == CHI[2] || chi == CHI[3]) k = 1;
      break; // Hạ:   dần Mão
    case 2:
      if (chi == CHI[5] || chi == CHI[6]) k = 1;
      break; // Thu:  tị Ngọ
    case 3:
      if (chi == CHI[8] || chi == CHI[9]) k = 1;
      break; // Đông: thân Dậu
  }

  return k;
}

// Ngũ Quỷ 五鬼 [ NHK *** ]
//   ngọ dần thìn dậu mão thân sửu tị tý hợi mùi tuất
// kị xuất hành
export function nguQuy(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
    case 2:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 3:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
    case 4:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
    case 5:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 6:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 7:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 8:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 9:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 10:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 11:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 12:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
  }
  return k;
}

// Khô Ngư 枯魚 [ NHK **** ]
// Thìn, Tỵ, Ngọ, Mùi, Thân, Dậu, Tuất, Hợi, Tý, Sửu, Dần, Mão
// kị tài chủng (tải giống)
export function khoNgu(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
    case 2:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 3:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
    case 4:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 5:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 6:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
    case 7:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
    case 8:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 9:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 10:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 11:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 12:
      if (chi == CHI[3]) k = 1;
      break; // Mão
  }
  return k;
}

// Thổ Ngân 土痕 [ DGTNH *** ]
// thi lệ: đại nguyệt sơ tam ngũ thất đồng, thập ngũ thập bát tận tương thông;
//   tiểu nguyệt sơ nhất nhị dữ lục, nhập nhị lục thất tại kì trung.
// kị động thổ
export function thoNgan(n, th30) {
  // n: 1-30, th30: tháng 30 ngày (true)
  var k = 0;

  if (th30) {
    if (n == 3 || n == 5 || n == 7 || n == 15 || n == 18) k = 1;
  } else {
    if (n == 1 || n == 2 || n == 6 || n == 22 || n == 26 || n == 27) k = 1;
  }
  return k;
}

// Điền Ngân 田痕 [ DGTNH *** ]
// thi lệ: đại phùng sơ lục bát vô soa, nhập nhị nhập tam cộng nhất gia;
//   sơ bát thập nhất tam trị tiểu, thập thất thập cửu tái vô tha.
// kị khai khẩn điền trù tịnh canh chủng
export function dienNgan(n, th30) {
  // n: 1-30, th30: tháng 30 ngày (true)
  var k = 0;

  if (th30) {
    if (n == 6 || n == 8 || n == 22 || n == 23) k = 1;
  } else {
    if (n == 8 || n == 11 || n == 13 || n == 17 || n == 19) k = 1;
  }
  return k;
}

// Thủy Ngân 水痕 [ DGTNH, NHK *** ]
// thi lệ: đại nguyệt sơ nhất thất thập nhất; thập thất nhập tam tịnh tam thập; tiểu nguyệt sơ tam sơ thất phùng; thập nhị nhập lục vô soa thất
// kị tạo tửu, hợp tương
export function thuyNgan(n, th30) {
  // n: 1-30, th30: tháng 30 ngày (true)
  var k = 0;

  if (th30) {
    if (n == 1 || n == 7 || n == 17 || n == 23 || n == 30) k = 1;
  } else {
    if (n == 3 || n == 7 || n == 20 || n == 26) k = 1;
  }
  return k;
}

// Kim Ngân 金痕 [ DGTNH *** ]
// thi lệ: đại kị sơ ngũ lục thất cộng, hoàn hữu nhập thất hựu lôi đồng;
//   tiểu nguyệt sơ nhị nhập bát cửu, thử thị kim ngân kị chú dong.
// kị chú (đúc) kiếm, kim ngân khí vật
export function kimNgan(n, th30) {
  // n: 1-30, th30: tháng 30 ngày (true)
  var k = 0;

  if (th30) {
    if (n == 5 || n == 6 || n == 27) k = 1;
  } else {
    if (n == 2 || n == 28 || n == 29) k = 1;
  }
  return k;
}

// Sơn Ngân 金痕 [ DGTNH *** ]
// thi lệ: đại nguyệt sơ nhị bát vi tông, thập nhị thập thất nhị thập cộng;
//   tiểu nguyệt sơ ngũ thập tứ nhật, nhập nhất nhập tam sơn ngân hung.
// kị nhập sơn phạt mộc
export function sonNgan(n, th30) {
  // n: 1-30, th30: tháng 30 ngày (true)
  var k = 0;

  if (th30) {
    if (n == 2 || n == 8 || n == 12 || n == 27) k = 1;
  } else {
    if (n == 5 || n == 14 || n == 27) k = 1;
  }
  return k;
}

// Phủ Đầu Sát 斧頭殺 [ DGTNH ]
//   xuân khán phi long thượng cửu thiên, hạ phó hồ dương thảo để miên,
//   thu thính kim kê đề ngũ dạ, đông hiềm thử tử quá thương tiền
// lịch lệ: dĩ xuân thìn, hạ mùi, thu tuất, đông sửu, vi lao nhật.
//   xuân thìn hạ mùi thu dậu đông tý
// kị phạt mộc, khởi tạo, giá mã
export function phuDauSat(T, nn) {
  // T (0...3) & nn: lunar.dd
  var chi = DiaChi(nn);
  var k = 0;

  switch (T) {
    case 0:
      if (chi == CHI[4]) k = 1;
      break; // Xuân thìn
    case 1:
      if (chi == CHI[7]) k = 1;
      break; // Hạ   mùi
    case 2:
      if (chi == CHI[9]) k = 1;
      break; // Thu  dậu
    case 3:
      if (chi == CHI[0]) k = 1;
      break; // Đông tý
  }

  return k;
}

// Cô Thần 孤辰 (DGTNH ***)
// kị giá thú
export function coThan(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 2:
    case 12:
      if (chi == CHI[2]) k = 1;
      break; // dần
    case 3:
    case 4:
    case 5:
      if (chi == CHI[5]) k = 1;
      break; // tị
    case 6:
    case 7:
    case 8:
      if (chi == CHI[8]) k = 1;
      break; // thân
    case 9:
    case 10:
    case 11:
      if (chi == CHI[11]) k = 1;
      break; // hợi
  }
  return k;
}

// Quả Tú 寡宿(DGTNH ***)
// kị giá thú
export function quaTu(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 2:
    case 12:
      if (chi == CHI[10]) k = 1;
      break; // tuất
    case 3:
    case 4:
    case 5:
      if (chi == CHI[1]) k = 1;
      break; // sửu
    case 6:
    case 7:
    case 8:
      if (chi == CHI[4]) k = 1;
      break; // thìn
    case 9:
    case 10:
    case 11:
      if (chi == CHI[7]) k = 1;
      break; // mùi
  }
  return k;
}

// Diệt Môn 滅門 [ DGTNH *** ]
export function dietMon(nien, t, nn) {
  // nien (2007)
  var nc = TueCanVi(nien); // Niên Can
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;

  switch (nc) {
    case 0:
    case 5:
      switch (
        t // kỷ tị bính tý tân mùi bính dần quý dậu mậu thìn ất hợi canh ngọ đinh sửu nhâm thân đinh mão giáp tuất
      ) {
        case 1:
          if (can == CAN[5] && chi == CHI[5]) k = 1;
          break; // kỷ tị
        case 2:
          if (can == CAN[2] && chi == CHI[0]) k = 1;
          break; // bính tý
        case 3:
          if (can == CAN[7] && chi == CHI[7]) k = 1;
          break; // tân mùi
        case 4:
          if (can == CAN[2] && chi == CHI[2]) k = 1;
          break; // bính dần
        case 5:
          if (can == CAN[9] && chi == CHI[9]) k = 1;
          break; // quý dậu
        case 6:
          if (can == CAN[4] && chi == CHI[4]) k = 1;
          break; // mậu thìn
        case 7:
          if (can == CAN[1] && chi == CHI[11]) k = 1;
          break; // ất hợi
        case 8:
          if (can == CAN[6] && chi == CHI[6]) k = 1;
          break; // canh ngọ
        case 9:
          if (can == CAN[3] && chi == CHI[1]) k = 1;
          break; // đinh sửu
        case 10:
          if (can == CAN[8] && chi == CHI[8]) k = 1;
          break; // nhâm thân
        case 11:
          if (can == CAN[3] && chi == CHI[3]) k = 1;
          break; // đinh mão
        case 12:
          if (can == CAN[0] && chi == CHI[10]) k = 1;
          break; // giáp tuất
      }
      break;
    case 1:
    case 6:
      switch (
        t // tân tị mậu tý quý mùi mậu dần ất dậu canh thìn đinh hợi nhâm ngọ kỷ sửu giáp thân kỷ mão bính tuất
      ) {
        case 1:
          if (can == CAN[7] && chi == CHI[5]) k = 1;
          break; // tân tị
        case 2:
          if (can == CAN[4] && chi == CHI[0]) k = 1;
          break; // mậu tý
        case 3:
          if (can == CAN[9] && chi == CHI[7]) k = 1;
          break; // quý mùi
        case 4:
          if (can == CAN[4] && chi == CHI[2]) k = 1;
          break; // mậu dần
        case 5:
          if (can == CAN[1] && chi == CHI[9]) k = 1;
          break; // ất dậu
        case 6:
          if (can == CAN[6] && chi == CHI[4]) k = 1;
          break; // canh thìn
        case 7:
          if (can == CAN[3] && chi == CHI[11]) k = 1;
          break; // đinh hợi
        case 8:
          if (can == CAN[8] && chi == CHI[6]) k = 1;
          break; // nhâm ngọ
        case 9:
          if (can == CAN[5] && chi == CHI[1]) k = 1;
          break; // kỷ sửu
        case 10:
          if (can == CAN[0] && chi == CHI[8]) k = 1;
          break; // giáp thân
        case 11:
          if (can == CAN[5] && chi == CHI[3]) k = 1;
          break; // kỷ mão
        case 12:
          if (can == CAN[2] && chi == CHI[10]) k = 1;
          break; // bính tuất
      }
      break;
    case 2:
    case 7:
      switch (
        t // quý tị canh tý ất mùi canh dần đinh dậu nhâm thìn kỷ hợi giáp ngọ tân sửu bính thân tân mão mậu tuất
      ) {
        case 1:
          if (can == CAN[9] && chi == CHI[5]) k = 1;
          break; // quý tị
        case 2:
          if (can == CAN[6] && chi == CHI[0]) k = 1;
          break; // canh tý
        case 3:
          if (can == CAN[1] && chi == CHI[7]) k = 1;
          break; // ất mùi
        case 4:
          if (can == CAN[6] && chi == CHI[2]) k = 1;
          break; // canh dần
        case 5:
          if (can == CAN[3] && chi == CHI[9]) k = 1;
          break; // đinh dậu
        case 6:
          if (can == CAN[8] && chi == CHI[4]) k = 1;
          break; // nhâm thìn
        case 7:
          if (can == CAN[5] && chi == CHI[11]) k = 1;
          break; // kỷ hợi
        case 8:
          if (can == CAN[0] && chi == CHI[6]) k = 1;
          break; // giáp ngọ
        case 9:
          if (can == CAN[7] && chi == CHI[1]) k = 1;
          break; // tân sửu
        case 10:
          if (can == CAN[2] && chi == CHI[8]) k = 1;
          break; // bính thân
        case 11:
          if (can == CAN[7] && chi == CHI[3]) k = 1;
          break; // tân mão
        case 12:
          if (can == CAN[4] && chi == CHI[10]) k = 1;
          break; // mậu tuất
      }
      break;
    case 3:
    case 8:
      switch (
        t // ất tị nhâm tý đinh mùi nhâm dần kỷ dậu giáp thìn tân hợi bính ngọ quý sửu mậu thân quý mão canh tuất
      ) {
        case 1:
          if (can == CAN[1] && chi == CHI[5]) k = 1;
          break; // ất tị
        case 2:
          if (can == CAN[8] && chi == CHI[0]) k = 1;
          break; // nhâm tý
        case 3:
          if (can == CAN[3] && chi == CHI[7]) k = 1;
          break; // đinh mùi
        case 4:
          if (can == CAN[8] && chi == CHI[2]) k = 1;
          break; // nhâm dần
        case 5:
          if (can == CAN[5] && chi == CHI[9]) k = 1;
          break; // kỷ dậu
        case 6:
          if (can == CAN[0] && chi == CHI[4]) k = 1;
          break; // giáp thìn
        case 7:
          if (can == CAN[7] && chi == CHI[11]) k = 1;
          break; // tân hợi
        case 8:
          if (can == CAN[2] && chi == CHI[6]) k = 1;
          break; // bính ngọ
        case 9:
          if (can == CAN[9] && chi == CHI[1]) k = 1;
          break; // quý sửu
        case 10:
          if (can == CAN[4] && chi == CHI[8]) k = 1;
          break; // mậu thân
        case 11:
          if (can == CAN[9] && chi == CHI[3]) k = 1;
          break; // quý mão
        case 12:
          if (can == CAN[6] && chi == CHI[10]) k = 1;
          break; // canh tuất
      }
      break;
    case 4:
    case 9:
      switch (
        t // đinh tị giáp tý kỷ mùi giáp dần tân dậu bính thìn quý hợi mậu ngọ ất sửu canh thân ất mão nhâm tuất
      ) {
        case 1:
          if (can == CAN[3] && chi == CHI[5]) k = 1;
          break; // đinh tị
        case 2:
          if (can == CAN[0] && chi == CHI[0]) k = 1;
          break; // giáp tý
        case 3:
          if (can == CAN[5] && chi == CHI[7]) k = 1;
          break; // kỷ mùi
        case 4:
          if (can == CAN[0] && chi == CHI[2]) k = 1;
          break; // giáp dần
        case 5:
          if (can == CAN[7] && chi == CHI[9]) k = 1;
          break; // tân dậu
        case 6:
          if (can == CAN[2] && chi == CHI[4]) k = 1;
          break; // bính thìn
        case 7:
          if (can == CAN[9] && chi == CHI[11]) k = 1;
          break; // quý hợi
        case 8:
          if (can == CAN[4] && chi == CHI[6]) k = 1;
          break; // mậu ngọ
        case 9:
          if (can == CAN[1] && chi == CHI[1]) k = 1;
          break; // ất sửu
        case 10:
          if (can == CAN[6] && chi == CHI[8]) k = 1;
          break; // canh thân
        case 11:
          if (can == CAN[1] && chi == CHI[3]) k = 1;
          break; // ất mão
        case 12:
          if (can == CAN[8] && chi == CHI[10]) k = 1;
          break; // nhâm tuất
      }
      break;
  }
  return k;
}

// Tứ Phương Hao 四方耗 [ DGTNH-16,27 *** ]
// thi lệ: chánh ngũ cửu phùng sơ nhị nhật, nhị lục thập nguyệt sơ tam chân, tam thất thập nhất sơ tứ trị, tứ bát thập nhị sơ ngũ sân
// kị khai thị, giao dịch, nạp tài, xuất hành, tạo thương khố hung
export function tuPhuongHao(t, n) {
  // n: 1-30
  var k = 0;

  switch (t) {
    case 1:
    case 5:
    case 9:
      if (n == 2) k = 1;
      break;
    case 2:
    case 6:
    case 10:
      if (n == 3) k = 1;
      break;
    case 3:
    case 7:
    case 11:
      if (n == 4) k = 1;
      break;
    case 4:
    case 8:
    case 12:
      if (n == 5) k = 1;
      break;
  }
  return k;
}

// Thiên Hưu Phế 天休廢 [ DGTNH-16,30 *** ]
// kị thượng quan, nhập học, ứng thí, phó cử, điêu khắc, tác nhiễm (thuốc nhuộm), khai trì đường hung
export function thienHuuPhe(t, n) {
  // n: 1-30
  var k = 0;

  switch (t) {
    case 1:
    case 4:
    case 7:
    case 10:
      if (n == 4 || n == 9) k = 1;
      break;
    case 2:
    case 5:
    case 8:
    case 11:
      if (n == 13 || n == 18) k = 1;
      break;
    case 3:
    case 6:
    case 9:
    case 12:
      if (n == 22 || n == 27) k = 1;
      break;
  }
  return k;
}

// Ôn Xuất  瘟出 [ DGTNH *** ]
// kị di đồ, nhập trạch, xuất hỏa, mục dưỡng, nạp súc, tạo súc lan hung
export function onXuat(th, n) {
  // th: tháng âm lịch bắt đầu từ mồng 1
  var k = 0;
  switch (th) {
    case 1:
      if (n == 9) k = 1;
      break;
    case 2:
      if (n == 8) k = 1;
      break;
    case 3:
      if (n == 6) k = 1;
      break;
    case 4:
      if (n == 8) k = 1;
      break;
    case 5:
      if (n == 7) k = 1;
      break;
    case 6:
      if (n == 6) k = 1;
      break;
    case 7:
      if (n == 23) k = 1;
      break;
    case 8:
      if (n == 30) k = 1;
      break;
    case 9:
      if (n == 20) k = 1;
      break;
    case 10:
      if (n == 6) k = 1;
      break;
    case 11:
      if (n == 5) k = 1;
      break;
    case 12:
      if (n == 14) k = 1;
      break;
  }
  return k;
}

// Ôn Nhập 瘟入 [ DGTNH *** ]
// kị di đồ, nhập trạch, xuất hỏa, mục dưỡng, nạp súc, tạo súc lan hung
export function onNhap(th, n) {
  // th: tháng âm lịch bắt đầu từ mồng 1
  var k = 0;
  switch (th) {
    case 1:
      if (n == 6) k = 1;
      break;
    case 2:
      if (n == 5) k = 1;
      break;
    case 3:
      if (n == 3) k = 1;
      break;
    case 4:
      if (n == 25) k = 1;
      break;
    case 5:
      if (n == 24) k = 1;
      break;
    case 6:
      if (n == 23) k = 1;
      break;
    case 7:
      if (n == 20) k = 1;
      break;
    case 8:
      if (n == 27) k = 1;
      break;
    case 9:
      if (n == 17) k = 1;
      break;
    case 10:
      if (n == 13) k = 1;
      break;
    case 11:
      if (n == 12) k = 1;
      break;
    case 12:
      if (n == 11) k = 1;
      break;
  }
  return k;
}

// kê hoãn 雞緩 [ DGTNH *** ]
// thi lệ: đinh mão giáp tuất liên tân sửu; mậu tý ất mùi nhâm dần cầu; ất dậu bính thìn quý dậu nhật; nạp mãi nô tì sự bất chu.
// tu tác, động thổ; chủ thủ túc phong điên
export function keHoan(nn) {
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;

  if (can == CAN[3] && chi == CHI[3]) k = 1; // đinh mão
  else if (can == CAN[0] && chi == CHI[10]) k = 1; // giáp tuất
  else if (can == CAN[7] && chi == CHI[1]) k = 1; // tân sửu
  else if (can == CAN[4] && chi == CHI[0]) k = 1; // mậu tý
  else if (can == CAN[1] && chi == CHI[7]) k = 1; // ất mùi
  else if (can == CAN[8] && chi == CHI[2]) k = 1; // nhâm dần
  else if (can == CAN[1] && chi == CHI[9]) k = 1; // ất dậu
  else if (can == CAN[2] && chi == CHI[4]) k = 1; // bính thìn
  else if (can == CAN[9] && chi == CHI[9]) k = 1; // quý dậu

  return k;
}

// Thám Bệnh Hung Nhật 探病忌日 (DGTNH, ^khuyết)
// Ngày hung kị đi thăm người bệnh
// Nhâm Dần, Nhâm Ngọ, liên Canh Ngọ,
// Giáp Dần, Ất Mão, Kỷ Mão phòng,
// Thần tiên lưu hạ thử lục nhật,
// Thám nhân tật bệnh thế nhân vong.
export function thamBenh(nn) {
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;

  if (can == CAN[8] && chi == CHI[2]) k = 1; // Nhâm Dần
  else if (can == CAN[8] && chi == CHI[6]) k = 1; // Nhâm Ngọ
  else if (can == CAN[6] && chi == CHI[6]) k = 1; // Canh Ngọ
  else if (can == CAN[0] && chi == CHI[2]) k = 1; // Giáp Dần
  else if (can == CAN[1] && chi == CHI[3]) k = 1; // Ất Mão
  else if (can == CAN[5] && chi == CHI[3]) k = 1; // Ất Mão

  return k;
}

// Chuyên Nhật 專日 [ DGTNH-14 ]
// chuyên nhật giả: giáp dần, ất mão, đinh tị, bính ngọ, canh thân, tân dậu, quý hợi, nhâm tý, mậu thìn, mậu tuất, kỷ sửu, kỷ mùi
export function chuyenNhat(nn) {
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;

  if (can == CAN[0] && chi == CHI[2]) k = 1; // giáp dần
  else if (can == CAN[1] && chi == CHI[3]) k = 1; // ất mão
  else if (can == CAN[3] && chi == CHI[5]) k = 1; // đinh tị
  else if (can == CAN[2] && chi == CHI[6]) k = 1; // bính ngọ
  else if (can == CAN[6] && chi == CHI[8]) k = 1; // canh thân
  else if (can == CAN[7] && chi == CHI[9]) k = 1; // tân dậu
  else if (can == CAN[9] && chi == CHI[11]) k = 1; // quý hợi
  else if (can == CAN[8] && chi == CHI[0]) k = 1; // nhâm tý
  else if (can == CAN[4] && chi == CHI[4]) k = 1; // mậu thìn
  else if (can == CAN[4] && chi == CHI[10]) k = 1; // mậu tuất
  else if (can == CAN[5] && chi == CHI[1]) k = 1; // kỷ sửu
  else if (can == CAN[5] && chi == CHI[7]) k = 1; // kỷ mùi

  return k;
}

// Phạt Nhật 伐日 [ DGTNH-14 ]
// phạt nhật giả: canh ngọ, tân tị, bính tý, mậu dần, kỷ mão, quý mùi, quý sửu, giáp thân, ất dậu, đinh hợi, nhâm thìn, nhâm tuất dã
export function phatNhat(nn) {
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;

  if (can == CAN[6] && chi == CHI[6]) k = 1; // canh ngọ
  else if (can == CAN[7] && chi == CHI[5]) k = 1; // tân tị
  else if (can == CAN[2] && chi == CHI[0]) k = 1; // bính tý
  else if (can == CAN[4] && chi == CHI[2]) k = 1; // mậu dần
  else if (can == CAN[5] && chi == CHI[3]) k = 1; // kỷ mão
  else if (can == CAN[9] && chi == CHI[7]) k = 1; // quý mùi
  else if (can == CAN[9] && chi == CHI[1]) k = 1; // quý sửu
  else if (can == CAN[0] && chi == CHI[8]) k = 1; // giáp thân
  else if (can == CAN[1] && chi == CHI[0]) k = 1; // ất dậu
  else if (can == CAN[3] && chi == CHI[11]) k = 1; // đinh hợi
  else if (can == CAN[8] && chi == CHI[4]) k = 1; // nhâm thìn
  else if (can == CAN[8] && chi == CHI[10]) k = 1; // nhâm tuất

  return k;
}
export function thuCatThan(thisday, truc) {
  // isLeap: isLeap,
  // dayLunar: day,
  // monthLunar: month,
  // yearLunar: year,
  // daysTotalInLunar: dd,

  var cat = [];
  if (thisday) {
    var Tiet = layTiet(thisday.yearSolar, thisday.monthSolar, thisday.daySolar);
    var THau = tietHau(thisday.yearSolar, thisday.monthSolar, thisday.daySolar);
    var KHau = khiHau(thisday.yearSolar, thisday.monthSolar, thisday.daySolar);
    var T4 = lay4Thoi(thisday.yearSolar, thisday.monthSolar, thisday.daySolar);

    var c;

    c = thienAn(thisday.daysTotalInLunar);
    if (c) cat.push("Thiên Ân");

    c = thienQuy(T4, thisday.daysTotalInLunar);
    if (c) cat.push("Thiên Quý");

    c = tuTuong(T4, thisday.daysTotalInLunar);
    if (c) cat.push("Tứ Tướng");

    c = thienXa(T4, thisday.daysTotalInLunar);
    if (c) cat.push("Thiên Xá");

    //c = thienAtQuiNhan(Tiet, thisday.dayLunar) // ***
    //if (c) cat.push("Thiên Ất Quí Nhân");

    c = mauThuong(T4, thisday.daysTotalInLunar);
    if (c) cat.push("Mẫu Thương");

    c = giaiThan(Tiet, thisday.daysTotalInLunar);
    if (c) cat.push("Giải Thần");

    c = nguyetAn(Tiet, thisday.daysTotalInLunar);
    if (c) cat.push("Nguyệt Ân");

    c = nguyetDuc(Tiet, thisday.daysTotalInLunar);
    if (c) cat.push("Nguyệt Đức");

    c = nguyetDucHop(Tiet, thisday.daysTotalInLunar);
    if (c) cat.push("Nguyệt Đức Hợp");

    c = nguyetDucQuiNhan(Tiet, thisday.daysTotalInLunar); // ***
    if (c) cat.push("Nguyệt Đức Quí Nhân");

    c = nguyetKhong(Tiet, thisday.daysTotalInLunar);
    if (c) cat.push("Nguyệt Không");

    c = thienDuc(Tiet, thisday.daysTotalInLunar);
    if (c) cat.push("Thiên Đức");

    c = thienDucHop(Tiet, thisday.daysTotalInLunar);
    if (c) cat.push("Thiên Đức Hợp");

    c = thienThanh(Tiet, thisday.daysTotalInLunar);
    if (c) cat.push("Thiên Thành");

    c = tamHop(Tiet, thisday.daysTotalInLunar);
    if (c) cat.push("Tam Hợp");

    c = lucHop(Tiet, thisday.daysTotalInLunar);
    if (c) cat.push("Lục Hợp");

    c = thoiDuc(T4, thisday.daysTotalInLunar);
    if (c) cat.push("Thời Đức");

    c = nguHop(thisday.daysTotalInLunar);
    if (c) cat.push("Ngũ Hợp");

    c = lamNhat(Tiet, thisday.daysTotalInLunar);
    if (c) cat.push("Lâm Nhật");

    c = dichMa(Tiet, thisday.daysTotalInLunar);
    if (c) cat.push("Dịch Mã");
    if (c) cat.push("Thiên Hậu");

    c = nguyetTai(Tiet, thisday.daysTotalInLunar);
    if (c) cat.push("Nguyệt Tài");

    c = minhTinh(Tiet, thisday.daysTotalInLunar);
    if (c) cat.push("Thiên Nhạc");
    if (c) cat.push("Minh Tinh");

    c = catKhanh(Tiet, thisday.daysTotalInLunar); // Res ***
    if (c) cat.push("Cát Khánh");

    c = locKho(Tiet, thisday.daysTotalInLunar); // Res ***
    if (c) cat.push("Lộc Khố");

    c = thanhLong(Tiet, thisday.daysTotalInLunar);
    if (c) cat.push("Thanh Long");

    c = minhDuong(Tiet, thisday.daysTotalInLunar);
    if (c) cat.push("Minh Đường");

    c = kimQuy(Tiet, thisday.daysTotalInLunar);
    if (c) cat.push("Kim Quỹ");
    if (c) cat.push("Thiên Tài Tinh"); // DGTNH ***

    c = thienDucHD(Tiet, thisday.daysTotalInLunar);
    if (c) cat.push("Thiên Đức hoàng đạo");
    if (c) cat.push("Địa Tài Tinh"); // DGTNH ***
    if (c) cat.push("Bảo Quang"); // DGTNH ***

    c = ngocDuong(Tiet, thisday.daysTotalInLunar);
    if (c) cat.push("Ngọc Đường");

    c = kimDuong(Tiet, thisday.daysTotalInLunar); // DGTNH ***
    if (c) cat.push("Kim Đường");

    c = tuMenh(Tiet, thisday.daysTotalInLunar);
    if (c) cat.push("Tư Mệnh");
    if (c) cat.push("Dương Đức");

    c = phucSinh(Tiet, thisday.daysTotalInLunar);
    if (c) cat.push("Phúc Sinh");

    c = minhPhe(thisday.daysTotalInLunar);
    if (c) cat.push("Minh Phệ");

    c = minhPheDoi(thisday.daysTotalInLunar);
    if (c) cat.push("Minh Phệ Đối");

    c = nguPhu(Tiet, thisday.daysTotalInLunar);
    if (c) cat.push("Ngũ Phú");

    c = vuongNhat(T4, thisday.daysTotalInLunar);
    if (c) cat.push("Vương Nhật");
    if (c) cat.push("Phúc Hậu");

    c = vuongNhat100(T4, thisday.daysTotalInLunar);
    if (c) cat.push("Vượng Nhật");

    c = quanNhat(T4, thisday.daysTotalInLunar);
    if (c) cat.push("Quan Nhật");

    c = thuNhat(T4, thisday.daysTotalInLunar);
    if (c) cat.push("Thủ Nhật");

    c = tuongNhat(T4, thisday.daysTotalInLunar);
    if (c) cat.push("Tướng Nhật");

    c = danNhat(T4, thisday.daysTotalInLunar);
    if (c) cat.push("Dân Nhật");

    c = catKyNhat(Tiet, truc, thisday.daysTotalInLunar);
    if (c) cat.push("Cát Kì");

    c = phucDuc(Tiet, truc, thisday.daysTotalInLunar);
    if (c) cat.push("Phúc Đức");
    if (c) cat.push("Thiên Phú");
    if (c) cat.push("Thiên Vu");

    c = thoiAm(Tiet, truc, thisday.daysTotalInLunar);
    if (c) cat.push("Thời Âm");

    c = chiDuc(Tiet, truc, thisday.daysTotalInLunar);
    if (c) cat.push("Chi Đức");

    c = thienY(Tiet, truc, thisday.daysTotalInLunar);
    if (c) cat.push("Thiên Y");
    if (c) cat.push("Thiên Hỷ");

    c = thoiDuong(Tiet, truc, thisday.daysTotalInLunar);
    if (c) cat.push("Thời Dương");
    if (c) cat.push("Sinh Khí");

    c = thienMa(Tiet, thisday.daysTotalInLunar);
    if (c) cat.push("Thiên Mã");

    c = thienNhac(Tiet, thisday.daysTotalInLunar);
    if (c) cat.push("Thiên Nhạc");

    c = yeuYen(Tiet, thisday.daysTotalInLunar);
    if (c) cat.push("Yếu Yên");

    c = ngocVu(Tiet, thisday.daysTotalInLunar); // DGTNH ***
    if (c) cat.push("Ngọc Vũ");

    c = kinhAn(Tiet, thisday.daysTotalInLunar);
    if (c) cat.push("Kính An");
    if (c) cat.push("Kính Tâm"); // DGTNH ***

    c = phoHo(Tiet, thisday.daysTotalInLunar);
    if (c) cat.push("Phổ Hộ");

    c = thanhTam(Tiet, thisday.daysTotalInLunar);
    if (c) cat.push("Thánh Tâm");

    c = ichHau(Tiet, thisday.daysTotalInLunar);
    if (c) cat.push("Ích Hậu");

    c = tucThe(Tiet, thisday.daysTotalInLunar);
    if (c) cat.push("Tục Thế");

    c = thienNguyen(Tiet, thisday.daysTotalInLunar);
    if (c) cat.push("Thiên Nguyện");

    c = lucNghi(Tiet, thisday.daysTotalInLunar);
    if (c) cat.push("Lục Nghi");

    c = thienThuong(Tiet, thisday.daysTotalInLunar);
    if (c) cat.push("Thiên Thương");

    c = batTuong(Tiet, thisday.daysTotalInLunar);
    if (c) cat.push("Bất Tướng");

    c = amDuc(Tiet, thisday.daysTotalInLunar);
    if (c) cat.push("Âm Đức");

    c = thanTai(thisday.daysTotalInLunar);
    if (c) cat.push("Thần Tại");

    c = truThan(thisday.daysTotalInLunar);
    if (c) cat.push("Trừ Thần");

    c = thienPhuc(thisday.daysTotalInLunar);
    if (c) cat.push("Thiên Phúc");

    c = thienThuy(thisday.daysTotalInLunar); // DGTNH ***
    if (c) cat.push("Thiên Thụy");

    c = bangChanhPhe(T4, thisday.daysTotalInLunar); // NHK ***
    if (c) cat.push("Bàng Chánh Phế");

    c = daiMinhCatNhat(thisday.daysTotalInLunar); // NHK ***
    if (c) cat.push("Đại Minh");

    c = daiThauTuNhat(thisday.daysTotalInLunar); // NHK ***
    if (c) cat.push("Đại Thâu");

    c = thienQuan(Tiet, thisday.daysTotalInLunar);
    if (c) cat.push("Thiên Quan");

    c = hienTinh(Tiet, thisday.daysTotalInLunar);
    if (c) cat.push("Hiển Tinh");
    if (c) cat.push("Thiên Hoàng");

    c = khucTinh(Tiet, thisday.daysTotalInLunar); // DGTNH ***
    if (c) cat.push("Khúc Tinh");
    if (c) cat.push("Ngọc Hoàng");

    c = phoTinh(Tiet, thisday.daysTotalInLunar); // DGTNH ***
    if (c) cat.push("Phó Tinh");
    if (c) cat.push("Tử Vi");

    c = thatThanh(thisday.daysTotalInLunar);
    if (c) cat.push("Thất Thánh");

    c = tueDuc(thisday.tue, thisday.daysTotalInLunar);
    if (c) cat.push("Tuế Đức");

    c = tueDucHop(thisday.tue, thisday.daysTotalInLunar);
    if (c) cat.push("Tuế Đức Hợp");

    c = tueLoc(thisday.tue, thisday.daysTotalInLunar); // DGTNH ***
    if (c) cat.push("Tuế Lộc");

    c = manDuc(Tiet, thisday.daysTotalInLunar);
    if (c) cat.push("Mãn Đức");

    c = thienDe(KHau, thisday.daysTotalInLunar); // PSD ***
    if (c) cat.push("Thiên Đế");

    c = thienHau(Tiet, thisday.daysTotalInLunar); // PSD ***
    if (c) cat.push("Thiên Hậu");

    c = uViTinh(KHau, thisday.daysTotalInLunar);
    if (c) cat.push("U Vi Tinh");

    c = daiHongSa(T4, thisday.daysTotalInLunar);
    if (c) cat.push("Đại Hồng Sa");

    c = nguDeSinh(thisday.daysTotalInLunar); // DGTNH ***
    if (c) cat.push("Ngũ Đế Sinh");

    c = laThienDaiTien(thisday.dayLunar, thisday.daysTotalInLunar); // Res ***
    if (c) cat.push("La Thiên Đại Tiến");

    c = hoiDong(thisday.daysTotalInLunar); // DGTNH ***
    if (c) cat.push("Hội Đồng");
  }
  return cat;
}

// Có Hung Thần nào không ?
export function thuHungThan(thisday, truc) {
  // isLeap: isLeap,
  // dayLunar: day,
  // monthLunar: month,
  // yearLunar: year,
  // dayLunarTotalInLunar: dd,
  var ki = [];
  if (thisday) {
    var Tiet = layTiet(thisday.yearSolar, thisday.monthSolar, thisday.daySolar);
    var THau = tietHau(thisday.yearSolar, thisday.monthSolar, thisday.daySolar);
    var KHau = khiHau(thisday.yearSolar, thisday.monthSolar, thisday.daySolar);
    var T4 = lay4Thoi(thisday.yearSolar, thisday.monthSolar, thisday.daySolar);
    var D = ngayKhoiTiet(
      thisday.yearSolar,
      thisday.monthSolar,
      thisday.daySolar
    );
    var k;

    k = tamNuong(thisday.dayLunar);
    if (k) ki.push("Tam Nương");

    k = tuDaiKy(thisday.dayLunar);
    switch (k) {
      case 1:
        ki.push("Tứ Đại Kị (giá thú)");
        break;
      case 2:
        ki.push("Tứ Đại Kị (xây cất)");
        break;
      case 3:
        ki.push("Tứ Đại Kị (an táng)");
        break;
      case 4:
        ki.push("Tứ Đại Kị (di cư)");
        break;
    }

    k = tuBatTuong(thisday.dayLunar);
    if (k) ki.push("Tứ Bất Tường");

    k = tieuHongSa(Tiet, thisday.daysTotalInLunar);
    if (k) ki.push("Hồng Sa");

    k = ngamThan(Tiet, thisday.daysTotalInLunar); // DG (phương vị) ***
    if (k) ki.push("Ngâm Thần");

    k = satChu(Tiet, thisday.daysTotalInLunar);
    if (k) ki.push("Sát Chủ");

    var kv = daiKhongVong(thisday.monthLunar);
    for (i = 0; i < kv.length; i++) {
      if (kv[i] == thisday.dayLunar) {
        ki.push("Đại Không Vong");
        break;
      }
    }

    k = tuLy(thisday.yearSolar, thisday.monthSolar, thisday.daySolar);
    if (k) ki.push("Tứ Ly");

    k = tuTuyetNhat(thisday.yearSolar, thisday.monthSolar, thisday.daySolar);
    if (k) ki.push("Tứ Tuyệt");

    k = nguyetKy(thisday.dayLunar);
    if (k) ki.push("Nguyệt Kị");

    k = thuTu(Tiet, thisday.daysTotalInLunar);
    if (k) ki.push("Thụ Tử");

    k = hoangSa(Tiet, thisday.daysTotalInLunar);
    if (k) ki.push("Hoàng Sa");

    k = thienTac(Tiet, thisday.daysTotalInLunar);
    if (k) ki.push("Thiên Tặc");

    k = nguyetYem(Tiet, thisday.daysTotalInLunar);
    if (k) ki.push("Nguyệt Yếm"); // Nguyệt Áp
    if (k) ki.push("Đại Họa");
    if (k) ki.push("Địa Hỏa");

    k = bangTieuNgoaHam(Tiet, thisday.daysTotalInLunar);
    if (k) ki.push("Băng Tiêu Ngõa Hãm"); // Băng đá tan ra phá hoại

    k = bangTieuNgoaGiai(
      thisday.yearSolar,
      thisday.monthSolar,
      thisday.daySolar
    );
    if (k == 1) ki.push("Băng Tiêu"); // Nước băng đá tan ra
    if (k == 2) ki.push("Ngõa Giải"); // Vỡ hoặc lở ra

    k = thienHinh(Tiet, thisday.daysTotalInLunar); //Đi chung với Thanh Long (12 tinh)
    if (k) ki.push("Thiên Hình");

    k = chuTuoc(Tiet, thisday.daysTotalInLunar);
    if (k) ki.push("Chu Tước");

    k = bachHo(Tiet, thisday.daysTotalInLunar);
    if (k) ki.push("Bạch Hổ");
    if (k) ki.push("Thiên Bồng");

    k = thienLao(Tiet, thisday.daysTotalInLunar);
    if (k) ki.push("Thiên Lao");

    k = huyenVu(Tiet, thisday.daysTotalInLunar);
    if (k) ki.push("Huyền Vũ");
    if (k) ki.push("Nguyên Vũ");

    k = cauTran(Tiet, thisday.daysTotalInLunar);
    if (k) ki.push("Câu Trần");

    k = bachHoTrungCung(thisday.daysTotalInLunar); // (DCTN ***)
    if (k) ki.push("Bạch Hổ Nhập Trung");

    k = cuuThoQuyNhat(thisday.daysTotalInLunar);
    if (k) ki.push("Cửu Thổ Quỷ");

    k = thienCach(Tiet, thisday.daysTotalInLunar);
    if (k) ki.push("Thiên Cách");

    k = lamCach(Tiet, thisday.daysTotalInLunar);
    if (k) ki.push("Lâm Cách");

    k = diaCach(Tiet, thisday.daysTotalInLunar);
    if (k) ki.push("Địa Cách");

    k = thanCach(Tiet, thisday.daysTotalInLunar);
    if (k) ki.push("Thần Cách");

    k = hoaCach(Tiet, thisday.daysTotalInLunar);
    if (k) ki.push("Hỏa Cách");

    k = sonCach(Tiet, thisday.daysTotalInLunar);
    if (k) ki.push("Sơn Cách");

    k = quyCach(Tiet, thisday.daysTotalInLunar);
    if (k) ki.push("Quỷ Cách");

    k = nhanCach(Tiet, thisday.daysTotalInLunar);
    if (k) ki.push("Nhân Cách");

    k = thuyCach(Tiet, thisday.daysTotalInLunar);
    if (k) ki.push("Thủy Cách");

    k = chauCach(Tiet, thisday.daysTotalInLunar);
    if (k) ki.push("Châu Cách");

    k = nguyetSat(Tiet, thisday.daysTotalInLunar);
    if (k) ki.push("Nguyệt Sát");
    if (k) ki.push("Nguyệt Hư");

    k = nguyetHai(Tiet, thisday.daysTotalInLunar);
    if (k) ki.push("Nguyệt Hại");
    if (k) ki.push("Nguyệt Hỏa");
    if (k) ki.push("Độc Hỏa");

    k = nguyetHinh(Tiet, thisday.daysTotalInLunar);
    if (k) ki.push("Nguyệt Hình");

    k = uongBai(Tiet, thisday.daysTotalInLunar);
    if (k) ki.push("Ương Bại");

    k = kiepSat(Tiet, thisday.daysTotalInLunar);
    if (k) ki.push("Kiếp Sát");

    k = taiSatPhiMa(Tiet, thisday.daysTotalInLunar);
    if (k) ki.push("Thiên Hỏa");
    if (k) ki.push("Thiên Ngục");
    if (k) ki.push("Tai Sát");
    if (k) ki.push("Phi Ma Sát");

    k = moKhoSat(Tiet, thisday.daysTotalInLunar); // ***
    if (k) ki.push("Mộ Khố Sát");

    k = duongCong(thisday.monthLunar, thisday.dayLunar);
    if (k) ki.push("Dương Công Kị");

    k = thienDiaHungBai(thisday.monthLunar, thisday.dayLunar);
    if (k) ki.push("Thiên Địa Hung Bại");

    k = xichTungTu(thisday.monthLunar, thisday.dayLunar);
    if (k) ki.push("Xích Tùng Tử");

    k = tuKhi(Tiet, truc, thisday.daysTotalInLunar);
    if (k) ki.push("Tử Khí");
    if (k) ki.push("Quan Phù");

    k = tieuHao(Tiet, truc, thisday.daysTotalInLunar);
    if (k) ki.push("Tiểu Hao");

    k = thienCau(Tiet, truc, thisday.daysTotalInLunar);
    if (k) ki.push("Thiên Cẩu");
    if (k) ki.push("Thổ Ôn");
    if (k) ki.push("Địa Thư");

    k = daiHao(Tiet, truc, thisday.daysTotalInLunar);
    if (k) ki.push("Đại Hao");
    if (k) ki.push("Nguyệt Phá");

    k = vangVong(Tiet, thisday.daysTotalInLunar);
    if (k) ki.push("Vãng Vong");
    if (k) ki.push("Thổ Kị");

    k = khiVangVong(Tiet, D, thisday.daysTotalInLunar);
    if (k) ki.push("Khí Vãng Vong");

    k = thoCam(T4, thisday.daysTotalInLunar);
    if (k) ki.push("Thổ Cấm");
    if (k) ki.push("Phục Tội");
    if (k) ki.push("Kim Đao");

    k = hoaTinh(Tiet, thisday.daysTotalInLunar);
    if (k) ki.push("Hỏa Tinh");

    k = batPhong(T4, thisday.daysTotalInLunar);
    if (k) ki.push("Bát Phong");

    k = khuocSat(thisday.daysTotalInLunar);
    if (k) ki.push("Khước Sát");

    kv = tieuKhongVong(thisday.monthSolar);
    for (i = 0; i < kv.length; i++) {
      if (kv[i] == thisday.dayLunar) {
        ki.push("Tiểu Không Vong");
        break;
      }
    }

    k = thanHieu(Tiet, thisday.daysTotalInLunar); // FSD **
    if (k) ki.push("Thần Hiệu");

    k = quyKhoc(Tiet, thisday.daysTotalInLunar); // FSD **
    if (k) ki.push("Quỷ Khốc");

    k = thuongSoc(thisday.tue, thisday.daysTotalInLunar);
    if (k) ki.push("Thượng Sóc");

    k = xichKhau(thisday.yearLunar, thisday.monthLunar, thisday.dayLunar); // DGTNH ***
    if (k) ki.push("Xích Khẩu");

    k = tuePha(thisday.yearLunar, thisday.daysTotalInLunar);
    if (k) ki.push("Tuế Phá");

    k = daiThoi(Tiet, thisday.daysTotalInLunar);
    if (k) ki.push("Đại Thời");
    if (k) ki.push("Đại Bại");
    if (k) ki.push("Hàm Trì");

    k = nguMo(Tiet, thisday.daysTotalInLunar);
    if (k) ki.push("Ngũ Mộ");

    k = tuyetYenHoa(Tiet, thisday.daysTotalInLunar);
    if (k) ki.push("Tuyệt Yên Hỏa");

    k = thienLai(Tiet, thisday.daysTotalInLunar);
    if (k) ki.push("Thiên Lại");
    if (k) ki.push("Trí Tử");

    k = duHoa(Tiet, thisday.daysTotalInLunar);
    if (k) ki.push("Du Họa");

    k = thoPhu(Tiet, thisday.daysTotalInLunar);
    if (k) ki.push("Thổ Phù");

    k = cuuKhong(Tiet, thisday.daysTotalInLunar);
    if (k) ki.push("Cửu Không");

    k = nhatLuuTai(Tiet, thisday.daysTotalInLunar); // DGTNH ***
    if (k) ki.push("Nhật Lưu Tài");

    k = vongDoanh(Tiet, thisday.daysTotalInLunar); // DGTNH ***
    if (k) ki.push("Vong Doanh");

    k = thienCung(Tiet, thisday.daysTotalInLunar); // DGTNH ***
    if (k) ki.push("Thiên Cùng");

    k = yemDoi(Tiet, thisday.daysTotalInLunar);
    if (k) ki.push("Yếm Đối");
    if (k) ki.push("Chiêu Diêu"); // DGTNH ***

    k = cuuXu(thisday.daysTotalInLunar);
    if (k) ki.push("Cửu Xú");

    k = batChuyen(thisday.daysTotalInLunar);
    if (k) ki.push("Bát Chuyên");

    k = voLoc(thisday.year, Tiet, thisday.daysTotalInLunar);
    if (k) ki.push("Thập Ác Đại Bại");

    k = nguLy(thisday.daysTotalInLunar);
    if (k) ki.push("Ngũ Ly");

    k = tuHao(T4, thisday.daysTotalInLunar);
    if (k) ki.push("Tứ Hao");

    k = tuKi(T4, thisday.daysTotalInLunar);
    if (k) ki.push("Tứ Kị");

    k = tuCung(T4, thisday.daysTotalInLunar);
    if (k) ki.push("Tứ Cùng");

    k = batLong7Dieu9Ho6Xa(T4, thisday.daysTotalInLunar); // DGTNH ***
    switch (k) {
      case 1:
        ki.push("Bát Long");
        break;
      case 2:
        ki.push("Thất Điểu");
        break;
      case 3:
        ki.push("Cửu Hổ");
        break;
      case 4:
        ki.push("Lục Xà");
        break;
    }

    k = tuPhe(T4, thisday.daysTotalInLunar);
    if (k) ki.push("Tứ Phế");

    k = thapPhuong(thisday.daysTotalInLunar);
    if (k) ki.push("Mộ Nhật");

    k = cuuTieu(thisday.daysTotalInLunar);
    if (k) ki.push("Cửu Tiêu");
    if (k) ki.push("Cửu Không");

    k = taiLyTueKhong(thisday.daysTotalInLunar);
    if (k) ki.push("Tài Ly");
    if (k) ki.push("Tuế Không");

    k = laThienDaiThoai(thisday.dayLunar, thisday.daysTotalInLunar); // Res ***
    if (k) ki.push("La Thiên Đại Thoái");

    k = nguHu(T4, thisday.daysTotalInLunar);
    if (k) ki.push("Ngũ Hư");
    if (k) ki.push("Hoang Vu");
    if (k) ki.push("Cửu Khổ Bát Cùng"); // NHK ***

    k = loBanSat(T4, thisday.daysTotalInLunar);
    if (k) ki.push("Lỗ Ban Sát");
    if (k) ki.push("Bất Cử");
    if (k) ki.push("Đao Châm");
    if (k) ki.push("Bại Nhật");

    k = nguyetKien(Tiet, thisday.daysTotalInLunar);
    if (k) ki.push("Nguyệt Kiến");
    if (k) ki.push("Thổ Phủ");
    if (k) ki.push("Tiểu Thời");

    k = thuNhatDiaPha(Tiet, truc, thisday.daysTotalInLunar); // DGTNH ***
    if (k) ki.push("Địa Phá");
    if (k) ki.push("Âm Nguyệt Hà Khôi");
    if (k) ki.push("Dương Nguyệt Thiên Cương");

    k = thienCuong(Tiet, thisday.daysTotalInLunar); // Thiên Cương Câu Giảo
    if (k) ki.push("Thiên Cương");

    k = tuThan(Tiet, truc, thisday.daysTotalInLunar);
    if (k) ki.push("Tử Thần");
    if (k) ki.push("Âm Nguyệt Thiên Cương"); // DGTNH ***
    if (k) ki.push("Dương Nguyệt Hà Khôi"); // DGTNH ***

    k = haKhoi(Tiet, thisday.daysTotalInLunar); // Hà Khôi Câu Giảo
    if (k) ki.push("Hà Khôi");

    k = tuHu(Tiet, truc, thisday.daysTotalInLunar);
    if (k) ki.push("Tứ Hư");
    if (k) ki.push("Long Hội");

    k = thienHung(Tiet, truc, thisday.daysTotalInLunar);
    if (k) ki.push("Thiên Hùng");

    k = huyetChi(Tiet, truc, thisday.daysTotalInLunar); // DGTNH ***
    if (k) ki.push("Huyết Chi");
    if (k) ki.push("Hiệp Tỷ");

    k = diaNang(Tiet, thisday.daysTotalInLunar);
    if (k) ki.push("Địa Nang");

    k = quyKi(Tiet, thisday.daysTotalInLunar);
    if (k) ki.push("Quy Kị");

    k = huyetKi(Tiet, thisday.daysTotalInLunar);
    if (k) ki.push("Huyết Kị");

    k = trungNhat(thisday.daysTotalInLunar);
    if (k) ki.push("Trùng Nhật");

    k = phucNhat(Tiet, thisday.daysTotalInLunar);
    if (k) ki.push("Phục Nhật");

    k = trungTang(Tiet, thisday.daysTotalInLunar);
    if (k) ki.push("Trùng Tang");

    k = trungPhuc(Tiet, thisday.daysTotalInLunar);
    if (k) ki.push("Phục Tang");

    k = tamTang(T4, thisday.daysTotalInLunar);
    if (k) ki.push("Tam Tang");

    k = diaTac(Tiet, truc);
    if (k) ki.push("Địa Tặc");

    k = thienOn(Tiet, truc);
    if (k) ki.push("Thiên Ôn");

    k = mocMaSat(Tiet, thisday.daysTotalInLunar);
    if (k) ki.push("Mộc Mã Sát");

    k = giaoLong(Tiet, thisday.daysTotalInLunar); // DGTNH ***
    if (k) ki.push("Giao Long");

    k = nguBatNgo(Tiet, thisday.daysTotalInLunar);
    if (k) ki.push("Ngũ Bất Ngộ");

    k = tamBatPhan(Tiet, thisday.daysTotalInLunar);
    if (k) ki.push("Tam Bất Phản");

    k = lyBiet(Tiet, thisday.daysTotalInLunar);
    if (k) ki.push("Ly Biệt");

    k = xucThuyLong(thisday.daysTotalInLunar);
    if (k) ki.push("Xúc Thủy Long");

    k = truongTinh(thisday.monthLunar, thisday.dayLunar);
    if (k) ki.push("Trường Tinh");

    k = doanTinh(thisday.monthLunar, thisday.dayLunar);
    if (k) ki.push("Đoản Tinh");

    k = tuBietNhat(T4, thisday.daysTotalInLunar); // DGTNH ***
    if (k) ki.push("Tử Biệt");
    if (k) ki.push("Tứ Kích");

    k = trachKhong(T4, thisday.daysTotalInLunar); // DGTNH ***
    if (k) ki.push("Trạch Không");

    k = doDai(T4, thisday.daysTotalInLunar); // DGTNH ***
    if (k) ki.push("Đồ Đãi");

    k = hinhNguc(T4, thisday.daysTotalInLunar); // DGTNH ***
    if (k) ki.push("Hình Ngục");
    if (k) ki.push("Tội Hình");

    k = satSuNhat(T4, thisday.daysTotalInLunar); // 3 ***
    if (k) ki.push("Sát Sư Nhật");

    k = tonSuNhat(Tiet, thisday.daysTotalInLunar); // 3 ***
    if (k) ki.push("Tổn Sư Nhật");

    k = laoNhat(T4, thisday.daysTotalInLunar); // DGTNH ***
    if (k) ki.push("Lao Nhật");

    k = tuHuBai(T4, thisday.daysTotalInLunar);
    if (k) ki.push("Tứ Hư Bại");

    k = phanKich(T4, thisday.daysTotalInLunar); // DGTNH ***
    if (k) ki.push("Phản Kích");

    k = phucThi(T4, thisday.daysTotalInLunar); // DGTNH ***
    if (k) ki.push("Phục Thi");

    k = thienDiaChuyen(T4, thisday.daysTotalInLunar);
    if (k) ki.push("Thiên Địa Chánh Chuyển");

    k = thienDiaChuyenSat(T4, thisday.daysTotalInLunar);
    if (k) ki.push("Thiên Địa Chuyển Sát");

    k = ngucNhat(T4, thisday.daysTotalInLunar); // DGTNH ***
    if (k) ki.push("Ngục Nhật");
    if (k) ki.push("Phân Hài");

    k = nguyetKienChuyenSat(T4, thisday.daysTotalInLunar);
    if (k) ki.push("Nguyệt Kiến Chuyển Sát");
    if (k) ki.push("Thiên Chuyển Địa Chuyển");

    k = phiLiem(Tiet, truc);
    if (k) ki.push("Phi Liêm");
    if (k) ki.push("Đại Sát");

    k = tuThoiDaiMo(T4, thisday.daysTotalInLunar);
    if (k) ki.push("Tứ Thời Đại Mộ");

    k = lucBatThanh(Tiet, truc);
    if (k) ki.push("Lục Bất Thành");

    k = longHo(Tiet, truc); // DGTNH ***
    if (k) ki.push("Long Hổ");

    k = thienDiaTranhHung(Tiet, truc); // DGTNH ***
    if (k) ki.push("Thiên Địa Tranh Hùng");

    k = daiTieuKhoc(Tiet, truc); // FSD ***
    if (k) ki.push("Đại Tiểu Khốc Nhật");

    k = phaBai(Tiet, truc);
    if (k) ki.push("Phá Bại Tinh");

    k = loiCong(Tiet, truc);
    if (k) ki.push("Lôi Công");

    // conflict with 'lục hợp'
    k = voKieu(Tiet, thisday.daysTotalInLunar); // DGTNH ***
    if (k) ki.push("Vô Kiều");

    k = duongThac(Tiet, truc); // DGTNH ***
    if (k) ki.push("Dương Thác");

    k = amThac(Tiet, truc); // DGTNH ***
    if (k) ki.push("Âm Thác");

    k = nguBatQuy(thisday.daysTotalInLunar); // DGTNH ***
    if (k) ki.push("Ngũ Bất Quy");

    k = lyKhoa(thisday.daysTotalInLunar); // DGTNH ***
    if (k) ki.push("Ly Khoa");

    k = thienThuongDaiKV(thisday.daysTotalInLunar); // DGTNH ***
    if (k) ki.push("Thiên Thượng ĐKV");

    k = phanChi(thisday.daysTotalInLunar, thisday.daysTotalInLunar); // DGTNH ***
    if (k) ki.push("Phản Chi");

    k = batToa(Tiet, thisday.daysTotalInLunar); // DGTNH ***
    if (k) ki.push("Bát Tọa");

    k = tangMon(Tiet, thisday.daysTotalInLunar); // DGTNH (phương vị) ***
    if (k) ki.push("Tang Môn");

    k = nguQuy(Tiet, thisday.daysTotalInLunar); // NHK ***
    if (k) ki.push("Ngũ Quỷ");

    k = daoKhamSat(T4, thisday.daysTotalInLunar); // NHK ***
    if (k) ki.push("Đao Khảm Sát");

    k = phuDauSat(T4, thisday.daysTotalInLunar);
    if (k) ki.push("Phủ Đầu Sát");

    k = thoNgan(thisday.daysTotalInLunar, thisday.full); // DGTNH ***
    if (k) ki.push("Thổ Ngân");

    k = dienNgan(thisday.daysTotalInLunar, thisday.full); // DGTNH ***
    if (k) ki.push("Điền Ngân");

    k = thuyNgan(thisday.daysTotalInLunar, thisday.full); // DGTNH ***
    if (k) ki.push("Thủy Ngân");

    k = kimNgan(thisday.daysTotalInLunar, thisday.full); // DGTNH ***
    if (k) ki.push("Kim Ngân");

    k = sonNgan(thisday.daysTotalInLunar, thisday.full); // DGTNH ***
    if (k) ki.push("Sơn Ngân");

    k = thienBinh(Tiet, thisday.days);
    if (k) ki.push("Thiên Binh");

    k = dietMon(thisday.yearLunar, Tiet, thisday.days); // DGTNH ***
    if (k) ki.push("Diệt Môn");

    k = tuPhuongHao(thisday.monthLunar, thisday.daysTotalInLunar); // DGTNH ***
    if (k) ki.push("Tứ Phương Hao");

    k = onNhap(thisday.monthLunar, thisday.daysTotalInLunar); // DGTNH ***
    if (k) ki.push("Ôn Nhập");

    k = onXuat(thisday.monthLunar, thisday.daysTotalInLunar); // DGTNH ***
    if (k) ki.push("Ôn Xuất");

    k = coThan(Tiet, thisday.daysTotalInLunar); // DGTNH ***
    if (k) ki.push("Cô Thần");

    k = quaTu(Tiet, thisday.daysTotalInLunar); // DGTNH ***
    if (k) ki.push("Quả Tú");

    k = diaQua(T4, thisday.daysTotalInLunar); // DGTNH ***
    if (k) ki.push("Địa Quả");

    k = tuQuyBatToa(T4, thisday.daysTotalInLunar); // DGTNH ***
    if (k) ki.push("Tứ Quý Bát Tọa");

    k = toiChi(Tiet, thisday.daysTotalInLunar); // DGTNH ***
    if (k) ki.push("Tội Chí");

    k = keHoan(thisday.daysTotalInLunar); // DGTNH ***
    if (k) ki.push("Kê Hoãn");

    k = thamBenh(thisday.daysTotalInLunar); // DGTNH ***
    if (k) ki.push("Thám Bệnh");

    k = hoanhThienChuTuoc(thisday.dayLunar);
    if (k) ki.push("Hoành Thiên Chu Tước");

    k = chuyenNhat(thisday.daysTotalInLunar); // DGTNH ***
    if (k) ki.push("Chuyên Nhật");

    k = phatNhat(thisday.daysTotalInLunar); // DGTNH ***
    if (k) ki.push("Phạt Nhật");
  }
  return ki;
}
// Hoàng Phiên 黃幡
// bất nghi giá thú, bất khả thủ thổ, khai môn, hưng tạo
/*
嫁娶年凶方 子 丑 寅 卯 辰 巳 午 未 申 酉 戌 亥 
giá thú niên hung phương
太歲 子 丑 寅 卯 辰 巳 午 未 申 酉 戌 亥 thái tuế 
歲破 午 未 申 酉 戌 亥 子 丑 寅 卯 辰 巳 tuế phá 
黃幡 辰 丑 戌 未 辰 丑 戌 未 辰 丑 戌 未 hoàng phiên 
豹尾 戌 未 辰 丑 戌 未 辰 丑 戌 未 辰 丑 báo vĩ 
飛廉 申 酉 戌 巳 午 未 寅 卯 辰 亥 子 丑 phi liêm 
歲厭 子 亥 戌 酉 申 未 午 巳 辰 卯 寅 丑 tuế áp
*/

// bách kị nhật
// giáp bất khai thương, ất bất tài thực, bính bất tu táo, đinh bất thế đầu,
// mậu bất thụ điền, kỷ bất phá khoán, canh bất kinh lạc, tân bất hợp tương,
// nhâm bất quyết thủy, quý bất từ tụng, tử bất vấn bặc, sửu bất quan đái,
// dần bất tế tự, mão bất xuyên tỉnh, thần bất khốc khấp, tị bất viễn hành,
// ngọ bất thiêm cái, vị bất phục dược, thân bất an sàng, dậu bất hội khách,
// tuất bất cật cẩu, hợi bất giá thú
