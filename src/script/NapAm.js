//
// Nạp Âm Ngũ Hành (tương sinh, khắc, đồng ...)
// Author: Harry Tran (a.k.a Thiên Y) in USA (email: thien.y@operamail.com)
//

import { canVi, chiVi } from "./AmLich";

// Lấy Nạp Âm Ngu Hành Vị trí (0-29), a true value
export function napAmVi(can, chi) {
  var na;
  switch (can) {
    case 0:
      switch (chi) {
        case 0:
          na = 0;
          break;
        case 2:
          na = 25;
          break;
        case 4:
          na = 20;
          break;
        case 6:
          na = 15;
          break;
        case 8:
          na = 10;
          break;
        case 10:
          na = 5;
          break;
      }
      break;
    case 1:
      switch (chi) {
        case 1:
          na = 0;
          break;
        case 3:
          na = 25;
          break;
        case 5:
          na = 20;
          break;
        case 7:
          na = 15;
          break;
        case 9:
          na = 10;
          break;
        case 11:
          na = 5;
          break;
      }
      break;
    case 2:
      switch (chi) {
        case 0:
          na = 6;
          break;
        case 2:
          na = 1;
          break;
        case 4:
          na = 26;
          break;
        case 6:
          na = 21;
          break;
        case 8:
          na = 16;
          break;
        case 10:
          na = 11;
          break;
      }
      break;
    case 3:
      switch (chi) {
        case 1:
          na = 6;
          break;
        case 3:
          na = 1;
          break;
        case 5:
          na = 26;
          break;
        case 7:
          na = 21;
          break;
        case 9:
          na = 16;
          break;
        case 11:
          na = 11;
          break;
      }
      break;
    case 4:
      switch (chi) {
        case 0:
          na = 12;
          break;
        case 2:
          na = 7;
          break;
        case 4:
          na = 2;
          break;
        case 6:
          na = 27;
          break;
        case 8:
          na = 22;
          break;
        case 10:
          na = 17;
          break;
      }
      break;
    case 5:
      switch (chi) {
        case 1:
          na = 12;
          break;
        case 3:
          na = 7;
          break;
        case 5:
          na = 2;
          break;
        case 7:
          na = 27;
          break;
        case 9:
          na = 22;
          break;
        case 11:
          na = 17;
          break;
      }
      break;
    case 6:
      switch (chi) {
        case 0:
          na = 18;
          break;
        case 2:
          na = 13;
          break;
        case 4:
          na = 8;
          break;
        case 6:
          na = 3;
          break;
        case 8:
          na = 28;
          break;
        case 10:
          na = 23;
          break;
      }
      break;
    case 7:
      switch (chi) {
        case 1:
          na = 18;
          break;
        case 3:
          na = 13;
          break;
        case 5:
          na = 8;
          break;
        case 7:
          na = 3;
          break;
        case 9:
          na = 28;
          break;
        case 11:
          na = 23;
          break;
      }
      break;
    case 8:
      switch (chi) {
        case 0:
          na = 24;
          break;
        case 2:
          na = 19;
          break;
        case 4:
          na = 14;
          break;
        case 6:
          na = 9;
          break;
        case 8:
          na = 4;
          break;
        case 10:
          na = 29;
          break;
      }
      break;
    case 9:
      switch (chi) {
        case 1:
          na = 24;
          break;
        case 3:
          na = 19;
          break;
        case 5:
          na = 14;
          break;
        case 7:
          na = 9;
          break;
        case 9:
          na = 4;
          break;
        case 11:
          na = 29;
          break;
      }
      break;
  }
  return na;
}

// Nhập Số Nạp Âm và CAN tương ứng; phục hồi can chi
export function napAmCanChi(na, can) {
  var cc = [0, 0];
  switch (na) {
    case 0:
      cc = [0, 0];
      break;
    case 1:
      cc = [2, 2];
      break;
    case 2:
      cc = [4, 4];
      break;
    case 3:
      cc = [6, 6];
      break;
    case 4:
      cc = [8, 8];
      break;
    case 5:
      cc = [0, 10];
      break;
    case 6:
      cc = [2, 0];
      break;
    case 7:
      cc = [4, 2];
      break;
    case 8:
      cc = [6, 4];
      break;
    case 9:
      cc = [8, 6];
      break;
    case 10:
      cc = [0, 8];
      break;
    case 11:
      cc = [2, 10];
      break;
    case 12:
      cc = [4, 0];
      break;
    case 13:
      cc = [6, 2];
      break;
    case 14:
      cc = [8, 4];
      break;
    case 15:
      cc = [0, 6];
      break;
    case 16:
      cc = [2, 8];
      break;
    case 17:
      cc = [4, 10];
      break;
    case 18:
      cc = [6, 0];
      break;
    case 19:
      cc = [8, 2];
      break;
    case 20:
      cc = [0, 4];
      break;
    case 21:
      cc = [2, 6];
      break;
    case 22:
      cc = [4, 8];
      break;
    case 23:
      cc = [6, 10];
      break;
    case 24:
      cc = [8, 0];
      break;
    case 25:
      cc = [0, 2];
      break;
    case 26:
      cc = [2, 4];
      break;
    case 27:
      cc = [4, 6];
      break;
    case 28:
      cc = [6, 8];
      break;
    case 29:
      cc = [8, 10];
      break;
  }
  if (canVi(can) % 2) {
    cc[0] += 1;
    cc[1] += 1;
  }
  return cc;
}

// Lấy Nạp Âm Ngu Hành Vị trí (0-29), a true value
export function layNapAmVi(can, chi) {
  return napAmVi(canVi(can), chiVi(chi));
}

export var napAm5Hanh = [
  "Hải trung Kim",
  "Lô trung Hỏa",
  "Đại lâm Mộc",
  "Lộ bàng Thổ",
  "Kiếm phong Kim",
  "Sơn đầu Hỏa",
  "Giản hạ Thủy",
  "Thành đầu Thổ",
  "Bạch lạp Kim",
  "Dương liễu Mộc",
  "Tuyền trung Thủy",
  "Ốc thượng Thổ",
  "Phích lịch Hỏa",
  "Tùng bách Mộc",
  "Trường lưu Thủy",
  "Sa trung Kim",
  "Sơn hạ Hỏa",
  "Bình địa Mộc",
  "Bích thượng Thổ",
  "Kim bạc Kim",
  "Phúc đăng Hỏa",
  "Thiên hà Thủy",
  "Đại dịch Thổ",
  "Thoa xuyến Kim",
  "Tang chá Mộc",
  "Đại khê Thủy",
  "Sa trung Thổ",
  "Thiên thượng Hỏa",
  "Thạch lựu Mộc",
  "Đại hải Thủy",
];

// Lấy Nạp Âm Ngũ Hành
export function napAm(can, chi) {
  var v = napAmVi(can, chi);
  return napAm5Hanh[v];
}

// Lấy Nạp Âm Ngũ Hành
export function napAmNghiaVi(na) {
  var GiaiNghia = [
    "vàng dưới biển",
    "lửa trong lò",
    "cây rừng lớn",
    "đất bên đường",
    "vàng mũi kiếm",
    "lửa đầu núi",
    "nước dưới khe",
    "đất đầu thành",
    "vàng chân đèn",
    "gổ dương liễu",
    "nước dưới suối",
    "đất trên nóc",
    "lửa sấm sét",
    "gổ cây tùng",
    "nước nguồn chảy",
    "vàng trong cát",
    "lửa dưới núi",
    "cây sát đất",
    "đất trên vách",
    "vàng pha bạc",
    "lửa đèn lồng",
    "nước ngân hà",
    "khu đất rộng",
    "vàng trang sức",
    "gỗ cây dâu",
    "nước khe lớn",
    "đất lẫn cát",
    "lửa trên trời",
    "gỗ thạch lựu",
    "nước biển rộng",
  ];

  return GiaiNghia[na];
}

export function napAmNghia(can, chi) {
  var GiaiNghia = [
    "vàng dưới biển",
    "lửa trong lò",
    "cây rừng lớn",
    "đất bên đường",
    "vàng mũi kiếm",
    "lửa đầu núi",
    "nước dưới khe",
    "đất đầu thành",
    "vàng chân đèn",
    "gổ dương liễu",
    "nước dưới suối",
    "đất trên nóc",
    "lửa sấm sét",
    "gổ cây tùng",
    "nước nguồn chảy",
    "vàng trong cát",
    "lửa dưới núi",
    "cây sát đất",
    "đất trên vách",
    "vàng pha bạc",
    "lửa đèn lồng",
    "nước ngân hà",
    "khu đất rộng",
    "vàng trang sức",
    "gỗ cây dâu",
    "nước khe lớn",
    "đất lẫn cát",
    "lửa trên trời",
    "gỗ thạch lựu",
    "nước biển rộng",
  ];

  var v = napAmVi(can, chi);
  return napAmNghiaVi(v);
}

export function napAmHanh(NA) {
  var hanh = 0;
  switch (NA) {
    case 2: // Đại lâm Mộc
    case 9: // Dương liễu Mộc
    case 13: // Tùng bách Mộc
    case 17: // Bình địa Mộc
    case 24: // Tang thác Mộc
    case 28: // Thạch lựu Mộc
      hanh = 0;
      break;
    case 1: // Lô trung Hỏa
    case 5: // Sơn đầu Hỏa
    case 12: // Phích lịch Hỏa
    case 20: // Phúc đăng Hỏa
    case 16: // Sơn hạ Hỏa
    case 27: // Thiên thượng Hỏa
      hanh = 1;
      break;
    case 3: // Lộ Bàng Thổ
    case 7: // Thành đầu Thổ
    case 11: // Ốc thuợng Thổ
    case 18: // Bích thuợng Thổ
    case 22: // Đại dịch Thổ
    case 26: // Sa trung Thổ
      hanh = 2;
      break;
    case 0: // Hải trung Kim
    case 4: // Kiếm phong Kim
    case 8: // Bạch lạp Kim
    case 15: // Sa trung Kim
    case 19: // Kim bạc Kim
    case 23: // Sai xuyến Kim
      hanh = 3;
      break;
    case 6: // Giản hạ Thủy
    case 10: // Tuyền trung Thủy
    case 14: // Truờng lưu Thủy
    case 21: // Thiên hà Thủy
    case 25: // Đại khê Thủy
    case 29: // Đại hải Thủy
      hanh = 4;
      break;
  }
  return hanh;
}

// Lấy Chánh 5 Hành bằng Cách Nạp Âm
export function hanhVi(can, chi) {
  var v = napAmVi(can, chi);
  return napAmHanh(v);
}

export function chanh5Hanh(can, chi) {
  return HANH[hanhVi(canVi(can), chiVi(chi))];
}

// So Sánh Nạp Âm sau khi gọi napAmVi()
export function soNapAm(n1, n2) {
  var k = 0;
  switch (n1) {
    case 0:
      if (n2 == 27 || n2 == 9) k = 1;
      break; // Hải trung Kim kỵ Thiên thượng Hỏa & Dương liễu Mộc
    case 1:
      if (n2 == 28 || n2 == 4) k = 1;
      break; // Lô trung Hỏa kỵ Thạch lựu Mộc & Kiếm phong Kim
    case 2:
      if (n2 == 29 || n2 == 11) k = 1;
      break; // Đại lâm Mộc kỵ Đại hải Thủy & Ốc thượng Thổ
    case 3:
      if (n2 == 0 || n2 == 6) k = 1;
      break; // Lộ Bàng Thổ kỵ Hải trung Kim & Giản Hạ Thủy
    case 4:
      if (n2 == 1 || n2 == 13) k = 1;
      break; // Kiếm phong Kim kỵ Lô trung Hỏa & Tùng bách Mộc
    case 5:
      if (n2 == 2 || n2 == 8) k = 1;
      break; // Sơn đầu Hỏa kỵ Đại lâm Mộc & Bạch lạp Kim
    case 6:
      if (n2 == 3 || n2 == 27) k = 1;
      break; // Giản hạ Thủy kỵ Lộ bàng Thổ & Thiên thượng Hỏa
    case 7:
      if (n2 == 4 || n2 == 10) k = 1;
      break; // Thành đầu Thổ kỵ Kiếm phong Kim & Tuyền trung Thủy
    case 8:
      if (n2 == 5 || n2 == 17) k = 1;
      break; // Bạch lạp Kim kỵ Sơn đầu Hỏa & Bình địa Mộc
    case 9:
      if (n2 == 6 || n2 == 18) k = 1;
      break; // Dương liễu Mộc kỵ Giản hạ Thủy & Bích thượng Thổ
    case 10:
      if (n2 == 7 || n2 == 1) k = 1;
      break; // Tuyền trung Thủy kỵ Thành đầu Thổ & Lô trung Hỏa
    case 11:
      if (n2 == 8 || n2 == 14) k = 1;
      break; // Ốc thượng Thổ kỵ Bạch lạp Kim & Trường lưu Thủy
    case 12:
      if (n2 == 9 || n2 == 15) k = 1;
      break; // Phích lịch Hỏa kỵ Dương liễu Mộc & Sa trung Kim
    case 13:
      if (n2 == 10 || n2 == 22) k = 1;
      break; // Tùng bách Mộc kỵ Tuyền trung Thủy & Đại dịch Thổ
    case 14:
      if (n2 == 11 || n2 == 5) k = 1;
      break; // Trường lưu Thủy kỵ Ốc thượng Thổ & Sơn đầu Hỏa
    case 15:
      if (n2 == 12 || n2 == 24) k = 1;
      break; // Sa trung Kim kỵ Phích lịch Hỏa & Tang chá Mộc
    case 16:
      if (n2 == 13 || n2 == 19) k = 1;
      break; // Sơn hạ Hỏa kỵ Tùng bách Mộc & Kim bạc Kim
    case 17:
      if (n2 == 14 || n2 == 15) k = 1;
      break; // Bình địa Mộc kỵ Trường lưu Thủy & Sa trung Kim
    case 18:
      if (n2 == 15 || n2 == 21) k = 1;
      break; // Bích thượng Thổ kỵ Sa trung Kim & Thiên hà Thủy
    case 19:
      if (n2 == 16 || n2 == 28) k = 1;
      break; // Kim bạc Kim kỵ Sơn hạ Hỏa & Thạch lựu Mộc
    case 20:
      if (n2 == 17 || n2 == 23) k = 1;
      break; // Phúc đăng Hỏa kỵ Bình địa Mộc & Thoa xuyến Kim
    case 21:
      if (n2 == 18 || n2 == 12) k = 1;
      break; // Thiên hà Thủy kỵ Bích thượng Thổ & Phích lịch Hỏa
    case 22:
      if (n2 == 19 || n2 == 25) k = 1;
      break; // Đại dịch Thổ kỵ Kim bạc Kim & Đại khê Thủy
    case 23:
      if (n2 == 20 || n2 == 2) k = 1;
      break; // Sai xuyến Kim kỵ Phúc đăng Hỏa & Đại lâm Mộc
    case 24:
      if (n2 == 21 || n2 == 3) k = 1;
      break; // Tang thác Mộc kỵ Thiên hà Thủy & Lộ Bàng Thổ
    case 25:
      if (n2 == 22 || n2 == 16) k = 1;
      break; // Đại khê Thủy kỵ Đại dịch Thổ & Sơn hạ Hỏa
    case 26:
      if (n2 == 23 || n2 == 29) k = 1;
      break; // Sa trung Thổ kỵ Thoa xuyến Kim & Đại hải Thủy
    case 27:
      if (n2 == 24 || n2 == 0) k = 1;
      break; // Thiên thượng Hỏa kỵ Tang chá Mộc & Hải trung Kim
    case 28:
      if (n2 == 25 || n2 == 7) k = 1;
      break; // Thạch lựu Mộc kỵ Đại khê Thủy & Thành đầu Thổ
    case 29:
      if (n2 == 26 || n2 == 20) k = 1;
      break; // Đại hải Thủy kỵ Sa trung Thổ & Phúc đăng Hỏa
  }
  return k;
}

// Nạp Âm kị tuổi, sau khi gọi napAmVi()
export function napAmKiTuoi(na) {
  var k = [0, 0];
  switch (na) {
    case 0:
      k = [27, 9];
      break; // Hải trung Kim kỵ Thiên thượng Hỏa & Dương liễu Mộc
    case 1:
      k = [28, 4];
      break; // Lô trung Hỏa kỵ Thạch lựu Mộc & Kiếm phong Kim
    case 2:
      k = [29, 11];
      break; // Đại lâm Mộc kỵ Đại hải Thủy & Ốc thượng Thổ
    case 3:
      k = [0, 6];
      break; // Lộ Bàng Thổ kỵ Hải trung Kim & Giản Hạ Thủy
    case 4:
      k = [1, 13];
      break; // Kiếm phong Kim kỵ Lô trung Hỏa & Tùng bách Mộc
    case 5:
      k = [2, 8];
      break; // Sơn đầu Hỏa kỵ Đại lâm Mộc & Bạch lạp Kim
    case 6:
      k = [3, 27];
      break; // Giản hạ Thủy kỵ Lộ bàng Thổ & Thiên thượng Hỏa
    case 7:
      k = [4, 10];
      break; // Thành đầu Thổ kỵ Kiếm phong Kim & Tuyền trung Thủy
    case 8:
      k = [5, 17];
      break; // Bạch lạp Kim kỵ Sơn đầu Hỏa & Bình địa Mộc
    case 9:
      k = [6, 18];
      break; // Dương liễu Mộc kỵ Giản hạ Thủy & Bích thượng Thổ
    case 10:
      k = [7, 1];
      break; // Tuyền trung Thủy kỵ Thành đầu Thổ & Lô trung Hỏa
    case 11:
      k = [8, 14];
      break; // Ốc thượng Thổ kỵ Bạch lạp Kim & Trường lưu Thủy
    case 12:
      k = [9, 15];
      break; // Phích lịch Hỏa kỵ Dương liễu Mộc & Sa trung Kim
    case 13:
      k = [10, 22];
      break; // Tùng bách Mộc kỵ Tuyền trung Thủy & Đại dịch Thổ
    case 14:
      k = [11, 5];
      break; // Trường lưu Thủy kỵ Ốc thượng Thổ & Sơn đầu Hỏa
    case 15:
      k = [12, 24];
      break; // Sa trung Kim kỵ Phích lịch Hỏa & Tang thác Mộc
    case 16:
      k = [13, 19];
      break; // Sơn hạ Hỏa kỵ Tùng bách Mộc & Kim bạc Kim
    case 17:
      k = [14, 15];
      break; // Bình địa Mộc kỵ Trường lưu Thủy & Sa trung Kim
    case 18:
      k = [15, 21];
      break; // Bích thượng Thổ kỵ Sa trung Kim & Thiên hà Thủy
    case 19:
      k = [16, 28];
      break; // Kim bạc Kim kỵ Sơn hạ Hỏa & Thạch lựu Mộc
    case 20:
      k = [17, 23];
      break; // Phúc đăng Hỏa kỵ Bình địa Mộc & Sai xuyến Kim
    case 21:
      k = [18, 12];
      break; // Thiên hà Thủy kỵ Bích thượng Thổ & Phích lịch Hỏa
    case 22:
      k = [19, 25];
      break; // Đại dịch Thổ kỵ Kim bạc Kim & Đại khê Thủy
    case 23:
      k = [20, 2];
      break; // Sai xuyến Kim kỵ Phúc đăng Hỏa & Đại lâm Mộc
    case 24:
      k = [21, 3];
      break; // Tang thác Mộc kỵ Thiên hà Thủy & Lộ Bàng Thổ
    case 25:
      k = [22, 16];
      break; // Đại khê Thủy kỵ Đại dịch Thổ & Sơn hạ Hỏa
    case 26:
      k = [23, 29];
      break; // Sa trung Thổ kỵ Sai xuyến Kim & Đại hải Thủy (*)
    case 27:
      k = [24, 0];
      break; // Thiên thượng Hỏa kỵ Tang thác Mộc & Hải trung Kim
    case 28:
      k = [25, 7];
      break; // Thạch lựu Mộc kỵ Đại khê Thủy & Thành đầu Thổ
    case 29:
      k = [26, 20];
      break; // Đại hải Thủy kỵ Sa trung Thổ & Phúc đăng Hỏa
  }
  return k;
}

// So Nạp Âm Mộc & Thổ; return -1: không có gì, 0: hạp; 1: khắc
export function napAmMocTho(n1, n2) {
  var k = 0;
  switch (n1) {
    case 2: // Đại lâm Mộc
    case 9: // Dương liễu Mộc
    case 13: // Tùng bách Mộc
    case 17: // Bình địa Mộc
    case 24: // Tang thác Mộc
    case 28: // Thạch lựu Mộc
      break;
    default:
      k = -1;
      break;
  }
  if (k < 0) return k;
  switch (n2) {
    case 7: // Thành đầu Thổ
    case 11: // Ốc thượng Thổ
    case 18: // Bích thượng Thổ
      k = 1;
      break;
    case 3: // Lộ Bàng Thổ
    case 22: // Đại dịch Thổ
    case 26: // Sa trung Thổ
      k = 0;
      break; // không bị khắc mà còn được lợi
    default:
      k = -1;
      break;
  }
  return k;
}

export function napAmMocHop(NA) {
  var h = [];
  var k = 0;
  switch (NA) {
    case 2: // Đại lâm Mộc
    case 9: // Dương liễu Mộc
    case 13: // Tùng bách Mộc
    case 17: // Bình địa Mộc
    case 24: // Tang chá Mộc
    case 28: // Thạch lựu Mộc
      break;
    default:
      k = -1;
      break;
  }
  if (!k) h = [3, 22, 26]; // Lộ Bàng Thổ, Đại dịch Thổ, và Sa trung Thổ
  /*
  Thành đầu, Ốc thượng dữ Bích thượng,
  Tam thổ nguyên lai phạ Mộc xung.
  Ngoại hữu tam ban bất phạ Mộc,
  Nhất sanh thanh quý bộ thiềm cung. [ bước lên trăng ]
  - Thành đầu Thổ, Ốc thượng Thổ và Bích thượng Thổ vốn sợ Mộc khắc. 
  - Lộ bàng Thổ, Đại dịch Thổ và Sa trung Thổ đều không sợ Mộc.
  */
  return h;
}

// So Nạp Âm Thủy & Hỏa; return -1: không có gì, 0: hạp; 1: khắc
export function napAmThuyHoa(n1, n2) {
  var k = 0;
  switch (n1) {
    case 6: // Giản hạ Thủy
    case 10: // Tuyền trung Thủy
    case 14: // Trường lưu Thủy
    case 21: // Thiên hà Thủy
    case 25: // Đại khê Thủy
    case 29: // Đại hải Thủy
      break;
    default:
      k = -1;
      break;
  }
  if (k < 0) return k;
  switch (n2) {
    case 1: // Lô trung Hỏa
    case 5: // Sơn đầu Hỏa
    case 20: // Phúc đăng Hỏa
      k = 1;
      break;
    case 12: // Phích lịch Hỏa
    case 16: // Sơn hạ Hỏa
    case 27: // Thiên thượng Hỏa
      k = 0;
      break; // không bị khắc mà còn được lợi
    default:
      k = -1;
      break;
  }
  return k;
}

export function napAmThuyHop(NA) {
  var h = [];
  var k = 0;
  switch (NA) {
    case 6: // Giản hạ Thủy
    case 10: // Tuyền trung Thủy
    case 14: // Trường lưu Thủy
    case 21: // Thiên hà Thủy
    case 25: // Đại khê Thủy
    case 29: // Đại hải Thủy
      break;
    default:
      k = -1;
      break;
  }
  if (!k) h = [12, 16, 27]; // Phích lịch Hỏa, Sơn hạ Hỏa, và Thiên thượng Hỏa
  /*
  Phú đăng, Lư Hỏa dữ Sơn đầu,
  Tam giả nguyên lai phạ thủy lưu.
  Ngoại hữu tam ban bất phạ thủy,
  Nhất sanh y lộc cận Vương hầu.
  - Phú đăng Hỏa, Lư trung Hỏa và Sơn đầu Hỏa đều sợ Thủy khắc. 
  - 3 Hỏa kia: Thiên thượng Hỏa, Phích lịch Hỏa, Sơn hạ Hỏa lại không sợ Thủy
  */
  return h;
}

// So Nạp Âm Thổ & Thủy; return -1: không có gì, 0: hạp; 1: khắc
export function napAmThoThuy(n1, n2) {
  var k = 0;
  switch (n1) {
    case 3: // Lộ Bàng Thổ
    case 7: // Thành đầu Thổ
    case 11: // Ốc thượng Thổ
    case 18: // Bích thượng Thổ
    case 22: // Đại dịch Thổ
    case 26: // Sa trung Thổ
      break;
    default:
      k = -1;
      break;
  }
  if (k < 0) return k;
  switch (n2) {
    case 6: // Giản hạ Thủy
    case 10: // Tuyền trung Thủy
    case 14: // Trường lưu Thủy
    case 25: // Đại khê Thủy
      k = 1;
      break;
    case 21: // Thiên hà Thủy
    case 29: // Đại hải Thủy
      k = 0;
      break; // không bị khắc mà còn được lợi
    default:
      k = -1;
      break;
  }
  return k;
}

export function napAmThoHop(NA) {
  var h = [];
  var k = 0;
  switch (NA) {
    case 3: // Lộ Bàng Thổ
    case 7: // Thành đầu Thổ
    case 11: // Ốc thượng Thổ
    case 18: // Bích thượng Thổ
    case 22: // Đại dịch Thổ
    case 26: // Sa trung Thổ
      break;
    default:
      k = -1;
      break;
  }
  if (!k) h = [21, 29]; // Thiên hà Thủy & Đại hải Thủy
  /*
  Thủy kiến Thiên hà Đại hải lưu,
  Nhị giả bất phạ thổ vi cừu.
  Ngoại hữu tứ ban tu kỵ thổ,
  Nhất sanh y lộc tất nan cầu.
  */

  return h;
}

// So Nạp Âm Hỏa & Kim; return -1: không có gì, 0: hạp; 1: khắc
export function napAmHoaKim(n1, n2) {
  var k = 0;
  switch (n1) {
    case 1: // Lô trung Hỏa
    case 5: // Sơn đầu Hỏa
    case 12: // Phích lịch Hỏa
    case 20: // Phúc đăng Hỏa
    case 16: // Sơn hạ Hỏa
    case 27: // Thiên thượng Hỏa
      break;
    default:
      k = -1;
      break;
  }
  if (k < 0) return k;
  switch (n2) {
    case 0: // Hải trung Kim
    case 8: // Bạch lạp Kim
    case 19: // Kim bạc Kim
    case 23: // Thoa xuyến Kim
      k = 1;
      break;
    case 4: // Kiếm phong Kim
    case 15: // Sa trung Kim
      k = 0;
      break; // không bị khắc mà còn được lợi
    default:
      k = -1;
      break;
  }
  return k;
}

export function napAmHoaHop(NA) {
  var h = [];
  var k = 0;
  switch (NA) {
    case 1: // Lô trung Hỏa
    case 5: // Sơn đầu Hỏa
    case 12: // Phích lịch Hỏa
    case 20: // Phúc đăng Hỏa
    case 16: // Sơn hạ Hỏa
    case 27: // Thiên thượng Hỏa
      break;
    default:
      k = -1;
      break;
  }
  if (!k) h = [4, 15]; // Kiếm phong Kim & Sa trung Kim
  /*
  Sa trung Kiếm phong lưỡng ban cầm (cầm = Kim)
  Nhược cư Chấn địa (Mộc) tiện tương xâm.
  Ngoại hữu tứ kim tu kỵ Hỏa,
  Kiếm Sa vô Hỏa bất thành hình.
  */
  return h;
}

// So Nạp Âm Kim & Mộc; return -1: không có gì, 0: hạp; 1: khắc
export function napAmKimMoc(n1, n2) {
  var k = 0;
  switch (n1) {
    case 0: // Hải trung Kim
    case 4: // Kiếm phong Kim
    case 8: // Bạch lạp Kim
    case 15: // Sa trung Kim
    case 19: // Kim bạc Kim
    case 23: // Sai xuyến Kim
      break;
    default:
      k = -1;
      break;
  }
  if (k < 0) return k;
  switch (n2) {
    case 2: // Đại lâm Mộc
    case 9: // Dương liễu Mộc
    case 13: // Tùng bách Mộc
    case 24: // Tang thác Mộc
    case 28: // Thạch lựu Mộc
      k = 1;
      break;
    case 17: // Bình địa Mộc
      k = 0;
      break; // không bị khắc mà còn được lợi
    default:
      k = -1;
      break;
  }
  return k;
}

export function napAmKimHop(NA) {
  var h = [];
  var k = 0;
  switch (NA) {
    case 0: // Hải trung Kim
    case 4: // Kiếm phong Kim
    case 8: // Bạch lạp Kim
    case 15: // Sa trung Kim
    case 19: // Kim bạc Kim
    case 23: // Thoa xuyến Kim
      break;
    default:
      k = -1;
      break;
  }
  if (!k) h[0] = 17; // Bình địa Mộc
  /*
  Tòng bá Dương Liễu Tang chá Mộc,
  Thạch lựu Đại lâm kỵ kim đao.
  Duy hữu thản nhiên Bình địa Mộc
  Vô kim bất đắc thượng thanh vân.
  */

  return h;
}

export function napAmHop(NA) {
  var H = napAmHanh(NA);
  var ht; // hợp tuổi
  switch (H) {
    case 0:
      ht = napAmMocHop(NA);
      break;
    case 1:
      ht = napAmHoaHop(NA);
      break;
    case 2:
      ht = napAmThoHop(NA);
      break;
    case 3:
      ht = napAmKimHop(NA);
      break;
    case 4:
      ht = napAmThuyHop(NA);
      break;
  }
  return ht;
}

export function napAmHopCC(can, chi) {
  var NA = napAmVi(can, chi);
  var H = napAmHanh(NA);
  var ht; // hợp tuổi
  switch (H) {
    case 0:
      ht = napAmMocHop(NA);
      break;
    case 1:
      ht = napAmHoaHop(NA);
      break;
    case 2:
      ht = napAmThoHop(NA);
      break;
    case 3:
      ht = napAmKimHop(NA);
      break;
    case 4:
      ht = napAmThuyHop(NA);
      break;
  }
  return ht;
}

export function napAmCanXung(can) {
  var x = 0;
  x = can + 4;
  if (x > 9) x -= 10;
  return x;
}

// Nạp Âm Hành Khắc
export function napAmHanhKhac(can, chi) {
  var NA = napAmVi(can, chi);
  var H = napAmHanh(NA);
  var K = H + 2;
  if (K > 4) K -= 5;
  return [H, K];
}
