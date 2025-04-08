import React from "react";
import LinkWrap from "components/tools/LinkWrap/LinkWrap";
import styles from "./Nav.module.scss";

/** Placeholder Component */

const Nav = () => {
  return (
    <ul className={styles.base}>
      <li>
        <LinkWrap href="/">Home</LinkWrap>
      </li>
      <li>
        <LinkWrap href="/about">About Us</LinkWrap>
      </li>
    </ul>
  );
};

export default Nav;
