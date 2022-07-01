import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomizedSnackbars = ({ open, duration, message,setSnackbar }) => {
const handleClose = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
    
        setSnackbar(false);
      };
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      anchorOrigin={{ vertical:"bottom", horizontal: "right" }}
      onClose={handleClose}
    >
      <Alert severity="success" sx={{ width: "100%" }} onClose={handleClose}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomizedSnackbars;
