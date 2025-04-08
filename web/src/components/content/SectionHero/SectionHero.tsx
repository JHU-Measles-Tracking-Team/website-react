import React, { FC, useEffect, useState } from "react";
import styles from "./SectionHero.module.scss";
import cx from "classnames";
import Container from "components/layout/Container/Container";
import Reveal from "components/layout/Reveal/Reveal";
import Button from "../Button/Button";
import ResponsiveImage from "../ResponsiveImage/ResponsiveImage";
import { TSectionCoreProps } from "pages";
import Logo from "../Logo/Logo";
import { signUpUrl } from "data/navigation";
import { useRouter } from "next/router";

type TSectionHeroProps = TSectionCoreProps & {
  title: string;
  lede?: string;
};

const HeroGraph = ({ className = "" }) => {
  const imagesDesktop = [
    "/images/hero/stat-1-desktop.svg",
    "/images/hero/stat-2-desktop.svg",
    "/images/hero/stat-3-desktop.svg",
  ];
  const imagesMobile = [
    "/images/hero/stat-1-mobile.svg",
    "/images/hero/stat-2-mobile.svg",
    "/images/hero/stat-3-mobile.svg",
  ];

  return (
    <div className={cx(styles.heroImageBlock, className)}>
      {imagesDesktop && (
        <div className={styles.desktopBlock}>
          <div className={cx(styles.heroImage, styles.initial)}>
            <ResponsiveImage
              className={styles.image}
              imageUrl={imagesDesktop[0]}
            />
          </div>
          <div className={styles.rightBlock}>
            {imagesDesktop.slice(1).map((image, index) => (
              <div className={styles.heroImage} key={index}>
                <ResponsiveImage
                  className={styles.image}
                  imageUrl={image}
                  height={100}
                  width={100}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      {imagesMobile && (
        <div className={styles.mobileBlock}>
          {imagesMobile.map((image, index) => (
            <div className={styles.heroImage} key={index}>
              <ResponsiveImage className={styles.image} imageUrl={image} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const SectionHero: FC<TSectionHeroProps> = ({ id, title, lede, className }) => {
  const router = useRouter();
  let isTop = true;
  if (typeof window === "undefined") {
    // Do nothing on the server-side
  } else {
    const anchor = router?.asPath?.split("#")?.[1];
    isTop = anchor === id;
  }

  const [headerHeight, setHeaderHeight] = useState(0);
  useEffect(() => {
    function updateHeaderHeight() {
      const headerElement = document.querySelector("header");
      if (headerElement) {
        setHeaderHeight(headerElement.offsetHeight);
      }
    }
    // Update header height on initial mount
    updateHeaderHeight();
    // Update header height on window resize
    window.addEventListener("resize", updateHeaderHeight);

    return () => {
      window.removeEventListener("resize", updateHeaderHeight);
    };
  }, []);

  useEffect(() => {
    return () => {
      //
    };
  }, [isTop]);

  const stylesMod = {};
  const stylesModBG = {};
  let height = "100vh";
  if (isTop && headerHeight > 0) {
    height = `calc(100vh - ${headerHeight}px)`;
    stylesMod["height"] = height;
    stylesModBG["backgroundPositionY"] = `calc(68vh - ${0}px)`;
  }

  return (
    <section id={id} className={cx(styles.base, className)}>
      <div className={cx(styles.background, className)} style={stylesModBG}>
        <Container className={styles.container} preset="default">
          <Reveal>
            <div className={cx(styles.contentBlock)} style={stylesMod}>
              <div className={styles.heroContent}>
                <a id={"anchor-" + id} href={`#${id}`} aria-label={id} />
                {title && (
                  <div
                    className={styles.title}
                    dangerouslySetInnerHTML={{
                      __html: title,
                    }}
                  />
                )}
                {lede && (
                  <div
                    className={styles.lede}
                    dangerouslySetInnerHTML={{
                      __html: lede,
                    }}
                  />
                )}
                <div className={styles.buttonBlock}>
                  <Button
                    text="Join Now"
                    variant="emphasis"
                    theme="light"
                    href={signUpUrl}
                    external={true}
                  />
                </div>
                <div className={styles.logoBlock}>
                  <span>Launched by</span>
                  <Logo href="/" theme="dark" type="hero" />
                </div>
              </div>
              <HeroGraph />
            </div>
          </Reveal>
        </Container>
      </div>
    </section>
  );
};

export default SectionHero;
