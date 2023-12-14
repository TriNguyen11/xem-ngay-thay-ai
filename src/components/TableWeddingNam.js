import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
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
  CheckTrucXungNgayThangNam,
  CheckTrucXungChi,
} from "@Root/script/handleDateChange";
import moment from "moment";
import { memo } from "react";
import { getSunriseDateTimeUtc, getSunsetDateTimeUtc } from "suntimes";

const TableWeddingNam = ({
  data,
  infoGiaChu,
  valueSelect,
  toaNha,
  lunarYearArr,
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
                  Năm
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                    minWidth: 120,
                  }}>
                  Nam
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                    minWidth: 120,
                  }}>
                  Nữ
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lunarYearArr?.map((year, index) => {
                let xungNam = "";
                let xungNu = "";
                if (CheckKimLau(year, infoGiaChu?.namSinhNu).length !== 0)
                  xungNu = "Kim Lâu";
                if (
                  CheckTrucXungNgayThangNam(
                    CHI_NAM[Number(year) % 12],
                    CHI_NAM[Number(infoGiaChu?.namSinhNu) % 12]
                  )
                )
                  xungNu = "Xung Thái tuế";
                if (
                  CHI_NAM[Number(year) % 12] ===
                  CHI_NAM[Number(infoGiaChu?.namSinhNu) % 12]
                )
                  xungNu = "Trực Thái tuế";
                if (
                  CheckThaiTueHinh(
                    CHI_NAM[Number(year) % 12],
                    CHI_NAM[Number(infoGiaChu?.namSinhNu) % 12]
                  )
                )
                  xungNu = "Hình Thái tuế";
                //Nam
                if (
                  CheckTrucXungNgayThangNam(
                    CHI_NAM[Number(year) % 12],
                    CHI_NAM[Number(infoGiaChu?.namSinhNam) % 12]
                  )
                )
                  xungNam = "Xung Thái tuế";

                if (
                  CHI_NAM[Number(year) % 12] ===
                  CHI_NAM[Number(infoGiaChu?.namSinhNam) % 12]
                )
                  xungNam = "Trực Thái tuế";
                if (
                  CheckThaiTueHinh(
                    CHI_NAM[Number(year) % 12],
                    CHI_NAM[Number(infoGiaChu?.namSinhNam) % 12]
                  )
                )
                  xungNam = "Hình Thái tuế";
                return (
                  <TableRow
                    key={index}
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
                    <TableCell
                      style={{
                        textAlign: "center",
                      }}>
                      {xungNu}
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
export default memo(TableWeddingNam);
