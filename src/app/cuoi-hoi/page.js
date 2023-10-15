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
import TableWedding from "@Root/components/TableWedding";
import TableWeddingNam from "@Root/components/TableWeddingNam";
import TableWeddingThang from "@Root/components/TableWeddingThang";
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
  NGU_HANH_TUONG_SINH,
  ObjectTruc,
  ObjectTu,
  SAT_CHU_AM,
  SAT_CHU_DUONG,
  SERVICE_CUOIHOI,
  SERVICE_XAYDUNG,
  TAM_NUONG,
  THO_TU,
  TOA_NHA,
  VANG_VONG,
} from "@Root/script/Constant";
import {
  CheckCongCo,
  CheckCoNhatTuanPhong,
  CheckDaiBai,
  CheckDaiLoi,
  CheckDuongCong,
  CheckHoangDao,
  CheckHoangOc,
  CheckHongXaKyNhat,
  CheckKimLau,
  CheckKimLauNu,
  CheckNgaySat,
  CheckNghenhHonKyNhat,
  CheckNguHanhTuongKhac,
  CheckNguHanhTuongKhacKhauQuyet,
  CheckNguHanhTuongSinh,
  CheckNhacThan,
  CheckPhuChu,
  CheckTamTai,
  CheckThaiTueHinh,
  CheckThaiTueTrucXungHinh,
  CheckTheChu,
  CheckThienTaiDiaHoa,
  CheckTieuLoi,
  CheckTrucXungGio,
  CheckTrucXungGioCuoiHoi,
  CheckTrucXungGioKhongToa,
  CheckTrucXungNgayThangNam,
  CheckTrucXungTyHoa,
  CheckTuongXungTuongHaiTuoi,
  CheckTuongXungTuongHaiTuoiKhongToa,
  CheckTuongXungTuongHaiTuoiMonth,
  CombineThienCan,
  getCanChi,
  GetHoangVuTuQuy,
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
  const [valueText, setValueText] = useState({
    namToa: "",
    nuToa: "",
  });
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

  const [bonusConditionBuilding, setBonusConditionBuilding] = useState({
    TamTai: [],
    KimLau: [],
    HoangOc: [],
    descriptionHoangOc: [],
  });

  const [valueSelect, setValueSelect] = useState("");
  const [isMuonTuoi, setIsMuonTuoi] = useState(false);

  const [step1, setDataStep1] = useState();
  const [step2, setDataStep2] = useState();
  const [step3, setDataStep3] = useState();
  const [step4, setDataStep4] = useState();
  const [step5, setDataStep5] = useState();
  const [step6, setDataStep6] = useState();
  const [step7, setDataStep7] = useState();
  const [step8, setDataStep8] = useState();
  const [lunarYearArr, setLunarYearArr] = useState([]);

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
    // Xac dinh can Chi  Nam/Nu
    setInfoGiaChu({
      ...infoGiaChu,
      tuoiCanChiNam: tuoiCanNam + " " + tuoiChiNam,
      tuoiCanChiNu: tuoiCanNu + " " + tuoiChiNu,
      namSinhNam,
      namSinhNu,
    });
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
    let toaNha = valueText.namToa || valueText.nuToa || "";
    // Xac dinh ngay/thang xung toa nxha
    // if (toaNha?.length !== 0)
    await dateArr.map((item, index) => {
      if (!lunarYear.includes(item.yearLunar)) lunarYear.push(item.yearLunar);
      if (
        // !CheckTrucXungNgayThangNam(toaNha, item.ngayChi) &&
        // !CheckTrucXungNgayThangNam(toaNha, item.thangChi) &&
        // CheckNguHanhTuongSinh(
        //   NGU_HANH[toaNha],
        //   NGU_HANH[dateArr[index].ngayCan]
        // ) &&
        // CheckNguHanhTuongSinh(
        //   NGU_HANH[toaNha],
        //   NGU_HANH[dateArr[index].thangCan]
        // )
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
    });
    setLunarYearArr(lunarYear);

    setDataStep1(arrPerfectDateStep1);
    // Xet Thang
    arrPerfectDateStep1.map((item, index) => {
      if (
        !CheckTrucXungTyHoa(CHI_NAM[Number(namSinhNam) % 12], item.thangChi) &&
        !CheckTrucXungTyHoa(CHI_NAM[Number(namSinhNu) % 12], item.thangChi) &&
        //Nu
        !CheckTheChu(CHI_NAM[namSinhNu % 12], item.monthLunar) &&
        !CheckPhuChu(CHI_NAM[namSinhNu % 12], item.monthLunar) &&
        !CheckCongCo(CHI_NAM[namSinhNu % 12], item.monthLunar) &&
        !CheckNhacThan(CHI_NAM[namSinhNu % 12], item.monthLunar)
      ) {
        arrPerfectDateStep2.push(item);
      }
    });
    setDataStep2(arrPerfectDateStep2);
    // Xet ngay

    arrPerfectDateStep2.map((item, index) => {
      if (
        CheckNguHanhTuongSinh(NGU_HANH[toaNha], NGU_HANH[item.ngayCan]) &&
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
        !CheckTamTai(CHI_NAM[namSinhNam % 12], item.ngayChi)
      ) {
        arrPerfectDateStep3.push(item);
      }
    });
    setDataStep3(arrPerfectDateStep3);
    // Xet them hop hoa
    if (
      valueSelect === "ngay-cuoi" ||
      valueSelect === "ngay-an-hoi" ||
      valueSelect === "ngay-dam-ngo" ||
      valueSelect === "ngay-lai-mat"
    ) {
      arrPerfectDateStep6 = await handleHopHoaNgayThang(arrPerfectDateStep3);
      setDataStep6(arrPerfectDateStep6);
    } else {
      arrPerfectDateStep6 = arrPerfectDateStep3;
      setDataStep6(arrPerfectDateStep6);
    }

    // kiem tra truc/tu
    arrPerfectDateStep6.map((item, ind) => {
      if (
        //   !! || 1 trong 2 pham deu` bi
        //
        Object.keys(ObjectTruc[item.truc].CanLam).includes(valueSelect)
        //  &&
        // Object.keys(ObjectTu[item.tu].KhongLam).includes(valueSelect)
      ) {
        arrPerfectDateStep4.push(item);
      }
    });

    setDataStep4(arrPerfectDateStep4);

    // Chon gio
    arrPerfectDateStep4.map((item, ind) => {
      arrPerfectDateStep5.push({
        ...item,
        gio: CheckTrucXungGioCuoiHoi(
          toaNha,
          item.ngayChi,
          item.thangChi,
          item.monthLunar,
          CHI_NAM[namSinhNam % 12],
          CHI_NAM[namSinhNu % 12],
          valueSelect
        ),
        gioHoangDao: CheckHoangDao(item.ngayChi),
      });
    });
    console.log(arrPerfectDateStep5, "arrPerfectDateStep5");
    setDataStep5(arrPerfectDateStep5);

    // Xet hop hoa ngay/gio
    arrPerfectDateStep7 = await handleHopHoaNgayGio(arrPerfectDateStep5);
    setDataStep7(arrPerfectDateStep7);

    setLoading(false);
  };

  const handleHopHoaNgayThang = async (arr, toa) => {
    let ArrHopHoa = [];
    let toaNha = valueText.namToa || valueText.nuToa;
    // console.log(first)
    arr?.map((item, ind) => {
      let combineThienCanNgayThang = CombineThienCan(
        item.thangCan,
        item.ngayCan
      );

      if (combineThienCanNgayThang.length !== 0 && toaNha) {
        if (
          !CheckNguHanhTuongKhacKhauQuyet(
            NGU_HANH[item.thangChi],
            combineThienCanNgayThang
          ) &&
          !CheckNguHanhTuongKhacKhauQuyet(
            NGU_HANH[item.ngayChi],
            combineThienCanNgayThang
          )
        ) {
          if (
            !CheckNguHanhTuongKhac(NGU_HANH[toaNha], combineThienCanNgayThang)
          )
            ArrHopHoa.push(item);
        } else {
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
  const handleHopHoaNgayGio = async (arr, toa) => {
    return arr;
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
        Xem ngày Cưới hỏi
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
              setValueText({
                namToa: "",
                nuToa: "",
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
              label="Họ tên gia chủ"
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
              label="Họ tên gia chủ"
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
          .map((item) => {
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
      <div style={{ marginTop: 30, maxWidth: 500 }}>
        {infoGiaChu.tuoiCanChiNam?.length !== 0 && (
          <>
            <div className="text-black mb-2 font-bold text-lg">
              Nam tên: {infoGiaChu.nameNam}
              <div>
                Tuổi:{" "}
                <span className="text-[red]">{infoGiaChu.tuoiCanChiNam}</span> -{" "}
                {lunarYearArr
                  .map((item) => {
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
                      color: COLOR_TEXT_NGU_HANH[NGU_HANH[valueText.namToa]],
                    }}>
                    Toạ nhà: {valueText.namToa} ({NGU_HANH[valueText.namToa]})
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
                <span className="text-[red]">{infoGiaChu.tuoiCanChiNu}</span>-{" "}
                {lunarYearArr
                  .map((item) => {
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
      <div className="">
        <div
          className="font-bold text-[20px]"
          style={{ color: "black", marginTop: 30 }}>
          Bước 1: Xét Năm {"(Tránh năm kim lâu nữ, thái tuế)"}
          {lunarYearArr && `(${lunarYearArr?.length})`}
        </div>
        <div className="max-h-[500px] overflow-scroll">
          <TableWeddingNam
            data={step1}
            toaNha={valueText.namToa || valueText.nuToa}
            infoGiaChu={infoGiaChu}
            lunarYearArr={lunarYearArr}
            valueSelect={valueSelect}></TableWeddingNam>
        </div>
      </div>
      <div className="">
        <div
          className="font-bold text-[20px]"
          style={{ color: "black", marginTop: 30 }}>
          Bước 2: Xét Tháng
          {step1 && `(${step1?.length})`}
        </div>
        <div className="max-h-[500px] overflow-scroll">
          <TableWeddingThang
            data={step1}
            toaNha={valueText.namToa || valueText.nuToa}
            infoGiaChu={infoGiaChu}
            valueSelect={valueSelect}></TableWeddingThang>
        </div>
      </div>
      <div>
        <div
          className="font-bold text-[20px]"
          style={{ color: "black", marginTop: 30 }}>
          Bước 3: Xét ngày{step2 && ` (${step2?.length})`}
        </div>
        <div className="max-h-[500px] overflow-scroll">
          <TableWedding
            valueSelect={valueSelect}
            data={step2}
            toaNha={valueText.namToa || valueText.nuToa}
            infoGiaChu={infoGiaChu}></TableWedding>
        </div>
      </div>

      {valueSelect !== "dao-gieng" && valueSelect !== "lap-gieng" && (
        <div>
          <div
            className="font-bold text-[20px]"
            style={{ color: "black", marginTop: 30 }}>
            Kiểm tra thêm hợp hoá ngày/tháng {step6 && `(${step6?.length})`}
          </div>

          <div className="max-h-[500px] overflow-scroll">
            <TableWedding
              valueSelect={valueSelect}
              data={step6}
              infoGiaChu={infoGiaChu}></TableWedding>
          </div>
        </div>
      )}

      <div>
        <div
          className="font-bold text-[20px]"
          style={{ color: "black", marginTop: 30 }}>
          bước{" "}
          {valueSelect !== "dao-gieng" && valueSelect !== "lap-gieng"
            ? "4"
            : "3"}{" "}
          {"Kiểm tra Trực/Tú"}
          {step4 && `(${step4?.length})`}
        </div>

        <div className="max-h-[500px] overflow-scroll">
          <TableWedding
            valueSelect={valueSelect}
            data={step4}
            infoGiaChu={infoGiaChu}></TableWedding>
        </div>
      </div>
      <div>
        <div
          className="font-bold text-[20px]"
          style={{ color: "black", marginTop: 30 }}>
          bước{" "}
          {valueSelect !== "dao-gieng" && valueSelect !== "lap-gieng"
            ? "5"
            : "4"}{" "}
          {"Chọn giờ tránh xung với chi toạ, ngày, tháng, tuổi gia chủ "}
        </div>

        <div className="max-h-[500px] overflow-scroll">
          <TableWedding
            valueSelect={valueSelect}
            data={step5}
            infoGiaChu={infoGiaChu}></TableWedding>
        </div>
      </div>
      {valueSelect !== "dao-gieng" && valueSelect !== "lap-gieng" && (
        <div>
          <div
            className="font-bold text-[20px]"
            style={{ color: "black", marginTop: 30 }}>
            Kiểm tra thêm hợp hoá ngày/giờ {step7 && `(${step7?.length})`}
          </div>

          <div className="max-h-[500px] overflow-scroll">
            <TableWedding
              valueSelect={valueSelect}
              data={step7}
              infoGiaChu={infoGiaChu}></TableWedding>
          </div>
        </div>
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
