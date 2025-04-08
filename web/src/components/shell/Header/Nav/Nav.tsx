import React from "react";
import { useRouter } from "next/router";
import cx from "classnames";
import styles from "./Nav.module.scss";
import { TRoute, TRouteBase } from "data/navigation";
import NavLink from "components/content/NavLink/NavLink";

type NavProps = {
  currentAnchor?: string;
  routes?: TRoute[];
  isMenuOpen?: boolean;
  onCloseMenu?: () => void;
  className?: string;
};

const extractRoutes = (array: TRouteBase[]) => {
  const result = [];
  array.forEach((route) => {
    result.push(route);
  });
  return result;
};

const Nav = ({
  routes,
  isMenuOpen,
  currentAnchor,
  onCloseMenu,
  className,
}: NavProps) => {
  const router = useRouter();

  const handleNavLinkClick = (href) => {
    if (!!href) router?.push(href);
    onCloseMenu?.();
  };

  let formattedRoutes: TRoute[] = [];
  if (isMenuOpen) {
    formattedRoutes = [];
    routes.forEach((route) => {
      if (!route.subItems?.length) {
        formattedRoutes.push(route);
      } else {
        formattedRoutes = formattedRoutes.concat(extractRoutes(route.subItems));
      }
    });
  } else {
    formattedRoutes = routes;
  }

  return (
    <ul className={cx(styles.base, className, isMenuOpen && styles.menuOpen)}>
      {formattedRoutes?.map((route) => {
        const href: string = route.href;
        const anchor = route.id;
        const locationHash = currentAnchor;
        // const isAcive = (router.defaultLocale + router.asPath + "/").startsWith(
        // const locationHash = "#" + router.asPath.split("#")?.[1];
        const isAcive = anchor === locationHash;
        return (
          <li key={route.id} className={styles.href}>
            <NavLink
              className={cx(styles.link, {
                [styles.active]: isAcive,
              })}
              label={route.label}
              active={isAcive}
              onClick={() => handleNavLinkClick(href)}
              href={href.startsWith("/") ? href : "/" + href}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default Nav;
