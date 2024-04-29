export default function Table(theme: any) {
  return {
    MuiTableCell: {
      
        styleOverrides: {
          root : {
            fontSize: "8pt",
            padding: "0.75rem 0 0.75rem 0",
            borderWidth : '0 0 0 0'
          }
        },
    },
    MuiTableHead: {
      root: {
        styleOverrides: {
          fontSize: "8pt",
          backgroundColor: theme.palette.grey[500],
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
