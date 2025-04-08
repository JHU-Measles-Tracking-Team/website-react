import React, { FC } from "react";
import styles from "./SectionAboutUs.module.scss";
import cx from "classnames";
import Container from "components/layout/Container/Container";
import Reveal from "components/layout/Reveal/Reveal";
import { TSectionCoreProps } from "pages";
import Image from "next/image";
import ResponsiveImage from "../ResponsiveImage/ResponsiveImage";

type TSectionAboutUsProps = TSectionCoreProps & {
  title: string;
  primaryContent: string;
  contentRightA?: string;
  contentRightB?: string;
  className?: string;
};

const SectionAboutUs: FC<TSectionAboutUsProps> = ({
  id,
  title,
  primaryContent,
  contentRightA,
  contentRightB,
  className,
}) => {
  return (
    <section id={id} className={cx(styles.base, className)}>
      <div className={cx(styles.background, className)}>
        <Container className={styles.container} preset="default">
          <Reveal>
            <div className={styles.contentBlock}>
              <a id={"anchor-" + id} href={`#${id}`} aria-label={id} />
              {title && <h1 className={styles.title}>{title} </h1>}
              <div className={styles.aboutContent}>
                <div className={styles.contentLeft}>
                  {primaryContent && (
                    <div
                      className={styles.primaryContent}
                      dangerouslySetInnerHTML={{
                        __html: primaryContent,
                      }}
                    />
                  )}
                </div>

                <div className={styles.contentRight}>
                  {contentRightA && (
                    <div
                      className={styles.secondaryContent}
                      dangerouslySetInnerHTML={{
                        __html: contentRightA,
                      }}
                    />
                  )}
                  <div className={styles.logoBlock}>
                    <Image
                      className={cx(styles.imageB)}
                      src="/images/logos/Bloomberg_logo_violetRGB.svg"
                      alt="logo-bloomberge"
                      height={34}
                      width={108}
                    />
                    <ResponsiveImage
                      className={cx(styles.imageA)}
                      imageUrl={"/images/logos/jhu-govex-logo.svg"}
                      backgroundSize={"contain"}
                    />
                  </div>
                  {contentRightB && (
                    <div
                      className={styles.secondaryContentBottom}
                      dangerouslySetInnerHTML={{
                        __html: contentRightB,
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </div>
    </section>
  );
};

export default SectionAboutUs;
