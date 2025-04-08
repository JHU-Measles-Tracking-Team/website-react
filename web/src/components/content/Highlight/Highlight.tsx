import React, { FC } from "react";
import styles from "./Highlight.module.scss";
import cx from "classnames";

export type THighlightProps = {
  highlight: string;
  subject: string;
  details: string;
  borderColor?: "green" | "orange" | "purple" | "yellow";
  className?: string;
};

const Highlight: FC<THighlightProps> = ({
  highlight,
  subject,
  details,
  borderColor,
  className,
}) => {
  return (
    <div className={cx(styles.base, styles[borderColor], className)}>
      <div className={styles.highlightNumber}>
        <span className={styles.highlightNumberText}>{highlight}</span>
      </div>
      <div className={styles.highlightSubject}>
        <span className={styles.highlightSubjectText}>{subject}</span>
      </div>
      <div className={styles.highlightDetails}>
        <span className={styles.highlightDetailsText}>{details}</span>
      </div>
    </div>
  );
};

export default Highlight;
