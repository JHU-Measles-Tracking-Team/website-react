import React, { FC } from "react";
import cx from "classnames";
import Link from "next/link";
import styles from "./LinkWrap.module.scss";
import { isAbsoluteUrl } from "util/helper";

export interface LinkWrapProps {
  href?: string;
  tabIndex?: number;
  ariaLabel?: string;
  className?: string;
  onFocus?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  children?: React.ReactNode | React.ReactNode[];
}

/* Wrap in Next.js Link if on-site */
const LinkWrap: FC<LinkWrapProps> = ({
  href,
  tabIndex,
  children,
  ariaLabel,
  className,
  onFocus,
  onKeyDown,
  onClick,
}) => {
  const otherProps = {
    tabIndex,
    onFocus,
    onKeyDown,
    onClick,
    className: cx(styles.base, className),
  };

  if (href) {
    const abs = isAbsoluteUrl(href);
    const linkProps = abs
      ? { href, target: "_blank", rel: "noopener noreferrer" }
      : {};

    return abs ? (
      <a aria-label={ariaLabel && ariaLabel} {...linkProps} {...otherProps}>
        {children}
      </a>
    ) : (
      <Link
        href={href}
        aria-label={ariaLabel && ariaLabel}
        {...linkProps}
        {...otherProps}
      >
        {children}
      </Link>
    );
  } else {
    return <span {...otherProps}>{children}</span>;
  }
};

export default LinkWrap;
