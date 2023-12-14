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
        ArrHopHoa.push({
          ...item,
          titleHopHoaNgay:
            combineThienCanNgayThang.length !== 0
              ? "DM"
              : combineThienCanNgayNam.length !== 0
              ? "DY"
              : "DMY",
        });
      }
    } else {
      ArrHopHoa.push(item);
    }
  });
  // return 1;
  // console.log(ArrHopHoa, "ArrHopHoa");
  return ArrHopHoa;
};
export const handleHopHoaGio = (
  item,
  arrHours,
  isCheckGioNgayThangWhileCanNgayKhacToaNha,
  arrHoursOke,
  titleCheckGioNgayThang,
  toa,
  arrPerfectDateStep5,
  arrPerfectDateStep8,
  isTruongHop2BonusHoaHop
) => {
  arrHours.map((hour, index) => {
    // if (
    //   CheckSinhXuat(
    //     NGU_HANH[toa],
    //     NGU_HANH[item.arrGioCan[CHI_NAM_SORTED.indexOf(hour)]]
    //   ) === false
    // ) {

    const combineThienCanGioNgay = CombineThienCan(
      item.arrGioCan[CHI_NAM_SORTED.indexOf(hour)],
      item.ngayCan
    );
    const combineThienCanGioThang = CombineThienCan(
      item.arrGioCan[CHI_NAM_SORTED.indexOf(hour)],
      item.thangCan
    );
    const combineThienCanGioNam = CombineThienCan(
      item.arrGioCan[CHI_NAM_SORTED.indexOf(hour)],
      item.namCan
    );

    // HY
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
      isCheckGioNgayThangWhileCanNgayKhacToaNha.push(true);
      titleCheckGioNgayThang.push("HY");
      arrHoursOke.push(hour);
    }
    // HD
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
      isCheckGioNgayThangWhileCanNgayKhacToaNha.push(true);

      titleCheckGioNgayThang.push("HD");
      arrHoursOke.push(hour);
    }
    // HM
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
      isCheckGioNgayThangWhileCanNgayKhacToaNha.push(true);

      titleCheckGioNgayThang.push("HM");
      arrHoursOke.push(hour);
    }
    // HDM && HDY
    if (
      // HD
      !CheckNguHanhTuongKhacKhauQuyet(NGU_HANH[hour], combineThienCanGioNgay) &&
      !CheckNguHanhTuongKhacKhauQuyet(
        NGU_HANH[item.ngayChi],
        combineThienCanGioNgay
      ) &&
      CheckNguHanhTuongKhac(NGU_HANH[toa], combineThienCanGioNgay) === false &&
      !CheckSinhXuat(NGU_HANH[toa], combineThienCanGioNgay) &&
      combineThienCanGioNgay !== ""
    ) {
      // HM
      if (
        !CheckNguHanhTuongKhacKhauQuyet(
          NGU_HANH[hour],
          combineThienCanGioThang
        ) &&
        !CheckNguHanhTuongKhacKhauQuyet(
          NGU_HANH[item.thangChi],
          combineThienCanGioThang
        ) &&
        combineThienCanGioThang !== "" &&
        combineThienCanGioNam === "" &&
        CheckNguHanhTuongKhac(NGU_HANH[toa], combineThienCanGioThang) ===
          false &&
        !CheckSinhXuat(NGU_HANH[toa], combineThienCanGioThang)
      ) {
        isCheckGioNgayThangWhileCanNgayKhacToaNha.push(true);
        titleCheckGioNgayThang.push("HDM");
        arrHoursOke.push(hour);
      }
      // HY
      if (
        !CheckNguHanhTuongKhacKhauQuyet(
          NGU_HANH[hour],
          combineThienCanGioNam
        ) &&
        !CheckNguHanhTuongKhacKhauQuyet(
          NGU_HANH[item.thangChi],
          combineThienCanGioNam
        ) &&
        combineThienCanGioNam !== "" &&
        combineThienCanGioThang === "" &&
        CheckNguHanhTuongKhac(NGU_HANH[toa], combineThienCanGioNam) === false &&
        !CheckSinhXuat(NGU_HANH[toa], combineThienCanGioNam)
      ) {
        isCheckGioNgayThangWhileCanNgayKhacToaNha.push(true);
        titleCheckGioNgayThang.push("HDY");
        arrHoursOke.push(hour);
      }
    }
    // HMY && HDMY
    if (
      // HM
      !CheckNguHanhTuongKhacKhauQuyet(
        NGU_HANH[hour],
        combineThienCanGioThang
      ) &&
      !CheckNguHanhTuongKhacKhauQuyet(
        NGU_HANH[item.thangChi],
        combineThienCanGioThang
      ) &&
      combineThienCanGioThang !== "" &&
      CheckNguHanhTuongKhac(NGU_HANH[toa], combineThienCanGioThang) === false &&
      !CheckSinhXuat(NGU_HANH[toa], combineThienCanGioThang) &&
      // HY
      !CheckNguHanhTuongKhacKhauQuyet(NGU_HANH[hour], combineThienCanGioNam) &&
      !CheckNguHanhTuongKhacKhauQuyet(
        NGU_HANH[item.thangChi],
        combineThienCanGioNam
      ) &&
      combineThienCanGioNam !== "" &&
      CheckNguHanhTuongKhac(NGU_HANH[toa], combineThienCanGioNam) === false &&
      !CheckSinhXuat(NGU_HANH[toa], combineThienCanGioNam)
    ) {
      // HD => HDMY
      if (
        !CheckNguHanhTuongKhacKhauQuyet(
          NGU_HANH[hour],
          combineThienCanGioNgay
        ) &&
        !CheckNguHanhTuongKhacKhauQuyet(
          NGU_HANH[item.ngayChi],
          combineThienCanGioNgay
        ) &&
        CheckNguHanhTuongKhac(NGU_HANH[toa], combineThienCanGioNgay) ===
          false &&
        !CheckSinhXuat(NGU_HANH[toa], combineThienCanGioNgay) &&
        combineThienCanGioNgay !== ""
      ) {
        titleCheckGioNgayThang.push("HDMY");
        isCheckGioNgayThangWhileCanNgayKhacToaNha.push(true);
        arrHoursOke.push(hour);
      } else {
        //  HMY
        titleCheckGioNgayThang.push("HMY");
        isCheckGioNgayThangWhileCanNgayKhacToaNha.push(true);
        arrHoursOke.push(hour);
      }
    }
  });

  if (isCheckGioNgayThangWhileCanNgayKhacToaNha.length !== 0) {
    arrPerfectDateStep5.push({
      ...item,
      gio: arrHours,
      isTruongHop2BonusHoaHop,
      titleCheckGioNgayThang,
      arrHoursOke,
    });
    if (arrHours.length !== 0) {
      arrPerfectDateStep8.push({
        ...item,
        gio: arrHours,
        isTruongHop2BonusHoaHop,
        titleCheckGioNgayThang,
        arrHoursOke,
      });
    }
  }
};

export const handleHopHoaGioKhongKhacToa = async (
  item,
  arrHours,
  isCheckGioNgayThangWhileCanNgayKhacToaNha,
  arrHoursOke,
  titleCheckGioNgayThang,
  toa,
  arrPerfectDateStep5,
  arrPerfectDateStep8,
  isTruongHop2BonusHoaHop
) => {
  await arrHours.map((hour, index) => {
    // if (
    //   CheckSinhXuat(
    //     NGU_HANH[toa],
    //     NGU_HANH[item.arrGioCan[CHI_NAM_SORTED.indexOf(hour)]]
    //   ) === false
    // ) {

    const combineThienCanGioNgay = CombineThienCan(
      item.arrGioCan[CHI_NAM_SORTED.indexOf(hour)],
      item.ngayCan
    );
    const combineThienCanGioThang = CombineThienCan(
      item.arrGioCan[CHI_NAM_SORTED.indexOf(hour)],
      item.thangCan
    );
    const combineThienCanGioNam = CombineThienCan(
      item.arrGioCan[CHI_NAM_SORTED.indexOf(hour)],
      item.namCan
    );
    if (
      combineThienCanGioNgay === "" &&
      combineThienCanGioThang === "" &&
      combineThienCanGioNam === ""
    ) {
      titleCheckGioNgayThang.push("");

      arrHoursOke.push(hour);
      isCheckGioNgayThangWhileCanNgayKhacToaNha.push(true);
    } else {
      // HY
      if (
        !CheckNguHanhTuongKhacKhauQuyet(
          NGU_HANH[hour],
          combineThienCanGioNam
        ) &&
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
        isCheckGioNgayThangWhileCanNgayKhacToaNha.push(true);
        titleCheckGioNgayThang.push("HY");
        arrHoursOke.push(hour);
      }
      // HD
      if (
        !CheckNguHanhTuongKhacKhauQuyet(
          NGU_HANH[hour],
          combineThienCanGioNgay
        ) &&
        !CheckNguHanhTuongKhacKhauQuyet(
          NGU_HANH[item.ngayChi],
          combineThienCanGioNgay
        ) &&
        CheckNguHanhTuongKhac(NGU_HANH[toa], combineThienCanGioNgay) ===
          false &&
        !CheckSinhXuat(NGU_HANH[toa], combineThienCanGioNgay) &&
        combineThienCanGioNgay !== "" &&
        combineThienCanGioThang === "" &&
        combineThienCanGioNam === ""
      ) {
        isCheckGioNgayThangWhileCanNgayKhacToaNha.push(true);
        titleCheckGioNgayThang.push("HD");
        arrHoursOke.push(hour);
      }
      // HM
      if (
        !CheckNguHanhTuongKhacKhauQuyet(
          NGU_HANH[hour],
          combineThienCanGioThang
        ) &&
        !CheckNguHanhTuongKhacKhauQuyet(
          NGU_HANH[item.thangChi],
          combineThienCanGioThang
        ) &&
        CheckNguHanhTuongKhac(NGU_HANH[toa], combineThienCanGioThang) ===
          false &&
        !CheckSinhXuat(NGU_HANH[toa], combineThienCanGioThang) &&
        combineThienCanGioNgay === "" &&
        combineThienCanGioThang !== "" &&
        combineThienCanGioNam === ""
      ) {
        isCheckGioNgayThangWhileCanNgayKhacToaNha.push(true);
        titleCheckGioNgayThang.push("HM");
        arrHoursOke.push(hour);
      }

      // HDM && HDY
      if (
        // HD
        !CheckNguHanhTuongKhacKhauQuyet(
          NGU_HANH[hour],
          combineThienCanGioNgay
        ) &&
        !CheckNguHanhTuongKhacKhauQuyet(
          NGU_HANH[item.ngayChi],
          combineThienCanGioNgay
        ) &&
        CheckNguHanhTuongKhac(NGU_HANH[toa], combineThienCanGioNgay) ===
          false &&
        !CheckSinhXuat(NGU_HANH[toa], combineThienCanGioNgay) &&
        combineThienCanGioNgay !== ""
      ) {
        // HM
        if (
          !CheckNguHanhTuongKhacKhauQuyet(
            NGU_HANH[hour],
            combineThienCanGioThang
          ) &&
          !CheckNguHanhTuongKhacKhauQuyet(
            NGU_HANH[item.thangChi],
            combineThienCanGioThang
          ) &&
          combineThienCanGioThang !== "" &&
          combineThienCanGioNam === "" &&
          CheckNguHanhTuongKhac(NGU_HANH[toa], combineThienCanGioThang) ===
            false &&
          !CheckSinhXuat(NGU_HANH[toa], combineThienCanGioThang)
        ) {
          isCheckGioNgayThangWhileCanNgayKhacToaNha.push(true);
          titleCheckGioNgayThang.push("HDM");
          arrHoursOke.push(hour);
        }
        // HY
        if (
          !CheckNguHanhTuongKhacKhauQuyet(
            NGU_HANH[hour],
            combineThienCanGioNam
          ) &&
          !CheckNguHanhTuongKhacKhauQuyet(
            NGU_HANH[item.thangChi],
            combineThienCanGioNam
          ) &&
          combineThienCanGioNam !== "" &&
          combineThienCanGioThang === "" &&
          CheckNguHanhTuongKhac(NGU_HANH[toa], combineThienCanGioNam) ===
            false &&
          !CheckSinhXuat(NGU_HANH[toa], combineThienCanGioNam)
        ) {
          isCheckGioNgayThangWhileCanNgayKhacToaNha.push(true);
          titleCheckGioNgayThang.push("HDY");
          arrHoursOke.push(hour);
        }
      }

      // HMY && HDMY
      if (
        // HM
        !CheckNguHanhTuongKhacKhauQuyet(
          NGU_HANH[hour],
          combineThienCanGioThang
        ) &&
        !CheckNguHanhTuongKhacKhauQuyet(
          NGU_HANH[item.thangChi],
          combineThienCanGioThang
        ) &&
        combineThienCanGioThang !== "" &&
        CheckNguHanhTuongKhac(NGU_HANH[toa], combineThienCanGioThang) ===
          false &&
        !CheckSinhXuat(NGU_HANH[toa], combineThienCanGioThang) &&
        // HY
        !CheckNguHanhTuongKhacKhauQuyet(
          NGU_HANH[hour],
          combineThienCanGioNam
        ) &&
        !CheckNguHanhTuongKhacKhauQuyet(
          NGU_HANH[item.thangChi],
          combineThienCanGioNam
        ) &&
        combineThienCanGioNam !== "" &&
        CheckNguHanhTuongKhac(NGU_HANH[toa], combineThienCanGioNam) === false &&
        !CheckSinhXuat(NGU_HANH[toa], combineThienCanGioNam)
      ) {
        // HD => HDMY
        if (
          !CheckNguHanhTuongKhacKhauQuyet(
            NGU_HANH[hour],
            combineThienCanGioNgay
          ) &&
          !CheckNguHanhTuongKhacKhauQuyet(
            NGU_HANH[item.ngayChi],
            combineThienCanGioNgay
          ) &&
          CheckNguHanhTuongKhac(NGU_HANH[toa], combineThienCanGioNgay) ===
            false &&
          !CheckSinhXuat(NGU_HANH[toa], combineThienCanGioNgay) &&
          combineThienCanGioNgay !== ""
        ) {
          titleCheckGioNgayThang.push("HDMY");
          isCheckGioNgayThangWhileCanNgayKhacToaNha.push(true);
          arrHoursOke.push(hour);
        } else {
          //  HMY
          titleCheckGioNgayThang.push("HMY");
          isCheckGioNgayThangWhileCanNgayKhacToaNha.push(true);
          arrHoursOke.push(hour);
        }
      }
    }
  });

  if (isCheckGioNgayThangWhileCanNgayKhacToaNha.length !== 0) {
    arrPerfectDateStep5.push({
      ...item,
      gio: arrHours,
      isTruongHop2BonusHoaHop,
      titleCheckGioNgayThang,
      arrHoursOke,
    });
    if (arrHours.length !== 0) {
      arrPerfectDateStep8.push({
        ...item,
        gio: arrHours,
        isTruongHop2BonusHoaHop,
        titleCheckGioNgayThang,
        arrHoursOke,
      });
    }
  }
};
