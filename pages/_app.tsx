import React from "react";
import type { AppProps } from "next/app";
import "@styles/mobi/mobi.min.css";
import "@styles/index.css";

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
);

export default App;
