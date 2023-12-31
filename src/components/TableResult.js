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
  CheckNguHanhTuongKhac,
  CheckNhiHop,
  CheckSinhHanh,
  CheckSinhXuat,
  CheckTamHop,
  CheckTySinh,
} from "@Root/script/handleDateChange";
import { memo, useState } from "react";
import { DefineHacDaoHoangDao } from "@Root/script/calculatorCalender";
import { chiVi, DiaChi } from "@Root/script/AmLich";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import Image from "next/image";
import DensityLargeIcon from "@mui/icons-material/DensityLarge";

const TableResult = ({
  data,
  infoGiaChu,
  valueSelect,
  description,
  toaNha,
}) => {
  const [checked, setChecked] = useState(false);
  // console.log(
  //   data,
  //   toaNha,
  //   NGU_HANH[data.ngayCan],
  //   CheckSinhHanh(toaNha, NGU_HANH[data.ngayCan]),
  //   CheckSinhXuat(toaNha, NGU_HANH[data.ngayCan]),
  //   "data"
  // );c
  // console.log(infoGiaChu,)

  let textStatusDate = "Bình Thường";

  if (toaNha) {
    if (CheckSinhHanh(NGU_HANH[toaNha], NGU_HANH[data.ngayCan])) {
      // Rat Tot
      if (
        CheckSinhHanh(NGU_HANH[data.ngayCan], NGU_HANH[data.ngayChi]) ||
        CheckSinhHanh(NGU_HANH[data.ngayChi], NGU_HANH[data.ngayCan])
      ) {
        textStatusDate = "Rất Tốt";
      } else {
        if (
          !CheckNguHanhTuongKhac(NGU_HANH[data.ngayCan], NGU_HANH[data.ngayChi])
        ) {
          textStatusDate = "Tốt";
        }
      }
    } else {
      if (
        !CheckNguHanhTuongKhac(NGU_HANH[toaNha], NGU_HANH[data.ngayCan]) &&
        !CheckSinhXuat(NGU_HANH[toaNha], NGU_HANH[data.ngayCan])
      ) {
        if (
          CheckSinhHanh(NGU_HANH[data.ngayCan], NGU_HANH[data.ngayChi]) ||
          CheckSinhHanh(NGU_HANH[data.ngayChi], NGU_HANH[data.ngayCan])
        ) {
          textStatusDate = "Tốt";
        } else {
          if (
            !CheckNguHanhTuongKhac(
              NGU_HANH[data.ngayCan],
              NGU_HANH[data.ngayChi]
            )
          ) {
            textStatusDate = "Hơi Tốt";
          }
        }
      }
    }
  } else {
    if (
      CheckSinhHanh(NGU_HANH[data.ngayCan], NGU_HANH[data.ngayChi]) ||
      CheckSinhHanh(NGU_HANH[data.ngayChi], NGU_HANH[data.ngayCan])
    ) {
      textStatusDate = "Tốt";
    } else {
      if (
        !CheckNguHanhTuongKhac(NGU_HANH[data.ngayCan], NGU_HANH[data.ngayChi])
      ) {
        textStatusDate = "Hơi Tốt";
      }
    }
  }

  return (
    <Collapse
      in={checked}
      collapsedSize={80}
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
            <Table
              sx={{ minWidth: 650, height: "100%" }}
              aria-label="simple table">
              <TableHead className="h-full">
                <TableRow style={{ cursor: "pointer", height: "100%" }}>
                  {/* Status */}
                  <TableCell
                    style={{
                      textAlign: "left",
                      width: "100%",
                      fontSize: 18,
                      fontWeight: "bold",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}>
                    <span className="mr-2 flex flex-row items-center">
                      {toaNha &&
                        (data.isTruongHop2BonusHoaHop === false ? (
                          CheckSinhHanh(
                            NGU_HANH[toaNha],
                            NGU_HANH[data.ngayCan]
                          ) ? (
                            <EastOutlinedIcon />
                          ) : CheckSinhXuat(
                              NGU_HANH[toaNha],
                              NGU_HANH[data.ngayCan]
                            ) ? (
                            <EastOutlinedIcon
                              style={{
                                transform: "rotate(180deg)",
                              }}
                            />
                          ) : (
                            <></>
                          )
                        ) : data.isTruongHop2BonusHoaHop === true ? (
                          <SwapHorizOutlinedIcon />
                        ) : (
                          <DensityLargeIcon />
                        ))}
                      {CheckSinhHanh(
                        NGU_HANH[data.ngayCan],
                        NGU_HANH[data.ngayChi]
                      ) ||
                      CheckSinhHanh(
                        NGU_HANH[data.ngayChi],
                        NGU_HANH[data.ngayCan]
                      ) ? (
                        <Image
                          src={"/Sinh.png"}
                          width={30}
                          height={30}
                          alt="No image"
                        />
                      ) : CheckNguHanhTuongKhac(
                          NGU_HANH[data.ngayCan],
                          NGU_HANH[data.ngayChi]
                        ) ||
                        CheckNguHanhTuongKhac(
                          NGU_HANH[data.ngayChi],
                          NGU_HANH[data.ngayCan]
                        ) ? (
                        <Image
                          width={30}
                          height={30}
                          src={"/Khac.png"}
                          alt="No image"
                        />
                      ) : (
                        <>
                          <Image
                            width={30}
                            height={30}
                            src={"/BinhThuong.png"}
                            alt="No image"
                          />
                        </>
                      )}
                    </span>
                    {data?.titleHopHoaNgay && (
                      <div className="border-2 border-gray-400 p-[3px] mr-2">
                        {data?.titleHopHoaNgay}
                      </div>
                    )}
                    {textStatusDate}
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
                    {/* {CheckArrTamHop(
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
                    )} */}
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
                    Giờ
                  </TableCell>
                  <TableCell
                    style={{
                      textAlign: "center",
                      minWidth: 120,
                      fontSize: 16,
                      // backgroundColor: "red",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}>
                    {data &&
                      data?.gio?.map((itemGio, index) => {
                        if (
                          (Array.isArray(data?.arrHoursOke) &&
                            data?.arrHoursOke?.includes(itemGio)) ||
                          data.arrHoursOke === undefined
                        ) {
                          return (
                            <div
                              key={Math.random()}
                              style={{
                                marginRight: 5,
                                marginBottom: 5,
                                color:
                                  COLOR_TEXT_NGU_HANH[
                                    NGU_HANH[
                                      data.arrGioCan[
                                        CHI_NAM_SORTED.indexOf(itemGio)
                                      ]
                                    ]
                                  ],
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                width: "100%",
                              }}>
                              {/* head */}
                              <div className="flex flex-row items-center w-[30%] justify-end">
                                {/* icon 1 */}
                                {toaNha &&
                                  (CheckSinhHanh(
                                    NGU_HANH[toaNha],
                                    NGU_HANH[
                                      data.arrGioCan[
                                        CHI_NAM_SORTED.indexOf(itemGio)
                                      ]
                                    ]
                                  ) ? (
                                    <EastOutlinedIcon />
                                  ) : CheckSinhXuat(
                                      NGU_HANH[toaNha],
                                      NGU_HANH[
                                        data.arrGioCan[
                                          CHI_NAM_SORTED.indexOf(itemGio)
                                        ]
                                      ]
                                    ) ? (
                                    <EastOutlinedIcon
                                      style={{
                                        transform: "rotate(180deg)",
                                      }}
                                    />
                                  ) : CheckNguHanhTuongKhac(
                                      NGU_HANH[toaNha],
                                      NGU_HANH[
                                        data.arrGioCan[
                                          CHI_NAM_SORTED.indexOf(itemGio)
                                        ]
                                      ]
                                    ) ? (
                                    <SwapHorizOutlinedIcon />
                                  ) : (
                                    <DensityLargeIcon />
                                  ))}
                                {/* icon 2 */}
                                <div className="ml-2">
                                  {CheckSinhHanh(
                                    NGU_HANH[
                                      data.arrGioCan[
                                        CHI_NAM_SORTED.indexOf(itemGio)
                                      ]
                                    ],
                                    NGU_HANH[itemGio]
                                  ) ||
                                  CheckSinhHanh(
                                    NGU_HANH[itemGio],
                                    NGU_HANH[
                                      data.arrGioCan[
                                        CHI_NAM_SORTED.indexOf(itemGio)
                                      ]
                                    ]
                                  ) ? (
                                    <Image
                                      src={"/Sinh.png"}
                                      width={30}
                                      height={30}
                                      alt="No image"
                                    />
                                  ) : CheckNguHanhTuongKhac(
                                      NGU_HANH[
                                        NGU_HANH[
                                          data.arrGioCan[
                                            CHI_NAM_SORTED.indexOf(itemGio)
                                          ]
                                        ]
                                      ],
                                      NGU_HANH[itemGio]
                                    ) ||
                                    CheckNguHanhTuongKhac(
                                      NGU_HANH[itemGio],
                                      NGU_HANH[
                                        data.arrGioCan[
                                          CHI_NAM_SORTED.indexOf(itemGio)
                                        ]
                                      ]
                                    ) ? (
                                    <Image
                                      width={30}
                                      height={30}
                                      src={"/Khac.png"}
                                      alt="No image"
                                    />
                                  ) : (
                                    <>
                                      <Image
                                        width={30}
                                        height={30}
                                        src={"/BinhThuong.png"}
                                        alt="No image"
                                      />
                                    </>
                                  )}
                                </div>

                                {Array.isArray(data?.arrHoursOke) &&
                                  data?.arrHoursOke?.includes(itemGio) &&
                                  data?.titleCheckGioNgayThang && (
                                    <div className="border-2 border-gray-400 p-[3px] ml-2">
                                      {
                                        data?.titleCheckGioNgayThang[
                                          data?.arrHoursOke?.indexOf(itemGio)
                                        ]
                                      }
                                    </div>
                                  )}
                              </div>
                              {/* body */}
                              <div className="mx-2 w-[35%]">
                                {data.arrGioCan[
                                  CHI_NAM_SORTED.indexOf(itemGio)
                                ] +
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
                                  ") "}
                                <div>
                                  {CheckTamHop(
                                    CHI_NAM[infoGiaChu?.tuoiGiaChu % 12],
                                    itemGio
                                  )
                                    ? "(Tam Hợp) "
                                    : CheckNhiHop(
                                        CHI_NAM[infoGiaChu?.tuoiGiaChu % 12],
                                        itemGio
                                      )
                                    ? "(Nhị Hợp) "
                                    : ""}
                                </div>
                              </div>
                              {/* tail */}
                              {CheckTamHop(
                                CHI_NAM[infoGiaChu?.tuoiGiaChu % 12],
                                itemGio
                              ) ? (
                                <StarIcon
                                  style={{
                                    color: "#F9D045",
                                    marginTop: -2,
                                    fontSize: 20,
                                  }}
                                />
                              ) : CheckNhiHop(
                                  CHI_NAM[infoGiaChu?.tuoiGiaChu % 12],
                                  itemGio
                                ) ? (
                                <StarIcon
                                  style={{ color: "#F9D045", marginTop: -2 }}
                                />
                              ) : (
                                ""
                              )}
                            </div>
                          );
                        }
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
