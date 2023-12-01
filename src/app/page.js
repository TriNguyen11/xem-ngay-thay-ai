"use client";

import SendIcon from "@mui/icons-material/Send";
import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { DatePicker, TimeField } from "@mui/x-date-pickers";
import Notify from "@Root/components/Notify";

import TableNamKimLauHoangOcTamTai from "@Root/components/TableNamKimLauHoangOcTamTai";
import TableResult from "@Root/components/TableResult";
import TableResultStepFinal from "@Root/components/TableResultStepFinal";
import TableSangCatThang from "@Root/components/TableSangCatThang";
import TableSangCatTrucTu from "@Root/components/TableSangCatTrucTu";
import TableShowRecommend from "@Root/components/TableShowRecommend";
import TableTrucXungNgayThang from "@Root/components/TableTrucXungNgayThang";
import { getSunLongitude, jdn, monthDays } from "@Root/script/AmLich";
import {
  CAN_NAM,
  CHI_NAM,
  COLOR_TEXT_NGU_HANH,
  HOANG_OC,
  HOANG_VU_TU_QUY,
  KHONG_PHONG,
  MONTHS,
  NGUYET_KY,
  NGUYET_PHA,
  NGU_HANH,
  NGU_HANH_CAN_CHI_60_HOA_GIAP_INT,
  NGU_HANH_60_HOA_GIAP_INT,
  NGU_HANH_TUONG_SINH,
  ObjectTruc,
  ObjectTu,
  SAT_CHU_AM,
  SAT_CHU_DUONG,
  SERVICE_XAYDUNG,
  TAM_NUONG,
  THO_TU,
  TOA_NHA,
  VANG_VONG,
  CHI_NAM_SORTED,
} from "@Root/script/Constant";
import {
  CheckDaiBai,
  CheckDuongCong,
  CheckHoangDao,
  CheckHoangOc,
  CheckHoangOcRecommend,
  CheckKimLau,
  CheckNguHanhTuongKhac,
  CheckNguHanhTuongKhacKhauQuyet,
  CheckNguHanhTuongSinh,
  CheckSinhXuat,
  CheckTamTai,
  CheckThienTaiDiaHoa,
  CheckTrucXungGio,
  CheckTrucXungGioKhongToa,
  CheckTrucXungHinhHaiChi,
  CheckTrucXungNgayThangNam,
  CheckTrucXungTuoiMuon,
  CheckTuongXungTuongHaiTuoi,
  CheckTuongXungTuongHaiTuoiKhongToa,
  CheckTuongXungTuongHaiTuoiMonth,
  CombineThienCan,
  ConvertToRangeDayInMonthLunar,
  getCanChi,
  GetHoangVuTuQuy,
} from "@Root/script/handleDateChange";
import {
  handleHopHoaGio,
  handleHopHoaNgayThang,
} from "@Root/script/handleHopHoaNgayThang";
import axios from "axios";
import dayjs from "dayjs";
import moment from "moment";
import React, { useEffect, useState } from "react";
import TableXayDung from "./xay-dung/component/TableXayDung";

export default function Home() {
  const refNotify = React.useRef();
  const [loading, setLoading] = useState(false);
  const [infoNotify, setInfoNotify] = useState({
    open: false,
    description: "",
    type: "danger",
  });
  const [arrMonthInYear, setArrMonthInYear] = useState();

  const [lunarYearArr, setLunarYearArr] = useState([]);
  const [dateStart, setDateStart] = useState();
  const [arrRecommend, setArrRecommend] = useState();
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
  });
  const [infoGiaChuBorrow, setInfoGiaChuBorrow] = useState({
    name: "",
    tuoi: "",
    hanhNgayChon: [],
    tuoiGiaChu: undefined,
  });
  const [valueAgeBorrow, setValueAgeBorrow] = useState({
    time: dayjs(new Date()),
    year: "",
    month: undefined,
    day: "",
  });
  const [bonusConditionBuilding, setBonusConditionBuilding] = useState({
    TamTai: [],
    KimLau: [],
    HoangOc: [],
    descriptionHoangOc: [],
    hoangOcShow: [],
  });
  const [valueSelect, setValueSelect] = useState("");
  const [isMuonTuoi, setIsMuonTuoi] = useState(false);
  const [rangeDayInMonthLunar, setRangeDayInMonthLunar] = useState();
  const [stepShow, setStepShow] = useState({
    step1: undefined,
    step2: undefined,
    step3: undefined,
    step4: undefined,
    step5: undefined,
    step6: undefined,
    step7: undefined,
    step8: undefined,
    step9: undefined,
  });

  const handleGetPerfectDate = async () => {
    let tuoiChiGiaChu = CHI_NAM[valueAge.year % 12];
    let tuoiCanGiaChu = CAN_NAM[valueAge.year % 10];
    let tuoiGiaChu = Number(valueAge.year);

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
        tuoiChiGiaChu = CHI_NAM[(valueAge.year - 1) % 12];
        tuoiCanGiaChu = CAN_NAM[(valueAge.year - 1) % 10];
        tuoiGiaChu--;
      }
    }

    // setLoading(true);
    let dateArr = await enumerateDaysBetweenDates(
      `${moment(dateStart.$d).year()}-${
        moment(dateStart.$d).month() + 1
      }-${moment(dateStart.$d).date()}`,

      `${moment(dateEnd.$d).year()}-${moment(dateEnd.$d).month() + 1}-${moment(
        dateEnd.$d
      ).date()}`
    );
    let arrPerfectDate = [];
    let arrPerfectDateStep1 = [];
    let arrPerfectDateStep2 = [];
    let arrPerfectDateStep3 = [];
    let arrPerfectDateStep4 = [];
    let arrPerfectDateStep5 = [];
    let arrPerfectDateStep6 = []; // hop hoa ngay/thang
    let arrPerfectDateStep7 = []; // hop hoa ngay/gio
    let arrPerfectDateStep8 = []; //
    let arrPerfectDateStep9 = []; // loc gio

    let dateArrNgayLoaiThang = []; // dateArrNgayLoaiThang
    let monthInYear = {};
    let checkLeapMonth = false;

    // Xac dinh ngay/thang xung toa nha
    dateArr.map((item, index) => {
      if (
        !CheckTrucXungNgayThangNam(valueText, item.thangChi) &&
        !CheckTrucXungHinhHaiChi(
          item.thangChi,
          CHI_NAM[Number(tuoiGiaChu) % 12]
        )
      ) {
        dateArrNgayLoaiThang.push(item);
      }
      if (!Object.keys(monthInYear).includes(item.yearLunar.toString())) {
        monthInYear[item.yearLunar] = {};
      }

      if (
        index < dateArr.length &&
        dateArr[index + 1] !== undefined &&
        item.yearLunar !== dateArr[index + 1].yearLunar
      ) {
        checkLeapMonth = false;
      }

      if (!Object.keys(monthInYear[item.yearLunar]).includes(item.monthLunar)) {
        if (item.isLeap) {
          checkLeapMonth = true;
          monthInYear[item.yearLunar][
            item.monthLunar + (checkLeapMonth ? 1 : 0)
          ] = {
            month: item.monthLunar,
            canMonth: item.thangCan,
            chiMonth: item.thangChi,
            isLeap: item.isLeap,
          };
        } else {
          monthInYear[item.yearLunar][
            item.monthLunar + (checkLeapMonth ? 1 : 0)
          ] = {
            month: item.monthLunar,
            canMonth: item.thangCan,
            chiMonth: item.thangChi,
          };
        }
      }
    });
    // kiem tra truc/tu
    dateArrNgayLoaiThang.map((item, ind) => {
      if (
        //   !! || 1 trong 2 pham deu` bi
        //
        Object.keys(ObjectTruc[item.truc].KhongLam).includes(valueSelect) &&
        Object.keys(ObjectTu[item.tu].KhongLam).includes(valueSelect)
      ) {
      } else {
        arrPerfectDateStep2.push(item);
      }
    });

    // Tranh Bach ky
    arrPerfectDateStep2.map((item, index) => {
      if (
        item.dayLunar !== 1 &&
        item.dayLunar !== 15 &&
        monthDays(item.yearLunar, item.monthLunar) !== item.dayLunar &&
        !NGUYET_KY.includes(item.dayLunar) &&
        !TAM_NUONG.includes(item.dayLunar) &&
        THO_TU[item.monthLunar - 1] !== item.ngayChi &&
        SAT_CHU_AM[item.monthLunar - 1] !== item.ngayChi &&
        SAT_CHU_DUONG[item.monthLunar - 1] !== item.ngayChi &&
        VANG_VONG[item.monthLunar - 1] !== item.ngayChi &&
        NGUYET_PHA[item.monthLunar - 1] !== item.ngayChi &&
        !CheckTrucXungNgayThangNam(
          CHI_NAM[Number(item.yearLunar) % 12],
          item.ngayChi
        ) &&
        !CheckTrucXungNgayThangNam(
          CHI_NAM[Number(tuoiGiaChu) % 12],
          item.ngayChi
        ) &&
        // tranh trung xung hai tuoi gia chu
        !CheckTrucXungNgayThangNam(valueText, item.ngayChi) &&
        !CheckTuongXungTuongHaiTuoi(CHI_NAM[tuoiGiaChu % 12], item.ngayChi)
        // &&
        // Sinh Xuat
        // !CheckSinhXuat(NGU_HANH[valueText], NGU_HANH[item.ngayCan])
      ) {
        arrPerfectDateStep3.push(item);
      }
    });

    // Xet them hop hoa
    arrPerfectDateStep6 = await handleHopHoaNgayThang(
      arrPerfectDateStep3,
      valueText
    );

    let arrHours = [];
    let isCheckGioNgayThangWhileCanNgayKhacToaNha = false;
    let arrHoursOke = [];
    let titleCheckGioNgayThang = [];

    // Chon gio
    arrPerfectDateStep6.map((item, ind) => {
      isCheckGioNgayThangWhileCanNgayKhacToaNha = false;
      arrHoursOke = [];
      titleCheckGioNgayThang = [];
      let combineThienCanNgayThang = CombineThienCan(
        item.ngayCan,
        item.thangCan
      );

      arrHours = CheckTrucXungGio(
        valueText,
        item.ngayChi,
        item.thangChi,
        CHI_NAM[tuoiGiaChu % 12],
        item.monthLunar,
        item.arrGioCan
      );

      arrPerfectDateStep6[ind] = {
        ...item,
        gio: CheckHoangDao(item.ngayChi),
      };

      if (CheckNguHanhTuongKhac(NGU_HANH[valueText], NGU_HANH[item.ngayCan])) {
        // if (combineThienCanNgayThang.length !== 0) {
        handleHopHoaGio(
          item,
          arrHours,
          isCheckGioNgayThangWhileCanNgayKhacToaNha,
          arrHoursOke,
          titleCheckGioNgayThang,
          valueText,
          arrPerfectDateStep5,
          arrPerfectDateStep9
        );
      } else {
        // ty hoa
        if (NGU_HANH[valueText] === NGU_HANH[item.ngayCan]) {
          arrPerfectDateStep5.push({
            ...item,
            gio: arrHours,
            isTruongHop2BonusHoaHop: undefined,
          });
          if (arrHours.length !== 0) {
            arrPerfectDateStep9.push({
              ...item,
              gio: arrHours,
              isTruongHop2BonusHoaHop: undefined,
            });
          }
        }
        // tuong sinh
        else {
          arrPerfectDateStep5.push({
            ...item,
            gio: arrHours,
            isTruongHop2BonusHoaHop: false,
          });
          if (arrHours.length !== 0) {
            arrPerfectDateStep9.push({
              ...item,
              gio: arrHours,
              isTruongHop2BonusHoaHop: false,
            });
          }
        }
      }
    });

    // Xac dinh can Chi gia chu
    setInfoGiaChu({
      ...infoGiaChu,
      tuoi: tuoiCanGiaChu + " " + tuoiChiGiaChu,
      tuoiGiaChu: tuoiGiaChu,
      namSinh: tuoiGiaChu,
    });
    // Convert  RangeDayInMonthLunar

    // Xet hop hoa ngay/gio
    arrPerfectDateStep7 = await handleHopHoaNgayGio(arrPerfectDateStep5);

    setRangeDayInMonthLunar(ConvertToRangeDayInMonthLunar(dateArr));

    setArrMonthInYear(monthInYear);

    setStepShow({
      step1: arrPerfectDateStep1,
      step2: arrPerfectDateStep2,
      step3: arrPerfectDateStep3,
      step4: arrPerfectDateStep4,
      step5: arrPerfectDateStep5,
      step6: arrPerfectDateStep6,
      step7: arrPerfectDateStep7,
      step8: arrPerfectDateStep8,
      step9: arrPerfectDateStep9,
      dateArrNgayLoaiThang,
    });
    // setLoading(false);
  };

  const handleGetPerfectDateDongTho = async () => {
    let tuoiChiGiaChu = CHI_NAM[valueAge.year % 12];
    let tuoiCanGiaChu = CAN_NAM[valueAge.year % 10];
    let tuoiGiaChu = Number(valueAge.year);
    console.log("normal");
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
        tuoiChiGiaChu = CHI_NAM[(valueAge.year - 1) % 12];
        tuoiCanGiaChu = CAN_NAM[(valueAge.year - 1) % 10];
        tuoiGiaChu--;
      }
    }

    // setLoading(true);
    let dateArr = await enumerateDaysBetweenDates(
      `${moment(dateStart.$d).year()}-${
        moment(dateStart.$d).month() + 1
      }-${moment(dateStart.$d).date()}`,

      `${moment(dateEnd.$d).year()}-${moment(dateEnd.$d).month() + 1}-${moment(
        dateEnd.$d
      ).date()}`
    );
    let arrPerfectDateStep1 = [];
    let arrPerfectDateStep2 = [];
    let arrPerfectDateStep3 = [];
    let arrPerfectDateStep4 = [];
    let arrPerfectDateStep5 = [];
    let arrPerfectDateStep6 = []; //hop hoa
    let arrPerfectDateStep7 = []; // hop hoa ngay/gio
    let arrPerfectDateStep8 = []; // bonus dong-tho nhap-trach
    let arrPerfectDateStep9 = []; // loc gio
    let arrHoursHop = []; // loc gio
    let KimLau = [];
    let HoangOc = [];
    let TamTai = [];
    let isTamTai = false;
    let descriptionHoangOc = [];
    let hoangOcShow = [];
    let isYearHoangOc = "";
    let isKimLau = "";
    let lunarYear = [];

    let dateArrNgayLoaiThang = []; // dateArrNgayLoaiThang
    let monthInYear = {};

    // Xac dinh KimLau, HoangOc,TamTai
    dateArr.map((item, index) => {
      if (!lunarYear.includes(item.yearLunar)) lunarYear.push(item.yearLunar);

      isTamTai = CheckTamTai(tuoiChiGiaChu, item.namChi);
      // isTamTaiNgay = CheckTamTai(tuoiChiGiaChu, item.ngayChi);

      isYearHoangOc = CheckHoangOc(
        Number(item.yearLunar) - Number(tuoiGiaChu) + 1
      );
      if (
        CheckHoangOcRecommend(Number(item.yearLunar) - Number(tuoiGiaChu) + 1)
          .length !== 0 &&
        !hoangOcShow.includes(item.yearLunar)
      )
        hoangOcShow.push(item.yearLunar);

      isKimLau = CheckKimLau(item.yearLunar, Number(tuoiGiaChu));
      if (isTamTai && !TamTai.includes(item.yearLunar))
        TamTai.push(item.yearLunar);
      if (!HoangOc.includes(item.yearLunar)) {
        HoangOc.push(item.yearLunar);
        descriptionHoangOc.push(isYearHoangOc);
      }
      if (isKimLau.length !== 0 && !KimLau.includes(item.yearLunar))
        KimLau.push(item.yearLunar);
    });

    if (valueSelect === "dong-tho") handleRecommendYearDongTho(lunarYear);
    let checkLeapMonth = false;

    // Xac dinh ngay/thang xung toa nha
    dateArr.map((item, index) => {
      if (
        !CheckTrucXungNgayThangNam(valueText, item.thangChi) &&
        !KimLau.includes(item.yearLunar) &&
        !TamTai.includes(item.yearLunar) &&
        !hoangOcShow.includes(item.yearLunar) &&
        !CheckTrucXungNgayThangNam(
          CHI_NAM[Number(tuoiGiaChu) % 12],
          CHI_NAM[Number(item.yearLunar) % 12]
        ) &&
        CHI_NAM[Number(tuoiGiaChu) % 12] !==
          CHI_NAM[Number(item.yearLunar) % 12] &&
        !CheckTrucXungHinhHaiChi(
          item.thangChi,
          CHI_NAM[Number(tuoiGiaChu) % 12]
        )
      ) {
        dateArrNgayLoaiThang.push(item);
        arrPerfectDateStep1.push(item);
      }
      if (!Object.keys(monthInYear).includes(item.yearLunar.toString())) {
        monthInYear[item.yearLunar] = {};
      }
      if (
        index < dateArr.length &&
        dateArr[index - 1] !== undefined &&
        item.yearLunar !== dateArr[index - 1].yearLunar
      ) {
        checkLeapMonth = false;
      }

      if (
        !Object.keys(monthInYear[item.yearLunar]).includes(item.monthLunar) &&
        !KimLau.includes(item.yearLunar) &&
        !TamTai.includes(item.yearLunar) &&
        !hoangOcShow.includes(item.yearLunar) &&
        !CheckTrucXungNgayThangNam(
          CHI_NAM[Number(tuoiGiaChu) % 12],
          CHI_NAM[Number(item.yearLunar) % 12]
        ) &&
        CHI_NAM[Number(tuoiGiaChu) % 12] !==
          CHI_NAM[Number(item.yearLunar) % 12]
      ) {
        if (item.isLeap) {
          checkLeapMonth = true;
          monthInYear[item.yearLunar][
            item.monthLunar + (checkLeapMonth ? 1 : 0)
          ] = {
            month: item.monthLunar,
            canMonth: item.thangCan,
            chiMonth: item.thangChi,
            isLeap: item.isLeap,
          };
        } else {
          monthInYear[item.yearLunar][
            item.monthLunar + (checkLeapMonth ? 1 : 0)
          ] = {
            month: item.monthLunar,
            canMonth: item.thangCan,
            chiMonth: item.thangChi,
          };
        }
      }
    });

    // kiem tra truc/tu
    arrPerfectDateStep1.map((item, ind) => {
      //   !! || 1 trong 2 pham deu` bi
      if (
        Object.keys(ObjectTruc[item.truc].KhongLam).includes(valueSelect) &&
        Object.keys(ObjectTu[item.tu].KhongLam).includes(valueSelect)
      ) {
      } else {
        arrPerfectDateStep2.push(item);
      }
    });

    // Tranh Bach ky
    arrPerfectDateStep2.map((item, index) => {
      if (
        item.dayLunar !== 1 &&
        item.dayLunar !== 15 &&
        !KimLau.includes(item.yearLunar) &&
        !TamTai.includes(item.yearLunar) &&
        !hoangOcShow.includes(item.yearLunar) &&
        !NGUYET_KY.includes(item.dayLunar) &&
        !TAM_NUONG.includes(item.dayLunar) &&
        !CheckTamTai(tuoiChiGiaChu, item.ngayChi) &&
        monthDays(item.yearLunar, item.monthLunar) !== item.dayLunar &&
        THO_TU[item.monthLunar - 1] !== item.ngayChi &&
        SAT_CHU_AM[item.monthLunar - 1] !== item.ngayChi &&
        SAT_CHU_DUONG[item.monthLunar - 1] !== item.ngayChi &&
        VANG_VONG[item.monthLunar - 1] !== item.ngayChi &&
        NGUYET_PHA[item.monthLunar - 1] !== item.ngayChi &&
        !CheckTrucXungNgayThangNam(
          CHI_NAM[Number(item.yearLunar) % 12],
          item.ngayChi
        ) &&
        !CheckTrucXungNgayThangNam(
          CHI_NAM[Number(tuoiGiaChu) % 12],
          item.ngayChi
        ) &&
        // tranh trung xung hai tuoi gia chu
        !CheckTrucXungNgayThangNam(valueText, item.ngayChi) &&
        !CheckTuongXungTuongHaiTuoi(CHI_NAM[tuoiGiaChu % 12], item.ngayChi)
        //  &&
        // Sinh Xuat
        // !CheckSinhXuat(NGU_HANH[valueText], NGU_HANH[item.ngayCan])
      ) {
        arrPerfectDateStep4.push(item);
      }
    });

    //xet them dong-tho nhap-trach
    arrPerfectDateStep4.map((item, ind) => {
      if (
        !CheckThienTaiDiaHoa(item.ngayChi, item.monthLunar) &&
        !CheckDaiBai(
          item.namCan,
          item.monthLunar,
          item.ngayCan + " " + item.ngayChi
        ) &&
        !CheckDuongCong(item.monthLunar, item.dayLunar)
      ) {
        if (valueSelect === "nhap-trach") arrPerfectDateStep3.push(item);
        else if (
          HOANG_VU_TU_QUY[
            GetHoangVuTuQuy(
              getSunLongitude(
                jdn(
                  Number(item.daySolar),
                  Number(item.monthSolar),
                  Number(item.yearSolar)
                ),
                7
              )
            )
          ] !== item.ngayChi &&
          !KHONG_PHONG[
            GetHoangVuTuQuy(
              getSunLongitude(
                jdn(
                  Number(item.daySolar),
                  Number(item.monthSolar),
                  Number(item.yearSolar)
                ),
                7
              )
            )
          ].includes(item.ngayChi)
        )
          arrPerfectDateStep3.push(item);
      }
    });
    // Xet them hop hoa ngay/thang
    arrPerfectDateStep6 = await handleHopHoaNgayThang(
      arrPerfectDateStep3,
      valueText
    );
    // Chon gio
    let arrHours = [];
    let isCheckGioNgayThangWhileCanNgayKhacToaNha = false;
    let arrHoursOke = [];
    let titleCheckGioNgayThang = [];

    // Chon gio
    arrPerfectDateStep6.map((item, ind) => {
      isCheckGioNgayThangWhileCanNgayKhacToaNha = false;
      arrHoursOke = [];
      titleCheckGioNgayThang = [];
      let combineThienCanNgayThang = CombineThienCan(
        item.ngayCan,
        item.thangCan
      );
      arrHours = CheckTrucXungGio(
        valueText,
        item.ngayChi,
        item.thangChi,
        CHI_NAM[tuoiGiaChu % 12],
        item.monthLunar,
        item.arrGioCan
      );
      arrPerfectDateStep6[ind] = {
        ...item,
        gio: CheckHoangDao(item.ngayChi),
      };

      // if (combineThienCanNgayThang.length !== 0) {
      if (CheckNguHanhTuongKhac(NGU_HANH[valueText], NGU_HANH[item.ngayCan])) {
        // if (combineThienCanNgayThang.length !== 0) {
        handleHopHoaGio(
          item,
          arrHours,
          isCheckGioNgayThangWhileCanNgayKhacToaNha,
          arrHoursOke,
          titleCheckGioNgayThang,
          valueText,
          arrPerfectDateStep5,
          arrPerfectDateStep9
        );
      } else {
        // ty hoa
        if (NGU_HANH[valueText] === NGU_HANH[item.ngayCan]) {
          arrPerfectDateStep5.push({
            ...item,
            gio: arrHours,
            isTruongHop2BonusHoaHop: undefined,
          });
          if (arrHours.length !== 0) {
            arrPerfectDateStep9.push({
              ...item,
              gio: arrHours,
              isTruongHop2BonusHoaHop: undefined,
            });
          }
        }
        // tuong sinh
        else {
          arrPerfectDateStep5.push({
            ...item,
            gio: arrHours,
            isTruongHop2BonusHoaHop: false,
          });
          if (arrHours.length !== 0) {
            arrPerfectDateStep9.push({
              ...item,
              gio: arrHours,
              isTruongHop2BonusHoaHop: false,
            });
          }
        }
      }
    });
    // Xet hop hoa ngay/gio
    arrPerfectDateStep7 = await handleHopHoaNgayGio(arrPerfectDateStep5);

    // Xac dinh can Chi gia chu
    setInfoGiaChu({
      ...infoGiaChu,
      tuoi: tuoiCanGiaChu + " " + tuoiChiGiaChu,
      tuoiGiaChu: tuoiGiaChu,
      namSinh: tuoiGiaChu,
    });
    setBonusConditionBuilding({
      ...bonusConditionBuilding,
      KimLau,
      HoangOc,
      descriptionHoangOc,
      hoangOcShow,
      TamTai,
    });

    setLunarYearArr(lunarYear);
    setArrMonthInYear(monthInYear);

    setStepShow({
      step1: arrPerfectDateStep1,
      step2: arrPerfectDateStep2,
      step3: arrPerfectDateStep3,
      step4: arrPerfectDateStep4,
      step5: arrPerfectDateStep5,
      step6: arrPerfectDateStep6,
      step7: arrPerfectDateStep7,
      step8: arrPerfectDateStep8,
      step9: arrPerfectDateStep9,
      dateArrNgayLoaiThang,
    });
    // setLoading(false);
  };
  const handleGetPerfectDateDongThoBorrow = async () => {
    let tuoiChiGiaChu = CHI_NAM[valueAge.year % 12];
    let tuoiCanGiaChu = CAN_NAM[valueAge.year % 10];
    let tuoiGiaChu = Number(valueAge.year);
    console.log("borrow");

    let tuoiChiMuon = CHI_NAM[valueAgeBorrow.year % 12];
    let tuoiCanMuon = CAN_NAM[valueAgeBorrow.year % 10];
    let tuoiMuon = Number(valueAgeBorrow.year);
    //  gia chu
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
        tuoiChiGiaChu = CHI_NAM[(valueAge.year - 1) % 12];
        tuoiCanGiaChu = CAN_NAM[(valueAge.year - 1) % 10];
        tuoiGiaChu--;
      }
    }

    // tuoi muon
    if (Number(valueAgeBorrow.month) <= 2) {
      const sunlong = getSunLongitude(
        jdn(
          Number(valueAgeBorrow.day),
          Number(valueAgeBorrow.month),
          Number(valueAgeBorrow.year),
          valueAgeBorrow.time?.$H,
          valueAgeBorrow.time?.$m,
          valueAgeBorrow.time.$s
        ),
        7
      );
      if (sunlong <= 20 || sunlong >= 17) {
        tuoiChiMuon = CHI_NAM[(valueAgeBorrow.year - 1) % 12];
        tuoiCanMuon = CAN_NAM[(valueAgeBorrow.year - 1) % 10];
        tuoiMuon--;
      }
    }

    // setTextTrucXungTuoiMuonAndGiaChu(
    //   CheckTrucXungTuoiMuon(
    //     `${tuoiCanGiaChu} ${tuoiChiGiaChu}`,
    //     `${tuoiCanMuon} ${tuoiChiMuon}`
    //   )
    // );
    // setLoading(true);
    let dateArr = await enumerateDaysBetweenDates(
      `${moment(dateStart.$d).year()}-${
        moment(dateStart.$d).month() + 1
      }-${moment(dateStart.$d).date()}`,

      `${moment(dateEnd.$d).year()}-${moment(dateEnd.$d).month() + 1}-${moment(
        dateEnd.$d
      ).date()}`
    );

    let arrPerfectDateStep1 = [];
    let arrPerfectDateStep2 = [];
    let arrPerfectDateStep3 = [];
    let arrPerfectDateStep4 = [];
    let arrPerfectDateStep5 = [];
    let arrPerfectDateStep6 = []; //hop hoa
    let arrPerfectDateStep7 = []; // hop hoa ngay/gio
    let arrPerfectDateStep8 = []; // bonus dong-tho nhap-trach
    let arrPerfectDateStep9 = []; // loc gio
    let KimLau = [];
    let HoangOc = [];
    let TamTai = [];
    let isTamTai = false;
    let isTamTaiNgay = false;
    let descriptionHoangOc = [];
    let isYearHoangOc = "";
    let isKimLau = "";
    let lunarYear = [];
    let hoangOcShow = [];

    let dateArrNgayLoaiThang = []; // dateArrNgayLoaiThang
    let monthInYear = {};

    // Xac dinh KimLau, HoangOc,TamTai
    dateArr.map((item, index) => {
      if (!lunarYear.includes(item.yearLunar)) lunarYear.push(item.yearLunar);

      isTamTai = CheckTamTai(tuoiChiMuon, item.namChi);
      // isTamTaiNgay = CheckTamTai(tuoiChiGiaChu, item.ngayChi);

      isYearHoangOc = CheckHoangOc(
        Number(item.yearLunar) - Number(tuoiMuon) + 1
      );
      if (
        CheckHoangOcRecommend(Number(item.yearLunar) - Number(tuoiMuon) + 1)
          .length !== 0 &&
        !hoangOcShow.includes(item.yearLunar)
      )
        hoangOcShow.push(item.yearLunar);

      isKimLau = CheckKimLau(item.yearLunar, Number(tuoiMuon));
      if (isTamTai && !TamTai.includes(item.yearLunar))
        TamTai.push(item.yearLunar);
      if (!HoangOc.includes(item.yearLunar)) {
        HoangOc.push(item.yearLunar);
        descriptionHoangOc.push(isYearHoangOc);
      }
      if (isKimLau.length !== 0 && !KimLau.includes(item.yearLunar))
        KimLau.push(item.yearLunar);
    });

    if (valueSelect === "dong-tho") handleRecommendYearDongTho(lunarYear);
    setBonusConditionBuilding({
      ...bonusConditionBuilding,
      KimLau,
      HoangOc,
      descriptionHoangOc,
      hoangOcShow,
      TamTai,
    });

    let checkLeapMonth = false;

    // Xac dinh ngay/thang xung toa nha
    dateArr.map((item, index) => {
      if (
        // !CheckTrucXungNgayThangNam(valueText, item.ngayChi) &&
        !CheckTrucXungNgayThangNam(valueText, item.thangChi) &&
        !KimLau.includes(item.yearLunar) &&
        !TamTai.includes(item.yearLunar) &&
        !hoangOcShow.includes(item.yearLunar) &&
        !CheckTrucXungNgayThangNam(
          CHI_NAM[Number(tuoiMuon) % 12],
          CHI_NAM[Number(item.yearLunar) % 12]
        ) &&
        CHI_NAM[Number(tuoiMuon) % 12] !==
          CHI_NAM[Number(item.yearLunar) % 12] &&
        !CheckTrucXungHinhHaiChi(item.thangChi, CHI_NAM[Number(tuoiMuon) % 12])
      ) {
        dateArrNgayLoaiThang.push(item);
        arrPerfectDateStep1.push(item);
      }
      if (!Object.keys(monthInYear).includes(item.yearLunar.toString())) {
        monthInYear[item.yearLunar] = {};
      }

      if (
        index < dateArr.length &&
        dateArr[index - 1] !== undefined &&
        item.yearLunar !== dateArr[index - 1].yearLunar
      ) {
        checkLeapMonth = false;
      }

      if (
        !Object.keys(monthInYear[item.yearLunar]).includes(item.monthLunar) &&
        !KimLau.includes(item.yearLunar) &&
        !TamTai.includes(item.yearLunar) &&
        !hoangOcShow.includes(item.yearLunar) &&
        !CheckTrucXungNgayThangNam(
          CHI_NAM[Number(tuoiMuon) % 12],
          CHI_NAM[Number(item.yearLunar) % 12]
        ) &&
        CHI_NAM[Number(tuoiMuon) % 12] !== CHI_NAM[Number(item.yearLunar) % 12]
      ) {
        if (item.isLeap) {
          checkLeapMonth = true;
          monthInYear[item.yearLunar][
            item.monthLunar + (checkLeapMonth ? 1 : 0)
          ] = {
            month: item.monthLunar,
            canMonth: item.thangCan,
            chiMonth: item.thangChi,
            isLeap: item.isLeap,
          };
        } else {
          monthInYear[item.yearLunar][
            item.monthLunar + (checkLeapMonth ? 1 : 0)
          ] = {
            month: item.monthLunar,
            canMonth: item.thangCan,
            chiMonth: item.thangChi,
          };
        }
      }
    });

    // kiem tra truc/tu
    arrPerfectDateStep1.map((item, ind) => {
      //   !! || 1 trong 2 pham deu` bi
      if (
        Object.keys(ObjectTruc[item.truc].KhongLam).includes(valueSelect) &&
        Object.keys(ObjectTu[item.tu].KhongLam).includes(valueSelect)
      ) {
      } else {
        arrPerfectDateStep2.push(item);
      }
    });
    console.log(tuoiChiMuon, "tuoiChiMuon");
    // Tranh Bach ky
    arrPerfectDateStep2.map((item, index) => {
      if (
        item.dayLunar !== 1 &&
        item.dayLunar !== 15 &&
        !KimLau.includes(item.yearLunar) &&
        !TamTai.includes(item.yearLunar) &&
        !hoangOcShow.includes(item.yearLunar) &&
        !NGUYET_KY.includes(item.dayLunar) &&
        !TAM_NUONG.includes(item.dayLunar) &&
        !CheckTamTai(tuoiChiMuon, item.ngayChi) &&
        monthDays(item.yearLunar, item.monthLunar) !== item.dayLunar &&
        THO_TU[item.monthLunar - 1] !== item.ngayChi &&
        SAT_CHU_AM[item.monthLunar - 1] !== item.ngayChi &&
        SAT_CHU_DUONG[item.monthLunar - 1] !== item.ngayChi &&
        VANG_VONG[item.monthLunar - 1] !== item.ngayChi &&
        NGUYET_PHA[item.monthLunar - 1] !== item.ngayChi &&
        !CheckTrucXungNgayThangNam(
          CHI_NAM[Number(item.yearLunar) % 12],
          item.ngayChi
        ) &&
        !CheckTrucXungNgayThangNam(
          CHI_NAM[Number(tuoiMuon) % 12],
          item.ngayChi
        ) &&
        !CheckTrucXungNgayThangNam(valueText, item.ngayChi) &&
        !CheckTuongXungTuongHaiTuoi(CHI_NAM[tuoiMuon % 12], item.ngayChi)
        //  &&
        // Sinh Xuat
        // !CheckSinhXuat(NGU_HANH[valueText], NGU_HANH[item.ngayCan])
      ) {
        arrPerfectDateStep4.push(item);
      }
    });
    console.log(arrPerfectDateStep4.length, "borrorww");
    //xet them dong-tho nhap-trach
    arrPerfectDateStep4.map((item, ind) => {
      if (
        !CheckThienTaiDiaHoa(item.ngayChi, item.monthLunar) &&
        !CheckDaiBai(
          item.namCan,
          item.monthLunar,
          item.ngayCan + " " + item.ngayChi
        ) &&
        !CheckDuongCong(item.monthLunar, item.dayLunar)
      ) {
        if (valueSelect === "nhap-trach") arrPerfectDateStep3.push(item);
        else if (
          HOANG_VU_TU_QUY[
            GetHoangVuTuQuy(
              getSunLongitude(
                jdn(
                  Number(item.daySolar),
                  Number(item.monthSolar),
                  Number(item.yearSolar)
                ),
                7
              )
            )
          ] !== item.ngayChi &&
          !KHONG_PHONG[
            GetHoangVuTuQuy(
              getSunLongitude(
                jdn(
                  Number(item.daySolar),
                  Number(item.monthSolar),
                  Number(item.yearSolar)
                ),
                7
              )
            )
          ].includes(item.ngayChi)
        )
          arrPerfectDateStep3.push(item);
      }
    });

    // Xet them hop hoa ngay/thang
    arrPerfectDateStep6 = await handleHopHoaNgayThang(
      arrPerfectDateStep3,
      valueText
    );
    // Chon gio
    let arrHours = [];
    let isCheckGioNgayThangWhileCanNgayKhacToaNha = false;
    let arrHoursOke = [];
    let titleCheckGioNgayThang = [];

    arrPerfectDateStep6.map((item, ind) => {
      isCheckGioNgayThangWhileCanNgayKhacToaNha = false;
      arrHoursOke = [];
      titleCheckGioNgayThang = [];
      let combineThienCanNgayThang = CombineThienCan(
        item.ngayCan,
        item.thangCan
      );

      arrHours = CheckTrucXungGio(
        valueText,
        item.ngayChi,
        item.thangChi,
        CHI_NAM[tuoiMuon % 12],
        item.monthLunar,
        item.arrGioCan
      );
      arrPerfectDateStep6[ind] = {
        ...item,
        gio: CheckHoangDao(item.ngayChi),
      };

      // if (combineThienCanNgayThang.length !== 0) {
      if (CheckNguHanhTuongKhac(NGU_HANH[valueText], NGU_HANH[item.ngayCan])) {
        handleHopHoaGio(
          item,
          arrHours,
          isCheckGioNgayThangWhileCanNgayKhacToaNha,
          arrHoursOke,
          titleCheckGioNgayThang,
          valueText,
          arrPerfectDateStep5,
          arrPerfectDateStep9
        );
      } else {
        // ty hoa
        if (NGU_HANH[valueText] === NGU_HANH[item.ngayCan]) {
          arrPerfectDateStep5.push({
            ...item,
            gio: arrHours,
            isTruongHop2BonusHoaHop: undefined,
          });
          if (arrHours.length !== 0) {
            arrPerfectDateStep9.push({
              ...item,
              gio: arrHours,
              isTruongHop2BonusHoaHop: undefined,
            });
          }
        }
        // tuong sinh
        else {
          arrPerfectDateStep5.push({
            ...item,
            gio: arrHours,
            isTruongHop2BonusHoaHop: false,
          });
          if (arrHours.length !== 0) {
            arrPerfectDateStep9.push({
              ...item,
              gio: arrHours,
              isTruongHop2BonusHoaHop: false,
            });
          }
        }
      }
    });

    // Xet hop hoa ngay/gio
    arrPerfectDateStep7 = await handleHopHoaNgayGio(arrPerfectDateStep5);

    // Xac dinh can Chi gia chu
    setInfoGiaChu({
      ...infoGiaChu,
      tuoi: tuoiCanGiaChu + " " + tuoiChiGiaChu,
      tuoiGiaChu: tuoiGiaChu,
      namSinh: tuoiGiaChu,
    });
    // xac dinh can chi tuoi muon

    setInfoGiaChuBorrow({
      ...infoGiaChuBorrow,
      tuoi: tuoiCanMuon + " " + tuoiChiMuon,
      tuoiGiaChu: tuoiMuon,
      tuoiTuoiMuon: tuoiMuon,
      namSinh: tuoiMuon,
    });

    setTextTrucXungTuoiMuonAndGiaChu(
      CheckTrucXungNgayThangNam(tuoiChiGiaChu, tuoiChiMuon)
    );

    setLunarYearArr(lunarYear);
    setArrMonthInYear(monthInYear);

    // Xet hop hoa ngay/gio
    arrPerfectDateStep7 = await handleHopHoaNgayGio(arrPerfectDateStep5);
    setStepShow({
      step1: arrPerfectDateStep1,
      step2: arrPerfectDateStep2,
      step3: arrPerfectDateStep3,
      step4: arrPerfectDateStep4,
      step5: arrPerfectDateStep5,
      step6: arrPerfectDateStep6,
      step7: arrPerfectDateStep7,
      step8: arrPerfectDateStep8,
      step9: arrPerfectDateStep9,
      dateArrNgayLoaiThang,
    });

    // setLoading(false);
  };

  const handleHopHoaNgayGio = async (arr, toa) => {
    return arr;
  };
  const handleGetPerfectDateKhongToa = async () => {
    let tuoiChiGiaChu = CHI_NAM[valueAge.year % 12];
    let tuoiCanGiaChu = CAN_NAM[valueAge.year % 10];
    let tuoiGiaChu = Number(valueAge.year);

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
        tuoiChiGiaChu = CHI_NAM[(valueAge.year - 1) % 12];
        tuoiCanGiaChu = CAN_NAM[(valueAge.year - 1) % 10];
        tuoiGiaChu--;
      }
    }

    // setLoading(true);
    let dateArr = await enumerateDaysBetweenDates(
      `${moment(dateStart.$d).year()}-${
        moment(dateStart.$d).month() + 1
      }-${moment(dateStart.$d).date()}`,

      `${moment(dateEnd.$d).year()}-${moment(dateEnd.$d).month() + 1}-${moment(
        dateEnd.$d
      ).date()}`
    );
    let arrPerfectDate = [];
    let arrPerfectDateStep1 = [];
    let arrPerfectDateStep2 = [];
    let arrPerfectDateStep3 = [];
    let arrPerfectDateStep4 = [];
    let arrPerfectDateStep5 = [];
    let arrPerfectDateStep6 = []; // hop hoa ngay/thang
    let arrPerfectDateStep7 = []; // hop hoa ngay/gio
    let arrPerfectDateStep9 = []; // loc gio

    // kiem tra truc/tu

    dateArr.map((item, ind) => {
      if (
        //   !! || 1 trong 2 pham deu` bi
        //
        Object.keys(ObjectTruc[item.truc].KhongLam).includes(valueSelect) &&
        Object.keys(ObjectTu[item.tu].KhongLam).includes(valueSelect)
        // Object.keys(ObjectTruc[item.truc].CanLam).includes(valueSelect)
      ) {
      } else {
        arrPerfectDateStep2.push(item);
      }
    });

    // Tranh Bach ky

    arrPerfectDateStep2.map((item, index) => {
      if (
        item.dayLunar !== 1 &&
        item.dayLunar !== 15 &&
        monthDays(item.yearLunar, item.monthLunar) !== item.dayLunar &&
        !NGUYET_KY.includes(item.dayLunar) &&
        !TAM_NUONG.includes(item.dayLunar) &&
        THO_TU[item.monthLunar - 1] !== item.ngayChi &&
        SAT_CHU_AM[item.monthLunar - 1] !== item.ngayChi &&
        SAT_CHU_DUONG[item.monthLunar - 1] !== item.ngayChi &&
        VANG_VONG[item.monthLunar - 1] !== item.ngayChi &&
        NGUYET_PHA[item.monthLunar - 1] !== item.ngayChi &&
        //Tue Pha
        !CheckTrucXungNgayThangNam(
          CHI_NAM[Number(item.yearLunar) % 12],
          item.ngayChi
        ) &&
        //Dai Hao
        !CheckTrucXungNgayThangNam(
          CHI_NAM[Number(tuoiGiaChu) % 12],
          item.ngayChi
        ) &&
        // tranh trung xung hai tuoi gia chu
        CheckTuongXungTuongHaiTuoiKhongToa(
          CHI_NAM[tuoiGiaChu % 12],
          item.ngayChi
        ) === false
      ) {
        arrPerfectDateStep3.push(item);
      }
    });

    let arrHours = [];
    let isCheckGioNgayThangWhileCanNgayKhacToaNha = false;
    let arrHoursOke = [];
    let titleCheckGioNgayThang = [];
    // Chon gio
    arrPerfectDateStep3.map((item, ind) => {
      arrHours = CheckTrucXungGioKhongToa(
        item.ngayChi,
        item.thangChi,
        CHI_NAM[tuoiGiaChu % 12],
        item.monthLunar
      );

      if (arrHours.length !== 0) {
        arrPerfectDateStep9.push({
          ...item,
          gio: arrHours,
        });
      }
      arrPerfectDateStep5.push({
        ...item,
        gio: arrHours,
      });
    });

    // Xac dinh can Chi gia chu
    setInfoGiaChu({
      ...infoGiaChu,
      tuoi: tuoiCanGiaChu + " " + tuoiChiGiaChu,
      tuoiGiaChu: tuoiGiaChu,
    });
    // setDataStep2(arrPerfectDateStep2);
    // setDataStep3(arrPerfectDateStep3);
    // setDataStep4(arrPerfectDateStep4);
    // setDataStep5(arrPerfectDateStep5);
    setStepShow({
      step1: arrPerfectDateStep1,
      step2: arrPerfectDateStep2,
      step3: arrPerfectDateStep3,
      step4: arrPerfectDateStep4,
      step5: arrPerfectDateStep5,
      step6: arrPerfectDateStep5,
      step7: arrPerfectDateStep5,
      step9: arrPerfectDateStep9,
      dateArrNgayLoaiThang: [],
      dateArr,
    });

    // setLoading(false);
  };

  const handleRecommendYearDongTho = (lunarYear) => {
    let arrYearRecommend = {};
    lunarYear?.map((year) => {
      let arrYear = [];
      for (let i = year - 80; i < year - 20; i++) {
        if (
          !CheckTamTai(CHI_NAM[Number(i) % 12], CHI_NAM[Number(year) % 12]) &&
          CheckHoangOcRecommend(Number(year) - Number(i) + 1).length === 0 &&
          CheckKimLau(year, Number(i)).length === 0 &&
          !CheckTrucXungNgayThangNam(
            CHI_NAM[Number(i) % 12],
            CHI_NAM[Number(year) % 12]
          ) &&
          CHI_NAM[Number(i) % 12] !== CHI_NAM[Number(year) % 12]
        ) {
          arrYear.push(
            `${i} (${CAN_NAM[Number(i) % 10]} ${CHI_NAM[Number(i) % 12]}) (${
              NGU_HANH_60_HOA_GIAP_INT[
                (NGU_HANH_CAN_CHI_60_HOA_GIAP_INT[CAN_NAM[Number(i) % 10]] +
                  NGU_HANH_CAN_CHI_60_HOA_GIAP_INT[CHI_NAM[Number(i) % 12]] -
                  1) %
                  5
              ]
            })`
          );
        }
      }
      arrYearRecommend[year] = arrYear;
    });
    setArrRecommend(arrYearRecommend);
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
        Xem ngày Xây dựng
      </div>
      {/* <Button
        variant="contained"
        style={{ backgroundColr: "green" }}
        onClick={() => {
          handleInit();
        }}>
        asdsa
      </Button> */}
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
              setArrMonthInYear();
              setValueText();
              setStepShow({
                step1: undefined,
                step2: undefined,
                step3: undefined,
                step4: undefined,
                step5: undefined,
                step6: undefined,
                step7: undefined,
                step8: undefined,
                step9: undefined,
              });
            }}>
            {Object.keys(SERVICE_XAYDUNG).map((key, inex) => {
              return (
                <MenuItem key={Math.random()} value={key}>
                  {SERVICE_XAYDUNG[key]}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <div className="text-black font-sans font-bold">
          <div>NHÂN {">"} THÔNG TIN GIA CHỦ</div>
          <div>
            <TextField
              value={infoGiaChu.name}
              id="standard-basic"
              label="Họ tên gia chủ"
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
          </div>
          <div className="flex flex-row justify-center mt-3 flex-wrap">
            {valueSelect !== "dao-gieng" && valueSelect !== "lap-gieng" && (
              <FormControl fullWidth style={{ marginLeft: 20, width: 200 }}>
                <InputLabel id="demo-simple-select-label">Toạ nhà</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Toạ nhà"
                  onChange={(e) => {
                    setValueText(TOA_NHA[e.target.value]);
                  }}>
                  {TOA_NHA.map((key, inex) => {
                    return (
                      <MenuItem key={Math.random()} value={inex}>
                        {key}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            )}
            <TextField
              type={"number"}
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
        </div>
        {/* Tuoi Muon */}
        {(valueSelect === "dong-tho" || valueSelect === "nhap-trach") && (
          <div className="flex flex-row items-end  mt-5 ">
            <div
              style={{ color: "black", marginBottom: 25 }}
              className="flex flex-row items-center ">
              <div
                style={{
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}>
                Tuổi mượn
              </div>
              <Switch
                color="warning"
                onChange={() => {
                  setIsMuonTuoi(!isMuonTuoi);
                  setArrMonthInYear();
                  setStepShow({
                    step1: undefined,
                    step2: undefined,
                    step3: undefined,
                    step4: undefined,
                    step5: undefined,
                    step6: undefined,
                    step7: undefined,
                    step8: undefined,
                    step9: undefined,
                  });
                }}
              />
            </div>
            <div
              className="flex flex-row justify-center mt-3 flex-wrap"
              style={{
                visibility: isMuonTuoi ? "visible" : "hidden",
              }}>
              <TextField
                type={"number"}
                id="standard-basic"
                label="Ngày"
                placeholder="Ngày"
                variant="standard"
                style={{ marginBottom: 25, marginLeft: 20 }}
                onChange={(e) => {
                  setValueAgeBorrow({ ...valueAgeBorrow, day: e.target.value });
                }}
              />
              <FormControl fullWidth style={{ marginLeft: 20, width: 200 }}>
                <InputLabel id="demo-simple-select-label">Tháng</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Tháng"
                  onChange={(e) => {
                    setValueAgeBorrow({
                      ...valueAgeBorrow,
                      month: e.target.value,
                    });
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
                style={{ marginBottom: 25, marginLeft: 20 }}
                onChange={(e) => {
                  setValueAgeBorrow({
                    ...valueAgeBorrow,
                    year: e.target.value,
                  });
                }}
              />
              <TimeField
                label="Giờ/phút/giây"
                format="HH:mm:ss"
                value={valueAge.time}
                style={{ marginLeft: 20 }}
                onChange={(e) => {
                  setValueAgeBorrow({ ...valueAgeBorrow, time: e });
                }}
              />
            </div>
          </div>
        )}
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
                setStepShow({
                  step1: undefined,
                  step2: undefined,
                  step3: undefined,
                  step4: undefined,
                  step5: undefined,
                  step6: undefined,
                  step7: undefined,
                  step8: undefined,
                  step9: undefined,
                });
              }}
            />
            <DatePicker
              minDate={dateStart}
              label="Đến ngày"
              format={"DD-MM-YYYY"}
              onChange={(value) => {
                setDateEnd(value);
                setStepShow({
                  step1: undefined,
                  step2: undefined,
                  step3: undefined,
                  step4: undefined,
                  step5: undefined,
                  step6: undefined,
                  step7: undefined,
                  step8: undefined,
                  step9: undefined,
                });
              }}
            />
          </div>
        </div>
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
            if (valueSelect === "dao-gieng" || valueSelect === "lap-gieng")
              return handleGetPerfectDateKhongToa();
            if (valueSelect === "dong-tho") {
              if (isMuonTuoi) return handleGetPerfectDateDongThoBorrow();
              return handleGetPerfectDateDongTho();
            } else handleGetPerfectDate();
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
      {/* table show */}
      {typeof window !== "undefined" && (
        <>
          {/* Thien */}
          <div
            className="text-black"
            style={{
              width: window.innerWidth * 0.9,
            }}>
            {/* {rangeDayInMonthLunar &&
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
                          ngày{" "}
                          {rangeDayInMonthLunar[year][month][1]
                            ? rangeDayInMonthLunar[year][month][1].daySolar
                            : rangeDayInMonthLunar[year][month][0].daySolar}
                          /
                          {rangeDayInMonthLunar[year][month][1]
                            ? rangeDayInMonthLunar[year][month][1].monthSolar
                            : rangeDayInMonthLunar[year][month][0].monthSolar}
                          /
                          {rangeDayInMonthLunar[year][month][1]
                            ? rangeDayInMonthLunar[year][month][1].yearSolar
                            : rangeDayInMonthLunar[year][month][0].yearSolar}
                        </li>
                      );
                    })}
                  </ul>
                );
              })} */}
          </div>
          {/* Nhan */}
          <div style={{ marginTop: 30, width: window.innerWidth * 0.9 }}>
            {infoGiaChu.tuoi.length !== 0 && (
              <>
                <div className="text-black mb-2 font-bold text-lg">
                  Gia chủ tên: {infoGiaChu.name}
                  <div>Tuổi: {infoGiaChu.tuoi}</div>{" "}
                </div>

                {(valueSelect === "dong-tho" || valueSelect === "nhap-trach") &&
                  valueSelect !== "dao-gieng" &&
                  valueSelect !== "lap-gieng" && (
                    <>
                      {isMuonTuoi && (
                        <div className="text-black mb-2 font-bold text-lg">
                          Tuổi Mượn: {infoGiaChuBorrow.tuoi}
                        </div>
                      )}
                      {isMuonTuoi && textTrucXungTuoiMuonAndGiaChu && (
                        <div className="text-[red] mb-2 font-bold text-base italic">
                          Gia chủ tuổi {infoGiaChu.tuoi} xung với tuổi mượn{" "}
                          {infoGiaChuBorrow.tuoi}
                        </div>
                      )}
                    </>
                  )}

                {valueSelect === "dong-tho" &&
                  (bonusConditionBuilding.TamTai?.length !== 0 ||
                    bonusConditionBuilding.HoangOc?.length !== 0 ||
                    bonusConditionBuilding.KimLau?.length !== 0) &&
                  valueSelect !== "dao-gieng" &&
                  valueSelect !== "lap-gieng" && (
                    <div className=" mb-2 font-bold text-sm text-red-500 italic">
                      <div className="max-h-[500px] overflow-scroll">
                        <TableNamKimLauHoangOcTamTai
                          lunarYearArr={lunarYearArr}
                          infoGiaChu={infoGiaChu}
                          infoGiaChuBorrow={infoGiaChuBorrow}
                          isMuonTuoi={isMuonTuoi}
                          bonusConditionBuilding={bonusConditionBuilding}
                        />
                      </div>
                      <div className="mt-5">
                        <div>
                          {bonusConditionBuilding.HoangOc?.length !== 0
                            ? "Hoang Ốc vào năm " +
                              bonusConditionBuilding.HoangOc?.map(
                                (item, idx) => {
                                  return (
                                    bonusConditionBuilding.HoangOc[
                                      idx
                                    ].toString() +
                                    " " +
                                    "(" +
                                    bonusConditionBuilding.descriptionHoangOc[
                                      idx
                                    ].toString() +
                                    (HOANG_OC.indexOf(
                                      bonusConditionBuilding.descriptionHoangOc[
                                        idx
                                      ].toString()
                                    ) === 1 ||
                                    HOANG_OC.indexOf(
                                      bonusConditionBuilding.descriptionHoangOc[
                                        idx
                                      ].toString()
                                    ) === 0 ||
                                    HOANG_OC.indexOf(
                                      bonusConditionBuilding.descriptionHoangOc[
                                        idx
                                      ].toString()
                                    ) === 3
                                      ? " Tốt"
                                      : " Xấu") +
                                    ") "
                                  );
                                }
                              )
                            : ""}
                        </div>
                        *{isMuonTuoi ? "Người mượn tuổi " : "Gia chủ "}
                        Phạm:{" "}
                      </div>
                      {bonusConditionBuilding.TamTai?.length !== 0
                        ? "Tam Tai vào năm " +
                          bonusConditionBuilding.TamTai?.toString().replaceAll(
                            ",",
                            ", "
                          )
                        : ""}
                      <div>
                        {bonusConditionBuilding.KimLau?.length !== 0
                          ? "Kim Lâu vào năm " +
                            bonusConditionBuilding.KimLau?.toString().replaceAll(
                              ",",
                              ", "
                            )
                          : ""}
                      </div>
                      {(bonusConditionBuilding.KimLau?.length !== 0 ||
                        bonusConditionBuilding.TamTai?.length !== 0 ||
                        bonusConditionBuilding.hoangOcShow?.length !== 0) && (
                        <div style={{ marginTop: 10, color: "green" }}>
                          <div style={{ fontSize: 18 }}>
                            Có thể mượn tuổi vào các năm{" "}
                          </div>
                          <TableShowRecommend
                            data={arrRecommend}
                            bonusConditionBuilding={bonusConditionBuilding}
                            infoGiaChu={infoGiaChu}
                          />
                        </div>
                      )}
                    </div>
                  )}

                <div
                  className="text-black mb-2 font-bold text-lg"
                  style={{
                    color: COLOR_TEXT_NGU_HANH[NGU_HANH[valueText]],
                  }}>
                  Toạ nhà: {valueText} ({NGU_HANH[valueText]})
                </div>
                <div className="text-black mb-2 font-bold text-lg">
                  Hành ngày chọn:{" "}
                  {NGU_HANH_TUONG_SINH[NGU_HANH[valueText]]
                    ?.toString()
                    .replaceAll(",", " > ")}
                </div>
              </>
            )}
          </div>

          {/* Show ket qua */}
          {stepShow.step9?.length !== 0 ? (
            <>
              <div className="text-[24px] font-bold mb-4 text-black">
                Tổng cộng có {stepShow.step9?.length} kết quả{" "}
              </div>
              <div className="max-h-[500px] overflow-scroll px-10 border-2 border-black pb-6">
                {stepShow.step9?.map((item, index) => {
                  return (
                    <>
                      <div className="max-h-[500px] overflow-scroll">
                        <TableResult
                          data={item}
                          infoGiaChu={infoGiaChu}
                          valueSelect={valueSelect}
                          toaNha={valueText}></TableResult>
                      </div>
                    </>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              {dateStart?.$D && dateEnd?.$D && (
                <div className="text-[24px] font-bold my-4 uppercase text-[red] max-w-2xl text-center ">
                  {new Date(dateStart).getTime() === new Date(dateEnd).getTime()
                    ? `Ngày ${dateStart?.$D}/${dateStart?.$D + 1}/${
                        dateStart.$y
                      } không phù hợp cho công việc, vui lòng chọn ngày khác!`
                    : `Từ ngày ${dateStart?.$D}/${dateStart?.$D + 1}/${
                        dateStart.$y
                      } đến ngày  ${dateEnd.$D}/${dateEnd.$D + 1}/${
                        dateEnd.$y
                      } không phù hợp cho công việc, vui lòng chọn khoảng khác!`}
                </div>
              )}
            </>
          )}
          {arrMonthInYear && (
            <div>
              <div
                className="font-bold text-[20px]"
                style={{ color: "black", marginTop: 30 }}>
                Bước 1: Chọn tháng
              </div>
              <div className="max-h-[500px] overflow-scroll px-10 border-2 border-black mt-2 ">
                <TableSangCatThang
                  valueSelect={valueSelect}
                  data={arrMonthInYear}
                  infoNguoiMat={isMuonTuoi ? infoGiaChuBorrow : infoGiaChu}
                  toaNha={valueText}
                  showFull={true}
                  textXungToa="Xung toạ nhà"></TableSangCatThang>
              </div>
            </div>
          )}
          {stepShow.dateArrNgayLoaiThang && (
            <div>
              <div
                className="font-bold text-[20px]"
                style={{ color: "black", marginTop: 30 }}>
                Bước
                {valueSelect !== "dao-gieng" && valueSelect !== "lap-gieng"
                  ? " 2"
                  : " 1"}
                {": "}
                Xét Trực/Tú
                {stepShow.dateArrNgayLoaiThang &&
                  `(${
                    valueSelect !== "dao-gieng" && valueSelect !== "lap-gieng"
                      ? stepShow.dateArrNgayLoaiThang?.length
                      : stepShow.dateArr?.length
                  })`}
              </div>
              <div className="max-h-[500px] overflow-scroll px-10 border-2 border-black mt-2 ">
                <TableSangCatTrucTu
                  valueSelect={valueSelect}
                  data={
                    valueSelect !== "dao-gieng" && valueSelect !== "lap-gieng"
                      ? stepShow.dateArrNgayLoaiThang
                      : stepShow?.dateArr
                  }
                  infoNguoiMat={isMuonTuoi ? infoGiaChuBorrow : infoGiaChu}
                  toaNha={valueText}></TableSangCatTrucTu>
              </div>
            </div>
          )}
          {stepShow.step2 && (
            <div className="">
              <div
                className="font-bold text-[20px]"
                style={{ color: "black", marginTop: 30 }}>
                Bước{" "}
                {valueSelect !== "dao-gieng" && valueSelect !== "lap-gieng"
                  ? "3"
                  : "2"}
                : {"Chọn ngày và so với tuổi gia chủ "}
                {`(${stepShow.step2?.length})`}
              </div>
              <div className="max-h-[500px] overflow-scroll px-10 border-2 border-black mt-2">
                <TableTrucXungNgayThang
                  data={stepShow.step2}
                  infoGiaChu={isMuonTuoi ? infoGiaChuBorrow : infoGiaChu}
                  valueSelect={valueSelect}
                  checkTrungXungHaiTuoi={true}
                  toaNha={valueText}></TableTrucXungNgayThang>
              </div>
            </div>
          )}
          {stepShow.step3 && (
            <div>
              <div
                className="font-bold text-[20px]"
                style={{ color: "black", marginTop: 30 }}>
                Xét thêm hợp hoá ngày{" "}
                {stepShow.step3 && `(${stepShow.step3?.length})`}
              </div>

              <div className="max-h-[500px] overflow-scroll px-10 border-2 border-black mt-2">
                <TableXayDung
                  valueSelect={valueSelect}
                  data={stepShow.step3}
                  checkHopHoa={true}
                  toaNha={valueText}
                  infoGiaChu={
                    isMuonTuoi ? infoGiaChuBorrow : infoGiaChu
                  }></TableXayDung>
              </div>
            </div>
          )}
          {stepShow.step6 && (
            <div>
              <div
                className="font-bold text-[20px]"
                style={{ color: "black", marginTop: 30 }}>
                Bước{" "}
                {valueSelect !== "dao-gieng" && valueSelect !== "lap-gieng"
                  ? "4"
                  : "3"}
                : {"Chọn giờ "}
                {stepShow.step6 && `(${stepShow.step6?.length})`}
              </div>

              <div className="max-h-[500px] overflow-scroll px-10 border-2 border-black mt-2">
                <TableXayDung
                  valueSelect={valueSelect}
                  checkHopHoa={true}
                  toaNha={valueText}
                  data={stepShow.step6}
                  infoGiaChu={
                    isMuonTuoi ? infoGiaChuBorrow : infoGiaChu
                  }></TableXayDung>
              </div>
            </div>
          )}
          {stepShow.step7 && (
            <div>
              <div
                className="font-bold text-[20px]"
                style={{ color: "black", marginTop: 30 }}>
                Kiểm tra thêm hợp hoá giờ{" "}
                {stepShow.step5 && `(${stepShow.step5?.length})`}
              </div>

              <div className="max-h-[500px] overflow-scroll px-10 border-2 border-black mt-2">
                <TableXayDung
                  checkHopHoa={true}
                  toaNha={valueText}
                  valueSelect={valueSelect}
                  data={stepShow.step5}
                  infoGiaChu={
                    isMuonTuoi ? infoGiaChuBorrow : infoGiaChu
                  }></TableXayDung>
              </div>
            </div>
          )}
          {stepShow.step9 && (
            <div>
              <div
                className="font-bold text-[20px]"
                style={{ color: "black", marginTop: 30 }}>
                Bước{" "}
                {valueSelect !== "dao-gieng" && valueSelect !== "lap-gieng"
                  ? "5"
                  : "4"}
                : Loại bỏ những ngày không có giờ
                {stepShow.step9 && `(${stepShow.step9?.length})`}
              </div>
              <div className="max-h-[500px] overflow-scroll px-10 border-2 border-black mt-2 ">
                <TableResultStepFinal
                  valueSelect={valueSelect}
                  data={stepShow.step9}
                  infoGiaChu={isMuonTuoi ? infoGiaChuBorrow : infoGiaChu}
                  toaNha={valueText}></TableResultStepFinal>
              </div>
            </div>
          )}
          <div style={{ height: 200 }}></div>
          <Notify
            description={infoNotify.description}
            type={infoNotify.type}
            ref={refNotify}
          />
        </>
      )}
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
