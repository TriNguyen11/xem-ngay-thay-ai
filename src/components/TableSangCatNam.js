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
  CheckHaiChi,
  CheckHinhChi,
  CheckTrucXungNgayThangNam,
} from "@Root/script/handleDateChange";
import { memo } from "react";

const TableSangCatNam = ({
  data,
  infoNguoiMat,
  valueSelect,
  toaNha,
  yearArr,
}) => {
  console.log(infoNguoiMat, "infoNguoiMat");
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
                  Năm
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                    minWidth: 120,
                  }}></TableCell>
                {/* <TableCell
                  style={{
                    textAlign: "center",
                    minWidth: 120,
                  }}>
                  Nữ
                </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {yearArr.lunar?.map((year, index) => {
                let xungNam = [];

                if (
                  CHI_NAM[Number(infoNguoiMat?.namSinh) % 12] ===
                  CHI_NAM[Number(year) % 12]
                )
                  xungNam.push("Trùng tuổi");
                if (
                  CheckTrucXungNgayThangNam(
                    CHI_NAM[Number(infoNguoiMat?.namSinh) % 12],
                    CHI_NAM[Number(year) % 12]
                  )
                ) {
                  xungNam.push("Xung tuổi");
                }
                if (
                  CheckHinhChi(
                    CHI_NAM[infoNguoiMat?.namSinh % 12],
                    CHI_NAM[Number(year) % 12]
                  )
                ) {
                  xungNam.push("Hình tuổi");
                }
                if (
                  CheckHaiChi(
                    CHI_NAM[infoNguoiMat?.namSinh % 12],
                    CHI_NAM[Number(year) % 12]
                  )
                ) {
                  xungNam.push("Hại tuổi");
                }

                if (isLeapYearLunar(year)) xungNam.push("Năm nhuận");

                return (
                  <TableRow
                    style={{
                      textAlign: "center",
                    }}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell
                      style={{
                        textAlign: "center",
                      }}>
                      {year}
                    </TableCell>
                    <TableCell
                      style={{
                        textAlign: "center",
                      }}>
                      {xungNam.toString().replaceAll(",", ", ")}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      )}
    </Box>
  );
};
export default memo(TableSangCatNam);
