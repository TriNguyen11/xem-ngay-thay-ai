import { useMediaQuery, useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  BAT_MON_MO_TA,
  BAT_THAN_MO_TA,
  CUU_TINH_MO_TA,
  TRAN_81,
} from "@Root/script/ConstantKyMon";
import * as React from "react";
const ModalInfoBatMon = React.forwardRef(({ data }, ref) => {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setOpen(false);
    setValue(0);
  };
  const handleChange = (event, newValue) => {};
  const descriptionElementRef = React.useRef(null);

  React.useImperativeHandle(ref, () => ({
    OpenModal: () => {
      setOpen(true);
    },
    closeModal: () => {
      setOpen(false);
    },
  }));

  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  console.log(data, "data");
  let navbar = [];
  let navbarDetails = [];
  const Data_navbar = [];

  if (data) {
    navbar = [
      ...data.arrTinh,
      data.arrSu,
      data.BatThan ? data.BatThan : "Trực phù (Mộc)",
    ];

    navbarDetails = [
      ...data.bonusTrucPhu,
      data.bonusTrucSu,
      // data.BatThan ? data.BatThan : "Trực phù (Mộc)",
    ];
    data.arrTinh.map((item) => {
      Data_navbar.push(CUU_TINH_MO_TA[item]);
    });
    Data_navbar.push(BAT_MON_MO_TA[data.arrSu[0]]);
    Data_navbar.push(
      BAT_THAN_MO_TA[data.BatThan ? data.BatThan : "Trực phù (Mộc)"]
    );
    // console.log(BAT_MON_MO_TA[data.arrSu[0]], data.bonusTrucSu, "Data_navbar");
    data.CanDiTheo.map((itemCan, index) => {
      navbar.push(`${itemCan}`);
      navbar.push(`${itemCan} / ${data.name}`);
      Data_navbar.push(data.StatusCanDiTheo[index]);
      Data_navbar.push(TRAN_81[`${itemCan}/${data.name}`]);
    });
  }
  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        maxWidth={navbar.length < 8 ? "md" : "false"}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description">
        <DialogTitle
          id="scroll-dialog-title"
          className=" flex flex-row"
          style={{
            width: "100%",
            overflow: "hidden",
            padding: 0,
          }}>
          {navbar?.map((item, index) => {
            return (
              <Button
                onClick={() => {
                  setValue(index);
                }}
                style={{
                  backgroundColor: value !== index ? "white" : "#F3BE28",
                  color: "black",
                  // maxWidth: 300,
                  fontWeight: value === index ? "bold" : "400",
                  border: 1,
                }}
                className="text-[red] px-5 py-5  text-base">
                {item}
              </Button>
            );
          })}
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}>
            {(Array.isArray(Data_navbar[value])
              ? Data_navbar[value]
              : [Data_navbar[value]]
            ).map((item, index) => {
              let ItemSplit = [];
              if (Array.isArray(item)) {
                ItemSplit = item?.toString().split(",");
              } else {
                ItemSplit = item?.split("\n");
              }
              console.log(index);
              return (
                <div className="text-lg">
                  <div className="text-[red] font-bold text-2xl mb-4">
                    {navbarDetails[value]}
                  </div>

                  {ItemSplit?.map((child, indChild) => {
                    console.log(indChild, "indChild");
                    return <div>{child}</div>;
                  })}
                </div>
              );
            })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="text-[red] text-md">
            Huỷ
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
});
export default React.memo(ModalInfoBatMon);
