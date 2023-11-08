import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const TableKyMon = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {data.map((cell, index) => {
            if (index % 3 == 0) {
              console.log(cell, index, "index");
              return (
                <TableRow>
                  <TableCell align="center">
                    <div>
                      <div className="pb-5">{data[index]?.value}</div>
                      <div
                        style={{
                          color: "red",
                          position: "relative",
                        }}>
                        Đi theo: {data[index]?.CanDiTheo}
                        <p className=" absolute -top-4 -right-2">
                          {data[index]?.StatusCanDiTheo?.toString()}
                        </p>
                      </div>
                      <div
                        style={{
                          fontWeight:
                            data[index].name === "Mậu" ? "bold" : "400",
                        }}>
                        {data[index]?.name}
                      </div>
                      <div style={{}}>
                        Trực sử:{" "}
                        {data[index]?.arrSu?.map((item) => {
                          return item;
                        })}{" "}
                        - {data[index]?.bonusTrucSu}
                      </div>
                      <div style={{}}>
                        Trực phù: {data[index]?.arrTinh}-{" "}
                        {data[index]?.bonusTrucPhu}
                      </div>

                      <div style={{}}>
                        Bát thần: {data[index]?.BatThan?.toString()}
                      </div>
                      <div style={{}}>{data[index]?.KV}</div>
                      <div style={{}}>{data[index]?.MaTinh}</div>
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    <div>
                      <div className="pb-5">{data[index + 1].value}</div>
                      {data[index + 1].value !== 5 && (
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
                      )}
                      {data[index + 1].value === 5 && (
                        <div
                          style={{
                            fontWeight:
                              data[index + 1].name === "Mậu" ? "bold" : "400",
                          }}>
                          {data[index + 1].name}
                        </div>
                      )}
                      {data[index + 1].value !== 5 && (
                        <>
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
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell align="center">
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
                    </div>
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

export default TableKyMon;
