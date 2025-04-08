import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./LayoutPlaceholder.module.scss";
import ContentPlaceholder from "components/common/placeholder/ContentPlaceholder/ContentPlaceholder";

const PageLayout = () => (
  <>
    <ContentPlaceholder />
    <ContentPlaceholder />
    <div className={styles.mockPage}>
      {new Array(3).fill(null).map((n, i) => (
        <ContentPlaceholder key={i} />
      ))}
    </div>
  </>
);

const ProductLayout = () => (
  <>
    <div className={styles.mockProduct}>
      {new Array(5).fill(null).map((n, i) => (
        <ContentPlaceholder key={i} />
      ))}
    </div>
  </>
);

const GridLayout = () => (
  <>
    <ContentPlaceholder />
    <ContentPlaceholder />
    <div className={styles.mockGrid}>
      {new Array(6).fill(null).map((n, i) => (
        <ContentPlaceholder key={i} />
      ))}
    </div>
  </>
);

const layouts = {
  page: PageLayout,
  grid: GridLayout,
  product: ProductLayout,
};

const LayoutPlaceholder = ({ layout = "grid" }) => {
  const Content = layouts[layout];
  return (
    <div className={cx(styles.base, styles[layout])}>
      <Content />
    </div>
  );
};

LayoutPlaceholder.propTypes = {
  layout: PropTypes.oneOf(["grid", "page", "product"]),
};

export default LayoutPlaceholder;
