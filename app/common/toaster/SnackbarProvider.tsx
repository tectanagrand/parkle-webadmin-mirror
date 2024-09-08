"use client";

import { Snackbar, Alert } from "@mui/material";
import { AlertColor } from "@mui/material";
import {
  useEffect,
  useContext,
  createContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
} from "react";

import React from "react";
import { boolean, set } from "zod";

export interface SnackBarInterface {
  openSnackbar: (type: "info" | "success" | "error", message: string) => void;
  closeSnackbar: () => void;
}

const SnackBarContext = createContext<null | SnackBarInterface>(null);

const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [sbComp, setSB] = useState<{
    open: boolean;
    severity: AlertColor;
    message: string;
  }>({
    open: false,
    severity: "info",
    message: "",
  });

  const openSnackbar = useCallback(
    (type: "info" | "success" | "error", message: string) => {
      setSB({ open: true, severity: type, message: message });
    },
    []
  );

  const closeSnackbar = useCallback(() => {
    setSB((prev) => ({ ...prev, open: false }));
  }, []);

  const sbContext = { openSnackbar, closeSnackbar };

  return (
    <SnackBarContext.Provider value={sbContext}>
      <Snackbar
        open={sbComp.open}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={closeSnackbar} severity={sbComp.severity}>
          {sbComp.message}
        </Alert>
      </Snackbar>
      {children}
    </SnackBarContext.Provider>
  );
};

export const useSnackBar = () => useContext(SnackBarContext);

export default SnackbarProvider;
