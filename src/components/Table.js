import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { getSunLongitude, jdn, monthDays } from "@Root/script/AmLich";
import {
  CHI,
  CHI_NAM,
  CHI_NAM_SORTED,
  COLOR_TEXT_NGU_HANH,
  GIO_DIA_CHI,
  HOANG_VU_TU_QUY,
  KHONG_PHONG,
  NGUYET_KY,
  NGUYET_PHA,
  NGU_HANH,
  ObjectTruc,
  ObjectTu,
  SAT_CHU_AM,
  SAT_CHU_DUONG,
  TAM_NUONG,
  THO_TU,
  VANG_VONG,
} from "@Root/script/Constant";
import {
  CheckDaiBai,
  CheckDuongCong,
  CheckGioSatChu,
  CheckGioThoTu,
  CheckNguHanhTuongKhac,
  CheckNguHanhTuongKhacKhauQuyet,
  CheckNhiHop,
  CheckSinhHanh,
  CheckSinhXuat,
  CheckTamHop,
  CheckTamTai,
  CheckThienTaiDiaHoa,
  CheckTrucXungChi,
  CheckTrucXungNgayThangNam,
  CombineThienCan,
  GetHoangVuTuQuy,
} from "@Root/script/handleDateChange";
import moment from "moment";
import { memo } from "react";
import { getSunriseDateTimeUtc, getSunsetDateTimeUtc } from "suntimes";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";

const TableShow = ({
  step,
  data,
  infoGiaChu,
  valueSelect,
  toaNha,
  checkHopHoa,
}) => {
  // console.log(infoGiaChu);

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
                // Dai bai
                if (
                  CheckDaiBai(
                    date.namCan,
                    date.monthLunar,
                    date.ngayCan + " " + date.ngayChi
                  )
                )
                  backky.push("Đại bại");
                // Duong Cong
                if (CheckDuongCong(date.monthLunar, date.dayLunar))
                  backky.push("Dương Công");
                // hoang vu tu quy
                if (
                  HOANG_VU_TU_QUY[
                    GetHoangVuTuQuy(
                      getSunLongitude(
                        jdn(
                          Number(date.daySolar),
                          Number(date.monthSolar),
                          Number(date.yearSolar)
                        ),
                        7
                      )
                    )
                  ] === date.ngayChi
                )
                  backky.push("Hoang vu tứ quý");
                // khong phong
                if (
                  KHONG_PHONG[
                    GetHoangVuTuQuy(
                      getSunLongitude(
                        jdn(
                          Number(date.daySolar),
                          Number(date.monthSolar),
                          Number(date.yearSolar)
                        ),
                        7
                      )
                    )
                  ].includes(date.ngayChi)
                )
                  backky.push("Không phòng");
                if (CheckThienTaiDiaHoa(date.ngayChi, date.monthLunar))
                  backky.push("Thien Tai Dia Hoa");
                // if(CheckTamTai(tuoiChiGiaChu, date.namChi)) backky="Tam Tai"
                if (date.dayLunar === 1) backky.push("Mùng 1");
                if (date.dayLunar === 15) backky.push("Rằm");
                if (
                  monthDays(date.yearLunar, date.monthLunar) === date.dayLunar
                )
                  backky.push("Cuối tháng ");
                if (
                  infoGiaChu?.tuoiGiaChu &&
                  CheckTamTai(
                    CHI_NAM[infoGiaChu?.tuoiGiaChu % 12],
                    date.ngayChi
                  )
                )
                  backky.push("Tam Tai Ngày");
                if (NGUYET_KY.includes(date.dayLunar)) backky.push("Nguyệt kỵ");
                if (TAM_NUONG.includes(date.dayLunar)) backky.push("Tam Nương");
                if (THO_TU[date.monthLunar - 1] === date.ngayChi)
                  backky.push("Thọ Tử");
                if (SAT_CHU_AM[date.monthLunar - 1] === date.ngayChi)
                  backky.push("Sát chủ âm");
                if (SAT_CHU_DUONG[date.monthLunar - 1] === date.ngayChi)
                  backky.push("Sát chủ dương");
                if (VANG_VONG[date.monthLunar - 1] === date.ngayChi)
                  backky.push("Vãng vong");
                if (NGUYET_PHA[date.monthLunar - 1] === date.ngayChi)
                  backky.push("Nguyệt Phá");
                if (
                  CheckTrucXungNgayThangNam(
                    CHI_NAM[Number(date.yearLunar) % 12],
                    date.ngayChi
                  )
                )
                  backky.push("Tuế Phá");
                if (
                  CheckTrucXungNgayThangNam(
                    CHI_NAM[Number(infoGiaChu?.tuoiGiaChu) % 12],
                    date.ngayChi
                  )
                ) {
                  backky.push("Đại Hao");
                }
                if (checkHopHoa) {
                  let combineThienCanNgayThang = CombineThienCan(
                    date.thangCan,
                    date.ngayCan
                  );
                  let combineThienCanNgayNam = CombineThienCan(
                    date.namCan,
                    date.ngayCan
                  );

                  if (
                    combineThienCanNgayThang.length !== 0 ||
                    combineThienCanNgayNam.length !== 0
                  ) {
                    // console.log(
                    //   NGU_HANH[toaNha],
                    //   CheckNguHanhTuongKhac(
                    //     NGU_HANH[toaNha],
                    //     combineThienCanNgayThang
                    //   )
                    // );
                    if (
                      // ngay Thang
                      CheckNguHanhTuongKhacKhauQuyet(
                        NGU_HANH[date.thangChi],
                        combineThienCanNgayThang
                      ) ||
                      CheckNguHanhTuongKhacKhauQuyet(
                        NGU_HANH[date.ngayChi],
                        combineThienCanNgayThang
                      ) ||
                      CheckNguHanhTuongKhac(
                        NGU_HANH[toaNha],
                        combineThienCanNgayThang
                      ) ||
                      CheckSinhXuat(
                        NGU_HANH[toaNha],
                        combineThienCanNgayThang
                      ) ||
                      // ngay Nam
                      CheckNguHanhTuongKhacKhauQuyet(
                        NGU_HANH[date.namChi],
                        combineThienCanNgayNam
                      ) ||
                      CheckNguHanhTuongKhacKhauQuyet(
                        NGU_HANH[date.ngayChi],
                        combineThienCanNgayNam
                      ) ||
                      CheckNguHanhTuongKhac(
                        NGU_HANH[toaNha],
                        combineThienCanNgayNam
                      ) ||
                      CheckSinhXuat(NGU_HANH[toaNha], combineThienCanNgayNam)
                    ) {
                      backky.push("Hợp hoá");
                    }
                  }
                }
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
                        flexDirection: "row",
                        minWidth: 0,
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
                      {backky.length !== 0 ? "(" + backky.toString() + ")" : ""}
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
                            ObjectTu[date.tu]?.KhongLam
                          ).includes(valueSelect)
                            ? "red"
                            : "green",
                          // textTransform: Object.keys(
                          //   ObjectTu[date.tu]?.CanLam
                          // ).includes(valueSelect)
                          //   ? "uppercase"
                          //   : "capitalize",
                          // fontWeight: Object.keys(
                          //   ObjectTu[date.tu]?.CanLam
                          // ).includes(valueSelect)
                          //   ? "bold"
                          //   : "400",
                        }}>
                        {date.tu}
                      </span>
                    </TableCell>

                    <TableCell
                      clas
                      style={{
                        fontSize: 12,
                      }}>
                      <div style={{}}>
                        {date?.gio && (
                          <div>
                            Trong thời gian mặt trời mọc:
                            <div className="flex flex-col my-1">
                              {date.gio?.map((itemGio, indexChild) => {
                                let timeNormal = [];
                                // Normal
                                if (CheckTrucXungNgayThangNam(itemGio, toaNha))
                                  timeNormal.push("Xung toạ");

                                if (
                                  CheckTrucXungNgayThangNam(
                                    itemGio,
                                    date.ngayChi
                                  )
                                )
                                  timeNormal.push("Xung ngày");
                                if (
                                  CheckTrucXungNgayThangNam(
                                    itemGio,
                                    date.thangChi
                                  )
                                ) {
                                  timeNormal.push("Xung tháng");
                                }
                                if (CheckGioThoTu(date.ngayChi, itemGio)) {
                                  timeNormal.push("Thọ tử");
                                }
                                if (CheckGioSatChu(date.monthLunar, itemGio)) {
                                  timeNormal.push("Sát chủ");
                                }
                                if (
                                  CHI_NAM[
                                    Number(infoGiaChu?.tuoiGiaChu) % 12
                                  ] === itemGio
                                )
                                  timeNormal.push("Trùng tuổi");
                                if (
                                  CheckTrucXungNgayThangNam(
                                    CHI_NAM[
                                      Number(infoGiaChu?.tuoiGiaChu) % 12
                                    ],
                                    itemGio
                                  )
                                ) {
                                  timeNormal.push("Xung tuổi");
                                }

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
                                    <div
                                      key={Math.random() + indexChild}
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
                                          CHI_NAM[infoGiaChu?.tuoiGiaChu % 12],
                                          itemGio
                                        )
                                          ? "(Tam Hợp), "
                                          : CheckNhiHop(
                                              CHI_NAM[
                                                infoGiaChu?.tuoiGiaChu % 12
                                              ],
                                              itemGio
                                            )
                                          ? "(Nhị Hợp), "
                                          : "")}
                                      {timeErr.length !== 0 &&
                                        " (" + timeErr + ")"}
                                      {timeNormal.length !== 0 &&
                                        " (" +
                                          timeNormal
                                            .toString()
                                            .replaceAll(",", ", ") +
                                          ")"}
                                    </div>
                                  );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="my-2" style={{}}>
                        {date?.gio && (
                          <div>
                            Trong thời gian mặt trời lặn:
                            <div className="flex flex-col my-1">
                              {date.gio?.map((itemGio, indexChild) => {
                                let timeNormal = [];

                                // Normal
                                if (CheckTrucXungNgayThangNam(itemGio, toaNha))
                                  timeNormal.push("Xung toạ");

                                if (
                                  CheckTrucXungNgayThangNam(
                                    itemGio,
                                    date.ngayChi
                                  )
                                )
                                  timeNormal.push("Xung ngày");
                                if (
                                  CheckTrucXungNgayThangNam(
                                    itemGio,
                                    date.thangChi
                                  )
                                ) {
                                  timeNormal.push("Xung tháng");
                                }
                                if (CheckGioThoTu(date.ngayChi, itemGio)) {
                                  timeNormal.push("Thọ tử");
                                }
                                if (CheckGioSatChu(date.monthLunar, itemGio)) {
                                  timeNormal.push("Sát chủ");
                                }
                                // if (
                                //   CheckNguHanhTuongKhac(
                                //     NGU_HANH[toaNha],
                                //     NGU_HANH[
                                //       date.arrGioCan[
                                //         CHI_NAM_SORTED.indexOf(itemGio)
                                //       ]
                                //     ]
                                //   )
                                // )
                                //   timeNormal.push("Khắc hành toạ");
                                if (
                                  CHI_NAM[
                                    Number(infoGiaChu?.tuoiGiaChu) % 12
                                  ] === itemGio
                                )
                                  timeNormal.push("Trùng tuổi");
                                if (
                                  CheckTrucXungNgayThangNam(
                                    CHI_NAM[
                                      Number(infoGiaChu?.tuoiGiaChu) % 12
                                    ],
                                    itemGio
                                  )
                                ) {
                                  timeNormal.push("Xung tuổi");
                                }

                                //Hop Hoa
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
                                    <div
                                      key={Math.random() + indexChild}
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
                                          CHI_NAM[infoGiaChu?.tuoiGiaChu % 12],
                                          itemGio
                                        )
                                          ? "(Tam Hợp), "
                                          : CheckNhiHop(
                                              CHI_NAM[
                                                infoGiaChu?.tuoiGiaChu % 12
                                              ],
                                              itemGio
                                            )
                                          ? "(Nhị Hợp), "
                                          : "")}
                                      {timeErr.length !== 0 &&
                                        " (" + timeErr + ")"}
                                      {timeNormal.length !== 0 &&
                                        " (" +
                                          timeNormal
                                            .toString()
                                            .replaceAll(",", ", ") +
                                          ")"}
                                    </div>
                                  );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: 12,
                        textAlign: "center",
                      }}>
                      <span className="flex flex-row text-center" style={{}}>
                        {date?.gioHoangDao &&
                          date.gioHoangDao?.map((item, index) => {
                            return (
                              <div
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
                              </div>
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
export default memo(TableShow);
