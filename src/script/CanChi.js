//
// Can Chi, Ngũ Hành (tương sinh, khắc, đồng ...)
// Author: Harry Tran (a.k.a Thiên Y) in USA (email: thien.y@operamail.com)
//

import { canVi, chiVi } from "./AmLich";
import { CAN, CHI } from "./Constant";

export var CanHanh = [
  "Mộc",
  "Mộc",
  "Hỏa",
  "Hỏa",
  "Thổ",
  "Thổ",
  "Kim",
  "Kim",
  "Thủy",
  "Thủy",
];
export var ChiHanh = [
  "Thủy",
  "Thổ",
  "Mộc",
  "Mộc",
  "Thổ",
  "Hỏa",
  "Hỏa",
  "Thổ",
  "Kim",
  "Kim",
  "Thổ",
  "Thủy",
];
export var HANH = ["Mộc", "Hỏa", "Thổ", "Kim", "Thủy"];
export var TUONG = ["Đồng", "Sinh", "Khắc"];

// Return 0: err, 1: đồng, 2: sinh, 3: khắc
export function so5Hanh(h1, h2) {
  var ss = 0;
  switch (h1) {
    case 0: // Mộc
      switch (h2) {
        case 0:
          ss = 1;
          break; // Tương Đồng
        case 1:
        case 4:
          ss = 2;
          break; // Tương Sinh
        default:
          ss = 3;
          break; // Tương Khắc
      }
      break;
    case 1: // Hỏa
      switch (h2) {
        case 1:
          ss = 1;
          break; // Tương Đồng
        case 0:
        case 2:
          ss = 2;
          break; // Tương Sinh
        default:
          ss = 3;
          break; // Tương Khắc
      }
      break;
    case 2: // Thổ
      switch (h2) {
        case 2:
          ss = 1;
          break; // Tương Đồng
        case 1:
        case 3:
          ss = 2;
          break; // Tương Sinh
        default:
          ss = 3;
          break; // Tương Khắc
      }
      break;
    case 3: // Kim
      switch (h2) {
        case 3:
          ss = 1;
          break; // Tương Đồng
        case 2:
        case 4:
          ss = 2;
          break; // Tương Sinh
        default:
          ss = 3;
          break; // Tương Khắc
      }
      break;
    case 4: // Thủy
      switch (h2) {
        case 4:
          ss = 1;
          break; // Tương Đồng
        case 0:
        case 3:
          ss = 2;
          break; // Tương Sinh
        default:
          ss = 3;
          break; // Tương Khắc
      }
      break;
  }
  return ss;
}

// Return 0: err,
// 1: can chi tương đồng,
// 2: can sinh chi, 3: chi sinh can,
// 4: can khắc chi, 5: chi khắc can
export function so5CanChi(h1, h2) {
  var ss = 0;
  switch (h1) {
    case 0: // Mộc
      switch (h2) {
        case 0:
          ss = 1;
          break; // Tương Đồng (Tỷ hòa)
        case 1:
          ss = 2;
          break; // Can Sinh Chi
        case 2:
          ss = 4;
          break; // Can khắc Chi
        case 3:
          ss = 5;
          break; // Chi khắc Can
        case 4:
          ss = 3;
          break; // Chi Sinh Can
      }
      break;
    case 1: // Hỏa
      switch (h2) {
        case 0:
          ss = 3;
          break; // Chi Sinh Can
        case 1:
          ss = 1;
          break; // Tương Đồng (Tỷ hòa)
        case 2:
          ss = 2;
          break; // Can Sinh Chi
        case 3:
          ss = 4;
          break; // Can khắc Chi
        case 4:
          ss = 5;
          break; // Chi khắc Can
      }
      break;
    case 2: // Thổ
      switch (h2) {
        case 0:
          ss = 5;
          break; // Chi khắc Can
        case 1:
          ss = 3;
          break; // Chi Sinh Can
        case 2:
          ss = 1;
          break; // Tương Đồng (Tỷ hòa)
        case 3:
          ss = 2;
          break; // Can Sinh Chi
        case 4:
          ss = 4;
          break; // Can khắc Chi
      }
      break;
    case 3: // Kim
      switch (h2) {
        case 0:
          ss = 4;
          break; // Can khắc Chi
        case 1:
          ss = 5;
          break; // Chi khắc Can
        case 2:
          ss = 3;
          break; // Chi Sinh Can
        case 3:
          ss = 1;
          break; // Tương Đồng (Tỷ hòa)
        case 4:
          ss = 2;
          break; // Can Sinh Chi
      }
      break;
    case 4: // Thủy
      switch (h2) {
        case 0:
          ss = 2;
          break; // Can Sinh Chi
        case 1:
          ss = 4;
          break; // Can khắc Chi
        case 2:
          ss = 5;
          break; // Chi khắc Can
        case 3:
          ss = 3;
          break; // Chi Sinh Can
        case 4:
          ss = 1;
          break; // Tương Đồng (Tỷ hòa)
      }
      break;
  }
  return ss;
}

export function hanhKhi(hanh) {
  var i;
  for (i = 0; i < HANH.length; i++) if (hanh == HANH[i]) break;
  return i;
}

export function layHanh(cc) {
  var c = canVi(cc);
  if (c == CAN.length) {
    c = chiVi(cc);
    if (c == CHI.length) return "";
    return ChiHanh[c];
  } else return CanHanh[c];
}

// So sánh 2 Thiên Can
export function soCan(can1, can2) {
  var c1 = canVi(can1);
  var c2 = canVi(can2);
  if (c1 >= CAN.length || c2 >= CAN.length) return 0;

  var k1 = hanhKhi(CanHanh[c1]);
  var k2 = hanhKhi(CanHanh[c2]);

  return so5Hanh(k1, k2);
}

export function soCanVi(c1, c2) {
  if (c1 >= CAN.length || c2 >= CAN.length) return 0;

  var k1 = hanhKhi(CanHanh[c1]);
  var k2 = hanhKhi(CanHanh[c2]);

  return so5Hanh(k1, k2);
}

// Nhập CAN, phản hồi 2 can tương khắc
export function canKhac(can) {
  var c = canVi(can);
  var k = [0, 0];
  //   0      1      2      3      4      5      6      7       8       9
  // "Mộc", "Mộc", "Hỏa", "Hỏa", "Thổ", "Thổ", "Kim", "Kim", "Thủy", "Thủy"
  switch (c) {
    case 0:
    case 1:
      k = [6, 4];
      break;
    case 2:
    case 3:
      k = [8, 6];
      break;
    case 4:
    case 5:
      k = [0, 8];
      break;
    case 6:
    case 7:
      k = [2, 0];
      break;
    case 8:
    case 9:
      k = [4, 2];
      break;
  }
  if (c % 2 == 1) {
    k[0] += 1;
    k[1] += 1;
  }
  return k;
}

// So sánh 2 Địa Chi
export function soChi(chi1, chi2) {
  var c1 = chiVi(chi1);
  var c2 = chiVi(chi2);
  if (c1 >= CHI.length || c2 >= CHI.length) return 0;

  var k1 = hanhKhi(ChiHanh[c1]);
  var k2 = hanhKhi(ChiHanh[c2]);

  return so5Hanh(k1, k2);
}

export function soChiVi(c1, c2) {
  if (c1 >= CHI.length || c2 >= CHI.length) return 0;

  var k1 = hanhKhi(ChiHanh[c1]);
  var k2 = hanhKhi(ChiHanh[c2]);

  return so5Hanh(k1, k2);
}

// Nhập CHI, phục hồi 2 hành tương khắc
/*
export function chiHanhKhac(chi)
{
  var c = chiVi(chi);
  var k = [0,0];
  //   0      1      2      3      4      5      6      7       8       9
  // "Mộc", "Mộc", "Hỏa", "Hỏa", "Thổ", "Thổ", "Kim", "Kim", "Thủy", "Thủy"
  switch(c) {
  case 0: case 11: k = [6,4]; break;
  }
  if ((c%2)==1)
  {
    k[0] += 1; k[1] += 1;
  }
  return k;
}
*/

// Return 0: err,
// 1: can chi tương đồng,
// 2: can sinh chi, 3: chi sinh can,
// 4: can khắc chi, 5: chi khắc can
export function soCanChi(can, chi) {
  var c1 = canVi(can);
  var c2 = chiVi(chi);
  if (c1 >= CAN.length || c2 >= CHI.length) return 0;

  var k1 = hanhKhi(CanHanh[c1]);
  var k2 = hanhKhi(ChiHanh[c2]);

  return so5CanChi(k1, k2);
}

export function soCanChiVi(can, chi) {
  if (can >= CAN.length || chi >= CHI.length) return 0;

  var k1 = hanhKhi(CanHanh[can]);
  var k2 = hanhKhi(ChiHanh[chi]);

  return so5CanChi(k1, k2);
}

// Khí Vị
var KHIVI = ["Vượng", "Tướng", "Hưu", "Tù", "Tử"];

// Xét Khí (giữ 2 Khí: Chủ và Khách), return KHÍ VỊ (KHIKHI)
export function xetKhi(k1, k2) {
  var k = 0; // Khí: Vượng, Tướng, Hưu, Tù, Tử
  switch (k1) {
    case 0: // Mộc
      switch (k2) {
        case 0: // Mộc
          k = 0;
          break; // Chủ khách Tỷ Hòa: Vượng khí
        case 1: // Hỏa
          k = 1;
          break; // Mộc sinh Hỏa, chủ sinh khách: Tướng khí
        case 2: // Thổ
          k = 4;
          break; // Mộc khắc Thổ, chủ khắc khách: Tử khí
        case 3: // Kim
          k = 3;
          break; // Kim khắc Mộc, khách khắc chủ: Tù khí
        case 4: // Thủy
          k = 2;
          break; // Thủy sinh Mộc, khách sinh chủ: Hưu khí
      }
      break;
    case 1: // Hỏa
      switch (k2) {
        case 0: // Mộc
          k = 2;
          break; // Mộc sinh Hỏa, khách sinh chủ: Hưu khí
        case 1: // Hỏa
          k = 0;
          break; // Chủ khách Tỷ Hòa: Vượng khí
        case 2: // Thổ
          k = 1;
          break; // Hỏa sinh Thổ, chủ sinh khách: Tướng khí
        case 3: // Kim
          k = 4;
          break; // Hỏa khắc Kim, chủ khắc khách: Tử khí
        case 4: // Thủy
          k = 3;
          break; // Thủy khắc Hỏa, khách khắc chủ: Tù khí
      }
      break;
    case 2: // Thổ
      switch (k2) {
        case 0: // Mộc
          k = 3;
          break; // Mộc khắc Thổ, khách khắc chủ: Tù khí
        case 1: // Hỏa
          k = 2;
          break; // Hỏa sinh Thổ, khách sinh chủ: Hưu khí
        case 2: // Thổ
          k = 0;
          break; // Chủ khách Tỷ Hòa: Vượng khí
        case 3: // Kim
          k = 1;
          break; // Thổ sinh Kim, chủ sinh khách: Tướng khí
        case 4: // Thủy
          k = 4;
          break; // Thổ khắc Thủy, chủ khắc khách: Tử khí
      }
      break;
    case 3: // Kim
      switch (k2) {
        case 0: // Mộc
          k = 4;
          break; // Kim khắc Mộc, chủ khắc khách: Tử khí
        case 1: // Hỏa
          k = 3;
          break; // Hỏa khắc Kim, khách khắc chủ: Tù khí
        case 2: // Thổ
          k = 2;
          break; // Thổ sinh Kim, khách sinh chủ: Hưu khí
        case 3: // Kim
          k = 0;
          break; // Chủ khách Tỷ Hòa: Vượng khí
        case 4: // Thủy
          k = 1;
          break; // Kim sinh Thủy, chủ sinh khách: Tướng khí
      }
      break;
    case 4: // Thủy
      switch (k2) {
        case 0: // Mộc
          k = 1;
          break; // Thủy sinh Mộc, chủ sinh khách: Tướng khí
        case 1: // Hỏa
          k = 4;
          break; // Thủy khắc Hỏa, chủ khắc khách: Tử khí
        case 2: // Thổ
          k = 3;
          break; // Thổ khắc Thủy, khách khắc chủ: Tù khí
        case 3: // Kim
          k = 2;
          break; // Kim sinh Thủy, khách sinh chủ: Hưu khí
        case 4: // Thủy
          k = 0;
          break; // Chủ khách Tỷ Hòa: Vượng khí
      }
      break;
  }
  return k;
}

// Áp Dụng lấy biệt số; nếu âm đổi lại dương
export function bietSo(s1, s2) {
  var t = s1 - s2;
  if (t < 0) t = -t;
  return t;
}

// Thiên Can Ngũ hợp
export function canHop(can1, can2) {
  var c1 = canVi(can1);
  var c2 = canVi(can2);
  if (c1 >= CAN.length || c2 >= CAN.length) return 0;

  var h = 0;
  var t = bietSo(c1, c2);
  if (t == 5) h = 1;
  return h;
}

// Thiên Can Ngũ hợp hóa khí, return (HanhVi+1), 0: không hóa
export function canHoa(can1, can2) {
  var c1 = canVi(can1);
  var c2 = canVi(can2);
  if (c1 >= CAN.length || c2 >= CAN.length) return 0;

  var h = 0;
  /*
  switch(c1)
  {
  case 0: if (c2 == 5) h = 3; break; // Giáp + Kỷ = Thổ
  case 1: if (c2 == 6) h = 4; break; // Ất + Canh = Kim
  case 2: if (c2 == 7) h = 5; break; // Bính + Tân = Thủy
  case 3: if (c2 == 8) h = 1; break; // Đinh + Nhâm = Mộc
  case 4: if (c2 == 9) h = 2; break; // Mậu + Quý = Hỏa
  case 5: if (c2 == 0) h = 3; break; // Giáp + Kỷ = Thổ
  case 6: if (c2 == 1) h = 4; break; // Ất + Canh = Kim
  case 7: if (c2 == 2) h = 5; break; // Bính + Tân = Thủy
  case 8: if (c2 == 3) h = 1; break; // Đinh + Nhâm = Mộc
  case 9: if (c2 == 4) h = 2; break; // Mậu + Quý = Hỏa
  }
  */
  var t = bietSo(c1, c2);
  if (t == 5) h = 1;
  if (h) {
    // Hợp hóa Khí
    switch (c1) {
      case 0:
      case 5:
        h = 3;
        break;
      case 1:
      case 6:
        h = 4;
        break;
      case 2:
      case 7:
        h = 5;
        break;
      case 3:
      case 8:
        h = 1;
        break;
      case 4:
      case 9:
        h = 2;
        break;
    }
  }
  return h;
}

export function canViHoa(c1, c2) {
  if (c1 >= CAN.length || c2 >= CAN.length) return 0;

  var h = 0;
  var t = bietSo(c1, c2);
  if (t == 5) h = 1;
  if (h) {
    // Hợp hóa Khí
    switch (c1) {
      case 0:
      case 5:
        h = 3;
        break;
      case 1:
      case 6:
        h = 4;
        break;
      case 2:
      case 7:
        h = 5;
        break;
      case 3:
      case 8:
        h = 1;
        break;
      case 4:
      case 9:
        h = 2;
        break;
    }
  }
  return h;
}

// Thiên Can Tương Phá
export function canPha(can1, can2) {
  var c1 = canVi(can1);
  var c2 = canVi(can2);
  if (c1 >= CAN.length || c2 >= CAN.length) return 0;

  var p = 0;
  /*
  switch(c1)
  {
  case 0: if (c2 == 4) p = 1; break; // Giáp phá Mậu
  case 1: if (c2 == 5) p = 1; break; // Ất phá Kỷ
  case 2: if (c2 == 6) p = 1; break; // Bính phá Canh
  case 3: if (c2 == 7) p = 1; break; // Đinh phá Tân
  case 4: if (c2 == 8) p = 1; break; // Mậu phá Nhâm
  case 5: if (c2 == 9) p = 1; break; // Kỷ phá Quý
  case 6: if (c2 == 0) p = 1; break; // Canh phá Giáp
  case 7: if (c2 == 1) p = 1; break; // Tân phá Ất
  case 8: if (c2 == 2) p = 1; break; // Nhâm phá Bính
  case 9: if (c2 == 3) p = 1; break; // Quý phá Đinh
  }
  */
  var t = bietSo(c1, c2);
  if (t == 4 || t == 6) p = 1;
  return p;
}

export function canViPha(c1, c2) {
  if (c1 >= CAN.length || c2 >= CAN.length) return 0;

  var p = 0;
  var t = bietSo(c1, c2);
  if (t == 4 || t == 6) p = 1;
  return p;
}

// Thiên Can Tương Phá
export function canPhaCan(can) {
  var c = canVi(can);
  var p = 0;
  if (c < 6) p = c + 4 + 1; // plus 1 to avoid 0
  else p = c - 6 + 1; // plus 1 to avoid 0
  return p;
}

export function canViPhaCan(c) {
  var p = 0;
  if (c < 6) p = c + 4 + 1; // plus 1 to avoid 0
  else p = c - 6 + 1; // plus 1 to avoid 0
  return p;
}

// Địa Chi Lục Hợp Hóa Khí; Return 0: không hóa; 1:"Mộc", 2:"Hỏa", 3:"Thổ", 4:"Kim", 5:"Thủy"
export function chiHoa(chi1, chi2) {
  var c1 = chiVi(chi1);
  var c2 = chiVi(chi2);
  return chiViHoa(c1, c2);
}

export function chiViHoa(c1, c2) {
  if (c1 >= CHI.length || c2 >= CHI.length) return 0;

  var h = 0;
  switch (c1) {
    case 0:
      if (c2 == 1) h = 3;
      break; // Tý + Sửu = Thổ
    case 1:
      if (c2 == 0) h = 3;
      break; // Tý + Sửu = Thổ
    case 2:
      if (c2 == 11) h = 1;
      break; // Dần + Hợi = Mộc
    case 3:
      if (c2 == 10) h = 2;
      break; // Mão + Tuất = Hỏa
    case 4:
      if (c2 == 9) h = 4;
      break; // Thìn + Dậu = Kim
    case 5:
      if (c2 == 8) h = 5;
      break; // Tỵ + Thân = Thủy
    case 6:
      if (c2 == 7) h = 3;
      break; // Ngọ + Mùi = Thổ (Nhật Nguyệt)
    case 7:
      if (c2 == 6) h = 3;
      break; // Ngọ + Mùi = Thổ (Nhật Nguyệt)
    case 8:
      if (c2 == 5) h = 5;
      break; // Tỵ + Thân = Thủy
    case 9:
      if (c2 == 4) h = 4;
      break; // Thìn + Dậu = Kim
    case 10:
      if (c2 == 3) h = 2;
      break; // Mão + Tuất = Hỏa
    case 11:
      if (c2 == 2) h = 1;
      break; // Dần + Hợi = Mộc
  }
  return h;
}

// Địa Chi Tương Xung (Tứ Hành Xung & Lục Xung)
export function tuongXung(chi1, chi2) {
  var c1 = chiVi(chi1);
  var c2 = chiVi(chi2);
  if (c1 >= CHI.length || c2 >= CHI.length) return 0;

  var x = 0;
  // Tý Ngọ xung, 0-6
  // Sửu Mùi xung, 1-7
  // Dần Thân xung, 2-8
  // Mão Dậu xung, 3-9
  // Thìn Tuất xung, 4-10
  // Tỵ Hợi xung, 5-11
  var t = bietSo(c1, c2);
  if (t == 6) x = 1;
  return x;
}

export function xungChiVi(c1, c2) {
  if (c1 >= CHI.length || c2 >= CHI.length) return 0;

  var x = 0;
  // Tý Ngọ xung, 0-6
  // Sửu Mùi xung, 1-7
  // Dần Thân xung, 2-8
  // Mão Dậu xung, 3-9
  // Thìn Tuất xung, 4-10
  // Tỵ Hợi xung, 5-11
  var t = bietSo(c1, c2);
  if (t == 6) x = 1;
  return x;
}

// Nhập chi, hồi hoàn chi tương xung
export function chiXung(chi) {
  var x = 0;
  var c = chiVi(chi);
  /*
  switch(c) {
  case  0: x =  6; break; // Tý Ngọ xung
  case  1: x =  7; break; // Sửu Mùi xung
  case  2: x =  8; break; // Dần Thân xung
  case  3: x =  9; break; // Mão Dậu xung
  case  4: x = 10; break; // Thìn Tuất xung
  case  5: x = 11; break; // Tỵ Hợi xung
  case  6: x =  0; break; // Tý Ngọ xung
  case  7: x =  1; break; // Sửu Mùi xung
  case  8: x =  2; break; // Dần Thân xung
  case  9: x =  3; break; // Mão Dậu xung
  case 10: x =  4; break; // Thìn Tuất xung
  case 11: x =  5; break; // Tỵ Hợi xung
  }
  */
  x = c + 6;
  if (x >= 12) x -= 12;
  return CHI[x];
}

export function chiViXung(c) {
  var x = 0;
  x = c + 6 + 1;
  if (x >= 12) x = x - 12 + 1;
  return x;
}

// Địa Chi Lục Hình
export function chi6Hinh(chi1, chi2) {
  var c1 = chiVi(chi1);
  var c2 = chiVi(chi2);
  return chiVi6Hinh(c1, c2);
}

export function chiVi6Hinh(c1, c2) {
  if (c1 >= CHI.length || c2 >= CHI.length) return 0;

  var h = 0;
  //var LUC_HINH = [3, 10, 5, 0, 7, 2, 9, 4, 11, 6, 1, 8];
  switch (c1) {
    case 0:
      if (c2 == 3) h = 1;
      break; // Tý hình Mão hay Mão hình Tý tức nhị hình
    case 1:
      if (c2 == 10) h = 1;
      break; // Sửu hình Tuất
    case 2:
      if (c2 == 5) h = 1;
      break; // Dần hình Tỵ
    case 3:
      if (c2 == 0) h = 1;
      break; // Mão hình Tý
    case 4:
      if (c2 == 7) h = 1;
      break; // Thìn hình Mùi
    case 6:
      if (c2 == 9) h = 1;
      break; // Ngọ hình Dậu
    case 8:
      if (c2 == 11) h = 1;
      break; // Thân hình Hợi
  }
  return h;
}

export function chiLucHinh(chi) {
  var LUC_HINH = [3, 10, 5, 0, 7, -1, 9, -1, 11, -1, -1, -1];
  // Tý hình Mão
  // Sửu hình Tuất
  // Dần hình Tỵ
  // Mão hình Tý (Nhị Hình)
  // Thìn hình Mùi
  // Ngọ hình Dậu
  // Thân hình Hợi
  var c = chiVi(chi);
  if (c >= CHI.length) return -1;
  return LUC_HINH[c];
}

// Địa Chi Tam Hình, 1 chiều
export function chi3Hinh(chi1, chi2) {
  var c1 = chiVi(chi1);
  var c2 = chiVi(chi2);
  return chiVi3Hinh(c1, c2);
}

export function chiVi3Hinh(c1, c2) {
  var TAM_HINH = [3, 10, 5, 0, 4, 8, 6, 1, 2, 9, 7, 11];
  // chi:   tý sửu dần mão thìn tị ngọ mùi thân dậu tuất hợi
  // hình: mão tuất tị tý thìn thân ngọ sửu dần dậu mùi hợi
  if (c1 >= CHI.length || c2 >= CHI.length) return 0;

  var h = 0;
  if (TAM_HINH[c1] == c2) h = 1;
  return h;
}

// Chi vị Tự Hình
export function chiViTuHinh(c) {
  var h = 0;

  switch (c) {
    case 4:
    case 6:
    case 9:
    case 11:
      h = 1;
      break;
  }
  return h;
}

export function chiTamHinh(chi) {
  var c = chiVi(chi);
  return chiViTamHinh(c);
}

export function chiViTamHinh(c) {
  var TAM_HINH = [3, 10, 5, 0, 4, 8, 6, 1, 2, 9, 7, 11];
  // chi:   tý sửu dần mão thìn tị ngọ mùi thân dậu tuất hợi
  // hình: mão tuất tị tý thìn thân ngọ sửu dần dậu mùi hợi
  if (c >= CHI.length) return -1;
  return TAM_HINH[c];
}

// Nếu là Vô Lễ Hình (Hình phạt do Vô Lễ)
export function laVoLeHinh(c1, c2) {
  if ((c1 == 0 && c2 == 3) || (c1 == 3 && c2 == 0)) return 1;
  return 0;
}

// Nếu là Đặc Thế Hình hoặc Trì Thế (Hình phạt do đang nắm quyền)
export function laTriTheHinh(c1, c2) {
  // Dần hình Tỵ, Tỵ hình Thân, hay Thân hình Dần
  if ((c1 == 2 && c2 == 5) || (c1 == 5 && c2 == 8) || (c1 == 8 && c2 == 2))
    return 1;
  else if ((c2 == 2 && c1 == 5) || (c2 == 5 && c1 == 8) || (c2 == 8 && c1 == 2))
    return 1;
  return 0;
}

// Nếu là Vô (vong) Ân Hình
export function laVoAnHinh(c1, c2) {
  // Sửu hình Tuất, Tuất hình Mùi, hay Mùi hình Sửu
  if ((c1 == 1 && c2 == 10) || (c1 == 10 && c2 == 7) || (c1 == 7 && c2 == 1))
    return 1;
  else if (
    (c2 == 1 && c1 == 10) ||
    (c2 == 10 && c1 == 7) ||
    (c2 == 7 && c1 == 1)
  )
    return 1;
  return 0;
}

// Địa Chi Lục Hại
export function chi6Hai(chi1, chi2) {
  var LUC_HAI = [7, 6, 5, 4, 3, 2, 1, 0, 11, 10, 9, 8];
  // chi: tý sửu dần mão thìn tị ngọ mùi thân dậu tuất hợi
  // hại: mùi ngọ tị thìn mão dần sửu tý hợi tuất dậu thân
  var c1 = chiVi(chi1);
  var c2 = chiVi(chi2);
  return chiVi6Hai(c1, c2);
}

export function chiVi6Hai(c1, c2) {
  var LUC_HAI = [7, 6, 5, 4, 3, 2, 1, 0, 11, 10, 9, 8];
  // chi: tý sửu dần mão thìn tị ngọ mùi thân dậu tuất hợi
  // hại: mùi ngọ tị thìn mão dần sửu tý hợi tuất dậu thân
  if (c1 >= CHI.length || c2 >= CHI.length) return 0;

  var h = 0;
  if (LUC_HAI[c1] == c2 && LUC_HAI[c2] == c1) h = 1;
  return h;
}

// Chi Lục Hại
export function chiHai(chi) {
  var c = chiVi(chi);
  return chiViHai(c);
}

export function chiViHai(c) {
  var LUC_HAI = [7, 6, 5, 4, 3, 2, 1, 0, 11, 10, 9, 8];
  // chi: tý sửu dần mão thìn tị ngọ mùi thân dậu tuất hợi
  // hại: mùi ngọ tị thìn mão dần sửu tý hợi tuất dậu thân
  if (c >= CHI.length) return -1;
  return LUC_HAI[c];
}

// Chi Phá
export function chiPha(chi) {
  var c = chiVi(chi);
  return chiViPha(c);
}

export function chiViPha(c) {
  var CHI_PHA = [9, 4, 11, 6, 1, 8, 3, 10, 5, 0, 7, 2];
  // chi: tý sửu dần mão thìn tị ngọ mùi thân dậu tuất hợi
  // phá: dậu thìn hợi ngọ sửu thân mão tuất tị tý mùi dần
  if (c >= CHI.length) return -1;
  return CHI_PHA[c];
}

export function chiPha2(chi1, chi2) {
  var c1 = chiVi(chi1);
  var c2 = chiVi(chi2);
  return chiViPha2(c1, c2);
}

export function chiViPha2(c1, c2) {
  var CHI_PHA = [9, 4, 11, 6, 1, 8, 3, 10, 5, 0, 7, 2];
  // chi: tý sửu dần mão thìn tị ngọ mùi thân dậu tuất hợi
  // phá: dậu thìn hợi ngọ sửu thân mão tuất tị tý mùi dần
  if (c1 >= CHI.length || c2 >= CHI.length) return 0;
  var p = 0;
  if (CHI_PHA[c1] == c2) p = 1;
  return p;
}

// Địa Chi Tứ Tuyệt
export function chi4Tuyet(chi1, chi2) {
  var c1 = chiVi(chi1);
  var c2 = chiVi(chi2);
  return chiVi4Tuyet(c1, c2);
}

export function chiVi4Tuyet(c1, c2) {
  var TU_TUYET = [5, 7, 9, 8, 10, 0, 11, 1, 3, 2, 4, 6];
  if (c1 == CHI.length || c2 == CHI.length) return 0;

  var t = 0;
  // Tý Tỵ
  // Sửu Mùi
  // Dần Dậu
  // Mão Thân
  // Thìn Tuất
  // Ngọ Hợi
  if (TU_TUYET[c1] == c2 && TU_TUYET[c2] == c1) t = 1;
  return t;
}

export function chiTuyet(chi) {
  var c = chiVi(chi);
  return chiViTuyet(c);
}

export function chiViTuyet(c) {
  var TU_TUYET = [5, 7, 9, 8, 10, 0, 11, 1, 3, 2, 4, 6];
  if (c == CHI.length) return -1;
  return TU_TUYET[c];
}

// Chi Tam Hợp. Nhập Chi (Tý...Hợi)
// Ví dụ: chủ tuổi mùi, ngày hợi, giờ mão; thành Hợi Mão Mùi tam hợp cục để nhập trạch
export function chiTamHop(chi1, chi2, chi3) {
  var c1 = chiVi(chi1);
  var c2 = chiVi(chi2);
  var c3 = chiVi(chi3);

  return chiViTamHop(c1, c2, c3);
}

export function chiViTamHop(c1, c2, c3) {
  var h = 0,
    t1,
    t2;
  t1 = bietSo(c1, c2);
  t2 = bietSo(c1, c3);
  // Thân Tý Thìn, Dần Ngọ Tuất, Tỵ Dậu Sửu, Hợi Mão Mùi
  if ((t1 == 4 && t2 == 8) || (t1 == 8 && t2 == 4)) h = 1;
  return h;
}

// Tam Hợp Hóa cục
export function chi3HopHoa(c1, c2, c3) {
  var c = -1;
  if (chiViTamHop(c1, c2, c3)) {
    if (c1 == 0 || c2 == 0 || c3 == 0)
      c = 4; // Tý  (Thân Tý Thìn hợp thành Thủy cục)
    else if (c1 == 1 || c2 == 1 || c3 == 1)
      c = 3; // Sửu (Tị Dậu Sửu hợp thành Kim cục)
    else if (c1 == 2 || c2 == 2 || c3 == 2)
      c = 1; // Dần (Dần Ngọ Tuất hợp thành Hỏa cục)
    else if (c1 == 3 || c2 == 3 || c3 == 3) c = 0; // Mão (Hợi Mão Mùi hợp thành Mộc cục)
  }
  return c;
}

export function chi3Hop(chi) {
  var c = chiVi(chi);
  return chiVi3Hop(c);
}

export function chiVi3Hop(c) {
  var h = [0, 0, 0];
  switch (c) {
    case 0:
    case 4:
    case 8:
      h = [4, 0, 8];
      break; // Thân Tý Thìn
    case 1:
    case 5:
    case 9:
      h = [9, 5, 1];
      break; // Tỵ Dậu Sửu
    case 2:
    case 6:
    case 10:
      h = [2, 6, 10];
      break; // Dần Ngọ Tuất
    case 3:
    case 7:
    case 11:
      h = [11, 3, 7];
      break; // Hợi Mão Mùi
  }
  return h;
}

var LUC_HOP = [1, 0, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2];

// Chi Lục Hợp. Nhập Chi (Tý...Hợi)
export function chiLucHop(chi1, chi2) {
  var c1 = chiVi(chi1);
  var c2 = chiVi(chi2);
  var h = 0;
  // Tý Sửu
  // Dần Hợi
  // Mão Tuất
  // Thìn Dậu
  // Tỵ Thân
  // Ngọ Mùi
  if (LUC_HOP[c1] == c2 && LUC_HOP[c2] == c1) h = 1;
  return h;
}

// Lục Hợp. Nhập Chi Vị (0...11)
export function chi6Hop(c1, c2) {
  var h = 0;
  // Tý Sửu
  // Dần Hợi
  // Mão Tuất
  // Thìn Dậu
  // Tỵ Thân
  // Ngọ Mùi
  if (LUC_HOP[c1] == c2 && LUC_HOP[c2] == c1) h = 1;
  return h;
}

// Phản hồi chi hợp
export function chiHop(chi) {
  var c = chiVi(chi);
  return LUC_HOP[c];
}

export function chiViHop(c) {
  return LUC_HOP[c];
}

// Chi Đức Hợp (Cát: Tốt). Nhập Chi (Tý...Hợi)
export function chiDucHop(chi1, chi2) {
  var DUC_HOP = [5, 8, 7, 10, 9, 0, 11, 2, 1, 4, 3, 6];
  var c1 = chiVi(chi1);
  var c2 = chiVi(chi2);
  var h = 0;
  // Tý Tỵ
  // Sửu Thân
  // Dần Mùi
  // Ngọ Hợi
  // Mão Tuất
  // Thìn Dậu
  if (DUC_HOP[c1] == c2 && DUC_HOP[c2] == c1) h = 1;
  return h;
}

// Tứ Kiểm Hợp (Cát: Tốt). Nhập Chi (Tý...Hợi)
export function tuKiemHop(chi1, chi2) {
  var c1 = chiVi(chi1);
  var c2 = chiVi(chi2);
  var h = 0;
  if ((c1 == 1 && c2 == 11) || (c1 == 11 && c2 == 1)) h = 1; // Sửu Hợi
  else if ((c1 == 2 && c2 == 4) || (c1 == 4 && c2 == 2)) h = 1; // Dần Thìn
  else if ((c1 == 5 && c2 == 7) || (c1 == 7 && c2 == 5)) h = 1; // Tỵ Mùi
  else if ((c1 == 8 && c2 == 10) || (c1 == 10 && c2 == 8)) h = 1; // Thân Tuất
  return h;
}

// Luận Tam Hợp
export function chi3HopLuan(c1, c2, c3) {
  var r1 = bietSo(c2, c1);
  var r2 = bietSo(c3, c1);
  var h = 0;
  if ((r1 == 4 && r2 == 8) || (r1 == 8 && r2 == 4)) h = 1;
  return h;
}

// Năm, Tháng, Ngày, Giờ đại cát
export function chi3HopCat(c1, c2, c3) {
  var cat = [-1, -1]; // 2 Chi Cát
  if (chiTamHop(c1, c2, c3) == 0) return cat;
  switch (c1) {
    case 0:
    case 4:
    case 8:
    case 2:
    case 6:
    case 10:
      cat = [2, 8];
      break; // Dần & Thân
    case 1:
    case 5:
    case 9:
    case 3:
    case 7:
    case 11:
      cat = [5, 11];
      break; // Tỵ & Hợi
  }
  return cat;
}

// Phản Ngâm của Hào Động
export function phanNgam(c1, c2) {
  var pn = 0;
  var t = bietSo(c1, c2);
  if (t == 6) pn = 1;
  return pn;
}

// Tam Hợp Cục
export function chi3HopVi(c) {
  var h3 = [-1, -1, 0]; // 2 Chi tam hợp + hành của cục
  switch (c) {
    case 0:
      h3 = [4, 8, 4];
      break; // Thân Tý Thìn
    case 1:
      h3 = [5, 9, 3];
      break; // Tị Dậu Sửu
    case 2:
      h3 = [6, 10, 1];
      break; // Dần Ngọ Tuất
    case 3:
      h3 = [7, 11, 0];
      break; // Hợi Mão Mùi
    case 4:
      h3 = [0, 8, 4];
      break; // Thân Tý Thìn
    case 5:
      h3 = [1, 9, 3];
      break; // Tị Dậu Sửu
    case 6:
      h3 = [2, 10, 1];
      break; // Dần Ngọ Tuất
    case 7:
      h3 = [3, 11, 0];
      break; // Hợi Mão Mùi
    case 8:
      h3 = [0, 4, 4];
      break; // Thân Tý Thìn
    case 9:
      h3 = [1, 5, 3];
      break; // Tị Dậu Sửu
    case 10:
      h3 = [2, 6, 1];
      break; // Dần Ngọ Tuất
    case 11:
      h3 = [3, 7, 0];
      break; // Hợi Mão Mùi
  }
  return h3;
}

// Hướng
var HUONG = [
  "Nhâm",
  "Tý",
  "Quý",
  "Sửu",
  "Cấn",
  "Dần",
  "Giáp",
  "Mão",
  "Ất",
  "Thìn",
  "Tốn",
  "Tỵ",
  "Bính",
  "Ngọ",
  "Đinh",
  "Mùi",
  "Khôn",
  "Thân",
  "Canh",
  "Dậu",
  "Tân",
  "Tuất",
  "Kiền",
  "Hợi",
];

// Nhập 3 can vị; return: Năm, Tháng, Ngày, Giờ đại Hung & Hướng (24 Sơn)
export function chiTamHopKy(c1, c2, c3) {
  var hung = [-1, -1, -1, -1, -1]; // Giờ, h1, h2, h3, h4 (all used the real index)
  if (chiTamHop(c1, c2, c3) == 0) return hung; // i+1
  switch (c1) {
    case 0:
    case 4:
    case 8:
      hung = [7, 6, 8, 18, 20];
      break; // Giờ Mùi, hướng Giáp, Ất, Canh, Tân
    case 1:
    case 5:
    case 9:
      hung = [4, 12, 0, 14, 2];
      break; // Giờ Thìn, hướng Bính, Nhâm, Đinh, Quý
    case 2:
    case 6:
    case 10:
      hung = [1, 6, 8, 18, 20];
      break; // Giờ Sửu, hướng Giáp, Ất, Canh, Tân
    case 3:
    case 7:
    case 11:
      hung = [10, 12, 0, 14, 2];
      break; // Giờ Tuất, hướng Bính, Nhâm, Đinh, Quý
  }
  return hung;
}

// Địa Đới (Hung: Xấu). Nhập Chi (Tý...Hợi)
export function diaDoi(chi1, chi2) {
  var c1 = chiVi(chi1);
  var c2 = chiVi(chi2);
  var h = 0;
  if ((c1 == 0 && c2 == 2) || (c1 == 2 && c2 == 0)) h = 1; // Tý Dần
  else if ((c1 == 1 && c2 == 3) || (c1 == 3 && c2 == 1)) h = 1; // Sửu Mão
  else if ((c1 == 4 && c2 == 11) || (c1 == 11 && c2 == 4)) h = 1; // Thìn Hợi
  else if ((c1 == 6 && c2 == 8) || (c1 == 8 && c2 == 6)) h = 1; // Ngọ Thân
  else if ((c1 == 7 && c2 == 9) || (c1 == 9 && c2 == 7)) h = 1; // Mùi Dậu
  else if ((c1 == 10 && c2 == 5) || (c1 == 5 && c2 == 10)) h = 1; // Tuất Tỵ
  return h;
}

// Tuế Tinh (Hung: Xấu). Nhập Chi (Tý...Hợi)
export function tueTinh(chi1, chi2) {
  var c1 = chiVi(chi1);
  var c2 = chiVi(chi2);
  var h = 0;
  if ((c1 == 0 && c2 == 3) || (c1 == 3 && c2 == 0)) h = 1; // Tý Mão
  else if ((c1 == 1 && c2 == 2) || (c1 == 2 && c2 == 1)) h = 1; // Dần Sửu
  else if ((c1 == 4 && c2 == 5) || (c1 == 5 && c2 == 4)) h = 1; // Thìn Tỵ
  else if ((c1 == 7 && c2 == 8) || (c1 == 8 && c2 == 7)) h = 1; // Mùi Thân
  else if ((c1 == 6 && c2 == 9) || (c1 == 9 && c2 == 6)) h = 1; // Ngọ Dậu
  else if ((c1 == 10 && c2 == 11) || (c1 == 11 && c2 == 10)) h = 1; // Tuất Hợi
  return h;
}

// Tìm Không Vong; nhập Can & Chi Năm; return chi đầu trong mỗi cặp
export function khongVong(can, chi) {
  // Trong vòng ------------ Giáp Tý,  G.  Tuất, G. Thân, G.  Ngọ, G. Thìn, G. Dần
  // Không Vong luôn có đôi: Tuất Hợi, Thân Dậu, Ngọ Mùi, Thìn Tỵ, Dần Mão, Tý Sửu
  var KV1 = [10, 8, 6, 4, 2, 0];
  //var KV2 = [11,9,7,5,3,1];
  var canvi = canVi(can);
  var chivi = chiVi(chi);
  var biet = chivi - canvi;
  if (biet < 0) biet += 12;
  switch (biet) {
    case 0:
      kv = KV1[0];
      break;
    case 2:
      kv = KV1[5];
      break;
    case 4:
      kv = KV1[4];
      break;
    case 6:
      kv = KV1[3];
      break;
    case 8:
      kv = KV1[2];
      break;
    case 10:
      kv = KV1[1];
      break;
  }
  return kv;
}

// Tìm Không Vong Thời; Nhập Can ngày, return chi GIỜ đầu trong mỗi cặp
export function gioKhongVong(can) {
  // Không Vong luôn có đôi: Tuất Hợi, Thân Dậu, Ngọ Mùi, Thìn Tỵ, Dần Mão, Tý Sửu
  var KV1 = [10, 8, 6, 4, 2, 0];
  //var KV2 = [11,9,7,5,3,1];
  var can = canVi(can);
  var kv = 0;
  switch (can) {
    case 0:
    case 5:
      kv = KV1[1];
      break; // Ngày Giáp Kỷ  : giờ Thân Dậu
    case 1:
    case 6:
      kv = KV1[2];
      break; // Ngày Ất Canh  : giờ Ngọ Mùi
    case 2:
    case 7:
      kv = KV1[3];
      break; // Ngày Bính Tân : giờ Thìn Tỵ
    case 3:
    case 8:
      kv = KV1[4];
      break; // Ngày Đinh Nhâm: giờ Dần Mão
    case 4:
    case 9:
      kv = KV1[5];
      break; // Ngày Mậu Quí  : giờ Tý Sửu
  }
  return kv;
}
