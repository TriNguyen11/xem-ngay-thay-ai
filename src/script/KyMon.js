import { PARSE_THIEN_CAN, THIEN_CAN_DI_THEO } from "./ConstantKyMon";

const arrPos = [4, 9, 2, 3, 5, 7, 8, 1, 6];
const arrPosClock = [4, 9, 2, 5, 7, 6, 1, 8, 3];
export const TinhTuyenArr = (ChieuDiChuyen, valueDiChuyen) => {
  console.log(ChieuDiChuyen, valueDiChuyen, "valueDiChuyen");
  const arrCungCan = [
    {
      value: 1,
      name: "Mậu",
    },
    {
      value: 1,
      name: "Kỷ",
    },
    {
      value: 1,
      name: "Canh",
    },
    {
      value: 1,
      name: "Tân",
    },
    {
      value: 1,
      name: "Nhâm",
    },
    {
      value: 1,
      name: "Quý",
    },
    {
      value: 1,
      name: "Đinh",
    },
    {
      value: 1,
      name: "Bính",
    },
    {
      value: 1,
      name: "Ất",
    },
  ];

  arrCungCan.forEach((item, index) => {
    if (ChieuDiChuyen === "+") {
      item.value =
        (item.value + index + Number(valueDiChuyen) - 1) % 9 === 0
          ? 9
          : (item.value + index + Number(valueDiChuyen) - 1) % 9;
    }
    //Am
    else {
      item.value =
        item.value + valueDiChuyen - index - 1 <= 0
          ? item.value + valueDiChuyen - index + 9 - 1
          : item.value + valueDiChuyen - index - 1;
    }
  });

  let arrSort = [];
  let arrSortClock = [];
  arrCungCan.map((canSorted, index) => {
    arrSort[arrPos.indexOf(canSorted.value)] = canSorted;
    arrSortClock[arrPosClock.indexOf(canSorted.value)] = canSorted;
  });
  return { arrSort, arrSortClock };
};
export const handleGetStatusCanChi = (thienCan, diaChi) => {
  console.log(
    PARSE_THIEN_CAN[THIEN_CAN_DI_THEO[thienCan].indexOf(diaChi)],
    "di theo"
  );
  return PARSE_THIEN_CAN[THIEN_CAN_DI_THEO[thienCan].indexOf(diaChi)];
};
