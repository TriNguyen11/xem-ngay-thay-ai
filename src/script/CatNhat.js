//
// Cát Nhật
// Author: Harry Tran (a.k.a Thiên Y) in USA (email: thien.y@operamail.com)
// Tham khảo: Ngọc Hạp Ký 玉匣記, Đổng Công Tuyển Yếu Lãm 董公選要覽, Đạo Gia Trạch Nhật Học 道家擇日學, FSD Trạch Nhật Học
//
// 月以交節爲准，而非從初一開始。如寅月，是指立春後到驚蟄前這一段時間，卯月是指驚蟄後到清明前這一段時間
// Nguyệt dĩ giao tiết vi chuẩn, nhi phi tòng sơ nhất khai thủy.
// Như dần nguyệt, thị chỉ lập xuân hậu đáo kinh trập tiền giá nhất đoạn thời gian.
// Mão nguyệt thị chỉ kinh trập hậu đáo thanh minh tiền giá nhất đoạn thì gian.
// 立春節到驚蟄節這一段時間內
// Lập xuân tiết đáo kinh trập tiết giá nhất đoạn thời gian nội.
//

import {canVi, DiaChi, ThienCan, TRUC12, TueCanVi} from './AmLich';
import {chi3Hop, chiHop} from './CanChi';
import {CAN, CHI} from './Constant';

export function lucHopChi(nn) {
  var chi = DiaChi(nn);
  return CHI[chiHop(chi)];
}

// Tứ Tướng 四相 [ DGTNH ]
//   Xuân: Bính Đinh, Hạ: Mậu Kỷ, Thu: Nhâm Quí, Đông: Giáp Ất
// nghi tu doanh, khởi công, dưỡng dục, sanh tài, tài thực, chủng thời, dời chỗ (di chuyển), viễn hành
export function tuTuong(T, nn) {
  // T (0...3) & nn: lunar.dd
  var can = ThienCan(nn);
  var k = 0;

  switch (T) {
    case 0:
      if (can == CAN[2] || can == CAN[3]) k = 1;
      break; // Xuân: Bính Đinh
    case 1:
      if (can == CAN[4] || can == CAN[5]) k = 1;
      break; // Hạ:   Mậu Kỷ
    case 2:
      if (can == CAN[8] || can == CAN[9]) k = 1;
      break; // Thu:  Nhâm Quí
    case 3:
      if (can == CAN[0] || can == CAN[1]) k = 1;
      break; // Đông: Giáp Ất
  }

  return k;
}

// Thiên Ân 天恩 [ DGTNH, FSD, NHK ]
// thượng quan, thụ phong, tạo táng, hôn nhân, giá thú, bách sự tịnh cát
export function thienAn(nn) {
  // nn: lunar.dd
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;

  if (can == CAN[0] && chi == CHI[0]) k = 1; // Giáp Tý
  else if (can == CAN[1] && chi == CHI[1]) k = 1; // Ất Sửu
  else if (can == CAN[2] && chi == CHI[2]) k = 1; // Bính Dần
  else if (can == CAN[3] && chi == CHI[3]) k = 1; // Đinh Mão
  else if (can == CAN[4] && chi == CHI[4]) k = 1; // Mậu Thìn
  else if (can == CAN[5] && chi == CHI[3]) k = 1; // Kỷ Mão
  else if (can == CAN[6] && chi == CHI[4]) k = 1; // Canh Thìn
  else if (can == CAN[7] && chi == CHI[5]) k = 1; // Tân Tị
  else if (can == CAN[8] && chi == CHI[6]) k = 1; // Nhâm Ngọ
  else if (can == CAN[9] && chi == CHI[7]) k = 1; // Quí Mùi
  else if (can == CAN[5] && chi == CHI[9]) k = 1; // Kỷ Dậu
  else if (can == CAN[6] && chi == CHI[10]) k = 1; // Canh Tuất
  else if (can == CAN[7] && chi == CHI[11]) k = 1; // Tân Hợi
  else if (can == CAN[8] && chi == CHI[0]) k = 1; // Nhâm Tý
  else if (can == CAN[9] && chi == CHI[1]) k = 1; // Quí Sửu

  return k;
}

// Thiên Xá 天赦 [ DGTNH, NHK, PSD ]
// Xuân mậu dần, hạ giáp ngọ, thu mậu thân, đông giáp tý.
// Cát Nhật: ngày can chi tương sinh, trời đất hòa thuận (Cát). Bách sự nghi dụng
export function thienXa(T, nn) {
  // T (0...3) & nn: lunar.dd
  var can = ThienCan(nn);
  var k = 0;

  switch (T) {
    case 0:
      if (can == CAN[4] || can == CAN[2]) k = 1;
      break; // Xuân: Mậu Dần
    case 1:
      if (can == CAN[0] || can == CAN[6]) k = 1;
      break; // Hạ:   Giáp Ngọ
    case 2:
      if (can == CAN[4] || can == CAN[8]) k = 1;
      break; // Thu:  Mậu Thân
    case 3:
      if (can == CAN[0] || can == CAN[0]) k = 1;
      break; // Đông: Giáp Tý
  }

  return k;
}

// Giải Thần 解神 [ DGTNH-10 ] = 豐至、地解
//lịch lệ viết: chánh, nhị nguyệt thân; tam, tứ nguyệt tuất; ngũ, lục nguyệt tý;
//   thất, bát nguyệt dần; cửu, thập nguyệt thìn; thập nhất nguyệt, thập nhị nguyệt ngọ
// thượng biểu chương, trần từ tụng, giải trừ, mộc dục, cầu y, liệu bệnh; bách sự nghi dụng, nghi giải oan cừu, sơ thông ngục tụng
export function giaiThan(t, nn) {
  // t (tiết)
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 2:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 3:
    case 4:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
    case 5:
    case 6:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 7:
    case 8:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 9:
    case 10:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
    case 11:
    case 12:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
  }
  return k;
}

// Nguyệt Ân 月恩 [ DGTNH ]
// lịch lệ viết: nguyệt ân giả: chánh nguyệt bính, nhị nguyệt đinh, tam nguyệt canh, tứ nguyệt kỷ, ngũ nguyệt mậu, lục nguyệt tân, thất nguyệt nhâm, bát nguyệt quý, cửu nguyệt canh, thập nguyệt ất, thập nhất nguyệt giáp, thập nhị nguyệt tân
// bách sự nghi dụng, tế tự, kì phúc, cầu tự, thi ân, phong bái, cử chánh trực, khánh tứ, thưởng hạ, yến hội, hành hạnh, khiển sử, thượng quan, phó nhâm, lâm chánh thân dân, kết hôn, nạp thái, vấn danh, bàn di, giải trừ, cầu y liệu bệnh, tài chế, tu cung thất, tu tạo, thiện thành quách, hưng tạo, động thổ, thụ trụ, thượng lương, nạp tài, khai thương khố, xuất hóa tài, tài chủng, mục dưỡng
export function nguyetAn(t, nn) {
  // t (tiết)
  var can = ThienCan(nn);
  var k = 0;
  switch (t) {
    case 1:
      if (can == CAN[2]) k = 1;
      break; // Bính
    case 2:
      if (can == CAN[3]) k = 1;
      break; // Đinh
    case 3:
      if (can == CAN[6]) k = 1;
      break; // Canh
    case 4:
      if (can == CAN[5]) k = 1;
      break; // Kỷ
    case 5:
      if (can == CAN[4]) k = 1;
      break; // Mậu
    case 6:
      if (can == CAN[7]) k = 1;
      break; // Tân
    case 7:
      if (can == CAN[8]) k = 1;
      break; // Nhâm
    case 8:
      if (can == CAN[9]) k = 1;
      break; // Quí
    case 9:
      if (can == CAN[6]) k = 1;
      break; // Canh
    case 10:
      if (can == CAN[1]) k = 1;
      break; // Ất
    case 11:
      if (can == CAN[0]) k = 1;
      break; // Giáp
    case 12:
      if (can == CAN[7]) k = 1;
      break; // Tân
  }
  return k;
}

// Nguyệt Đức 月德 [ FSD, NHK, DGTNH-4 ]
// nguyệt đức giả: chánh, ngũ, cửu nguyệt tại bính; nhị, lục, thập nguyệt tại giáp; tam, thất, thập nhất nguyệt tại nhâm; tứ, bát, thập nhị nguyệt tại canh.
// nghi tế tự, kì phúc, cầu tự, thượng sách, tiến biểu chương, ban chiếu, đàm ân, tứ xá, thi ân, phong bái, chiêu hiền, cử chánh trực, thi ân huệ, tuất cô quỳnh, tuyên chánh sự, hành huệ ái, tuyết oan uổng, hoãn hình ngục, khánh tứ, thưởng hạ, yến hội, hành hạnh, khiển sử, an phủ biên cảnh, tuyển tương, huấn binh, xuất sư, thượng quan, phó nhậm, lâm chánh thân dân, kết hôn, nạp thái, vấn danh, đính hôn, giá thú, bàn di, nhập trạch, giải trừ, cầu y, liệu bệnh, tài chế, doanh kiến cung thất, thiện thành quách, hưng tạo, tu tạo, động thổ, thụ trụ, thượng lương, tu thương khố, tài chủng, mục dưỡng, nạp súc, an táng
export function nguyetDuc(t, nn) {
  // t (tiết)
  var can = ThienCan(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 5:
    case 9:
      if (can == CAN[2]) k = 1;
      break; // Bính
    case 2:
    case 6:
    case 10:
      if (can == CAN[0]) k = 1;
      break; // Giáp
    case 3:
    case 7:
    case 11:
      if (can == CAN[8]) k = 1;
      break; // Nhâm
    case 4:
    case 8:
    case 12:
      if (can == CAN[6]) k = 1;
      break; // Canh
  }
  return k;
}

// Nguyệt Đức Hợp 月德合 [ DGTNH-4 ]
// chánh, ngũ, cửu nguyệt tại tân; nhị, lục, thập nguyệt tại kỷ; tam, thất, thập nhất nguyệt tại đinh; tứ, bát, thập nhị nguyệt tại ất.
// bách sự nghi dụng: tế tự, kì phúc, cầu tự, thượng sách, tiến biểu chương, ban chiếu, đàm ân, tứ xá, thi ân, phong bái, chiếu chiêu hiền, cử chánh trực, thi ân huệ, tuất cô quỳnh, tuyên chánh sự, hành huệ ái, tuyết oan uổng, hoãn hình ngục, khánh tứ, thưởng hạ, yến hội, hành hạnh, khiển sử, an phủ biên cảnh, tuyển tương, huấn binh, xuất sư, thượng quan, phó nhậm, lâm chánh thân dân, kết hôn, nạp thái, vấn danh, giá thú, bàn di, giải trừ, cầu y liệu bệnh, tài chế, doanh kiến cung thất, thiện thành quách, hưng tạo động thổ, thụ trụ thượng lương, tu thương khố, tài chủng, mục dưỡng, nạp súc, an táng
export function nguyetDucHop(t, nn) {
  // t (tiết)
  var can = ThienCan(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 5:
    case 9:
      if (can == CAN[7]) k = 1;
      break; // Tân
    case 2:
    case 6:
    case 10:
      if (can == CAN[5]) k = 1;
      break; // Kỷ
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

// Nguyệt Đức Quí Nhân ***
export function nguyetDucQuiNhan(t, nn) {
  // t (tiết)
  var can = ThienCan(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 5:
    case 9:
      if (can == CAN[2]) k = 1;
      break; // Bính
    case 2:
    case 6:
    case 10:
      if (can == CAN[0]) k = 1;
      break; // Giáp
    case 3:
    case 7:
    case 11:
      if (can == CAN[8]) k = 1;
      break; // Nhâm
    case 4:
    case 8:
    case 12:
      if (can == CAN[6]) k = 1;
      break; // Canh
  }
  return k;
}

// Nguyệt Không 月空 [ DGTNH-04, NHK ]
// lịch lệ viết: 'dần ngọ tuất nguyệt nhâm, hợi mão mùi nguyệt canh, thân tý thìn nguyệt bính, tị dậu sửu nguyệt giáp.'
// nghi thiết trù mưu, định kế sách, trần lợi ngôn, hiến chương sơ, tạo sàng trướng, tu sản thất, động thổ, thủ thổ, tu tạo
export function nguyetKhong(t, nn) {
  // t (tiết)
  var can = ThienCan(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 5:
    case 9:
      if (can == CAN[8]) k = 1;
      break; // Nhâm
    case 2:
    case 6:
    case 10:
      if (can == CAN[6]) k = 1;
      break; // Canh
    case 3:
    case 7:
    case 11:
      if (can == CAN[2]) k = 1;
      break; // Bính
    case 4:
    case 8:
    case 12:
      if (can == CAN[0]) k = 1;
      break; // Giáp
  }
  return k;
}

// Thiên Đức 天德 [ DCTYL, DGTNH, FSD ]
// [ DGTC: chánh đinh nhị thân tam nhâm phùng
//   tứ tân ngũ hợi lục giáp đồng, thất quý bát dần cửu nguyệt bính,
//   thập ất thập nhất tị nhật cùng, thập nhị nguyệt tầm canh tiện thị. ]
// nghi tu cung thất, thiện thành quách, kết hôn nhân, tiến nhân khẩu
export function thienDuc(t, nn) {
  // t (tiết)
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;

  switch (t) {
    case 1:
      if (can == CAN[3]) k = 1;
      break; // Đinh
    case 2:
      if (chi == CHI[8]) k = 1;
      break; // Thân (Khôn, DCTYL, NHK)
    case 3:
      if (can == CAN[8]) k = 1;
      break; // Nhâm
    case 4:
      if (can == CAN[7]) k = 1;
      break; // Tân
    case 5:
      if (chi == CHI[11]) k = 1;
      break; // Hợi (Kiền, DCTYL, NHK)
    case 6:
      if (can == CAN[0]) k = 1;
      break; // Giáp
    case 7:
      if (can == CAN[9]) k = 1;
      break; // Quí
    case 8:
      if (chi == CHI[2]) k = 1;
      break; // Dần (Cấn, DCTYL, NHK)
    case 9:
      if (can == CAN[2]) k = 1;
      break; // Bính
    case 10:
      if (can == CAN[1]) k = 1;
      break; // Ất
    case 11:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ (Tốn, DCTYL, NHK)
    case 12:
      if (can == CAN[6]) k = 1;
      break; // Canh
  }
  return k;
}

// Thiên Đức Hợp 天德合
//   nhâm tị đinh bính dần kỷ mậu hợi tân canh thân ất
// bách sự nghi dụng: tế tự, kì phúc, cầu tự, thượng sách, tiến biểu chương, ban chiếu, đàm ân, tứ xá, thi ân, phong bái, chiêu hiền, cử chánh trực, thi ân huệ, tuất cô quỳnh, tuyên chánh sự, hành huệ ái, tuyết oan uổng, hoãn hình ngục, khánh tứ, thưởng hạ, yến hội, hành hạnh, khiển sử, an phủ biên cảnh, tuyển tương, huấn binh, xuất sư, thượng quan, phó nhậm, lâm chánh thân dân, kết hôn, nạp thái, vấn danh, giá thú, bàn di, nhập trạch, giải trừ, cầu y, liệu bệnh, tài chế, doanh kiến cung thất, thiện thành quách, tu tạo, động thổ, thụ trụ thượng lương, tu thương khố, tài chủng, mục dưỡng, nạp súc, an táng
export function thienDucHop(t, nn) {
  // t (tiết)
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
      if (can == CAN[8]) k = 1;
      break; // Nhâm
    case 2:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ (Tốn, DCTYL, NHK)
    case 3:
      if (can == CAN[3]) k = 1;
      break; // Đinh
    case 4:
      if (can == CAN[2]) k = 1;
      break; // Bính
    case 5:
      if (chi == CHI[2]) k = 1;
      break; // Dần (Cấn, DCTYL, NHK)
    case 6:
      if (can == CAN[5]) k = 1;
      break; // Kỷ
    case 7:
      if (can == CAN[4]) k = 1;
      break; // Mậu
    case 8:
      if (chi == CHI[11]) k = 1;
      break; // Hợi (Kiền, DCTYL, NHK)
    case 9:
      if (can == CAN[7]) k = 1;
      break; // Tân
    case 10:
      if (can == CAN[6]) k = 1;
      break; // Canh
    case 11:
      if (chi == CHI[8]) k = 1;
      break; // Thân (Khôn, DCTYL, NHK)
    case 12:
      if (can == CAN[1]) k = 1;
      break; // Ất
  }
  return k;
}

// Thiên Đức Quí Nhân [ *** ]
// chánh nguyệt sanh giả kiến đinh,
// nhị nguyệt sanh giả kiến thân,
// tam nguyệt sanh giả kiến nhâm,
// tứ nguyệt sanh giả kiến tân,
// ngũ nguyệt sanh giả kiến hợi,
// lục nguyệt sanh giả kiến giáp,
// thất nguyệt sanh giả kiến quý,
// bát nguyệt sanh giả kiến dần,
// cửu nguyệt sanh giả kiến bính,
// thập nguyệt sanh giả kiến ất,
// thập nhất nguyệt sanh giả kiến tị,
// thập nhị nguyệt sanh giả kiến canh
export function thienDucQuiNhan(t, nn) {
  // t (tiết)
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
      if (can == CAN[3]) k = 1;
      break; // Đinh
    case 2:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 3:
      if (can == CAN[8]) k = 1;
      break; // Nhâm
    case 4:
      if (can == CAN[7]) k = 1;
      break; // Tân
    case 5:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 6:
      if (can == CAN[0]) k = 1;
      break; // Giáp
    case 7:
      if (can == CAN[9]) k = 1;
      break; // Quí
    case 8:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 9:
      if (can == CAN[2]) k = 1;
      break; // Bính
    case 10:
      if (can == CAN[1]) k = 1;
      break; // Ất
    case 11:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 12:
      if (can == CAN[6]) k = 1;
      break; // Canh
  }
  return k;
}

// Kim Quỹ Phương [ *** ]
export function kimQuyPhuong(t, nn) {
  // t (tiết)
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 5:
    case 9:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
    case 2:
    case 6:
    case 10:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 3:
    case 7:
    case 11:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 4:
    case 8:
    case 12:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
  }
  return k;
}

// Mẫu Thương 母倉 [ DGTNH ]
// xuân hợi tý, hạ dần mão, thu thìn tuất sửu mùi, đông thân dậu, thổ vượng dụng sự hậu tị ngọ nhật.
// nghi tế tự, kì phúc, cầu tự, thi ân, phong bái, cử chánh trực, khánh tứ, thưởng hạ, yến hội, hành hạnh, khiển sử, thượng quan, phó nhậm, lâm chánh thân dân, kết hôn, nạp thái, vấn danh, bàn di, giải trừ, cầu y, liệu bệnh, tài chế, tu cung thất, thiện thành quách, tu tạo, động thổ, thụ trụ, thượng lương, nạp tài, khai thương khố, xuất hóa tài, tài chủng, mục dưỡng
export function mauThuong(T, nn) {
  // T (0...3) & nn: lunar.dd
  var chi = DiaChi(nn);
  var k = 0;

  switch (T) {
    case 0:
      if (chi == CHI[0] || chi == CHI[11]) k = 1;
      break; // Xuân: Tý, Hợi
    case 1:
      if (chi == CHI[2] || chi == CHI[3]) k = 1;
      break; // Hạ: Dần, Mão
    case 2:
      if (chi == CHI[4] || chi == CHI[10] || chi == CHI[1] || chi == CHI[7])
        k = 1;
      break; // Thu:  Thìn Tuất Sửu Mùi
    case 3:
      if (chi == CHI[8] || chi == CHI[9]) k = 1;
      break; // Đông: Thân, Dậu
  }

  return k;
}

// Nguyệt Chi, a local export function
export function layNCV(nc) {
  var NC = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1];
  return NC[nc];
}

// Tam Hợp 三合
//  dần nguyệt ngọ tuất nhật, mão nguyệt hợi mùi nhật, thìn nguyệt thân tý nhật, tị nguyệt dậu sửu nhật
//  ngọ nguyệt dần tuất nhật, mùi nguyệt hợi mão nhật, thân nguyệt tý thìn nhật, dậu nguyệt tị sửu nhật
//  tuất nguyệt dần ngọ nhật, hợi nguyệt mão mùi nhật, tý nguyệt thân thìn nhật, sửu nguyệt tị dậu nhật
// bách sự nghi dụng: kì phúc, khánh tứ, thưởng hạ, yến hội, kết hôn, đính hôn, nạp thái, vấn danh, giá thú, nhập trạch, khai thị, tiến nhân khẩu, tài chế, tu cung thất, thiện thành quách, tu tạo, động thổ, thụ trụ, thượng lương, tu thương khố, kinh lạc, uấn nhưỡng, lập khoán, giao dịch, nạp tài, an đối ngại, nạp súc
export function tamHop(t, nn) {
  // t (tiết) & nn: lunar.dd
  var chi = DiaChi(nn);
  var r = layNCV(t - 1);
  var h3 = chi3Hop(CHI[r]);
  for (var i = 0; i < h3.length; i++) {
    if (h3[i] != r) {
      if (CHI[h3[i]] == chi) return 1;
    }
  }

  return 0;
}

// Thời Đức 時德 [ DGTNH ]
// nghi tế tự, kì phúc, cầu tự, thi ân phong bái, cử chánh trực, khánh tứ, thưởng hạ, yến hội, hành hạnh, khiển sử, thượng quan, phó nhậm, lâm chánh thân dân, kết hôn, đính hôn, nạp thái, vấn danh, bàn di, giải trừ, cầu y, liệu bệnh, tài chế, tu cung thất, thiện thành quách, tu tạo, động thổ, thụ trụ, thượng lương, nạp tài, khai thương khố, xuất hóa tài, tài chủng, mục dưỡng, yến nhạc
export function thoiDuc(T, nn) {
  // T (0...3) & nn: lunar.dd
  var chi = DiaChi(nn);
  var k = 0;

  switch (T) {
    case 0:
      if (chi == CHI[6]) k = 1;
      break; // Xuân: Ngọ
    case 1:
      if (chi == CHI[4]) k = 1;
      break; // Hạ: Thìn
    case 2:
      if (chi == CHI[0]) k = 1;
      break; // Thu: Tý
    case 3:
      if (chi == CHI[2]) k = 1;
      break; // Đông: Dần
  }

  return k;
}

// Ngũ Hợp 五合 [ DGTNH ]
//   giáp dần ất mão thiên địa hợp, bính dần đinh mão nhật nguyệt hợp
//   mậu dần kỷ mão nhân dân hợp, canh dần tân mão kim thạch hợp,
//   nhâm dần quý mão giang hà hợp
// Nghi yến hội, kết hôn, giá thú, lập khoán, giao dịch
export function nguHop(nn) {
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;
  if (chi == CHI[2]) k = 1; // Dần
  else if (chi == CHI[3]) k = 1; // Mão
  return k;
}

// Ngũ Phú 五富 [ DGTNH -4]
//   chánh nguyệt khởi hợi thuận hành tứ mạnh
//   dần ngọ tuất nguyệt ngũ phú hợi, hợi mão mùi nguyệt dần nhật tài,
//   thân tý thìn nguyệt phùng tị nhật, tị dậu sửu nguyệt thân nhật bài
// nghi kinh lạc, uấn nhưỡng, khai thị, lập khoán, giao dịch, nạp tài, khai thương khố, xuất hóa tài, tài chủng, mục dưỡng, nạp súc, di cư, nhập trạch
export function nguPhu(t, nn) {
  // t (tiết)
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
      if (chi == CHI[2]) k = 1;
      break; // Dần
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

// Lục Hợp (六合)  [ DGTNH ] = Vô Kiều (hung nhật) [ DGTNH ]
//  dần nguyệt hợi nhật, mão nguyệt tuất nhật, thần nguyệt dậu nhật, tị nguyệt thân nhật,
//  ngọ nguyệt mùi nhật, mùi nguyệt ngọ nhật, thân nguyệt tị nhật, dậu nguyệt thìn nhật,
//  tuất nguyệt mão nhật, hợi nguyệt dần nhật, tý nguyệt tuất nhật, tuất nguyệt tý nhật.
//  [ hợi tuất dậu thân mùi ngọ tị thìn mão dần sửu tý ]
// bách sự nghi dụng: yến hội, kết hôn, đính hôn, giá thú, tiến nhân khẩu, kinh lạc, uấn nhưỡng, khai thị, nhập trạch, lập khoán, giao dịch, nạp tài, nạp súc, an táng
export function lucHop(t, nn) {
  // t (tiết)
  var chi = DiaChi(nn);
  var r = layNCV(t - 1);
  var h6 = chiHop(CHI[r]);
  var h = 0;

  if (CHI[h6] == chi) h = 1;

  return h;
}

// Lâm Nhật 臨日 [ DGTNH ]
//   ngọ hợi thân sửu tuất mão tý tị dần mùi thìn dậu
// nghi thượng sách, tiến biểu chương, thượng quan phó nhậm, lâm chánh thân dân, trần từ tụng
export function lamNhat(t, nn) {
  // t (tiết)
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
    case 2:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 3:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 4:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 5:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
    case 6:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 7:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 8:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 9:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 10:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 11:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
    case 12:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
  }
  return k;
}

// Dịch Mã 驛馬 = Thiên Hậu 天后 [ DGTNH-4 ]
//   lịch lệ: thiên hậu dữ dịch mã đồng vị
//   chánh nguyệt khởi thân, nghịch hành tứ mạnh:
//   thi lệ: "dần ngọ tuất nguyệt mã cư thân, hợi mão vị nguyệt phùng tị chân,
//   thân tử thần nguyệt mã cư dần, tị dậu sửu nguyệt mã hợi thân"
// nghi xuất hành, tạo táng, xuất quân, viễn hành, liệu bệnh, phục dược, bách sự đại cát
// nghi cầu y liệu bệnh, kì phúc, lễ thần
// Thiên Hậu nghi cầu y liệu bệnh, kì phúc, lễ thần
export function dichMa(t, nn) {
  // t (tiết)
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 5:
    case 9:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 2:
    case 6:
    case 10:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 3:
    case 7:
    case 11:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 4:
    case 8:
    case 12:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
  }
  return k;
}

// 12 Tinh hoàng đạo & hắc đạo: ***
// thanh long HD, minh đường HD, thiên hình hd, chu tước hd, kim quỹ HD, thiên đức HD,
// bạch hổ hd, ngọc đường HD, thiên lao hd, huyền vũ hd, tư mệnh HD, câu trần hd.
//
// thiên hình, chu tước, bạch hổ, thiên lao, huyền vũ, câu trần:
//   Sở trị chi nhật giai bất khả hưng thổ công, doanh ốc xá, di tỉ, viễn hành, giá thú, xuất quân.
// hoàng đạo=HD, hắc đạo=hd

// Thanh Long Hoàng Đạo 青龍黃道 [ DGTNH ]
//   tý ngọ thanh long khởi tại thân, mão dậu chi nguyệt hựu tại dần,
//   dần thân tu tòng tý thượng khởi, tị hợi tại ngọ bất tu luận,
//   duy hữu thìn tuất quy thìn vị, sửu mùi nguyên tòng tuất thượng tầm.
// Thanh Long Hoàng Đạo: thiên ất tinh, thiên quý tinh, lợi hữu du vãng, sở tác tất thành, sở cầu giai đắc.
//   nghi kì phúc, giá thú, đính hôn, tạo trạch, tạo táng, bách sự giai cát.
export function thanhLong(t, nn) {
  // t (tiết)
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 7:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 2:
    case 8:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 3:
    case 9:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
    case 4:
    case 10:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
    case 5:
    case 11:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 6:
    case 12:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
  }
  return k;
}

// Minh Đường Hoàng Đạo 明堂黃道 [ DGTNH ]
// Minh Đường Hoàng Đạo: minh phụ tinh, quý nhân tinh, lợi kiến đại nhân, lợi hữu du vãng, phạ tác tất thành.
//    nghi thượng quan, an sàng, an táo, tu trạch, tạo trạch, nhập trạch cát.
export function minhDuong(t, nn) {
  // t (tiết)
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 7:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 2:
    case 8:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 3:
    case 9:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 4:
    case 10:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 5:
    case 11:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
    case 6:
    case 12:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
  }
  return k;
}

// Kim Quỹ Hoàng Đạo 金匱黃道 = Thiên Tài Tinh 天財星 *** [ DGTNH ]
// 天财：宜求财 辰 午 申 戌 子 寅 辰 午 申 戌 子 寅
// thi lệ: chánh thất khóa long khứ, nhị bát kị mã tẩu, tam cửu thính viên (vượn) khiếu,
//   tứ thập hiềm khuyển ẩu, ngũ thập nhất thử ngâm, lục thập nhị hổ hống
//   [ thìn ngọ thân tuất tý dần thìn ngọ thân tuất tý dần ]
// Kim quỹ hoàng đạo: phúc đức tinh, nguyệt tiên tinh, lợi thích đạo dụng sự, hôn giả nữ tử dụng sự, cát.
// Kim Quỹ nghi tu trạch, tạo trạch, đính hôn, giá thú, cầu tự, nhập trạch, khai thị cát
// Thiên Tài nghi tác thương khố, khai điếm, xuất hành, di tỉ, điền cơ, tạo táng ***
export function kimQuy(t, nn) {
  // t (tiết)
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 7:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
    case 2:
    case 8:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
    case 3:
    case 9:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 4:
    case 10:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
    case 5:
    case 11:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 6:
    case 12:
      if (chi == CHI[2]) k = 1;
      break; // Dần
  }
  return k;
}

// Thiên Đức Hoàng Đạo 天德黃道 =  Bảo Quang 寶光 (cũng còn gọi là Bửu Quang) = Địa Tài Tinh 地財星
// thi lệ:  chánh thất xà đương lộ, nhị bát dương quy sạn, tam cửu kim kê xướng,
//   tứ thập dã trư thương, ngũ thập nhất ngưu tẩu, lục thập nhị thỏ hoàn
// Thiên Đức Hoàng Đạo: bảo quang tinh, thiên đức tinh, kì thời đại quách, tác sự hữu thành,
// lợi hữu du vãng, xuất hành cát, tu tác bách sự cát
// Địa Tài nghi nhập tài, bách sự nghi dụng
export function thienDucHD(t, nn) {
  // t (tiết)
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 7:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 2:
    case 8:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 3:
    case 9:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
    case 4:
    case 10:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 5:
    case 11:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 6:
    case 12:
      if (chi == CHI[3]) k = 1;
      break; // Mão
  }
  return k;
}

// Ngọc Đường Hoàng Đạo (玉堂黃道)
// Ngọc Đường Hoàng Đạo: thiếu vi tinh, thiên khai tinh, bách sự cát, cầu sự thành, xuất hành hữu tài,
// nghi tu trạch, tạo trạch, an sàng, khai thương, tác táo, nhập trạch cát.
export function ngocDuong(t, nn) {
  // t (tiết)
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 7:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 2:
    case 8:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
    case 3:
    case 9:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 4:
    case 10:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 5:
    case 11:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 6:
    case 12:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
  }
  return k;
}

// Tư Mệnh Hoàng Đạo 司命黃道 = Dương Đức 陽德
// Tư Mệnh Hoàng Đạo: phượng liễn tinh, nguyệt tiên tinh, thử thời tòng dần chí thân thời dụng sự đại cát,
// tòng dậu chí sửu thì hữu sự bất cát, tức bạch thiên cát, vãn thượng bất lợi
// thi lệ: chánh thất ngộ tuất nhị bát tý, tam cửu dần tứ thập thìn khuy, ngũ thập nhất nguyệt ngọ đoan đích, lục thập nhị nguyệt thân vô nghi
// Tư Mệnh nghi khởi tạo, tu tác, tu táo, tạo táo, tự táo, thụ phong cát lợi.
//   với dương đức nghi tạo tác, giá thú, thượng quan, nhập trạch, xuất hành
// dương đức nghi thi ân huệ, tuất cô quỳnh (giúp cô nhi), hành huệ ái, tuyết oan uổng, hoãn hình ngục,
//   nghi giá thú, đính hôn, khai thị, nhập trạch, tạo táng cát
export function tuMenh(t, nn) {
  // t (tiết)
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 7:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
    case 2:
    case 8:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 3:
    case 9:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 4:
    case 10:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
    case 5:
    case 11:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
    case 6:
    case 12:
      if (chi == CHI[8]) k = 1;
      break; // Thân
  }
  return k;
}

// Lục Xà [ no ref *** ]
//
export function lucXa(t, nn) {
  // t (tiết)
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
    case 2:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 3:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 4:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 5:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 6:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 7:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
    case 8:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
    case 9:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 10:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 11:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
    case 12:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
  }
  return k;
}

// Minh Phệ 鳴吠 [ DGTNH ]
//   thần táng ngũ sinh
// phá thổ, thành phục, trừ phục, an táng, bàng phụ táng
export function minhPhe(nn) {
  // nn: lunar.dd
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;

  if (can == CAN[6] && chi == CHI[6]) k = 1; // Canh Ngọ
  else if (can == CAN[8] && chi == CHI[8]) k = 1; // Nhâm Thân
  else if (can == CAN[9] && chi == CHI[9]) k = 1; // Quí Dậu
  else if (can == CAN[8] && chi == CHI[6]) k = 1; // Nhâm Ngọ
  else if (can == CAN[0] && chi == CHI[8]) k = 1; // Giáp Thân
  else if (can == CAN[1] && chi == CHI[9]) k = 1; // Ất Dậu
  else if (can == CAN[6] && chi == CHI[2]) k = 1; // Canh Dần
  else if (can == CAN[2] && chi == CHI[8]) k = 1; // Bính Thân
  else if (can == CAN[3] && chi == CHI[9]) k = 1; // Đinh Dậu
  else if (can == CAN[8] && chi == CHI[2]) k = 1; // Nhâm Dần
  else if (can == CAN[2] && chi == CHI[6]) k = 1; // Bính Ngọ
  else if (can == CAN[5] && chi == CHI[9]) k = 1; // Kỷ Dậu
  else if (can == CAN[6] && chi == CHI[8]) k = 1; // Canh Thân
  else if (can == CAN[7] && chi == CHI[9]) k = 1; // Tân Dậu

  return k;
}

// Minh Phệ Đối 鳴吠對 [ DGTNH ]
// phá thổ, khải toản, tu phần, trảm thảo, an táng
export function minhPheDoi(nn) {
  // nn: lunar.dd
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;

  if (can == CAN[2] && chi == CHI[2]) k = 1; // Bính Dần
  else if (can == CAN[3] && chi == CHI[3]) k = 1; // Đinh Mão
  else if (can == CAN[2] && chi == CHI[0]) k = 1; // Bính Tý
  else if (can == CAN[7] && chi == CHI[7]) k = 1; // Tân Mão
  else if (can == CAN[0] && chi == CHI[6]) k = 1; // Giáp Ngọ
  else if (can == CAN[6] && chi == CHI[0]) k = 1; // Canh Tý
  else if (can == CAN[9] && chi == CHI[3]) k = 1; // Quí Mão
  else if (can == CAN[8] && chi == CHI[0]) k = 1; // Nhâm Tý
  else if (can == CAN[0] && chi == CHI[2]) k = 1; // Giáp Dần
  else if (can == CAN[1] && chi == CHI[3]) k = 1; // Ất Mão

  return k;
}

// Vương Nhật 王日 = Phúc Hậu 福厚
// nghi: ban chiếu, đàm ân, tứ xá, thi ân phong bái, chiếu mệnh công khanh, chiêu hiền, cử chánh trực, thi ân huệ, tuyên chánh sự,
// hành huệ ái, tuyết oan uổng, hoãn hình ngục, thưởng hạ, yến hội, hành hạnh, khiển sử, an phủ biên cảnh, tuyển tương huấn binh,
// thượng quan phó nhâm, lâm chánh thân dân, tài chế
export function vuongNhat(T, nn) {
  // T (0...3) & nn: lunar.dd
  var chi = DiaChi(nn);
  var k = 0;

  switch (T) {
    case 0:
      if (chi == CHI[2]) k = 1;
      break; // Xuân: Dần
    case 1:
      if (chi == CHI[5]) k = 1;
      break; // Hạ: Tỵ
    case 2:
      if (chi == CHI[8]) k = 1;
      break; // Thu: Thân
    case 3:
      if (chi == CHI[11]) k = 1;
      break; // Đông: Hợi
  }

  return k;
}

// Vượng Nhật 旺日 [ Res ]
//  xuân giáp ất dần mão, hạ bính đinh tị ngọ, thu canh tân thân dậu, đông nhâm quý hợi tý
// bách sự cát, nghi khai trương, khởi tạo, giá thú
export function vuongNhat100(T, nn) {
  // T (0...3) & nn: lunar.dd
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;

  switch (T) {
    case 0:
      if (can == CAN[0] || can == CAN[1]) k = 1;
      else if (chi == CHI[2] || chi == CHI[3]) k = 1; // xuân giáp ất dần mão
      break;
    case 1:
      if (can == CAN[2] || can == CAN[3]) k = 1;
      else if (chi == CHI[5] || chi == CHI[6]) k = 1; // hạ bính đinh tị ngọ
      break;
    case 2:
      if (can == CAN[6] || can == CAN[7]) k = 1;
      else if (chi == CHI[8] || chi == CHI[9]) k = 1; // thu canh tân thân dậu
      break;
    case 3:
      if (can == CAN[6] || can == CAN[7]) k = 1;
      else if (chi == CHI[0] || chi == CHI[11]) k = 1; // đông nhâm quý hợi tý
      break;
  }

  return k;
}

// Quan Nhật 官日 = Thiên Quả 天寡 (hung nhật) [ DGTNH ]
// thượng quan phó nhâm, lâm chánh thân dân, tài chế
// nghi thụ phong, thượng quan phó nhậm, lâm chánh thân dân (bách sự bất nghi)
// tác táo.
export function quanNhat(T, nn) {
  // T (0...3) & nn: lunar.dd
  var chi = DiaChi(nn);
  var k = 0;

  switch (T) {
    case 0:
      if (chi == CHI[3]) k = 1;
      break; // Xuân Mão
    case 1:
      if (chi == CHI[6]) k = 1;
      break; // Hạ Ngọ
    case 2:
      if (chi == CHI[9]) k = 1;
      break; // Thu Dậu
    case 3:
      if (chi == CHI[1]) k = 1;
      break; // Đông Tý
  }

  return k;
}

// Thủ Nhật 守日  [ DGTNH ]
// lịch lệ dĩ xuân dậu, hạ tý, thu mão, đông ngọ, vi thủ nhật
// nghi thụ phong, thượng quan phó nhâm, lâm chánh thân dân, an phủ biên cảnh.
export function thuNhat(T, nn) {
  // T (0...3) & nn: lunar.dd
  var chi = DiaChi(nn);
  var k = 0;

  switch (T) {
    case 0:
      if (chi == CHI[9]) k = 1;
      break; // Xuân Dậu
    case 1:
      if (chi == CHI[1]) k = 1;
      break; // Hạ Tý
    case 2:
      if (chi == CHI[3]) k = 1;
      break; // Thu Mão
    case 3:
      if (chi == CHI[6]) k = 1;
      break; // Đông Ngọ
  }

  return k;
}

// Tướng Nhật 相日 [ DGTNH ]
// lịch lệ viết: xuân tị, hạ thân, thu hợi, đông dần
// nghi thụ phong, thượng quan phó nhậm, lâm chánh thân dân, giá thú
export function tuongNhat(T, nn) {
  // T (0...3) & nn: lunar.dd
  var chi = DiaChi(nn);
  var k = 0;

  switch (T) {
    case 0:
      if (chi == CHI[5]) k = 1;
      break; // Xuân Tỵ
    case 1:
      if (chi == CHI[8]) k = 1;
      break; // Hạ Thân
    case 2:
      if (chi == CHI[11]) k = 1;
      break; // Thu Hợi
    case 3:
      if (chi == CHI[2]) k = 1;
      break; // Đông Dần
  }

  return k;
}

// Dân Nhật 民日 [ DGTNH ]
// lịch lệ: xuân ngọ, hạ dậu, thu tý, đông mão
// nghi yến hội, kết hôn nhân, nạp thải vấn danh, tiến nhân khẩu, bàn di, khai thị, lập khoán, giao dịch, nạp tài, tài chủng, mục dưỡng, nạp súc
export function danNhat(T, nn) {
  // T (0...3) & nn: lunar.dd
  var chi = DiaChi(nn);
  var k = 0;

  switch (T) {
    case 0:
      if (chi == CHI[6]) k = 1;
      break; // Xuân Ngọ
    case 1:
      if (chi == CHI[9]) k = 1;
      break; // Hạ Dậu
    case 2:
      if (chi == CHI[0]) k = 1;
      break; // Thu Tý
    case 3:
      if (chi == CHI[3]) k = 1;
      break; // Đông Mão
  }

  return k;
}

// Cát Kỳ 吉期 = trực Trừ [ DGTNH ]
//   mão thìn tị ngọ mùi thân dậu tuất hợi tý sửu dần
// nghi xuất quân, hành sư, công thành trại, hưng điếu phạt, hội nhân thân
export function catKyNhat(t, truc, nn) {
  // t (tiết)
  var tru = CHI[(t + 2) % 12];
  var chi = DiaChi(nn);
  var k = 0;

  if ('Trừ' == TRUC12[truc] && chi == tru) k = 1;

  return k;
}

// Phúc Đức 福德 = trực Mãn (đồng hành) = Thiên Phú 天富 = Thiên Vu 天巫 = Thiên Cẩu 天狗 (NHK, DGTNH)
//   thìn tị ngọ mùi thân dậu tuất hợi tý sửu dần mão
// nghi cầu phúc nguyện, tu cung thất, hiến phong chương, hợp dược, thỉnh y
// Thiên Phú: nghi khai điếm, tạo thương khố, thượng quan, xuất tài, nạp lễ, cầu tài, tài y, hợp trướng
// Thiên Vu: nghi hợp dược, thỉnh y, tự quỷ thần, cầu phúc nguyện
// Thiên Cẩu: kị giá thú, sanh sản
export function phucDuc(t, truc, nn) {
  // t (tiết)
  var man = CHI[(t + 3) % 12];
  var chi = DiaChi(nn);
  var k = 0;

  if ('Mãn' == TRUC12[truc] && chi == man) k = 1;

  return k;
}

// Thời Âm 時陰 = trực Định 定 = Quan Phù 官符  (kỵ nhật) = Tử Khí 死氣 (kỵ nhật)
//   thường cư nguyệt kiến tiền tứ thần (trực Định)
//   chánh nguyệt khởi ngọ thuận hành thập nhị thần
// nghi vận mưu toán, họa kế sách, mục tử tôn, hội thân hữu
// bách sự nghi dụng
export function thoiAm(t, truc, nn) {
  // t (tiết)
  var dinh = CHI[(t + 5) % 12];
  var chi = DiaChi(nn);
  var k = 0;

  if ('Định' == TRUC12[truc] && chi == dinh) k = 1;

  return k;
}

// Chi Đức 枝德 [ DGTNH ] = Tiểu Hao 小耗 (hung tinh)
//    chánh nguyệt tại mùi, thuận hành thập nhị thần
// bách sự nghi dụng
export function chiDuc(t, truc, nn) {
  // t (tiết)
  var chap = CHI[(t + 6) % 12];
  var chi = DiaChi(nn);
  var k = 0;

  if ('Chấp' == TRUC12[truc] && chi == chap) k = 1;

  return k;
}

// Thiên Y 天醫 = Thiên Hỷ 天喜 = trực Thành 成 = Thiên Hùng 天雄 (hung nhật)
//    chánh nguyệt khởi tuất, thuận hành thập nhị thần
// thiên y nhật khả dĩ cầu y, trị bệnh, phục dược, châm cứu
// thiên hỉ: bách sự nghi dụng
// thiên hùng kị giá thú
export function thienY(t, truc, nn) {
  // t (tiết)
  var thanh = CHI[(t + 9) % 12];
  var chi = DiaChi(nn);
  var k = 0;

  if ('Thành' == TRUC12[truc] && chi == thanh) k = 1;

  return k;
}

// Thời Dương 時陽 = Sinh Khí 生氣 = trực Khai 開
//   thường cư nguyệt kiến hậu nhị thần: Tý Sửu Dần Mão Thìn Tỵ Ngọ Mùi Thân Dậu Tuất Hợi
// Nghi tế tự, kì phúc, cầu tự, thượng sách, tiến biểu chương, ban chiếu, đàm ân, tứ xá, thi ân phong bái, chiêu hiền, cử chánh trực, thi ân huệ, tuất cô quỳnh, tuyên chánh sự, hành huệ ái, tuyết oan uổng, hoãn hình ngục, khánh tứ, thưởng hạ, yến hội, nhập học, hành hạnh, khiển sử, thượng quan, phó nhậm, lâm chánh thân dân, bàn di, giải trừ, cầu y, liệu bệnh, tài chế, tu cung thất, thiện thành quách, hưng tạo, động thổ, thụ trụ, thượng lương, khai thị, tu trí sản thất, khai cừ, xuyên tỉnh, an đối ngại, tài chủng, mục dưỡng
export function thoiDuong(t, truc, nn) {
  // t (tiết)
  var khai = CHI[(t + 11) % 12];
  var chi = DiaChi(nn);
  var k = 0;

  if ('Khai' == TRUC12[truc] && chi == khai) k = 1;

  return k;
}

// Thiên Mã 天馬 = Bạch Hổ 白虎 (hung tinh) [ DGTNH ]
// Thi lệ: chánh nguyệt khởi ngọ, thuận hành lục dương thần
// nghi bái công khanh, trạch hiền lương, tuyên bố chánh sự, viễn hành, xuất chinh
// nghi xuất hành, di cư, nhập trạch, khai thị, cầu tài, doanh thương cát
export function thienMa(t, nn) {
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

// Thiên Nhạc 天岳 = Minh Tinh 明星 (DGTNH-10 天岳者，正月起申，順行六陽辰。)
// 明星：宜求名、拜师学艺、赴任 申 戌 子 寅 辰 午 申 戌 子 寅 辰 午
// Thi lệ: chánh nguyệt khởi thân, thuận hành lục dương thần
// nghi tạo táng, hưng tu; bách sự nghi dụng
export function thienNhac(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 7:
      if (chi == CHI[4]) k = 1;
      break; // Thân
    case 2:
    case 8:
      if (chi == CHI[6]) k = 1;
      break; // Tuất
    case 3:
    case 9:
      if (chi == CHI[8]) k = 1;
      break; // Tý
    case 4:
    case 10:
      if (chi == CHI[10]) k = 1;
      break; // Dần
    case 5:
    case 11:
      if (chi == CHI[0]) k = 1;
      break; // Thìn
    case 6:
    case 12:
      if (chi == CHI[2]) k = 1;
      break; // Ngọ
  }
  return k;
}

// Yếu Yên ( Yếu An) 要安 [ DGTNH ]
//   Chánh nguyệt dần, nhị nguyệt thân, tam nguyệt mão, tứ nguyệt dậu, ngũ nguyệt thìn, lục nguyệt tuất, thất nguyệt tị, bát nguyệt hợi, cửu nguyệt ngọ, thập nguyệt tý, thập nhất nguyệt mùi, thập nhị nguyệt sửu
//  dần, thân, mão, dậu, thìn, tuất, tị, hợi, ngọ, tý, mùi, sửu
// nghi khởi tạo, tác sự, cầu tài, thượng quan, di cư, cập giá thú, an táng, xuất hành, liệu bệnh, bách sự đại cát
export function yeuYen(t, nn) {
  // t (tiết)
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 2:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 3:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 4:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
    case 5:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
    case 6:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
    case 7:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 8:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 9:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
    case 10:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 11:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 12:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
  }
  return k;
}

// Ngọc Vũ 玉宇 [ DGTNH, Res *** ]; 'cổ kim đồ thư tập thành' gọi là Ngọc Đường
//  mão, dậu, thìn, tuất, tị, hợi, ngọ, tý, mùi, sửu, thân, dần
// nghi tu cung khuyết, thiện đình thai, kết hôn nhân, hội tân khách
// nghi tu trạch, tạo trạch, di đồ, nhập trạch; bách sự cát lợi.
export function ngocVu(t, nn) {
  // t (tiết)
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 2:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
    case 3:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
    case 4:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
    case 5:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 6:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 7:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
    case 8:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 9:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 10:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 11:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 12:
      if (chi == CHI[2]) k = 1;
      break; // Dần
  }
  return k;
}

// Kim Đường 金堂 [ DGTNH, Res *** ]
// lịch lệ viết: chánh nguyệt thìn, nhị nguyệt tuất, tam nguyệt tị, tứ nguyệt hợi, ngũ nguyệt ngọ, lục nguyệt tý, thất nguyệt mùi, bát nguyệt sửu, cửu nguyệt thân, thập nguyệt dần, thập nhất nguyệt dậu, thập nhị nguyệt mão
//  thìn, tuất, tị, hợi, ngọ, tý, mùi, sửu, thân, dần, dậu, mão
// nghi doanh kiến cung thất, hưng tạo tu trúc, tu trạch
// nghi tu trạch, tạo trạch, di đồ, nhập trạch; bách sự cát lợi
export function kimDuong(t, nn) {
  // t (tiết)
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
    case 2:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
    case 3:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 4:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 5:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
    case 6:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 7:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 8:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 9:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 10:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 11:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
    case 12:
      if (chi == CHI[3]) k = 1;
      break; // Mão
  }
  return k;
}

// Kính An 敬安 = Kính Tâm 敬心 [ DGTNH ]
// lịch lệ viết: chánh nguyệt mùi, nhị nguyệt sửu, tam nguyệt thân, tứ nguyệt dần, ngũ nguyệt dậu, lục nguyệt mão, thất nguyệt tuất, bát nguyệt thìn, cửu nguyệt hợi, thập nguyệt tị, thập nhất nguyệt tý, thập nhị nguyệt ngọ
// nghi an thần, mục thân tộc, tự tôn ti, nạp lễ nghi, hành khánh tứ
// nghi tế tự, tự thần, trai tiếu (ăn chay), kì phúc, hứa nguyện đại cát
export function kinhAn(t, nn) {
  // t (tiết)
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 2:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 3:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 4:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 5:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
    case 6:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 7:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
    case 8:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
    case 9:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 10:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 11:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 12:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
  }
  return k;
}

// Phổ Hộ 普護 [ DGTNH ]
// lịch lệ viết: chánh nguyệt thân, nhị nguyệt dần, tam nguyệt dậu, tứ nguyệt mão, ngũ nguyệt tuất, lục nguyệt thìn, thất nguyệt hợi, bát nguyệt tị, cửu nguyệt tý, thập nguyệt ngọ, thập nhất nguyệt sửu, thập nhị nguyệt mùi
// thân, dần, dậu, mão, tuất, thìn, hợi, tị, tý, ngọ, sửu, mùi
// nghi tế tự, tế tự, kì phúc, đảo từ (cầu cúng, cúng tế), tầm y tị bệnh
export function phoHo(t, nn) {
  // t (tiết)
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 2:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 3:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
    case 4:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 5:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
    case 6:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
    case 7:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 8:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 9:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 10:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
    case 11:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 12:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
  }
  return k;
}

// Phúc Sinh 福生 [ DGTNH ]
// lịch lệ viết: chánh nguyệt dậu, nhị nguyệt mão, tam nguyệt tuất, tứ nguyệt thìn, ngũ nguyệt hợi, lục nguyệt tị, thất nguyệt tý, bát nguyệt ngọ, cửu nguyệt sửu, thập nguyệt mùi, thập nhất nguyệt dần, thập nhị nguyệt thân
// dậu, mão, tuất, thìn, hợi, tị, tý, ngọ, sửu, mùi, dần, thân
// nghi tế tự, kì phúc, cầu ân, tự thần trí tế
export function phucSinh(t, nn) {
  // t (tiết)
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
    case 2:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 3:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
    case 4:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
    case 5:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 6:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 7:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 8:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
    case 9:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 10:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 11:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 12:
      if (chi == CHI[8]) k = 1;
      break; // Thân
  }
  return k;
}

// Thánh Tâm 聖心 [ DGTNH ]
// lịch lệ viết: chánh nguyệt hợi, nhị nguyệt tị, tam nguyệt tý, tứ nguyệt ngọ, ngũ nguyệt sửu, lục nguyệt mùi, thất nguyệt dần, bát nguyệt thân, cửu nguyệt mão, thập nguyệt dậu, thập nhất nguyệt thìn, thập nhị nguyệt tuất
//  hợi, tị, tý, ngọ, sửu, mùi, dần, thân, mão, dậu, thìn, tuất
// nghi tế tự, kì phúc, thượng biểu chương, hành ân trạch, doanh bách sự
export function thanhTam(t, nn) {
  // t (tiết)
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 2:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 3:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 4:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
    case 5:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 6:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 7:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 8:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 9:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 10:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
    case 11:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
    case 12:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
  }
  return k;
}

// Ích Hậu 益後 [ DGTN ]
// lịch lệ viết: chánh nguyệt tý, nhị nguyệt ngọ, tam nguyệt sửu, tứ nguyệt mùi, ngũ nguyệt dần, lục nguyệt thân, thất nguyệt mão, bát nguyệt dậu, cửu nguyệt thìn, thập nguyệt tuất, thập nhất nguyệt tị, thập nhị nguyệt hợi
//  tý, ngọ, sửu, mùi, dần, thân, mão, dậu, thìn, tuất, tị, hợi
// nghi tế tự, kì phúc, cầu tự, tạo trạch xá, trúc viên tường, hành giá thú, an sản thất
export function ichHau(t, nn) {
  // t (tiết)
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 2:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
    case 3:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 4:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 5:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 6:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 7:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 8:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
    case 9:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
    case 10:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
    case 11:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 12:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
  }
  return k;
}

// Tục Thế 續世 = Huyết Kị 血忌 (hung tinh) [ DGTNH ]
// lịch lệ: sửu mùi dần thân mão dậu thìn tuất tị hợi ngọ tý
// nghi kết hôn nhân, lập tự, mục thân tộc, tự thần kì, cầu tự tục
export function tucThe(t, nn) {
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

// Thiên Nguyện 天願 [ DGTNH-12,28 ]
// DGTNH-28: ất hợi giáp tuất ất dậu bính thân đinh mùi mậu ngọ kỷ tị canh thìn tân mão nhâm dần quý sửu giáp tý
// nghi tế tự, kì phúc, cầu tự, trai tiếu (chay), giá thú, đính hôn, hưng tu, tu phần, tạo táng cát
export function thienNguyen(t, nn) {
  // nn: lunar.dd
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;

  switch (
    t // lịch lệ:
  ) {
    case 1:
      if (can == CAN[1] && chi == CHI[11]) k = 1;
      break; // ất hợi
    case 2:
      if (can == CAN[0] && chi == CHI[10]) k = 1;
      break; // Giáp Tuất
    case 3:
      if (can == CAN[1] && chi == CHI[9]) k = 1;
      break; // Ất Dậu
    case 4:
      if (can == CAN[2] && chi == CHI[8]) k = 1;
      break; // bính thân
    case 5:
      if (can == CAN[3] && chi == CHI[7]) k = 1;
      break; // đinh mùi
    case 6:
      if (can == CAN[4] && chi == CHI[6]) k = 1;
      break; // Mậu Ngọ
    case 7:
      if (can == CAN[5] && chi == CHI[5]) k = 1;
      break; // kỷ tị
    case 8:
      if (can == CAN[6] && chi == CHI[4]) k = 1;
      break; // canh thìn
    case 9:
      if (can == CAN[7] && chi == CHI[3]) k = 1;
      break; // Tân Mão
    case 10:
      if (can == CAN[8] && chi == CHI[2]) k = 1;
      break; // nhâm dần
    case 11:
      if (can == CAN[9] && chi == CHI[1]) k = 1;
      break; // quý sửu
    case 12:
      if (can == CAN[0] && chi == CHI[0]) k = 1;
      break; // giáp tý
  }
  return k;
}

// Lục Nghi 六儀 [ DGTNH ] = Chiêu Diêu 招搖 (hung tinh) = yếm đối 厭對
// nghi mục dưỡng, sanh tài, tài thực thụ mộc, kết thân nạp lễ, thị sự lâm quan
// bách sự nghi dụng
export function lucNghi(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
    case 2:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 3:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 4:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 5:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 6:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 7:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
    case 8:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
    case 9:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 10:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 11:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
    case 12:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
  }
  return k;
}

// Thiên Thương (thảng) 天倉 [ DGTNH ]
//    chánh nguyệt khởi dần, nghịch hành thập nhị thần
//  thi lệ: Chánh dần nhị sửu tam phùng tý, tứ hợi ngũ tuất lục dậu thị, thất thân bát mùi cửu ngọ tầm, thập tị thập nhất thìn tương nghi, thập nhị nguyệt trung tầm mão nhật, tu thương tác khố tối kham vi
// nghi tạo thương khố, nạp tài
export function thienThuong(t, nn) {
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
      if (chi == CHI[2]) k = 1;
      break; // Dần
    case 2:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 3:
      if (chi == CHI[0]) k = 1;
      break; // Tý
    case 4:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 5:
      if (chi == CHI[10]) k = 1;
      break; // Tuất
    case 6:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
    case 7:
      if (chi == CHI[8]) k = 1;
      break; // Thân
    case 8:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 9:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
    case 10:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 11:
      if (chi == CHI[4]) k = 1;
      break; // Thìn
    case 12:
      if (chi == CHI[3]) k = 1;
      break; // Mão
  }
  return k;
}

// Bất Tướng 不將 [ DGTNH-13 ]
// nghi giá thú, đính hôn
export function batTuong(t, nn) {
  // nn: lunar.dd
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;

  switch (t) {
    case 1:
      if (can == CAN[7] && chi == CHI[11]) k = 1; // tân hợi
      else if (can == CAN[7] && chi == CHI[1]) k = 1; // tân sửu
      else if (can == CAN[7] && chi == CHI[2]) k = 1; // tân mão
      else if (can == CAN[6] && chi == CHI[0]) k = 1; // canh tý
      else if (can == CAN[6] && chi == CHI[2]) k = 1; // canh dần
      else if (can == CAN[5] && chi == CHI[11]) k = 1; // kỷ hợi
      else if (can == CAN[5] && chi == CHI[1]) k = 1; // kỷ sửu
      else if (can == CAN[5] && chi == CHI[3]) k = 1; // kỷ mão
      else if (can == CAN[3] && chi == CHI[11]) k = 1; // đinh hợi
      else if (can == CAN[3] && chi == CHI[1]) k = 1; // đinh sửu
      else if (can == CAN[3] && chi == CHI[3]) k = 1; // đinh mão
      else if (can == CAN[2] && chi == CHI[0]) k = 1; // bính tý
      else if (can == CAN[2] && chi == CHI[2]) k = 1; // bính dần
      break;
    case 2:
      if (can == CAN[6] && chi == CHI[10]) k = 1; // canh tuất
      else if (can == CAN[6] && chi == CHI[0]) k = 1; // canh tý
      else if (can == CAN[6] && chi == CHI[2]) k = 1; // canh dần
      else if (can == CAN[5] && chi == CHI[11]) k = 1; // kỷ hợi
      else if (can == CAN[5] && chi == CHI[1]) k = 1; // kỷ sửu
      else if (can == CAN[3] && chi == CHI[11]) k = 1; // đinh hợi
      else if (can == CAN[3] && chi == CHI[1]) k = 1; // đinh sửu
      else if (can == CAN[2] && chi == CHI[10]) k = 1; // bính tuất
      else if (can == CAN[2] && chi == CHI[0]) k = 1; // bính tý
      else if (can == CAN[2] && chi == CHI[2]) k = 1; // bính dần
      else if (can == CAN[1] && chi == CHI[11]) k = 1; // ất hợi
      else if (can == CAN[1] && chi == CHI[1]) k = 1; // ất sửu
      break;
    case 3:
      if (can == CAN[5] && chi == CHI[9]) k = 1; // kỷ dậu
      else if (can == CAN[5] && chi == CHI[11]) k = 1; // kỷ hợi
      else if (can == CAN[5] && chi == CHI[1]) k = 1; // kỷ sửu
      else if (can == CAN[3] && chi == CHI[9]) k = 1; // đinh dậu
      else if (can == CAN[3] && chi == CHI[11]) k = 1; // đinh hợi
      else if (can == CAN[3] && chi == CHI[1]) k = 1; // đinh sửu
      else if (can == CAN[2] && chi == CHI[10]) k = 1; // bính tuất
      else if (can == CAN[2] && chi == CHI[0]) k = 1; // bính tý
      else if (can == CAN[1] && chi == CHI[9]) k = 1; // ất dậu
      else if (can == CAN[1] && chi == CHI[11]) k = 1; // ất hợi
      else if (can == CAN[1] && chi == CHI[1]) k = 1; // ất sửu
      else if (can == CAN[0] && chi == CHI[10]) k = 1; // giáp tuất
      else if (can == CAN[0] && chi == CHI[0]) k = 1; // giáp tý
      break;
    case 4:
      if (can == CAN[3] && chi == CHI[9]) k = 1; // đinh dậu
      else if (can == CAN[3] && chi == CHI[11]) k = 1; // đinh hợi
      else if (can == CAN[2] && chi == CHI[8]) k = 1; // bính thân
      else if (can == CAN[2] && chi == CHI[10]) k = 1; // bính tuất
      else if (can == CAN[2] && chi == CHI[0]) k = 1; // bính tý
      else if (can == CAN[1] && chi == CHI[9]) k = 1; // ất dậu
      else if (can == CAN[1] && chi == CHI[11]) k = 1; // ất hợi
      else if (can == CAN[0] && chi == CHI[8]) k = 1; // giáp thân
      else if (can == CAN[0] && chi == CHI[10]) k = 1; // giáp tuất
      else if (can == CAN[0] && chi == CHI[0]) k = 1; // giáp tý
      else if (can == CAN[4] && chi == CHI[8]) k = 1; // mậu thân
      else if (can == CAN[4] && chi == CHI[10]) k = 1; // mậu tuất
      else if (can == CAN[4] && chi == CHI[0]) k = 1; // mậu tý
      break;
    case 5:
      if (can == CAN[2] && chi == CHI[8]) k = 1; // bính thân
      else if (can == CAN[2] && chi == CHI[10]) k = 1; // bính tuất
      else if (can == CAN[1] && chi == CHI[7]) k = 1; // ất mùi
      else if (can == CAN[1] && chi == CHI[9]) k = 1; // ất dậu
      else if (can == CAN[1] && chi == CHI[11]) k = 1; // ất hợi
      else if (can == CAN[0] && chi == CHI[8]) k = 1; // giáp thân
      else if (can == CAN[0] && chi == CHI[10]) k = 1; // giáp tuất
      else if (can == CAN[4] && chi == CHI[8]) k = 1; // mậu thân
      else if (can == CAN[4] && chi == CHI[10]) k = 1; // mậu tuất
      else if (can == CAN[4] && chi == CHI[0]) k = 1; // mậu tý
      else if (can == CAN[9] && chi == CHI[7]) k = 1; // quý mùi
      else if (can == CAN[9] && chi == CHI[9]) k = 1; // quý dậu
      else if (can == CAN[9] && chi == CHI[11]) k = 1; // quý hợi
      break;
    case 6:
      if (can == CAN[1] && chi == CHI[7]) k = 1; // ất mùi
      else if (can == CAN[1] && chi == CHI[9]) k = 1; // ất dậu
      else if (can == CAN[0] && chi == CHI[6]) k = 1; // giáp ngọ
      else if (can == CAN[0] && chi == CHI[8]) k = 1; // giáp thân
      else if (can == CAN[0] && chi == CHI[10]) k = 1; // giáp tuất
      else if (can == CAN[4] && chi == CHI[6]) k = 1; // mậu ngọ
      else if (can == CAN[4] && chi == CHI[8]) k = 1; // mậu thân
      else if (can == CAN[4] && chi == CHI[10]) k = 1; // mậu tuất
      else if (can == CAN[9] && chi == CHI[7]) k = 1; // quý mùi
      else if (can == CAN[9] && chi == CHI[9]) k = 1; // quý dậu
      else if (can == CAN[8] && chi == CHI[6]) k = 1; // nhâm ngọ
      else if (can == CAN[8] && chi == CHI[8]) k = 1; // nhâm thân
      else if (can == CAN[8] && chi == CHI[10]) k = 1; // nhâm tuất
      break;
    case 7:
      if (can == CAN[1] && chi == CHI[5]) k = 1; // ất tị
      else if (can == CAN[1] && chi == CHI[7]) k = 1; // ất mùi
      else if (can == CAN[1] && chi == CHI[9]) k = 1; // ất dậu
      else if (can == CAN[0] && chi == CHI[6]) k = 1; // giáp ngọ
      else if (can == CAN[0] && chi == CHI[8]) k = 1; // giáp thân
      else if (can == CAN[4] && chi == CHI[6]) k = 1; // mậu ngọ
      else if (can == CAN[4] && chi == CHI[8]) k = 1; // mậu thân
      else if (can == CAN[9] && chi == CHI[5]) k = 1; // quý tị
      else if (can == CAN[9] && chi == CHI[7]) k = 1; // quý mùi
      else if (can == CAN[9] && chi == CHI[9]) k = 1; // quý dậu
      else if (can == CAN[8] && chi == CHI[6]) k = 1; // nhâm ngọ
      else if (can == CAN[8] && chi == CHI[8]) k = 1; // nhâm thân
      break;
    case 8:
      if (can == CAN[0] && chi == CHI[4]) k = 1; // giáp thìn
      else if (can == CAN[0] && chi == CHI[6]) k = 1; // giáp ngọ
      else if (can == CAN[0] && chi == CHI[8]) k = 1; // giáp thân
      else if (can == CAN[4] && chi == CHI[4]) k = 1; // mậu thìn
      else if (can == CAN[4] && chi == CHI[6]) k = 1; // mậu ngọ
      else if (can == CAN[4] && chi == CHI[8]) k = 1; // mậu thân
      else if (can == CAN[9] && chi == CHI[5]) k = 1; // quý tị
      else if (can == CAN[9] && chi == CHI[7]) k = 1; // quý mùi
      else if (can == CAN[8] && chi == CHI[4]) k = 1; // nhâm thìn
      else if (can == CAN[8] && chi == CHI[6]) k = 1; // nhâm ngọ
      else if (can == CAN[8] && chi == CHI[8]) k = 1; // nhâm thân
      else if (can == CAN[7] && chi == CHI[5]) k = 1; // tân tị
      else if (can == CAN[7] && chi == CHI[7]) k = 1; // tân mùi
      break;
    case 9:
      if (can == CAN[4] && chi == CHI[4]) k = 1; // mậu thìn
      else if (can == CAN[4] && chi == CHI[6]) k = 1; // mậu ngọ
      else if (can == CAN[9] && chi == CHI[3]) k = 1; // quý mão
      else if (can == CAN[9] && chi == CHI[5]) k = 1; // quý tị
      else if (can == CAN[9] && chi == CHI[7]) k = 1; // quý mùi
      else if (can == CAN[8] && chi == CHI[4]) k = 1; // nhâm thìn
      else if (can == CAN[8] && chi == CHI[6]) k = 1; // nhâm ngọ
      else if (can == CAN[7] && chi == CHI[3]) k = 1; // tân mão
      else if (can == CAN[7] && chi == CHI[5]) k = 1; // tân tị
      else if (can == CAN[7] && chi == CHI[7]) k = 1; // tân mùi
      else if (can == CAN[6] && chi == CHI[4]) k = 1; // canh thìn
      else if (can == CAN[6] && chi == CHI[6]) k = 1; // canh ngọ
      break;
    case 10:
      if (can == CAN[9] && chi == CHI[3]) k = 1; // quý mão
      else if (can == CAN[9] && chi == CHI[5]) k = 1; // quý tị
      else if (can == CAN[8] && chi == CHI[2]) k = 1; // nhâm dần
      else if (can == CAN[8] && chi == CHI[4]) k = 1; // nhâm thìn
      else if (can == CAN[8] && chi == CHI[6]) k = 1; // nhâm ngọ
      else if (can == CAN[7] && chi == CHI[3]) k = 1; // tân mão
      else if (can == CAN[7] && chi == CHI[5]) k = 1; // tân tị
      else if (can == CAN[6] && chi == CHI[2]) k = 1; // canh dần
      else if (can == CAN[6] && chi == CHI[4]) k = 1; // canh thìn
      else if (can == CAN[6] && chi == CHI[6]) k = 1; // canh ngọ
      else if (can == CAN[5] && chi == CHI[3]) k = 1; // kỷ mão
      else if (can == CAN[5] && chi == CHI[5]) k = 1; // kỷ tị
      break;
    case 11:
      if (can == CAN[8] && chi == CHI[2]) k = 1; // nhâm dần
      else if (can == CAN[8] && chi == CHI[4]) k = 1; // nhâm thìn
      else if (can == CAN[7] && chi == CHI[1]) k = 1; // tân sửu
      else if (can == CAN[7] && chi == CHI[3]) k = 1; // tân mão
      else if (can == CAN[7] && chi == CHI[5]) k = 1; // tân tị
      else if (can == CAN[6] && chi == CHI[2]) k = 1; // canh dần
      else if (can == CAN[6] && chi == CHI[4]) k = 1; // canh thìn
      else if (can == CAN[5] && chi == CHI[1]) k = 1; // kỷ sửu
      else if (can == CAN[5] && chi == CHI[3]) k = 1; // kỷ mão
      else if (can == CAN[5] && chi == CHI[5]) k = 1; // kỷ tị
      else if (can == CAN[3] && chi == CHI[1]) k = 1; // đinh sửu
      else if (can == CAN[3] && chi == CHI[3]) k = 1; // đinh mão
      else if (can == CAN[3] && chi == CHI[5]) k = 1; // đinh tị
      break;
    case 12:
      if (can == CAN[7] && chi == CHI[1]) k = 1; // tân sửu
      else if (can == CAN[7] && chi == CHI[3]) k = 1; // tân mão
      else if (can == CAN[6] && chi == CHI[0]) k = 1; // canh tý
      else if (can == CAN[6] && chi == CHI[2]) k = 1; // canh dần
      else if (can == CAN[6] && chi == CHI[4]) k = 1; // canh thìn
      else if (can == CAN[5] && chi == CHI[1]) k = 1; // kỷ sửu
      else if (can == CAN[5] && chi == CHI[3]) k = 1; // kỷ mão
      else if (can == CAN[3] && chi == CHI[1]) k = 1; // đinh sửu
      else if (can == CAN[3] && chi == CHI[3]) k = 1; // đinh mão
      else if (can == CAN[2] && chi == CHI[0]) k = 1; // bính tý
      else if (can == CAN[2] && chi == CHI[2]) k = 1; // bính dần
      else if (can == CAN[2] && chi == CHI[4]) k = 1; // bính thìn
      break;
  }
  return k;
}

// Âm Dương Đại Hội 陰陽大會 [ DGTNH-13 *** ]
// [ nghi dụng ? ]
export function amDuongDaiHoi(t, nn) {
  // nn: lunar.dd
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
      if (can == CAN[0] && chi == CHI[10]) k = 1;
      break; // giáp tuất
    case 2:
      if (can == CAN[1] && chi == CHI[9]) k = 1;
      break; // ất dậu
    case 5:
      if (can == CAN[2] && chi == CHI[6]) k = 1;
      break; // bính ngọ
    case 6:
      if (can == CAN[3] && chi == CHI[5]) k = 1;
      break; // đinh tị
    case 7:
      if (can == CAN[6] && chi == CHI[4]) k = 1;
      break; // canh thìn
    case 8:
      if (can == CAN[7] && chi == CHI[3]) k = 1;
      break; // tân mão
    case 11:
      if (can == CAN[8] && chi == CHI[0]) k = 1;
      break; // nhâm tý
    case 12:
      if (can == CAN[9] && chi == CHI[11]) k = 1;
      break; // quý hợi
  }
  return k;
}

// Nguyệt Tài 月財 [ DGTNH, Res ]
// 口诀：正七月午，二八、三九月巳，四未五十一月酉，六十二月亥。
// 月财：宜开店、出行、移徙 午 巳 巳 未 酉 亥 午 巳 巳 未 酉 亥
// thi lệ: chánh thất nguyệt ngọ, nhị bát, tam cửu nguyệt tị, tứ mùi ngũ thập nhất nguyệt dậu, lục thập nhị nguyệt hợi.
// Thi lệ: chánh ngọ nhị tị tam tị cung; tứ mùi ngũ dậu lục hợi cùng; thất ngọ bát nguyệt nhưng nguyên tị;  cửu tị thập nhất nguyệt dậu phùng; thập nhị nguyệt tắc hà xử mịch; nguyên lai hợi thượng thị chân tung.
// nghi chiêu tài, khởi tạo, khai điếm, xuất hành, di chuyển, di đồ, khai thị, khai thương, cầu tài, tạo táng cát
export function nguyetTai(t, nn) {
  // nn: lunar.dd
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 7:
      if (chi == CHI[6]) k = 1;
      break; // Ngọ
    case 2:
    case 8:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 3:
    case 9:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
    case 4:
    case 10:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 5:
    case 11:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
    case 6:
    case 12:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
  }
  return k;
}

// Minh Tinh 明星 [ Res ] = Thiên Nhạc 天岳 [ DGTNH-10 ]
//   thân tuất tý dần thìn ngọ thân tuất tý dần thìn ngọ
// Minh Tinh nghi cầu danh, bái sư học nghệ, phó nhậm
// Thiên Nhạc nghi tạo táng, hưng tu; bách sự giai cát
export function minhTinh(t, nn) {
  // nn: lunar.dd
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 7:
      if (chi == CHI[8]) k = 1;
      break; // thân
    case 2:
    case 8:
      if (chi == CHI[10]) k = 1;
      break; // tuất
    case 3:
    case 9:
      if (chi == CHI[0]) k = 1;
      break; // tý
    case 4:
    case 10:
      if (chi == CHI[2]) k = 1;
      break; // dần
    case 5:
    case 11:
      if (chi == CHI[4]) k = 1;
      break; // thìn
    case 6:
    case 12:
      if (chi == CHI[6]) k = 1;
      break; // ngọ
  }
  return k;
}

// Cát Khánh 吉慶 [ Res ***, DGTNH-17 ]
// DGTNH-17 thi lệ: chánh ngọ nhị hợi tam thị thân; tứ sửu ngũ tuất lục mão chân; thất tý bát tị cửu dần thượng; thập mùi trọng đông thìn thượng thân, canh hữu thập nhị nguyệt dậu địa, thuận hành thập nhị cầu tinh thần
//   dậu dần hợi thìn sửu ngọ mão thân tị tuất mùi tý
// nghi khánh điển, thiết yến, hội hữu, nạp đơn, nhận chức  (nghi vạn sự cát lợi, thụ tử đồng nhật tắc hung)
export function catKhanh(t, nn) {
  // nn: lunar.dd
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
      if (chi == CHI[9]) k = 1;
      break; // dậu
    case 2:
      if (chi == CHI[2]) k = 1;
      break; // dần
    case 3:
      if (chi == CHI[11]) k = 1;
      break; // hợi
    case 4:
      if (chi == CHI[4]) k = 1;
      break; // thìn
    case 5:
      if (chi == CHI[1]) k = 1;
      break; // sửu
    case 6:
      if (chi == CHI[6]) k = 1;
      break; // ngọ
    case 7:
      if (chi == CHI[3]) k = 1;
      break; // mão
    case 8:
      if (chi == CHI[8]) k = 1;
      break; // thân
    case 9:
      if (chi == CHI[5]) k = 1;
      break; // tỵ
    case 10:
      if (chi == CHI[10]) k = 1;
      break; // tuất
    case 11:
      if (chi == CHI[7]) k = 1;
      break; // mùi
    case 12:
      if (chi == CHI[0]) k = 1;
      break; // tý
  }
  return k;
}

// Lộc Khố 祿庫 [ Res *** ]
//   thìn tị ngọ mùi thân dậu tuất hợi tý sửu dần mão
// nghi nạp tài tồn khoản
export function locKho(t, nn) {
  // nn: lunar.dd
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
      if (chi == CHI[4]) k = 1;
      break; // thìn
    case 2:
      if (chi == CHI[5]) k = 1;
      break; // tỵ
    case 3:
      if (chi == CHI[6]) k = 1;
      break; // ngọ
    case 4:
      if (chi == CHI[7]) k = 1;
      break; // mùi
    case 5:
      if (chi == CHI[8]) k = 1;
      break; // thân
    case 6:
      if (chi == CHI[9]) k = 1;
      break; // dậu
    case 7:
      if (chi == CHI[10]) k = 1;
      break; // tuất
    case 8:
      if (chi == CHI[11]) k = 1;
      break; // hợi
    case 9:
      if (chi == CHI[0]) k = 1;
      break; // tý
    case 10:
      if (chi == CHI[1]) k = 1;
      break; // sửu
    case 11:
      if (chi == CHI[2]) k = 1;
      break; // dần
    case 12:
      if (chi == CHI[3]) k = 1;
      break; // mão
  }
  return k;
}

// Thiên Quý 天貴 = Thôi Quan 催官 [ Res ***, DGTNH-KMDGToànThư-7 ]
// 天貴日 春甲乙 夏丙丁 秋庚辛 冬壬癸
//    xuân giáp ất, hạ bính đinh, thu canh tân, đông nhâm quý; tứ thuận nhật kiến nghi hành
// thượng quan, phó nhậm
export function thienQuy(T, nn) {
  // T (0...3) & nn: lunar.dd
  var can = ThienCan(nn);
  var k = 0;

  switch (T) {
    case 0:
      if (can == CAN[0] || can == CAN[1]) k = 1;
      break; // Xuân: Giáp Ất
    case 1:
      if (can == CAN[2] || can == CAN[3]) k = 1;
      break; // Hạ:   Bính Đinh
    case 2:
      if (can == CAN[6] || can == CAN[7]) k = 1;
      break; // Thu:  Canh Tân
    case 3:
      if (can == CAN[8] || can == CAN[9]) k = 1;
      break; // Đông: Nhâm Quý
  }

  return k;
}

// Thiên Thành 天成 [ DGTNH-KMDGToànThư-7 ]
// thiên thành nhật mùi dậu hợi sửu mão tị mùi dậu hợi sửu mão tị
// nghi thất nghi gia, hội thân hữu
export function thienThanh(t, nn) {
  // t (tiết)
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 7:
      if (chi == CHI[7]) k = 1;
      break; // Mùi
    case 2:
    case 8:
      if (chi == CHI[9]) k = 1;
      break; // Dậu
    case 3:
    case 9:
      if (chi == CHI[11]) k = 1;
      break; // Hợi
    case 4:
    case 10:
      if (chi == CHI[1]) k = 1;
      break; // Sửu
    case 5:
    case 11:
      if (chi == CHI[3]) k = 1;
      break; // Mão
    case 6:
    case 12:
      if (chi == CHI[5]) k = 1;
      break; // Tỵ
  }
  return k;
}

// Âm Đức 陰德 [ DGTNH-10 ] = Nhân Cách (hung thần)
// thi lệ: chánh thất kim kê khiếu, nhị bát đê dương miên, tam cửu xà đương lộ, tứ thập thỏ nhi phì, ngũ thập nhất ngưu khiếu, lục chạp trư tác biến
//   chánh nguyệt khởi dậu, nghịch hành lục âm thần
// nghi kiến tiếu (lập đàn cầu cúng), tế tự
export function amDuc(t, nn) {
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

// Bảo Nhật 寶日 [ DGTNH *** ]
// bảo nhật giả: đinh mùi, đinh sửu, bính tuất, giáp ngọ, canh tý, nhâm dần, quý mão, ất tị, mậu thân, kỷ dậu, tân hợi, bính thìn
// cùng với cát thần tinh nghi an phủ biên cảnh, tuyển tướng huấn binh, xuất sư
export function baoNhat(nn) {
  // nn: lunar.dd
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;

  if (can == CAN[3] && chi == CHI[7]) k = 1; // đinh mùi
  else if (can == CAN[3] && chi == CHI[1]) k = 1; // đinh sửu
  else if (can == CAN[2] && chi == CHI[10]) k = 1; // bính tuất
  else if (can == CAN[0] && chi == CHI[6]) k = 1; // giáp ngọ
  else if (can == CAN[6] && chi == CHI[0]) k = 1; // canh tý
  else if (can == CAN[8] && chi == CHI[2]) k = 1; // nhâm dần
  else if (can == CAN[9] && chi == CHI[3]) k = 1; // quý mão
  else if (can == CAN[1] && chi == CHI[5]) k = 1; // ất tị
  else if (can == CAN[4] && chi == CHI[8]) k = 1; // mậu thân
  else if (can == CAN[5] && chi == CHI[9]) k = 1; // kỷ dậu
  else if (can == CAN[7] && chi == CHI[11]) k = 1; // tân hợi
  else if (can == CAN[2] && chi == CHI[4]) k = 1; // bính thìn

  return k;
}

// Nghĩa Nhật 義日 [ DGTNH *** ]
// nghĩa nhật giả: giáp tý, bính dần, đinh mão, kỷ tị, tân mùi, nhâm thân, quý dậu, ất hợi, canh thìn, tân sửu, canh tuất, mậu ngọ
// cùng với cát thần tinh nghi an phủ biên cảnh, tuyển tướng huấn binh, xuất sư
export function nghiaNhat(nn) {
  // nn: lunar.dd
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;

  if (can == CAN[0] && chi == CHI[0]) k = 1; // giáp tý
  else if (can == CAN[2] && chi == CHI[2]) k = 1; // bính dần
  else if (can == CAN[3] && chi == CHI[3]) k = 1; // đinh mão
  else if (can == CAN[5] && chi == CHI[5]) k = 1; // kỷ tị
  else if (can == CAN[7] && chi == CHI[7]) k = 1; // tân mùi
  else if (can == CAN[8] && chi == CHI[8]) k = 1; // nhâm thân
  else if (can == CAN[9] && chi == CHI[9]) k = 1; // quý dậu
  else if (can == CAN[1] && chi == CHI[11]) k = 1; // ất hợi
  else if (can == CAN[6] && chi == CHI[4]) k = 1; // canh thìn
  else if (can == CAN[7] && chi == CHI[1]) k = 1; // tân sửu
  else if (can == CAN[6] && chi == CHI[10]) k = 1; // canh tuất
  else if (can == CAN[4] && chi == CHI[6]) k = 1; // mậu ngọ

  return k;
}

// Chế Nhật 制日 [ DGTNH *** ]
// chế nhật giả: ất sửu, giáp tuất, nhâm ngọ, mậu tý, canh dần, tân mão, quý tị, ất mùi, bính thân, đinh dậu, kỷ hợi, giáp thìn
// cùng với cát thần tinh nghi an phủ biên cảnh, tuyển tướng huấn binh, xuất sư
export function cheNhat(nn) {
  // nn: lunar.dd
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;

  if (can == CAN[1] && chi == CHI[1]) k = 1; // ất sửu
  else if (can == CAN[0] && chi == CHI[10]) k = 1; // giáp tuất
  else if (can == CAN[8] && chi == CHI[6]) k = 1; // nhâm ngọ
  else if (can == CAN[4] && chi == CHI[0]) k = 1; // mậu tý
  else if (can == CAN[6] && chi == CHI[2]) k = 1; // canh dần
  else if (can == CAN[7] && chi == CHI[3]) k = 1; // tân mão
  else if (can == CAN[9] && chi == CHI[5]) k = 1; // quý tị
  else if (can == CAN[1] && chi == CHI[7]) k = 1; // ất mùi
  else if (can == CAN[2] && chi == CHI[8]) k = 1; // bính thân
  else if (can == CAN[3] && chi == CHI[9]) k = 1; // đinh dậu
  else if (can == CAN[5] && chi == CHI[11]) k = 1; // kỷ hợi
  else if (can == CAN[0] && chi == CHI[4]) k = 1; // giáp thìn

  return k;
}

// Thần Tại 神在 [ DGTNH-15 ]
// nghi tế tự, cầu phúc phản họa, cầu tài,
export function thanTai(nn) {
  // nn: lunar.dd
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;

  switch (canVi(can)) {
    case 0:
      if (chi == CHI[0]) k = 1; // giáp tý
      else if (chi == CHI[6]) k = 1; // giáp ngọ
      else if (chi == CHI[8]) k = 1; // giáp thân
      else if (chi == CHI[10]) k = 1; // giáp tuất
      break;
    case 1:
      if (chi == CHI[1]) k = 1; // ất sửu
      else if (chi == CHI[3]) k = 1; // ất mão
      else if (chi == CHI[5]) k = 1; // ất tị
      else if (chi == CHI[7]) k = 1; // ất mùi
      else if (chi == CHI[9]) k = 1; // ất dậu
      break;
    case 2:
      if (chi == CHI[4]) k = 1; // bính thìn
      else if (chi == CHI[6]) k = 1; // bính ngọ
      else if (chi == CHI[8]) k = 1; // bính thân
      else if (chi == CHI[10]) k = 1; // bính tuất
      break;
    case 3:
      if (chi == CHI[1]) k = 1; // đinh sửu
      else if (chi == CHI[3]) k = 1; // đinh mão
      else if (chi == CHI[5]) k = 1; // đinh tị
      else if (chi == CHI[7]) k = 1; // đinh mùi
      else if (chi == CHI[9]) k = 1; // đinh dậu
      else if (chi == CHI[11]) k = 1; // đinh hợi
      break;
    case 4:
      if (chi == CHI[4]) k = 1; // mậu thìn
      else if (chi == CHI[6]) k = 1; // mậu ngọ
      else if (chi == CHI[8]) k = 1; // mậu thân
      break;
    case 5:
      if (chi == CHI[1]) k = 1; // kỷ sửu
      else if (chi == CHI[3]) k = 1; // kỷ mão
      else if (chi == CHI[5]) k = 1; // kỷ tị
      else if (chi == CHI[7]) k = 1; // kỷ mùi
      else if (chi == CHI[9]) k = 1; // kỷ dậu
      break;
    case 6:
      if (chi == CHI[4]) k = 1; // canh thìn
      else if (chi == CHI[6]) k = 1; // canh ngọ
      break;
    case 7:
      if (chi == CHI[3]) k = 1; // tân mão
      else if (chi == CHI[7]) k = 1; // tân mùi
      else if (chi == CHI[9]) k = 1; // tân dậu
      break;
    case 8:
      if (chi == CHI[6]) k = 1; // nhâm ngọ
      else if (chi == CHI[8]) k = 1; // nhâm thân
      break;
    case 9:
      if (chi == CHI[9]) k = 1; // quý dậu
      else if (chi == CHI[11]) k = 1; // quý hợi
      break;
  }
  return k;
}

// Thiên Phúc 天福 [ DGTNH-15 ]
// Thi lệ: tứ quý thiên phúc tối kham thân, kỷ mão canh dần tân mão tầm, nhâm thìn quý tị cập kỷ hợi, canh tý tân sửu ất tị chân
// nghi thượng quan, thượng nhậm, nhập trạch, tống lễ, xuất hành, bách sự cát
export function thienPhuc(nn) {
  // nn: lunar.dd
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;

  if (can == CAN[1] && chi == CHI[5]) k = 1; // ất tị
  else if (can == CAN[3] && chi == CHI[5]) k = 1; // đinh tị
  else if (can == CAN[5] && chi == CHI[3]) k = 1; // kỷ mão
  else if (can == CAN[5] && chi == CHI[11]) k = 1; // kỷ hợi
  else if (can == CAN[6] && chi == CHI[0]) k = 1; // canh tý
  else if (can == CAN[6] && chi == CHI[2]) k = 1; // canh dần
  else if (can == CAN[6] && chi == CHI[8]) k = 1; // canh thân
  else if (can == CAN[7] && chi == CHI[1]) k = 1; // tân sửu
  else if (can == CAN[7] && chi == CHI[3]) k = 1; // tân mão
  else if (can == CAN[8] && chi == CHI[4]) k = 1; // nhâm thìn
  else if (can == CAN[9] && chi == CHI[5]) k = 1; // quý tị

  return k;
}

// Bàng Chánh Phế [ NHK *** ]
// đa khả dụng
export function bangChanhPhe(T, nn) {
  // T (0...3) & nn: lunar.dd
  var can = ThienCan(nn);
  var k = 0;

  switch (T) {
    case 0:
      if (can == CAN[6] || can == CAN[7]) k = 1;
      break; // Xuân: canh tân
    case 1:
      if (can == CAN[8] || can == CAN[9]) k = 1;
      break; // Hạ: nhâm quý
    case 2:
      if (can == CAN[0] || can == CAN[1]) k = 1;
      break; // Thu: giáp ất
    case 3:
      if (can == CAN[2] || can == CAN[3]) k = 1;
      break; // Đông: bính đinh
  }

  return k;
}

// Đại Minh Cát Nhật 大明 [ DGTNH-15, NHK *** ]
// bách sự dụng chi đại cát
export function daiMinhCatNhat(nn) {
  // nn: lunar.dd
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;

  switch (canVi(can)) {
    case 0:
      if (chi == CHI[4]) k = 1; // giáp thìn
      else if (chi == CHI[8]) k = 1; // giáp thân
      break;
    case 1:
      if (chi == CHI[3]) k = 1; // ất mão
      else if (chi == CHI[5]) k = 1; // ất tị
      else if (chi == CHI[7]) k = 1; // ất mùi
      break;
    case 2:
      if (chi == CHI[4]) k = 1; // bính thìn
      else if (chi == CHI[6]) k = 1; // bính ngọ
      break;
    case 3:
      if (chi == CHI[1]) k = 1; // đinh sửu
      else if (chi == CHI[11]) k = 1; // đinh hợi
      break;
    case 4:
      if (chi == CHI[4]) k = 1; // mậu thìn
      else if (chi == CHI[6]) k = 1; // mậu ngọ
      else if (chi == CHI[8]) k = 1; // mậu thân
      break;
    case 5:
      if (chi == CHI[7]) k = 1; // kỷ mùi
      else if (chi == CHI[9]) k = 1; // kỷ dậu
      break;
    case 6:
      if (chi == CHI[8]) k = 1; // canh thân
      else if (chi == CHI[10]) k = 1; // canh tuất
      break;
    case 7:
      if (chi == CHI[7]) k = 1; // tân mùi
      else if (chi == CHI[9]) k = 1; // tân dậu
      else if (chi == CHI[11]) k = 1; // tân hợi
      break;
    case 8:
      if (chi == CHI[2]) k = 1; // nhâm dần
      else if (chi == CHI[4]) k = 1; // nhâm thìn
      else if (chi == CHI[6]) k = 1; // nhâm ngọ
      else if (chi == CHI[8]) k = 1; // nhâm thân
      break;
    case 9:
      if (chi == CHI[9]) k = 1; // quý dậu
      break;
  }
  return k;
}

// Thiên Thụy 天瑞 [ DGTNH, NHK *** ]
// thi lệ: tứ quý thiên thụy thị hà thần? mậu dần kỷ mão tân tị chân, canh dần nhâm tý vô sai biệt, bách sự phùng chi thụy khí hưng
// nghi thượng quan, nạp lễ, bách sự giai cát, tu tạo đại cát
export function thienThuy(nn) {
  // nn: lunar.dd
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;

  if (can == CAN[4] && chi == CHI[2]) k = 1; // mậu dần
  else if (can == CAN[5] && chi == CHI[3]) k = 1; // kỷ mão
  else if (can == CAN[6] && chi == CHI[2]) k = 1; // canh dần
  else if (can == CAN[7] && chi == CHI[5]) k = 1; // tân tị
  else if (can == CAN[8] && chi == CHI[0]) k = 1; // nhâm tý

  return k;
}

// Đại Thâu Tu Nhật 大偷修日 [ DGTNH-15, NHK *** ]
// tu tạo đại cát
export function daiThauTuNhat(nn) {
  // nn: lunar.dd
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;

  if (can == CAN[2] && chi == CHI[4]) k = 1; // bính thìn
  else if (can == CAN[3] && chi == CHI[5]) k = 1; // đinh tị
  else if (can == CAN[4] && chi == CHI[6]) k = 1; // mậu ngọ
  else if (can == CAN[5] && chi == CHI[7]) k = 1; // kỷ mùi
  else if (can == CAN[6] && chi == CHI[8]) k = 1; // canh thân
  else if (can == CAN[7] && chi == CHI[9]) k = 1; // tân dậu
  else if (can == CAN[8] && chi == CHI[0]) k = 1; // nhâm tý

  return k;
}

// Tạ Thổ Cát Nhật 謝土吉日 [ DGTNH-15, NHK **** ]
// giáp dần, giáp thân, đinh sửu, đinh mùi, canh tý, canh ngọ, quý tị, quý hợi
// nghi tạ thổ
export function taThoCatNhat(nn) {
  // nn: lunar.dd
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;

  if (can == CAN[0] && chi == CHI[2]) k = 1; // giáp dần
  else if (can == CAN[0] && chi == CHI[8]) k = 1; // giáp thân
  else if (can == CAN[3] && chi == CHI[1]) k = 1; // đinh sửu
  else if (can == CAN[3] && chi == CHI[7]) k = 1; // đinh mùi
  else if (can == CAN[6] && chi == CHI[0]) k = 1; // canh tý
  else if (can == CAN[6] && chi == CHI[6]) k = 1; // canh ngọ
  else if (can == CAN[9] && chi == CHI[5]) k = 1; // quý tị
  else if (can == CAN[9] && chi == CHI[11]) k = 1; // quý hợi

  return k;
}

// Thiên Quan 天官 [ Res ] = Tư Mệnh Hoàng Đạo
//   tuất tý dần thìn ngọ thân tuất tý dần thìn ngọ thân
// nghi thượng quan phó nhậm
export function thienQuan(t, nn) {
  // nn: lunar.dd
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
    case 7:
      if (chi == CHI[10]) k = 1;
      break; // tuất
    case 2:
    case 8:
      if (chi == CHI[0]) k = 1;
      break; // tý
    case 3:
    case 9:
      if (chi == CHI[2]) k = 1;
      break; // dần
    case 4:
    case 10:
      if (chi == CHI[4]) k = 1;
      break; // thìn
    case 5:
    case 11:
      if (chi == CHI[6]) k = 1;
      break; // ngọ
    case 6:
    case 12:
      if (chi == CHI[8]) k = 1;
      break; // thân
  }
  return k;
}

// Dùng với Hiển, Khúc, Phó Tinh. A local export function
//   Thi lệ: "dần thân tị hợi nguyệt, giáp tý Ngũ Trung khởi, tý ngọ mão dậu nguyệt, giáp tý lục Kiền tê, ***
//   thần tuất sửu mùi nguyệt, giáp tý gia Đoài phi.
//   Hiển Tinh phùng Cấn thị, Khúc Tinh tại Li cung, Phụ Tinh Chấn thượng vị; thuận hành bất sai di."
export function CuuCungChuongQuyet(gia, can, chi) {
  var g = gia;
  var j;
  var f = 0;
  for (var i = 0; i < 7; i++) {
    j = g + i * 9;
    if (j >= 60) break;
    if (can == ThienCan(j) && chi == DiaChi(j)) f = 1;
    break;
  }
  return f;
}

// Hiển Tinh 顯星 [ DGTNH-17,34 ]
// Loan Giá - Thiên Hoàng 天皇 = Hiển Tinh [ 鸞駕擇日 loan giá trạch nhật *** ]
// - mạnh nguyệt đinh mão, bính tý, ất dậu, giáp ngọ, quý mão, nhâm tý, tân dậu; ***
// - trọng nguyệt bính dần, ất hợi, giáp thân, quý tị, nhâm dần, tân hợi, canh thân;
// - quý nguyệt ất sửu, giáp tuất, quý mùi, nhâm thìn, tân sửu, canh tuất, kỷ mùi.
// hiển, khúc, phó tinh: nghi tạo táng, tu doanh, tham yết, thượng quan, phó nhậm, khoa cử, nhập học, giá thú, bách sự đại cát.
export function hienTinh(t, nn) {
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;

  switch (t) {
    case 1:
    case 4:
    case 7:
    case 10:
      k = CuuCungChuongQuyet(3, can, chi);
      break;
    case 2:
    case 5:
    case 8:
    case 11:
      k = CuuCungChuongQuyet(2, can, chi);
      break;
    case 3:
    case 6:
    case 9:
    case 12:
      k = CuuCungChuongQuyet(1, can, chi);
      break;
  }
  return k;
}

// Khúc Tinh 曲星 [ DGTNH-17,34 *** ]
// Loan Giá - Ngọc Hoàng 玉皇 = Khúc Tinh [ 鸞駕擇日 loan giá trạch nhật *** ]
// - mạnh nguyệt mậu thìn, đinh sửu, bính tuất, ất mùi, giáp thìn, quý sửu, nhâm tuất; ***
// - trọng nguyệt đinh mão, bính tý, ất dậu, giáp ngọ, quý mão, nhâm tý, tân dậu;
// - quý nguyệt bính dần, ất hợi, giáp thân, quý tị, nhâm dần, tân hợi, canh thân.
// hiển, khúc, phó tinh: nghi tạo táng, tu doanh, tham yết, thượng quan phó nhậm, khoa cử, nhập học, giá thú, bách sự đại cát.
export function khucTinh(t, nn) {
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;

  switch (t) {
    case 1:
    case 4:
    case 7:
    case 10:
      k = CuuCungChuongQuyet(4, can, chi);
      break;
    case 2:
    case 5:
    case 8:
    case 11:
      k = CuuCungChuongQuyet(3, can, chi);
      break;
    case 3:
    case 6:
    case 9:
    case 12:
      k = CuuCungChuongQuyet(2, can, chi);
      break;
  }
  return k;
}

// Phó Tinh 曲星 [ DGTNH-17,34 *** ]
// Loan Giá - Tử Vi 紫微 = Phó Tinh [ 鸞駕擇日 loan giá trạch nhật *** ]
// - mạnh nguyệt tân mùi, canh thìn, kỷ sửu, mậu tuất, đinh mùi, bính thìn; ***
// - trọng nguyệt canh ngọ, kỷ mão, mậu tý, đinh dậu, bính ngọ, ất mão;
// - quý nguyệt kỷ tị, mậu dần, đinh hợi, bính thân, ất tị, giáp dần, quý hợi.
// hiển, khúc, phó tinh: nghi tạo táng, tu doanh, tham yết, thượng quan phó nhậm, khoa cử, nhập học, giá thú, bách sự đại cát.
export function phoTinh(t, nn) {
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;

  switch (t) {
    case 1:
    case 4:
    case 7:
    case 10:
      k = CuuCungChuongQuyet(7, can, chi);
      break;
    case 2:
    case 5:
    case 8:
    case 11:
      k = CuuCungChuongQuyet(6, can, chi);
      break;
    case 3:
    case 6:
    case 9:
    case 12:
      k = CuuCungChuongQuyet(5, can, chi);
      break;
  }
  return k;
}

// Thất Thánh 七聖 [ DGTNH ]
// nghi tế tự, trai tiếu, kì phúc, hứa nguyện đại cát
export function thatThanh(nn) {
  // nn: lunar.dd
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;

  switch (canVi(can)) {
    case 0:
      if (chi == CHI[2]) k = 1; // giáp dần
      else if (chi == CHI[4]) k = 1; // giáp thìn
      else if (chi == CHI[6]) k = 1; // giáp ngọ
      else if (chi == CHI[8]) k = 1; // giáp thân
      else if (chi == CHI[10]) k = 1; // giáp tuất
      break;
    case 1:
      if (chi == CHI[3]) k = 1; // ất mão
      else if (chi == CHI[5]) k = 1; // ất tị
      else if (chi == CHI[7]) k = 1; // ất mùi
      else if (chi == CHI[9]) k = 1; // ất dậu
      else if (chi == CHI[11]) k = 1; // ất hợi
      break;
    case 2:
      if (chi == CHI[0]) k = 1; // bính tý
      else if (chi == CHI[2]) k = 1; // bính dần
      break;
    case 3:
      if (chi == CHI[1]) k = 1; // đinh sửu
      else if (chi == CHI[3]) k = 1; // đinh mão
      break;
    case 4:
      if (chi == CHI[0]) k = 1; // mậu tý
      else if (chi == CHI[4]) k = 1; // mậu thìn
      else if (chi == CHI[6]) k = 1; // mậu ngọ
      else if (chi == CHI[8]) k = 1; // mậu thân
      else if (chi == CHI[10]) k = 1; // mậu tuất
      break;
    case 5:
      if (chi == CHI[1]) k = 1; // kỷ sửu
      else if (chi == CHI[5]) k = 1; // kỷ tị
      else if (chi == CHI[7]) k = 1; // kỷ mùi
      else if (chi == CHI[9]) k = 1; // kỷ dậu
      else if (chi == CHI[11]) k = 1; // kỷ hợi
      break;
    case 6:
      if (chi == CHI[2]) k = 1; // canh dần
      else if (chi == CHI[4]) k = 1; // canh thìn
      else if (chi == CHI[8]) k = 1; // canh thân
      else if (chi == CHI[10]) k = 1; // canh tuất
      break;
    case 7:
      if (chi == CHI[2]) k = 1; // tân mão
      else if (chi == CHI[5]) k = 1; // tân tị
      else if (chi == CHI[9]) k = 1; // tân dậu
      break;
    case 8:
      if (chi == CHI[0]) k = 1; // nhâm tý
      else if (chi == CHI[2]) k = 1; // nhâm dần
      else if (chi == CHI[8]) k = 1; // nhâm thân
      break;
    case 9:
      if (chi == CHI[1]) k = 1; // quý sửu
      else if (chi == CHI[3]) k = 1; // quý mão
      else if (chi == CHI[9]) k = 1; // quý dậu
      break;
  }
  return k;
}

// Tuế Đức 歲德 [ DGTNH-29 ] 歲德 甲 庚 丙 壬 戊 甲 庚 丙 壬 戊
//    giáp canh bính nhâm mậu
// nghi thượng quan, biểu tiến sớ
export function tueDuc(nien, nn) {
  var nc = TueCanVi(nien); // Niên Can
  var can = ThienCan(nn);
  var k = 0;

  switch (nc) {
    case 0:
    case 5:
      if (can == CAN[0]) k = 1;
      break; // giáp
    case 1:
    case 6:
      if (can == CAN[6]) k = 1;
      break; // canh
    case 2:
    case 7:
      if (can == CAN[2]) k = 1;
      break; // bính
    case 3:
    case 8:
      if (can == CAN[8]) k = 1;
      break; // nhâm
    case 4:
    case 9:
      if (can == CAN[4]) k = 1;
      break; // mậu
  }
  return k;
}

// Tuế Đức Hợp 歲德合 [ DGTNH ] 歲德合 己 乙 辛 丁 癸 己 乙 辛 丁 癸
//    kỷ ất tân đinh quý
// nghi thượng quan, biểu tiến sớ
export function tueDucHop(nien, nn) {
  var nc = TueCanVi(nien); // Niên Can
  var can = ThienCan(nn);
  var k = 0;

  switch (nc) {
    case 0:
    case 5:
      if (can == CAN[5]) k = 1;
      break; // kỷ
    case 1:
    case 6:
      if (can == CAN[1]) k = 1;
      break; // ất
    case 2:
    case 7:
      if (can == CAN[7]) k = 1;
      break; // tân
    case 3:
    case 8:
      if (can == CAN[3]) k = 1;
      break; // đinh
    case 4:
    case 9:
      if (can == CAN[9]) k = 1;
      break; // quý
  }
  return k;
}

// Tuế Lộc 歲祿 (DGTNH) ***
//   niên can: giáp ất bính đinh mậu kỷ canh tân nhâm quý
//   tuế lộc:  dần mão tị ngọ tị ngọ thân dậu hợi tý
// tuế can ở vào phương 'lâm quan'; là phương có tượng thịnh khí; nghi tạo táng, tu phương; bách sự đều cát.
//   mộc (dương-thuận hành): trường sanh ở hợi, mộc dục ở tý, quan đái ở sửu, lâm quan ở dần, đế vượng ở mão,
//     suy ở thần, bệnh ở tị, tử ở ngọ, mộ ở mùi, tuyệt ở thân, thai ở dậu, dưỡng ở tuất.
//   giáp lâm quan tại dần, ất lâm quan mão,
//   bính mậu lâm quan tị,  đinh kỷ lâm quan ngọ,
//   canh lâm quan tại thân, tân lâm quan tại dậu,
//   nhâm lâm quan tại hợi, quý lâm quan tại tý
export function tueLoc(nien, nn) {
  var nc = TueCanVi(nien); // Niên Can
  var chi = DiaChi(nn);
  var k = 0;

  switch (nc) {
    case 0:
      if (chi == CHI[2]) k = 1;
      break; // dần
    case 1:
      if (chi == CHI[3]) k = 1;
      break; // mão
    case 2:
      if (chi == CHI[5]) k = 1;
      break; // tị
    case 3:
      if (chi == CHI[6]) k = 1;
      break; // ngọ
    case 4:
      if (chi == CHI[5]) k = 1;
      break; // tị
    case 5:
      if (chi == CHI[6]) k = 1;
      break; // ngọ
    case 6:
      if (chi == CHI[8]) k = 1;
      break; // thân
    case 7:
      if (chi == CHI[9]) k = 1;
      break; // dậu
    case 8:
      if (chi == CHI[11]) k = 1;
      break; // hợi
    case 9:
      if (chi == CHI[0]) k = 1;
      break; // tý
  }
  return k;
}

// Trừ Thần 除神 [ DGTNH-14 ] = Ngũ Ly 五離 = trực Trừ
//  giáp thân ất dậu thiên địa li, bính thân đinh dậu nhật nguyệt li,
//  mậu thân kỷ dậu nhân dân li, nhâm thân quý dậu hán hà li
// nghi giải trừ, cầu y liệu bệnh
export function truThan(nn) {
  var chi = DiaChi(nn);
  var k = 0;
  if (chi == CHI[8] || chi == CHI[9]) k = 1; // Thân, Dậu
  return k;
}

// Môn Quang Tinh 門光星 (Lỗ Ban Toàn Thư)
// đại nguyệt 1, 2, 7, 8, 12, 13, 14, 18, 19, 20, 24, 25, 29.
// tiểu nguyệt 1, 2, 6, 7, 11, 12, 13, 17, 18, 19, 23, 24, 28, 29.
export function monQuangTinh(n, th30) {
  // n: 1-30, th30: tháng 30 ngày (true)
  var k = 0;

  if (th30) {
    if (
      n == 1 ||
      n == 2 ||
      n == 7 ||
      n == 8 ||
      n == 12 ||
      n == 13 ||
      n == 14 ||
      n == 18 ||
      n == 19 ||
      n == 20 ||
      n == 24 ||
      n == 25 ||
      n == 29
    )
      k = 1;
  } else {
    if (
      n == 1 ||
      n == 2 ||
      n == 6 ||
      n == 7 ||
      n == 11 ||
      n == 12 ||
      n == 13 ||
      n == 18 ||
      n == 19 ||
      n == 23 ||
      n == 24 ||
      n == 29 ||
      n == 29
    )
      k = 1;
  }
  return k;
}

// Thiên Đế 天帝 [ PSD *** ] < Không dùng - tu phương lập hướng >
//    chánh nguyệt vũ thủy hậu tại dần, xuân phân hậu tại mão, thuận hành thập nhị chi;
//    luận khí hậu thái dương.
//
export function thienDe(k, nn) {
  // k: (khí hậu)
  var chi = DiaChi(nn);
  var f = 0;
  switch (k) {
    case 1:
      if (chi == CHI[2]) f = 1;
      break; // dần
    case 2:
      if (chi == CHI[3]) f = 1;
      break; // mão
    case 3:
      if (chi == CHI[4]) f = 1;
      break; // thìn
    case 4:
      if (chi == CHI[5]) f = 1;
      break; // tỵ
    case 5:
      if (chi == CHI[6]) f = 1;
      break; // ngọ
    case 6:
      if (chi == CHI[7]) f = 1;
      break; // mùi
    case 7:
      if (chi == CHI[8]) f = 1;
      break; // thân
    case 8:
      if (chi == CHI[9]) f = 1;
      break; // dậu
    case 9:
      if (chi == CHI[10]) f = 1;
      break; // tuất
    case 10:
      if (chi == CHI[11]) f = 1;
      break; // hợi
    case 11:
      if (chi == CHI[0]) f = 1;
      break; // tý
    case 12:
      if (chi == CHI[1]) f = 1;
      break; // sửu
  }
  return f;
}

// Thiên Hậu 天后 [ PSD *** ] < Không dùng loại này >
//   dần ngọ tuất nguyệt bính nhật; hợi mão mùi nguyệt giáp nhật;
//   thân tý thìn nguyệt nhâm nhật; tị dậu sửu nguyệt canh nhật; vị chi thiên hậu, luận tiết hậu thái âm
// nghi cầu y liệu bệnh, kì phúc, lễ thần
export function thienHau(t, nn) {
  // t (tiết)
  var can = ThienCan(nn);
  var f = 0;
  switch (t) {
    case 1:
    case 5:
    case 9:
      if (can == CAN[2]) f = 1;
      break; // Bính
    case 2:
    case 6:
    case 10:
      if (can == CAN[0]) f = 1;
      break; // Giáp
    case 3:
    case 7:
    case 11:
      if (can == CAN[8]) f = 1;
      break; // Nhâm
    case 4:
    case 8:
    case 12:
      if (can == CAN[6]) f = 1;
      break; // Canh
  }
  return f;
}

//================================================

// Mãn Đức 滿德 [ DGTNH-17 ]
// thi lệ: chánh ngọ nhị hợi tam thị thân, tứ sửu ngũ tuất lục mão chân, thất tý bát tị cửu dần thượng,
//   thập mùi trọng đông thìn thượng thân, canh hữu thập nhị nguyệt dậu địa, thuận hành thập nhị cầu tinh thần;
//   vạn thông tứ cát, kị Thụ Tử đồng nhật (nghi vạn sự cát lợi, thụ tử đồng nhật tắc hung)
export function manDuc(t, nn) {
  // nn: lunar.dd
  var chi = DiaChi(nn);
  var k = 0;
  switch (t) {
    case 1:
      if (chi == CHI[6]) k = 1;
      break; // ngọ
    case 2:
      if (chi == CHI[11]) k = 1;
      break; // hợi
    case 3:
      if (chi == CHI[8]) k = 1;
      break; // thân
    case 4:
      if (chi == CHI[1]) k = 1;
      break; // sửu
    case 5:
      if (chi == CHI[10]) k = 1;
      break; // tuất
    case 6:
      if (chi == CHI[3]) k = 1;
      break; // mão
    case 7:
      if (chi == CHI[0]) k = 1;
      break; // tý
    case 8:
      if (chi == CHI[5]) k = 1;
      break; // tỵ
    case 9:
      if (chi == CHI[2]) k = 1;
      break; // dần
    case 10:
      if (chi == CHI[7]) k = 1;
      break; // mùi
    case 11:
      if (chi == CHI[4]) k = 1;
      break; // thìn
    case 12:
      if (chi == CHI[9]) k = 1;
      break; // dậu
  }
  return k;
}

// U Vi Tinh 幽微星 [ Res ***, DGTNH-17 ]
// Dùng Khí không dùng Tiết
// Bách sự cát. Dữ thụ tử đồng nhật tắc hung
export function uViTinh(t, nn) {
  // t: (khí hậu)
  var chi = DiaChi(nn);
  var f = 0;
  switch (t) {
    case 1:
      if (chi == CHI[11]) f = 1;
      break; // hợi
    case 2:
      if (chi == CHI[4]) f = 1;
      break; // thìn
    case 3:
      if (chi == CHI[1]) f = 1;
      break; // sửu
    case 4:
      if (chi == CHI[6]) f = 1;
      break; // ngọ
    case 5:
      if (chi == CHI[3]) f = 1;
      break; // mão
    case 6:
      if (chi == CHI[8]) f = 1;
      break; // thân
    case 7:
      if (chi == CHI[5]) f = 1;
      break; // tỵ
    case 8:
      if (chi == CHI[10]) f = 1;
      break; // tuất
    case 9:
      if (chi == CHI[7]) f = 1;
      break; // mùi
    case 10:
      if (chi == CHI[0]) f = 1;
      break; // tý
    case 11:
      if (chi == CHI[9]) f = 1;
      break; // dậu
    case 12:
      if (chi == CHI[2]) f = 1;
      break; // dần
  }
  return f;
}

// Hoạt Diệu Tinh 活曜星
// lục giáp ngộ động tắc sản, tật bệnh ngộ động tắc thuyên
// dữ thụ tử đồng nhật tắc hung
export function hoatDieuTinh(t, nn) {
  // t (tiết hậu)
  var chi = DiaChi(nn);
  var f = 0;
  switch (t) {
    case 1:
      if (chi == CHI[3]) f = 1;
      break; // mão
    case 2:
      if (chi == CHI[4]) f = 1;
      break; // thìn
    case 3:
      if (chi == CHI[5]) f = 1;
      break; // tỵ
    case 4:
      if (chi == CHI[6]) f = 1;
      break; // ngọ
    case 5:
      if (chi == CHI[7]) f = 1;
      break; // mùi
    case 6:
      if (chi == CHI[8]) f = 1;
      break; // thân
    case 7:
      if (chi == CHI[9]) f = 1;
      break; // dậu
    case 8:
      if (chi == CHI[10]) f = 1;
      break; // tuất
    case 9:
      if (chi == CHI[11]) f = 1;
      break; // hợi
    case 10:
      if (chi == CHI[0]) f = 1;
      break; // tý
    case 11:
      if (chi == CHI[1]) f = 1;
      break; // sửu
    case 12:
      if (chi == CHI[2]) f = 1;
      break; // dần
  }
  return f;
}

// Đại Hồng Sa 大沙殺 (Trạch Nhật Cầu Chân)
//   xuân tuất tý hạ thìn tị thu ngọ mùi đông thân tuất
// Bách sự cát
export function daiHongSa(T, nn) {
  // T (0...3) & nn: lunar.dd
  var chi = DiaChi(nn);
  var k = 0;

  switch (T) {
    case 0:
      if (chi == CHI[0] || chi == CHI[1]) k = 1;
      break; // Xuân: tý sửu
    case 1:
      if (chi == CHI[4] || chi == CHI[5]) k = 1;
      break; // Hạ: thìn tỵ
    case 2:
      if (chi == CHI[6] || chi == CHI[7]) k = 1;
      break; // Thu: ngọ mùi
    case 3:
      if (chi == CHI[8] || chi == CHI[10]) k = 1;
      break; // Đông: thân tuất
  }

  return k;
}

// Ngũ Đế Sinh 五帝生  // DGTNH ***
// giáp tý thanh đế sanh, giáp thìn xích đế sanh, mậu tý hoàng đế sanh, nhâm thìn bạch đế sanh, nhâm tý hắc đế sanh.
// nghi tạo tác; bách sự tịnh cát
export function nguDeSinh(nn) {
  // nn: lunar.dd
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;

  if (can == CAN[0] && chi == CHI[0]) k = 1; // giáp tý
  else if (can == CAN[0] && chi == CHI[4]) k = 1; // giáp thìn
  else if (can == CAN[4] && chi == CHI[0]) k = 1; // mậu tý
  else if (can == CAN[8] && chi == CHI[4]) k = 1; // nhâm thìn
  else if (can == CAN[8] && chi == CHI[0]) k = 1; // nhâm tý

  return k;
}

// La Thiên Đại Tiến 羅天大進 [ Res *** ]
// 二猴四豬六鼠雄，八兔二羊十六龍，八犬廿牛廿二蛇，四虎六馬八雞從。
// nhị hầu tứ trư lục thử hùng, bát thỏ nhị dương thập lục long, bát khuyển nhập ngưu nhập nhị xà, tứ hổ lục mã bát kê tòng
// sơ nhị phùng thân nhật, sơ tứ phùng hợi nhật, sơ lục phùng tý nhật, sơ bát phùng mão nhật, thập nhị phùng mùi nhật, thập lục phùng thìn nhật,
// thập bát phùng tuất nhật, nhị thập phùng sửu nhật, nhập nhị phùng tị nhật, nhập tứ phùng dần nhật, nhập lục phùng ngọ nhật, nhập bát phùng dậu nhật.
// Nghi kì phúc, cầu tự, giá thú, đính hôn, tu tạo, nhập trạch, khai thị, giao dịch, cầu tài, tạo táng; bách sự giai cát.
export function laThienDaiTien(n, nn) {
  // n: ngày âm lịch & nn: lunar.dd
  var chi = DiaChi(nn);
  var k = 0;
  switch (n) {
    case 2:
      if (chi == CHI[8]) k = 1;
      break; // thân
    case 4:
      if (chi == CHI[11]) k = 1;
      break; // hợi
    case 6:
      if (chi == CHI[0]) k = 1;
      break; // tý
    case 8:
      if (chi == CHI[3]) k = 1;
      break; // mão
    case 12:
      if (chi == CHI[7]) k = 1;
      break; // mùi
    case 16:
      if (chi == CHI[4]) k = 1;
      break; // thìn
    case 18:
      if (chi == CHI[10]) k = 1;
      break; // tuất
    case 20:
      if (chi == CHI[1]) k = 1;
      break; // sửu
    case 22:
      if (chi == CHI[5]) k = 1;
      break; // tị
    case 24:
      if (chi == CHI[2]) k = 1;
      break; // dần
    case 26:
      if (chi == CHI[6]) k = 1;
      break; // ngọ
    case 28:
      if (chi == CHI[9]) k = 1;
      break; // dậu
  }
  return k;
}

// Hội Đồng 會同 (DGTNH - Tang Táng Loại) ***
// nghi tu lí phần mộ, cải mộ cát nhật:
// giáp tý, bính dần, kỷ mão, giáp thân, ất dậu, mậu dần, bính thân, tân dậu, quý dậu
export function hoiDong(nn) {
  // nn: lunar.dd
  var can = ThienCan(nn);
  var chi = DiaChi(nn);
  var k = 0;

  if (can == CAN[0] && chi == CHI[0]) k = 1; // giáp tý
  else if (can == CAN[0] && chi == CHI[8]) k = 1; // giáp thân
  else if (can == CAN[1] && chi == CHI[9]) k = 1; // ất dậu
  else if (can == CAN[2] && chi == CHI[2]) k = 1; // bính dần
  else if (can == CAN[2] && chi == CHI[8]) k = 1; // bính thân
  else if (can == CAN[4] && chi == CHI[2]) k = 1; // mậu dần
  else if (can == CAN[5] && chi == CHI[3]) k = 1; // kỷ mão
  else if (can == CAN[7] && chi == CHI[9]) k = 1; // tân dậu
  else if (can == CAN[9] && chi == CHI[9]) k = 1; // quý dậu

  return k;
}

// văn tinh 文星 (DGTNH ***) án: tứ tự chi trường sanh, lâm quan vị.
// nghi nhập học. bất tri nhập học nghi thành nhật, khai nhật; kim nãi dĩ trường sanh vi học đường, lâm quan vi học quán
// án: văn tinh, tứ tự chi trường sinh, lâm quan vị dã. trường sinh vi học đường, lâm quan vi học quán
// trường sinh:
//  giáp trường sinh tại hợi, ất trường sinh tại ngọ
//  bính mậu trường sinh tại dần, đinh trường sinh tại dậu
//  canh trường sinh tại tị, tân kỷ trường sinh tại tý
//  nhâm trường sinh tại thân, quý trường sinh tại mão
// Tức: hợi ngọ dần dậu dần dậu tị tý thân mão
// lâm quan:
//   giáp lâm quan tại dần, ất lâm quan mão,
//   bính mậu lâm quan tị, đinh kỷ lâm quan ngọ,
//   canh lâm quan tại thân, tân lâm quan tại dậu,
//   nhâm lâm quan tại hợi, quý lâm quan tại tý
// Tức: dần mão tị ngọ tị ngọ thân dậu mão hợi tý
//
export function vanTinh(can, nn) {
  // can: tháng
  var chi = DiaChi(nn);
  var v = 0;
  switch (can) {
    case 0:
      if (chi == CHI[11] || chi == CHI[2]) v = 1;
      break; // hợi hay dần
    case 1:
      if (chi == CHI[6] || chi == CHI[3]) v = 1;
      break; // ngọ hay mão
    case 2:
      if (chi == CHI[2] || chi == CHI[5]) v = 1;
      break; // dần hay tị
    case 3:
      if (chi == CHI[9] || chi == CHI[6]) v = 1;
      break; // dậu hay ngọ
    case 4:
      if (chi == CHI[2] || chi == CHI[5]) v = 1;
      break; // dần hay tị
    case 5:
      if (chi == CHI[9] || chi == CHI[6]) v = 1;
      break; // dậu hay ngọ
    case 6:
      if (chi == CHI[5] || chi == CHI[8]) v = 1;
      break; // tị hay thân
    case 7:
      if (chi == CHI[0] || chi == CHI[9]) v = 1;
      break; // tý hay dậu
    case 8:
      if (chi == CHI[8] || chi == CHI[11]) v = 1;
      break; // thân hay hợi
    case 9:
      if (chi == CHI[3] || chi == CHI[0]) v = 1;
      break; // mão hay tý
  }
  return v;
}

// thiên phiên địa phúc thời: hợi tuất dậu thân mùi ngọ dậu thìn dậu thìn mùi mão
// địa phúc nhật cát nhất chánh ngũ cửu nguyệt thân nhật, nhị, lục thập nguyệt tị nhật, tam, thất thập nhất nguyệt dần nhật, tứ, bát thập nhị nguyệt hợi nhật

//CAN = new Array("Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý");
//CHI = new Array("Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi" );
