import React, { FC } from "react";
import cx from "classnames";
import styles from "./Button.module.scss";
import LinkWrap from "components/tools/LinkWrap/LinkWrap";

export type ButtonProps = {
  text?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  href?: string;
  active?: boolean;
  icon?: React.ReactElement;
  iconPlacement?: "left" | "right";
  buttonType?: "button" | "submit" | "reset";
  className?: string;
};

/** Placeholder Component */
/** If importing from Bloom, replace this component with a styled wrapper for the Bloom/Button */

const Button: FC<ButtonProps> = ({
  text,
  onClick,
  href,
  active,
  icon,
  iconPlacement = "right",
  buttonType = "button",
  className,
}) => {
  const form = ["submit", "reset"].indexOf(buttonType) !== -1;

  const logErrors = () => {
    if (!text && !icon) {
      console.warn("Nothing to display: No text or icon provided.");
    }
    if (!!href && !!form) {
      console.error(
        "Component cannot be a link and a form input. Pass only one of the 3: href, submit, reset",
      );
    }
  };
  logErrors();

  const content = (
    <>
      {!!text && <span className={styles.text}>{text}</span>}
      {!!icon && <span className={styles.icon}>{icon}</span>}
    </>
  );

  const baseElementClassNames = cx(
    styles.base,
    {
      [styles[`${iconPlacement}Icon`]]: !!icon,
      [styles.onlyIcon]: !!icon && !text,
      [styles.active]: active,
    },
    className,
  );

  // Any Link
  const anchor = () => (
    <LinkWrap href={href} className={baseElementClassNames} onClick={onClick}>
      {content}
    </LinkWrap>
  );

  // All other buttons
  const button = () => (
    <button
      className={baseElementClassNames}
      onClick={onClick}
      type={buttonType}
    >
      {content}
    </button>
  );

  return !!href ? anchor() : button();
};

export default Button;
