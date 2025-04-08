import React from "react";
import Head from "next/head";

const AppHead = () => {
  return (
    <Head>
      <meta property="og:type" content="website" />
      <link rel="icon" type="image/png" href="/images/favicon.png" />
    </Head>
  );
};

export default AppHead;
