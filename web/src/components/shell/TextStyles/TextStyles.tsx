import React, { FC } from "react";
import cx from "classnames";

import styles from "./TextStyles.module.scss";
import CopyToClipboard from "components/tools/CopyToClipboard";
import textMixins from "styles/utils/mixins/_mixin-text-styles.module.scss";
import { slugToTitle } from "util/helper";

const textStyles = Object.keys(textMixins).map((t) => ({
  name: slugToTitle(t).replace("Text ", ""),
  className: t,
  text: "Lorem Ipsum Dolor",
  info: `@include ${t};`,
}));

export type TextStylesProps = {
  dark: boolean;
};

const TextStyles: FC<TextStylesProps> = ({ dark = false }) => {
  return (
    <div className={cx(styles.base, { [styles.dark]: dark })}>
      <div className={styles.path}>
        See: src/styles/utils/mixins/_mixin-text-styles.module.scss
      </div>
      {textStyles.map(({ className, name, text, info }, i) => (
        <CopyToClipboard
          key={`${text}_${i}`}
          textToCopy={info}
          className={styles.swatch}
        >
          <div className={cx(styles.display)}>
            <h2>{name}</h2>
            <div className={cx(styles[className])}>{text}</div>
          </div>
          <div className={styles.info}>
            <span>{info}</span>
          </div>
        </CopyToClipboard>
      ))}
    </div>
  );
};

export default TextStyles;
