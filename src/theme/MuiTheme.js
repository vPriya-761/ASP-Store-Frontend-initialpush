import React from "react";
import { aspTheme } from "./theme";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

const MuiTheme = ({ children }) => {
  return (
    <ThemeProvider theme={aspTheme()}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MuiTheme;
