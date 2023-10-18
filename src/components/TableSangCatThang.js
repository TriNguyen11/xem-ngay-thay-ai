import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { isLeapYearLunar } from "@Root/script/AmLich";
import {
  CHI,
  CHI_NAM,
  CHI_NAM_SORTED,
  COLOR_TEXT_NGU_HANH,
  GIO_DIA_CHI,
  NGU_HANH,
  ObjectTruc,
  ObjectTu,
} from "@Root/script/Constant";
import {
  CheckCongCo,
  CheckDaiLoi,
  CheckKimLau,
  CheckNhacThan,
  CheckNhiHop,
  CheckPhuChu,
  CheckTamHop,
  CheckThaiTueHinh,
  CheckThaiTueTrucXungHinh,
  CheckTheChu,
  CheckTieuLoi,
  CheckTrucXungHinhHaiChi,
  CheckTrucXungNgayThangNam,
  CheckTrucXungTyHoa,
} from "@Root/script/handleDateChange";
import moment from "moment";
import { memo } from "react";
import { getSunriseDateTimeUtc, getSunsetDateTimeUtc } from "suntimes";

const TableSangCatThang = ({ data, infoNguoiMat, valueSelect, toaNha }) => {
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
                  Tháng / Năm
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
                    !CheckTrucXungHinhHaiChi(
                      CHI_NAM[Number(year) % 12],
                      CHI_NAM[Number(infoNguoiMat?.namSinh) % 12]
                    ) &&
                    !isLeapYearLunar(year)
                  ) {
                    return Object.keys(data[year]).map((month, indMonth) => {
                      let xungThang = "";
                      if (
                        CheckTrucXungHinhHaiChi(
                          data[year][month].chiMonth,
                          CHI_NAM[Number(infoNguoiMat?.namSinh) % 12]
                        )
                      )
                        xungThang = "Xung, Trực, Hình, Hại";

                      if (
                        CheckTrucXungNgayThangNam(
                          data[year][month].chiMonth,
                          toaNha
                        )
                      )
                        xungThang = "Xung toạ mộ";

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
                            {month} / {year}
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
                            }}>
                            {xungThang}
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
