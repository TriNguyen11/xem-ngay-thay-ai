import { Box, Table, TableCell, TableHead, TableRow } from "@mui/material";
import {
  CAN_NAM,
  CHI,
  CHI_NAM,
  CHI_NAM_SORTED,
  COLOR_TEXT_NGU_HANH,
  GIO_DIA_CHI,
  NGU_HANH,
  ObjectTruc,
  ObjectTu,
} from "@Root/script/Constant";
import { CheckNhiHop, CheckTamHop } from "@Root/script/handleDateChange";
import { memo } from "react";

const TableResult = ({ data, infoGiaChu, valueSelect }) => {
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
              {/* Status */}
              <TableRow style={{}}>
                <TableCell
                  style={{
                    textAlign: "left",
                    minWidth: 150,
                  }}>
                  {Object.keys(ObjectTruc[data.truc].CanLam).includes
                    ? Object.keys(ObjectTu[data.tu].CanLam).includes(
                        valueSelect
                      )
                      ? "Rất Tốt"
                      : "Tốt"
                    : "Bình Thường"}
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                    minWidth: 120,
                  }}>
                  {data.ngayCan} {data.ngayChi} / {data.thangCan}{" "}
                  {data.thangChi} / {CAN_NAM[data.yearLunar % 10]}{" "}
                  {CHI_NAM[data.yearLunar % 12]}
                </TableCell>
              </TableRow>
              {/* "Dương lịch"*/}
              <TableRow style={{}}>
                <TableCell
                  style={{
                    textAlign: "left",
                    minWidth: 120,
                  }}>
                  Dương lịch
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                    minWidth: 50,
                  }}>
                  {data.daySolar} / {data.monthSolar} / {data.yearSolar}
                </TableCell>
              </TableRow>
              {/* "Âm lịch" */}
              <TableRow style={{}}>
                <TableCell
                  style={{
                    textAlign: "left",
                    minWidth: 50,
                  }}>
                  Âm lịch
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                    minWidth: 120,
                  }}>
                  {data.dayLunar} / {data.monthLunar} / {data.yearLunar}
                </TableCell>
              </TableRow>
              {/* , "Giờ", */}
              <TableRow style={{}}>
                <TableCell
                  style={{
                    textAlign: "left",
                    minWidth: 50,
                  }}>
                  Giờ
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                    minWidth: 120,
                  }}>
                  {data &&
                    data?.gio?.map((itemGio, index) => {
                      return (
                        <div
                          key={Math.random()}
                          style={{
                            marginRight: 5,
                            color:
                              COLOR_TEXT_NGU_HANH[
                                NGU_HANH[
                                  data.arrGioCan[
                                    CHI_NAM_SORTED.indexOf(itemGio)
                                  ]
                                ]
                              ],
                          }}>
                          {data.arrGioCan[CHI_NAM_SORTED.indexOf(itemGio)] +
                            " " +
                            itemGio +
                            " (" +
                            GIO_DIA_CHI[CHI.indexOf(itemGio)] +
                            ") " +
                            "(" +
                            NGU_HANH[
                              data.arrGioCan[CHI_NAM_SORTED.indexOf(itemGio)]
                            ] +
                            ")" +
                            (CheckTamHop(
                              CHI_NAM[infoGiaChu?.tuoiGiaChu % 12],
                              itemGio
                            )
                              ? "(Tam Hợp) "
                              : CheckNhiHop(
                                  CHI_NAM[infoGiaChu?.tuoiGiaChu % 12],
                                  itemGio
                                )
                              ? "(Nhị Hợp) "
                              : "")}
                        </div>
                      );
                    })}
                </TableCell>
              </TableRow>
              {/* "Trực/Tú" */}
              <TableRow className="">
                <TableCell
                  style={{
                    textAlign: "left",
                    minWidth: 150,
                  }}>
                  Trực/Tú
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                    minWidth: 120,
                  }}>
                  <span
                    style={{
                      color: Object.keys(
                        ObjectTruc[data.truc].KhongLam
                      ).includes(valueSelect)
                        ? "red"
                        : "green",
                      textTransform: Object.keys(
                        ObjectTruc[data.truc].CanLam
                      ).includes(valueSelect)
                        ? "uppercase"
                        : "capitalize",
                      fontWeight: Object.keys(
                        ObjectTruc[data.truc].CanLam
                      ).includes(valueSelect)
                        ? "bold"
                        : "400",
                    }}>
                    {data.truc} /{" "}
                  </span>

                  <span
                    style={{
                      color: Object.keys(ObjectTu[data.tu].KhongLam).includes(
                        valueSelect
                      )
                        ? "red"
                        : "green",
                      textTransform: Object.keys(
                        ObjectTruc[data.truc].CanLam
                      ).includes(valueSelect)
                        ? "uppercase"
                        : "capitalize",
                      fontWeight: Object.keys(
                        ObjectTruc[data.truc].CanLam
                      ).includes(valueSelect)
                        ? "bold"
                        : "400",
                    }}>
                    {data.tu}
                  </span>
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </Box>
      )}
    </Box>
  );
};
export default memo(TableResult);
