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
  CheckCongCo,
  CheckCoNhatTuanPhong,
  CheckDaiBai,
  CheckDaiLoi,
  CheckDuongCong,
  CheckHongXaKyNhat,
  CheckNgaySat,
  CheckNghenhHonKyNhat,
  CheckNguHanhTuongSinh,
  CheckNhacThan,
  CheckNhiHop,
  CheckPhuChu,
  CheckTamHop,
  CheckTamTai,
  CheckTheChu,
  CheckThienTaiDiaHoa,
  CheckTieuLoi,
  CheckTrucXungNgayThangNam,
  CheckTrucXungTyHoa,
  CheckTuongXungTuongHaiTuoiMonth,
  GetHoangVuTuQuy,
} from "@Root/script/handleDateChange";
import moment from "moment";
import { memo } from "react";
import { getSunriseDateTimeUtc, getSunsetDateTimeUtc } from "suntimes";

const TableShow = ({ data, infoGiaChu, valueSelect, toaNha }) => {
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
                let backky = "";

                if (date.dayLunar === 1) backky = "Mùng 1";
                if (date.dayLunar === 15) backky = "Rằm";
                if (
                  monthDays(date.yearLunar, date.monthLunar) === date.dayLunar
                )
                  backky = "Cuối tháng ";
                if (
                  CheckTamTai(
                    CHI_NAM[infoGiaChu?.namSinhNam % 12],
                    date.ngayChi
                  )
                )
                  backky = "Tam Tai Ngày nam";

                if (
                  CheckTamTai(CHI_NAM[infoGiaChu?.namSinhNu % 12], date.ngayChi)
                )
                  backky = "Tam Tai Ngày nữ";
                if (NGUYET_KY.includes(date.dayLunar)) backky = "Nguyệt kỵ";
                if (TAM_NUONG.includes(date.dayLunar)) backky = "Tam Nương";
                if (THO_TU[date.monthLunar - 1] === date.ngayChi)
                  backky = "Thọ Tử";
                if (SAT_CHU_AM[date.monthLunar - 1] === date.ngayChi)
                  backky = "Sát chủ âm";
                if (SAT_CHU_DUONG[date.monthLunar - 1] === date.ngayChi)
                  backky = "Sát chủ dương";
                if (VANG_VONG[date.monthLunar - 1] === date.ngayChi)
                  backky = "Vãng vong";
                if (NGUYET_PHA[date.monthLunar - 1] === date.ngayChi)
                  backky = "Nguyệt Phá";
                if (
                  CheckTrucXungNgayThangNam(
                    CHI_NAM[date.yearLunar % 12],
                    date.ngayChi
                  )
                )
                  backky = "Tuế Phá";

                // Dai hao
                if (
                  CheckTrucXungNgayThangNam(
                    CHI_NAM[Number(infoGiaChu?.namSinhNam) % 12],
                    date.ngayChi
                  )
                ) {
                  backky = "Đại Hao Nam";
                }
                if (
                  CheckTrucXungNgayThangNam(
                    CHI_NAM[Number(infoGiaChu?.namSinhNu) % 12],
                    date.ngayChi
                  )
                ) {
                  backky = "Đại Hao Nữ";
                }
                // ngay sat
                if (
                  CheckNgaySat(
                    date.ngayChi,
                    CHI_NAM[infoGiaChu?.namSinhNu % 12]
                  )
                )
                  backky = "Ngày Sát Nữ";

                if (
                  CheckNgaySat(
                    date.ngayChi,
                    CHI_NAM[infoGiaChu?.namSinhNam % 12]
                  )
                )
                  backky = "Ngày Sát Nam";
                // dai bai
                if (
                  CheckDaiBai(
                    date.namCan,
                    date.monthLunar,
                    date.ngayCan + " " + date.ngayChi
                  )
                )
                  backky = "Đại bại";
                // duong cong
                if (CheckDuongCong(date.monthLunar, date.dayLunar))
                  backky = "Dương Công";
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
                  backky = "Hoang vu tứ quý";
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
                  backky = "Không phòng";
                // xung,trung,hai tuoi nam

                if (
                  CheckTuongXungTuongHaiTuoiMonth(
                    CHI_NAM[infoGiaChu?.namSinhNam % 12],
                    date.ngayChi
                  )
                )
                  backky = "Xung, trùng, hại tuổi nam";

                // xung,trung,hai tuoi nu

                if (
                  CheckTuongXungTuongHaiTuoiMonth(
                    CHI_NAM[infoGiaChu?.namSinhNu % 12],
                    date.ngayChi
                  )
                )
                  backky = "Xung, trùng, hại tuổi nữ";
                if (CheckHongXaKyNhat(date.monthLunar, date.ngayChi))
                  backky = "Hồng Xá kỵ nhật";
                if (CheckNghenhHonKyNhat(date.ngayCan + " " + date.ngayChi))
                  backky = "Nghênh hôn kỵ nhật";
                if (CheckCoNhatTuanPhong(date.monthLunar, date.ngayChi))
                  backky = "Cô nhật tuần phong";
                //Thien tai dia hoa
                if (CheckThienTaiDiaHoa(date.ngayChi, date.monthLunar))
                  backky = "Thiên tai địa hoạ";
                if (
                  toaNha &&
                  !CheckNguHanhTuongSinh(
                    NGU_HANH[toaNha],
                    NGU_HANH[date.ngayCan]
                  )
                )
                  backky = "Ngũ hành tương khắc";
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
                            <div className="flex flex-row text-center my-1">
                              {date.gio?.map((itemGio, index) => {
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
                                          CHI_NAM[infoGiaChu?.namSinhNam % 12],
                                          itemGio
                                        )
                                          ? "(Tam Hợp Nam), "
                                          : CheckTamHop(
                                              CHI_NAM[
                                                infoGiaChu?.namSinhNu % 12
                                              ],
                                              itemGio
                                            )
                                          ? "(Tam Hợp Nữ),"
                                          : CheckNhiHop(
                                              CHI_NAM[
                                                infoGiaChu?.namSinhNam % 12
                                              ],
                                              itemGio
                                            )
                                          ? "(Nhị Hợp Nam), "
                                          : CheckNhiHop(
                                              CHI_NAM[
                                                infoGiaChu?.namSinhNu % 12
                                              ],
                                              itemGio
                                            )
                                          ? "(Nhị Hợp Nữ), "
                                          : "")}
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
                            <div className="flex flex-row text-center my-1">
                              {date.gio?.map((itemGio, index) => {
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
                                          CHI_NAM[infoGiaChu?.namSinhNam % 12],
                                          itemGio
                                        )
                                          ? "(Tam Hợp Nam), "
                                          : CheckTamHop(
                                              CHI_NAM[
                                                infoGiaChu?.namSinhNu % 12
                                              ],
                                              itemGio
                                            )
                                          ? "(Tam Hợp Nữ),"
                                          : CheckNhiHop(
                                              CHI_NAM[
                                                infoGiaChu?.namSinhNam % 12
                                              ],
                                              itemGio
                                            )
                                          ? "(Nhị Hợp Nam), "
                                          : CheckNhiHop(
                                              CHI_NAM[
                                                infoGiaChu?.namSinhNu % 12
                                              ],
                                              itemGio
                                            )
                                          ? "(Nhị Hợp Nữ), "
                                          : "")}
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
                      <span className="flex flex-row text-center" style={{}}>
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
export default memo(TableShow);
