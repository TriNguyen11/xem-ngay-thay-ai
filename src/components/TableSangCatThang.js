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
  CheckTrucXungHinhHaiChi,
  CheckTrucXungHinhHaiChiTangSu,
  CheckTrucXungNgayThangNam,
} from "@Root/script/handleDateChange";
import { memo } from "react";

const TableSangCatThang = ({
  data,
  infoNguoiMat,
  valueSelect,
  toaNha,
  title,
  textXungToa = "Xung toạ mộ",
  showFull = false,
}) => {
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
                  if (
                    (!CheckTrucXungHinhHaiChi(
                      CHI_NAM[Number(year) % 12],
                      CHI_NAM[Number(infoNguoiMat?.namSinh) % 12]
                    ) &&
                      !isLeapYearLunar(year)) ||
                    showFull === true
                  ) {
                    return Object.keys(data[year]).map((month, indMonth) => {
                      let xungThang = [];
                      if (
                        data[year][month]?.isLeap &&
                        window.location.pathname.indexOf("tho-cung") !== -1
                      )
                        xungThang.push("Tháng nhuận");

                      // if (
                      //   CheckTrucXungHinhHaiChiTangSu(
                      //     data[year][month].chiMonth,
                      //     CHI_NAM[Number(infoNguoiMat?.namSinh) % 12]
                      //   )
                      // )
                      //   xungThang = "Xung, Trực, Hình, Hại";
                      // // xungThang = "Xung, Trùng";

                      if (
                        CHI_NAM[Number(infoNguoiMat?.namSinh) % 12] ===
                        data[year][month].chiMonth
                      )
                        xungThang.push("Trùng tuổi");
                      if (
                        CheckTrucXungNgayThangNam(
                          CHI_NAM[Number(infoNguoiMat?.namSinh) % 12],
                          data[year][month].chiMonth
                        )
                      ) {
                        xungThang.push("Xung tuổi");
                      }
                      if (
                        CheckHinhChi(
                          CHI_NAM[infoNguoiMat?.namSinh % 12],
                          data[year][month].chiMonth
                        )
                      ) {
                        xungThang.push("Hình tuổi");
                      }
                      if (
                        CheckHaiChi(
                          CHI_NAM[infoNguoiMat?.namSinh % 12],
                          data[year][month].chiMonth
                        )
                      ) {
                        xungThang.push("Hại tuổi");
                      }

                      if (
                        CheckTrucXungNgayThangNam(
                          data[year][month].chiMonth,
                          toaNha
                        )
                      )
                        xungThang = textXungToa;

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
                              color: "red",
                            }}>
                            {xungThang.toString().replaceAll(",", ", ")}
                          </TableCell>
                        </TableRow>
                      );
                    });
                  }
                })}
            </TableBody>
          </Table>
        </Box>
      )}
    </Box>
  );
};
export default memo(TableSangCatThang);
