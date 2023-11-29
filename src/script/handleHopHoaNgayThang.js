import { NGU_HANH } from "./Constant";
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
        console.log(12312312);
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
