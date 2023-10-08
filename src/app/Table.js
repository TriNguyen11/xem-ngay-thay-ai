import {
  Paper,
  TableCell,
  TableContainer,
  TableHead,
  Table,
  TableRow,
  TableBody,
} from "@mui/material";
import {
  CAN_NAM,
  CHI,
  CHI_NAM,
  CHI_NAM_SORTED,
  GIO_DIA_CHI,
  NGUYET_KY,
  NGUYET_PHA,
  NGU_HANH,
  SAT_CHU_AM,
  SAT_CHU_DUONG,
  TAM_NUONG,
  THO_TU,
  VANG_VONG,
} from "@Root/script/Constant";
import { CheckTrucXungNgayThangNam } from "@Root/script/handleDateChange";
import moment from "moment";
import React from "react";
import { getSunriseDateTimeUtc, getSunsetDateTimeUtc } from "suntimes";

const ColorText = {
  Hoả: "red",
  Mộc: "green",
  Kim: "#f2ca02",
  Thuỷ: "blue",
  Thổ: "brown",
};

const TableShow = ({ data, infoGiaChu }) => {
  return (
    <TableContainer component={Paper} resp>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              style={{
                textAlign: "center",
              }}>
              Ngày Dương
            </TableCell>
            <TableCell
              style={{
                textAlign: "center",
              }}>
              Ngày Âm
            </TableCell>
            <TableCell
              style={{
                textAlign: "center",
              }}>
              Giờ đầu
            </TableCell>
            <TableCell
              style={{
                textAlign: "center",
              }}>
              Can/Chi Ngày
            </TableCell>
            <TableCell
              style={{
                textAlign: "center",
              }}>
              Can/Chi Tháng
            </TableCell>
            <TableCell
              style={{
                textAlign: "center",
              }}>
              Trực/Tú
            </TableCell>
            <TableCell
              style={{
                textAlign: "center",
              }}>
              Giờ Hoàng Đạo
            </TableCell>
            <TableCell
              style={{
                textAlign: "center",
              }}>
              Giờ Hợp
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((date) => {
            let backky = "";
            if (date.dayLunar === 1) backky = "Mùng 1";
            if (date.dayLunar === 15) backky = "Rằm";
            if (NGUYET_KY.includes(date.dayLunar)) backky = "Nguyệt kỵ";
            if (TAM_NUONG.includes(date.dayLunar)) backky = "Tam Nương";
            if (THO_TU[date.monthLunar - 1] === date.ngayChi) backky = "Thọ Tử";
            if (SAT_CHU_AM[date.monthLunar - 1] === date.ngayChi)
              backky = "Sát chủ âm";
            if (SAT_CHU_DUONG[date.monthLunar - 1] === date.ngayChi)
              backky = "Sát chủ dương";
            if (VANG_VONG[date.monthLunar - 1] === date.ngayChi)
              backky = "Vãng vong";
            if (NGUYET_PHA[date.monthLunar - 1] === date.ngayChi)
              backky = "Nguyệt Phá";
            if (
              CheckTrucXungNgayThangNam(
                CHI_NAM[moment().year() % 12],
                date.ngayChi
              )
            )
              backky = "Tuế Phá";
            if (
              CheckTrucXungNgayThangNam(
                CHI_NAM[Number(infoGiaChu.tuoiGiaChu) % 12],
                date.ngayChi
              )
            ) {
              backky = "Đại Hao";
            }
            return (
              <TableRow
                style={{
                  textAlign: "center",
                }}
                key={date.daySolar}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell
                  style={{
                    textAlign: "center",
                  }}>
                  {date.daySolar} - {date.monthSolar}- {date.yearSolar}
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                  }}>
                  {date.dayLunar} - {date.monthLunar}- {date.yearLunar}{" "}
                  {backky.length !== 0 ? "(" + backky + ")" : ""}
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                  }}>
                  {date.gioCan} Tý
                </TableCell>
                <TableCell style={{ color: ColorText[date.hanhNgay] }}>
                  {date.ngayCan} {date.ngayChi} ({date.hanhNgay})
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                  }}>
                  {date.thangCan} {date.thangChi} ({date.hanhThang})
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                  }}>
                  {date.truc} / {date.tu}
                </TableCell>
                <TableCell
                  style={{
                    fontSize: 12,
                    textAlign: "center",
                  }}>
                  <span className="flex flex-row text-center" style={{}}>
                    {date?.gioHoangDao &&
                      date.gioHoangDao?.map((item, index) => {
                        return (
                          <span
                            style={{
                              marginRight: 5,
                              color:
                                ColorText[
                                  NGU_HANH[
                                    date.arrGioCan[CHI_NAM_SORTED.indexOf(item)]
                                  ]
                                ],
                            }}>
                            {date.arrGioCan[CHI_NAM_SORTED.indexOf(item)] +
                              " " +
                              item +
                              " (" +
                              GIO_DIA_CHI[CHI.indexOf(item)] +
                              ") " +
                              "(" +
                              NGU_HANH[
                                date.arrGioCan[CHI_NAM_SORTED.indexOf(item)]
                              ] +
                              ")"}
                          </span>
                        );
                      })}
                  </span>
                  <div className="flex flex-row  mt-2">
                    <div style={{ marginRight: 10 }}>
                      Mặt trời mọc:{" "}
                      <span className="font-bold text-base">
                        {moment(
                          getSunriseDateTimeUtc(
                            new Date(
                              Number(date.yearSolar),
                              Number(date.monthSolar) - 1,
                              Number(date.daySolar)
                            ),
                            21.030653,
                            105.84713
                          )
                        ).format("hh:mm:ss")}
                      </span>
                    </div>
                    <div>
                      Mặt trời lặn:{" "}
                      <span className="font-bold text-base">
                        {moment(
                          getSunsetDateTimeUtc(
                            new Date(
                              Number(date.yearSolar),
                              Number(date.monthSolar) - 1,
                              Number(date.daySolar)
                            ),
                            21.030653,
                            105.84713
                          )
                        )
                          .clone()
                          .add(1, "millisecond")
                          .format("HH:mm:ss")}{" "}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell
                  clas
                  style={{
                    fontSize: 12,
                  }}>
                  <span className="flex flex-row text-center" style={{}}>
                    {date?.gio &&
                      date.gio?.map((itemGio, index) => {
                        return (
                          <span
                            style={{
                              marginRight: 5,
                              color:
                                ColorText[
                                  NGU_HANH[
                                    date.arrGioCan[
                                      CHI_NAM_SORTED.indexOf(itemGio)
                                    ]
                                  ]
                                ],
                            }}>
                            {date.arrGioCan[CHI_NAM_SORTED.indexOf(itemGio)] +
                              " " +
                              itemGio +
                              " (" +
                              GIO_DIA_CHI[CHI.indexOf(itemGio)] +
                              ") " +
                              "(" +
                              NGU_HANH[
                                date.arrGioCan[CHI_NAM_SORTED.indexOf(itemGio)]
                              ] +
                              ")"}
                          </span>
                        );
                      })}
                  </span>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default TableShow;
