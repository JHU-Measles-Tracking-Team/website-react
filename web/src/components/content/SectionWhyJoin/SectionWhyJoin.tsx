import React, { FC } from "react";
import styles from "./SectionWhyJoin.module.scss";
import cx from "classnames";
import Container from "components/layout/Container/Container";
import Reveal from "components/layout/Reveal/Reveal";
import { TSectionCoreProps } from "pages";
import Highlight, { THighlightProps } from "../Highlight/Highlight";
import { PDF_FileName } from "data/content";

type TSectionWhyJoinProps = TSectionCoreProps & {
  title: string;
  content: string;
  highlights?: THighlightProps[];
  downloadPrompt?: string;
  downloadLabel?: string;
  className?: string;
};

const SectionWhyJoin: FC<TSectionWhyJoinProps> = ({
  id,
  title,
  content,
  highlights,
  downloadPrompt,
  downloadLabel,
  className,
}) => {
  return (
    <section id={id} className={cx(styles.base, className)}>
      <Container className={styles.container} preset="default">
        <Reveal>
          <a id={"anchor-" + id} href={`#${id}`} aria-label={id} />
          <div className={styles.contentBlock}>
            <div className={styles.primaryContent}>
              {title && <h1 className={styles.title}>{title} </h1>}
              {content && (
                <div
                  className={styles.body}
                  dangerouslySetInnerHTML={{
                    __html: content,
                  }}
                />
              )}
            </div>

            <div className={styles.highlightsBlock}>
              {!!highlights?.length &&
                highlights.map((highlight, index) => (
                  <Highlight
                    className={cx(styles.highlightItem)}
                    key={index}
                    {...highlight}
                  />
                ))}
            </div>

            <div className={styles.downloadPromptBlock}>
              <p>
                {downloadPrompt} &nbsp;
                <a
                  className={styles.downloadLink}
                  href={`/pdfs/${PDF_FileName}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download the research report"
                >
                  {downloadLabel}
                </a>
                .
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};

export default SectionWhyJoin;
