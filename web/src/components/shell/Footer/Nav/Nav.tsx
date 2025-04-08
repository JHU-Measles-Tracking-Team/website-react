import React, { FC } from "react";
import styles from "./Nav.module.scss";
import cx from "classnames";
import { TRoute } from "data/navigation";
import NavLink from "components/content/NavLink/NavLink";

export type NavProps = {
  className?: string;
  routes: TRoute[];
  context?: "header" | "footer";
  currentRoute?: string;
};

const Nav: FC<NavProps> = ({ className, routes, context }) => {
  return (
    <nav className={cx(className, styles.base)}>
      {routes.map((rt, idx) => {
        const currentRoute = false;
        return (
          <NavLink
            key={`route-${idx + 1}`}
            label={rt.label}
            href={rt.href}
            active={currentRoute}
            context={context}
          />
        );
      })}
    </nav>
  );
};
export default Nav;
