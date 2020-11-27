import React from "react";
import type { AppProps } from "next/app";
import "@styles/antd.less";
import "@styles/index.less";

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
);

export default App;
