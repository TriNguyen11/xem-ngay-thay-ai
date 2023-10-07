"use client";

import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import Image from "next/image";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import moment from "moment";
import {
  CHI_NAM,
  CHI_NGAY,
  NGUYET_KY,
  NGUYET_PHA,
  NGU_HANH,
  ObjectTruc,
  ObjectTu,
  SAT_CHU_AM,
  SAT_CHU_DUONG,
  TAM_NUONG,
  THO_TU,
  VANG_VONG,
} from "@Root/script/Constant";
import {
  CheckHoangOc,
  CheckKimLau,
  CheckNguHanhTuongSinh,
  CheckTamTai,
  CheckTrucXungNgayThangNam,
  CheckTuongXungTuongHaiTuoi,
  getCanChi,
} from "@Root/script/handleDateChange";
import TableShow from "./Table";
const SERVICE_XAYDUNG = {
  "khoi-cong": "Khởi công",
  "sua-chua": "Sửa chữa",
  "pha-do": "Phá dỡ",
  "dong-tho": "Động thổ",
  "do-mong": "Đổ móng",
  "khoi-cong": "Khởi công",
};
export default function Home() {
  const [loading, setLoading] = useState(false);
  const [dateStart, setDateStart] = useState();
  const [dateEnd, setDateEnd] = useState();
  const [valueText, setValueText] = useState("");
  const [valueAge, setValueAge] = useState(1);
  const [valueBuildHome, setValueBuildHome] = useState("");
  const [valueSelect, setValueSelect] = useState("");

  const [step1, setDataStep1] = useState();
  const [step2, setDataStep2] = useState();
  const [step3, setDataStep3] = useState();
  const [step4, setDataStep4] = useState();
  const [step5, setDataStep5] = useState();

  const handleGetPerfectDate = async () => {
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
      if (!CheckTuongXungTuongHaiTuoi(CHI_NAM[valueAge % 12], item.ngayChi)) {
        arrPerfectDateStep3.push(item);
      }
    });
    setDataStep3(arrPerfectDateStep3);

    arrPerfectDateStep3.map((item, ind) => {
      if (
        Object.keys(ObjectTruc[item.truc].CanLam).includes(valueSelect) ||
        Object.keys(ObjectTu[item.tu].CanLam).includes(valueSelect)
      ) {
        console.log(item, "check item");
        arrPerfectDateStep4.push(item);
      }
    });

    setDataStep4(arrPerfectDateStep4);
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
      if (!CheckTuongXungTuongHaiTuoi(CHI_NAM[valueAge % 12], item.ngayChi)) {
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
        arrPerfectDateStep5.push(item);
      }
    });
    setDataStep5(arrPerfectDateStep5);
    setLoading(false);
  };

  // console.log(step1);
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
            {Object.keys(SERVICE_XAYDUNG).map((key) => {
              return <MenuItem value={key}>{SERVICE_XAYDUNG[key]}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <div className="flex flex-row justify-center">
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
          <TextField
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
          />

          <TextField
            type={"number"}
            id="standard-basic"
            label="Tuổi"
            placeholder="Nhập tuổi gia chủ"
            variant="standard"
            style={{ marginBottom: 10, marginLeft: 20 }}
            onChange={(e) => {
              setValueAge(e.target.value);
            }}
          />
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
      <div>
        <div style={{ color: "black", marginTop: 30 }}>
          Sau bước 1 {"(Tránh ngày, tháng xung toạ)"}
        </div>
        <TableShow data={step1}></TableShow>
      </div>
      <div>
        <div style={{ color: "black", marginTop: 30 }}>
          Sau bước 2 {"(Tránh bách kỵ)"}
        </div>
        <TableShow data={step2}></TableShow>
      </div>
      <div>
        <div style={{ color: "black", marginTop: 30 }}>
          Sau bước 3 {"(Tránh tương xung tương hại với tuổi gia chủ)"}
        </div>
        <TableShow data={step3}></TableShow>
      </div>
      <div>
        <div style={{ color: "black", marginTop: 30 }}>
          Sau bước 4 {"Kiểm tra Trực/Tú"}
        </div>
        <TableShow data={step4}></TableShow>
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
