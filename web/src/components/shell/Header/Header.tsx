import React, { useEffect } from "react";
import styles from "./Header.module.scss";
import cx from "classnames";
import { useRouter } from "next/router";
import { useState } from "react";
import Container from "components/layout/Container/Container";
import Logo from "components/content/Logo/Logo";
import Nav from "./Nav/Nav";
import useWindowSize from "util/hooks/useWindowSize";
import useWindowEvent from "util/hooks/useWindowEvent";
import { basePaths, getHeaderRoutes, loginUrl } from "data/navigation";
import Button from "components/content/Button/Button";
import {
  getSectionHeightKey,
  useSectionHeights,
} from "util/hooks/useSectionHieghts";
import { updateHash } from "util/hooks/useSmoothHashScroll";

type HeaderProps = {
  searchData?: any;
  className?: string;
};

type TOpenState = {
  status: "closed" | "nav" | "search";
};

const Header = ({ className }: HeaderProps) => {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);
  const [openState, setOpenState] = useState<TOpenState["status"]>("closed");
  const windowSize = useWindowSize();

  const loginButtonText = "Log In";

  useWindowEvent(
    "resize",
    () => {
      setOpen(false);
    },
    []
  );

  const slugsArray = router?.query?.slug && Array.from(router.query.slug);
  let routeLevel =
    router.asPath === "/"
      ? 1
      : slugsArray?.filter((item) => item !== "index")?.length;
  if (routeLevel > 3) routeLevel = 3;

  const handleMenuOpenState = (open: boolean, status: TOpenState["status"]) => {
    setOpen(open);
    if (open) {
      setOpenState(status);
    }
  };

  const headerRoutes = getHeaderRoutes();
  const sectionHeights = useSectionHeights();

  const [initialSectionHeights, setSectionHeights] = useState({});
  // State variable to store scroll position percentage
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [currentSection, setCurrentSection] = useState<string>("");

  useEffect(() => {
    requestAnimationFrame(() => {
      updateHash(currentSection);
    });
    return;
  }, [currentSection]);

  const calculateScrollPercentage = () => {
    const scrollY = window.scrollY || window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    const maxScroll = documentHeight - windowHeight;
    const currentScrollPercentage = (scrollY / maxScroll) * 100;

    // Get the section height key based on scroll position
    const sectionHeightKey = getSectionHeightKey(
      currentScrollPercentage,
      sectionHeights
    );
    // console.log(currentScrollPercentage);
    // console.log("Current Section Key:", sectionHeightKey);
    setScrollPercentage(currentScrollPercentage);
    setCurrentSection(sectionHeightKey);
  };

  useEffect(() => {
    // Calculate and set initial section heights
    const sections = Array.from(document.querySelectorAll("section"));
    const initialSectionHeights = {};
    sections.forEach((section, index) => {
      initialSectionHeights[index] = section.offsetTop;
    });

    setSectionHeights(initialSectionHeights);

    // Add an event listener to track scroll position
    window.addEventListener("scroll", calculateScrollPercentage);
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", calculateScrollPercentage);
    };
  }, [sectionHeights]);

  return (
    <header
      className={cx(styles.base, routeLevel < 2 && styles.useImage, className)}
    >
      <Container className={cx(styles.container)}>
        <Logo
          className={styles.logo}
          href={basePaths["home"]}
          type="header"
          theme="dark"
          onClicked={() => handleMenuOpenState(false, "nav")}
        />
        <div
          className={cx(styles.navWrap, {
            [styles.open]: isOpen,
          })}
        >
          <Nav
            className={cx(styles.navBlock, { [styles.disable]: false })}
            currentAnchor={currentSection}
            isMenuOpen={isOpen}
            routes={
              windowSize.width >= 970
                ? headerRoutes.desktop
                : headerRoutes.mobile
            }
            onCloseMenu={() => {
              setOpen(false);
            }}
          />
          {/* <div
            className={cx(styles.joinButtonBlockMobile, {
              [styles.disable]: false,
            })}
          >
            <Button
              text={loginButtonText}
              variant="emphasis"
              theme="light"
              href={loginUrl}
              external={true}
            />
          </div> */}
        </div>

        {/* <div
          className={cx(styles.joinButtonBlock, {
            [styles.disable]: false,
          })}
        >
          <Button
            text={loginButtonText}
            variant="default"
            theme="light"
            href={loginUrl}
            external={true}
          />
        </div> */}

        <div className={cx(styles.menuWrap, isOpen && styles.open)}>
          <div
            className={cx(
              styles.menuBlock,
              isOpen && openState === "nav" && styles.menuOpen
            )}
          >
            {isOpen && openState === "nav" ? (
              <button
                className={styles.mobileNavBtn}
                onClick={() => handleMenuOpenState(false, "nav")}
                aria-label="close navigation menu"
              >
                <svg
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 1L1 17M1 1L17 17"
                    stroke="#30528C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ) : (
              <button
                className={styles.mobileNavBtn}
                onClick={() => handleMenuOpenState(true, "nav")}
                aria-label="open navigation menu"
              >
                <svg
                  viewBox="0 0 14 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="0.5"
                    y1="14.5"
                    x2="13.5"
                    y2="14.5"
                    stroke="black"
                    strokeLinecap="round"
                  />
                  <line
                    x1="0.5"
                    y1="7.5"
                    x2="13.5"
                    y2="7.5"
                    stroke="black"
                    strokeLinecap="round"
                  />
                  <line
                    x1="0.5"
                    y1="0.5"
                    x2="13.5"
                    y2="0.5"
                    stroke="black"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
