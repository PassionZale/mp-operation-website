import React, { ReactNode, Fragment } from "react";
import Head from "next/head";
import { BASE_TITLE } from "@constants/text.constant";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "甘棠明善" }: Props) => (
  <Fragment>
    <Head>
      <title>{title} - {BASE_TITLE}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    {children}
  </Fragment>
);

export default Layout;
