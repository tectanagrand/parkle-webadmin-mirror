export default function Table(theme: any) {
  return {
    MuiTableBody: {
      styleOverrides: {
        root: {
          fontSize: "8pt",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: "8pt",
          padding: "0.75rem 0.75 0.75rem 0.75",
          borderWidth: "0 0 0 0",
          backgroundColor: "inherit",
        },
        head: {
          backgroundColor: theme.palette.grey[50],
        },
      },
    },
  };
}
