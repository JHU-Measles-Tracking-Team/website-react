import React from "react";
import styles from "./Accordion.module.scss";
import cx from "classnames";

export type TAccordionProps = {
  title: string;
  content: string;
  handleToggle: () => void;
  isOpen?: boolean;
  className?: string;
};

const Accordion = ({
  title,
  content,
  isOpen,
  handleToggle,
}: TAccordionProps) => {
  return (
    <div className={cx(styles.base, { [styles.open]: isOpen })}>
      <div
        className={cx(styles.accordionHeader, { [styles.open]: isOpen })}
        onClick={() => handleToggle?.()}
      >
        <div className={styles.accordionTitle}>{title}</div>
        <div className={styles.icon}>
          <svg
            viewBox="0 0 30 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="13.5" y="8" width="3" height="15" rx="1" fill="#5B977C" />
            <rect
              x="7.5"
              y="17"
              width="3"
              height="15"
              rx="1"
              transform="rotate(-90 7.5 17)"
              fill="#5B977C"
            />
            <rect
              x="1.5"
              y="2"
              width="27"
              height="27"
              rx="13.5"
              stroke="#5B977C"
              strokeWidth="3"
            />
          </svg>
        </div>
      </div>
      <div className={styles.accordionContent}>{content}</div>
    </div>
  );
};

export default Accordion;
