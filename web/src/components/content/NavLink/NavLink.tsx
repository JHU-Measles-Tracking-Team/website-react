import React, { FC } from "react";
import cx from "classnames";
import styles from "./NavLink.module.scss";

type NavLinkProps = {
  className?: string;
  href: string;
  label: string;
  theme?: "light" | "dark";
  context?: "header" | "footer";
  active?: boolean;
  onClick?: () => void;
};

const NavLink: FC<NavLinkProps> = ({
  context = "header",
  theme = "dark",
  label,
  active,
  href,
  onClick,
  className,
}) => {
  return (
    <button
      className={cx(styles.base, styles[context], styles[theme], className, {
        [styles.active]: active,
      })}
      onClick={onClick}
    >
      <span
        className={cx(styles.label, {
          [styles.active]: active,
        })}
      >
        {label}
      </span>
    </button>
  );
};

export default NavLink;
