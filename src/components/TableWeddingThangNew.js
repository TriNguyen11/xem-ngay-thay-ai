import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { isLeapYearLunar } from "@Root/script/AmLich";
import { CHI_NAM } from "@Root/script/Constant";
import {
  CheckCongCo,
  CheckDaiLoi,
  CheckNhacThan,
  CheckPhuChu,
  CheckTheChu,
  CheckTieuLoi,
  CheckTrucXungHinhHaiChi,
  CheckTrucXungNgayThangNam,
  CheckTrucXungChi,
} from "@Root/script/handleDateChange";
import { memo } from "react";

const TableWeddingThangNew = ({
  data,
  infoGiaChu,
  valueSelect,
  toaNha,
  title,
}) => {
  console.log(data, "data");
  return (
    <Box sx={{ overflow: "auto" }}>
      {typeof window !== "undefined" && (
        <Box
          sx={{
            width: "100%",
            maxWidth: window.innerWidth * 0.9,
            display: "table",
            tableLayout: "fixed",
          }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className="">
              <TableRow style={{}}>
                <TableCell
                  style={{
                    textAlign: "center",
                    minWidth: 50,
                  }}>
                  Tháng / Năm (Âm lịch)
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                    minWidth: 120,
                  }}>
                  Can / Chi
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                    minWidth: 120,
                  }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                Object.keys(data).map((year, index) => {
                  return Object.keys(data[year]).map((month, indMonth) => {
                    let backky = "";
                    if (data[year][month]?.isLeap) backky = "Tháng nhuận";

                    if (
                      CheckDaiLoi(
                        CHI_NAM[infoGiaChu?.namSinhNu % 12],
                        data[year][month].month
                        // date.monthLunar
                      )
                    )
                      backky = "Đại lợi nữ";
                    if (
                      CheckTieuLoi(
                        CHI_NAM[infoGiaChu?.namSinhNu % 12],
                        data[year][month].month

                        // date.monthLunar
                      )
                    )
                      backky = "Tiểu lợi nữ";
                    if (
                      CheckCongCo(
                        CHI_NAM[infoGiaChu?.namSinhNu % 12],
                        data[year][month].month
                        // date.monthLunar
                      )
                    )
                      backky = "Công cô nữ";

                    if (
                      CheckTrucXungChi(
                        CHI_NAM[Number(infoGiaChu?.namSinhNam) % 12],
                        data[year][month].chiMonth
                        // date.thangChi
                      )
                    )
                      backky = "Xung, Trùng tuổi Nam";
                    if (
                      CheckTrucXungChi(
                        CHI_NAM[Number(infoGiaChu?.namSinhNu) % 12],
                        data[year][month].chiMonth
                        // date.thangChi
                      )
                    )
                      backky = "Xung, Trùng tuổi Nữ";

                    if (
                      CheckTheChu(
                        CHI_NAM[infoGiaChu?.namSinhNu % 12],
                        data[year][month].month

                        // date.monthLunar
                      )
                    )
                      backky = "Thê chủ nữ";
                    if (
                      CheckPhuChu(
                        CHI_NAM[infoGiaChu?.namSinhNu % 12],
                        data[year][month].month

                        // date.monthLunar
                      )
                    )
                      backky = "Phu chủ nữ";

                    if (
                      CheckNhacThan(
                        CHI_NAM[infoGiaChu?.namSinhNu % 12],
                        data[year][month].month

                        // date.monthLunar
                      )
                    )
                      backky = "Nhạc thân nữ";
                    if (data[year][month]?.isLeap) backky = "Tháng Nhuận";
                    if (
                      CheckTrucXungNgayThangNam(
                        toaNha,
                        data[year][month].chiMonth
                      )
                    )
                      backky = " Xung toạ";
                    return (
                      <TableRow
                        style={{
                          textAlign: "center",
                        }}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}>
                        <TableCell
                          style={{
                            textAlign: "center",
                          }}>
                          {data[year][month].month} / {year}
                          {data[year][month]?.isLeap ? " (Nhuận)" : ""}
                        </TableCell>
                        <TableCell
                          style={{
                            textAlign: "center",
                          }}>
                          {data[year][month].canMonth}{" "}
                          {data[year][month].chiMonth}
                        </TableCell>
                        <TableCell
                          style={{
                            textAlign: "center",
                            fontWeight:
                              backky === "Tiểu lợi nữ" ||
                              backky === "Đại lợi nữ"
                                ? "bold"
                                : "400",
                            color:
                              backky === "Tiểu lợi nữ" ||
                              backky === "Đại lợi nữ"
                                ? "green"
                                : "red",
                          }}>
                          {backky}
                        </TableCell>
                      </TableRow>
                    );
                  });
                })}
            </TableBody>
          </Table>
        </Box>
      )}
    </Box>
  );
};
export default memo(TableWeddingThangNew);
