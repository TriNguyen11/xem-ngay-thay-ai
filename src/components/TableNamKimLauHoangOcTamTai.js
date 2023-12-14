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

const TableNamKimLauHoangOcTamTai = ({
  data,
  infoGiaChu,
  valueSelect,
  toaNha,
  lunarYearArr,
  bonusConditionBuilding,
  infoGiaChuBorrow,
  isMuonTuoi,
}) => {
  // console.log(isMuonTuoi, infoGiaChuBorrow, "infoGiaChu");
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
                  Kim Lâu
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                    minWidth: 120,
                  }}>
                  Hoang Ốc
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                    minWidth: 120,
                  }}>
                  Tam tai
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                    minWidth: 120,
                  }}>
                  Thái Tuế
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                    minWidth: 120,
                  }}>
                  Xung Thái Tuế
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lunarYearArr?.map((year, index) => {
                let HoangOc =
                  bonusConditionBuilding?.hoangOcShow.includes(year);
                let TamTai = bonusConditionBuilding?.TamTai.includes(year);
                let KimLau = bonusConditionBuilding?.KimLau.includes(year);
                let XungThaiTue = CheckTrucXungNgayThangNam(
                  CHI_NAM[
                    Number(
                      isMuonTuoi
                        ? infoGiaChuBorrow.tuoiTuoiMuon
                        : infoGiaChu.tuoiGiaChu
                    ) % 12
                  ],
                  CHI_NAM[Number(year) % 12]
                );
                let ThaiTue =
                  CHI_NAM[
                    Number(
                      isMuonTuoi
                        ? infoGiaChuBorrow.tuoiTuoiMuon
                        : infoGiaChu.tuoiGiaChu
                    ) % 12
                  ] === CHI_NAM[Number(year) % 12];
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
                      {KimLau ? "Phạm Kim Lâu" : ""}
                    </TableCell>
                    <TableCell
                      style={{
                        textAlign: "center",
                      }}>
                      {HoangOc ? "Phạm Hoang Ốc" : ""}
                    </TableCell>
                    <TableCell
                      style={{
                        textAlign: "center",
                      }}>
                      {TamTai ? "Phạm Tam Tai" : ""}
                    </TableCell>
                    <TableCell
                      style={{
                        textAlign: "center",
                      }}>
                      {ThaiTue ? "Phạm" : ""}
                    </TableCell>
                    <TableCell
                      style={{
                        textAlign: "center",
                      }}>
                      {XungThaiTue ? "Phạm" : ""}
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
export default memo(TableNamKimLauHoangOcTamTai);
