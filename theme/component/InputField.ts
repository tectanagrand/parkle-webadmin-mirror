import { ThemeOptions } from "@mui/material";

export default function InputField(theme: any): ThemeOptions["components"] {
  return {
    MuiInputBase: {
      styleOverrides: {
        input: {
          fontSize: "10pt",
          padding: "12px 14px !important",
        },
        root: {
          "& legend": { display: "none" },
          "& fieldset": { top: 0 },
          borderRadius: "10px !important",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          padding: "10px 20px 10px 10px !important",
        },
        icon: {
          right: "0px",
          padding: "0",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: `${theme.palette.primary.contrastText} !important`,
          fontSize: "10pt",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        InputLabelProps: {
          shrink: true,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          top: "-10px",
          left: "-10px",
          color: "black",
          fontSize: "12pt",
          fontWeight: 600,
          fontFamily: "inherit",
        },
      },
    },
  };
}
