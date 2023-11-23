import {
  Box,
  Collapse,
  Table,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
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
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import StarIcon from "@mui/icons-material/Star";
import {
  CheckArrNhiHop,
  CheckArrTamHop,
  CheckNhiHop,
  CheckTamHop,
} from "@Root/script/handleDateChange";
import { memo, useState } from "react";
import { DefineHacDaoHoangDao } from "@Root/script/calculatorCalender";
import { chiVi, DiaChi } from "@Root/script/AmLich";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";
const TableResult = ({ data, infoGiaChu, valueSelect, description }) => {
  const [checked, setChecked] = useState(false);
  return (
    <Collapse
      in={checked}
      collapsedSize={40}
      onClick={() => {
        setChecked(!checked);
      }}>
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
                <TableRow style={{ cursor: "pointer" }}>
                  {/* Status */}
                  <TableCell
                    style={{
                      textAlign: "left",
                      width: "65%",
                      fontSize: 18,
                      fontWeight: "bold",
                    }}>
                    <span className="mr-2">
                      {data.isTruongHop2BonusHoaHop === false ? (
                        <CachedOutlinedIcon />
                      ) : data.isTruongHop2BonusHoaHop === true ? (
                        <SwapHorizOutlinedIcon />
                      ) : (
                        <></>
                      )}
                    </span>
                    {Object.keys(ObjectTruc[data.truc].KhongLam).includes(
                      valueSelect
                    )
                      ? "Bình Thường"
                      : Object.keys(ObjectTu[data.tu].KhongLam).includes(
                          valueSelect
                        )
                      ? "Hơi Tốt"
                      : !Object.keys(ObjectTu[data.tu].CanLam).includes(
                          valueSelect
                        ) &&
                        !Object.keys(ObjectTruc[data.truc].CanLam).includes(
                          valueSelect
                        )
                      ? "Tốt"
                      : "Rất Tốt"}
                    {Object.keys(ObjectTruc[data.truc].CanLam).includes(
                      valueSelect
                    ) &&
                      Object.keys(ObjectTu[data.tu].CanLam).includes(
                        valueSelect
                      ) && (
                        <StarIcon
                          style={{
                            color: "#F9D045",
                            marginTop: -2,
                            fontSize: 20,
                          }}
                        />
                      )}
                    {CheckArrTamHop(
                      data.gio,
                      CHI_NAM[infoGiaChu?.tuoiGiaChu % 12]
                    ) ? (
                      <StarIcon
                        style={{
                          color: "#F9D045",
                          marginTop: -2,
                          fontSize: 20,
                        }}
                      />
                    ) : CheckArrNhiHop(
                        data.gio,
                        CHI_NAM[infoGiaChu?.tuoiGiaChu % 12]
                      ) ? (
                      <StarIcon style={{ color: "#F9D045", marginTop: -2 }} />
                    ) : (
                      ""
                    )}
                    {/* Ngay Tam Hop Nhi Hop */}
                    {CheckTamHop(
                      data.ngayChi,
                      CHI_NAM[infoGiaChu?.tuoiGiaChu % 12]
                    ) ? (
                      <StarIcon
                        style={{
                          color: "#F9D045",
                          marginTop: -2,
                          fontSize: 20,
                        }}
                      />
                    ) : CheckNhiHop(
                        data.ngayChi,
                        CHI_NAM[infoGiaChu?.tuoiGiaChu % 12]
                      ) ? (
                      <StarIcon style={{ color: "#F9D045", marginTop: -2 }} />
                    ) : (
                      ""
                    )}
                    {/* Ngay Hoang Dao Cuoi-hoi */}
                    {description === "cuoi-hoi" ? (
                      DefineHacDaoHoangDao(
                        data.monthLunar,
                        CHI[chiVi(DiaChi(data.daysTotalInLunar))]
                      ) ? (
                        <StarIcon style={{ color: "#F9D045", marginTop: -2 }} />
                      ) : (
                        <StarIcon style={{ color: "#A2612E", marginTop: -2 }} />
                      )
                    ) : (
                      ""
                    )}
                    {/* Tang su Tam/Nhi Hop */}
                    {description === "tang-su" ? (
                      CheckTamHop(
                        data.ngayChi,
                        CHI_NAM[infoGiaChu?.tuoiGiaChu % 12]
                      ) ? (
                        <StarIcon
                          style={{
                            color: "#F9D045",
                            marginTop: -2,
                            fontSize: 20,
                          }}
                        />
                      ) : CheckNhiHop(
                          data.ngayChi,
                          CHI_NAM[infoGiaChu?.tuoiGiaChu % 12]
                        ) ? (
                        <StarIcon style={{ color: "#F9D045", marginTop: -2 }} />
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                    {description === "tang-su" || description === "sang-cat"
                      ? (data.ngayChi === "Thìn" ||
                          data.ngayChi === "Tuất" ||
                          data.ngayChi === "Sửu" ||
                          data.ngayChi === "Mùi") && (
                          <StarIcon
                            style={{
                              color: "#F9D045",
                              marginTop: -2,
                              fontSize: 20,
                            }}
                          />
                        )
                      : ""}
                    <ChevronRightIcon
                      style={{
                        marginTop: -2,
                        fontSize: 30,
                      }}
                    />{" "}
                    {data.daySolar}/{data.monthSolar}/{data.yearSolar} | ÂL:{" "}
                    {data.dayLunar}/{data.monthLunar}/{data.yearLunar}
                    {"  ("}
                    {data.ngayCan} {data.ngayChi} / {data.thangCan}{" "}
                    {data.thangChi} / {CAN_NAM[data.yearLunar % 10]}{" "}
                    {CHI_NAM[data.yearLunar % 12] + ")"}
                  </TableCell>
                  <TableCell
                    style={{
                      textAlign: "center",
                      width: "50%",
                      textDecorationLine: "underline",
                      fontSize: 16,
                    }}>
                    Chi tiết
                    <ChevronRightIcon
                      sx={{
                        rotate: "90deg",
                      }}
                      style={{
                        marginTop: -2,
                        fontSize: 30,
                        transform: checked
                          ? "rotateZ(0deg)"
                          : "rotateZ(-90deg)",
                        transition: "transform 0.2s",
                      }}
                    />
                  </TableCell>
                </TableRow>
                {/* "Dương lịch"*/}
                <TableRow style={{}}>
                  <TableCell
                    style={{
                      textAlign: "left",
                      minWidth: 120,
                      fontSize: 16,
                    }}>
                    Dương lịch
                  </TableCell>
                  <TableCell
                    style={{
                      textAlign: "center",
                      minWidth: 50,
                      fontSize: 16,
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
                      fontSize: 16,
                    }}>
                    Âm lịch
                  </TableCell>
                  <TableCell
                    style={{
                      textAlign: "center",
                      minWidth: 120,
                      fontSize: 16,
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
                      fontSize: 16,
                    }}>
                    Giờ (
                    {data?.titleCheckGioNgayThang &&
                      data?.titleCheckGioNgayThang?.toString()}
                    ){" "}
                  </TableCell>
                  <TableCell
                    style={{
                      textAlign: "center",
                      minWidth: 120,
                      fontSize: 16,
                    }}>
                    {data &&
                      data?.gio?.map((itemGio, index) => {
                        if (
                          (Array.isArray(data?.arrHoursOke) &&
                            data?.arrHoursOke?.includes(itemGio)) ||
                          data.arrHoursOke === undefined
                        )
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
                                  data.arrGioCan[
                                    CHI_NAM_SORTED.indexOf(itemGio)
                                  ]
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
                              {Array.isArray(data?.arrHoursOke) &&
                                data?.arrHoursOke?.includes(itemGio) &&
                                data?.titleCheckGioNgayThang &&
                                "(" +
                                  data?.titleCheckGioNgayThang[
                                    data?.arrHoursOke?.indexOf(itemGio)
                                  ] +
                                  ")"}{" "}
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
                      fontSize: 16,
                    }}>
                    Trực/Tú
                  </TableCell>
                  <TableCell
                    style={{
                      textAlign: "center",
                      minWidth: 120,
                      fontSize: 16,
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
                          ObjectTu[data.tu].CanLam
                        ).includes(valueSelect)
                          ? "uppercase"
                          : "capitalize",
                        fontWeight: Object.keys(
                          ObjectTu[data.tu].CanLam
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
    </Collapse>
  );
};
export default memo(TableResult);
