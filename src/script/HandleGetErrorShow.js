import {
  CHI,
  CHI_NAM_SORTED,
  NGU_HANH,
  SAT_CHU_AM,
  SAT_CHU_DUONG,
  THO_TU,
} from "./Constant";
import {
  CheckCase4TrungTang,
  CheckCase5TrungTang,
  CheckHaiChi,
  CheckHinhChi,
  CheckNgayTrungNhat,
  CheckNguHanhTuongKhac,
  CheckNguHanhTuongKhacKhauQuyet,
  CheckSinhXuat,
  CheckTrucXungHinhHaiChi,
  CheckTrucXungHinhHaiChiTangSu,
  CheckTrucXungNgayThangNam,
  CheckTrungTang,
  CombineThienCan,
} from "./handleDateChange";

export const GetErrorGioHopHoa = (
  chiGio,
  canGio,
  ngayCan,
  ngayChi,
  thangCan,
  thangChi,
  namCan,
  namChi,
  toaNha
) => {
  let isErrGioHopHoa = "Không hợp hoá";
  let combineThienCanGioNgay = CombineThienCan(canGio, ngayCan);
  let combineThienCanGioThang = CombineThienCan(canGio, thangCan);
  let combineThienCanGioNam = CombineThienCan(canGio, namCan);

  if (
    !CheckNguHanhTuongKhacKhauQuyet(NGU_HANH[chiGio], combineThienCanGioNam) &&
    !CheckNguHanhTuongKhacKhauQuyet(NGU_HANH[namChi], combineThienCanGioNam) &&
    CheckNguHanhTuongKhac(NGU_HANH[toaNha], combineThienCanGioNam) === false &&
    !CheckSinhXuat(NGU_HANH[toaNha], combineThienCanGioNam) &&
    combineThienCanGioNgay === "" &&
    combineThienCanGioThang === "" &&
    combineThienCanGioNam !== ""
  ) {
    // titleCheckGioNgayThang.push("HY");
    isErrGioHopHoa = "";
  }

  if (
    !CheckNguHanhTuongKhacKhauQuyet(NGU_HANH[chiGio], combineThienCanGioNgay) &&
    !CheckNguHanhTuongKhacKhauQuyet(
      NGU_HANH[ngayChi],
      combineThienCanGioNgay
    ) &&
    CheckNguHanhTuongKhac(NGU_HANH[toaNha], combineThienCanGioNgay) === false &&
    !CheckSinhXuat(NGU_HANH[toaNha], combineThienCanGioNgay) &&
    combineThienCanGioNgay !== "" &&
    combineThienCanGioThang === "" &&
    combineThienCanGioNam === ""
  ) {
    // titleCheckGioNgayThang.push("HD");
    isErrGioHopHoa = "";
  }

  if (
    !CheckNguHanhTuongKhacKhauQuyet(
      NGU_HANH[chiGio],
      combineThienCanGioThang
    ) &&
    !CheckNguHanhTuongKhacKhauQuyet(
      NGU_HANH[thangChi],
      combineThienCanGioThang
    ) &&
    CheckNguHanhTuongKhac(NGU_HANH[toaNha], combineThienCanGioThang) ===
      false &&
    !CheckSinhXuat(NGU_HANH[toaNha], combineThienCanGioThang) &&
    combineThienCanGioNgay === "" &&
    combineThienCanGioThang !== "" &&
    combineThienCanGioNam === ""
  ) {
    // titleCheckGioNgayThang.push("HM");
    isErrGioHopHoa = "";
  }
  if (
    !CheckNguHanhTuongKhacKhauQuyet(
      NGU_HANH[chiGio],
      combineThienCanGioThang
    ) &&
    !CheckNguHanhTuongKhacKhauQuyet(
      NGU_HANH[thangChi],
      combineThienCanGioThang
    ) &&
    !CheckNguHanhTuongKhacKhauQuyet(NGU_HANH[chiGio], combineThienCanGioNgay) &&
    !CheckNguHanhTuongKhacKhauQuyet(
      NGU_HANH[ngayChi],
      combineThienCanGioNgay
    ) &&
    CheckNguHanhTuongKhac(NGU_HANH[toaNha], combineThienCanGioNgay) === false &&
    !CheckSinhXuat(NGU_HANH[toaNha], combineThienCanGioNgay) &&
    CheckNguHanhTuongKhac(NGU_HANH[toaNha], combineThienCanGioThang) ===
      false &&
    !CheckSinhXuat(NGU_HANH[toaNha], combineThienCanGioThang) &&
    combineThienCanGioNgay !== "" &&
    combineThienCanGioThang !== "" &&
    combineThienCanGioNam === ""
  ) {
    // titleCheckGioNgayThang.push("HDM");
    isErrGioHopHoa = "";
  }
  return isErrGioHopHoa;
};
export const GetErrorTimeNormalSangCat = (hours, data, toaNha) => {
  let timeNormal = [];
  // 1.

  if (data.cungNguoiMat === hours) timeNormal.push("Trùng tuổi");
  if (CheckTrucXungNgayThangNam(data.cungNguoiMat, hours)) {
    timeNormal.push("Xung tuổi");
  }
  if (CheckHinhChi(data.cungNguoiMat, hours)) {
    timeNormal.push("Hình tuổi");
  }
  if (CheckHaiChi(data.cungNguoiMat, hours)) {
    timeNormal.push("Hại tuổi");
  }

  // 2.
  if (CheckTrucXungNgayThangNam(hours, data.ngayChi)) {
    timeNormal.push("Xung ngày");
  }
  if (CheckTrucXungNgayThangNam(hours, data.thangChi)) {
    timeNormal.push("Xung tháng");
  }
  // // 3.
  // // trung tang
  if (
    CheckTrungTang(
      data.monthLunar,
      data.arrGioCan[CHI_NAM_SORTED.indexOf(hours)]
    )
  ) {
    timeNormal.push("Trùng tang");
  }

  // // kiep sat
  // !CheckGioKiepSat(data.chiNamSinh, hours) &&
  // Trung Nhat
  if (CheckNgayTrungNhat(hours)) {
    timeNormal.push("Trùng nhật");
  }
  // Than Trung
  if (
    CheckCase4TrungTang(
      data.monthLunar,
      data.arrGioCan[CHI_NAM_SORTED.indexOf(hours)],
      hours
    ).length !== 0
  ) {
    timeNormal.push("Thần Trùng");
  }
  //Trung Phuc
  if (
    CheckCase5TrungTang(
      data.monthLunar,
      data.arrGioCan[CHI_NAM_SORTED.indexOf(hours)],
      hours
    ).length !== 0
  ) {
    timeNormal.push("Trùng Phục");
  }

  //Tho Tu
  // THO_TU[data.monthLunar - 1] !== hours
  if (THO_TU[data.monthLunar - 1] === hours) {
    timeNormal.push("Thọ tử");
  }
  if (SAT_CHU_AM[data.monthLunar - 1] === hours) {
    timeNormal.push("Sát chủ âm");
  }
  if (SAT_CHU_DUONG[data.monthLunar - 1] === hours) {
    timeNormal.push("Sát chủ dương");
  }
  if (toaNha && CheckTrucXungNgayThangNam(hours, toaNha)) {
    timeNormal.push("Xung toạ");
  }

  return timeNormal;
};
export const GetErrorGioHopHoaKhongKhacToa = (
  chiGio,
  canGio,
  ngayCan,
  ngayChi,
  thangCan,
  thangChi,
  namCan,
  namChi,
  toaNha
) => {
  let isErrGioHopHoa = "";
  let combineThienCanGioNgay = CombineThienCan(canGio, ngayCan);
  let combineThienCanGioThang = CombineThienCan(canGio, thangCan);
  let combineThienCanGioNam = CombineThienCan(canGio, namCan);
  // err HY
  if (
    combineThienCanGioNgay === "" &&
    combineThienCanGioThang === "" &&
    combineThienCanGioNam !== ""
  ) {
    isErrGioHopHoa = "HY";
    if (
      CheckNguHanhTuongKhacKhauQuyet(NGU_HANH[chiGio], combineThienCanGioNam)
    ) {
      isErrGioHopHoa = isErrGioHopHoa.concat(", ", "Chi giờ khắc HH");
    }
    if (
      CheckNguHanhTuongKhacKhauQuyet(NGU_HANH[namChi], combineThienCanGioNam)
    ) {
      isErrGioHopHoa = isErrGioHopHoa.concat(", ", "Chi năm khắc HH");
    }
    if (CheckNguHanhTuongKhac(NGU_HANH[toaNha], combineThienCanGioNam)) {
      isErrGioHopHoa = isErrGioHopHoa.concat(", ", "Khắc hành toạ");
    }
    if (CheckSinhXuat(NGU_HANH[toaNha], combineThienCanGioNam)) {
      isErrGioHopHoa = isErrGioHopHoa.concat(", ", "Sinh xuất toạ");
    }
  }
  // err HD

  if (
    combineThienCanGioNgay !== "" &&
    combineThienCanGioThang === "" &&
    combineThienCanGioNam === ""
  ) {
    isErrGioHopHoa = "HD";
    if (
      CheckNguHanhTuongKhacKhauQuyet(NGU_HANH[chiGio], combineThienCanGioNgay)
    ) {
      isErrGioHopHoa = isErrGioHopHoa.concat(", ", "Chi giờ khắc HH");
    }
    if (
      CheckNguHanhTuongKhacKhauQuyet(NGU_HANH[ngayChi], combineThienCanGioNgay)
    ) {
      isErrGioHopHoa = isErrGioHopHoa.concat(", ", "Chi ngày khắc HH");
    }
    if (CheckNguHanhTuongKhac(NGU_HANH[toaNha], combineThienCanGioNgay)) {
      isErrGioHopHoa = isErrGioHopHoa.concat(", ", "Khắc hành toạ");
    }
    if (CheckSinhXuat(NGU_HANH[toaNha], combineThienCanGioNgay)) {
      isErrGioHopHoa = isErrGioHopHoa.concat(", ", "Sinh xuất toạ");
    }
  }
  // err HM
  if (
    combineThienCanGioNgay === "" &&
    combineThienCanGioThang !== "" &&
    combineThienCanGioNam === ""
  ) {
    isErrGioHopHoa = "HM";
    if (
      CheckNguHanhTuongKhacKhauQuyet(NGU_HANH[chiGio], combineThienCanGioThang)
    ) {
      isErrGioHopHoa = isErrGioHopHoa.concat(", ", "Chi giờ khắc HH");
    }
    if (
      CheckNguHanhTuongKhacKhauQuyet(
        NGU_HANH[thangChi],
        combineThienCanGioThang
      )
    ) {
      isErrGioHopHoa = isErrGioHopHoa.concat(", ", "Chi tháng khắc HH");
    }
    if (CheckNguHanhTuongKhac(NGU_HANH[toaNha], combineThienCanGioThang)) {
      isErrGioHopHoa = isErrGioHopHoa.concat(", ", "Khắc hành toạ");
    }
    if (CheckSinhXuat(NGU_HANH[toaNha], combineThienCanGioThang)) {
      isErrGioHopHoa = isErrGioHopHoa.concat(", ", "Sinh xuất toạ");
    }
    // titleCheckGioNgayThang.push("HM");
  }
  // err HDM && HDY
  if (
    // HD
    combineThienCanGioNgay !== ""
  ) {
    // HM
    if (
      combineThienCanGioThang !== "" &&
      combineThienCanGioNam === "" &&
      CheckNguHanhTuongKhac(NGU_HANH[toaNha], combineThienCanGioThang) ===
        false &&
      !CheckSinhXuat(NGU_HANH[toaNha], combineThienCanGioThang)
    ) {
      isErrGioHopHoa = "HDM";

      // err HD
      if (
        CheckNguHanhTuongKhacKhauQuyet(NGU_HANH[chiGio], combineThienCanGioNgay)
      ) {
        isErrGioHopHoa = isErrGioHopHoa.concat(", ", "Chi giờ (HD) khắc HH");
      }
      if (
        CheckNguHanhTuongKhacKhauQuyet(
          NGU_HANH[ngayChi],
          combineThienCanGioNgay
        )
      ) {
        isErrGioHopHoa = isErrGioHopHoa.concat(", ", "Chi ngày khắc HH");
      }
      if (CheckNguHanhTuongKhac(NGU_HANH[toaNha], combineThienCanGioNgay)) {
        isErrGioHopHoa = isErrGioHopHoa.concat(", ", "Khắc hành toạ (HD) ");
      }
      if (CheckSinhXuat(NGU_HANH[toaNha], combineThienCanGioNgay)) {
        isErrGioHopHoa = isErrGioHopHoa.concat(", ", "Sinh xuất toạ (HD)");
      }
      // err HM
      if (
        CheckNguHanhTuongKhacKhauQuyet(
          NGU_HANH[chiGio],
          combineThienCanGioThang
        )
      ) {
        isErrGioHopHoa = isErrGioHopHoa.concat(", ", "Chi giờ (HM) khắc HH");
      }
      if (
        CheckNguHanhTuongKhacKhauQuyet(
          NGU_HANH[thangChi],
          combineThienCanGioThang
        )
      ) {
        isErrGioHopHoa = isErrGioHopHoa.concat(", ", "Chi tháng khắc HH");
      }

      if (CheckNguHanhTuongKhac(NGU_HANH[toaNha], combineThienCanGioThang)) {
        isErrGioHopHoa = isErrGioHopHoa.concat(", ", "Khắc hành toạ (HM)");
      }
      if (CheckSinhXuat(NGU_HANH[toaNha], combineThienCanGioThang)) {
        isErrGioHopHoa = isErrGioHopHoa.concat(", ", "Sinh xuất toạ (HM)");
      }
    }
    // HY
    if (
      !CheckNguHanhTuongKhacKhauQuyet(
        NGU_HANH[chiGio],
        combineThienCanGioNam
      ) &&
      !CheckNguHanhTuongKhacKhauQuyet(
        NGU_HANH[namChi],
        combineThienCanGioNam
      ) &&
      combineThienCanGioNam !== "" &&
      combineThienCanGioThang === "" &&
      CheckNguHanhTuongKhac(NGU_HANH[toaNha], combineThienCanGioNam) ===
        false &&
      !CheckSinhXuat(NGU_HANH[toaNha], combineThienCanGioNam)
    ) {
      isErrGioHopHoa = "HDY";

      // err HD
      if (
        CheckNguHanhTuongKhacKhauQuyet(NGU_HANH[chiGio], combineThienCanGioNgay)
      ) {
        isErrGioHopHoa = isErrGioHopHoa.concat(", ", "Chi giờ (HD) khắc HH");
      }
      if (
        CheckNguHanhTuongKhacKhauQuyet(
          NGU_HANH[ngayChi],
          combineThienCanGioNgay
        )
      ) {
        isErrGioHopHoa = isErrGioHopHoa.concat(", ", "Chi ngày khắc HH");
      }
      if (CheckNguHanhTuongKhac(NGU_HANH[toaNha], combineThienCanGioNgay)) {
        isErrGioHopHoa = isErrGioHopHoa.concat(", ", "Khắc hành toạ (HD) ");
      }
      if (CheckSinhXuat(NGU_HANH[toaNha], combineThienCanGioNgay)) {
        isErrGioHopHoa = isErrGioHopHoa.concat(", ", "Sinh xuất toạ (HD)");
      }
      // err HY
      if (
        CheckNguHanhTuongKhacKhauQuyet(NGU_HANH[chiGio], combineThienCanGioNam)
      ) {
        isErrGioHopHoa = isErrGioHopHoa.concat(", ", "Chi giờ (HY) khắc HH");
      }
      if (
        CheckNguHanhTuongKhacKhauQuyet(
          NGU_HANH[thangChi],
          combineThienCanGioNam
        )
      ) {
        isErrGioHopHoa = isErrGioHopHoa.concat(", ", "Chi tháng khắc HH");
      }

      if (CheckNguHanhTuongKhac(NGU_HANH[toaNha], combineThienCanGioNam)) {
        isErrGioHopHoa = isErrGioHopHoa.concat(", ", "Khắc hành toạ (HY)");
      }
      if (CheckSinhXuat(NGU_HANH[toaNha], combineThienCanGioNam)) {
        isErrGioHopHoa = isErrGioHopHoa.concat(", ", "Sinh xuất toạ (HY)");
      }
    }
  }

  // err HMY && HDMY
  if (
    // HM
    combineThienCanGioThang !== "" &&
    // HY
    combineThienCanGioNam !== ""
  ) {
    // HD => HDMY
    if (combineThienCanGioNgay !== "") {
      isErrGioHopHoa = "HDMY";
      // HD
      if (
        CheckNguHanhTuongKhacKhauQuyet(NGU_HANH[chiGio], combineThienCanGioNgay)
      ) {
        isErrGioHopHoa = isErrGioHopHoa.concat(", ", "Chi giờ khắc HH");
      }
      if (
        CheckNguHanhTuongKhacKhauQuyet(
          NGU_HANH[ngayChi],
          combineThienCanGioNgay
        )
      ) {
        isErrGioHopHoa = isErrGioHopHoa.concat(", ", "Chi ngày khắc HH");
      }
      if (CheckNguHanhTuongKhac(NGU_HANH[toaNha], combineThienCanGioNgay)) {
        isErrGioHopHoa = isErrGioHopHoa.concat(", ", "Khắc hành toạ");
      }
      if (CheckSinhXuat(NGU_HANH[toaNha], combineThienCanGioNgay)) {
        isErrGioHopHoa = isErrGioHopHoa.concat(", ", "Sinh xuất toạ");
      }
      // HM
      if (
        CheckNguHanhTuongKhacKhauQuyet(
          NGU_HANH[chiGio],
          combineThienCanGioThang
        )
      ) {
        isErrGioHopHoa = isErrGioHopHoa.concat(", ", "Chi giờ (HM) khắc HH");
      }
      if (
        CheckNguHanhTuongKhacKhauQuyet(
          NGU_HANH[thangChi],
          combineThienCanGioThang
        )
      ) {
        isErrGioHopHoa = isErrGioHopHoa.concat(", ", "Chi tháng khắc HH");
      }
      if (CheckNguHanhTuongKhac(NGU_HANH[toaNha], combineThienCanGioThang)) {
        isErrGioHopHoa = isErrGioHopHoa.concat(", ", "Khắc hành toạ (HM)");
      }
      if (CheckSinhXuat(NGU_HANH[toaNha], combineThienCanGioThang)) {
        isErrGioHopHoa = isErrGioHopHoa.concat(", ", "Sinh xuất toạ (HM) ");
      }

      // HY
      if (
        CheckNguHanhTuongKhacKhauQuyet(NGU_HANH[chiGio], combineThienCanGioNam)
      ) {
        isErrGioHopHoa = isErrGioHopHoa.concat(", ", "Chi giờ (HY) khắc HH");
      }
      if (
        CheckNguHanhTuongKhacKhauQuyet(NGU_HANH[namChi], combineThienCanGioNam)
      ) {
        isErrGioHopHoa = isErrGioHopHoa.concat(", ", "Chi năm khắc HH");
      }
      if (CheckNguHanhTuongKhac(NGU_HANH[toaNha], combineThienCanGioNam)) {
        isErrGioHopHoa = isErrGioHopHoa.concat(", ", "Khắc hành toạ (HY)");
      }
      if (CheckSinhXuat(NGU_HANH[toaNha], combineThienCanGioNam)) {
        isErrGioHopHoa = isErrGioHopHoa.concat(", ", "Sinh xuất toạ (HY)");
      }
    } else {
      //  HMY
      isErrGioHopHoa = "HMY";

      // HM
      if (
        CheckNguHanhTuongKhacKhauQuyet(
          NGU_HANH[chiGio],
          combineThienCanGioThang
        )
      ) {
        isErrGioHopHoa = isErrGioHopHoa.concat(", ", "Chi giờ (HM) khắc HH");
      }
      if (
        CheckNguHanhTuongKhacKhauQuyet(
          NGU_HANH[thangChi],
          combineThienCanGioThang
        )
      ) {
        isErrGioHopHoa = isErrGioHopHoa.concat(", ", "Chi tháng khắc HH");
      }
      if (CheckNguHanhTuongKhac(NGU_HANH[toaNha], combineThienCanGioThang)) {
        isErrGioHopHoa = isErrGioHopHoa.concat(", ", "Khắc hành toạ (HM)");
      }
      if (CheckSinhXuat(NGU_HANH[toaNha], combineThienCanGioThang)) {
        isErrGioHopHoa = isErrGioHopHoa.concat(", ", "Sinh xuất toạ (HM) ");
      }

      // HY
      if (
        CheckNguHanhTuongKhacKhauQuyet(NGU_HANH[chiGio], combineThienCanGioNam)
      ) {
        isErrGioHopHoa = isErrGioHopHoa.concat(", ", "Chi giờ (HY) khắc HH");
      }
      if (
        CheckNguHanhTuongKhacKhauQuyet(NGU_HANH[namChi], combineThienCanGioNam)
      ) {
        isErrGioHopHoa = isErrGioHopHoa.concat(", ", "Chi năm khắc HH");
      }
      if (CheckNguHanhTuongKhac(NGU_HANH[toaNha], combineThienCanGioNam)) {
        isErrGioHopHoa = isErrGioHopHoa.concat(", ", "Khắc hành toạ (HY)");
      }
      if (CheckSinhXuat(NGU_HANH[toaNha], combineThienCanGioNam)) {
        isErrGioHopHoa = isErrGioHopHoa.concat(", ", "Sinh xuất toạ (HY)");
      }
    }
  }
  return isErrGioHopHoa;
};
