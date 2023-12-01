import { CHI_NAM_SORTED, NGU_HANH } from "./Constant";
import {
  CheckNguHanhTuongKhac,
  CheckNguHanhTuongKhacKhauQuyet,
  CheckSinhXuat,
  CombineThienCan,
} from "./handleDateChange";

export const handleHopHoaNgayThang = async (arr, toa) => {
  let ArrHopHoa = [];
  arr?.map((item, ind) => {
    let combineThienCanNgayThang = CombineThienCan(item.thangCan, item.ngayCan);
    let combineThienCanNgayNam = CombineThienCan(item.namCan, item.ngayCan);

    if (
      combineThienCanNgayThang.length !== 0 ||
      combineThienCanNgayNam.length !== 0
    ) {
      if (
        // ngay Thang
        !CheckNguHanhTuongKhacKhauQuyet(
          NGU_HANH[item.thangChi],
          combineThienCanNgayThang
        ) &&
        !CheckNguHanhTuongKhacKhauQuyet(
          NGU_HANH[item.ngayChi],
          combineThienCanNgayThang
        ) &&
        !CheckNguHanhTuongKhac(NGU_HANH[toa], combineThienCanNgayThang) &&
        CheckSinhXuat(NGU_HANH[toa], combineThienCanNgayThang) === false &&
        // ngay Nam
        !CheckNguHanhTuongKhacKhauQuyet(
          NGU_HANH[item.namChi],
          combineThienCanNgayNam
        ) &&
        !CheckNguHanhTuongKhacKhauQuyet(
          NGU_HANH[item.ngayChi],
          combineThienCanNgayNam
        ) &&
        !CheckNguHanhTuongKhac(NGU_HANH[toa], combineThienCanNgayNam) &&
        CheckSinhXuat(NGU_HANH[toa], combineThienCanNgayNam) === false
      ) {
        ArrHopHoa.push(item);
      }
    } else {
      ArrHopHoa.push(item);
    }
  });
  // return 1;
  // console.log(ArrHopHoa, "ArrHopHoa");
  return ArrHopHoa;
};
export const handleHopHoaGio = async (
  item,
  arrHours,
  isCheckGioNgayThangWhileCanNgayKhacToaNha,
  arrHoursOke,
  titleCheckGioNgayThang,
  toa,
  arrPerfectDateStep5,
  arrPerfectDateStep8
) => {
  arrHours.map((hour, index) => {
    // if (
    //   CheckSinhXuat(
    //     NGU_HANH[toa],
    //     NGU_HANH[item.arrGioCan[CHI_NAM_SORTED.indexOf(hour)]]
    //   ) === false
    // ) {

    let combineThienCanGioNgay = CombineThienCan(
      item.arrGioCan[CHI_NAM_SORTED.indexOf(hour)],
      item.ngayCan
    );
    let combineThienCanGioThang = CombineThienCan(
      item.arrGioCan[CHI_NAM_SORTED.indexOf(hour)],
      item.thangCan
    );
    let combineThienCanGioNam = CombineThienCan(
      item.arrGioCan[CHI_NAM_SORTED.indexOf(hour)],
      item.namCan
    );
    if (
      !CheckNguHanhTuongKhacKhauQuyet(NGU_HANH[hour], combineThienCanGioNam) &&
      !CheckNguHanhTuongKhacKhauQuyet(
        NGU_HANH[item.namChi],
        combineThienCanGioNam
      ) &&
      CheckNguHanhTuongKhac(NGU_HANH[toa], combineThienCanGioNam) === false &&
      !CheckSinhXuat(NGU_HANH[toa], combineThienCanGioNam) &&
      combineThienCanGioNgay === "" &&
      combineThienCanGioThang === "" &&
      combineThienCanGioNam !== ""
    ) {
      isCheckGioNgayThangWhileCanNgayKhacToaNha = true;
      titleCheckGioNgayThang.push("HY");
      arrHoursOke.push(hour);
    }

    if (
      !CheckNguHanhTuongKhacKhauQuyet(NGU_HANH[hour], combineThienCanGioNgay) &&
      !CheckNguHanhTuongKhacKhauQuyet(
        NGU_HANH[item.ngayChi],
        combineThienCanGioNgay
      ) &&
      CheckNguHanhTuongKhac(NGU_HANH[toa], combineThienCanGioNgay) === false &&
      !CheckSinhXuat(NGU_HANH[toa], combineThienCanGioNgay) &&
      combineThienCanGioNgay !== "" &&
      combineThienCanGioThang === "" &&
      combineThienCanGioNam === ""
    ) {
      isCheckGioNgayThangWhileCanNgayKhacToaNha = true;
      titleCheckGioNgayThang.push("HD");
      arrHoursOke.push(hour);
    }

    if (
      !CheckNguHanhTuongKhacKhauQuyet(
        NGU_HANH[hour],
        combineThienCanGioThang
      ) &&
      !CheckNguHanhTuongKhacKhauQuyet(
        NGU_HANH[item.thangChi],
        combineThienCanGioThang
      ) &&
      CheckNguHanhTuongKhac(NGU_HANH[toa], combineThienCanGioThang) === false &&
      !CheckSinhXuat(NGU_HANH[toa], combineThienCanGioThang) &&
      combineThienCanGioNgay === "" &&
      combineThienCanGioThang !== "" &&
      combineThienCanGioNam === ""
    ) {
      isCheckGioNgayThangWhileCanNgayKhacToaNha = true;
      titleCheckGioNgayThang.push("HM");
      arrHoursOke.push(hour);
    }
    if (
      !CheckNguHanhTuongKhacKhauQuyet(
        NGU_HANH[hour],
        combineThienCanGioThang
      ) &&
      !CheckNguHanhTuongKhacKhauQuyet(
        NGU_HANH[item.thangChi],
        combineThienCanGioThang
      ) &&
      !CheckNguHanhTuongKhacKhauQuyet(NGU_HANH[hour], combineThienCanGioNgay) &&
      !CheckNguHanhTuongKhacKhauQuyet(
        NGU_HANH[item.ngayChi],
        combineThienCanGioNgay
      ) &&
      CheckNguHanhTuongKhac(NGU_HANH[toa], combineThienCanGioNgay) === false &&
      !CheckSinhXuat(NGU_HANH[toa], combineThienCanGioNgay) &&
      CheckNguHanhTuongKhac(NGU_HANH[toa], combineThienCanGioThang) === false &&
      !CheckSinhXuat(NGU_HANH[toa], combineThienCanGioThang) &&
      combineThienCanGioNgay !== "" &&
      combineThienCanGioThang !== "" &&
      combineThienCanGioNam === ""
    ) {
      isCheckGioNgayThangWhileCanNgayKhacToaNha = true;
      titleCheckGioNgayThang.push("HDM");
      arrHoursOke.push(hour);
    }
    // }
  });
  if (isCheckGioNgayThangWhileCanNgayKhacToaNha) {
    arrPerfectDateStep5.push({
      ...item,
      gio: arrHours,
      isTruongHop2BonusHoaHop: true,
      titleCheckGioNgayThang,
      arrHoursOke,
    });
    if (arrHours.length !== 0) {
      arrPerfectDateStep8.push({
        ...item,
        gio: arrHours,
        isTruongHop2BonusHoaHop: true,
        titleCheckGioNgayThang,
        arrHoursOke,
      });
    }
  }
};
