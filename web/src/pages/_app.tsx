import React from "react";
import "../styles/main.scss";
import Shell from "../components/shell/Shell";
import AppHead from "components/shell/AppHead/AppHead";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div id="font-provider">
      <AppHead />
      <Shell {...pageProps.globalProps}>
        <Component {...pageProps} />
      </Shell>
    </div>
  );
}
