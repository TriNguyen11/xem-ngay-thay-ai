// Linh Tinh
// Những Functions dùng trong Âm Lịch

import { canVi, chiVi, LunarDate, monthDays, TietKhi } from "./AmLich";
import { CAN } from "./Constant";

// Ngày Lễ mừng Dương Lịch
export var solarFest = {
  "1-1": "Tết Tây (1/1 DL)",
  "1-9": "Ngày truyền thống học sinh - sinh viên Việt Nam (1/9 DL)",

  "2-3": "Ngày thành lập Đảng Cộng sản Việt Nam (3/2 DL)",
  "2-14": "Lễ tình nhân (14/2 DL)",
  "2-27": "Ngày Thầy thuốc Việt Nam (27/2 DL)",

  "3-1": "Ngày sinh của Đồng chí Phạm Văn Đồng (1/3/1906 DL)",
  "3-3": "Ngày Truyền Thống Bộ đội Biên phòng (3/3/1959 DL)",
  "3-8": "Ngày Quốc tế Phụ nữ (8/3 DL)",
  "3-20": "Ngày Quốc tế Hạnh phúc (20/3 DL)",
  "3-22": "Ngày Nước sạch Thế giới (22/3 DL)",
  "3-26": "Ngày thành lập Đoàn Thanh niên Cộng sản Hồ Chí Minh (26/3/1931 DL)",
  "3-27": "Ngày Thể thao Việt Nam (27/3/1991 DL)",
  "3-28": "Ngày thành lập Lực Lượng Dân Quân Tự Vệ (28/3/1935 DL)",

  "4-21": "Ngày sách Việt Nam (21/4/2014 DL)",
  "4-29": "Ngày mất của Đồng chí Phạm Văn Đồng (29/4/2000 DL)",
  "4-30": "Ngày Giải phóng Miền Nam, Thống nhất Đất nước (30/4/1975 DL)",

  "5-1": "Quốc tế lao động (1/5 DL)",
  "5-6": "Ngày giỗ của Đồng chí Phạm Văn Đồng (6/5/2000 DL)",
  "5-7": "Ngày chiến thắng Điện Biên Phủ (7/5/1954 DL)",
  "5-15": "Ngày thành lập Đội Thiếu niên Tiền phong Hồ Chí Minh (15/5/1941 DL)",
  "5-19": "Ngày sinh của Chủ tịch Hồ Chí Minh (19/5/1890 DL)",

  "6-1": "Ngày Quốc tế Thiếu nhi (1/1 DL)",
  "6-5":
    "Ngày Bác Hồ ra đi tìm đường cứu nước (5/6/1911 DL) \n Ngày Môi trường Thế giới",
  "6-21": "Ngày Báo chí Cách mạng Việt Nam (21/6/1925 DL)",
  "6-28": "Ngày Gia đình Việt Nam (28/6 DL)",

  "7-1": "Ngày Bảo hiểm Y tế Việt Nam (1/7 DL)",
  "7-15":
    "Ngày Truyền thống Lực lượng Thanh niên xung phong Việt Nam (15/7/1950 DL)",
  "7-27": "Ngày Thương binh Liệt sĩ (27/7/1947 DL)",
  "7-28": "Ngày thành lập Công đoàn Việt Nam (28/7/1929 DL)",

  "8-19": "Ngày Cách mạng tháng Tám thành công (19/8/1945 DL)",

  "9-2":
    "Ngày Quốc khánh (2/9/1945 DL) \n Ngày mất của Chủ tịch Hồ Chí Minh (2/9/1969 DL)",
  "9-7":
    "Ngày thành lập Đài Tiếng nói Việt Nam (7/9/1945 DL) \n Ngày thành lập Đài Truyền hình Việt Nam (1970)",
  "9-10": "Ngày thành lập Mặt trận Tổ quốc Việt Nam (10/9/1955 DL)",

  "10-2": "Ngày Khuyến học Việt Nam (2/10/1996 DL)",
  "10-10":
    "Ngày giải phóng thủ đô (10/10/1954 DL) \nThăng Long - Hà Nội (1010) \nNgày Truyền thống Luật sư Việt Nam (1945)",
  "10-14": "Ngày thành lập Hội Nông dân Việt Nam (14/10/1930 DL)",
  "10-15":
    "Ngày truyền thống Hội Liên hiệp Thanh niên Việt Nam (15/10/1956 DL)",
  "10-20": "Ngày Phụ nữ Việt Nam (20/10/1930 DL)",

  "11-9": "Ngày Pháp luật Việt Nam (9/11/1946 DL)",
  "11-18":
    "Ngày Thành lập Mặt trận Dân tộc Thống nhất Việt Nam (18/11/1930 DL)",
  "11-19": "Ngày Quốc Tế Nam Giới (19/11 DL)",
  "11-20": "Ngày Nhà giáo Việt Nam (20/11 DL)",

  "12-6": "Ngày Thành lập Hội Cựu Chiến binh Việt Nam (6/12/1989 DL)",
  "12-20":
    "Ngày Thành lập Mặt trận Dân tộc Giải phóng miền Nam Việt Nam (20/12/1960 DL)",
  "12-24": "Lễ Giáng Sinh (24/12 DL)",
  "12-22":
    "Ngày thành lập Quân đội Nhân dân Việt Nam (22/12/1944)\n Ngày hội Quốc phòng toàn dân (1989)",
  "12-25": "Lễ Giáng Sinh (25/12 DL)",
};

// Ngày Lễ mừng Âm Lịch
export var lunarFest = {
  "1-1": "Tết Nguyên Đán (1/1 ÂL)",
  "1-15": " Tết Nguyên tiêu (15/1 ÂL)",
  "3-3": " Tết Hàn thực (3/3 ÂL)",
  "3-10": " Giỗ Tổ Hùng Vương (10/3 ÂL)",
  "4-15": " Lễ Phật Đản (15/4 ÂL)",
  "5-5": " Tết Đoan Ngọ (5/5 ÂL)",
  "7-15": " Vu Lan (15/7 ÂL)",
  "8-15": " Tết Trung Thu (15/8 ÂL)",
  "12-23": " Ông Táo chầu trời (23/12 ÂL)",
};

// Lấy Âm Lịch
export async function AmLich(dd, mm, yy) {
  var oLunar = LunarDate(dd, mm, yy);

  var t = TietKhi(yy, (mm - 1) * 2);
  var oTiet = LunarDate(t, mm, yy); // Tiết lệnh

  var tue = oLunar.yearLunar; // năm âm lịch theo tiết
  var tiet = mm - 1;

  if (tiet == 0) {
    tiet = 12;
    if (tue == yy) tue--;
  }
  if (oLunar.daysTotalInLunar < oTiet.daysTotalInLunar) {
    if (tiet <= 12) {
      tiet--;
      if (tiet == 0) {
        tiet = 12;
        if (tue == yy) tue--;
      }
    }
    t = TietKhi(tue, tiet * 2);
    oTiet = LunarDate(t, tiet + 1, tue);
  }
  if (tiet == 1 && tue < yy) tue = yy;

  return {
    tue: tue,
    tn: oLunar.daysTotalInLunar - oTiet.daysTotalInLunar + 1, // Tiết ngày: số ngày sau tiết, gồm cả ngày đầu
    t: t,
    full: monthDays(oLunar.yearLunar, oLunar.monthLunar) == 30,
    isLeap: oLunar.isLeap,
    dayLunar: oLunar.dayLunar,
    monthLunar: oLunar.monthLunar,
    yearLunar: oLunar.yearLunar,
    daysTotalInLunar: oLunar.daysTotalInLunar,
    daySolar: oLunar.daySolar,
    monthSolar: oLunar.monthSolar,
    yearSolar: oLunar.yearSolar,
  };
}

// Lấy Can Chi
export function CanChi(num) {
  return CAN[num % 10] + " " + CHI[num % 12];
}

export function CanChiNapAm(canchi) {
  var cc = "";
  cc += canchi;
  var C = cc.split(/ /);
  return napAm(canVi(C[0]), chiVi(C[1]));
}

// Định ngày Phục Sinh
export function Easter(y) {
  var t2 = TietKhi(y, 5);
  var t2Date = new Date(Date.UTC(y, 2, t2, 0, 0, 0, 0));
  var t2Lunar = LunarDate(
    t2Date.getDate(),
    t2Date.getMonth() + 1,
    t2Date.getFullYear()
  );
  var mLen;

  if (t2Lunar.day < 15) mLen = 15 - t2Lunar.day;
  else
    mLen =
      (t2Lunar.isLeap ? leapDays(y) : monthDays(y, t2Lunar.month)) -
      t2Lunar.day +
      15;

  // 1000*60*60*24 = 86400000
  var mLunar15 = new Date(t2Date.getTime() + 86400000 * mLen);
  var Easter = new Date(
    mLunar15.getTime() + 86400000 * (7 - mLunar15.getUTCDay())
  );

  this.m = Easter.getUTCMonth();
  this.d = Easter.getUTCDate();
}

// return T (1...12)
export function layTiet(yy, mm, dd) {
  // yy & mm: DL mm (1..12), dd (1..31)
  var T = 0;
  var tk = (mm - 1) * 2;
  var x = TietKhi(yy, tk);
  if (tk == 0) tk = 24;
  if (dd < x) T = tk / 2 - 1;
  else T = tk / 2;
  if (T == 0) T = 12;
  return T;
}

// return T (1...12)
export function khoiTiet(yy, mm) {
  // yy & mm: DL mm (1..12)
  var tk = (mm - 1) * 2;
  var x = TietKhi(yy, tk);
  return x;
}

// return T (1...12)
export function tietHau(yy, mm, dd) {
  // yy & mm: DL mm (1..12), dd (1..31)
  var tk = (mm - 1) * 2;
  var x = TietKhi(yy, tk);
  if (tk == 0) tk = 24;
  if (dd < x) T = tk / 2 - 1;
  else T = tk / 2;
  if (x == dd) T--;
  if (T == 0) T = 12;
  return T;
}

// return T (1...12)
export function khiHau(yy, mm, dd) {
  // yy & mm: DL mm (1..12), dd (1..31)
  var tk = (mm - 1) * 2 + 1;
  var x = TietKhi(yy, tk);
  //alert('tk='+tk+' x='+x+' d='+dd);
  if (tk == 1) tk = 25;
  if (dd < x) T = (tk - 1) / 2 - 1;
  else T = (tk - 1) / 2;
  //alert("tk="+tk+" T="+T);
  if (x == dd) T--;
  if (T <= 0) T = 12;
  return T;
}

export function ngayTietHau(yy, mm, dd) {
  // yy & mm: DL mm (1..12), dd (1..31)
  var y = yy;
  var m = mm;
  var n = khoiTiet(y, m);
  if (n >= dd) {
    // tiết hậu
    if (m == 1) {
      m = 12;
      y--;
    } else m--;
    n = khoiTiet(y, m);
  }
  var t = Date.UTC(y, m - 1, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;
  return t + n;
}

export function ngayKhoiTiet(yy, mm, dd) {
  // yy & mm: DL mm (1..12), dd (1..31)
  var y = yy;
  var m = mm;
  var n = khoiTiet(y, m);
  if (n > dd) {
    if (m == 1) {
      m = 12;
      y--;
    } else m--;
    n = khoiTiet(y, m);
  }
  var t = Date.UTC(y, m - 1, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;
  return t + n - 1;
}

// return T (0...3)
export function lay4Thoi(yy, mm, dd) {
  // yy & mm: DL mm (1..12), dd (1..31)
  var x,
    T = 0;

  if (mm == 2) {
    t = TietKhi(yy, 2); // Lập Xuân
    if (dd < x) T = 3;
    else T = 0;
  } else if (mm == 3 || mm == 4)
    // Xuân
    T = 0;
  else if (mm == 5) {
    x = TietKhi(yy, 8); // Lập Hạ
    if (dd < x) T = 0;
    else T = 1;
  } else if (mm == 6 || mm == 7)
    // Hạ
    T = 1;
  else if (mm == 8) {
    x = TietKhi(yy, 14); // Lập Thu
    if (dd < x) T = 1;
    else T = 2;
  } else if (mm == 9 || mm == 10)
    // Thu
    T = 2;
  else if (mm == 11) {
    x = TietKhi(yy, 20); // Lập Đông
    if (dd < x) T = 2;
    else T = 3;
  } else if (mm == 1 || mm == 12)
    // Đông
    T = 3;

  return T;
}

var i_cat_nhat = [
  "âm đức: :kiến tiếu, tế tự, thiết trai tiếu, thi ân, hành huệ, công quả, tuất cô quỳnh, tuyết oan uổng",
  "bàng chánh phế: :đa khả dụng",
  "bảo nhật: :an phủ biên cảnh, tuyển tướng, huấn binh, xuất sư",
  "bảo quang:*:kì phúc, tu phương, tạo táng, giá thú, đính hôn",
  "bất tướng: :giá thú, đính hôn, chiêu chuế, nạp tế, kiến nghĩa lệ",
  "cát khánh: :khánh điển, thiết yến, hội hữu, nạp đơn, thượng quan, phó nhậm",
  "cát kì: :xuất quân, hành sư, hội nhân thân, công thành trại, hưng điếu phạt",
  "chế nhật: :an phủ biên cảnh, tuyển tướng, huấn binh, xuất sư",
  "chi đức: :tạo ốc, trang tu, giá thú, lập khế, tế tự, bách sự nghi dụng",
  "chi đức hợp: :tạo táng, tu tác, hưng công trợ phúc",
  "dân nhật: :yến hội, kết hôn nhân, nạp thái, vấn danh, tiến nhân khẩu, bàn di, khai thị, lập khoán, giao dịch, nạp tài, tài chủng, mục dưỡng, nạp súc",
  "dịch mã: :hành hạnh, khiển sử, bàn di, xuất hành, cầu y, liệu bệnh, tạo táng, xuất quân, viễn hành, phục dược",
  "dương đức: :giá thú, đính hôn, khai thị, nhập trạch, tạo táng",
  "đại hồng sa:*:bách sự nghi dụng",
  "đại minh:*:bách sự nghi dụng, an táng",
  "đại thâu: :sách tá, tu trạch, tạo trạch, tu lộ, tu kiều, tu táo, tu phần",
  "địa hổ: :an táng, tu phương",
  "địa tài tinh: :nhập tài",
  "giải thần:*:bách sự nghi dụng, thượng biểu chương, trần từ tụng, giải trừ, mộc dục, chỉnh dung thế đầu, chỉnh thủ túc giáp, cầu y, liệu bệnh",
  "hiển tinh:*:tạo táng, tu doanh, tham yết, thượng quan, phó nhậm, khoa cử, nhập học, giá thú",
  "hoạnh tài: :tạo táng, tu tác, khai thị, di đồ, xuất hành",
  "hoạt diệu:*:bách sự nghi dụng",
  "hội đồng: :tu lí phần mộ, cải mộ",
  "ích hậu: :tế tự, kì phúc, cầu tự, tạo trạch xá, trúc viên tường, đính hôn, giá thú, an sản thất, tu tác, tạo táng",
  "khúc tinh:*:tạo táng, tu doanh, tham yết, thượng quan, phó nhậm, khoa cử, nhập học, giá thú",
  "kim đường: :khởi tạo, tác sự, tạo trạch, tu trạch, cầu tài, thượng quan, di cư, di đồ, nhập trạch, giá thú, an táng, xuất hành, liệu bệnh",
  "kim quỹ:*:tu trạch, tạo trạch, đính hôn, giá thú, cầu tự, nhập trạch, khai thị",
  "kính an: :tế tự, tự thần, trai tiếu, kì phúc, hứa nguyện",
  "kính tâm: :tế tự, tự thần, trai tiếu, kì phúc, hứa nguyện",
  "la thiên đại tiến: :kì phúc, cầu tự, giá thú, đính hôn, tu tạo, nhập trạch, khai thị, giao dịch, cầu tài, tạo táng",
  "lâm nhật: :thượng sách, tiến biểu chương, thượng quan, phó nhậm, lâm chánh thân dân, trần từ tụng",
  "lộc khố: :nạp tài, tồn khoản",
  "lục hợp: :yến hội, kết hôn nhân, đính hôn, giá thú, tiến nhân khẩu, kinh lạc, uấn nhưỡng, khai thị, nhập trạch, lập khoán, giao dịch, nạp tài, nạp súc, an táng",
  "lục nghi: :lâm chánh thân dân, kiến nghĩa lệ",
  "mẫu thương: :tế tự, kì phúc, cầu tự, thi ân phong bái, cử chánh trực, khánh tứ, thưởng hạ, yến hội, hành hạnh, khiển sử, thượng quan, phó nhậm, lâm chánh thân dân, kết hôn nhân, nạp thái, vấn danh, bàn di, giải trừ, cầu y, liệu bệnh, tài chế, tu cung thất, thiện thành quách, tu tạo, động thổ, thụ trụ, thượng lương, nạp tài, khai thương khố, xuất hóa tài, tài chủng, mục dưỡng",
  "minh đường:*:thượng quan, an sàng, an táo, tu trạch, tạo trạch, nhập trạch, bách sự nghi dụng",
  "minh phệ: :phá thổ, thành phục, trừ phục, an táng, bàng phụ táng",
  "minh phệ đối: :phá thổ, khải toản, tu phần, trảm thảo, an táng",
  "minh tinh: :cầu danh, bái sư, học nghệ, phó nhậm, kì phúc, trai tiếu, tạo táng",
  "mãn đức:*:vạn thông tứ cát",
  "nghĩa nhật: :an phủ biên cảnh, tuyển tướng, huấn binh, xuất sư",
  "ngọc đường:*:tu trạch, tạo trạch, an sàng, khai thương, tác táo, nhập trạch",
  "ngọc hoàng:*:đính hôn, giá thú, nhập trạch",
  "ngọc vũ: :khởi tạo, tác sự, tạo trạch, tu trạch, cầu tài, thượng quan, di cư, di đồ, nhập trạch, giá thú, an táng, xuất hành, liệu bệnh",
  "ngũ đế sinh:*:tạo tác",
  "ngũ hợp: :yến hội, kết hôn nhân, giá thú, lập khoán, giao dịch",
  "ngũ phú: :kinh lạc, uấn nhưỡng, khai thị, lập khoán, giao dịch, nạp tài, khai thương khố, xuất hóa tài, tài chủng, mục dưỡng, nạp súc, di cư, nhập trạch",
  "nguyệt ân:*:tế tự, kì phúc, trai tiếu, cầu tự, thi ân phong bái, cử chánh trực, khánh tứ, thưởng hạ, yến hội, hành hạnh, khiển sử, thượng quan, phó nhậm, lâm chánh thân dân, kết hôn nhân, nạp thái, vấn danh, bàn di, di đồ, giải trừ, cầu y, liệu bệnh, tài chế, tu cung thất, tu tạo, thiện thành quách, động thổ, thụ trụ, thượng lương, nạp tài, khai thương khố, xuất hóa tài, tài chủng, mục dưỡng, tạo táng",
  "nguyệt đức:*:nghi tế tự, kì phúc, cầu tự, thượng sách, tiến biểu chương, ban chiếu, đàm ân, tứ xá, thi ân phong bái, chiêu hiền, cử chánh trực, thi ân huệ, tuất cô quỳnh, tuyên chánh sự, hành huệ ái, tuyết oan uổng, hoãn hình ngục, khánh tứ, thưởng hạ, yến hội, hành hạnh, khiển sử, an phủ biên cảnh, tuyển tướng, huấn binh, xuất sư, thượng quan, phó nhậm, lâm chánh thân dân, kết hôn nhân, nạp thái, vấn danh, đính hôn, giá thú, bàn di, nhập trạch, giải trừ, cầu y, liệu bệnh, tài chế, doanh kiến cung thất, thiện thành quách, tu tạo, động thổ, thụ trụ, thượng lương, tu thương khố, tài chủng, mục dưỡng, nạp súc, an táng",
  "nguyệt đức hợp:*:tế tự, kì phúc, cầu tự, thượng sách, tiến biểu chương, ban chiếu, đàm ân, tứ xá, thi ân phong bái, chiếu chiêu hiền, cử chánh trực, thi ân huệ, tuất cô quỳnh, tuyên chánh sự, hành huệ ái, tuyết oan uổng, hoãn hình ngục, khánh tứ, thưởng hạ, yến hội, hành hạnh, khiển sử, an phủ biên cảnh, tuyển tướng, huấn binh, xuất sư, thượng quan, phó nhậm, lâm chánh thân dân, kết hôn nhân, đính hôn, nạp thái, vấn danh, giá thú, bàn di, nhập trạch, giải trừ, cầu y, liệu bệnh, tài chế, doanh kiến cung thất, thiện thành quách, tu tạo, động thổ, thụ trụ, thượng lương, tu thương khố, tài chủng, mục dưỡng, nạp súc, an táng",
  "nguyệt không: :thiết trù mưu, định kế sách, trần lợi ngôn, hiến chương sớ, tạo sàng trướng, an sàng trướng, tu tạo, tu sản thất, động thổ, thủ thổ",
  "nguyệt tài: :di đồ, xuất hành, khai thị, khai thương, cầu tài, tạo táng",
  "phó tinh:*:tạo táng, tu doanh, tham yết, thượng quan, phó nhậm, khoa cử, nhập học, giá thú",
  "phổ hộ: :kì phúc, trai tiếu, xuất hành, di đồ, giá thú",
  "phúc đức: :thượng sách, tiến biểu chương, khánh tứ, thưởng hạ, yến hội, tu cung thất, thiện thành quách",
  "phúc hậu: :kì phúc, thiết trai tiếu, nhập trạch, cầu tài, thượng quan, phó nhậm, giá thú",
  "phúc sinh: :tế tự, kì phúc, thiết trai tiếu, nhập trạch, cầu tài",
  "quan nhật: :thụ phong, thượng quan, phó nhậm, lâm chánh thân dân, tác táo",
  "sinh khí: :phong bái, thượng quan, khởi tạo, động thổ, giá thú, cầu tài, tu trúc thành lũy, khai đạo câu cừ, khởi thổ tu doanh, dưỡng dục quần súc, chủng thì",
  "tạ thổ cát nhật: :tạ thổ",
  "tam hợp:*:kì phúc, khánh tứ, thưởng hạ, yến hội, kết hôn nhân, đính hôn, nạp thái, vấn danh, giá thú, nhập trạch, khai thị, tiến nhân khẩu, tài chế, tu cung thất, thiện thành quách, tu tạo, động thổ, thụ trụ, thượng lương, tu thương khố, kinh lạc, uấn nhưỡng, lập khoán, giao dịch, nạp tài, an đối ngại, nạp súc",
  "tham lang: :tạo táng, tu phương",
  "thần tại: :đảo từ, tế tự, trai tiếu, kì phúc, hứa nguyện, cầu tài",
  "thanh long:*:bách sự nghi dụng, kì phúc, giá thú, đính hôn, tạo trạch, tạo táng",
  "thánh tâm: :khởi tạo, tế tự, tự thần, trai tiếu, kì phúc, công quả, giá thú, hội khách, cầu tài",
  "thất thánh: :tế tự, trai tiếu, kì phúc, hứa nguyện",
  "thiên ân: :kì phúc, trai tiếu, thượng quan, thụ phong, di đồ, kết hôn nhân, đính hôn, giá thú, tạo táng",
  "thiên đế: :đa khả dụng",
  "thiên đức:*:tế tự, kì phúc, cầu tự, thượng sách, tiến biểu chương, ban chiếu, đàm ân, tứ xá, thi ân phong bái, chiêu hiền, cử chánh trực, thi ân huệ, tuất cô quỳnh, tuyên chánh sự, hành huệ ái, tuyết oan uổng, hoãn hình ngục, khánh tứ, thưởng hạ, yến hội, hành hạnh, khiển sử, an phủ biên cảnh, tuyển tướng, huấn binh, xuất sư, thượng quan, phó nhậm, lâm chánh thân dân, kết hôn nhân, nạp thái, vấn danh, giá thú, bàn di, nhập trạch, giải trừ, cầu y, liệu bệnh, tài chế, doanh kiến cung thất, thiện thành quách, tu tạo, động thổ, thụ trụ, thượng lương, tu thương khố, tài chủng, mục dưỡng, nạp súc, an táng",
  "thiên đức hợp:*:tế tự, kì phúc, cầu tự, thượng sách, tiến biểu chương, ban chiếu, đàm ân, tứ xá, thi ân phong bái, chiêu hiền, cử chánh trực, thi ân huệ, tuất cô quỳnh, tuyên chánh sự, hành huệ ái, tuyết oan uổng, hoãn hình ngục, khánh tứ, thưởng hạ, yến hội, hành hạnh, khiển sử, an phủ biên cảnh, tuyển tương, huấn binh, xuất sư, thượng quan, phó nhậm, lâm chánh thân dân, kết hôn nhân, nạp thái, vấn danh, giá thú, bàn di, nhập trạch, giải trừ, cầu y, liệu bệnh, tài chế, doanh kiến cung thất, thiện thành quách, tu tạo, động thổ, thụ trụ, thượng lương, tu thương khố, tài chủng, mục dưỡng, nạp súc, an táng",
  "thiên đức hoàng đạo:*:kì phúc, tu phương, tạo táng, giá thú, đính hôn, bách sự nghi dụng",
  "thiên hậu: :cầu y, liệu bệnh, châm cứu, phục dược, kì phúc, lễ thần",
  "thiên hoàng:*:đính hôn, giá thú, nhập trạch",
  "thiên hỷ: :thi ân phong bái, cử chánh trực, khánh tứ, thưởng hạ, yến hội, hành hạnh, khiển sử, thượng quan, phó nhậm, lâm chánh thân dân, kết hôn nhân, nạp thái, vấn danh, giá thú",
  "thiên mã: :kinh thương, bái công khanh, tuyên bố chánh sự, viễn hành, xuất chinh, xuất hành, hành hạnh, khiển sử, bàn di",
  "thiên nguyện:*:tế tự, kì phúc, cầu tự, thượng sách, tiến biểu chương, thượng biểu chương, ban chiếu, đàm ân, tứ xá, thi ân phong bái, chiêu hiền, cử chánh trực, thi ân huệ, tuất cô quỳnh, tuyên chánh sự, hành huệ ái, tuyết oan uổng, hoãn hình ngục, khánh tứ, thưởng hạ, yến hội, hành hạnh, khiển sử, an phủ biên cảnh, tuyển tướng, huấn binh, thượng quan, phó nhậm, lâm chánh thân dân, kết hôn nhân, nạp thái, vấn danh, giá thú, tiến nhân khẩu, bàn di, tài chế, doanh kiến cung thất, thiện thành quách, hưng tạo, động thổ, thụ trụ, thượng lương, tu thương khố, kinh lạc, uấn nhưỡng, khai thị, lập khoán, giao dịch, nạp tài, tài chủng, mục dưỡng, nạp súc, an táng",
  "thiên nhạc:*:tạo táng, hưng tu",
  "thiên phú: :thượng quan, tài chế, tu thương khố, tạo thương khố, cầu tài, khai thị, khai điếm, lập khoán, giao dịch, nạp lễ, nạp tài, xuất tài, xuất hóa tài, tài y, hợp trướng, tạo táng",
  "thiên phúc:*:thượng quan, kì phúc, đính hôn, nạp thái, tống lễ, nhập trạch, xuất hành, khai thị",
  "thiên quan: :thượng quan, phó nhậm",
  "thiên quý:*:thượng quan, phó nhậm",
  "thiên tài tinh: :cầu tài, tác thương khố, khai điếm, xuất hành, di tỉ, điền cơ, tạo táng",
  "thiên thành: :nghi thất, nghi gia cư, hội thân hữu",
  "thiên thương: :khởi tạo, tạo thương khố, tu thương khố, nạp tài, nạp súc, tiến nhân khẩu",
  "thiên thụy:*:bách sự nghi dụng, thượng quan, kì phúc, bội ấn, đính hôn, nạp thái, tống lễ, nạp lễ, thụ hạ, nhập trạch, khai thị",
  "thiên xá: :thi ân, tế tự, kì phúc, cầu tự, trai tiếu, giá thú, đính hôn, di cư, nhập trạch, khởi công, hưng tu, tu tạo, tạo táng, động thổ",
  "thiên vu: :hợp dược, thỉnh y, tự quỷ thần, cầu phúc nguyện, tế tự, kì phúc",
  "thiên y: :hợp dược, phục dược, cầu y, liệu bệnh, trị bệnh, châm cứu",
  "thời âm:*:bách sự nghi dụng, quan đới",
  "thời dương: :thượng nhâm, bái quan, kết hôn nhân, xuất hành, tu tạo, động thổ, phần mộ, khai tứ, tị bệnh, chủng thực, nê sức, tạo táng, hợp thọ mộc",
  "thời đức: :tế tự, kì phúc, cầu tự, thi ân phong bái, cử chánh trực, khánh tứ, thưởng hạ, yến hội, hành hạnh, khiển sử, thượng quan, phó nhậm, lâm chánh thân dân, kết hôn nhân, đính hôn, nạp thái, vấn danh, bàn di, giải trừ, cầu y, liệu bệnh, tài chế, tu cung thất, thiện thành quách, tu tạo, động thổ, thụ trụ, thượng lương, nạp tài, khai thương khố, xuất hóa tài, tài chủng, mục dưỡng, yến nhạc",
  "thôi quan: :thượng quan, phó nhậm",
  "thủ nhật: :thụ phong, thượng quan, phó nhậm, lâm chánh thân dân, an phủ biên cảnh",
  "trừ thần: :giải trừ, mộc dục, chỉnh dung thế đầu, chỉnh thủ túc giáp, cầu y, liệu bệnh, tảo xá vũ",
  "tư mệnh:*:khởi tạo, tu tác, tu táo, tạo táo, tự táo, thụ phong",
  "tứ tướng: :tế tự, thượng quan, đính hôn, nạp thái, giá thú, khởi công, tạo trạch, tu trạch, thượng lương, viễn hành",
  "tử vi:*:đính hôn, giá thú, nhập trạch",
  "tục thế: :tế tự, kì phúc, tự thần kì, cầu tự, đính hôn, giá thú, tu tác, tạo táng, mục thân tộc, lập tự",
  "tuế chi đức: :tạo táng, tu doanh",
  "tuế chi hợp: :thượng quan, phó nhậm, di cư, kì phúc, giá thú, đính hôn, tu phương, động thổ, tạo táng",
  "tuế đức: :thượng quan, phó nhậm, di cư, kì phúc, giá thú, đính hôn, tu phương, động thổ, tạo táng",
  "tuế đức hợp: :tu phương, tạo táng",
  "tuế lộc: :tạo táng, tu phương",
  "tuế nguyệt đức: :tạo táng, tu doanh",
  "tuế thiên đạo: :tạo táng, tu phương",
  "tuế thiên đức: :bách sự nghi dụng",
  "tuế thiên hợp: :nghi tạo táng, tu phương",
  "tuế vị đức: :tạo táng, tu phương",
  "tuế vị hợp: :.",
  "tướng nhật: :thụ phong, thượng quan, phó nhậm, lâm chánh thân dân, giá thú",
  "u vi tinh:*:bách sự nghi dụng",
  "vương nhật: :ban chiếu, đàm ân, tứ xá, thi ân phong bái, chiêu hiền, cử chánh trực, thi ân huệ, tuất cô quỳnh, tuyên chánh sự, hành huệ ái, tuyết oan uổng, hoãn hình ngục, khánh tứ, thưởng hạ, yến hội, hành hạnh, khiển sử, an phủ biên cảnh, tuyển tướng, huấn binh, thượng quan, phó nhậm, lâm chánh thân dân, tài chế",
  "vượng nhật: :thượng quan, phó nhậm, xuất hành, khai trương, khởi tạo, giá thú",
  "yếu an: :an thần, khởi tạo, tác sự, cầu tài, thượng quan, di cư, giá thú, an táng, xuất hành, liệu bệnh, đính hôn, tu phương, tạo táng",
  "yếu yên: :an thần, khởi tạo, tác sự, cầu tài, thượng quan, di cư, giá thú, an táng, xuất hành, liệu bệnh, đính hôn, tu phương, tạo táng",
];

// Index to Cat_Nhat Array
export function iCatNhat(name) {
  if (name == "") return 0;
  var temp = "";
  temp += name;
  var i;
  for (i = 0; i < i_cat_nhat.length; i++) {
    var item = "";
    item += i_cat_nhat[i];
    var A = item.split(/:/);
    if (temp.toLowerCase() == A[0]) break;
  }
  if (i < i_cat_nhat.length) return i + 1;
  return 0;
}

export function iCatNhatTu(i) {
  var name = "";
  if (i && i <= i_cat_nhat.length) {
    name += i_cat_nhat[i - 1];
    var A = name.split(/:/);
    return A[0];
  }
  return "";
}

export function iCatNhat2(name) {
  if (name == "") return 0;
  var i;
  var temp = "";
  temp += name;
  var R = "";
  for (i = 0; i < i_cat_nhat.length; i++) {
    var item = "";
    item += i_cat_nhat[i];
    var A = item.split(/:/);
    if (temp.toLowerCase() == A[0]) {
      R = A[1];
      break;
    }
  }
  return R;
}

export function iCatNhat3(name) {
  if (name == "") return 0;
  var i;
  var temp = "";
  temp += name;
  var R = "";
  for (i = 0; i < i_cat_nhat.length; i++) {
    var item = "";
    item += i_cat_nhat[i];
    var A = item.split(/:/);
    if (temp.toLowerCase() == A[0]) {
      R = A[2];
      break;
    }
  }
  return R;
}

var i_test = [
  "test1:*:test 1, test 2, Test 3, Test 4",
  "test2: :test 2, Test 3, Test 4",
  "test3:&:test 3, Test 4",
];

export function iTest(name) {
  if (name == "") return 0;
  var i;
  for (i = 0; i < i_test.length; i++) {
    if (i_test[i].match(/^(.+)(\b\:.\:)(.+)$/)) {
      alert(
        RegExp.$1 + " | " + RegExp.$2 + " | " + RegExp.$3 + " | " + RegExp.$4
      );
      if (name.toLowerCase() == RegExp.$1) {
        break;
      }
    }
  }

  if (i < i_test.length) {
    var S = RegExp.$3;
    var A = [];
    A = S.split(/, /);
    alert(A[0] + "-" + A[1] + "-" + A[2] + "-" + A[3]);
    return i + 1;
  }
  return 0;
}

var i_hung_nhat = [
  "âm nguyệt hà khôi:*:bách sự bất nghi",
  "âm nguyệt thiên cương: :kì phúc, cầu tự, thượng sách, tiến biểu chương, ban chiếu, thi ân phong bái, chiêu hiền, cử chánh trực, tuyên bố chánh sự, khánh tứ, thưởng hạ, yến hội, quan đới, hành hạnh, khiển sử, an phủ biên cảnh, tuyển tướng, huấn binh, xuất sư, thượng quan, phó nhậm, lâm chánh thân dân, kết hôn nhân, nạp thái, vấn danh, giá thú, bàn di, an sàng, giải trừ, cầu y, liệu bệnh, tài chế, doanh kiến cung thất, tu cung thất, thiện thành quách, trúc đê phòng, hưng tạo, động thổ, thụ trụ, thượng lương, cổ chú, kinh lạc, uấn nhưỡng, khai thị, lập khoán, giao dịch, khai thương khố, xuất hóa tài, tu trí sản thất, khai cừ, xuyên tỉnh, phá thổ, an táng, khải toản",
  "âm thác: :khởi tạo, khai thương khố, di cư, xuất hành, nhập học, giá thú, an táng",
  "bạch hổ:*:tu tạo, giá thú, di cư, châm cứu, an táng",
  "bạch hổ nhập trung:*:đại sát, bách sự bất nghi",
  "bại nhật: :thượng quan, di cư, kết hôn nhân, giao dịch, nhập học, khởi công, khởi tạo, giá mã",
  "băng tiêu ngõa giải: :thượng lương, nhập trạch, tác táo, tạo thuyền, tạo kiều",
  "băng tiêu ngõa hãm:*:bách sự bất nghi",
  "bát chuyên: :an phủ biên cảnh, tuyển tướng, huấn binh, xuất sư, kết hôn nhân, nạp thái, vấn danh, giá thú",
  "bát long: :giá thú, kết hôn nhân",
  "bát phong: :thừa ngư, hành thuyền, thừa thuyền, độ thủy, cái ốc",
  "bát tiết: :kết hôn nhân, giá thú",
  "bát tọa: :phá thổ, an táng, tu phần, khai sanh phần",
  "bất cử: :thượng quan, di cư, kết hôn nhân, giao dịch, nhập học",
  "câu trần:*:khởi tạo, nhập trạch, tu ốc, giá thú",
  "châu cách: :từ tụng",
  "chiêu diêu: :hành thuyền, thừa thuyền",
  "chu tước:*:giá thú, di đồ, phân cư, xuất hành, di cư, nhập trạch, an hương, từ tụng",
  "chuyên nhật: :an phủ biên cảnh, tuyển tướng, huấn binh, xuất sư",
  "cô thần: :giá thú",
  "cửu hổ: :giá thú, kết hôn nhân",
  "cửu khảm: :cổ chú, tài chủng, chủng thực, chú tả, thiêu diêu",
  "cửu khổ bát cùng:*:bách sự bất nghi",
  "cửu không: :tiến nhân khẩu, tu thương khố, khai thị, lập khoán, giao dịch, nạp tài, khai thương khố, xuất hóa tài, xuất hành, an sàng, tố họa thần tượng, tu lục súc lan",
  "cửu thổ quỷ: :thượng quan, phó nhậm, xuất hành, khởi tạo, động thổ, giao dịch, an môn",
  "cửu tiêu: :cổ chú, tài chủng, chủng thực, chú tả, thiêu diêu",
  "cửu xú: :xuất sư, giá thú, xuất hành, di tỉ, an táng",
  "diệt môn: :an môn, tu môn, táng mai",
  "du họa: :kì phúc, tế tự, cúng tế, kiến tiếu, cầu y, liệu bệnh, phục dược, xuất hành, di tỉ",
  "dương công kị:*:giá thú, đính hôn, tạo trạch, nhập trạch, di đồ, xuất hành, xuất hỏa, phân cư, động thổ, bách sự bất nghi",
  "dương thác: :thượng quan, phó nhậm, an sàng",
  "dương nguyệt hà khôi: :kì phúc, cầu tự, thượng sách, tiến biểu chương, ban chiếu, thi ân phong bái, chiêu hiền, cử chánh trực, tuyên bố chánh sự, khánh tứ, thưởng hạ, yến hội, quan đới, hành hạnh, khiển sử, an phủ biên cảnh, tuyển tướng, huấn binh, xuất sư, thượng quan, phó nhậm, lâm chánh thân dân, kết hôn nhân, nạp thái, vấn danh, giá thú, bàn di, an sàng, giải trừ, cầu y, liệu bệnh, tài chế, doanh kiến cung thất, tu cung thất, thiện thành quách, trúc đê phòng, hưng tạo, động thổ, thụ trụ, thượng lương, cổ chú, kinh lạc, uấn nhưỡng, khai thị, lập khoán, giao dịch, khai thương khố, xuất hóa tài, tu trí sản thất, khai cừ, xuyên tỉnh, phá thổ, an táng, khải toản",
  "dương nguyệt thiên cương:*:bách sự bất nghi",
  "đại bại:*:bách sự bất nghi",
  "đại hao: :khai thị, lập khoán, giao dịch, nạp tài, xuất hành, khai thương khố, yến hội, an sàng, tố họa thần tượng, tu lục súc lan",
  "đại họa:*:kì phúc, cầu tự, thượng sách, tiến biểu chương, thượng biểu chương, ban chiếu, thi ân phong bái, chiêu hiền, cử chánh trực, tuyên bố chánh sự, khánh tứ, thưởng hạ, yến hội, quan đới, hành hạnh, khiển sử, an phủ biên cảnh, tuyển tướng, huấn binh, xuất sư, thượng quan, phó nhậm, lâm chánh thân dân, kết hôn nhân, nạp thái, vấn danh, giá thú, tiến nhân khẩu, bàn di, viễn hồi, an sàng, giải trừ, chỉnh dung thế đầu, chỉnh thủ túc giáp, cầu y, liệu bệnh, tài chế, doanh kiến cung thất, tu cung thất, thiện thành quách, trúc đê phòng, hưng tạo, động thổ, thụ trụ, thượng lương, tu thương khố, cổ chú, kinh lạc, uấn nhưỡng, khai thị, lập khoán, giao dịch, nạp tài, khai thương khố, xuất hóa tài, tu trí sản thất, khai cừ, xuyên tỉnh, an đối ngại, bổ viên, tắc huyệt, tu sức viên tường, bình trì đạo đồ, phá ốc, hoại viên, phạt mộc, tài chủng, mục dưỡng, nạp súc, phá thổ, an táng, khải toản",
  "đại không vong:*:cầu tài, xuất hành, kinh thương, xuất tài, thượng quan",
  "đại sát: :an phủ biên cảnh, tuyển tướng, huấn binh, xuất binh, hành sư, xuất sư, hành binh",
  "đại thời:*:kì phúc, cầu tự, thượng sách, tiến biểu chương, thượng biểu chương, thi ân phong bái, chiêu hiền, cử chánh trực, quan đới, hành hạnh, khiển sử, an phủ biên cảnh, tuyển tướng, huấn binh, xuất sư, thượng quan, phó nhâm, lâm chánh thân dân, kết hôn nhân, nạp thái, vấn danh, giá thú, tiến nhân khẩu, bàn di, an sàng, giải trừ, cầu y, liệu bệnh, doanh kiến cung thất, tu cung thất, thiện thành quách, trúc đê phòng, hưng tạo, động thổ, thụ trụ, thượng lương, tu thương khố, khai thị, lập khoán, giao dịch, nạp tài, khai thương khố, xuất hóa tài, tu trí sản thất, tài chủng, mục dưỡng, nạp súc",
  "đại tiểu khốc nhật: :kiến trạch, nhập trạch",
  "đao châm: :khởi công, khởi tạo, giá mã",
  "đao khảm sát: :châm cứu",
  "địa cách: :chủng thực, an táng",
  "địa hỏa: :khởi tạo, chủng thực, tác diêu, tu diêu",
  "địa nang: :doanh kiến cung thất, tu cung thất, thiện thành quách, trúc đê phòng, hưng tạo, động thổ, khởi tạo, tu thương khố, tu trí sản thất, khai trì, khai cừ, xuyên tỉnh, an đối ngại, bổ viên, tu sức viên tường, bình trì đạo đồ, phá ốc, hoại viên, tài chủng, phá thổ",
  "địa phá:*:bách sự bất nghi, kì phúc, cầu tự, thượng sách, tiến biểu chương, ban chiếu, thi ân phong bái, chiêu hiền, cử chánh trực, tuyên bố chánh sự, khánh tứ, thưởng hạ, yến hội, quan đới, hành hạnh, khiển sử, an phủ biên cảnh, tuyển tướng, huấn binh, xuất sư, thượng quan, phó nhậm, lâm chánh thân dân, kết hôn nhân, nạp thái, vấn danh, giá thú, bàn di, an sàng, giải trừ, cầu y, liệu bệnh, tài chế, doanh kiến cung thất, tu cung thất, thiện thành quách, trúc đê phòng, hưng tạo, động thổ, thụ trụ, thượng lương, cổ chú, kinh lạc, uấn nhưỡng, khai thị, lập khoán, giao dịch, khai thương khố, xuất hóa tài, tu trí sản thất, khai cừ, xuyên tỉnh, phá thổ, an táng, khải toản",
  "địa quả: :giá thú",
  "địa tặc: :tạo táng, xuất hành, nhập trạch, khai thị, tu tạo, tế tự, xuất hỏa, tài chủng, khai trì",
  "địa thư: :giá thú",
  "điền ngân: :khai điền",
  "đồ đãi: :thượng quan, thụ nhậm, tiến nhân khẩu",
  "độc hỏa: :khởi tạo, châm cứu, cái ốc, tác táo, tố họa thần tượng",
  "đoản tinh: :tài y, tiến nhân khẩu, kinh lạc, khai thị, giao dịch, nạp tài, nạp súc",
  "giao long: :hành thuyền, tái hóa vật, tạo kiều lương, tác pha",
  "hà khôi: :khởi tạo, an môn",
  "hàm trì: :viễn hành, thừa chu hạ tái, hội khách, tu trì, tác yển, yến ẩm, giá thú, hòa hợp",
  "hiệp tỷ: :giá thú",
  "hình ngục: :thượng quan, kiến quý, tham yết, từ tụng, xuất hành",
  "hỏa cách: :châm cứu, diêu dã",
  "hỏa tinh: :thụ tạo, tu cái ốc vũ, tảo xá, tài y, tạo tác mộc giới, long táo, giá thú, di cư, thượng quan, xuất hành, lập khế mãi mại",
  "hoành thiên chu tước: :giá thú, thượng lương, an táng, di cư, khai trì",
  "hoang vu: :tu thương khố, khai thương khố, xuất hóa tài",
  "hoàng sa: :xuất hành",
  "hồng sa:*:doanh tạo ốc xá, giá thú, xuất hành",
  "huyền vũ:*:khai quật, thủ thổ, lập trụ, thượng lương, giá thú, xuất hành, lâm quan",
  "hư bại: :khai thương khố, phân cư, nhập trạch",
  "huyết chi: :châm cứu, xuyên nhĩ khổng, xuyên ngưu tị, yết lục súc",
  "huyết kị: :châm cứu, xuyên nhĩ khổng, xuyên ngưu tị, nạp súc, mục dưỡng, tạo súc lan, xuyên tỉnh",
  "kê hoãn: :tu tác, động thổ",
  "khí vãng vong: :thượng sách, tiến biểu chương, thượng biểu chương, ban chiếu, chiêu hiền, tuyên chánh sự, hành hạnh, khiển sử, an phủ biên cảnh, tuyển tướng, huấn binh, xuất sư, hành binh, thượng quan, phó nhậm, lâm chánh thân dân, giá thú, tiến nhân khẩu, bàn di, cầu y, liệu bệnh, bộ tróc, điền liệp, thủ ngư, xuất hành, cầu tài",
  "khô ngư: :tài chủng",
  "kiếp sát:*:bách sự bất nghi, kì phúc, cầu tự, thượng sách, tiến biểu chương, thụ phong, thượng biểu chương, ban chiếu, thi ân phong bái, chiêu hiền, cử chánh trực, tuyên bố chánh sự, khánh tứ, thưởng hạ, yến hội, quan đới, hành hạnh, khiển sử, an phủ biên cảnh, tuyển tướng, huấn binh, xuất sư, thượng quan, phó nhậm, lâm chánh thân dân, kết hôn nhân, nạp thái, vấn danh, giá thú, tiến nhân khẩu, bàn di, an sàng, giải trừ, chỉnh dung, thế đầu, chỉnh thủ túc giáp, cầu y, liệu bệnh, tài chế, doanh kiến cung thất, tu cung thất, thiện thành quách, trúc đê phòng, hưng tạo, động thổ, thụ trụ, thượng lương, tu thương khố, cổ chú, kinh lạc, uấn nhưỡng, khai thị, lập khoán, giao dịch, nạp tài, khai thương khố, xuất hóa tài, tu trí sản thất, khai cừ, xuyên tỉnh, an đối ngại, bổ viên, tắc huyệt, tu sức viên tường, phá ốc hoại viên, tài chủng, mục dưỡng, nạp súc, phá thổ, an táng, khải toản",
  "kim đao: :phạt mộc, khởi tạo, giá mã",
  "kim ngân: :chú kiếm, kim ngân khí vật",
  "la thiên đại thoái: :tu phương, tạo táng",
  "lâm cách: :xuất hành, bộ liệp",
  "lao nhật: :thượng quan, xuất hành, di cư, từ tụng",
  "lỗ ban sát: :khởi công, khởi tạo, giá mã",
  "lôi công: :động thổ, di cư",
  "long cấm: :hành thuyền, trang tải, tạo kiều lương, tác pha",
  "long hổ: :khởi tạo, giá thú, an táng, xuất hành, nhập sơn, phạt mộc, tu trai, tế tự, nhập trạch, lập khế mãi mại",
  "long hội: :tu trì, tác yển",
  "lục bất thành: :bách sự bất nghi, xuất quân, doanh mưu, cầu hôn",
  "lục xà: :giá thú, kết hôn nhân",
  "ly biệt: :giá thú, xuất hành",
  "ly khoa: :xuất hành, di cư, giá thú, an sàng, nhập học",
  "mộ khố sát: :xuyên tạc, tu doanh",
  "mộ nhật: :giá thú, kết hôn nhân",
  "mộc mã sát: :khởi công, giá mã, phạt mộc, tố lương",
  "nhân cách: :tiến nhân khẩu, giá thú",
  "nhật lưu tài: :lưu tài, xuất tài",
  "nguyên vũ: :táng mai",
  "nguyệt hại:*:kì phúc, cầu tự, thượng sách, tiến biểu chương, thượng biểu chương, khánh tứ, thưởng hạ, yến hội, an phủ biên cảnh, tuyển tướng, huấn binh, xuất sư, kết hôn nhân, nạp thái, vấn danh, giá thú, tiến nhân khẩu, cầu y, liệu bệnh, tu thương khố, kinh lạc, uấn nhưỡng, khai thị, lập khoán, giao dịch, nạp tài, khai thương khố, xuất hóa tài, trí sản thất, mục dưỡng, nạp súc, phá thổ, an táng, khải toản",
  "nguyệt hình:*:kì phúc, cầu tự, thượng sách, tiến biểu chương, thượng biểu chương, ban chiếu, thi ân phong bái, chiêu hiền, cử chánh trực, tuyên bố chánh sự, khánh tứ, thưởng hạ, yến hội, quan đới, hành hạnh, khiển sử, an phủ biên cảnh, tuyển tướng, huấn binh, xuất sư, thượng quan, phó nhậm, lâm chánh thân dân, kết hôn nhân, nạp thái, vấn danh, giá thú, tiến nhân khẩu, bàn di, an sàng, giải trừ, chỉnh dung thế đầu, chỉnh thủ túc giáp, cầu y, liệu bệnh, tài chế, doanh kiến cung thất, tu cung thất, thiện thành quách, trúc đê phòng, hưng tạo, động thổ, thụ trụ, thượng lương, tu thương khố, cổ chú, kinh lạc, uấn nhưỡng, khai thị, lập khoán, giao dịch, nạp tài, khai thương khố, xuất hóa tài, tu trí sản thất, khai cừ, xuyên tỉnh, an đối ngại, bổ viên, tắc huyệt, tu sức viên tường, phá ốc, hoại viên, tài chủng, mục dưỡng, nạp súc, phá thổ, an táng, khải toản",
  "nguyệt hỏa: :khởi tạo, châm cứu, cái ốc, tác táo, tố họa thần tượng",
  "nguyệt hư: :tu thương khố, khai thương khố, xuất hóa tài, vận động, chinh hành, thành thân lễ",
  "nguyệt kị:*:bách sự bất nghi, nhập học, thượng quan, phó nhậm, khai thị, lập khoán, giao dịch, di đồ, kết hôn nhân, giá thú, tu tạo, an sàng, động thổ, thụ trụ, thượng lương, phá thổ, khải toản, an táng",
  "nguyệt kiến: :tu tạo thổ công, kết thân lễ",
  "nguyệt kiến chuyển sát: :khởi thủ tu tác, động thổ",
  "nguyệt phá:*:bách sự bất nghi",
  "nguyệt sát: :khai thương khố, xuất tài vật, kết hôn nhân, xuất hành, đình tân khách, hưng xuyên quật, doanh chủng thực, nạp quần súc",
  "nguyệt yếm: :giá thú, xuất hành, tạo tửu thố",
  "ngũ bất ngộ: :xuất hành, cầu tài, thu bộ, bái yết",
  "ngũ bất quy: :ứng thí, phó cử, cầu tài, xuất hành",
  "ngũ hư: :tu thương khố, khai thương khố, doanh chủng thời, xuất hóa tài, thi trái phụ, xuất hành, an sàng, tố họa thần tượng, tu lục súc lan",
  "ngũ ly: :khánh tứ, thưởng hạ, yến hội, hội thân hữu, xuất hành, giá thú, kết hôn nhân, nạp thái, vấn danh, tác giao quan, lập khế khoán, lập khoán, giao dịch",
  "ngũ mộ:*:quan đới, hành hạnh, khiển sử, an phủ biên cảnh, tuyển tướng, huấn binh, xuất sư, thượng quan, phó nhậm, lâm chánh thân dân, kết hôn nhân, nạp thái, vấn danh, giá thú, tiến nhân khẩu, bàn di, an sàng, giải trừ, cầu y, liệu bệnh, doanh kiến cung thất, tu cung thất, thiện thành quách, hưng tạo, động thổ, thụ trụ, thượng lương, khai thị, lập khoán, giao dịch, tu trí sản thất, tài chủng, mục dưỡng, nạp súc, phá thổ, an táng, khải toản",
  "ngũ quỷ: :xuất hành",
  "ngục nhật: :thượng quan, xuất hành, di cư, từ tụng",
  "ôn nhập: :di đồ, nhập trạch, xuất hỏa, mục dưỡng, nạp súc, tạo súc lan",
  "ôn xuất: :di đồ, nhập trạch, xuất hỏa, mục dưỡng, nạp súc, tạo súc lan",
  "phá bại tinh: :tạo tác",
  "phản chi: :thượng sách, tiến biểu chương, trần từ tụng",
  "phản kích: :thượng quan, xuất hành, từ tụng, vấn bệnh, hành thuyền",
  "phân hài: :xuất hành, nhập trạch, di cư, vấn bệnh, tế tự",
  "phạt nhật: :an phủ biên cảnh, tuyển tướng, huấn binh, xuất sư",
  "phi liêm: :thu dưỡng lục súc",
  "phi ma sát: :giá thú, di cư, nhập trạch",
  "phủ đầu sát: :phạt mộc, khởi tạo, khởi công, giá mã",
  "phủ sát: :phạt mộc, giá mã, tố lương, hợp thọ mộc",
  "phục đoạn: :kết hôn nhân, giá thú",
  "phục nhật: :kị hung sự",
  "phục thi: :an sàng, liệu bệnh, viễn hành, nhập sơn, xuất quân",
  "phục tội: :thượng quan, luận tụng",
  "phục tang: :kết hôn nhân, táng mai",
  "quả tú: :giá thú",
  "quan phù: :bái quan, thị sự, tiến biểu chương, trần từ tụng",
  "quy kị: :di đồ, nhập trạch, xuất hỏa, giá thú, thú phụ, bàn di, di cư, viễn hành, viễn hồi, nhập trạch, quy gia, quy ninh",
  "quỷ cách: :tế tự, kì phúc",
  "quỷ khốc: :thành phục, trừ phụ",
  "sát chủ:*:bách sự bất nghi",
  "sát sư nhật: :địa sư trạch sư đáo hiện tràng",
  "sơn cách: :xuất hành, bộ liệp, nhập sơn, phạt mộc",
  "sơn ngân: :nhập sơn, phạt mộc",
  "tai sát: :giá thú, hội họp thân quyến, lập gia đình, an phủ biên cảnh, tuyển tướng, huấn binh, xuất sư, cầu y, liệu bệnh",
  "tài ly: :khai thị, giao dịch, nạp tài, cầu tài, lập khoán, xuất tài, khai điếm tứ, xuất hành",
  "tam bất phản: :thượng quan, phó nhậm, xuất hành, trần binh, ứng thí, phó cử, cầu tài",
  "tam nương:*:tác sự cầu mưu, kết hôn nhân, giá thú, khởi tạo, tu tạo, viễn du, xuất hành, thượng quan, phó nhậm",
  "tam tang:*:an táng, tu phần, phá thổ, khải toản, nhập liễm, di cữu, thành trừ phục, khai sanh phần, hợp thọ mộc",
  "thám bệnh: :thăm người bệnh",
  "thân ngâm: :giá thú",
  "thần cách: :kì phúc, tế tự",
  "thần hiệu: :kì phúc, trai tiếu, cầu y, liệu bệnh",
  "thập ác đại bại:*:vô lộc, bách sự bất nghi",
  "thất điểu: :giá thú, kết hôn nhân",
  "thiên ất tuyệt khí: :thượng quan, phó nhậm, cầu tự, tiến nhân khẩu, tài chủng, thực thụ",
  "thiên binh: :thượng lương, hợp tích, cái ốc, nhập liễm",
  "thiên bồng: :giá thú, khởi tạo, an táng, di cư, từ tụng",
  "thiên cách: :xuất hành, cầu tài, cầu quan",
  "thiên cẩu: :tế tự, giá thú, sanh sản",
  "thiên chuyển địa chuyển: :khởi thủ tu tác, động thổ",
  "thiên cùng: :khai nghiệp",
  "thiên cương: :giá thú, tế tự",
  "thiên địa chánh chuyển: :khởi tạo, tu doanh, động thổ, cơ địa, khai trì, xuyên tỉnh",
  "thiên địa chuyển sát: :động thổ, tu tác xí sở, khai tạc trì đường, an trí sản thất",
  "thiên địa hoang vu:*:bách sự bất nghi",
  "thiên địa hung bại: :thượng quan, xuất hành, khai thị, giao dịch, nhập trạch",
  "thiên địa tranh hùng: :giá thú, xuất hành, kinh thương, tạo thuyền, hành thuyền, xuất quân, an doanh",
  "thiên hỏa: :tu tạo, khởi tạo, tu phương, cái ốc, hợp tích, chủng thực, thượng lương, an môn, tác táo, an táo, nhập trạch, xuất hỏa, tài y, xá vũ",
  "thiên hình:*:từ tụng, giá thú, di cư, an táng, thượng quan, xuất hành, lập khế mãi mại, bách sự bất nghi",
  "thiên hùng: :giá thú",
  "thiên hưu phế: :thượng quan, nhập học, ứng thí, phó cử, điêu khắc, tác nhiễm, khai trì đường",
  "thiên lại:*:kì phúc, cầu tự, thượng sách, tiến biểu chương, thượng biểu chương, thi ân phong bái, chiêu hiền, cử chánh trực, quan đới, hành hạnh, khiển sử, an phủ biên cảnh, tuyển tướng, huấn binh, xuất sư, thượng quan, phó nhâm, lâm chánh thân dân, kết hôn nhân, nạp thái, vấn danh, giá thú, tiến nhân khẩu, bàn di, an sàng, giải trừ, cầu y, liệu bệnh, doanh kiến cung thất, tu cung thất, thiện thành quách, trúc đê phòng, hưng tạo, động thổ, thụ trụ, thượng lương, tu thương khố, khai thị, lập khoán, giao dịch, nạp tài, khai thương khố, xuất hóa tài, tu trí sản thất, tài chủng, mục dưỡng, nạp súc",
  "thiên lao:*:khởi tạo, nhập trạch, di cư, xuất hành, giá thú, an táng, từ tụng",
  "thiên ngục: :hiến phong chương, hưng từ tụng, phó nhậm, chinh thảo",
  "thiên ôn: :tu tạo, nhập trạch, quy hỏa, lục súc, mục dưỡng, trị bệnh",
  "thiên phiên địa phúc: :hành thuyền, tạo thuyền, tu thuyền, tạo kiều, tu kiều",
  "thiên quả: :giá thú",
  "thiên tặc: :khởi tạo, động thổ, thụ tạo, thượng quan, nhập trạch, an táng, giao dịch, khai thương khố, khai thị, hưng tu, di cư, hành thuyền, giá thú, hành hạnh, khiển sử, tu thương khố, xuất tài, xuất hóa tài, táng mai",
  "thiên thượng đkv: :xuất hành, kinh thương, xuất tài",
  "thổ công: :động thổ, tu trạch, tu phần, phá thổ, tu tạo thương khố, tu trúc đê phòng, tu sức viên tường tu trí sản thất, khai cừ tỉnh, tài chủng",
  "thổ cấm: :an táng",
  "thổ kị: :an táng",
  "thổ ngân: :động thổ",
  "thổ ôn: :động thổ, xuyên tỉnh",
  "thổ phù: :doanh kiến cung thất, tu cung thất, thiện thành quách, trúc đê phòng, hưng tạo, động thổ, tu thương khố, tu trí sản thất, khai cừ, xuyên tỉnh, an đối ngại, bổ viên, tu sức viên tường, bình trì đạo đồ, phá ốc, hoại viên, tài chủng, phá thổ",
  "thổ phủ: :doanh kiến cung thất, tu cung thất, thiện thành quách, trúc đê phòng, tu tạo, động thổ, phá thổ, tu thương khố, tu trí sản thất, khai cừ, xuyên tỉnh, phá ốc hoại viên, phạt mộc, tài chủng",
  "thụ tử:*:bách sự bất nghi, thượng quan, khởi tạo, giá thú, xuất nhập",
  "thủy cách: :khai đường, bộ ngư, xuyên tỉnh, hành thuyền, chủng cốc, tài mộc",
  "thủy ngân: :tạo tửu, hợp tương",
  "thượng sóc: :thượng quan, xuất hành, giá thú, nhập trạch, hội khách, tác nhạc, ngư liệp, hội thân hữu, sản thất, kì phúc, thiết tiếu",
  "tiểu hao: :kinh doanh, chủng thì, tu thương khố, khai thị, lập khoán, giao dịch, nạp tài, khai thương khố, xuất hóa tài, xuất hành, khai thương khố, an sàng, tố họa thần tượng, tu lục súc lan",
  "tiểu không vong: :xuất hành, kinh thương, cầu tài, xuất tài, nghi tác thọ mộc",
  "tiểu thời: :kết hôn nhân, khai thương khố, xuất hóa tài",
  "tội chí: :khởi tạo, di cư, kết hôn nhân, an táng, từ tụng, thượng quan, tiến biểu chương",
  "tội hình: :thượng quan, kiến quý, tham yết, từ tụng, xuất hành",
  "tổn sư nhật: :địa sư trạch sư đáo hiện tràng",
  "trạch không: :di trạch, nhập trạch, quy hỏa",
  "trí tử: :thượng quan, lâm chánh, thụ sự, cầu y, liệu bệnh",
  "trùng nhật: :phá thổ, tang sự, mai táng, an táng, khải toản, hung sự",
  "trùng phục: :phá thổ, an táng, khải toản, hung sự",
  "trùng tang: :tang sự, mai táng, an táng, thành phục, trừ phục, tu phần, phá thổ, khải toản, nhập liễm, di cữu",
  "trường tinh: :tài y, tiến nhân khẩu, kinh lạc, khai thị, giao dịch, nạp tài, nạp súc",
  "tứ bất tường: :thượng quan, phó nhậm, lâm chánh thân dân, nhập trạch, giá thú, xuất hành",
  "tứ cùng: :an phủ biên cảnh, tuyển tướng, huấn binh, xuất sư, kết hôn nhân, nạp thái, vấn danh, giá thú, an táng, tiến nhân khẩu, tu thương khố, khai thị, lập khoán, giao dịch, nạp tài, khai thương khố, xuất hóa tài, nhập trạch, phân cư, an môn",
  "tứ đại kị:*:giá thú, thượng lương, an táng, di cư, khai trì",
  "tứ hao: :an phủ biên cảnh, tuyển tướng, huấn binh, xuất sư, hội thân nhân, khai trương, xuất tài, tạo thương khố, tu thương khố, khai thương khố, khai thị, lập khoán, giao dịch, nạp tài, xuất hóa tài, xuất hành, an sàng, tố họa thần tượng, tu lục súc lan",
  "tứ hư: :tu trì, tác yển",
  "tứ hư bại: :khai thương khố, phân cư, nhập trạch",
  "tứ kị: :an phủ biên cảnh, tuyển tướng, huấn binh, xuất sư, kết hôn nhân, nạp thái, vấn danh, giá thú, an táng",
  "tứ kích: :viễn hành, khai trì, khai tỉnh",
  "tứ ly:*:cầu tự, thượng quan, viễn hành, xuất hành, nhập học, hội thân hữu, hòa hợp sự, giá thú, đính hôn, đính minh, an sàng, lục lễ, nhập trạch, khai thị, thụ tạo, tác táo, cầu y, liệu bệnh, mục dưỡng, nạp súc",
  "tứ phế: :kì phúc, cầu tự, thượng sách, tiến biểu chương, thượng biểu chương, ban chiếu, thi ân phong bái, chiêu hiền, cử chánh trực, tuyên bố chánh sự, khánh tứ, thưởng hạ, yến hội, quan đới, hành hạnh, khiển sử, an phủ biên cảnh, tuyển tướng, huấn binh, xuất sư, thượng quan, phó nhậm, lâm chánh thân dân, tạo xá, nghênh thân, xuất hành, kết hôn nhân, nạp thái, vấn danh, giá thú, tiến nhân khẩu, bàn di, an sàng, giải trừ, cầu y, liệu bệnh, tài chế, doanh kiến cung thất, tu cung thất, thiện thành quách, trúc đê phòng, hưng tạo động thổ, thụ trụ, thượng lương, tu thương khố, cổ chú, kinh lạc, uấn nhưỡng, khai thị, lập khoán, giao dịch, nạp tài, khai thương khố, xuất hóa tài, tu trí sản thất, khai cừ, xuyên tỉnh, an đối ngại, bổ viên tắc huyệt, tu sức viên tường, tài chủng, mục dưỡng, nạp súc, phá thổ, an táng, khải toản",
  "tứ phương hao: :khai thị, giao dịch, nạp tài, xuất hành, tạo thương khố",
  "tứ quý bát tọa: :khởi thủ tu tác",
  "tứ thời đại mộ: :giá thú, cầu y, liệu bệnh, xuất hành",
  "tứ tuyệt:*:cầu tự, thượng quan, viễn hành, xuất hành, nhập học, hội thân hữu, hòa hợp sự, giá thú, đính hôn, đính minh, an sàng, lục lễ, nhập trạch, khai thị, thụ tạo, tác táo, cầu y, liệu bệnh, mục dưỡng, nạp súc",
  "tử biệt: :thượng quan, phó nhậm, kết hôn nhân, giá thú, an sàng, nhập trạch, xuất hành, di tỉ",
  "tử khí: :khởi tạo, động thổ, di cư, tạo tửu khúc tương thố, an phủ biên cảnh, tuyển tương, huấn binh, xuất sư, giải trừ, cầu y, liệu bệnh, tu trí sản thất, tài chủng",
  "tử thần: :thỉnh y, phục dược, xuất sư, chinh thảo, chủng thực thụ mộc, tiến nhân, nạp súc",
  "tục thế: :châm cứu, xuyên nhĩ khổng, nạp súc, mục dưỡng, tạo súc lan",
  "tuế phá:*:bách sự bất nghi",
  "tuế không: :tiến nhân khẩu, tu thương khố, khai thị, lập khoán, giao dịch, nạp tài, khai thương khố, xuất hóa tài, xuất hành, an sàng, tố họa thần tượng, tu lục súc lan",
  "tuyệt yên hỏa: :phân cư, nhập trạch, tác táo, tạo diêu, liệu bệnh, kết hôn nhân, tu tác ốc, an táng, di trạch",
  "ương bại: :xuất quân, phó nhậm, tu thương khố, khai thị, giao dịch, nạp tài",
  "vãng vong:*:bái quan, thượng quan, phó nhậm, viễn hành, quy gia, xuất quân, chinh thảo, giá thú, cầu y, liệu bệnh, thượng sách, tiến biểu chương, thượng biểu chương, ban chiếu, chiêu hiền, tuyên chánh sự, hành hạnh, khiển sử, an phủ biên cảnh, tuyển tướng, huấn binh, xuất sư, thượng quan, phó nhậm, lâm chánh thân dân, giá thú, tiến nhân khẩu, bàn di, di cư, cầu y, liệu bệnh, bộ tróc, điền liệp, thủ ngư, khởi tạo, đăng cao",
  "vô kiều: :.",
  "vô lộc:*:bách sự bất cát",
  "vong doanh: :thượng quan, giá thú, nạp tài súc, xuất hành, khai thương khố",
  "xích khẩu: :hội khách",
  "xích tùng tử: :giá thú, nhập trạch",
  "xúc thủy long: :thủ ngư, hành thuyền, thừa thuyền, độ thủy",
  "yếm đối: :giá thú, thừa thuyền, độ thủy",
];

// Index to Cat_Nhat Array
export function iHungNhat(name) {
  if (name == "") return 0;
  var i;
  var temp = "";
  if (name.match(" [(]")) {
    var j = name.indexOf(" (");
    for (i = 0; i < j; i++) temp += name?.charAt(i);
  } else temp += name;
  for (i = 0; i < i_hung_nhat.length; i++) {
    var item = "";
    item += i_hung_nhat[i];
    var A = item.split(/:/);
    if (temp.toLowerCase() == A[0]) break;
  }
  if (i < i_hung_nhat.length) return i + 1;
  return 0;
}

export function iHungNhatTu(i) {
  var name = "";
  if (i && i <= i_hung_nhat.length) {
    name += i_hung_nhat[i - 1];
    var A = name.split(/:/);
    return A[0];
  }
  return "";
}

export function iHungNhat2(name) {
  if (name == "") return 0;
  var i;
  var temp = "";
  if (name.match(" [(]")) {
    var j = name.indexOf(" (");
    for (i = 0; i < j; i++) temp += name?.charAt(i);
  } else temp += name;
  var R = "";
  for (i = 0; i < i_hung_nhat.length; i++) {
    var item = "";
    item += i_hung_nhat[i];
    var A = item.split(/:/);
    if (temp.toLowerCase() == A[0]) {
      R = A[1];
      break;
    }
  }
  return R;
}

export function iHungNhat3(name) {
  if (name == "") return 0;
  var i;
  var temp = "";
  if (name.match(" [(]")) {
    var j = name.indexOf(" (");
    for (i = 0; i < j; i++) temp += name?.charAt(i);
  } else temp += name;
  var R = "";
  for (i = 0; i < i_hung_nhat.length; i++) {
    var item = "";
    item += i_hung_nhat[i];
    var A = item.split(/:/);
    if (temp.toLowerCase() == A[0]) {
      R = A[2];
      break;
    }
  }
  return R;
}

var i_12_truc = [
  "Thành: nhập học, khai thị, cầu tài, xuất hành, lập khế, thụ trụ, tài chủng, mục dưỡng, an phủ biên cảnh, bàn di, trúc đê phòng; tố tụng",
  "Thu: tế tự, đàm ân, tứ xá, thi ân huệ, tuất cô quỳnh, hành huệ ái, tuyết oan uổng, hoãn hình ngục, nhập học, tiến nhân khẩu, mộc dục, chỉnh dung thế đầu, chỉnh thủ túc giáp, tu thương khố, nạp tài, an đối ngại, bổ viên, tắc huyệt, tảo xá vũ, tu sức viên tường, bình trì đạo đồ, phá ốc hoại viên, phạt mộc, bộ tróc, điền liệp, thủ ngư, tài chủng, mục dưỡng, nạp súc; kì phúc, cầu tự, thượng sách, tiến biểu chương, ban chiếu, thi ân phong bái, chiêu hiền, cử chánh trực, tuyên bố chánh sự, khánh tứ, thưởng hạ, yến hội, quan đới, hành hạnh, khiển sử, an phủ biên cảnh, tuyển tướng, huấn binh, xuất sư, thượng quan, phó nhậm, lâm chánh thân dân, kết hôn nhân, nạp thái, vấn danh, giá thú, bàn di, an sàng, giải trừ, cầu y, liệu bệnh, tài chế, doanh kiến cung thất, tu cung thất, thiện thành quách, trúc đê phòng, hưng tạo, động thổ, thụ trụ, thượng lương, cổ chú, kinh lạc, uấn nhưỡng, khai thị, lập khoán, giao dịch, khai thương khố, xuất hóa tài, tu trí sản thất, khai cừ, xuyên tỉnh, phá thổ, an táng, khải toản",
  "Khai: tế tự, kì phúc, cầu tự, thượng sách, tiến biểu chương, thượng biểu chương, ban chiếu, đàm ân, tứ xá, thi ân phong bái, chiêu hiền, cử chánh trực, thi ân huệ, tuất cô quỳnh, tuyên chánh sự, hành huệ ái, tuyết oan uổng, hoãn hình ngục, khánh tứ, thưởng hạ, yến hội, nhập học, hành hạnh, khiển sử, thượng quan, phó nhậm, lâm chánh thân dân, bàn di, giải trừ, cầu y, liệu bệnh, tài chế, tu cung thất, thiện thành quách, hưng tạo, động thổ, thụ trụ, thượng lương, khai thị, tu trí sản thất, khai cừ, xuyên tỉnh, an đối ngại, tài chủng, mục dưỡng, an sàng, nhập học, xuất hành; phạt mộc, điền liệp, thủ ngư, phá thổ, an táng, khải toản, phóng trái, tố tụng",
  "Kiến: thiêm ước, giao thiệp, xuất hành, thi ân phong bái, chiêu hiền, cử chánh trực, hành hạnh, khiển sử, thượng quan, phó nhậm, lâm chánh thân dân, an phủ biên cảnh, tuyển tướng, huấn binh, xuất sư; kì phúc, cầu tự, thượng sách, tiến biểu chương, thượng biểu chương, kết hôn nhân, nạp thái, vấn danh, giải trừ, chỉnh dung thế đầu, chỉnh thủ túc giáp, cầu y, liệu bệnh, doanh kiến cung thất, tu cung thất, thiện thành quách, hưng tạo, động thổ, thụ trụ, thượng lương, tu thương khố, khai thương khố, xuất hóa tài, tu trí sản thất, phá ốc, hoại viên, phạt mộc, tài chủng, phá thổ, an táng, khải toản",
  "Trừ: giải trừ, tống lễ, mộc dục, chỉnh dung thế đầu, chỉnh thủ túc giáp, cầu y, liệu bệnh, tảo xá vũ, xuất hành, nhập hỏa, bàn thiên, xuất hóa, động thổ, thi ân phong bái, cử chánh trực, hành hạnh, khiển sử, thượng quan, phó nhậm, lâm chánh thân dân; kết hôn nhân, viễn hành, thiêm ước",
  "Mãn: tiến nhân khẩu, tài chế, tu thương khố, kinh lạc, khai thị, giao dịch, cầu tài, lập khế, lập khoán, giao dịch, nạp tài, khai thương khố, xuất hóa tài, bổ viên, tắc huyệt; thi ân phong bái, chiêu hiền, cử chánh trực, thượng quan, phó nhậm, lâm chánh thân dân, kết hôn nhân, nạp thái, vấn danh, cầu y, liệu bệnh",
  "Bình: tu sức viên tường, bình trì đạo đồ, phá thổ; kì phúc, cầu tự, thượng sách, tiến biểu chương, thượng biểu chương, ban chiếu, thi ân phong bái, chiêu hiền, cử chánh trực, tuyên bố chánh sự, khánh tứ, thưởng hạ, yến hội, quan đới, hành hạnh, khiển sử, an phủ biên cảnh, tuyển tướng, huấn binh, xuất sư, thượng quan, phó nhậm, lâm chánh thân dân, kết hôn nhân, nạp thái, vấn danh, giá thú, tiến nhân khẩu, bàn di, an sàng, giải trừ, cầu y, liệu bệnh, tài chế, doanh kiến cung thất, tu cung thất, thiện thành quách, trúc đê phòng, hưng tạo, động thổ, thụ trụ, thượng lương, tu thương khố, cổ chú, kinh lạc, uấn nhưỡng, khai thị, lập khoán, giao dịch, nạp tài, khai thương khố, xuất hóa tài, tu trí sản thất, khai cừ xuyên tỉnh, tài chủng, mục dưỡng, nạp súc, phá thổ, an táng, khải toản",
  "Định: khởi tạo, động thổ, quan đới, tế tự, kì phúc, giá thú, tạo ốc, trang tu, tu lộ, khai thị, nhập học, thượng nhâm, nhập hỏa; tố tụng, xuất hành, giao thiệp",
  "Chấp: tạo ốc, trang tu, giá thú, thú cấu, tế tự; kinh doanh, tu thương khố, khai thị, lập khoán, giao dịch, nạp tài, khai thương khố, xuất hóa tài, xuất hành, bàn thiên",
  "Phá: phá thổ, sách tá, cầu y, liệu bệnh, phá ốc, hoại viên; kì phúc, cầu tự, thượng sách, tiến biểu chương, thượng biểu chương, ban chiếu, thi ân phong bái, chiêu hiền, cử chánh trực, tuyên bố chánh sự, khánh tứ, thưởng hạ, yến hội, quan đới, hành hạnh, khiển sử, an phủ biên cảnh, tuyển tướng, huấn binh, xuất sư, thượng quan, phó nhậm, lâm chánh thân dân, kết hôn nhân, nạp thái, vấn danh, giá thú, tiến nhân khẩu, bàn di, an sàng, chỉnh dung thế đầu, chỉnh thủ túc giáp, tài chế, doanh kiến cung thất, tu cung thất, thiện thành quách, trúc đê phòng, hưng tạo, động thổ, thụ trụ, thượng lương, tu thương khố, cổ chú, kinh lạc, uấn nhưỡng, khai thị, lập khoán, giao dịch, nạp tài, khai thương khố, xuất hóa tài, tu trí sản thất, khai cừ, xuyên tỉnh, an đối ngại, bổ viên, tắc huyệt, tu sức viên tường, phạt mộc, tài chủng, mục dưỡng, nạp súc, phá thổ, an táng, khải toản",
  "Nguy: tế tự, kì phúc, an sàng, sách tá, phá thổ, an phủ biên cảnh, tuyển tướng, huấn binh, huấn luyện; đăng sơn, thừa thuyền, xuất hành, giá thú, tạo táng, thiên tỉ, phạt mộc, điền liệp, thủ ngư",
  "Bế: tế tự, kì phúc, trúc đê phòng, bổ viên, tắc huyệt, mai trì, mai huyệt, tạo táng, điền bổ, tu ốc; thượng sách, tiến biểu chương, thượng biểu chương, ban chiếu, thi ân phong bái, chiêu hiền, cử chánh trực, tuyên bố chánh sự, khánh tứ, thưởng hạ, yến hội, hành hạnh, khiển sử, xuất sư, thượng quan, phó nhậm, lâm chánh thân dân, kết hôn nhân, nạp thái, vấn danh, giá thú, tiến nhân khẩu, bàn di, an sàng, xuất hành, cầu y, liệu bệnh, doanh kiến cung thất, tu cung thất, hưng tạo, động thổ, thụ trụ, thượng lương, khai thị, khai thương khố, xuất hóa tài, tu trí sản thất, khai cừ, xuyên tỉnh",
];

export function iTruc12(name) {
  if (name == "") return 0;
  var i;
  var temp = "";
  temp += name;
  for (i = 0; i < i_12_truc.length; i++) {
    if (i_12_truc[i].match(/^(.+)(\:\s)(.+)$/)) {
      var truc = "";
      truc += RegExp.$1;
      if (temp.toLowerCase() == truc.toLowerCase()) {
        break;
      }
    }
  }
  if (i < i_12_truc.length) return i + 1;
  return 0;
}

export function iTrucNghiKi(name) {
  var nghiKi = "";
  if (name == "") return nghiKi;
  var temp = "";
  temp += name;
  for (var i = 0; i < i_12_truc.length; i++) {
    if (i_12_truc[i].match(/^(.+)(\:\s)(.+)$/)) {
      var truc = "";
      truc += RegExp.$1;
      if (temp.toLowerCase() == truc.toLowerCase()) {
        nghiKi += RegExp.$3;
        break;
        // alert((RegExp.$1)+' : '+(RegExp.$3)); break;
      }
    }
  }
  return nghiKi;
}

var i_banhto_can = [
  "giáp: bất khai thương tài vật hao vong: không nên mở kho, tiền của hao mất",
  "ất: bất tải thực thiên chu bất trưởng: không nên gieo trồng, ngàn gốc không lên",
  "bính: bất tu táo tất kiến hỏa ương: không nên sửa bếp, sẽ bị hỏa tai",
  "đinh: bất thế đầu đầu chủ sanh sang: không nên cắt tóc, đầu sinh ra nhọt",
  "mậu: bất thụ điền điền chủ bất tường: không nên nhận đất, chủ không được lành",
  "kỷ: bất phá khoán nhị chủ tịnh vong: không nên phá khoán, cả 2 chủ đều mất",
  "canh: bất kinh lạc chức cơ hư trướng: không nên quay tơ, cũi dệt hư hại ngang",
  "tân: bất hợp tương chủ nhân bất thường: không nên trộn tương, chủ không được nếm qua",
  "nhâm: bất ương thủy nan canh đê phòng: không nên tháo nước, khó canh phòng đê",
  "quý: bất từ tụng lí nhược địch cường: không nên kiện tụng, ta lý yếu địch mạnh",
];

export function iBanhToCan(name) {
  if (name == "") return 0;
  var i;
  var temp = "";
  temp += name;
  var R = "";
  for (i = 0; i < i_banhto_can.length; i++) {
    var item = "";
    item += i_banhto_can[i];
    var A = item.split(/: /);
    if (temp.toLowerCase() == A[0]) {
      R = name + " " + A[1] + " (ngày can " + name + " " + A[2] + ").";
      break;
    }
  }
  return R;
}

var i_banhto_chi = [
  "tý: bất vấn bốc tự nhạ tai ương: không nên gieo quẻ hỏi, tự rước lấy tai ương",
  "sửu: bất quan đới chủ bất hoàn hương: không nên đi nhận quan, chủ sẽ không hồi hương",
  "dần: bất tế tự quỷ thần bất thường: không nên tế tự, quỷ thần không bình thường",
  "mão: bất xuyên tỉnh tuyền thủy bất hương: không nên đào giếng, nước sẽ không trong lành",
  "thìn: bất khốc khấp tất chủ trọng tang: không nên khóc lóc, chủ sẽ có trùng tang",
  "tỵ: bất viễn hành tài vật phục tàng: không nên đi xa tiền của mất mát",
  "ngọ: bất thiêm cái thất chủ canh trương: không nên làm lợp mái nhà, chủ sẽ phải làm lại",
  "mùi: bất phục dược độc khí nhập tràng: không nên uống thuốc, khí độc ngấm vào ruột",
  "thân: bất an sàng quỷ túy nhập phòng: không nên kê giường, quỷ ma vào phòng",
  "dậu: bất hội khách tân chủ hữu thương: không nên hội khách, tân chủ có hại",
  "tuất: bất cật khuyển tác quái thượng sàng: không nên ăn chó, quỉ quái lên giường",
  "hợi: bất giá thú tất chủ phân trương: không nên làm cưới gả, sẽ ly biệt cưới khác",
];

export function iBanhToChi(name) {
  if (name == "") return 0;
  var i;
  var temp = "";
  temp += name;
  var R = "";
  for (i = 0; i < i_banhto_chi.length; i++) {
    var item = "";
    item += i_banhto_chi[i];
    var A = item.split(/: /);
    if (temp.toLowerCase() == A[0]) {
      R = name + " " + A[1] + " (ngày chi " + name + " " + A[2] + ").";
      break;
    }
  }
  return R;
}

var i_cat_thoi = [
  "Âm Quý: :kì phúc, cầu tự, xuất hành, kiến quý, cầu tài, giá thú, đính hôn, tu tác, tạo táng",
  "Dịch Mã: :thượng quan, phó nhậm, kiến quý, cầu tài, khai thị, xuất hành, nhập trạch, giá thú, đính hôn, tạo táng",
  "Dương Quý: :kì phúc, cầu tự, cầu tài, kiến quý, xuất hành, giá thú, đính hôn, tu tác, tạo táng",
  "Đế Vượng:*:cầu tài, giao dịch, khai thị, cầu tự, di đồ, xuất hành, nhập trạch, giá thú, đính hôn, tạo táng, tu tác",
  "Đường Phù: :cầu tài, thượng quan, phó nhậm, kiến quý, giá thú, xuất hành, di đồ, tạo táng",
  "Hỷ Thần:*:cầu tài, khai thị, giao dịch, kì phúc, cầu tự, giá thú, đính hôn, lục lễ, xuất hành, an sàng",
  "Hữu Bật: :cầu tài, thượng quan, phó nhậm, kiến quý, xuất hành, giá thú, di đồ, tạo táng",
  "Kim Quỹ: :kì phúc, giá thú, đính hôn, nhập trạch, tạo táng",
  "Kim Tinh: :tu tạo, thượng lương, nhập trạch, an táng",
  "La Thiên: :cầu tài, khai thị, giao dịch, kì phúc, cầu tự, giá thú, đính hôn, tu tạo, nhập trạch, tạo táng",
  "La Văn: :kì phúc, cầu tự, xuất hành, cầu tài, đính hôn, giá thú, tạo táng",
  "Lục Hợp: :cầu tài, khai thị, giao dịch, kì phúc, cầu tự, giá thú, đính hôn, lục lễ, xuất hành, an sàng",
  "Minh Đường: :khai thị, kì phúc, giá thú, đính hôn, tạo táng",
  "Minh Tinh: :lợi sự cát",
  "Mộc Tinh: :tu tạo, thượng lương, nhập trạch, an táng",
  "Ngọc Đường: :nhập trạch, an sàng, an táo, khai thương khố",
  "Ngũ Hợp: :cầu tài, khai thị, giao dịch, kì phúc, cầu tự, giá thú, đính hôn, lục lễ, xuất hành, an sàng",
  "Ngũ Phù: :cầu tài, thượng quan, kiến quý, xuất hành",
  "Nhật Lộc: :cầu tài, thượng quan, phó nhậm, kiến quý, khai thị, xuất hành, nhập trạch, giá thú, đính hôn, tạo táng",
  "Phúc Tinh: :cầu tài, tế tự, kì phúc, thù thần, giá thú, đính hôn, xuất hành, nhập trạch, tạo táng",
  "Quốc Ấn: :cầu tài, thượng quan, kiến quý, xuất hành, phó nhậm, giá thú, di đồ, tạo táng",
  "Tả Phụ: :cầu tài, thượng quan, phó nhậm, kiến quý, giá thú, di đồ, tạo táng, xuất hành",
  "Tam Hợp:*:cầu tài, khai thị, giao dịch, kì phúc, cầu tự, giá thú, đính hôn, tu tạo, nhập trạch, tạo táng",
  "Tam Kỳ:*:xu cát tị hung",
  "Thái Âm: :tu tác, an táng",
  "Thái Dương: :tu phương, nhập trạch, thụ tạo, an táng",
  "Tham Lang: :cầu tài, thượng quan, phó nhậm, kiến quý, giá thú, di đồ, xuất hành, tu tác, tạo táng",
  "Thanh Long: :kì phúc, giá thú, đính hôn, tạo táng",
  "Thiên Ất:*:cầu tài, khai thị, giao dịch, kiến quý, kì phúc, cầu tự, xuất hành, giá thú, đính hôn, tu tác, tạo táng",
  "Thiên Đức: :kì phúc, giá thú, đính hôn, nhập trạch, tạo táng",
  "Thiên Quan:*:cầu tài, thượng quan, phó nhậm, kiến quý, tế tự, kì phúc, thù thần, xuất hành",
  "Thiên Xá: :tế tự, kì phúc, cầu tự, trai tiếu, giá thú, đính hôn, hưng tu, tạo táng",
  "Thời Kiến: :tu tạo, thượng lương, nhập trạch, an táng",
  "Thủy Tinh: :tu tạo, thượng lương, nhập trạch, an táng",
  "Tiến Quý: :kì phúc, cầu tự, xuất hành, cầu tài, đính hôn, giá thú, tạo táng",
  "Trường Sinh:*:cầu tài, khai thị, giao dịch, cầu tự, xuất hành, nhập trạch, giá thú, đính hôn, tạo táng, di đồ, tu tác",
  "Tư Mệnh: :tác táo, tự táo, thụ phong, tu tạo",
  "Tướng Tinh: :lộc trọng quyền cao",
  "Tỷ Kiên: :lợi sự cát",
  "Văn Xương: :thu sát hóa cát",
  "Vũ Khúc: :tu tác, tạo táng, tế tự, tự phúc, cầu tự, trai tiếu, giá thú",
];

export function iCatThoiTu(i) {
  var name = "";
  if (i && i <= i_cat_thoi.length) {
    name += i_cat_thoi[i - 1];
    var A = name.split(/:/);
    return A[0];
  }
  return "";
}

// Index to Cat_Thoi Array
export function iCatThoi(name) {
  if (name == "") return 0;
  var i;
  var temp = "";
  temp += name;
  for (i = 0; i < i_cat_thoi.length; i++) {
    var item = "";
    item += i_cat_thoi[i];
    var A = item.split(/:/);
    if (temp == A[0]) break;
  }
  if (i < i_cat_thoi.length) return i + 1;
  return 0;
}

export function iCatThoi3(name) {
  if (name == "") return 0;
  var i;
  var temp = "";
  temp += name;
  var R = "";
  for (i = 0; i < i_cat_thoi.length; i++) {
    var item = "";
    item += i_cat_thoi[i];
    var A = item.split(/:/);
    if (temp == A[0]) {
      R = A[2];
      break;
    }
  }
  return R;
}

var i_hung_thoi = [
  "Bạch Hổ: :bách sự bất lợi",
  "Câu Trần: :bách sự bất lợi",
  "Chu Tước: :tụng sự",
  "Cô Thần: :kết hôn nhân, giá thú",
  "Cổ Mộ Sát: :tu tạo mộ viên",
  "Cửu Xú: :xuất sư, giá thú, xuất hành, di tỉ, an táng",
  "Địa Binh: :động thổ, phá thổ, tu tạo",
  "Hà Khôi: :bách sự bất lợi",
  "Hỏa Tinh: :bách sự bất lợi",
  "Huyền Vũ: :từ tụng, bác hí",
  "Kế Đô: :nữ chủ bất lợi",
  "Kiếp Sát: :phạt mộc, khởi tạo, giá mã",
  "La Hầu: :nam chủ bất lợi",
  "La Thiên: :tu phương, khai quang, tạo táng",
  "Lôi Binh: :tu thuyền",
  "Lục Mậu: :phần hương, kì phúc, thiết tiếu, thù thần, khởi cổ",
  "Ngũ Bất Ngộ: :thượng quan, phó nhậm, xuất hành",
  "Ngũ Quỷ: :thượng quan, phó nhậm, giá thú, xuất hành, nhập trạch",
  "Nhật Mộ: :xuất hành",
  "Quả Tú: :kết hôn nhân, giá thú",
  "Thập Ác: :cầu tài, khai thị, giao dịch",
  "Thiên Binh: :thượng lương, nhập liễm",
  "Thiên Cẩu: :tế tự, kì phúc, thiết tiếu, tu tề",
  "Thiên Cương: :bách sự bất lợi",
  "Thiên Hình: :thượng quan, phó nhậm, từ tụng, công chúng sự vụ",
  "Thiên Lao: :thượng quan, phó nhậm, từ tụng, công chúng sự vụ",
  "Thiên Tặc: :khởi tạo, động thổ, thụ tạo, thượng quan, nhập trạch, an táng, giao dịch, khai thương khố, khai thị",
  "Thổ Tinh: :bách sự bất lợi",
  "Thời Hại: :thượng quan, phó nhậm, công chúng sự vụ",
  "Thời Hình: :thượng quan, phó nhậm, công chúng sự vụ",
  "Thời Phá:*:bách sự bất lợi, kì phúc, cầu tự, thượng quan, xuất hành, giá thú, đính hôn, tu tạo, động thổ, khai thị, nhập trạch, di đồ, an táng",
  "Triệt Lộ: :cầu tài, thượng quan, phó nhậm, phần hương, kì phúc, thù thần, hứa nguyện, khai quang, tiến biểu chương, thiết tiếu, xuất hành",
  "Tuần Trung: :cầu tài, giá thú, xuất hành, viễn hồi, thượng quan, phó nhậm, tu tạo, nhập trạch, kiến tự quan, thần miếu, lập thần tượng, khai quang",
];

export function iHungThoiTu(i) {
  var name = "";
  if (i && i <= i_hung_thoi.length) {
    name += i_hung_thoi[i - 1];
    var A = name.split(/:/);
    return A[0];
  }
  return "";
}

// Index to Hung_Thoi Array
export function iHungThoi(name) {
  if (name == "") return 0;
  var i;
  var temp = "";
  temp += name;
  for (i = 0; i < i_hung_thoi.length; i++) {
    var item = "";
    item += i_hung_thoi[i];
    var A = item.split(/:/);
    if (temp == A[0]) break;
  }
  if (i < i_hung_thoi.length) return i + 1;
  return 0;
}

export function iHungThoi3(name) {
  if (name == "") return 0;
  var i;
  var temp = "";
  temp += name;
  var R = "";
  for (i = 0; i < i_hung_thoi.length; i++) {
    var item = "";
    item += i_hung_thoi[i];
    var A = item.split(/:/);
    if (temp == A[0]) {
      R = A[2];
      break;
    }
  }
  return R;
}

// Break a string contains ',' into each item; sort items, then merge back to string
export function exp_sort(name) {
  if (name == "") return 0;
  if (!name.match(",")) return name;
  var items = [];
  var temp = "";
  var j = name.length;
  var c, i;
  for (i = 0; i < j; i++) {
    c = name?.charAt(i);
    if (c != ",") temp += c;
    else if (temp.length) {
      items.push(temp);
      temp = "";
      if (name?.charAt(i + 1) == " ") i++;
    }
  }
  if (temp.length) items.push(temp);
  items.sort();
  temp = "";
  for (i = 0; i < items.length; i++)
    temp += items[i] + (i + 1 < items.length ? ", " : "");
  return temp;
}

// Store to an array if a string (s) not already there
export function storeIt(M, S) {
  var j, i;
  if (S == "" || S == " " || S == ".") return M;
  var A = S.split(/, /);
  for (j = 0; j < A.length; j++) {
    var f = 0;
    // check for a duplicate
    for (i = 0; i < M.length; i++)
      if (M[i] == A[j]) {
        f = 1;
        break;
      }
    if (!f) M.push(A[j]);
  }
  M.sort();
  return M;
}

export function TagIt(name) {
  this.name = name;
  this.count = 1;
}

// Store to an array for a string (s) and if already there then increasing count
export function countTag(M, S) {
  var j, i;
  if (S == "" || S == " " || S == ".") return M;
  var A = S.split(/, /);
  for (j = 0; j < A.length; j++) {
    var f = 0;
    // check for a duplicate
    for (i = 0; i < M.length; i++) {
      if (M[i].name == A[j]) {
        M[i].count += 1;
        f = 1;
        break;
      }
    }
    if (!f) M.push(new TagIt(A[j]));
  }
  return M;
}

export function compareTag(A, B) {
  var j, i;
  for (j = 0; j < A.length; j++) {
    for (i = 0; i < B.length; i++) {
      if (A[j].name == B[i].name) {
        if (A[j].count == B[i].count) {
          A[j].count = 0;
          B[i].count = 0;
        } else if (A[j].count > B[i].count) {
          A[j].count = A[j].count - B[i].count;
          B[i].count = 0;
        } else {
          B[i].count = B[i].count - A[j].count;
          A[j].count = 0;
        }
      }
    }
  }
}

export function tag2Str(A, match) {
  var s = "";
  var i;

  // put together all names
  for (i = 0; i < A.length; i++) {
    if (A[i].count) {
      s += A[i].name + (i + 1 < A.length ? ", " : "");
    }
  }

  // break down and sort names
  s = exp_sort(s);

  // break down into separate names
  var M = [];
  M = storeIt(M, s);

  // put together with HTML if necessary
  s = "";
  for (i = 0; i < M.length; i++) {
    if (M[i] == match)
      s += "@!" + M[i] + "@!" + (i + 1 < M.length ? ", " : ".");
    else s += M[i] + (i + 1 < M.length ? ", " : ".");
  }
  return s;
}

var i_su = [
  "an doanh: :安营",
  "an đối ngại: :安碓磑",
  "an hương: :安香",
  "an môn: :安門",
  "an phủ biên cảnh: :安撫邊境",
  "an sản thất: :安產室",
  "an sàng: :安牀",
  "an táng: :安葬",
  "an táo: :安灶",
  "an thần: :安神",
  "bái công khanh: :拜公卿",
  "bái quan: :拜官",
  "bái yết: :拜謁",
  "ban chiếu: :頒詔",
  "bàn di: :搬移",
  "bàn thiên: :搬遷",
  "bàng phụ táng: :傍附葬",
  "bình trì đạo đồ: :平治道塗",
  "bộ liệp: :捕獵",
  "bộ ngư: :捕魚",
  "bộ tróc: :捕捉",
  "bổ viên: :補垣",
  "bội ấn: :佩印",
  "cái ốc: :蓋屋",
  "cải mộ: :改墓",
  "cầu hôn: :求婚",
  "cầu phúc nguyện: :求福願",
  "cầu tài: :求財",
  "cầu tự: :求嗣",
  "cầu y: :求醫",
  "châm cứu: :針灸",
  "chiếu chiêu hiền: :詔招賢",
  "chiêu chuế: :招赘",
  "chiêu hiền: :招賢",
  "chinh hành: :征行",
  "chinh thảo: :征討",
  "chỉnh dung thế đầu: :整容剃頭",
  "chỉnh thủ túc giáp: :整手足甲",
  "chú dong: :铸鎔",
  "chú tả: :鑄瀉",
  "chủng cốc: :種榖",
  "chủng thì: :種蒔",
  "chủng thực: :種植",
  "cổ chú: :鼓鑄",
  "công quả: :功果",
  "công thành trại: :攻城寨",
  "cử chánh trực: :舉正直",
  "dã chiến: :野戰",
  "di cư: :移居",
  "di cữu: :移柩",
  "di đồ: :移徒",
  "di tỉ: :移徙",
  "di trạch: :移宅",
  "diêu dã: :窑冶",
  "doanh chủng thời: :營種蒔",
  "doanh chủng thực: :營種植",
  "doanh kiến cung thất: :營建宮室",
  "doanh tạo ốc xá: :營造屋舍",
  "doanh thương: :营商",
  "dưỡng dục quần súc: :養育群畜",
  "đại sát: :大殺",
  "đàm ân: :覃恩",
  "đăng cao: :登高",
  "đăng sơn: :登山",
  "đảo từ: :禱祠",
  "điền bổ: :填補",
  "điền liệp: :畋獵",
  "điêu khắc: :雕刻",
  "đính hôn: :訂婚",
  "đính minh: :訂盟",
  "đình tân khách: :停賓客",
  "định kế sách: :定計策",
  "độ thủy: :渡水",
  "động thổ: :動土",
  "giải trừ: :解除",
  "giá mã: :架馬",
  "giá thú: :嫁娶",
  "giao dịch: :交易",
  "giao thiệp: :交涉",
  "hành hạnh: :行幸",
  "hành huệ: :行惠",
  "hành huệ ái: :行惠愛",
  "hành thuyền: :行船",
  "hiến chương sớ: :獻章疏",
  "hiến phong chương: :獻封章",
  "hòa hợp: :和合",
  "hòa hợp sự: :和合事",
  "hoãn hình ngục: :緩刑獄",
  "hội khách: :會客",
  "hội nhân thân: :會姻親",
  "hội thân hữu: :会亲友",
  "hội thân nhân: :會親姻",
  "hợp bạn: :合伴",
  "hợp dược: :合藥",
  "hợp thọ mộc: :合寿木",
  "hợp tích: :合脊",
  "hợp trướng: :合帳",
  "hứa nguyện: :許愿",
  "huấn binh: :訓兵",
  "huấn luyện: :訓練",
  "hưng công trợ phúc: :興工助福",
  "hưng điếu phạt: :興弔伐",
  "hưng tạo: :興造",
  "hưng tu: :興修",
  "hưng từ tụng: :興詞訟",
  "hưng xuyên quật: :興穿掘",
  "kết hôn nhân: :結婚姻",
  "kết nghĩa: :作染",
  "khai cừ: :開渠",
  "khai đạo câu cừ: :開道溝渠",
  "khai điếm tứ: :開店肆",
  "khai đường: :開塘",
  "khai khố điếm: :開庫店",
  "khai quang: :開光",
  "khai sanh phần: :開生墳",
  "khai thị: :開市",
  "khai thương: :開倉",
  "khai thương khố: :開倉庫",
  "khai thương khố điếm: :開倉庫店",
  "khai trương: :開張",
  "khai trì:開池",
  "khai tứ: :開肆",
  "khải toản: :啟攢",
  "khánh tứ: :慶賜",
  "khiển sử: :遣使",
  "khởi công: :起工",
  "khởi tạo: :起造",
  "khởi thổ tu doanh: :起土修營",
  "kiến miếu vũ: :建廟宇",
  "kiến nghĩa lệ: :見義例",
  "kiến tiếu: :建醮",
  "kinh doanh: :經營",
  "kinh lạc: :經絡",
  "kinh thương: :經商",
  "kì phúc: :祈福",
  "kinh thương: :經商",
  "lâm chánh: :臨政",
  "lâm chánh thân dân: :臨政親民",
  "lâm dân: :臨民",
  "lâm trận: :臨陣",
  "lập khế mãi mại: :立契買賣",
  "lập khế khoán: :立契券",
  "lập khoán: :立券",
  "lập tự: :立嗣",
  "lễ thần: :禮神",
  "liệu bệnh: :療病",
  "long táo: :龍灶",
  "lục lễ: :六禮",
  "lưu tài: :流財",
  "mai huyệt: :埋穴",
  "mai táng: :埋葬",
  "mai trì: :埋池",
  "mậu hĩ: :謬矣",
  "mộc dục: :沐浴",
  "mục dưỡng: :牧養",
  "mục thân tộc: :睦親族",
  "nạp lễ: :納禮",
  "nạp quần súc: :納群畜",
  "nạp súc: :納畜",
  "nạp tài: :納財",
  "nạp tế: :纳婿",
  "nạp thái: :納采",
  "nê sức: :泥飾",
  "nghênh thân: :迎親",
  "nghi gia cư: :宜家居",
  "nghi tác thọ mộc: :宜作壽木",
  "nghi thất: :宜室",
  "nhập học: :入學",
  "nhập liễm: :入殮",
  "nhập sơn: :入山",
  "nhập trạch: :入宅",
  "phá ốc hoại viên: :破屋壞垣",
  "phá thổ: :破土",
  "phân cư: :分居",
  "phần mộ: :墳墓",
  "phạt mộc: :伐木",
  "phó nhậm: :赴任",
  "phục dược: :服藥",
  "quan đới: :冠帶",
  "quan kê: :冠笄",
  "quy gia: :歸家",
  "quy hỏa: :歸火",
  "sách tá: :拆卸",
  "sanh sản: :生產",
  "tác diêu: :作窑",
  "tác giao quan: :作交關",
  "tác nhiễm: :作染",
  "tác pha: :作陂",
  "tác sự: :作事",
  "tác táo: :作灶",
  "tác yển: :作堰",
  "tắc huyệt: :塞穴",
  "tài chế: :裁製",
  "tài chủng: :栽種",
  "tài y: :裁衣",
  "tang sự: :喪事",
  "táng mai: :葬埋",
  "tạo bái đàn: :造拜壇",
  "tạo kiều: :造桥",
  "tạo kiều lương: :造橋梁",
  "tạo ốc: :造屋",
  "tạo sàng trướng: :造床帳",
  "tạo súc lan: :造畜欄",
  "tạo tác mộc giới: :造作木械",
  "tạo táng: :造葬",
  "tạo thuyền: :造船",
  "tạo thương khố: :造倉庫",
  "tạo trạch: :造宅",
  "tạo trạch xá: :造宅舍",
  "tạo xá: :造舍",
  "tạo tửu thố: :造酒醋",
  "tạo tửu khúc tương thố: :造酒麴醬醋",
  "tảo xá vũ: :掃舍",
  "tảo xá vũ: :掃舍宇",
  "tập nghệ: :結義",
  "tế tự: :祭祀",
  "tái hóa vật: :載貨物",
  "tài chế: :裁製",
  "tài chủng: :栽種",
  "tài mộc: :裁木",
  "tài y: :裁衣",
  "tham yết: :參謁",
  "thành phục: :成服",
  "thành thân lễ: :成親禮",
  "thi ân: :施恩",
  "thi ân phong bái: :施恩封拜",
  "thi ân huệ: :施恩惠",
  "thiêm ước: :簽約",
  "thiện thành quách: :繕城郭",
  "thiên tỉ: :遷徙",
  "thiệp giang hà: :涉江河",
  "thiết trai tiếu: :設齋醮",
  "thiết trù mưu: :設籌謀",
  "thiêu diêu: :燒窑",
  "thỉnh y: :請醫",
  "thu bộ: :收捕",
  "thú cấu: :收購",
  "thú phụ: :娶婦",
  "thủ liệp: :守猎",
  "thủ ngư: :取魚",
  "thủ thổ: :取土",
  "thụ hạ: :受賀",
  "thụ sự: :受事",
  "thụ tạo: :豎造",
  "thụ trụ: :豎柱",
  "thụ phong: :受封",
  "thu phóng tài vật: :收放財物",
  "thừa chu hạ tái: :乘舟下載",
  "thừa thuyền: :乘船",
  "thương cổ: :商賈",
  "thưởng hạ: :賞賀",
  "thượng biểu: :上表",
  "thượng biểu chương: :上表章",
  "thượng lương: :上梁",
  "thượng quan: :上官",
  "thượng sách: :上冊",
  "thưởng hạ: :賞賀",
  "tị bệnh: :避病",
  "tiến biểu chương: :進表章",
  "tiến nhân: :進人",
  "tiến nhân khẩu: :進人口",
  "tố họa thần tượng: :塑畫神像",
  "tố lương: :做樑",
  "tố tụng: :訴訟",
  "tống lễ: :送礼",
  "trai tiếu: :斋醮",
  "trang tải: :裝載",
  "trang tu: :裝修",
  "trần lợi ngôn: :陳利言",
  "trần từ tụng: :陳詞訟",
  "trị bệnh: :治病",
  "trừ phục: :除服",
  "trúc đê phòng: :築隄防",
  "trúc viên tường: :築垣牆",
  "tu cung thất: :修宮室",
  "tu doanh: :修營",
  "tu diêu: :修窑",
  "tu kiều: :修桥",
  "tu lộ: :修路",
  "tu lục súc lan: :修六畜欄枋",
  "tu ốc: :修屋",
  "tu phần: :修坟",
  "tu phương: :修方",
  "tu sản thất: :修產室",
  "tu thương khố: :修倉庫",
  "tu thuyền: :修船",
  "tu táo: :修灶",
  "tu tạo: :修造",
  "tu tác: :修作",
  "tu trạch: :修宅",
  "tu trai: :修齋",
  "tu trì: :修池",
  "tu sản thất: :修產室",
  "tu sức viên tường: :修飾垣牆",
  "tu trạch xá: :修宅舍",
  "tu trí sản thất: :修置產室",
  "tu trúc thành lũy: :修築城壘",
  "tứ xá: :肆赦",
  "từ tụng: :詞訟",
  "tự táo: :祀灶",
  "tự thần: :祀神",
  "tự thần kì: :祀神祇",
  "tuất cô quỳnh: :恤孤惸",
  "tuyên chánh sự: :宣政事",
  "tuyển tương: :選將",
  "tuyết oan uổng: :雪冤枉",
  "uấn nhưỡng: :醞釀",
  "ứng thí: :应试",
  "vấn danh: :問名",
  "vận động: :運動",
  "viễn hành: :遠行",
  "viễn hồi: :远迴",
  "xá vũ: :舍宇",
  "xuất hành: :出行",
  "xuất quân: :出軍",
  "xuất hóa tài: :出貨財",
  "xuất hỏa: :出火",
  "xuất sư: :出師",
  "xuất tài: :出財",
  "xuất tài vật: :出財物",
  "xuyên nhĩ khổng: :穿耳孔",
  "xuyên ngưu tị: :穿牛鼻",
  "xuyên tỉnh: :穿井",
  "y nhương pháp: :依禳法",
  "yến ẩm: :宴飲",
  "yến hội: :宴會",
  "yển vũ tập nghệ: :偃武习艺",
  "yết lục súc: :羯六畜",
  "x: :y",
];
export function LC1(name) {
  return name;
}

export function LC2(name) {
  return name;
}

//'<a class=lnk4 href=hung-tinh.htm#'+iHungNhat(than[i])+'>'+than[i]+'</a>'
export function LH1(name) {
  return name;
}

export function LH2(name) {
  return name;
}
