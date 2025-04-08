import React, { FC } from "react";
import styles from "./SectionFAQ.module.scss";
import cx from "classnames";
import Container from "components/layout/Container/Container";
import Reveal from "components/layout/Reveal/Reveal";
import Button from "../Button/Button";
import { TSectionCoreProps } from "pages";
import { signUpUrl } from "data/navigation";

type TSectionFAQProps = TSectionCoreProps & {
  title: string;
  lede?: string;
  joinPrompt?: string;
  primaryContent?: {
    title: string;
    content: string;
    order?: number;
  }[];
  className?: string;
};

const SectionFAQ: FC<TSectionFAQProps> = ({
  id,
  title,
  lede,
  primaryContent = [],
  joinPrompt,
  className,
}: TSectionFAQProps) => {
  const TextWordSeparation = ({ text }) => {
    const words = text.split(" ");
    return (
      <h2 className={styles.subject}>
        <div className={styles.icon}>
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.5"
              y="0.5"
              width="20"
              height="20"
              rx="10"
              fill="#5B977C"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16.0303 6.53033C16.128 6.62796 16.128 6.78625 16.0303 6.88388L8.20711 14.7071C8.01184 14.9024 7.69526 14.9024 7.5 14.7071L4.17678 11.3839C4.07915 11.2863 4.07915 11.128 4.17678 11.0303L4.53033 10.6768C4.62796 10.5791 4.78625 10.5791 4.88388 10.6768L7.67678 13.4697C7.77441 13.5673 7.9327 13.5673 8.03033 13.4697L15.3232 6.17678C15.4209 6.07915 15.5791 6.07915 15.6768 6.17678L16.0303 6.53033Z"
              fill="white"
            />
            <rect
              x="0.5"
              y="0.5"
              width="20"
              height="20"
              rx="10"
              stroke="white"
            />
          </svg>
        </div>
        {words.map((word, index) => (
          <div key={index} className="word">
            {word}
          </div>
        ))}
      </h2>
    );
  };

  return (
    <section id={id} className={cx(styles.base, className)}>
      <Reveal>
        <Container className={styles.container} preset="default">
          <div className={styles.contentBlock}>
            <a id={"anchor-" + id} href={`#${id}`} aria-label={id} />
            {title && <h1 className={styles.title}>{title} </h1>}
            {lede && (
              <div
                className={styles.lede}
                dangerouslySetInnerHTML={{
                  __html: lede,
                }}
              />
            )}

            <div className={styles.joinBlockMobile}>
              {joinPrompt && (
                <div
                  className={styles.joinPrompt}
                  dangerouslySetInnerHTML={{
                    __html: joinPrompt,
                  }}
                />
              )}
              <div className={styles.buttonBlock}>
                <Button
                  text="Join Now"
                  variant="emphasis"
                  theme="dark"
                  href={signUpUrl}
                  external={true}
                />
              </div>
            </div>

            {primaryContent && (
              <div className={styles.primaryContentBlock}>
                {primaryContent
                  .sort((a, b) => {
                    if (a.order && b.order) {
                      return a.order - b.order;
                    }
                    return 0;
                  })
                  .map((item, index) => (
                    <div className={styles.talkingPoint} key={index}>
                      <div className={styles.headerBlock}>
                        {TextWordSeparation({ text: item.title })}
                      </div>
                      <div
                        className={styles.body}
                        dangerouslySetInnerHTML={{
                          __html: item.content,
                        }}
                      />
                    </div>
                  ))}

                <div className={styles.joinBlock}>
                  {joinPrompt && (
                    <div
                      className={styles.joinPrompt}
                      dangerouslySetInnerHTML={{
                        __html: joinPrompt,
                      }}
                    />
                  )}
                  <div className={styles.buttonBlock}>
                    <Button
                      text="Join Now"
                      variant="emphasis"
                      theme="dark"
                      href={signUpUrl}
                      external={true}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </Container>
      </Reveal>
    </section>
  );
};

export default SectionFAQ;
