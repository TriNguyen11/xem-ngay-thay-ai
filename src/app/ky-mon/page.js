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
import { getSunLongitude, jdn, monthDays, TIET } from "@Root/script/AmLich";
import {
  ARR_BAT_MON,
  ARR_CUU_TINH,
  BANG_CO,
  BAT_MON,
  BAT_THAN,
  BAT_THAN_REVERSE,
  CUU_TINH,
  INDEX_BAT_MON_BONUS,
  INDEX_CUU_TINH_BONUS,
  KHONG_VONG_INT,
  MA_TINH,
  OBJ_BAT_MON,
  OBJ_CUU_TINH,
  PHU_DAU,
  POS_CUNG_CHI,
  SO_TRAN_THUONG_TRUNG_HA,
  TRAN_TIET_KHI,
  TRAN_TIET_KHI_EXTENDS,
  TUAN_THU,
  TUAN_THU_BANG_ELEMENT,
} from "@Root/script/ConstantKyMon";
import {
  CAN_NAM,
  CHI_NAM,
  CHI_NAM_SORTED,
  MONTHS,
  NGUYET_KY,
  NGUYET_PHA,
  ObjectTruc,
  ObjectTu,
  SAT_CHU_AM,
  SAT_CHU_DUONG,
  SERVICE_CONGVIECDAISU,
  SERVICE_KYMON,
  SERVICE_SUCKHOE,
  TAM_NUONG,
  THO_TU,
  TIETKHI,
  VANG_VONG,
} from "@Root/script/Constant";
import {
  CheckHoangDao,
  CheckTrucXungGioKhongToa,
  CheckTrucXungNgayThangNam,
  CheckTuongXungTuongHaiTuoiKhongToa,
  convertTimeChi,
  ConvertToRangeDayInMonthLunar,
  getCanChi,
} from "@Root/script/handleDateChange";
import dayjs from "dayjs";
import moment from "moment";
import React, { useState } from "react";
import { handleGetStatusCanChi, TinhTuyenArr } from "@Root/script/KyMon";
import TableKyMon from "@Root/components/TableKyMon";

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

  const [valueDate, setValueDate] = useState({
    time: dayjs(new Date()),
    year: "",
    month: undefined,
    day: "",
  });

  const [valueSelect, setValueSelect] = useState("");

  const handleGetPerfectDate = async () => {
    // console.log(valueAge, "valueAge");
    let tuoiChiGiaChu = CHI_NAM[valueAge.year % 12];
    let tuoiCanGiaChu = CAN_NAM[valueAge.year % 10];
    let tuoiGiaChu = Number(valueAge.year);

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
    console.log(TIETKHI[sunlong], sunlong, "TIET[sunlong]");
    if (Number(valueAge.month) <= 2 && sunlong <= 20 && sunlong >= 17) {
      tuoiChiGiaChu = CHI_NAM[(valueAge.year - 1) % 12];
      tuoiCanGiaChu = CAN_NAM[(valueAge.year - 1) % 10];
      tuoiGiaChu--;
    }

    // Xac dinh can Chi gia chu
    setLoading(true);
    let CanChiNgayThangNamGio = await getCanChi(
      Number(valueAge.day),
      Number(valueAge.month),
      Number(valueAge.year),
      valueAge.time?.$H,
      valueAge.time?.$m,
      valueAge.time.$s
    );
    // xac dinh bang tran final
    const { arrSort, arrSortClock } = TinhTuyenArr(
      TRAN_TIET_KHI_EXTENDS[TIETKHI[sunlong]],
      TRAN_TIET_KHI[TIETKHI[sunlong]][
        SO_TRAN_THUONG_TRUNG_HA[
          PHU_DAU[
            `${CanChiNgayThangNamGio.ngayCan} ${CanChiNgayThangNamGio.ngayChi}`
          ][1]
        ]
      ]
    );

    // buoc 4: Tuan Thu
    let bangCo =
      BANG_CO[
        TUAN_THU[
          `${
            CanChiNgayThangNamGio.arrGioCan[
              CHI_NAM_SORTED.indexOf(convertTimeChi(valueAge.time?.$H))
            ]
          } ${convertTimeChi(valueAge.time?.$H)}`
        ]
      ];
    let tuanThu =
      TUAN_THU[
        `${
          CanChiNgayThangNamGio.arrGioCan[
            CHI_NAM_SORTED.indexOf(convertTimeChi(valueAge.time?.$H))
          ]
        } ${convertTimeChi(valueAge.time?.$H)}`
      ];

    let posTuanThu = arrSort.filter(
      (item) =>
        item.name ===
        BANG_CO[
          TUAN_THU[
            `${
              CanChiNgayThangNamGio.arrGioCan[
                CHI_NAM_SORTED.indexOf(convertTimeChi(valueAge.time?.$H))
              ]
            } ${convertTimeChi(valueAge.time?.$H)}`
          ]
        ]
    );
    console.log(tuanThu, "bangCo");

    // Xac dinh Truc Phu, Truc Su
    let TrucPhu = CUU_TINH[posTuanThu[0].value - 1];
    let titleTrucPhu = TrucPhu.title;
    let titleTrucPhuSpecial = TrucPhu.title;
    let TrucSu = BAT_MON[posTuanThu[0].value - 1];
    let titleTrucSu = TrucSu.title;

    const arrPosBangTran = [4, 9, 2, 7, 6, 1, 8, 3];
    const arrPosBangTranCam = [4, 9, 2, 7, 6, 1, 8, 3, 5];
    console.log(posTuanThu, "v");
    // Xac dinh Vi Tri Can Gio trong Bang Tran
    let posCanGio = arrSort.filter(
      (item) => item.name === posTuanThu[0].name
    )[0].value;

    let breakMap = false;
    let breakMap2 = false;
    let breakPoint = false;

    let arrCanPrevious = [];
    let countStep = 0;

    let canArrDiTheoSort = [];
    let breakpointCantheoSort = false;

    //Arr Can Di Theo
    let canGioAn =
      CanChiNgayThangNamGio.arrGioCan[
        CHI_NAM_SORTED.indexOf(convertTimeChi(valueAge.time?.$H))
      ] === "Giáp"
        ? posTuanThu[0].name
        : CanChiNgayThangNamGio.arrGioCan[
            CHI_NAM_SORTED.indexOf(convertTimeChi(valueAge.time?.$H))
          ];

    let posAnCanGioInit;
    arrSort.map((item, index) => {
      if (item.name === canGioAn) posAnCanGioInit = item;
      if (item.value === 5) {
        breakpointCantheoSort = true;
        return (canArrDiTheoSort[1] = [...canArrDiTheoSort[1], item.name]);
      }
      canArrDiTheoSort[item.value - 1] = [item.name];
    });
    console.log(posAnCanGioInit, "posAnCanGioInit");
    let chiGioAn = posTuanThu[0];

    let arrTuanThu = TUAN_THU_BANG_ELEMENT[tuanThu];
    let indexGioChiInArrTuanThu;
    console.log(chiGioAn, "22");
    if (TRAN_TIET_KHI_EXTENDS[TIETKHI[sunlong]] === "+") {
      indexGioChiInArrTuanThu =
        (arrTuanThu.indexOf(convertTimeChi(valueAge.time?.$H)) + posCanGio) %
          9 ===
        0
          ? 9
          : (arrTuanThu.indexOf(convertTimeChi(valueAge.time?.$H)) +
              posCanGio) %
            9;
    } else {
      indexGioChiInArrTuanThu =
        (arrTuanThu.indexOf(convertTimeChi(valueAge.time?.$H)) - posCanGio) %
          9 ===
        0
          ? 9
          : posCanGio - arrTuanThu.indexOf(convertTimeChi(valueAge.time?.$H)) <=
            0
          ? (posCanGio -
              arrTuanThu.indexOf(convertTimeChi(valueAge.time?.$H)) +
              9) %
            9
          : posCanGio - arrTuanThu.indexOf(convertTimeChi(valueAge.time?.$H));
    }
    const indexGioChiInArrTuanThuCopy = indexGioChiInArrTuanThu;

    //  [4, 9, 2, 7, 6,TUAN_THU_BANG_ELEMENT 1, 8, 3];
    // Xac dinh Truc/Su tren bang

    let posSpecial = 2;
    let indexTrucSu = 0;
    console.log(arrPosBangTran, titleTrucPhu, "v");
    (!Array.isArray(titleTrucPhu) && posAnCanGioInit.value === 5
      ? arrPosBangTranCam
      : arrPosBangTran
    ).map((pos, indexPos) => {
      breakMap = false;
      breakMap2 = false;
      // breakPoint = false;
      arrSortClock.map((item, index) => {
        if (!Array.isArray(titleTrucPhu) && posAnCanGioInit.value === 5) {
          let value = [arrSortClock[indexPos].name];
          // console.log(item, value, indexPos, "noww Cầm, inti == 5 ");
          if (arrSortClock[indexPos].value === 2) {
            value = [
              arrSortClock[indexPos].name,
              arrSortClock[indexPos + 1].name,
            ];
          }
          if (item.value === 5) breakPoint = true;

          //Trực phù
          console.log(posCanGio, "posCanGio");
          arrSortClock[indexPos % arrSortClock.length]["CanDiTheo"] = value;

          arrSortClock[indexPos % arrSortClock.length]["StatusCanDiTheo"] =
            value.map((thienCan) => {
              return POS_CUNG_CHI[
                arrSortClock[indexPos % arrSortClock.length].value - 1
              ].map((diaChi) => {
                console.log(thienCan, diaChi, "thienCan, diaChi");
                return [handleGetStatusCanChi(thienCan, diaChi)];
              });
            });

          arrSortClock[
            (posSpecial + (breakPoint ? 1 : 0)) % arrSortClock.length
          ]["arrTinh"] = [titleTrucPhuSpecial];

          arrSortClock[
            (posSpecial + (breakPoint ? 1 : 0)) % arrSortClock.length
          ]["BatThan"] =
            TRAN_TIET_KHI_EXTENDS[TIETKHI[sunlong]] !== "+"
              ? BAT_THAN_REVERSE[index % BAT_THAN.length]
              : BAT_THAN[index % BAT_THAN.length];

          arrSortClock[
            (posSpecial + (breakPoint ? 1 : 0)) % arrSortClock.length
          ]["bonusTrucPhu"] = (
            Array.isArray(titleTrucPhuSpecial)
              ? titleTrucPhuSpecial
              : [titleTrucPhuSpecial]
          ).map((itemChild) => {
            {
              return CUU_TINH[INDEX_CUU_TINH_BONUS[itemChild] - 1].data[
                arrPosBangTran[posSpecial % arrPosBangTran.length] - 1
              ]?.name;
            }
          });

          // console.log(indexGioChiInArrTuanThu, "indexGioChiInArrTuanThu");

          if (item.value === indexGioChiInArrTuanThu) {
            // console.log(
            //   index,
            //   item.value,
            //   item.name,
            //   titleTrucSu,
            //   indexGioChiInArrTuanThu,
            //   arrPosBangTran.indexOf(indexGioChiInArrTuanThu),
            //   "index"
            // );
            //Trực sử
            if (titleTrucSu === "Trung" && !Array.isArray(titleTrucSu)) {
              console.log(true, titleTrucSu, titleTrucSu);
              console.log(index);
              titleTrucSu = "Tử";
            }
            arrSortClock[index]["arrSu"] = [titleTrucSu];

            arrSortClock[index]["bonusTrucSu"] =
              BAT_MON[INDEX_BAT_MON_BONUS[titleTrucSu] - 1].data[
                indexGioChiInArrTuanThu - 1
              ]?.name;

            indexGioChiInArrTuanThu =
              arrPosBangTran[
                (arrPosBangTran.indexOf(indexGioChiInArrTuanThu) + 1) %
                  arrPosBangTran.length
              ];
            titleTrucSu =
              ARR_BAT_MON[
                OBJ_BAT_MON[
                  Array.isArray(titleTrucSu) ? titleTrucSu[0] : titleTrucSu
                ] % ARR_BAT_MON.length
              ];
          }

          // indexGioChiInArrTuanThu = (indexTrucSu + index) % 9;

          titleTrucPhuSpecial =
            ARR_CUU_TINH[
              OBJ_CUU_TINH[
                Array.isArray(titleTrucPhuSpecial)
                  ? titleTrucPhuSpecial[0]
                  : titleTrucPhuSpecial
              ] % ARR_CUU_TINH.length
            ];
          posSpecial++;
          breakMap = true;
        } else {
          if (item.name === canGioAn && !breakMap) {
            // console.log(indexPos, index, "check item");
            canGioAn = arrSortClock[(index + 1) % arrSortClock.length].name;
            if (item.value === 5 && posAnCanGioInit.value !== 5)
              breakPoint = true;
            console.log(item.name, canGioAn, item, posAnCanGioInit, "1312312");

            if (breakPoint) {
              console.log("check breakpint trueee");
              arrSortClock[(index + 1) % arrSortClock.length]["arrTinh"] = [
                titleTrucPhu,
              ];
              // status Can Di Theo && Can Di Theo
              arrSortClock[(index + 1) % arrSortClock.length]["CanDiTheo"] =
                canArrDiTheoSort[posCanGio - 1];
              arrSortClock[(index + 1) % arrSortClock.length][
                "StatusCanDiTheo"
              ] = canArrDiTheoSort[posCanGio - 1].map((thienCan) => {
                return POS_CUNG_CHI[
                  arrSortClock[(index + 1) % arrSortClock.length].value - 1
                ].map((diaChi) => {
                  console.log(thienCan, diaChi, "thienCan, diaChi");
                  return [handleGetStatusCanChi(thienCan, diaChi)];
                });
              });

              // Bat Than
              arrSortClock[(index + 1) % arrSortClock.length]["BatThan"] =
                TRAN_TIET_KHI_EXTENDS[TIETKHI[sunlong]] !== "+"
                  ? BAT_THAN_REVERSE[indexPos]
                  : BAT_THAN[indexPos];

              //Bonus TRUC PHU
              arrSortClock[(index + 1) % arrSortClock.length]["bonusTrucPhu"] =
                (
                  Array.isArray(titleTrucPhu) ? titleTrucPhu : [titleTrucPhu]
                ).map((itemChild) => {
                  return CUU_TINH[INDEX_CUU_TINH_BONUS[itemChild] - 1].data[
                    arrPosBangTran[index % arrPosBangTran.length] - 1
                  ]?.name;
                });
            } else {
              // if (titleTrucPhu === "Nhuế") titleTrucPhu = ["Nhuế", "Cầm"];
              arrSortClock[index]["arrTinh"] =
                titleTrucPhu === "Nhuế" ? titleTrucPhu : [titleTrucPhu];
              // Bat Than

              // arrSortClock[index]["BatThan"] = BAT_THAN[indexPos];
              console.log(
                arrSortClock[index],
                arrPosBangTran[index % arrPosBangTran.length],
                index,
                123123123
              );
              arrSortClock[index]["BatThan"] =
                TRAN_TIET_KHI_EXTENDS[TIETKHI[sunlong]] !== "+"
                  ? BAT_THAN_REVERSE[indexPos]
                  : BAT_THAN[indexPos];
              // console.log(
              //   titleTrucPhu,
              //   index,
              //   item,
              //   canArrDiTheoSort[posCanGio - 1],
              //   posCanGio
              // );
              if (
                !canArrDiTheoSort[posCanGio - 1] &&
                !Array.isArray(titleTrucPhu)
              )
                posCanGio = 2;
              arrSortClock[index]["CanDiTheo"] =
                canArrDiTheoSort[posCanGio - 1];

              arrSortClock[index]["StatusCanDiTheo"] = canArrDiTheoSort[
                posCanGio - 1
              ].map((thienCan) => {
                return POS_CUNG_CHI[
                  arrSortClock[index % arrSortClock.length].value - 1
                ].map((diaChi) => {
                  return [handleGetStatusCanChi(thienCan, diaChi)];
                });
              });

              arrSortClock[index]["bonusTrucPhu"] = (
                Array.isArray(titleTrucPhu) ? titleTrucPhu : [titleTrucPhu]
              ).map((itemChild) => {
                console.log(
                  itemChild,
                  arrPosBangTran[index % arrPosBangTran.length] - 1,
                  arrPosBangTran[index % arrPosBangTran.length] - 1,
                  123123123
                );
                return CUU_TINH[INDEX_CUU_TINH_BONUS[itemChild] - 1].data[
                  arrPosBangTran[index % arrPosBangTran.length] - 1
                ]?.name;
              });
            }

            titleTrucPhu =
              ARR_CUU_TINH[
                OBJ_CUU_TINH[
                  Array.isArray(titleTrucPhu) ? titleTrucPhu[0] : titleTrucPhu
                ] % ARR_CUU_TINH.length
              ];

            posCanGio =
              arrPosBangTran[
                (arrPosBangTran.indexOf(posCanGio) + 1) % arrPosBangTran.length
              ];
            breakMap = true;
            countStep++;
          }
          if (item.value === indexGioChiInArrTuanThu && !breakMap2) {
            // console.log(index, titleTrucSu, chiGioAn, "indexindex");
            // console.log(
            //   indexGioChiInArrTuanThu,
            //   titleTrucSu,
            //   "indexGioChiInArrTuanThuindexGioChiInArrTuanThu"
            // );
            if (titleTrucSu === "Trung" && !Array.isArray(titleTrucSu))
              titleTrucSu = "Tử";

            if (indexGioChiInArrTuanThu === 5 && !Array.isArray(titleTrucSu)) {
              indexGioChiInArrTuanThu = 2;
              indexTrucSu = 2;
            }
            arrSortClock[
              indexGioChiInArrTuanThu === 2 && !Array.isArray(titleTrucSu)
                ? 2
                : index
            ]["arrSu"] = [titleTrucSu];
            arrSortClock[
              indexGioChiInArrTuanThu === 2 && !Array.isArray(titleTrucSu)
                ? 2
                : index
            ]["bonusTrucSu"] =
              BAT_MON[INDEX_BAT_MON_BONUS[titleTrucSu] - 1].data[
                indexGioChiInArrTuanThu - 1
              ]?.name;
            indexGioChiInArrTuanThu =
              arrPosBangTran[
                (arrPosBangTran.indexOf(indexGioChiInArrTuanThu) + 1) %
                  arrPosBangTran.length
              ];

            titleTrucSu =
              ARR_BAT_MON[
                OBJ_BAT_MON[
                  Array.isArray(titleTrucSu) ? titleTrucSu[0] : titleTrucSu
                ] % ARR_BAT_MON.length
              ];
            indexTrucSu = (indexTrucSu + index) % 9;
            breakMap2 = true;
          }
        }

        //khong vong
        if (KHONG_VONG_INT[tuanThu].includes(item.value)) {
          arrSortClock[index % arrSortClock.length]["KV"] = "KV";
        }
        // Mã Tinh
        if (MA_TINH[convertTimeChi(valueAge.time?.$H)] === item.value) {
          arrSortClock[index % arrSortClock.length]["MaTinh"] = "Mã";
        }
      });

      // arrSort[1]["CanDiTheo"] =
      //
    });
    console.log(indexGioChiInArrTuanThuCopy, "indexGioChiInArrTuanThu afterr");
    console.log(indexGioChiInArrTuanThu, 121212);

    console.log(arrSortClock, "arrSort");
    setInfoGiaChu({
      ...infoGiaChu,
      ...CanChiNgayThangNamGio,
      tuoi: tuoiCanGiaChu + " " + tuoiChiGiaChu,
      tuoiGiaChu: tuoiGiaChu,
      gioCan:
        CanChiNgayThangNamGio.arrGioCan[
          CHI_NAM_SORTED.indexOf(convertTimeChi(valueAge.time?.$H))
        ],
      gioChi: convertTimeChi(valueAge.time?.$H),

      tietKhi: TIETKHI[sunlong],
      tranTietKhi: TRAN_TIET_KHI[TIETKHI[sunlong]],
      bangTranSorted: arrSort,
      bangCo,
      tuanThu,
      posTuanThu: posTuanThu[0],
      TrucPhu,
      TrucSu,
      indexGioChiInArrTuanThu: indexGioChiInArrTuanThuCopy,
      khongVong: KHONG_VONG_INT[tuanThu],
      posAnCanGioInit,
    });
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
        Xem Kỳ Môn
      </div>
      <div>
        <div className="flex flex-row">
          {/* <FormControl fullWidth style={{ marginBottom: 20, marginRight: 20 }}>
            <InputLabel id="demo-simple-select-label">
              Chọn danh mục xem
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label=" Chọn việc cần xem"
              onChange={(e) => {
                setValueSelect(e.target.value);
              }}>
              {Object.keys(SERVICE_CONGVIECDAISU).map((key, inex) => {
                return (
                  <MenuItem key={Math.random()} value={key}>
                    {SERVICE_CONGVIECDAISU[key]}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl> */}
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
              {Object.keys(SERVICE_KYMON).map((key, inex) => {
                return (
                  <MenuItem key={Math.random()} value={key}>
                    {SERVICE_KYMON[key]}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>

        <div className="text-black font-sans font-bold">
          <div>NHÂN {">"} THÔNG TIN NGƯỜI XEM</div>
          <div>
            <TextField
              value={infoGiaChu.name}
              id="standard-basic"
              label="Họ tên người xem"
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
        {/* <div className="flex flex-col w-full mt-5">
          <div
            style={{
              textTransform: "uppercase",
              fontWeight: "bold",
              color: "black",
            }}>
            Thời gian xem
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
                setValueAge({ ...valueDate, day: e.target.value });
              }}
            />
            <FormControl fullWidth style={{ marginLeft: 20, width: 200 }}>
              <InputLabel id="demo-simple-select-label">Tháng</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Tháng"
                onChange={(e) => {
                  setValueAge({ ...valueDate, month: e.target.value });
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
                setValueAge({ ...valueDate, year: e.target.value });
              }}
            />
            <TimeField
              label="Giờ/phút/giây"
              format="HH:mm:ss"
              value={valueDate.time}
              style={{ marginLeft: 20 }}
              onChange={(e) => {
                setValueAge({ ...valueDate, time: e });
              }}
            />
          </div>
        </div> */}
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
          {/* Nhan */}

          <div
            className="flex flex-row justify-center"
            style={{ marginTop: 30, width: window.innerWidth * 0.9 }}>
            {infoGiaChu.tuoi.length !== 0 && (
              <>
                <div className="text-black mb-2 font-bold text-lg">
                  Tên Người Xem: {infoGiaChu.name}
                  <div>Tuổi: {infoGiaChu.tuoi}</div>{" "}
                  <div>
                    Dương Lịch: {infoGiaChu.daySolar}/{infoGiaChu.monthSolar}/
                    {infoGiaChu.yearSolar}
                  </div>{" "}
                  <div>
                    Âm lịch: {infoGiaChu.dayLunar} / {infoGiaChu.monthLunar} /{" "}
                    {infoGiaChu.yearLunar} ({infoGiaChu.ngayCan}{" "}
                    {infoGiaChu.ngayChi} / {infoGiaChu.thangCan}{" "}
                    {infoGiaChu.thangChi} / {infoGiaChu.namCan}{" "}
                    {infoGiaChu.namChi})
                  </div>{" "}
                  <div>
                    Phù Đầu:{" "}
                    {PHU_DAU[`${infoGiaChu.ngayCan} ${infoGiaChu.ngayChi}`][0] +
                      "-" +
                      PHU_DAU[`${infoGiaChu.ngayCan} ${infoGiaChu.ngayChi}`][1]}
                  </div>{" "}
                  <div>
                    Tiết Khí: {infoGiaChu.tietKhi} -{" "}
                    {infoGiaChu.tranTietKhi.toString()}{" "}
                  </div>{" "}
                  <div>
                    Trận:{" "}
                    {TRAN_TIET_KHI_EXTENDS[infoGiaChu.tietKhi] +
                      "" +
                      infoGiaChu.tranTietKhi[
                        SO_TRAN_THUONG_TRUNG_HA[
                          PHU_DAU[
                            `${infoGiaChu.ngayCan} ${infoGiaChu.ngayChi}`
                          ][1]
                        ]
                      ]}
                  </div>{" "}
                  <div>
                    Bảng Trận
                    <TableKyMon data={infoGiaChu.bangTranSorted} />
                  </div>
                  <div>
                    Giờ: {infoGiaChu.gioCan} {infoGiaChu.gioChi} -{" "}
                    {infoGiaChu.tuanThu} - {infoGiaChu.bangCo}
                  </div>{" "}
                  <div>
                    Trực Phù: {infoGiaChu.TrucPhu.title} - An theo Can giờ:{" "}
                    {infoGiaChu.gioCan} ({infoGiaChu.posAnCanGioInit.value})
                  </div>{" "}
                  <div>
                    Trực Sử:
                    {infoGiaChu.TrucSu.title}
                    {" - "}
                    {infoGiaChu.indexGioChiInArrTuanThu}
                  </div>{" "}
                  <div>
                    Không vong:{" "}
                    {infoGiaChu.khongVong.map((item) => {
                      return "(" + item + ") ";
                    })}
                  </div>{" "}
                  <div>Mã Tinh: {MA_TINH[infoGiaChu?.gioChi]}</div>{" "}
                </div>
              </>
            )}
          </div>
        </>
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
