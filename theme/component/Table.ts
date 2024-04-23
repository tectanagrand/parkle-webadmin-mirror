export default function Table(palette: any) {
  return {
    MuiTableCell: {
      root: {
        styleOverrides: {
          fontSize: "8pt",
          padding: "0 1rem 0 1rem",
        },
      },
    },
    MuiTableHead: {
      root: {
        styleOverrides: {
          fontSize: "8pt",
          backgroundColor: palette.grey[500],
        },
      },
    },
    MuiTableBody: {
      root: {
        styleOverrides: {
          fontSize: "8pt",
        },
      },
    },
  };
}
