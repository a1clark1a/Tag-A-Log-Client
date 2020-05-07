import React from "react";
import ToolTip from "@material-ui/core/Tooltip";
import InfoIcon from "@material-ui/icons/Info";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const toolTipTheme = createMuiTheme({
  typography: {
    fontFamily: "Cairo",
  },
  fontSize: "1.2rem",
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: "1.2rem",
        fontFamily: "Cairo",
      },
    },
  },
});

const InfoToolTip = ({ text }) => {
  return (
    <ThemeProvider theme={toolTipTheme}>
      <ToolTip title={text}>
        <InfoIcon aria-label="info" />
      </ToolTip>
    </ThemeProvider>
  );
};

export default InfoToolTip;
