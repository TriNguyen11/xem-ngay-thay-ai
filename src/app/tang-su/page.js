"use client";

import SendIcon from "@mui/icons-material/Send";
import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker, TimeField } from "@mui/x-date-pickers";
import Notify from "@Root/components/Notify";
import TableShow from "@Root/components/Table";
import TableResult from "@Root/components/TableResult";
import TableTangSu from "@Root/components/TableTangSu";
import { getSunLongitude, jdn, monthDays } from "@Root/script/AmLich";
import {
  CAN_NAM,
  CHI_NAM,
  COLOR_TEXT_NGU_HANH,
  HOANG_OC,
  MONTHS,
  NGUYET_KY,
  NGUYET_PHA,
  NGU_HANH,
  NGU_HANH_TUONG_SINH,
  NHAP_MO,
  ObjectTruc,
  ObjectTu,
  SAT_CHU_AM,
  SAT_CHU_DUONG,
  SERVICE_TANGSU,
  SERVICE_XAYDUNG,
  TAM_NUONG,
  THO_TU,
  TRUNG_TANG,
  VANG_VONG,
} from "@Root/script/Constant";
import {
  CalcuBamCungNam,
  CalcuBamCungNu,
  CheckCase2TrungTang,
  CheckCase3TrungTang,
  CheckCase4TrungTang,
  CheckCase5TrungTang,
  CheckNgayGioHaKhoi,
  CheckNgayGioThienTac,
  CheckNgayTrungNhat,
  CheckTrucXungGio,
  CheckTrucXungGioTangSu,
  CheckTrucXungHinhHaiChi,
  CheckTrucXungNgayThangNam,
  CheckTrungTang,
  ConvertToRangeDayInMonthLunar,
  CountStatusTrungTang,
  getCanChi,
} from "@Root/script/handleDateChange";
import dayjs from "dayjs";
import moment from "moment";
import React, { useState } from "react";

export default function Home() {
  const refNotify = React.useRef();
  const [loading, setLoading] = useState(false);
  const [infoNotify, setInfoNotify] = useState({
    open: false,
    description: "",
    type: "danger",
  });
  const [dateStart, setDateStart] = useState();
  const [dateEnd, setDateEnd] = useState();
  const [valueText, setValueText] = useState("");
  const [textTrucXungTuoiMuonAndGiaChu, setTextTrucXungTuoiMuonAndGiaChu] =
    useState("");
  const [infoGiaChu, setInfoGiaChu] = useState({
    name: "",
    tuoi: "",
    hanhNgayChon: [],
    tuoiGiaChu: undefined,
  });
  const [valueAge, setValueAge] = useState({
    time: dayjs(new Date()),
    year: "",
    month: undefined,
    day: "",
    tuoi: "",
    dead_day: "",
    dead_month: "",
    dead_year: "",
    dead_time: dayjs(new Date()),
  });
  const [bonusConditionBuilding, setBonusConditionBuilding] = useState({
    TamTai: [],
    KimLau: [],
    HoangOc: [],
    descriptionHoangOc: [],
  });
  const [valueSelect, setValueSelect] = useState("");
  const [isMuonTuoi, setIsMuonTuoi] = useState(false);

  const [stepInit, setDataStepInit] = useState();

  const [step1, setDataStep1] = useState();
  const [step2, setDataStep2] = useState();
  const [step3, setDataStep3] = useState();
  const [step4, setDataStep4] = useState();
  const [step5, setDataStep5] = useState();
  const [step6, setDataStep6] = useState();
  const [step7, setDataStep7] = useState();
  const [step8, setDataStep8] = useState();
  const [rangeDayInMonthLunar, setRangeDayInMonthLunar] = useState();

  const [infoNguoiMat, setInfoNguoiMat] = useState();

  const [case1, setCase1] = useState();
  const [case2, setCase2] = useState();
  const [case3, setCase3] = useState();
  const [case4, setCase4] = useState();
  const [case5, setCase5] = useState();

  const handleTrungTangNam = async () => {
    let tuoiNguoiMat = Number(valueAge.dead_year) - Number(valueAge.year) + 1;
    let namMat = Number(valueAge.dead_year);
    let namSinh = Number(valueAge.year);
    if (Number(valueAge.month) <= 2) {
      const sunlong = getSunLongitude(
        jdn(
          Number(valueAge.day),
          Number(valueAge.month),
          Number(valueAge.year),
          valueAge.time?.$H,
          valueAge.time?.$m,
          valueAge.time.$s
        ),
        7
      );
      if (sunlong <= 20 && sunlong >= 17) {
        tuoiNguoiMat++;
        namSinh--;
      }
    }
    if (Number(valueAge.dead_month) <= 2) {
      const sunlong = getSunLongitude(
        jdn(
          Number(valueAge.dead_day),
          Number(valueAge.dead_month),
          Number(valueAge.dead_year),
          valueAge.dead_time?.$H,
          valueAge.dead_time?.$m,
          valueAge.dead_time.$s
        ),
        7
      );
      if (sunlong <= 20 && sunlong >= 17) {
        namMat--;
        tuoiNguoiMat--;
      }
    }
    let bamCung = CalcuBamCungNam(
      tuoiNguoiMat,
      Number(valueAge.dead_month),
      Number(valueAge.dead_day),
      valueAge.dead_time?.$H
    );
    let momentAmLich = moment(
      `${valueAge.dead_day}/${valueAge.dead_month}/${valueAge.dead_year}`,
      "DD/MM/YYYY"
    );
    const lichAm = await getCanChi(
      momentAmLich.date(),
      momentAmLich.month() + 1,
      momentAmLich.year()
    );

    setInfoNguoiMat({ ...bamCung, tuoiNguoiMat, namMat, namSinh });
    // Case 1
    let countCase1 = CountStatusTrungTang({
      ...bamCung,
      chiNamMat: CHI_NAM[namMat % 12],
    });
    setCase1(countCase1);

    // Case 2
    let case2Text = CheckCase2TrungTang({
      ...bamCung,
      chiNamSinh: CHI_NAM[namSinh % 12],
    });
    setCase2(case2Text);
    //Kiep Sat, Lien tang
    // Case 3
    let case3Text = CheckCase3TrungTang({
      ...bamCung,
      chiNamSinh: CHI_NAM[namSinh % 12],
      chiNamMat: CHI_NAM[namMat % 12],
    });
    setCase3(case3Text);
    // ThanTrung
    // Case 4
    // 29/10/2023
    let case4Text = await CheckCase4TrungTang(
      lichAm.monthLunar,
      lichAm.ngayCan,
      lichAm.ngayChi
    );
    setCase4(case4Text);
    // Trung pHuc
    // Case 5
    let case5Text = await CheckCase5TrungTang(
      lichAm.monthLunar,
      lichAm.ngayCan,
      lichAm.ngayChi
    );
    setCase5(case5Text);
  };
  const handleTrungTangNu = async () => {
    let tuoiNguoiMat = Number(valueAge.dead_year) - Number(valueAge.year) + 1;
    let namMat = Number(valueAge.dead_year);
    let namSinh = Number(valueAge.year);
    if (Number(valueAge.month) <= 2) {
      const sunlong = getSunLongitude(
        jdn(
          Number(valueAge.day),
          Number(valueAge.month),
          Number(valueAge.year),
          valueAge.time?.$H,
          valueAge.time?.$m,
          valueAge.time.$s
        ),
        7
      );
      if (sunlong <= 20 && sunlong >= 17) {
        tuoiNguoiMat++;
        namSinh--;
      }
    }
    if (Number(valueAge.dead_month) <= 2) {
      const sunlong = getSunLongitude(
        jdn(
          Number(valueAge.dead_day),
          Number(valueAge.dead_month),
          Number(valueAge.dead_year),
          valueAge.dead_time?.$H,
          valueAge.dead_time?.$m,
          valueAge.dead_time.$s
        ),
        7
      );
      if (sunlong <= 20 && sunlong >= 17) {
        namMat--;
        tuoiNguoiMat--;
      }
    }

    let bamCung = CalcuBamCungNu(
      tuoiNguoiMat,
      Number(valueAge.dead_month),
      Number(valueAge.dead_day),
      valueAge.dead_time?.$H
    );
    let momentAmLich = moment(
      `${valueAge.dead_day}/${valueAge.dead_month}/${valueAge.dead_year}`,
      "DD/MM/YYYY"
    );
    const lichAm = await getCanChi(
      momentAmLich.date(),
      momentAmLich.month() + 1,
      momentAmLich.year()
    );

    setInfoNguoiMat({ ...bamCung, tuoiNguoiMat, namMat, namSinh });

    console.log(namMat, "namMat");

    let countCase1 = CountStatusTrungTang({
      ...bamCung,
      chiNamMat: CHI_NAM[namMat % 12],
    });
    setCase1(countCase1);

    // Case 2
    let case2Text = CheckCase2TrungTang({
      ...bamCung,
      chiNamSinh: CHI_NAM[namSinh % 12],
    });
    setCase2(case2Text);

    // Case 3
    let case3Text = CheckCase3TrungTang({
      ...bamCung,
      chiNamSinh: CHI_NAM[namSinh % 12],
      chiNamMat: CHI_NAM[namMat % 12],
    });
    setCase3(case3Text);
    // Case 4
    let case4Text = await CheckCase4TrungTang(
      lichAm.monthLunar,
      lichAm.ngayCan,
      lichAm.ngayChi
    );
    setCase4(case4Text);

    // Case 5
    let case5Text = await CheckCase5TrungTang(
      lichAm.monthLunar,
      lichAm.ngayCan,
      lichAm.ngayChi
    );
    setCase5(case5Text);
  };
  const handleTangSuNu = async () => {
    let tuoiNguoiMat = Number(valueAge.dead_year) - Number(valueAge.year) + 1;
    let namMat = Number(valueAge.dead_year);
    let namSinh = Number(valueAge.year);
    if (Number(valueAge.month) <= 2) {
      const sunlong = getSunLongitude(
        jdn(
          Number(valueAge.day),
          Number(valueAge.month),
          Number(valueAge.year),
          valueAge.time?.$H,
          valueAge.time?.$m,
          valueAge.time.$s
        ),
        7
      );
      if (sunlong <= 20 && sunlong >= 17) {
        tuoiNguoiMat++;
        namSinh--;
      }
    }
    if (Number(valueAge.dead_month) <= 2) {
      const sunlong = getSunLongitude(
        jdn(
          Number(valueAge.dead_day),
          Number(valueAge.dead_month),
          Number(valueAge.dead_year),
          valueAge.dead_time?.$H,
          valueAge.dead_time?.$m,
          valueAge.dead_time.$s
        ),
        7
      );
      if (sunlong <= 20 && sunlong >= 17) {
        namMat--;
        tuoiNguoiMat--;
      }
    }

    let bamCung = CalcuBamCungNu(
      tuoiNguoiMat,
      Number(valueAge.dead_month),
      Number(valueAge.dead_day),
      valueAge.dead_time?.$H
    );
    setInfoNguoiMat({ ...bamCung, tuoiNguoiMat, namMat, namSinh });

    let dateArr = await enumerateDaysBetweenDates(
      `${moment(dateStart.$d).year()}-${
        moment(dateStart.$d).month() + 1
      }-${moment(dateStart.$d).date()}`,

      `${moment(dateEnd.$d).year()}-${moment(dateEnd.$d).month() + 1}-${moment(
        dateEnd.$d
      ).date()}`
    );
    setDataStepInit(dateArr);

    console.log(bamCung, "bamCungbamCung");
    let arrPerfectDate = [];
    let arrPerfectDateStep1 = [];
    let arrPerfectDateStep2 = [];
    let arrPerfectDateStep3 = [];
    let arrPerfectDateStep4 = [];
    let arrPerfectDateStep5 = [];
    let arrPerfectDateStep6 = []; // hop hoa ngay/thang
    let arrPerfectDateStep7 = []; // hop hoa ngay/gio
    // Convert  RangeDayInMonthLunar
    setRangeDayInMonthLunar(ConvertToRangeDayInMonthLunar(dateArr));
    // Chon ngay
    // Xac dinh ngay/thang xung toa nha
    dateArr.map((item, index) => {
      if (!CheckTrucXungHinhHaiChi(bamCung.bamCungTuoi, item.ngayChi)) {
        arrPerfectDateStep1.push(item);
      }
    });
    setDataStep1(arrPerfectDateStep1);

    // Tranh Bach ky
    arrPerfectDateStep1.map((item, index) => {
      if (
        item.dayLunar !== 1 &&
        item.dayLunar !== 15 &&
        monthDays(item.yearLunar, item.monthLunar) !== item.dayLunar &&
        !NGUYET_KY.includes(item.dayLunar) &&
        // !TAM_NUONG.includes(item.dayLunar) &&
        THO_TU[item.monthLunar - 1] !== item.ngayChi &&
        SAT_CHU_AM[item.monthLunar - 1] !== item.ngayChi &&
        SAT_CHU_DUONG[item.monthLunar - 1] !== item.ngayChi &&
        // VANG_VONG[item.monthLunar - 1] !== item.ngayChi &&
        NGUYET_PHA[item.monthLunar - 1] !== item.ngayChi &&
        //Trung Phuc
        CheckCase5TrungTang(item.monthLunar, item.ngayCan, item.ngayChi)
          .length === 0 &&
        // than Trung
        CheckCase4TrungTang(item.monthLunar, item.ngayCan, item.ngayChi)
          .length === 0 &&
        // Trung Nhat
        !CheckNgayTrungNhat(item.ngayChi) &&
        // Ha Khoi
        !CheckNgayGioHaKhoi(item.monthLunar, item.ngayChi) &&
        // Thien Tac
        !CheckNgayGioThienTac(item.monthLunar, item.ngayChi)
      ) {
        arrPerfectDateStep2.push(item);
      }
    });
    setDataStep2(arrPerfectDateStep2);

    // kiem tra truc/tu
    arrPerfectDateStep2.map((item, ind) => {
      if (
        //   !! || 1 trong 2 pham deu` bi
        //
        Object.keys(ObjectTruc[item.truc].KhongLam).includes(valueSelect)
        // &&
        // Object.keys(ObjectTu[item.tu].KhongLam).includes(valueSelect)
        // Object.keys(ObjectTruc[item.truc].CanLam).includes(valueSelect)
      ) {
      } else {
        if (
          Object.keys(ObjectTu[item.tu].KhongLam).includes(valueSelect) &&
          !Object.keys(ObjectTruc[item.truc].CanLam).includes(valueSelect)
        ) {
        } else {
          arrPerfectDateStep3.push(item);
        }
      }
    });
    setDataStep3(arrPerfectDateStep3);

    // Chon gio
    arrPerfectDateStep3.map((item, ind) => {
      arrPerfectDateStep4.push({
        ...item,
        gio: CheckTrucXungGioTangSu({
          ...item,
          cungNguoiMat: bamCung.bamCungTuoi,
          chiNamSinh: CHI_NAM[namSinh % 12],
        }),
      });
    });
    setDataStep4(arrPerfectDateStep4);

    console.log(arrPerfectDateStep4, "namMat");
  };
  const handleTangSuNam = async () => {
    let tuoiNguoiMat = Number(valueAge.dead_year) - Number(valueAge.year) + 1;
    let namMat = Number(valueAge.dead_year);
    let namSinh = Number(valueAge.year);
    if (Number(valueAge.month) <= 2) {
      const sunlong = getSunLongitude(
        jdn(
          Number(valueAge.day),
          Number(valueAge.month),
          Number(valueAge.year),
          valueAge.time?.$H,
          valueAge.time?.$m,
          valueAge.time.$s
        ),
        7
      );
      if (sunlong <= 20 && sunlong >= 17) {
        tuoiNguoiMat++;
        namSinh--;
      }
    }
    if (Number(valueAge.dead_month) <= 2) {
      const sunlong = getSunLongitude(
        jdn(
          Number(valueAge.dead_day),
          Number(valueAge.dead_month),
          Number(valueAge.dead_year),
          valueAge.dead_time?.$H,
          valueAge.dead_time?.$m,
          valueAge.dead_time.$s
        ),
        7
      );
      if (sunlong <= 20 && sunlong >= 17) {
        namMat--;
        tuoiNguoiMat--;
      }
    }

    let bamCung = CalcuBamCungNam(
      tuoiNguoiMat,
      Number(valueAge.dead_month),
      Number(valueAge.dead_day),
      valueAge.dead_time?.$H
    );
    setInfoNguoiMat({ ...bamCung, tuoiNguoiMat, namMat, namSinh });

    let dateArr = await enumerateDaysBetweenDates(
      `${moment(dateStart.$d).year()}-${
        moment(dateStart.$d).month() + 1
      }-${moment(dateStart.$d).date()}`,

      `${moment(dateEnd.$d).year()}-${moment(dateEnd.$d).month() + 1}-${moment(
        dateEnd.$d
      ).date()}`
    );
    setDataStepInit(dateArr);

    console.log(bamCung, "bamCungbamCung");
    let arrPerfectDate = [];
    let arrPerfectDateStep1 = [];
    let arrPerfectDateStep2 = [];
    let arrPerfectDateStep3 = [];
    let arrPerfectDateStep4 = [];
    let arrPerfectDateStep5 = [];
    let arrPerfectDateStep6 = []; // hop hoa ngay/thang
    let arrPerfectDateStep7 = []; // hop hoa ngay/gio

    // Convert  RangeDayInMonthLunar
    setRangeDayInMonthLunar(ConvertToRangeDayInMonthLunar(dateArr));
    // Chon ngay
    // Xac dinh ngay/thang xung toa nha
    dateArr.map((item, index) => {
      if (!CheckTrucXungHinhHaiChi(bamCung.bamCungTuoi, item.ngayChi)) {
        arrPerfectDateStep1.push(item);
      }
    });
    setDataStep1(arrPerfectDateStep1);

    // Tranh Bach ky
    arrPerfectDateStep1.map((item, index) => {
      if (
        item.dayLunar !== 1 &&
        item.dayLunar !== 15 &&
        monthDays(item.yearLunar, item.monthLunar) !== item.dayLunar &&
        !NGUYET_KY.includes(item.dayLunar) &&
        // !TAM_NUONG.includes(item.dayLunar) &&
        THO_TU[item.monthLunar - 1] !== item.ngayChi &&
        SAT_CHU_AM[item.monthLunar - 1] !== item.ngayChi &&
        SAT_CHU_DUONG[item.monthLunar - 1] !== item.ngayChi &&
        // VANG_VONG[item.monthLunar - 1] !== item.ngayChi &&
        NGUYET_PHA[item.monthLunar - 1] !== item.ngayChi &&
        //Trung Phuc
        CheckCase5TrungTang(item.monthLunar, item.ngayCan, item.ngayChi)
          .length === 0 &&
        // than Trung
        CheckCase4TrungTang(item.monthLunar, item.ngayCan, item.ngayChi)
          .length === 0 &&
        // Trung Nhat
        !CheckNgayTrungNhat(item.ngayChi) &&
        // Ha Khoi
        !CheckNgayGioHaKhoi(item.monthLunar, item.ngayChi) &&
        // Thien Tac
        !CheckNgayGioThienTac(item.monthLunar, item.ngayChi)
      ) {
        arrPerfectDateStep2.push(item);
      }
    });
    setDataStep2(arrPerfectDateStep2);

    // kiem tra truc/tu
    arrPerfectDateStep2.map((item, ind) => {
      if (
        //   !! || 1 trong 2 pham deu` bi
        //
        Object.keys(ObjectTruc[item.truc].KhongLam).includes(valueSelect)
        // &&
        // Object.keys(ObjectTu[item.tu].KhongLam).includes(valueSelect)
        // Object.keys(ObjectTruc[item.truc].CanLam).includes(valueSelect)
      ) {
      } else {
        if (
          Object.keys(ObjectTu[item.tu].KhongLam).includes(valueSelect) &&
          !Object.keys(ObjectTruc[item.truc].CanLam).includes(valueSelect)
        ) {
        } else {
          arrPerfectDateStep3.push(item);
        }
      }
    });
    setDataStep3(arrPerfectDateStep3);

    // Chon gio
    arrPerfectDateStep3.map((item, ind) => {
      arrPerfectDateStep4.push({
        ...item,
        gio: CheckTrucXungGioTangSu({
          ...item,
          cungNguoiMat: bamCung.bamCungTuoi,
          chiNamSinh: CHI_NAM[namSinh % 12],
        }),
      });
    });
    setDataStep4(arrPerfectDateStep4);

    console.log(arrPerfectDateStep4, "namMat");
  };
  return (
    <div className="flex min-h-screen flex-col items-center  pt-24 bg-white">
      <div
        style={{
          color: "black",
          fontFamily: "cursive",
          fontSize: 20,
          marginBottom: 20,
        }}>
        Xem ngày Tang sự
      </div>
      <div>
        <FormControl fullWidth style={{ marginBottom: 20 }}>
          <InputLabel id="demo-simple-select-label">
            Chọn việc cần xem
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label=" Chọn việc cần xem"
            onChange={(e) => {
              setValueSelect(e.target.value);
              setDataStep2();
              setDataStepInit();
              setDataStep4();
              setCase1();
              setCase2();
              setCase3();
              setCase4();
              setCase5();
            }}>
            {Object.keys(SERVICE_TANGSU).map((key, inex) => {
              return (
                <MenuItem key={Math.random()} value={key}>
                  {SERVICE_TANGSU[key]}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <div className="text-black font-sans font-bold">
          <div>NHÂN {">"} THÔNG TIN NGƯỜI MẤT</div>
          <div className="mt-4">
            <TextField
              value={infoGiaChu.name}
              id="standard-basic"
              label="Họ tên người mất"
              placeholder="Nhập họ tên"
              variant="standard"
              style={{
                marginBottom: 10,
                marginLeft: 20,
              }}
              onChange={(e) => {
                setInfoGiaChu({ ...infoGiaChu, name: e.target.value });
              }}
            />
            <FormControl fullWidth style={{ marginLeft: 20, width: 200 }}>
              <InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Giới tính"
                onChange={(e) => {
                  setValueAge({ ...valueAge, gender: e.target.value });
                }}>
                {["Nữ", "Nam"].map((key, inex) => {
                  return (
                    <MenuItem key={Math.random()} value={inex}>
                      {key}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="flex flex-row justify-center mt-3 flex-wrap">
            <TextField
              type={"number"}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              id="standard-basic"
              label="Ngày"
              placeholder="Ngày"
              variant="standard"
              style={{ marginBottom: 20, marginLeft: 20 }}
              onChange={(e) => {
                setValueAge({ ...valueAge, day: e.target.value });
              }}
            />
            <FormControl fullWidth style={{ marginLeft: 20, width: 200 }}>
              <InputLabel id="demo-simple-select-label">Tháng</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Tháng"
                onChange={(e) => {
                  setValueAge({ ...valueAge, month: e.target.value });
                }}>
                {MONTHS.map((key, inex) => {
                  return (
                    <MenuItem key={Math.random()} value={inex + 1}>
                      {key}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <TextField
              type={"number"}
              id="standard-basic"
              label="Năm"
              placeholder="Năm"
              variant="standard"
              style={{ marginBottom: 20, marginLeft: 20 }}
              onChange={(e) => {
                setValueAge({ ...valueAge, year: e.target.value });
              }}
            />
            <TimeField
              label="Giờ/phút/giây"
              format="HH:mm:ss"
              value={valueAge.time}
              style={{ marginLeft: 20 }}
              onChange={(e) => {
                setValueAge({ ...valueAge, time: e });
              }}
            />
          </div>
          <div>THỜI GIAN MẤT</div>

          <div className="flex flex-row justify-center mt-3 flex-wrap">
            <TextField
              type={"number"}
              id="standard-basic"
              label="Ngày"
              placeholder="Ngày"
              variant="standard"
              style={{ marginBottom: 20, marginLeft: 20 }}
              onChange={(e) => {
                setValueAge({ ...valueAge, dead_day: e.target.value });
              }}
            />
            <FormControl fullWidth style={{ marginLeft: 20, width: 200 }}>
              <InputLabel id="demo-simple-select-label">Tháng</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Tháng"
                onChange={(e) => {
                  setValueAge({ ...valueAge, dead_month: e.target.value });
                }}>
                {MONTHS.map((key, inex) => {
                  return (
                    <MenuItem key={Math.random()} value={inex + 1}>
                      {key}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <TextField
              type={"number"}
              id="standard-basic"
              label="Năm"
              placeholder="Năm"
              variant="standard"
              style={{ marginBottom: 20, marginLeft: 20 }}
              onChange={(e) => {
                setValueAge({ ...valueAge, dead_year: e.target.value });
              }}
            />
            <TimeField
              label="Giờ/phút/giây"
              format="HH:mm:ss"
              value={valueAge.dead_time}
              style={{ marginLeft: 20 }}
              onChange={(e) => {
                setValueAge({ ...valueAge, dead_time: e });
              }}
            />
          </div>
          {/* Chon ngay xem tang su */}
          {valueSelect !== "tinh-trung-tang" && (
            <div className="flex flex-col w-full mt-5">
              <div
                style={{
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  color: "black",
                }}>
                Xem Ngày
              </div>
              <div className="flex flex-row justify-around w-[100%]">
                <DatePicker
                  label="Từ ngày"
                  maxDate={null}
                  minDate={null}
                  format={"DD-MM-YYYY"}
                  onChange={(value) => {
                    setDateStart(value);
                  }}
                />
                <DatePicker
                  minDate={dateStart}
                  label="Đến ngày"
                  format={"DD-MM-YYYY"}
                  onChange={(value) => {
                    setDateEnd(value);
                  }}
                />
              </div>
            </div>
          )}
        </div>
        {/* Tuoi Muon */}
      </div>

      <div className="flex flex-row justify-center mt-3">
        <Button
          onClick={() => {
            // if (valueSelect.length === 0) {
            //   console.log(refNotify, "refNotify");
            //   setInfoNotify({
            //     type: "danger",
            //     description: "Vui lòng chọn việc cần xem để tiếp tục!",
            //   });
            //   return refNotify.current.handleClick();
            // }
            if (valueSelect === "tinh-trung-tang") {
              if (valueAge.gender === 1) return handleTrungTangNam();
              return handleTrungTangNu();
            } else {
              if (valueAge.gender === 1) return handleTangSuNam();
              return handleTangSuNu();
            }
          }}
          variant="contained"
          // disabled={
          //   dateEnd === undefined &&
          //   dateStart === undefined &&
          //   Object.keys(NGU_HANH).includes(valueText)
          // }
          style={{
            backgroundColor: "#F3BE29",
          }}
          endIcon={
            loading ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              <SendIcon />
            )
          }>
          Xem kết quả
        </Button>
      </div>
      {typeof window !== "undefined" && (
        <>
          {/* Thien */}
          <div
            className="text-black"
            style={{
              width: window.innerWidth * 0.9,
            }}>
            {rangeDayInMonthLunar &&
              Object.keys(rangeDayInMonthLunar).map((year) => {
                return (
                  <ul style={{ marginBottom: 20, fontWeight: "bold" }}>
                    Năm {year}:{" "}
                    {Object.keys(rangeDayInMonthLunar[year]).map((month) => {
                      return (
                        <li style={{ fontWeight: 400 }}>
                          - Tháng {month} (
                          {rangeDayInMonthLunar[year][month][0].thangCan}{" "}
                          {rangeDayInMonthLunar[year][month][0].thangChi}): từ{" "}
                          {rangeDayInMonthLunar[year][month][0].daySolar}/
                          {rangeDayInMonthLunar[year][month][0].monthSolar}/
                          {rangeDayInMonthLunar[year][month][0].yearSolar} đến
                          ngày {rangeDayInMonthLunar[year][month][1].daySolar}/
                          {rangeDayInMonthLunar[year][month][1].monthSolar}/
                          {rangeDayInMonthLunar[year][month][1].yearSolar}
                        </li>
                      );
                    })}
                  </ul>
                );
              })}
          </div>
          {/*info show  Nhan*/}
          <div style={{ marginTop: 30, width: window.innerWidth * 0.9 }}>
            {infoNguoiMat && (
              <>
                <div className="text-black mb-2 font-bold text-lg">
                  Gia chủ tên: {infoGiaChu.name}
                  <div>
                    Tuổi: {infoNguoiMat.tuoiNguoiMat} -{" "}
                    {CAN_NAM[infoNguoiMat.namSinh % 10]}{" "}
                    {CHI_NAM[infoNguoiMat.namSinh % 12]}
                  </div>{" "}
                  <div
                    style={{
                      color: TRUNG_TANG.includes(infoNguoiMat.bamCungTuoi)
                        ? "red"
                        : NHAP_MO.includes(infoNguoiMat.bamCungTuoi)
                        ? "green"
                        : "black",
                    }}>
                    Tuổi mất: {infoNguoiMat.bamCungTuoi} - (
                    {TRUNG_TANG.includes(infoNguoiMat.bamCungTuoi)
                      ? "Trùng tang"
                      : NHAP_MO.includes(infoNguoiMat.bamCungTuoi)
                      ? "Nhập mộ"
                      : "Thiên di"}
                    )
                  </div>{" "}
                  <div
                    style={{
                      color: TRUNG_TANG.includes(infoNguoiMat.bamCungThang)
                        ? "red"
                        : NHAP_MO.includes(infoNguoiMat.bamCungThang)
                        ? "green"
                        : "black",
                    }}>
                    Tháng mất: {infoNguoiMat.bamCungThang}- (
                    {TRUNG_TANG.includes(infoNguoiMat.bamCungThang)
                      ? "Trùng tang"
                      : NHAP_MO.includes(infoNguoiMat.bamCungThang)
                      ? "Nhập mộ"
                      : "Thiên di"}
                    )
                  </div>{" "}
                  <div
                    style={{
                      color: TRUNG_TANG.includes(infoNguoiMat.bamCungNgay)
                        ? "red"
                        : NHAP_MO.includes(infoNguoiMat.bamCungNgay)
                        ? "green"
                        : "black",
                    }}>
                    Ngày mất: {infoNguoiMat.bamCungNgay} - (
                    {TRUNG_TANG.includes(infoNguoiMat.bamCungNgay)
                      ? "Trùng tang"
                      : NHAP_MO.includes(infoNguoiMat.bamCungNgay)
                      ? "Nhập mộ"
                      : "Thiên di"}
                    )
                  </div>{" "}
                  <div
                    style={{
                      color: TRUNG_TANG.includes(infoNguoiMat.bamCungGio)
                        ? "red"
                        : NHAP_MO.includes(infoNguoiMat.bamCungGio)
                        ? "green"
                        : "black",
                    }}>
                    Giờ mất: {infoNguoiMat.bamCungGio}- (
                    {TRUNG_TANG.includes(infoNguoiMat.bamCungGio)
                      ? "Trùng tang"
                      : NHAP_MO.includes(infoNguoiMat.bamCungGio)
                      ? "Nhập mộ"
                      : "Thiên di"}
                    )
                  </div>{" "}
                  <div
                    style={{
                      color: TRUNG_TANG.includes(
                        CHI_NAM[Number(infoNguoiMat.namMat) % 12]
                      )
                        ? "red"
                        : NHAP_MO.includes(
                            CHI_NAM[Number(infoNguoiMat.namMat) % 12]
                          )
                        ? "green"
                        : "black",
                    }}>
                    Năm mất: {CAN_NAM[Number(infoNguoiMat.namMat) % 10]}{" "}
                    {CHI_NAM[Number(infoNguoiMat.namMat) % 12]}- (
                    {TRUNG_TANG.includes(
                      CHI_NAM[Number(infoNguoiMat.namMat) % 12]
                    )
                      ? "Trùng tang"
                      : NHAP_MO.includes(
                          CHI_NAM[Number(infoNguoiMat.namMat) % 12]
                        )
                      ? "Nhập mộ"
                      : "Thiên di"}
                    )
                  </div>{" "}
                </div>
              </>
            )}
          </div>
          {/* Show ket qua */}
          {step4 && (
            <>
              <div className="text-[24px] font-bold mb-4 text-black">
                {" "}
                Tổng cộng có {step4?.length} kết quả{" "}
              </div>
              <div className="max-h-[500px] overflow-scroll px-10 border-2 border-black ">
                {step4?.map((item, index) => {
                  return (
                    <>
                      <div
                        className="font-bold text-[20px]"
                        style={{
                          color: "black",
                          marginBottom: 10,
                          marginTop: 20,
                        }}>
                        Kết quả {index + 1}
                      </div>
                      <div className="max-h-[500px] overflow-scroll">
                        <TableResult
                          data={item}
                          infoGiaChu={infoGiaChu}
                          valueSelect={valueSelect}></TableResult>
                      </div>
                    </>
                  );
                })}
              </div>
            </>
          )}
          {/* Show Case Trung Tang */}
          <div>
            {case1 && (
              <div className="text-black text-[20px] my-4">
                <div className="font-bold">Trường hợp 1: </div>
                Có {case1.countNhapMoCase1} cung rơi vào Nhập mộ,{" "}
                {case1.countTrungTangCase1} cung rơi vào Trùng tang,{" "}
                {case1.countThienDiCase1} cung vào Thiên di.
              </div>
            )}
            {case2 && (
              <div className="text-black text-[20px] my-4">
                <div className="font-bold">Trường hợp 2: </div>

                {case2.length !== 0 ? case2.toString() : "Không phạm"}
              </div>
            )}
            {case3 && (
              <div className="text-black text-[20px] my-4">
                <div className="font-bold">Trường hợp 3: </div>
                {case3.length !== 0
                  ? case3.toString()
                  : "Không bị trùng tang liên táng"}
              </div>
            )}
            {case4 && (
              <div className="text-black text-[20px] my-4">
                <div className="font-bold">Trường hợp 4: </div>
                {case4.length !== 0
                  ? case4.toString()
                  : "Không phạm vào ngày Thần Trùng"}
              </div>
            )}
            {case5 && (
              <div className="text-black text-[20px] my-4">
                <div className="font-bold">Trường hợp 5: </div>
                {case5.length !== 0
                  ? case5.toString()
                  : "Không phạm vào ngày Trùng phục"}
              </div>
            )}
          </div>

          {stepInit && (
            <div>
              <div
                className="font-bold text-[20px]"
                style={{ color: "black", marginTop: 30 }}>
                Bước 1: Chọn ngày
                {stepInit && `(${stepInit?.length})`}
              </div>
              <div
                className="max-h-[500px] overflow-scroll
          px-10 border-2 border-black mt-2 ">
                <TableTangSu
                  valueSelect={valueSelect}
                  data={stepInit}
                  infoNguoiMat={infoNguoiMat}></TableTangSu>
              </div>
            </div>
          )}
          {step2 && (
            <div>
              <div
                className="font-bold text-[20px]"
                style={{ color: "black", marginTop: 30 }}>
                Xét Trực/Tú
                {step2 && `(${step2?.length})`}
              </div>
              <div
                className="max-h-[500px] overflow-scroll
          px-10 border-2 border-black mt-2 ">
                <TableTangSu
                  valueSelect={valueSelect}
                  data={step2}
                  infoNguoiMat={infoNguoiMat}></TableTangSu>
              </div>
            </div>
          )}
          {step4 && (
            <div>
              <div
                className="font-bold text-[20px]"
                style={{ color: "black", marginTop: 30 }}>
                Bước 2: Chọn giờ
                {step4 && `(${step4?.length})`}
              </div>
              <div
                className="max-h-[500px] overflow-scroll
          px-10 border-2 border-black mt-2 ">
                <TableTangSu
                  valueSelect={valueSelect}
                  data={step4}
                  infoNguoiMat={infoNguoiMat}></TableTangSu>
              </div>
            </div>
          )}
        </>
      )}
      <div style={{ height: 200 }}></div>
      <Notify
        description={infoNotify.description}
        type={infoNotify.type}
        ref={refNotify}
      />
    </div>
  );
}
async function enumerateDaysBetweenDates(startDate, endDate) {
  let date = [];
  while (moment(startDate) <= moment(endDate)) {
    date.push(
      await getCanChi(
        moment(startDate).date(),
        moment(startDate).month() + 1,
        moment(startDate).year()
      )
    );
    startDate = moment(startDate).add(1, "days").format("YYYY-MM-DD");
  }
  return date;
}
