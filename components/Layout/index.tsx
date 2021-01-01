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
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <title>
        {title} - {BASE_TITLE}
      </title>

      <link rel="stylesheet" href="/libs/mobi/mobi.min.css"></link>
      <link rel="stylesheet" href="/styles/index.css"></link>
    </Head>

    {children}
  </Fragment>
);

export default Layout;
