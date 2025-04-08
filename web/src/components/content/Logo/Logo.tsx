import React from "react";
import styles from "./Logo.module.scss";
import cx from "classnames";
import { useRouter } from "next/router";
import Image from "next/image";

type TLogoProps = {
  type?: "header" | "footer" | "hero";
  theme?: "light" | "dark";
  href?: string;
  onClicked?: () => void;
  className?: string;
};

const Logo = ({
  href = "/",
  theme = "light",
  type = "header",
  onClicked,
  className,
}: TLogoProps) => {
  const router = useRouter();
  const handleNavigation = (href) => {
    onClicked?.();
    if (!href) return;
    router.push(href);
  };
  return (
    <button
      className={cx(styles.base, styles[theme], styles[type], className)}
      onClick={(e) => handleNavigation(href)}
      onKeyDown={(e) => {
        if (e.code === "Enter") handleNavigation(href);
      }}
      aria-label="logo"
    >
      {type === "header" && (
        <Image
          className={cx(styles.image)}
          src="/images/logos/jhu-govex-logo-header.svg"
          alt="logo"
          height={900}
          width={900}
        />
      )}
      {type === "hero" && (
        <Image
          className={cx(styles.image, styles.desktop)}
          src="/images/logos/Bloomberg_logo_white.svg"
          alt="logo"
          height={41}
          width={131}
        />
      )}
      {type === "footer" && (
        <Image
          className={cx(styles.image, styles.mobile)}
          src="/images/logos/bloomberg-logo-footer-mobile.svg"
          alt="logo"
          height={900}
          width={900}
        />
      )}
    </button>
  );
};

export default Logo;
