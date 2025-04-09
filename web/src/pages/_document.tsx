import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    const GTMID = process.env.NEXT_PUBLIC_GTM_ID || "G-7WZ4E6MPNX";
    return (
      <Html>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html:
                `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':` +
                `new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],` +
                `j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=` +
                `'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);` +
                `})(window,document,'script','dataLayer','${GTMID}');`,
            }}
          />
          {/* Pulling fonts into the project has been moved to App using next/fonts, but we can revert to this method if necessary */}
          {/* <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,700;1,300;1,700&display=swap"
            rel="stylesheet"
          /> */}
        </Head>
        <body>
          <noscript>
            <iframe
              src={"https://www.googletagmanager.com/ns.html?id=" + GTMID}
              height="0"
              width="0"
              style={{
                display: "none",
                visibility: "hidden",
              }}
            />
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
