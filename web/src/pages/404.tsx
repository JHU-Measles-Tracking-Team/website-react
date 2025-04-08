import React, { FC } from "react";
import Page from "components/layout/Page/Page";
import styles from "./ErrorPages.module.scss";

export type TFourOhFour = any;

const FourOhFour: FC<TFourOhFour> = ({}) => {
  const meta = {};

  return (
    <Page meta={meta}>
      <div className={styles.base}>
        <h1>Page could not be found.</h1>
      </div>
    </Page>
  );
};

export default FourOhFour;

export async function getStaticProps({}) {
  return {
    props: {},
    revalidate: 60,
  };
}
