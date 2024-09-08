"use client ";

import SnackbarProvider from "../common/toaster/SnackbarProvider";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return <SnackbarProvider>{children}</SnackbarProvider>;
};

export default layout;
