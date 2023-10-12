import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import React, { useRef } from "react";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Notify = (props, ref) => {
  const [isOpen, setIsOpen] = React.useState();
  const handleClick = () => {
    setIsOpen(true);
  };
  const handleClose = (event, reason) => {
    setIsOpen(false);
  };
  React.useImperativeHandle(ref, () => {
    return { handleClick, handleClose };
  });

  return (
    <Snackbar
      ref={ref}
      open={isOpen}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}>
      <Alert
        onClose={handleClose}
        color="error"
        severity={props.type}
        sx={{ width: "100%" }}>
        {props.description}
      </Alert>
    </Snackbar>
  );
};

export default React.forwardRef(Notify);
