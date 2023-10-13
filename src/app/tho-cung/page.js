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
import TableShow from "@Root/components/Table";
import { getSunLongitude, jdn, monthDays } from "@Root/script/AmLich";
import {
  CAN_NAM,
  CHI_NAM,
  COLOR_TEXT_NGU_HANH,
  MONTHS,
  NGUYET_KY,
  NGUYET_PHA,
  NGU_HANH,
  NGU_HANH_TUONG_SINH,
  ObjectTruc,
  ObjectTu,
  SAT_CHU_AM,
  SAT_CHU_DUONG,
  SERVICE_THOCUNG,
  SERVICE_XAYDUNG,
  TAM_NUONG,
  THO_TU,
  TOA_NHA,
  VANG_VONG,
} from "@Root/script/Constant";
import {
  CheckHoangDao,
  CheckNguHanhTuongKhac,
  CheckNguHanhTuongKhacKhauQuyet,
  CheckNguHanhTuongSinh,
  CheckTrucXungGio,
  CheckTrucXungNgayThangNam,
  CheckTuongXungTuongHaiTuoi,
  CheckTuongXungTuongHaiTuoiMonth,
  CombineThienCan,
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
  const [valueSelect, setValueSelect] = useState("");

  const [step1, setDataStep1] = useState();
  const [step2, setDataStep2] = useState();
  const [step3, setDataStep3] = useState();
  const [step4, setDataStep4] = useState();
  const [step5, setDataStep5] = useState();
  const [step6, setDataStep6] = useState();
  const [step7, setDataStep7] = useState();

  const handleGetPerfectDate = async () => {
    console.log(
      {
        dateStart,
        dateEnd,
        valueText,
        valueAge,
        valueSelect,
      },
      "adsas"
    );
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
    let arrPerfectDateStep1 = [];
    let arrPerfectDateStep2 = [];
    let arrPerfectDateStep3 = [];
    let arrPerfectDateStep4 = [];
    let arrPerfectDateStep5 = [];
    let arrPerfectDateStep6 = []; // hop hoa ngay/thang
    let arrPerfectDateStep7 = []; // hop hoa ngay/gio

    // Xac dinh ngay/thang xung toa nha
    dateArr.map((item, index) => {
      if (
        !CheckTrucXungNgayThangNam(valueText, item.ngayChi) &&
        !CheckTrucXungNgayThangNam(valueText, item.thangChi) &&
        CheckNguHanhTuongSinh(
          NGU_HANH[valueText],
          NGU_HANH[dateArr[index].ngayCan]
        )
        // &&
        // CheckNguHanhTuongSinh(
        //   NGU_HANH[valueText],
        //   NGU_HANH[dateArr[index].thangCan]
        // )
      ) {
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

    // Xet them hop hoa
    arrPerfectDateStep6 = await handleHopHoaNgayThang(arrPerfectDateStep2);
    setDataStep6(arrPerfectDateStep6);

    //Tranh tuong xung tuong hai
    arrPerfectDateStep6.map((item, inex) => {
      if (
        CheckTuongXungTuongHaiTuoi(CHI_NAM[tuoiGiaChu % 12], item.ngayChi) ===
          false &&
        CheckTuongXungTuongHaiTuoiMonth(
          CHI_NAM[tuoiGiaChu % 12],
          item.thangChi
        ) === false
      ) {
        arrPerfectDateStep3.push(item);
      }
    });
    setDataStep3(arrPerfectDateStep3);

    // kiem tra truc/tu
    arrPerfectDateStep3.map((item, ind) => {
      if (
        //   !! || 1 trong 2 pham deu` bi
        //
        Object.keys(ObjectTruc[item.truc].KhongLam).includes(valueSelect) &&
        Object.keys(ObjectTu[item.tu].KhongLam).includes(valueSelect)
      ) {
      } else {
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
    setDataStep5(arrPerfectDateStep5);

    // console.log(arrPerfectDateStep5, "length arr 5");
    // Xet hop hoa ngay/gio
    arrPerfectDateStep7 = await handleHopHoaNgayGio(arrPerfectDateStep5);
    setDataStep7(arrPerfectDateStep7);

    setLoading(false);
  };

  const handleHopHoaNgayThang = async (arr, toa) => {
    let ArrHopHoa = [];
    arr?.map((item, ind) => {
      let combineThienCanNgayThang = CombineThienCan(
        item.thangCan,
        item.ngayCan
      );

      if (combineThienCanNgayThang.length !== 0) {
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
            !CheckNguHanhTuongKhac(
              NGU_HANH[valueText],
              combineThienCanNgayThang
            )
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
    // let ArrHopHoa = [];
    // arr?.forEach((item, ind) => {
    //   let combineThienCanNgayGio = "";
    //   item.gio.map((itemGio) => {
    //     combineThienCanNgayGio = CombineThienCan(
    //       item.arrGioCan[CHI_NAM_SORTED.indexOf(itemGio)],
    //       item.ngayCan
    //     );
    //     if (combineThienCanNgayGio.length !== 0) {
    //       if (
    //         !CheckNguHanhTuongKhac(
    //           NGU_HANH[valueText],
    //           combineThienCanNgayGio
    //         ) &&
    //         !CheckNguHanhTuongKhac(
    //           NGU_HANH[item.arrGioCan[CHI_NAM_SORTED.indexOf(itemGio)]],
    //           combineThienCanNgayGio
    //         ) &&
    //         !CheckNguHanhTuongKhac(
    //           NGU_HANH[item.ngayChi],
    //           combineThienCanNgayGio
    //         )
    //       ) {
    //         ArrHopHoa.push(itemGio);
    //       }
    //     } else {
    //       ArrHopHoa.push(itemGio);
    //     }
    //   });
    //   item.gio = ArrHopHoa;
    // });
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
        Xem ngày Xây dựng
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
            }}>
            {Object.keys(SERVICE_THOCUNG).map((key, inex) => {
              return (
                <MenuItem key={Math.random()} value={key}>
                  {SERVICE_THOCUNG[key]}
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
      <div style={{ marginTop: 30, maxWidth: 500 }}>
        {infoGiaChu.tuoi.length !== 0 && (
          <>
            <div className="text-black mb-2 font-bold text-lg">
              Gia chủ tên: {infoGiaChu.name}
              <div>Tuổi: {infoGiaChu.tuoi}</div>{" "}
            </div>

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
      <div className="">
        <div
          className="font-bold text-[20px]"
          style={{ color: "black", marginTop: 30 }}>
          Sau bước 1 {"(Tránh ngày, tháng xung toạ)"}
          {step1 && `(${step1?.length})`}
        </div>
        <div className="max-h-[500px] overflow-scroll">
          <TableShow
            data={step1}
            infoGiaChu={infoGiaChu}
            valueSelect={valueSelect}></TableShow>
        </div>
      </div>
      <div>
        <div
          className="font-bold text-[20px]"
          style={{ color: "black", marginTop: 30 }}>
          Sau bước 2 {"(Tránh bách kỵ)"}
          {step2 && `(${step2?.length})`}
        </div>
        <div className="max-h-[500px] overflow-scroll">
          <TableShow
            valueSelect={valueSelect}
            data={step2}
            infoGiaChu={infoGiaChu}></TableShow>
        </div>
      </div>
      <div>
        <div
          className="font-bold text-[20px]"
          style={{ color: "black", marginTop: 30 }}>
          Kiểm tra thêm hợp hoá ngày/tháng {step6 && `(${step6?.length})`}
        </div>

        <div className="max-h-[500px] overflow-scroll">
          <TableShow
            valueSelect={valueSelect}
            data={step6}
            infoGiaChu={infoGiaChu}></TableShow>
        </div>
      </div>
      <div>
        <div
          className="font-bold text-[20px]"
          style={{ color: "black", marginTop: 30 }}>
          Sau bước 3 {"(Tránh tương xung tương hại với tuổi gia chủ)"}{" "}
          {step3 && `(${step3?.length})`}
        </div>

        <div className="max-h-[500px] overflow-scroll">
          <TableShow
            valueSelect={valueSelect}
            data={step3}
            infoGiaChu={infoGiaChu}></TableShow>
        </div>
      </div>
      <div>
        <div
          className="font-bold text-[20px]"
          style={{ color: "black", marginTop: 30 }}>
          Sau bước 4 {"Kiểm tra Trực/Tú"}
          {step4 && `(${step4?.length})`}
        </div>

        <div className="max-h-[500px] overflow-scroll">
          <TableShow
            valueSelect={valueSelect}
            data={step4}
            infoGiaChu={infoGiaChu}></TableShow>
        </div>
      </div>
      <div>
        <div
          className="font-bold text-[20px]"
          style={{ color: "black", marginTop: 30 }}>
          Sau bước 5{" "}
          {"Chọn giờ tránh xung với chi toạ, ngày, tháng, tuổi gia chủ "}
        </div>

        <div className="max-h-[500px] overflow-scroll">
          <TableShow
            valueSelect={valueSelect}
            data={step5}
            infoGiaChu={infoGiaChu}></TableShow>
        </div>
      </div>
      <div>
        <div
          className="font-bold text-[20px]"
          style={{ color: "black", marginTop: 30 }}>
          Kiểm tra thêm hợp hoá ngày/giờ {step7 && `(${step7?.length})`}
        </div>

        <div className="max-h-[500px] overflow-scroll">
          <TableShow
            valueSelect={valueSelect}
            data={step7}
            infoGiaChu={infoGiaChu}></TableShow>
        </div>
      </div>

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
