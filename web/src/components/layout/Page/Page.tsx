/*
  Page:
  This largely pass-through component is intended as a
  common wrapper for pages to which you can attach common
  logic, including but not limited to metadata or GTM pushes.

  Feel free to ignore or create variants.
*/

import React, { FC } from "react";
import styles from "./Page.module.scss";
import Meta from "components/shell/Meta/Meta";
import { IMeta } from "types/cms/meta";
import { IFile } from "types/cms";

type PageProps = {
  meta: IMeta;
  children: React.ReactNode;
};

const Page: FC<PageProps> = ({ meta, children }) => {
  return (
    <>
      {!!meta && (
        <Meta
          title={meta.title as string}
          description={meta.description as string}
          image={meta.image}
        />
      )}
      <div className={styles.base}>{children}</div>
    </>
  );
};

export default Page;
