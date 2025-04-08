import React from "react";

import styles from "./ColorPalette.module.scss";
import CopyToClipboard from "components/tools/CopyToClipboard";
import colorVars from "styles/utils/_colors.module.scss";
import { slugToTitle } from "util/helper";

const colors = Object.keys(colorVars)
  .filter((key) => key.indexOf("color-scheme") !== 0)
  .map((key) => ({
    name: slugToTitle(key).replace("Color ", ""),
    color: colorVars[key],
    info: `$${key}`,
  }));

const ColorPalette = () => {
  return (
    <div className={styles.base}>
      <div className={styles.path}>
        See: src/styles/utils/_colors.module.scss
      </div>
      {colors.map(({ color, name, info }, i) => (
        <CopyToClipboard
          key={`${name}_${i}`}
          textToCopy={info}
          className={styles.swatch}
        >
          <h2>&ldquo;{name}&rdquo;</h2>
          <div className={styles.display} style={{ background: color }}></div>
          <div className={styles.info}>
            <span>{info}</span>
          </div>
        </CopyToClipboard>
      ))}
    </div>
  );
};

export default ColorPalette;
