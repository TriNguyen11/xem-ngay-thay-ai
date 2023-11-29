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
  CheckTrucXungChi,
} from "@Root/script/handleDateChange";
import moment from "moment";
import { memo } from "react";
import { getSunriseDateTimeUtc, getSunsetDateTimeUtc } from "suntimes";

const TableShowRecommend = ({ data, bonusConditionBuilding, infoGiaChu }) => {
  console.log(
    infoGiaChu,
    CheckTrucXungNgayThangNam(
      CHI_NAM[Number(infoGiaChu?.tuoiGiaChu) % 12],
      CHI_NAM[Number(2023) % 12]
    ),
    CHI_NAM[Number(infoGiaChu?.tuoiGiaChu) % 12] === CHI_NAM[Number(2023) % 12],
    "check"
  );
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
                    fontWeight: "bold",
                    fontSize: 16,
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
              {Object.keys(data)?.map((year) => {
                if (
                  bonusConditionBuilding.TamTai.includes(Number(year)) ||
                  bonusConditionBuilding.KimLau.includes(Number(year)) ||
                  bonusConditionBuilding.hoangOcShow.includes(Number(year)) ||
                  CheckTrucXungNgayThangNam(
                    CHI_NAM[Number(infoGiaChu?.tuoiGiaChu) % 12],
                    CHI_NAM[Number(year) % 12]
                  ) ||
                  CHI_NAM[Number(infoGiaChu?.tuoiGiaChu) % 12] ===
                    CHI_NAM[Number(year) % 12]
                )
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
                          fontSize: 16,
                          textAlign: "center",
                        }}>
                        {year}
                      </TableCell>
                      <TableCell
                        style={{
                          textAlign: "left",
                          fontSize: 16,
                        }}>
                        {data[year].toString().replaceAll(",", ", ")}
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
export default memo(TableShowRecommend);
