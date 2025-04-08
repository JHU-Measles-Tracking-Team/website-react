import React, { FC, ReactNode, useEffect, useState } from "react";
import cx from "classnames";

import styles from "./CopyToClipboard.module.scss";

export type CopyToClipboardProps = {
  textToCopy: string;
  children: ReactNode;
  className?: string;
};

const CopyToClipboard: FC<CopyToClipboardProps> = ({
  textToCopy,
  children,
  className,
}) => {
  const [copied, setCopied] = useState(false);

  const copy = (i: React.MouseEvent) => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(!!i);
  };

  useEffect(() => {
    const to = setTimeout(() => {
      setCopied(false);
    }, 1000);
    return () => clearTimeout(to);
  }, [copied]);

  return (
    <button className={cx(styles.base, className)} onClick={copy}>
      <div className={cx(styles.status, { [styles.copied]: copied })}>
        <span className={styles.no}>📋</span>
        <span className={styles.yes}>👍</span>
      </div>
      {children}
    </button>
  );
};

export default CopyToClipboard;
