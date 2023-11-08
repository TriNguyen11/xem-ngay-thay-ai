import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Box, IconButton } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
const COLOR_TABLE_HEADING = [
  "#89ACE7",
  "#E7C967",
  "#B6D088",
  "#B6D088",
  "#E7C967",
  "lightgray",
  "lightgray",
  "#E7C967",
  "#E98F7E",
];
const COLOR_TABLE_BODY = [
  "#97B6E8",
  "#EBD284",
  "#C0D79D",
  "#C0D79D",
  "#EBD284",
  "white",
  "white",
  "#EBD284",
  "#E99B8E",
];
const TableKyMon = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1000 }} aria-label="simple table">
        <TableBody>
          {data.map((cell, index) => {
            if (index % 3 == 0) {
              // console.log(cell, index, "index");
              return (
                <TableRow
                  className="flex flex-row justify-between"
                  style={{ border: "1px solid lightgray" }}>
                  <TableCell
                    align="center"
                    style={{
                      width: `${100 / 3}%`,
                      backgroundColor: COLOR_TABLE_BODY[data[index].value - 1],
                    }}>
                    <ElementOfTable data={data[index]} index={index} />
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      width: `${100 / 3}%`,
                      borderLeft: "1px solid black",
                      borderRight: "1px solid black",
                      backgroundColor:
                        COLOR_TABLE_BODY[data[index + 1].value - 1],
                    }}>
                    <ElementOfTable data={data[index + 1]} index={index + 1} />

                    {/* <div>
                      <div className="pb-5">{data[index + 1].value}</div>
                      <div
                        style={{
                          color: "red",
                          position: "relative",
                        }}>
                        Đi theo: {data[index + 1].CanDiTheo}
                        <p className=" absolute -top-4 -right-2">
                          {data[index + 1]?.StatusCanDiTheo?.toString()}
                        </p>
                      </div>
                      <div
                        style={{
                          fontWeight:
                            data[index + 1].name === "Mậu" ? "bold" : "400",
                        }}>
                        {data[index + 1].name}
                      </div>
                      <div style={{}}>
                        Trực sử:{" "}
                        {data[index + 1]?.arrSu?.map((item) => {
                          return item;
                        })}{" "}
                        - {data[index + 1]?.bonusTrucSu}
                      </div>
                      <div style={{}}>
                        Trực phù: {data[index + 1]?.arrTinh}-{" "}
                        {data[index + 1]?.bonusTrucPhu}
                      </div>

                      <div style={{}}>
                        Bát thần: {data[index + 1]?.BatThan?.toString()}
                      </div>
                      <div style={{}}>{data[index + 1]?.KV}</div>
                      <div style={{}}>{data[index + 1]?.MaTinh}</div>
                    </div> */}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      width: `${100 / 3}%`,

                      backgroundColor:
                        COLOR_TABLE_BODY[data[index + 2].value - 1],
                    }}>
                    <ElementOfTable
                      data={data[index + 2]}
                      index={index + 2}
                      isMid={true}
                    />
                    {/* 
                    <div>
                      <div className="pb-5">{data[index + 2].value}</div>
                      <div
                        style={{
                          color: "red",
                          position: "relative",
                        }}>
                        {data[index + 2].CanDiTheo}
                        <p className=" absolute -top-4 -right-2">
                          {data[index + 2]?.StatusCanDiTheo?.toString()}
                        </p>
                      </div>
                      <div
                        style={{
                          fontWeight:
                            data[index + 2].name === "Mậu" ? "bold" : "400",
                        }}>
                        {data[index + 2].name}
                      </div>
                      <div style={{}}>
                        Trực sử:{" "}
                        {data[index + 2]?.arrSu?.map((item) => {
                          return item;
                        })}{" "}
                        - {data[index + 2]?.bonusTrucSu}
                      </div>
                      <div style={{}}>
                        Trực phù: {data[index + 2]?.arrTinh}-{" "}
                        {data[index + 2]?.bonusTrucPhu}
                      </div>

                      <div style={{}}>
                        Bát thần: {data[index + 2]?.BatThan?.toString()}
                      </div>
                      <div style={{}}>{data[index + 2]?.KV}</div>
                      <div style={{}}>{data[index + 2]?.MaTinh}</div>
                    </div> */}
                  </TableCell>
                </TableRow>
              );
            }
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const ElementOfTable = ({ data, index, isMid }) => {
  return (
    <>
      {data.value !== 5 ? (
        <div className="flex flex-col justify-between" style={{}}>
          <div
            className="flex flex-row items-center mb-10 justify-center"
            style={{}}>
            {/* Icon */}
            <div
              style={{
                border: "1px solid black",
                height: 40,
                paddingRight: 15,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 15,
                backgroundColor: COLOR_TABLE_HEADING[data.value - 1],
              }}>
              <img src={`/Que${data.value}.png`} className="w-8 h-8"></img>
            </div>
            {/* value bang Tran */}

            <div
              className="text-[25px] font-bold"
              style={{
                border: "1px solid black",
                height: 40,
                paddingRight: 15,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 15,
                backgroundColor: COLOR_TABLE_HEADING[data.value - 1],
              }}>
              {data?.value}
            </div>
            {/* details  icon */}
            <div
              style={{
                border: "1px solid black",
                height: 40,
                paddingRight: 15,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 15,
                backgroundColor: COLOR_TABLE_HEADING[data.value - 1],
              }}>
              <div
                className="border-[1px] border-black rounded-full"
                style={{
                  backgroundColor: COLOR_TABLE_HEADING[data.value - 1],
                }}>
                <IconButton aria-label="info" className="border-black border">
                  <MoreHorizIcon fontSize="small" />
                </IconButton>
              </div>
            </div>
            <div
              style={{
                border: "1px solid black",
                height: 40,
                paddingRight: 10,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 10,
                flexWrap: "wrap",
                width: 130,
                backgroundColor: COLOR_TABLE_HEADING[data.value - 1],
                textTransform: "uppercase",
                fontWeight: "bold",
              }}>
              {data.BatThan}
            </div>
            {data?.MaTinh && (
              <div
                style={{
                  border: "1px solid black",
                  height: 40,
                  paddingRight: 15,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  paddingLeft: 15,
                  backgroundColor: COLOR_TABLE_HEADING[data.value - 1],
                }}>
                {data?.MaTinh}
              </div>
            )}
            {data?.KV && (
              <div
                style={{
                  border: "1px solid black",
                  height: 40,
                  paddingRight: 15,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  paddingLeft: 15,
                  backgroundColor: COLOR_TABLE_HEADING[data.value - 1],
                }}>
                {data?.KV}
              </div>
            )}
          </div>
          <div className="flex flex-row">
            {/* col 1 */}
            <div className="flex flex-col">
              <div className="min-w-[150px] w-[50%] pb-8">
                <div style={{}} className="text-xl relative">
                  {data.arrSu?.map((item) => {
                    return item;
                  })}
                  <div className="text-sm -mt-2 -top-2 -right-10 absolute  text-[red] w-32">
                    {data.bonusTrucSu}
                  </div>
                </div>
              </div>
              {data.arrTinh?.map((item, index) => {
                return (Array.isArray(item) ? item : [item])?.map((child) => {
                  return (
                    <div
                      className={`min-w-[150px] relative text-xl w-[50%] ${
                        index !== item.length - 1 ? "pb-8" : "pb-2"
                      }`}>
                      {" "}
                      {child}
                      <span className="text-sm -mt-2 ml-4 absolute  text-[red]">
                        {data.bonusTrucPhu[index]}
                      </span>
                    </div>
                  );
                });
              })}
            </div>
            {/* col 2 */}
            <div className="flex flex-col">
              <div className="min-w-[150px] w-[50%] pb-8">
                {data.CanDiTheo?.map((item, index) => {
                  return (
                    <>
                      <div
                        style={{}}
                        className={`text-xl relative ${
                          index !== data.CanDiTheo.length - 1 ? "mb-6" : "mb-2"
                        }`}>
                        {item +
                          (index !== data.CanDiTheo.length - 1 ? ", " : " ")}
                        <div className="text-sm  -top-4 -right-[40px]  absolute  text-[red] min-w-full">
                          {data.StatusCanDiTheo[index]
                            .toString()
                            .replace(",", ", ")}
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
              <div className={`min-w-[150px] w-[50%]  pb-2 text-xl `}>
                {" "}
                {data.name}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          {/* value bang Tran */}

          <div
            className="text-[black] text-[30px] font-bold"
            style={{
              height: 40,
              paddingRight: 15,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 15,
            }}>
            {data?.value}
          </div>
          <div className={`min-w-[150px] w-[50%]  pb-2 text-xl `}>
            {" "}
            {data.name}
          </div>
        </div>
      )}
    </>
  );
};
export default TableKyMon;
