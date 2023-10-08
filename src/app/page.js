"use client";

import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import {
  DatePicker,
  StaticDatePicker,
  StaticDateTimePicker,
  StaticTimePicker,
  TimeField,
  TimePicker,
} from "@mui/x-date-pickers";
import Image from "next/image";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import moment from "moment";
import {
  CAN_NAM,
  CHI_NAM,
  CHI_NGAY,
  NGUYET_KY,
  NGUYET_PHA,
  NGU_HANH,
  NGU_HANH_TUONG_SINH,
  ObjectTruc,
  ObjectTu,
  SAT_CHU_AM,
  SAT_CHU_DUONG,
  TAM_NUONG,
  THO_TU,
  VANG_VONG,
} from "@Root/script/Constant";
import {
  CheckHoangDao,
  CheckHoangOc,
  CheckKimLau,
  CheckNguHanhTuongSinh,
  CheckTamTai,
  CheckTrucXungGio,
  CheckTrucXungNgayThangNam,
  CheckTrucXungTuoi,
  CheckTuongXungTuongHaiTuoi,
  getCanChi,
} from "@Root/script/handleDateChange";
import TableShow from "./Table";
import dayjs from "dayjs";
import { getSunLongitude, jdn } from "@Root/script/AmLich";
const SERVICE_XAYDUNG = {
  "trong-cay": "Trồng cây",
  "khoi-cong": "Khởi công",
  "sua-chua": "Sửa chữa",
  "pha-do": "Phá dỡ",
  "dong-tho": "Động thổ",
  "do-mong": "Đổ móng",
  "do-mai": "Đổ mái",
  "cat-noc": "Cất nóc",
  "mo-cong": "Mở cổng",
  "boi-hoan-long-mach": "Bồi hoàn long mạch",
  "nhap-trach": "Nhập trạch",
  "ta-dat": "Tạ đất",
  "khanh-thanh": "Khánh thành",
  "khai-truong": "Khai trương",
  "mo-cua-hang": "Mở cửa hàng",
  "chuyen-nha": "Chuyển nhà",
  "ban-nha": "Bán nhà",
  "dap-dap": "Đắp đập",
  "ngan-de": "Ngăn đê",
  "dao-gieng": "Đào giếng",
  "lap-gieng": "Lắp giếng",
};
const MONTHS = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];
const TOA_NHA = [
  "Tý",
  "Sửu",
  "Dần",
  "Mão",
  "Thìn",
  "Tỵ",
  "Ngọ",
  "Mùi",
  "Thân",
  "Dậu",
  "Tuất",
  "Hợi",
  "Giáp",
  "Ất",
  "Bính",
  "Đinh",
  "Canh",
  "Tân",
  "Nhâm",
  "Quý",
  "Cấn",
  "Tốn",
  "Khôn",
  "Càn",
];
const ColorText = {
  Hoả: "red",
  Mộc: "green",
  Kim: "#f2ca02",
  Thuỷ: "blue",
  Thổ: "brown",
};
export default function Home() {
  const [loading, setLoading] = useState(false);
  const [dateStart, setDateStart] = useState();
  const [dateEnd, setDateEnd] = useState();
  const [valueText, setValueText] = useState("");
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
  const [valueAgeBorrow, setValueAgeBorrow] = useState(1);
  const [valueBuildHome, setValueBuildHome] = useState("");
  const [valueSelect, setValueSelect] = useState("");
  const [isMuonTuoi, setIsMuonTuoi] = useState(false);

  const [step1, setDataStep1] = useState();
  const [step2, setDataStep2] = useState();
  const [step3, setDataStep3] = useState();
  const [step4, setDataStep4] = useState();
  const [step5, setDataStep5] = useState();
  const handleGetPerfectDate = async () => {
    console.log(
      {
        dateStart,
        dateEnd,
        valueText,
        valueAge,
        valueAgeBorrow,
        valueBuildHome,
        valueSelect,
        isMuonTuoi,
      },
      "adsas"
    );
    let tuoiChiGiaChu = CHI_NAM[valueAge.year % 12];
    let tuoiCanGiaChu = CAN_NAM[valueAge.year % 10];
    let tuoiGiaChu = Number(valueAge.year);
    if (Number(valueAge.month) <= 2 && Number(valueAge.day) < 5) {
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
      if (sunlong === 20) {
        tuoiChiGiaChu = CHI_NAM[(valueAge.year - 1) % 12];
        tuoiCanGiaChu = CAN_NAM[(valueAge.year - 1) % 10];
        tuoiGiaChu--;
      }
    }
    console.log(tuoiGiaChu, "tuoiGiaChu");
    // Xac dinh can Chi gia chu
    setInfoGiaChu({
      ...infoGiaChu,
      tuoi: tuoiCanGiaChu + " " + tuoiChiGiaChu,
      tuoiGiaChu: tuoiGiaChu,
    });

    setLoading(true);
    let dateArr = await enumerateDaysBetweenDates(
      `${moment(dateStart.$d).year()}-${
        moment(dateStart.$d).month() + 1
      }-${moment(dateStart.$d).date()}`,

      `${moment(dateEnd.$d).year()}-${moment(dateEnd.$d).month() + 1}-${moment(
        dateEnd.$d
      ).date()}`
    );
    let arrPerfectDate = [];
    const arrPerfectDateStep1 = [];
    let arrPerfectDateStep2 = [];
    let arrPerfectDateStep3 = [];
    let arrPerfectDateStep4 = [];
    let arrPerfectDateStep5 = [];
    dateArr.map((item, index) => {
      if (
        !CheckTrucXungNgayThangNam(valueText, item.ngayChi) &&
        !CheckTrucXungNgayThangNam(valueText, item.thangChi) &&
        CheckNguHanhTuongSinh(
          NGU_HANH[valueText],
          NGU_HANH[dateArr[index].ngayCan]
        ) &&
        CheckNguHanhTuongSinh(
          NGU_HANH[valueText],
          NGU_HANH[dateArr[index].thangCan]
        )
      ) {
        arrPerfectDateStep1.push(item);
      }
    });
    setDataStep1(arrPerfectDateStep1);

    arrPerfectDateStep1.map((item, index) => {
      if (
        item.dayLunar !== 1 &&
        item.dayLunar !== 15 &&
        !NGUYET_KY.includes(item.dayLunar) &&
        !TAM_NUONG.includes(item.dayLunar) &&
        THO_TU[item.monthLunar - 1] !== item.ngayChi &&
        SAT_CHU_AM[item.monthLunar - 1] !== item.ngayChi &&
        SAT_CHU_DUONG[item.monthLunar - 1] !== item.ngayChi &&
        VANG_VONG[item.monthLunar - 1] !== item.ngayChi &&
        NGUYET_PHA[item.monthLunar - 1] !== item.ngayChi &&
        !CheckTrucXungNgayThangNam(
          CHI_NAM[moment().year() % 12],
          item.ngayChi
        ) &&
        !CheckTrucXungNgayThangNam(
          CHI_NAM[Number(tuoiGiaChu) % 12],
          item.ngayChi
        )
      ) {
        arrPerfectDateStep2.push(item);
      }
    });
    setDataStep2(arrPerfectDateStep2);
    arrPerfectDateStep2.forEach((item, inex) => {
      if (
        CheckTuongXungTuongHaiTuoi(CHI_NAM[tuoiGiaChu % 12], item.ngayChi) ===
          false &&
        CheckTuongXungTuongHaiTuoi(CHI_NAM[tuoiGiaChu % 12], item.thangChi) ===
          false
      ) {
        arrPerfectDateStep3.push(item);
      }
    });

    setDataStep3(arrPerfectDateStep3);

    arrPerfectDateStep3.map((item, ind) => {
      if (
        !Object.keys(ObjectTruc[item.truc].KhongLam).includes(valueSelect)
        //  &&!Object.keys(ObjectTu[item.tu].KhongLam).includes(valueSelect)
      ) {
        console.log(valueSelect);
        arrPerfectDateStep4.push(item);
      }
    });

    setDataStep4(arrPerfectDateStep4);

    // Chon gio
    arrPerfectDateStep4.map((item, ind) => {
      arrPerfectDateStep5.push({
        ...item,
        gio: CheckTrucXungGio(
          valueText,
          item.ngayChi,
          item.thangChi,
          CHI_NAM[tuoiGiaChu % 12],
          item.monthLunar
        ),
        gioHoangDao: CheckHoangDao(item.ngayChi),
      });
    });
    // console.log(arrPerfectDateStep5, "arrPerfectDateStep5");

    setDataStep5(arrPerfectDateStep5);
    setLoading(false);
  };
  const handleGetPerfectDateDongTho = async () => {
    setLoading(true);
    let dateArr = await enumerateDaysBetweenDates(
      `${moment(dateStart.$d).year()}-${
        moment(dateStart.$d).month() + 1
      }-${moment(dateStart.$d).date()}`,

      `${moment(dateEnd.$d).year()}-${moment(dateEnd.$d).month() + 1}-${moment(
        dateEnd.$d
      ).date()}`
    );
    let arrPerfectDate = [];
    const arrPerfectDateStep1 = [];
    let arrPerfectDateStep2 = [];
    let arrPerfectDateStep3 = [];
    let arrPerfectDateStep4 = [];
    let arrPerfectDateStep5 = [];
    dateArr.map((item, index) => {
      if (
        !CheckTrucXungNgayThangNam(valueText, item.ngayChi) &&
        !CheckTrucXungNgayThangNam(valueText, item.thangChi) &&
        CheckNguHanhTuongSinh(
          NGU_HANH[valueText],
          NGU_HANH[dateArr[index].ngayCan]
        ) &&
        CheckNguHanhTuongSinh(
          NGU_HANH[valueText],
          NGU_HANH[dateArr[index].thangCan]
        )
      ) {
        arrPerfectDateStep1.push(item);
      }
    });

    setDataStep1(arrPerfectDateStep1);
    arrPerfectDateStep1.map((item, index) => {
      if (
        !NGUYET_KY.includes(item.dayLunar) &&
        !TAM_NUONG.includes(item.dayLunar) &&
        THO_TU[item.monthLunar - 1] !== item.ngayChi &&
        SAT_CHU_AM[item.monthLunar - 1] !== item.ngayChi &&
        SAT_CHU_DUONG[item.monthLunar - 1] !== item.ngayChi &&
        VANG_VONG[item.monthLunar - 1] !== item.ngayChi &&
        NGUYET_PHA[item.monthLunar - 1] !== item.ngayChi &&
        !CheckTrucXungNgayThangNam(
          CHI_NAM[moment().year() % 12],
          item.ngayChi
        ) &&
        !CheckTrucXungNgayThangNam(CHI_NAM[valueAge % 12], item.ngayChi)
      ) {
        arrPerfectDateStep2.push(item);
      }
    });
    setDataStep2(arrPerfectDateStep2);
    arrPerfectDateStep2.forEach((item, inex) => {
      if (
        !CheckTuongXungTuongHaiTuoi(CHI_NAM[valueAge % 12], item.ngayChi) &&
        !CheckTuongXungTuongHaiTuoi(CHI_NAM[valueAge % 12], item.thangChi)
      ) {
        console.log(CHI_NAM[valueAge % 12], item.thangChi, "nam thang chi");
        arrPerfectDateStep3.push(item);
      }
    });
    setDataStep3(arrPerfectDateStep3);

    arrPerfectDateStep3.map((item, ind) => {
      if (ObjectTruc[item.CanLam][valueSelect] !== undefined) {
        arrPerfectDateStep4.push(item);
      }
    });
    setDataStep4(arrPerfectDateStep4);

    // check dong tho
    arrPerfectDateStep4.forEach((item, inex) => {
      if (
        !CheckKimLau(valueBuildHome, valueAge) &&
        !CheckHoangOc(valueAge) &&
        !CheckTamTai(valueText, item.namChi)
      ) {
        if (!isMuonTuoi) {
          arrPerfectDateStep5.push(item);
        } else {
          if (
            !CheckTrucXungTuoi(
              CHI_NAM[valueAge % 12],
              CHI_NAM[valueAgeBorrow % 12]
            )
          ) {
            arrPerfectDateStep5.push(item);
          }
        }
      }
    });
    setDataStep5(arrPerfectDateStep5);
    setLoading(false);
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
        Xem ngày phong thuỷ
      </div>
      <div>
        <FormControl fullWidth style={{ marginBottom: 20 }}>
          <InputLabel id="demo-simple-select-label">
            Chọn việc cần xem
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label=" Chọn việc cần xem"
            onChange={(e) => {
              setValueSelect(e.target.value);
            }}>
            {Object.keys(SERVICE_XAYDUNG).map((key, inex) => {
              return (
                <MenuItem key={inex * 100 + Math.random(0, 100)} value={key}>
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
                // visibility:  "visible" ,
              }}
              onChange={(e) => {
                setInfoGiaChu({ ...infoGiaChu, name: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-row justify-center mt-3">
            {valueSelect === "dong-tho" && (
              <TextField
                id="standard-basic"
                label="Năm làm nhà"
                type={"number"}
                placeholder="Nhập năm làm nhà"
                variant="standard"
                style={{ marginBottom: 10 }}
                onChange={(e) => {
                  setValueBuildHome(e.target.value);
                }}
              />
            )}
            {/* <TextField
              error={
                valueText.length !== 0
                  ? !Object.keys(NGU_HANH).includes(valueText)
                  : false
              }
              id="standard-basic"
              label="Toạ nhà"
              placeholder="Nhập toạ nhà"
              variant="standard"
              style={{ marginBottom: 10, marginLeft: 20 }}
              onChange={(e) => {
                setValueText(e.target.value);
              }}
              helperText={
                valueText.length !== 0
                  ? Object.keys(NGU_HANH).includes(valueText)
                    ? ""
                    : "Toạ nhà không hợp lệ. Ví dụ: Tý, Sửu, Bính, Đinh,..."
                  : ""
              }
            /> */}

            <FormControl fullWidth style={{ marginLeft: 20, width: 200 }}>
              <InputLabel id="demo-simple-select-label">Toạ nhà</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                label="Toạ nhà"
                onChange={(e) => {
                  setValueText(TOA_NHA[e.target.value]);
                }}>
                {TOA_NHA.map((key, inex) => {
                  return (
                    <MenuItem
                      key={inex * 100 + Math.random(0, 100)}
                      value={inex}>
                      {key}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <TextField
              type={"number"}
              id="standard-basic"
              label="Ngày"
              placeholder="Ngày"
              variant="standard"
              style={{ marginBottom: 10, marginLeft: 20 }}
              onChange={(e) => {
                setValueAge({ ...valueAge, day: e.target.value });
              }}
            />
            <FormControl fullWidth style={{ marginLeft: 20, width: 200 }}>
              <InputLabel id="demo-simple-select-label">Tháng</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                label="Tháng"
                onChange={(e) => {
                  setValueAge({ ...valueAge, month: e.target.value });
                }}>
                {MONTHS.map((key, inex) => {
                  return (
                    <MenuItem
                      key={inex * 100 + Math.random(0, 100)}
                      value={inex + 1}>
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
              style={{ marginBottom: 10, marginLeft: 20 }}
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

        <div>
          <div
            style={{ color: "black" }}
            className="flex flex-row items-center ">
            <div>Tuổi mượn</div>
            <Switch
              color="warning"
              onChange={() => {
                setIsMuonTuoi(!isMuonTuoi);
              }}
            />
            <TextField
              type={"number"}
              id="standard-basic"
              label="Tuổi"
              placeholder="Nhập tuổi mượn"
              variant="standard"
              style={{
                marginBottom: 10,
                marginLeft: 20,
                visibility: isMuonTuoi ? "visible" : "hidden",
              }}
              onChange={(e) => {
                setValueAgeBorrow(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between w-[60%]">
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
      <div className="flex flex-row justify-center mt-3">
        <Button
          onClick={() => {
            if (valueSelect === "dong-tho") {
              return handleGetPerfectDateDongTho();
            }
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

      <div style={{ marginTop: 30 }}>
        {" "}
        NGU_HANH[valueText],
        {infoGiaChu.tuoi.length !== 0 && (
          <>
            <div className="text-black mb-2 font-bold text-lg">
              Gia chủ tên: {infoGiaChu.name}, tuổi: {infoGiaChu.tuoi}
            </div>
            <div
              className="text-black mb-2 font-bold text-lg"
              style={{
                color: ColorText[NGU_HANH[valueText]],
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
        <div style={{ color: "black" }}>
          Sau bước 1 {"(Tránh ngày, tháng xung toạ)"}
          {step1 && `(${step1?.length})`}
        </div>
        <TableShow data={step1} infoGiaChu={infoGiaChu}></TableShow>
      </div>
      <div>
        <div style={{ color: "black", marginTop: 30 }}>
          Sau bước 2 {"(Tránh bách kỵ)"}
          {step2 && `(${step2?.length})`}
        </div>
        <TableShow data={step2} infoGiaChu={infoGiaChu}></TableShow>
      </div>
      <div>
        <div style={{ color: "black", marginTop: 30 }}>
          Sau bước 3 {"(Tránh tương xung tương hại với tuổi gia chủ)"}{" "}
          {step3 && `(${step3?.length})`}
        </div>
        <TableShow data={step3} infoGiaChu={infoGiaChu}></TableShow>
      </div>
      <div>
        <div style={{ color: "black", marginTop: 30 }}>
          Sau bước 4 {"Kiểm tra Trực/Tú"}
          {step4 && `(${step4?.length})`}
        </div>
        <TableShow data={step4} infoGiaChu={infoGiaChu}></TableShow>
      </div>
      <div>
        <div style={{ color: "black", marginTop: 30 }}>
          Sau bước 5{" "}
          {"Chọn giờ tránh xung với chi toạ, ngày, tháng, tuổi gia chủ "}
        </div>
        <TableShow data={step5} infoGiaChu={infoGiaChu}></TableShow>
      </div>
      {valueSelect === "dong-tho" && (
        <div>
          <div style={{ color: "black", marginTop: 30 }}>
            Sau bước 5 khi chọn việc động thổ{" "}
            {"(Tránh Kim Lâu, Hoang Ốc, Tam Tai"}
          </div>
          <TableShow data={step5}></TableShow>
        </div>
      )}

      <div style={{ height: 200 }}></div>
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
