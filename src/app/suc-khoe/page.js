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
import TableResult from "@Root/components/TableResult";
import TableResultStepFinal from "@Root/components/TableResultStepFinal";
import TableSangCatTrucTu from "@Root/components/TableSangCatTrucTu";
import TableTrucXungNgayThang from "@Root/components/TableTrucXungNgayThang";
import { getSunLongitude, jdn, monthDays } from "@Root/script/AmLich";
import {
  CAN_NAM,
  CHI_NAM,
  MONTHS,
  NGUYET_KY,
  NGUYET_PHA,
  ObjectTruc,
  ObjectTu,
  SAT_CHU_AM,
  SAT_CHU_DUONG,
  SERVICE_SUCKHOE,
  TAM_NUONG,
  THO_TU,
  VANG_VONG,
} from "@Root/script/Constant";
import {
  CheckHoangDao,
  CheckTrucXungGioKhongToa,
  CheckTrucXungNgayThangNam,
  CheckTuongXungTuongHaiTuoiKhongToa,
  ConvertToRangeDayInMonthLunar,
  getCanChi,
} from "@Root/script/handleDateChange";
import axios from "axios";
import dayjs from "dayjs";
import moment from "moment";
import React, { useState } from "react";
import TableXayDung from "../xay-dung/component/TableXayDung";

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

  const [valueAgeBorrow, setValueAgeBorrow] = useState({
    time: dayjs(new Date()),
    year: "",
    month: undefined,
    day: "",
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
  });
  const handleGetPerfectDate = async () => {
    console.log(
      {
        dateStart,
        dateEnd,
        valueAge,
        valueAgeBorrow,
        valueSelect,
        isMuonTuoi,
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
    let arrPerfectDateStep1 = [];
    let arrPerfectDateStep2 = [];
    let arrPerfectDateStep3 = [];
    let arrPerfectDateStep4 = [];
    let arrPerfectDateStep5 = [];
    let arrPerfectDateStep6 = []; // hop hoa ngay/thang
    let arrPerfectDateStep7 = []; // hop hoa ngay/gio
    let arrPerfectDateStep8 = []; // xoa gio khong co

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
        CheckTuongXungTuongHaiTuoiKhongToa(
          CHI_NAM[tuoiGiaChu % 12],
          item.ngayChi
        ) === false
      ) {
        arrPerfectDateStep3.push(item);
      }
    });

    let arrHours = [];
    let gioHoangDaoVar = [];

    // Chon gio
    arrPerfectDateStep3.map((item, ind) => {
      arrHours = CheckTrucXungGioKhongToa(
        item.ngayChi,
        item.thangChi,
        CHI_NAM[tuoiGiaChu % 12],
        item.monthLunar
      );
      gioHoangDaoVar = CheckHoangDao(item.ngayChi);

      if (arrHours.length !== 0) {
        arrPerfectDateStep8.push({
          ...item,
          gio: arrHours,
          gioHoangDao: gioHoangDaoVar,
        });
      }

      arrPerfectDateStep5.push({
        ...item,
        gio: arrHours,
        gioHoangDao: gioHoangDaoVar,
      });
    });
    // Convert  RangeDayInMonthLunar
    setRangeDayInMonthLunar(ConvertToRangeDayInMonthLunar(dateArr));
    setInfoGiaChu({
      ...infoGiaChu,
      tuoi: tuoiCanGiaChu + " " + tuoiChiGiaChu,
      tuoiGiaChu: tuoiGiaChu,
    });
    setStepShow({
      step1: arrPerfectDateStep1,
      step2: arrPerfectDateStep2,
      step3: arrPerfectDateStep3,
      step4: arrPerfectDateStep4,
      step5: arrPerfectDateStep5,
      step6: arrPerfectDateStep6,
      step7: arrPerfectDateStep7,
      step8: arrPerfectDateStep8,
      dateArr,
    });

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
        Xem ngày Sức khoẻ
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
            {Object.keys(SERVICE_SUCKHOE).map((key, inex) => {
              return (
                <MenuItem key={Math.random()} value={key}>
                  {SERVICE_SUCKHOE[key]}
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
            handleGetPerfectDate();
          }}
          variant="contained"
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
              })}
          </div>
          {/* Nhan */}

          <div style={{ marginTop: 30, width: window.innerWidth * 0.9 }}>
            {infoGiaChu.tuoi.length !== 0 && (
              <>
                <div className="text-black mb-2 font-bold text-lg">
                  Gia chủ tên: {infoGiaChu.name}
                  <div>Tuổi: {infoGiaChu.tuoi}</div>{" "}
                </div>
              </>
            )}
          </div>
          {/* Show ket qua */}
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
                          valueSelect={valueSelect}></TableResult>
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
                        dateStart.$y
                      } không phù hợp cho công việc, vui lòng chọn ngày khác!`
                    : `Từ ngày ${dateStart?.$D}/${dateStart?.$M + 1}/${
                        dateStart.$y
                      } đến ngày  ${dateEnd.$D}/${dateEnd.$M + 1}/${
                        dateEnd.$y
                      } không phù hợp cho công việc, vui lòng chọn khoảng khác!`}
                </div>
              )}
            </>
          )}
          {stepShow.dateArr && (
            <div>
              <div
                className="font-bold text-[20px]"
                style={{ color: "black", marginTop: 30 }}>
                Bước 1{": "}Xét Trực/Tú{" "}
                {stepShow.dateArr && `(${stepShow.dateArr?.length})`}
              </div>
              <div className="max-h-[500px] overflow-scroll px-10 border-2 border-black mt-2 ">
                <TableSangCatTrucTu
                  valueSelect={valueSelect}
                  data={stepShow?.dateArr}
                  infoNguoiMat={infoGiaChu}
                  toaNha={""}></TableSangCatTrucTu>
              </div>
            </div>
          )}
          {stepShow.step2 && (
            <div className="">
              <div
                className="font-bold text-[20px]"
                style={{ color: "black", marginTop: 30 }}>
                Bước 2: {"Chọn ngày và so với tuổi gia chủ "}
                {`(${stepShow.step2?.length})`}
              </div>
              <div className="max-h-[500px] overflow-scroll px-10 border-2 border-black mt-2">
                <TableTrucXungNgayThang
                  data={stepShow.step2}
                  infoGiaChu={infoGiaChu}
                  valueSelect={valueSelect}
                  checkTrungXungHaiTuoi={true}
                  toaNha={""}></TableTrucXungNgayThang>
              </div>
            </div>
          )}
          {stepShow.step5 && (
            <div>
              <div
                className="font-bold text-[20px]"
                style={{ color: "black", marginTop: 30 }}>
                Bước 3: Chọn giờ
                {stepShow.step5 && `(${stepShow.step5?.length})`}
              </div>

              <div className="max-h-[500px] overflow-scroll px-10 border-2 border-black mt-2">
                <TableXayDung
                  valueSelect={valueSelect}
                  data={stepShow.step5}
                  infoGiaChu={infoGiaChu}></TableXayDung>
              </div>
            </div>
          )}
          {stepShow.step8 && (
            <div>
              <div
                className="font-bold text-[20px]"
                style={{ color: "black", marginTop: 30 }}>
                Bước {"4"}: Loại bỏ những ngày không có giờ
                {stepShow.step8 && `(${stepShow.step8?.length})`}
              </div>
              <div className="max-h-[500px] overflow-scroll px-10 border-2 border-black mt-2 ">
                <TableResultStepFinal
                  valueSelect={valueSelect}
                  data={stepShow.step8}
                  infoGiaChu={infoGiaChu}
                  toaNha={""}></TableResultStepFinal>
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
