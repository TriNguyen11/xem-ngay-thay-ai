import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { IconButton } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { PARSE_THIEN_CAN_VIET_TAT_V2 } from "@Root/script/ConstantKyMon";
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
const TableKyMon = ({ data, setDetailsBatMon, HDMYA }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1000 }} aria-label="simple table">
        <TableBody>
          {data?.map((cell, index) => {
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
                      padding: 0,
                      backgroundColor: COLOR_TABLE_BODY[data[index].value - 1],
                    }}>
                    <ElementOfTable
                      HDMYA={HDMYA}
                      data={data[index]}
                      index={index}
                      setDetailsBatMon={setDetailsBatMon}
                    />
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      width: `${100 / 3}%`,
                      borderLeft: "1px solid black",
                      borderRight: "1px solid black",
                      backgroundColor:
                        COLOR_TABLE_BODY[data[index + 1].value - 1],
                      padding: 0,
                    }}>
                    <ElementOfTable
                      HDMYA={HDMYA}
                      data={data[index + 1]}
                      index={index + 1}
                      setDetailsBatMon={setDetailsBatMon}
                    />
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      width: `${100 / 3}%`,
                      backgroundColor:
                        COLOR_TABLE_BODY[data[index + 2].value - 1],
                      padding: 0,
                    }}>
                    <ElementOfTable
                      HDMYA={HDMYA}
                      setDetailsBatMon={setDetailsBatMon}
                      data={data[index + 2]}
                      index={index + 2}
                      isMid={true}
                    />
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

const ElementOfTable = ({ data, setDetailsBatMon, HDMYA }) => {
  // console.log(HDMYA, "HDMYA", data);
  let HDMYA_Show = [];
  Object.keys(HDMYA).map((key) => {
    if (data?.CanDiTheo && data.CanDiTheo.includes(HDMYA[key]))
      HDMYA_Show.push(key);
  });
  return (
    <>
      {data?.value !== 5 ? (
        <div className="flex flex-col justify-between w-full" style={{}}>
          <div
            className="flex flex-row items-center mb-10 justify-center w-full"
            style={{}}>
            {/* Icon */}
            <div
              style={{
                border: "1px solid black",
                height: 60,
                paddingRight: 15,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 15,
                backgroundColor: COLOR_TABLE_HEADING[data?.value - 1],
                // flex: 1,
              }}>
              <img src={`/Que${data?.value}.png`} className="w-8 h-8"></img>
            </div>
            {/* value bang Tran */}

            <div
              className="text-[25px] font-bold"
              style={{
                border: "1px solid black",
                height: 60,
                paddingRight: 15,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 15,
                backgroundColor: COLOR_TABLE_HEADING[data?.value - 1],
              }}>
              {data?.value}
            </div>
            {/* details  icon */}
            <div
              style={{
                border: "1px solid black",
                height: 60,
                paddingRight: 15,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 15,
                backgroundColor: COLOR_TABLE_HEADING[data?.value - 1],
              }}>
              <div
                className="border-[1px] border-black rounded-full"
                style={{
                  backgroundColor: COLOR_TABLE_HEADING[data?.value - 1],
                }}
                onClick={() => {
                  setDetailsBatMon(data);
                }}>
                <IconButton aria-label="info" className="border-black border">
                  <MoreHorizIcon fontSize="small" />
                </IconButton>
              </div>
            </div>
            <div
              style={{
                border: "1px solid black",
                height: 60,
                paddingRight: 10,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 10,
                flexWrap: "wrap",
                width: 130,
                backgroundColor: COLOR_TABLE_HEADING[data?.value - 1],
                textTransform: "uppercase",
                fontWeight: "bold",
                flex: 2,
                textAlign: "center",
              }}>
              {data?.BatThan || "Trực Phù (Mộc)"}
            </div>
            {data?.MaTinh && (
              <div
                style={{
                  border: "1px solid black",
                  height: 60,
                  paddingRight: 15,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  paddingLeft: 15,

                  backgroundColor: COLOR_TABLE_HEADING[data?.value - 1],
                }}>
                {data?.MaTinh}
              </div>
            )}
            {data?.KV && (
              <div
                style={{
                  border: "1px solid black",
                  height: 60,
                  paddingRight: 15,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  paddingLeft: 15,
                  backgroundColor: COLOR_TABLE_HEADING[data?.value - 1],
                }}>
                {data?.KV}
              </div>
            )}
          </div>
          <div className="mb-4 font-bold text-[24px]">
            {HDMYA_Show.toString()}
          </div>
          <div className="flex flex-row">
            {/* col 1 */}
            <div className="flex flex-col">
              <div className="min-w-[150px] w-[50%] pb-8">
                <div style={{}} className="text-xl relative">
                  {data?.arrSu &&
                    data?.arrSu?.map((item) => {
                      return item;
                    })}
                  <div className="text-sm -mt-2 -top-2 -right-10 absolute  text-[red] w-32">
                    {data?.bonusTrucSu}
                  </div>
                </div>
              </div>
              {data?.arrTinh &&
                (Array.isArray(data?.arrTinh)
                  ? data?.arrTinh.includes("Nhuế") ||
                    data?.arrTinh.includes("Cầm")
                    ? ["Nhuế", "Cầm"]
                    : data?.arrTinh
                  : data?.arrTinh === "Nhuế" || data?.arrTinh === "Cầm"
                  ? ["Nhuế", "Cầm"]
                  : [data?.arrTinh]
                )?.map((item, index) => {
                  return (Array.isArray(item) ? item : [item])?.map((child) => {
                    return (
                      <div
                        className={`min-w-[150px] relative text-xl w-[50%] ${
                          index !== item.length - 1 ? "pb-8" : "pb-2"
                        }`}>
                        {" "}
                        {child}
                        <span className="text-sm -mt-2 ml-4 absolute  text-[red]">
                          {data?.bonusTrucPhu[index]}
                        </span>
                      </div>
                    );
                  });
                })}
            </div>
            {/* col 2 */}
            <div className="flex flex-col">
              <div className="min-w-[150px] w-[50%] pb-8">
                {data?.CanDiTheo &&
                  data?.CanDiTheo?.map((item, index) => {
                    return (
                      <>
                        <div
                          style={{}}
                          className={`text-xl relative ${
                            index !== data?.CanDiTheo?.length - 1
                              ? "mb-6"
                              : "mb-2"
                          }`}>
                          {item +
                            (index !== data?.CanDiTheo.length - 1 ? " " : " ")}
                          <div className="text-sm  -top-4 -right-[50px]  absolute  text-[red] min-w-full">
                            {
                              data?.StatusCanDiTheo[index].map(
                                (child, indexChild) => {
                                  return (
                                    PARSE_THIEN_CAN_VIET_TAT_V2[child] +
                                    (indexChild !==
                                    data?.StatusCanDiTheo[index].length - 1
                                      ? ", "
                                      : "")
                                  );
                                }
                              )
                              // ?.toString()
                              // .replace(",", ", ")
                            }
                          </div>
                        </div>
                      </>
                    );
                  })}
              </div>
              <div className={`min-w-[150px] w-[50%]  pb-2 text-xl `}>
                {" "}
                {data?.name}
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
              height: 50,
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
            {data?.name}
          </div>
        </div>
      )}
    </>
  );
};
export default TableKyMon;
