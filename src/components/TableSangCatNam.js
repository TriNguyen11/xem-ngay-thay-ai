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

const TableSangCatNam = ({
  data,
  infoNguoiMat,
  valueSelect,
  toaNha,
  yearArr,
}) => {
  console.log(infoNguoiMat);
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
                let xungNam = "";
                console.log(yearArr, year);
                if (
                  CheckTrucXungHinhHaiChi(
                    CHI_NAM[Number(year) % 12],
                    CHI_NAM[Number(infoNguoiMat?.namSinh) % 12]
                  )
                )
                  xungNam = "Xung, Trực, Hình, Hại";
                if (isLeapYearLunar(year)) xungNam = "Năm nhuận";

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
                      {xungNam}
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
