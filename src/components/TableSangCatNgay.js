import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { monthDays } from "@Root/script/AmLich";
import {
  CHI,
  CHI_NAM,
  CHI_NAM_SORTED,
  COLOR_TEXT_NGU_HANH,
  GIO_DIA_CHI,
  NGUYET_KY,
  NGUYET_PHA,
  NGU_HANH,
  ObjectTruc,
  ObjectTu,
  SAT_CHU_AM,
  SAT_CHU_DUONG,
  THO_TU,
} from "@Root/script/Constant";
import {
  CheckCase4TrungTang,
  CheckCase5TrungTang,
  CheckCongCo,
  CheckDaiLoi,
  CheckGioKiepSat,
  CheckKyChonCat,
  CheckNgayGioHaKhoi,
  CheckNgayGioThienTac,
  CheckNgayTrungNhat,
  CheckNguHanhTuongSinh,
  CheckNhacThan,
  CheckNhiHop,
  CheckPhuChu,
  CheckTamHop,
  CheckTheChu,
  CheckTieuLoi,
  CheckTrucXungHinhHaiChi,
  CheckTrucXungNgayThangNam,
  CheckTrucXungChi,
  CheckTrungTang,
  CheckSinhXuat,
  CombineThienCan,
  CheckNguHanhTuongKhac,
  CheckTrucXungHinhHaiChiTangSu,
} from "@Root/script/handleDateChange";
import moment from "moment";
import { memo } from "react";
import { getSunriseDateTimeUtc, getSunsetDateTimeUtc } from "suntimes";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";
import {
  GetErrorGioHopHoa,
  GetErrorTimeNormalSangCat,
} from "@Root/script/HandleGetErrorShow";

const TableSangCatNgay = ({ data, infoNguoiMat, valueSelect, toaNha }) => {
  console.log(
    CheckTrucXungHinhHaiChiTangSu(
      CHI_NAM[Number(infoNguoiMat?.namSinh) % 12],
      "Mão"
    ),
    Number(infoNguoiMat?.namSinh) % 12,
    "infoNguoiMat"
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
                  }}>
                  STT
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                    minWidth: 120,
                  }}>
                  Ngày Dương
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                    minWidth: 120,
                  }}>
                  Ngày Âm
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                    minWidth: 120,
                  }}>
                  Giờ đầu
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                    minWidth: 120,
                  }}>
                  Can/Chi Ngày
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                    minWidth: 120,
                  }}>
                  Can/Chi Tháng
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                    minWidth: 120,
                  }}>
                  Can/Chi Năm
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                    minWidth: 120,
                  }}>
                  Trực/Tú
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                    minWidth: 500,
                  }}>
                  Giờ Hợp
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                    minWidth: 500,
                  }}>
                  Giờ Hoàng Đạo
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((date, index) => {
                let backky = [];
                // 1.
                if (CheckTrucXungNgayThangNam(toaNha, date.ngayChi))
                  backky.push("Xung Toạ");

                // if (
                //   !CheckNguHanhTuongSinh(
                //     NGU_HANH[toaNha],
                //     NGU_HANH[date.ngayCan]
                //   )
                // )
                //   backky.push( "Ngũ hành tương khắc Toạ")
                // 2.
                if (
                  CheckTrucXungHinhHaiChiTangSu(
                    CHI_NAM[Number(infoNguoiMat?.namSinh) % 12],
                    date.ngayChi
                  )
                )
                  backky.push("Trùng, Xung, Hình, Hại tuổi mất");

                if (date.dayLunar === 1) backky.push("Mùng 1");
                if (date.dayLunar === 15) backky.push("Rằm");
                if (
                  monthDays(date.yearLunar, date.monthLunar) === date.dayLunar
                )
                  backky.push("Cuối tháng ");
                if (NGUYET_KY.includes(date.dayLunar)) backky.push("Nguyệt kỵ");

                if (THO_TU[date.monthLunar - 1] === date.ngayChi)
                  backky.push("Thọ Tử");
                if (SAT_CHU_AM[date.monthLunar - 1] === date.ngayChi)
                  backky.push("Sát chủ âm");
                if (SAT_CHU_DUONG[date.monthLunar - 1] === date.ngayChi)
                  backky.push("Sát chủ dương");
                // VANG_VONG[item.monthLunar - 1] !== item.ngayChi &&
                if (NGUYET_PHA[date.monthLunar - 1] === date.ngayChi)
                  backky.push("Nguyệt Phá");
                //Trung Phuc
                if (
                  CheckCase5TrungTang(
                    date.monthLunar,
                    date.ngayCan,
                    date.ngayChi
                  ).length !== 0
                )
                  backky.push("Trùng Phục");
                // than Trung
                if (
                  CheckCase4TrungTang(
                    date.monthLunar,
                    date.ngayCan,
                    date.ngayChi
                  ).length !== 0
                )
                  backky.push(" Thần Trùng");
                // Trung Nhat
                if (CheckNgayTrungNhat(date.ngayChi)) backky.push("Trùng Nhật");
                // Ha Khoi
                if (CheckNgayGioHaKhoi(date.monthLunar, date.ngayChi))
                  backky.push("Hà Khôi");
                // Thien Tac
                if (CheckNgayGioThienTac(date.monthLunar, date.ngayChi))
                  backky.push("Thiên Tặc");
                //Trung tang
                if (CheckTrungTang(date.monthLunar, date.ngayCan))
                  backky.push("Trùng tang");
                // kiep sat
                if (CheckGioKiepSat(infoNguoiMat?.namSinh, date.ngayChi))
                  backky.push("Kiếp sát");
                // Ky chon cat
                if (CheckKyChonCat(date.monthLunar, date.dayLunar))
                  backky.push("Kỵ Chôn cất");
                // if (CheckSinhXuat(NGU_HANH[toaNha], NGU_HANH[date.ngayCan])) {
                //   backky.push("Sinh xuất");
                // }
                return (
                  <TableRow
                    style={{
                      textAlign: "center",
                    }}
                    key={date.daySolar}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell
                      style={{
                        textAlign: "center",
                      }}>
                      {CheckNguHanhTuongKhac(
                        NGU_HANH[toaNha],
                        NGU_HANH[date.ngayCan]
                      ) && <SwapHorizOutlinedIcon />}{" "}
                      {index + 1}
                    </TableCell>
                    <TableCell
                      style={{
                        textAlign: "center",
                      }}>
                      {date.daySolar} - {date.monthSolar}- {date.yearSolar}
                    </TableCell>
                    <TableCell
                      style={{
                        textAlign: "center",
                      }}>
                      {date.dayLunar} - {date.monthLunar}- {date.yearLunar}{" "}
                      {backky.length !== 0 ? "(" + backky + ")" : ""}
                    </TableCell>
                    <TableCell
                      style={{
                        textAlign: "center",
                      }}>
                      {date.gioCan} Tý
                    </TableCell>
                    <TableCell
                      style={{ color: COLOR_TEXT_NGU_HANH[date.hanhNgay] }}>
                      {date.ngayCan} {date.ngayChi} ({date.hanhNgay})
                    </TableCell>
                    <TableCell
                      style={{
                        textAlign: "center",
                        color: COLOR_TEXT_NGU_HANH[date.hanhThang],
                      }}>
                      {date.thangCan} {date.thangChi} ({date.hanhThang})
                    </TableCell>
                    <TableCell
                      style={{
                        textAlign: "center",
                        color: COLOR_TEXT_NGU_HANH[NGU_HANH[date.namCan]],
                      }}>
                      {date.namCan} {date.namChi} ({NGU_HANH[date.namCan]})
                    </TableCell>
                    <TableCell
                      style={{
                        textAlign: "center",
                        flexDirection: "row",
                        alignItems: "center",
                      }}>
                      <span
                        style={{
                          color: Object.keys(
                            ObjectTruc[date.truc].KhongLam
                          ).includes(valueSelect)
                            ? "red"
                            : "green",
                          textTransform: Object.keys(
                            ObjectTruc[date.truc].CanLam
                          ).includes(valueSelect)
                            ? "uppercase"
                            : "capitalize",
                          fontWeight: Object.keys(
                            ObjectTruc[date.truc].CanLam
                          ).includes(valueSelect)
                            ? "bold"
                            : "400",
                        }}>
                        {date.truc} /{" "}
                      </span>

                      <span
                        style={{
                          color: Object.keys(
                            ObjectTu[date.tu].KhongLam
                          ).includes(valueSelect)
                            ? "red"
                            : "green",
                          textTransform: Object.keys(
                            ObjectTu[date.tu].CanLam
                          ).includes(valueSelect)
                            ? "uppercase"
                            : "capitalize",
                          fontWeight: Object.keys(
                            ObjectTu[date.tu].CanLam
                          ).includes(valueSelect)
                            ? "bold"
                            : "400",
                        }}>
                        {date.tu}
                      </span>
                    </TableCell>

                    <TableCell
                      clas
                      style={{
                        fontSize: 12,
                      }}>
                      <span style={{}}>
                        {date?.gio && (
                          <div>
                            Trong thời gian mặt trời mọc:
                            <div className="flex flex-col my-1">
                              {date.gio?.map((itemGio, index) => {
                                let timeNormal = GetErrorTimeNormalSangCat(
                                  itemGio,
                                  {
                                    ...date,
                                    cungNguoiMat:
                                      CHI_NAM[
                                        Number(infoNguoiMat?.namSinh) % 12
                                      ],
                                    chiNamSinh:
                                      CHI_NAM[infoNguoiMat?.namSinh % 12],
                                  },
                                  toaNha
                                );

                                let timeErr = "";
                                if (
                                  CheckNguHanhTuongKhac(
                                    NGU_HANH[toaNha],
                                    NGU_HANH[date.ngayCan]
                                  )
                                ) {
                                  timeErr = GetErrorGioHopHoa(
                                    itemGio,
                                    date.arrGioCan[
                                      CHI_NAM_SORTED.indexOf(itemGio)
                                    ],
                                    date.ngayCan,
                                    date.ngayChi,
                                    date.thangCan,
                                    date.thangChi,
                                    date.namCan,
                                    date.namChi,
                                    toaNha
                                  );
                                }
                                if (
                                  CHI_NAM_SORTED.indexOf(itemGio) > 2 &&
                                  CHI_NAM_SORTED.indexOf(itemGio) < 9
                                )
                                  return (
                                    <span
                                      key={Math.random()}
                                      style={{
                                        marginRight: 5,
                                        color:
                                          COLOR_TEXT_NGU_HANH[
                                            NGU_HANH[
                                              date.arrGioCan[
                                                CHI_NAM_SORTED.indexOf(itemGio)
                                              ]
                                            ]
                                          ],
                                      }}>
                                      {date.arrGioCan[
                                        CHI_NAM_SORTED.indexOf(itemGio)
                                      ] +
                                        " " +
                                        itemGio +
                                        " (" +
                                        GIO_DIA_CHI[CHI.indexOf(itemGio)] +
                                        ") " +
                                        "(" +
                                        NGU_HANH[
                                          date.arrGioCan[
                                            CHI_NAM_SORTED.indexOf(itemGio)
                                          ]
                                        ] +
                                        ")" +
                                        (CheckTamHop(
                                          CHI_NAM[infoNguoiMat?.namSinh % 12],
                                          itemGio
                                        )
                                          ? "(Tam Hợp), "
                                          : CheckTamHop(
                                              CHI_NAM[
                                                infoNguoiMat?.namSinh % 12
                                              ],
                                              itemGio
                                            )
                                          ? "(Tam Hợp),"
                                          : CheckNhiHop(
                                              CHI_NAM[
                                                infoNguoiMat?.namSinh % 12
                                              ],
                                              itemGio
                                            )
                                          ? "(Nhị Hợp), "
                                          : CheckNhiHop(
                                              CHI_NAM[
                                                infoNguoiMat?.namSinh % 12
                                              ],
                                              itemGio
                                            )
                                          ? "(Nhị Hợp), "
                                          : "")}
                                      {timeErr.length !== 0 &&
                                        " (" + timeErr + ")"}
                                      {timeNormal.length !== 0 &&
                                        " (" + timeNormal.toString() + ")"}
                                    </span>
                                  );
                              })}
                            </div>
                          </div>
                        )}
                      </span>
                      <span className="my-2" style={{}}>
                        {date?.gio && (
                          <div>
                            Trong thời gian mặt trời lặn:
                            <div className="flex flex-col  my-1">
                              {date.gio?.map((itemGio, index) => {
                                console.log(itemGio, "itemGioitemGio");
                                let timeNormal = GetErrorTimeNormalSangCat(
                                  itemGio,
                                  {
                                    ...date,
                                    cungNguoiMat:
                                      CHI_NAM[
                                        Number(infoNguoiMat?.namSinh) % 12
                                      ],
                                    chiNamSinh:
                                      CHI_NAM[infoNguoiMat?.namSinh % 12],
                                  },
                                  toaNha
                                );

                                let timeErr = "";
                                if (
                                  CheckNguHanhTuongKhac(
                                    NGU_HANH[toaNha],
                                    NGU_HANH[date.ngayCan]
                                  )
                                ) {
                                  timeErr = GetErrorGioHopHoa(
                                    itemGio,
                                    date.arrGioCan[
                                      CHI_NAM_SORTED.indexOf(itemGio)
                                    ],
                                    date.ngayCan,
                                    date.ngayChi,
                                    date.thangCan,
                                    date.thangChi,
                                    date.namCan,
                                    date.namChi,
                                    toaNha
                                  );
                                }

                                if (
                                  CHI_NAM_SORTED.indexOf(itemGio) <= 2 ||
                                  CHI_NAM_SORTED.indexOf(itemGio) >= 9
                                )
                                  return (
                                    <span
                                      key={Math.random()}
                                      style={{
                                        marginRight: 5,
                                        color:
                                          COLOR_TEXT_NGU_HANH[
                                            NGU_HANH[
                                              date.arrGioCan[
                                                CHI_NAM_SORTED.indexOf(itemGio)
                                              ]
                                            ]
                                          ],
                                      }}>
                                      {date.arrGioCan[
                                        CHI_NAM_SORTED.indexOf(itemGio)
                                      ] +
                                        " " +
                                        itemGio +
                                        " (" +
                                        GIO_DIA_CHI[CHI.indexOf(itemGio)] +
                                        ") " +
                                        "(" +
                                        NGU_HANH[
                                          date.arrGioCan[
                                            CHI_NAM_SORTED.indexOf(itemGio)
                                          ]
                                        ] +
                                        ") " +
                                        (CheckTamHop(
                                          CHI_NAM[infoNguoiMat?.namSinh % 12],
                                          itemGio
                                        )
                                          ? "(Tam Hợp), "
                                          : CheckTamHop(
                                              CHI_NAM[
                                                infoNguoiMat?.namSinh % 12
                                              ],
                                              itemGio
                                            )
                                          ? "(Tam Hợp),"
                                          : CheckNhiHop(
                                              CHI_NAM[
                                                infoNguoiMat?.namSinh % 12
                                              ],
                                              itemGio
                                            )
                                          ? "(Nhị Hợp), "
                                          : CheckNhiHop(
                                              CHI_NAM[
                                                infoNguoiMat?.namSinh % 12
                                              ],
                                              itemGio
                                            )
                                          ? "(Nhị Hợp), "
                                          : "")}
                                      {timeErr.length !== 0 &&
                                        " (" + timeErr + ")"}
                                      {timeNormal.length !== 0 &&
                                        " (" + timeNormal.toString() + ")"}
                                    </span>
                                  );
                              })}
                            </div>
                          </div>
                        )}
                      </span>
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: 12,
                        textAlign: "center",
                      }}>
                      <span className="flex flex-col" style={{}}>
                        {date?.gioHoangDao &&
                          date.gioHoangDao?.map((item, index) => {
                            return (
                              <span
                                key={Math.random()}
                                style={{
                                  marginRight: 5,
                                  color:
                                    COLOR_TEXT_NGU_HANH[
                                      NGU_HANH[
                                        date.arrGioCan[
                                          CHI_NAM_SORTED.indexOf(item)
                                        ]
                                      ]
                                    ],
                                }}>
                                {date.arrGioCan[CHI_NAM_SORTED.indexOf(item)] +
                                  " " +
                                  item +
                                  " (" +
                                  GIO_DIA_CHI[CHI.indexOf(item)] +
                                  ") " +
                                  "(" +
                                  NGU_HANH[
                                    date.arrGioCan[CHI_NAM_SORTED.indexOf(item)]
                                  ] +
                                  ")"}
                              </span>
                            );
                          })}
                      </span>
                      {date?.gio && (
                        <div className="flex flex-row  mt-2">
                          <div style={{ marginRight: 10 }}>
                            Mặt trời mọc:{" "}
                            <span className="font-bold text-base">
                              {moment(
                                getSunriseDateTimeUtc(
                                  new Date(
                                    Number(date.yearSolar),
                                    Number(date.monthSolar) - 1,
                                    Number(date.daySolar)
                                  ),
                                  21.030653,
                                  105.84713
                                )
                              ).format("hh:mm:ss")}
                            </span>
                          </div>
                          <div>
                            Mặt trời lặn:{" "}
                            <span className="font-bold text-base">
                              {moment(
                                getSunsetDateTimeUtc(
                                  new Date(
                                    Number(date.yearSolar),
                                    Number(date.monthSolar) - 1,
                                    Number(date.daySolar)
                                  ),
                                  21.030653,
                                  105.84713
                                )
                              )
                                .clone()
                                .add(1, "millisecond")
                                .format("HH:mm:ss")}{" "}
                            </span>
                          </div>
                        </div>
                      )}
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
export default memo(TableSangCatNgay);
