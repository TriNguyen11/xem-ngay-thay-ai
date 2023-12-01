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
import TableResult from "@Root/components/TableResult";
import TableWedding from "@Root/components/TableWedding";
import TableWeddingNam from "@Root/components/TableWeddingNam";
import TableWeddingThangNew from "@Root/components/TableWeddingThangNew";
import TableWeddingTrucTu from "@Root/components/TableWeddingTrucTu";
import { getSunLongitude, jdn, monthDays } from "@Root/script/AmLich";
import {
  CAN_NAM,
  CHI_NAM,
  CHI_NAM_SORTED,
  COLOR_TEXT_NGU_HANH,
  HOANG_VU_TU_QUY,
  KHONG_PHONG,
  MONTHS,
  NGUYET_KY,
  NGUYET_PHA,
  NGU_HANH,
  NGU_HANH_TUONG_SINH,
  ObjectTruc,
  ObjectTu,
  SAT_CHU_AM,
  SAT_CHU_DUONG,
  SERVICE_CUOIHOI,
  TAM_NUONG,
  THO_TU,
  TOA_NHA,
  VANG_VONG,
} from "@Root/script/Constant";
import {
  CheckCongCo,
  CheckCoNhatTuanPhong,
  CheckDaiBai,
  CheckDuongCong,
  CheckHoangDao,
  CheckHongXaKyNhat,
  CheckKimLau,
  CheckNgayNguLy,
  CheckNgaySat,
  CheckNghenhHonKyNhat,
  CheckNguHanhTuongKhac,
  CheckNguHanhTuongKhacKhauQuyet,
  CheckNhacThan,
  CheckPhuChu,
  CheckSinhXuat,
  CheckSinh_TyHoa,
  CheckTamTai,
  CheckThaiTueHinh,
  CheckTheChu,
  CheckThienTaiDiaHoa,
  CheckTrucXungChi,
  CheckTrucXungGioCuoiHoi,
  CheckTrucXungNgayThangNam,
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
  const [valueText, setValueText] = useState({
    namToa: "",
    nuToa: "",
  });
  const [arrMonthInYear, setArrMonthInYear] = useState();
  const [infoGiaChu, setInfoGiaChu] = useState({
    nameNam: "",
    tuoiNam: "",
    nameNu: "",
    tuoiNu: "",
    hanhNgayChon: [],
    namSinhNam: undefined,
    namSinhNu: undefined,
  });
  const [valueAge, setValueAge] = useState({
    namTime: dayjs(new Date()),
    namYear: "",
    namMonth: undefined,
    namDay: "",

    nuTime: dayjs(new Date()),
    nuYear: "",
    nuMonth: undefined,
    nuDay: "",
  });

  const [valueSelect, setValueSelect] = useState("");
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
  });

  const [lunarYearArr, setLunarYearArr] = useState();

  const handleGetPerfectDate = async () => {
    let tuoiChiNam = CHI_NAM[valueAge.namYear % 12];
    let tuoiCanNam = CAN_NAM[valueAge.namYear % 10];
    let namSinhNam = Number(valueAge.namYear);

    let tuoiChiNu = CHI_NAM[valueAge.nuYear % 12];
    let tuoiCanNu = CAN_NAM[valueAge.nuYear % 10];
    let namSinhNu = Number(valueAge.nuYear);
    let dateArr = [];
    if (Number(valueAge.namMonth) <= 2) {
      const sunlong = getSunLongitude(
        jdn(
          Number(valueAge.namDay),
          Number(valueAge.namMonth),
          Number(valueAge.namYear),
          valueAge.namTime?.$H,
          valueAge.namTime?.$m,
          valueAge.namTime.$s
        ),
        7
      );
      if (sunlong <= 20 && sunlong >= 17) {
        tuoiChiNam = CHI_NAM[(valueAge.namYear - 1) % 12];
        tuoiCanNam = CAN_NAM[(valueAge.namYear - 1) % 10];
        namSinhNam--;
      }
    }
    if (Number(valueAge.nuMonth) <= 2) {
      const sunlong = getSunLongitude(
        jdn(
          Number(valueAge.nuDay),
          Number(valueAge.nuMonth),
          Number(valueAge.nuYear),
          valueAge.nuTime?.$H,
          valueAge.nuTime?.$m,
          valueAge.nuTime.$s
        ),
        7
      );
      if (sunlong <= 20 && sunlong >= 17) {
        tuoiChiNu = CHI_NAM[(valueAge.nuYear - 1) % 12];
        tuoiCanNu = CAN_NAM[(valueAge.nuYear - 1) % 10];
        namSinhNu--;
      }
    }

    try {
      dateArr = await enumerateDaysBetweenDates(
        `${moment(dateStart.$d).year()}-${
          moment(dateStart.$d).month() + 1
        }-${moment(dateStart.$d).date()}`,

        `${moment(dateEnd.$d).year()}-${
          moment(dateEnd.$d).month() + 1
        }-${moment(dateEnd.$d).date()}`
      );
    } catch (error) {
      console.log("chon ngay dei");
    }
    let lunarYear = [];
    let arrPerfectDateStep1 = [];
    let arrPerfectDateStep2 = [];
    let arrPerfectDateStep3 = [];
    let arrPerfectDateStep4 = [];
    let arrPerfectDateStep5 = [];
    let arrPerfectDateStep6 = []; // hop hoa ngay/thang
    let arrPerfectDateStep7 = []; // hop hoa ngay/gio
    let arrPerfectDateStep8 = []; // cuoi hoi gio
    let toaNha = valueText.namToa || valueText.nuToa || "";
    let monthInYear = {};
    let checkLeapMonth = false;

    console.log(toaNha, "toaNha");
    // Xac dinh ngay/thang xung toa nxha
    // if (toaNha?.length !== 0)
    if (
      valueSelect !== "ngay-mai-moi" &&
      valueSelect !== "ngay-dang-ki-ket-hon"
    ) {
      await dateArr.map((item, index) => {
        if (!lunarYear.includes(item.yearLunar)) lunarYear.push(item.yearLunar);
        if (
          !CheckTrucXungNgayThangNam(toaNha, item.thangChi) &&
          CheckKimLau(item.yearLunar, namSinhNu).length === 0 &&
          !CheckTrucXungNgayThangNam(
            CHI_NAM[Number(item.yearLunar) % 12],
            CHI_NAM[Number(namSinhNu) % 12]
          ) &&
          CHI_NAM[Number(item.yearLunar) % 12] !==
            CHI_NAM[Number(namSinhNu) % 12] &&
          !CheckThaiTueHinh(
            CHI_NAM[Number(item.yearLunar) % 12],
            CHI_NAM[Number(namSinhNu) % 12]
          ) &&
          //Nam
          !CheckTrucXungNgayThangNam(
            CHI_NAM[Number(item.yearLunar) % 12],
            CHI_NAM[Number(namSinhNam) % 12]
          ) &&
          CHI_NAM[Number(item.yearLunar) % 12] !==
            CHI_NAM[Number(namSinhNam) % 12] &&
          !CheckThaiTueHinh(
            CHI_NAM[Number(item.yearLunar) % 12],
            CHI_NAM[Number(namSinhNam) % 12]
          )
        ) {
          arrPerfectDateStep1.push(item);
        }

        if (!Object.keys(monthInYear).includes(item.yearLunar.toString())) {
          monthInYear[item.yearLunar] = {};
        }
        if (
          !Object.keys(monthInYear[item.yearLunar]).includes(item.monthLunar) &&
          CheckKimLau(item.yearLunar, namSinhNu).length === 0 &&
          !CheckTrucXungNgayThangNam(
            CHI_NAM[Number(item.yearLunar) % 12],
            CHI_NAM[Number(namSinhNu) % 12]
          ) &&
          CHI_NAM[Number(item.yearLunar) % 12] !==
            CHI_NAM[Number(namSinhNu) % 12] &&
          !CheckThaiTueHinh(
            CHI_NAM[Number(item.yearLunar) % 12],
            CHI_NAM[Number(namSinhNu) % 12]
          ) &&
          //Nam
          !CheckTrucXungNgayThangNam(
            CHI_NAM[Number(item.yearLunar) % 12],
            CHI_NAM[Number(namSinhNam) % 12]
          ) &&
          CHI_NAM[Number(item.yearLunar) % 12] !==
            CHI_NAM[Number(namSinhNam) % 12] &&
          !CheckThaiTueHinh(
            CHI_NAM[Number(item.yearLunar) % 12],
            CHI_NAM[Number(namSinhNam) % 12]
          )
        ) {
          if (
            index < dateArr.length &&
            dateArr[index + 1] !== undefined &&
            item.yearLunar !== dateArr[index + 1].yearLunar
          ) {
            checkLeapMonth = false;
          }

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
    } else {
      dateArr.map((item, index) => {
        if (!lunarYear.includes(item.yearLunar)) lunarYear.push(item.yearLunar);
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

        if (
          !Object.keys(monthInYear[item.yearLunar]).includes(item.monthLunar)
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
      arrPerfectDateStep1 = dateArr;
    }

    // Xet Thang
    if (
      valueSelect !== "ngay-mai-moi" &&
      valueSelect !== "ngay-dang-ki-ket-hon"
    ) {
      arrPerfectDateStep1.map((item, index) => {
        if (
          !item.isLeap &&
          !CheckTrucXungChi(CHI_NAM[Number(namSinhNam) % 12], item.thangChi) &&
          !CheckTrucXungChi(CHI_NAM[Number(namSinhNu) % 12], item.thangChi) &&
          //Nu
          !CheckTheChu(CHI_NAM[namSinhNu % 12], item.monthLunar) &&
          !CheckPhuChu(CHI_NAM[namSinhNu % 12], item.monthLunar) &&
          !CheckCongCo(CHI_NAM[namSinhNu % 12], item.monthLunar) &&
          !CheckNhacThan(CHI_NAM[namSinhNu % 12], item.monthLunar)
        ) {
          arrPerfectDateStep2.push(item);
        }
      });
    } else {
      arrPerfectDateStep2 = arrPerfectDateStep1;
    }

    // kiem tra truc/tu
    arrPerfectDateStep2.map((item, ind) => {
      if (
        //   !! || 1 trong 2 pham deu` bi
        //
        Object.keys(ObjectTruc[item.truc].KhongLam).includes(valueSelect) &&
        Object.keys(ObjectTu[item.tu].KhongLam).includes(valueSelect)
        // Object.keys(ObjectTruc[item.truc].CanLam).includes(valueSelect)
      ) {
      } else {
        arrPerfectDateStep3.push(item);
      }
    });
    // Xet ngay
    arrPerfectDateStep3.map((item, index) => {
      if (
        // CheckNguHanhTuongSinh(NGU_HANH[toaNha], NGU_HANH[item.ngayCan]) &&
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
        // Tue Pha
        !CheckTrucXungNgayThangNam(
          CHI_NAM[Number(item.yearLunar) % 12],
          item.ngayChi
        ) &&
        // Dai Hao
        !CheckTrucXungNgayThangNam(
          CHI_NAM[Number(namSinhNam) % 12],
          item.ngayChi
        ) &&
        !CheckTrucXungNgayThangNam(
          CHI_NAM[Number(namSinhNu) % 12],
          item.ngayChi
        ) &&
        // xung,trung,hai tuoi nam
        CheckTuongXungTuongHaiTuoiMonth(
          CHI_NAM[namSinhNam % 12],
          item.ngayChi
        ) === false &&
        // xung,trung,hai tuoi nu

        CheckTuongXungTuongHaiTuoiMonth(
          CHI_NAM[namSinhNu % 12],
          item.ngayChi
        ) === false &&
        CheckNgaySat(item.ngayChi, CHI_NAM[namSinhNu % 12]) === false &&
        CheckNgaySat(item.ngayChi, CHI_NAM[namSinhNam % 12]) === false &&
        CheckHongXaKyNhat(item.monthLunar, item.ngayChi) === false &&
        CheckNghenhHonKyNhat(item.ngayCan + " " + item.ngayChi) === false &&
        CheckNgayNguLy(item.ngayCan + " " + item.ngayChi) === false &&
        CheckCoNhatTuanPhong(item.monthLunar, item.ngayChi) === false &&
        //Thien tai dia hoa
        !CheckThienTaiDiaHoa(item.ngayChi, item.monthLunar) &&
        !CheckDaiBai(
          item.namCan,
          item.monthLunar,
          item.ngayCan + " " + item.ngayChi
        ) &&
        //Duong Cong
        !CheckDuongCong(item.monthLunar, item.dayLunar) &&
        //hoang vu tu quy
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
        // KHong Phong

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
        ].includes(item.ngayChi) &&
        !CheckTamTai(CHI_NAM[namSinhNu % 12], item.ngayChi) &&
        !CheckTamTai(CHI_NAM[namSinhNam % 12], item.ngayChi) &&
        //  &&
        !CheckTrucXungNgayThangNam(toaNha, item.ngayChi)
        // !CheckSinhXuat(NGU_HANH[toaNha], NGU_HANH[item.ngayCan])
      ) {
        arrPerfectDateStep4.push(item);
      }
    });

    // Xet them hop hoa
    if (
      valueSelect === "ngay-cuoi" ||
      valueSelect === "ngay-an-hoi" ||
      valueSelect === "ngay-dam-ngo" ||
      valueSelect === "ngay-lai-mat"
    ) {
      arrPerfectDateStep6 = await handleHopHoaNgayThang(
        arrPerfectDateStep4,
        toaNha
      );
    } else {
      arrPerfectDateStep6 = arrPerfectDateStep4;
    }
    // Chon gio
    console.log(toaNha, "232");
    arrPerfectDateStep6.map((item, ind) => {
      let combineThienCanNgayThang = CombineThienCan(
        item.ngayCan,
        item.thangCan
      );

      let arrHours = CheckTrucXungGioCuoiHoi(
        toaNha,
        item.ngayChi,
        item.thangChi,
        item.monthLunar,
        CHI_NAM[namSinhNam % 12],
        CHI_NAM[namSinhNu % 12],
        valueSelect,
        item.arrGioCan
      );
      arrPerfectDateStep6[ind] = {
        ...item,
        gio: CheckHoangDao(item.ngayChi),
      };

      let gioHoangDaoVar = CheckHoangDao(item.ngayChi);
      let isCheckGioNgayThangWhileCanNgayKhacToaNha = false;
      let arrHoursOke = [];
      let titleCheckGioNgayThang = [];
      // if (combineThienCanNgayThang.length !== 0 && toaNha) {
      if (CheckNguHanhTuongKhac(NGU_HANH[toaNha], NGU_HANH[item.ngayCan])) {
        // if (combineThienCanNgayThang.length !== 0) {
        handleHopHoaGio(
          item,
          arrHours,
          isCheckGioNgayThangWhileCanNgayKhacToaNha,
          arrHoursOke,
          titleCheckGioNgayThang,
          toaNha,
          arrPerfectDateStep5,
          arrPerfectDateStep8
        );
      } else {
        // ty hoa
        if (NGU_HANH[toaNha] === NGU_HANH[item.ngayCan]) {
          arrPerfectDateStep5.push({
            ...item,
            gio: arrHours,
            isTruongHop2BonusHoaHop: undefined,
          });
          if (arrHours.length !== 0) {
            arrPerfectDateStep8.push({
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
            arrPerfectDateStep8.push({
              ...item,
              gio: arrHours,
              isTruongHop2BonusHoaHop: false,
            });
          }
        }
      }
      // if(toaNha?.length===0 || !toaNha)
    });
    // Xet hop hoa ngay/gio
    // arrPerfectDateStep7 = await handleHopHoaNgayGio(arrPerfectDateStep5);
    console.log(arrPerfectDateStep5, "arrPerfectDateStep5");
    arrPerfectDateStep7 = arrPerfectDateStep5;
    // Xac dinh can Chi  Nam/Nu
    setInfoGiaChu({
      ...infoGiaChu,
      tuoiCanChiNam: tuoiCanNam + " " + tuoiChiNam,
      tuoiCanChiNu: tuoiCanNu + " " + tuoiChiNu,
      namSinhNam,
      namSinhNu,
    });
    // Convert  RangeDayInMonthLunar
    setRangeDayInMonthLunar(ConvertToRangeDayInMonthLunar(dateArr));
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
    });
    setLoading(false);
  };
  // const handleHopHoaNgayThang = async (arr, toa) => {
  //   let ArrHopHoa = [];
  //   arr?.map((item, ind) => {
  //     let combineThienCanNgayThang = CombineThienCan(
  //       item.thangCan,
  //       item.ngayCan
  //     );
  //     let combineThienCanNgayNam = CombineThienCan(item.namCan, item.ngayCan);

  //     if (combineThienCanNgayThang.length !== 0) {
  //       if (
  //         !CheckNguHanhTuongKhacKhauQuyet(
  //           NGU_HANH[item.thangChi],
  //           combineThienCanNgayThang
  //         ) &&
  //         !CheckNguHanhTuongKhacKhauQuyet(
  //           NGU_HANH[item.ngayChi],
  //           combineThienCanNgayThang
  //         )
  //       ) {
  //         if (
  //           !CheckNguHanhTuongKhac(NGU_HANH[toa], combineThienCanNgayThang) &&
  //           CheckSinhXuat(NGU_HANH[toa], combineThienCanNgayThang) === false &&
  //           !CheckNguHanhTuongKhac(NGU_HANH[toa], combineThienCanNgayNam) &&
  //           CheckSinhXuat(NGU_HANH[toa], combineThienCanNgayNam) === false
  //         )
  //           ArrHopHoa.push(item);
  //       } else {
  //         if (CheckSinhXuat(NGU_HANH[toa], combineThienCanNgayThang) === false)
  //           ArrHopHoa.push(item);
  //       }
  //     } else {
  //       ArrHopHoa.push(item);
  //     }
  //   });
  //   // return 1;
  //   // console.log(ArrHopHoa, "ArrHopHoa");
  //   return ArrHopHoa;
  // };

  return (
    <div className="flex min-h-screen flex-col items-center  pt-24 bg-white">
      <div
        style={{
          color: "black",
          fontFamily: "cursive",
          fontSize: 20,
          marginBottom: 20,
        }}>
        Xem ngày Cưới hỏi
      </div>
      <div>
        {/* <Button
          variant="contained"
          style={{ backgroundColr: "green" }}
          onClick={() => {
            handleInit();
          }}>
          asdsa
        </Button> */}
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
              setValueText({
                namToa: "",
                nuToa: "",
              });
              setStepShow({
                step1: undefined,
                step2: undefined,
                step3: undefined,
                step4: undefined,
                step5: undefined,
                step6: undefined,
                step7: undefined,
                step8: undefined,
              });
            }}>
            {Object.keys(SERVICE_CUOIHOI).map((key, inex) => {
              return (
                <MenuItem key={Math.random()} value={key}>
                  {SERVICE_CUOIHOI[key]}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <div className="text-black font-sans font-bold">
          <div className="text-xl">NHÂN {">"} THÔNG TIN GIA CHỦ</div>
          {/* NAM */}
          <div className="text-xl mt-4">Nam</div>
          <div>
            <TextField
              value={infoGiaChu.nameNam}
              id="standard-basic"
              label="Họ tên bạn trai"
              placeholder="Nhập họ tên"
              variant="standard"
              style={{
                marginBottom: 10,
                marginLeft: 20,
              }}
              onChange={(e) => {
                setInfoGiaChu({ ...infoGiaChu, nameNam: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-row justify-center mt-3 flex-wrap">
            {valueSelect === "ngay-cuoi" && (
              <FormControl fullWidth style={{ marginLeft: 20, width: 200 }}>
                <InputLabel id="demo-simple-select-label">Toạ nhà</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Toạ nhà"
                  onChange={(e) => {
                    setValueText({
                      namToa: TOA_NHA[e.target.value],
                    });
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
                setValueAge({ ...valueAge, namDay: e.target.value });
              }}
            />
            <FormControl fullWidth style={{ marginLeft: 20, width: 200 }}>
              <InputLabel id="demo-simple-select-label">Tháng</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Tháng"
                onChange={(e) => {
                  setValueAge({ ...valueAge, namMonth: e.target.value });
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
                setValueAge({ ...valueAge, namYear: e.target.value });
              }}
            />
            <TimeField
              label="Giờ/phút/giây"
              format="HH:mm:ss"
              value={valueAge.namTime}
              style={{ marginLeft: 20 }}
              onChange={(e) => {
                setValueAge({ ...valueAge, namTime: e });
              }}
            />
          </div>
          {/* NU */}
          <div className="text-xl mt-4">Nữ</div>
          <div>
            <TextField
              value={infoGiaChu.nameNu}
              id="standard-basic"
              label="Họ tên bạn gái"
              placeholder="Nhập họ tên"
              variant="standard"
              style={{
                marginBottom: 10,
                marginLeft: 20,
              }}
              onChange={(e) => {
                setInfoGiaChu({ ...infoGiaChu, nameNu: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-row justify-center mt-3 flex-wrap">
            {(valueSelect === "ngay-an-hoi" ||
              valueSelect === "ngay-lai-mat" ||
              valueSelect === "ngay-dam-ngo") && (
              <FormControl fullWidth style={{ marginLeft: 20, width: 200 }}>
                <InputLabel id="demo-simple-select-label">Toạ nhà</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Toạ nhà"
                  onChange={(e) => {
                    setValueText({
                      nuToa: TOA_NHA[e.target.value],
                    });
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
                setValueAge({ ...valueAge, nuDay: e.target.value });
              }}
            />
            <FormControl fullWidth style={{ marginLeft: 20, width: 200 }}>
              <InputLabel id="demo-simple-select-label">Tháng</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Tháng"
                onChange={(e) => {
                  setValueAge({ ...valueAge, nuMonth: e.target.value });
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
                setValueAge({ ...valueAge, nuYear: e.target.value });
              }}
            />
            <TimeField
              label="Giờ/phút/giây"
              format="HH:mm:ss"
              value={valueAge.nuTime}
              style={{ marginLeft: 20 }}
              onChange={(e) => {
                setValueAge({ ...valueAge, nuTime: e });
              }}
            />
          </div>
        </div>

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
            handleGetPerfectDate();
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
      <div className="text-black mb-2 font-bold text-lg mt-10 max-w-3xl">
        {lunarYearArr
          ?.map((item) => {
            return (
              " " +
              CAN_NAM[item % 10] +
              " " +
              CHI_NAM[item % 12] +
              " năm " +
              item
            );
          })
          .toString()}
      </div>
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
          <div style={{ marginTop: 30 }}>
            {infoGiaChu.tuoiCanChiNam?.length !== 0 && (
              <>
                <div className="text-black mb-2 font-bold text-lg">
                  Nam tên: {infoGiaChu.nameNam}
                  <div>
                    Tuổi:{" "}
                    <span className="text-[red]">
                      {infoGiaChu.tuoiCanChiNam}
                    </span>{" "}
                    -{" "}
                    {lunarYearArr
                      ?.map((item) => {
                        return (
                          " " +
                          Number(item - valueAge.namYear + 1) +
                          " Vào năm " +
                          item +
                          ""
                        );
                      })
                      .toString()}
                  </div>
                  {valueText?.namToa?.length !== 0 &&
                    valueSelect === "ngay-cuoi" && (
                      <div
                        className="text-black mb-2 font-bold text-lg"
                        style={{
                          color:
                            COLOR_TEXT_NGU_HANH[NGU_HANH[valueText.namToa]],
                        }}>
                        Toạ nhà: {valueText.namToa} (
                        {NGU_HANH[valueText.namToa]})
                        <div className="text-[green] mb-2 font-bold text-lg">
                          Hành ngày chọn:{" "}
                          {NGU_HANH_TUONG_SINH[NGU_HANH[valueText.namToa]]
                            ?.toString()
                            .replaceAll(",", " > ")}
                        </div>
                      </div>
                    )}
                </div>
                <div className="text-black mb-2 font-bold text-lg">
                  Nữ tên: {infoGiaChu.nameNu}
                  <div>
                    Tuổi:{" "}
                    <span className="text-[red]">
                      {infoGiaChu.tuoiCanChiNu}
                    </span>
                    -{" "}
                    {lunarYearArr
                      ?.map((item) => {
                        return (
                          " " +
                          Number(item - valueAge.nuYear + 1) +
                          " Vào năm " +
                          item +
                          ""
                        );
                      })
                      .toString()}
                  </div>
                  {valueText?.nuToa?.length !== 0 &&
                    (valueSelect === "ngay-an-hoi" ||
                      valueSelect === "ngay-lai-mat" ||
                      valueSelect === "ngay-dam-ngo") && (
                      <div
                        className="text-black mb-2 font-bold text-lg"
                        style={{
                          color: COLOR_TEXT_NGU_HANH[NGU_HANH[valueText.nuToa]],
                        }}>
                        Toạ nhà: {valueText.nuToa} ({NGU_HANH[valueText.nuToa]})
                        <div className="text-[green] mb-2 font-bold text-lg">
                          Hành ngày chọn:{" "}
                          {NGU_HANH_TUONG_SINH[NGU_HANH[valueText.nuToa]]
                            ?.toString()
                            .replaceAll(",", " > ")}
                        </div>
                      </div>
                    )}
                </div>
              </>
            )}
          </div>
          {/* Show ket qua */}
          {stepShow.step8?.length !== 0 ? (
            <>
              <div className="text-[24px] font-bold mb-4 text-black">
                Tổng cộng có {stepShow.step8?.length} kết quả{" "}
              </div>
              <div className="max-h-[500px] overflow-scroll px-10 border-2 border-black pb-6">
                {stepShow.step8?.map((item, index) => {
                  return (
                    <>
                      <div className="max-h-[500px] overflow-scroll">
                        <TableResult
                          data={item}
                          infoGiaChu={infoGiaChu}
                          description="cuoi-hoi"
                          valueSelect={valueSelect}
                          toaNha={
                            valueText.namToa || valueText.nuToa
                          }></TableResult>
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
                    ? `Ngày ${dateStart?.$D}/${dateStart?.$M + 1}/${
                        dateStart?.$y
                      } không phù hợp cho công việc, vui lòng chọn ngày khác!`
                    : `Từ ngày ${dateStart?.$D}/${dateStart?.$M + 1}/${
                        dateStart?.$y
                      } đến ngày  ${dateEnd?.$D}/${dateEnd?.$M + 1}/${
                        dateEnd?.$y
                      } không phù hợp cho công việc, vui lòng chọn khoảng khác!`}
                </div>
              )}
            </>
          )}
          {lunarYearArr && (
            <div className="">
              <div
                className="font-bold text-[20px]"
                style={{ color: "black", marginTop: 30 }}>
                Bước 1: Xét Năm {"(Tránh năm kim lâu nữ, thái tuế)"}
                {lunarYearArr && `(${lunarYearArr?.length})`}
              </div>
              <div className="max-h-[500px] overflow-scroll px-10 border-2 border-black mt-2 ">
                <TableWeddingNam
                  data={stepShow.step1}
                  toaNha={valueText.namToa || valueText.nuToa}
                  infoGiaChu={infoGiaChu}
                  lunarYearArr={lunarYearArr || []}
                  valueSelect={valueSelect}></TableWeddingNam>
              </div>
            </div>
          )}
          {arrMonthInYear && (
            <div className="">
              <div
                className="font-bold text-[20px]"
                style={{ color: "black", marginTop: 30 }}>
                Bước 2: Xét Tháng
                {/* {stepShow.step1 && `(${stepShow.step1?.length})`} */}
              </div>
              <div className="max-h-[500px] overflow-scroll px-10 border-2 border-black mt-2 ">
                {/* <TableWeddingThang
                  data={stepShow.step1}
                  toaNha={valueText.namToa || valueText.nuToa}
                  infoGiaChu={infoGiaChu}
                  valueSelect={valueSelect}></TableWeddingThang> */}
                <TableWeddingThangNew
                  data={arrMonthInYear}
                  toaNha={valueText.namToa || valueText.nuToa}
                  infoGiaChu={infoGiaChu}
                  valueSelect={valueSelect}></TableWeddingThangNew>
              </div>
            </div>
          )}
          {stepShow.step2 && (
            <div>
              <div
                className="font-bold text-[20px]"
                style={{ color: "black", marginTop: 30 }}>
                Bước 3:
                {" Kiểm tra Trực/Tú"}
                {stepShow.step2 && `(${stepShow.step2?.length})`}
              </div>

              <div className="max-h-[500px] overflow-scroll px-10 border-2 border-black mt-2 ">
                <TableWeddingTrucTu
                  valueSelect={valueSelect}
                  data={stepShow.step2}
                  infoGiaChu={infoGiaChu}></TableWeddingTrucTu>
              </div>
            </div>
          )}

          {stepShow.step3 && (
            <div>
              <div
                className="font-bold text-[20px]"
                style={{ color: "black", marginTop: 30 }}>
                Bước 4: Xét ngày
                {stepShow.step3 && ` (${stepShow.step3?.length})`}
              </div>
              <div className="max-h-[500px] overflow-scroll  px-10 border-2 border-black mt-2 ">
                <TableWedding
                  valueSelect={valueSelect}
                  data={stepShow.step3}
                  toaNha={valueText.namToa || valueText.nuToa}
                  infoGiaChu={infoGiaChu}></TableWedding>
              </div>
            </div>
          )}

          {valueSelect !== "dao-gieng" &&
            valueSelect !== "lap-gieng" &&
            stepShow.step4 && (
              <div>
                <div
                  className="font-bold text-[20px]"
                  style={{ color: "black", marginTop: 30 }}>
                  Kiểm tra thêm hợp hoá ngày/tháng{" "}
                  {stepShow.step4 && `(${stepShow.step4?.length})`}
                </div>

                <div className="max-h-[500px] overflow-scroll px-10 border-2 border-black mt-2 ">
                  <TableWedding
                    valueSelect={valueSelect}
                    data={stepShow.step4}
                    infoGiaChu={infoGiaChu}
                    toaNha={valueText.namToa || valueText.nuToa}
                    checkHopHoa={true}></TableWedding>
                </div>
              </div>
            )}

          {stepShow.step6 && (
            <div>
              <div
                className="font-bold text-[20px]"
                style={{ color: "black", marginTop: 30 }}>
                Bước 5:
                {" Chọn giờ "}
                {stepShow.step6 && `(${stepShow.step6?.length})`}
              </div>

              <div className="max-h-[500px] overflow-scroll px-10 border-2 border-black mt-2 ">
                <TableWedding
                  valueSelect={valueSelect}
                  data={stepShow.step6}
                  infoGiaChu={infoGiaChu}
                  toaNha={valueText.namToa || valueText.nuToa}
                  checkHopHoa={true}></TableWedding>
              </div>
            </div>
          )}
          {valueSelect !== "dao-gieng" &&
            valueSelect !== "lap-gieng" &&
            stepShow.step7 && (
              <div>
                <div
                  className="font-bold text-[20px]"
                  style={{ color: "black", marginTop: 30 }}>
                  Kiểm tra thêm hợp hoá ngày/giờ{" "}
                  {stepShow.step7 && `(${stepShow.step7?.length})`}
                </div>

                <div className="max-h-[500px] overflow-scroll px-10 border-2 border-black mt-2 ">
                  <TableWedding
                    valueSelect={valueSelect}
                    data={stepShow.step7}
                    infoGiaChu={infoGiaChu}></TableWedding>
                </div>
              </div>
            )}
          {stepShow.step8 && (
            <div>
              <div
                className="font-bold text-[20px]"
                style={{ color: "black", marginTop: 30 }}>
                Bước 6: Loại bỏ những ngày không có giờ
                {stepShow.step8 && `(${stepShow.step8?.length})`}
              </div>
              <div className="max-h-[500px] overflow-scroll px-10 border-2 border-black mt-2 ">
                <TableWedding
                  valueSelect={valueSelect}
                  data={stepShow.step8}
                  infoGiaChu={infoGiaChu}></TableWedding>
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
