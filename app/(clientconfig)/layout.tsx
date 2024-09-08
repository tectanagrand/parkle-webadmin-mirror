"use client";

import { SWRConfig } from "swr";
import useAxiosAuth from "../lib/hooks/useAxiosAuth";
import React from "react";

function ClientConfig({ children }: { children: React.ReactNode }) {
  const axiosAuth = useAxiosAuth();
  return (
    <SWRConfig
      value={{ fetcher: (url) => axiosAuth.get(url).then((res) => res.data) }}
    >
      {children}
    </SWRConfig>
  );
}

export default ClientConfig;
