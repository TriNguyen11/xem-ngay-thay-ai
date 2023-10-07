import {
  Paper,
  TableCell,
  TableContainer,
  TableHead,
  Table,
  TableRow,
  TableBody,
} from "@mui/material";
import { CHI, GIO_DIA_CHI } from "@Root/script/Constant";
import React from "react";

const TableShow = ({ data }) => {
  return (
    <TableContainer component={Paper} resp>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Ngày Dương</TableCell>
            <TableCell>Ngày Âm</TableCell>
            <TableCell>Giờ đầu</TableCell>
            <TableCell>Can/Chi Ngày</TableCell>
            <TableCell>Can/Chi Tháng</TableCell>
            <TableCell>Trực/Tú</TableCell>
            <TableCell>Giờ</TableCell>
            <TableCell>Giờ Hợp</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((date) => (
            <TableRow
              key={date.daySolar}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell>
                {date.daySolar} - {date.monthSolar}- {date.yearSolar}
              </TableCell>
              <TableCell>
                {date.dayLunar} - {date.monthLunar}- {date.yearLunar}
              </TableCell>
              <TableCell>{date.gioCan} Tý</TableCell>
              <TableCell>
                {date.ngayCan} {date.ngayChi}
              </TableCell>
              <TableCell>
                {date.thangCan} {date.thangChi}
              </TableCell>
              <TableCell>
                {date.truc} / {date.tu}
              </TableCell>
              <TableCell
                style={{
                  fontSize: 12,
                }}>
                {date?.gio &&
                  date.gio?.map((item) => {
                    return item + " (" + GIO_DIA_CHI[CHI.indexOf(item)] + "), ";
                  })}
              </TableCell>
              <TableCell
                style={{
                  fontSize: 12,
                }}>
                {date?.gioHoangDao &&
                  date?.gio &&
                  date.gio?.map((itemGio) => {
                    if (date?.gioHoangDao?.includes(itemGio)) {
                      return (
                        itemGio +
                        " (" +
                        GIO_DIA_CHI[CHI.indexOf(itemGio)] +
                        "), "
                      );
                    }
                  })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default TableShow;
