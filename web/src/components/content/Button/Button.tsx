import React, { MouseEvent } from "react";
import styles_default from "./Button_Default.module.scss";
import styles_emphasis from "./Button_Emphasis.module.scss";
import cx from "classnames";
import Link from "next/link";

type ButtonProps = {
  text: string;
  variant?: "default" | "emphasis";
  theme?: "dark" | "light";
  onClick?: (event: MouseEvent) => void;
  href?: string;
  disable?: boolean;
  disableTab?: boolean;
  external?: boolean;
  className?: string;
};

const Button = ({
  variant = "default",
  theme = "dark",
  text,
  href,
  onClick,
  disable,
  external,
  disableTab,
  className,
}: ButtonProps) => {
  const coreProps = {
    onClick: disable ? null : onClick,
    tabIndex: disableTab || disable ? -1 : 0,
    "aria-label": text,
    disabled: disable,
  };

  const styles = variant === "emphasis" ? styles_emphasis : styles_default;

  const props = {
    className: cx(
      styles.base,
      styles[theme],
      { [styles.disable]: disable },
      className
    ),
    ...coreProps,
  };

  const innerContent = () => (
    <button {...props} aria-label={text}>
      <div
        className={cx(styles.containerBlock, styles[variant], {
          [styles.disable]: disable,
        })}
      >
        <span className={styles.text}>{text}</span>
        {variant === "emphasis" && (
          <div className={styles.icon}>
            <svg
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1.5L7 7L1 12.5"
                stroke="#30528C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>
    </button>
  );

  if (!!href && external && !disable) {
    return (
      <a
        href={href}
        className={styles.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        {innerContent()}
      </a>
    );
  }
  return !!href && !disable ? (
    <Link href={href}>{innerContent()}</Link>
  ) : (
    innerContent()
  );
};

export default Button;
