import React, { FC } from "react";
import styles from "./Footer.module.scss";
import cx from "classnames";
import Container from "components/layout/Container/Container";
import { footerLinks } from "data/navigation";

type FooterProps = {
  title?: string;
  className?: string;
};

const Footer: FC<FooterProps> = ({ className }) => {
  const newTabHref = {
    target: "_blank",
    rel: "noopener noreferrer",
  };
  return (
    <div className={cx(styles.base, className)}>
      <Container className={styles.contentContainer}>
        <footer className={styles.mainSection}>
          <div className={styles.logoBlock}></div>
          <div className={styles.subFooter}>
            <div className={styles.links}>
              <div className={styles.linkGroup}>
                {footerLinks.map((link, idx) => (
                  <a
                    key={`footer-link-${idx + 1}`}
                    href={link.href}
                    aria-label={link.label}
                    {...newTabHref}
                  >
                    <span>{link.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </Container>
    </div>
  );
};

export default Footer;
