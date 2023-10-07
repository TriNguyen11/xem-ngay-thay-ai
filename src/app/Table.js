import {
  Paper,
  TableCell,
  TableContainer,
  TableHead,
  Table,
  TableRow,
  TableBody,
} from "@mui/material";
import React from "react";

const TableShow = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Ngày Dương</TableCell>
            <TableCell>Ngày Âm</TableCell>
            <TableCell align="">Can/Chi Ngày</TableCell>
            <TableCell align="">Can/Chi Tháng</TableCell>
            <TableCell align="">Trực/Tú</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((date) => (
            <TableRow
              key={date.daySolar}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell align="">
                {date.daySolar} - {date.monthSolar}- {date.yearSolar}
              </TableCell>
              <TableCell align="">
                {date.dayLunar} - {date.monthLunar}- {date.yearLunar}
              </TableCell>
              <TableCell align="">
                {date.ngayCan} {date.ngayChi}
              </TableCell>
              <TableCell align="">
                {date.thangCan} {date.thangChi}
              </TableCell>
              <TableCell align="">
                {date.truc} / {date.tu}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default TableShow;
