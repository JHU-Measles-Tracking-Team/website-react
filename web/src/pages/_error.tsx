import React, { FC } from "react";
import Page from "components/layout/Page/Page";
import styles from "./ErrorPages.module.scss";

export type TErrorPage = any;

const ErrorPage: FC<TErrorPage> = ({}) => {
  const meta = {};

  return (
    <Page meta={meta}>
      <div className={styles.base}>
        <h1>An error has occured.</h1>
      </div>
    </Page>
  );
};

export default ErrorPage;

export async function getStaticProps({}) {
  return {
    props: {},
    revalidate: 60,
  };
}
