import React, { FC } from "react";
import styles from "./JoinHighlights.module.scss";
import cx from "classnames";
import Image from "next/image";

export type TJoinHighlightsProps = {
  header: string;
  image: string;
  content: string;
  order: number;
  className?: string;
};

const whyJoinHighlights: TJoinHighlightsProps[] = [
  {
    header: "Idea Exchange",
    image: "idea-exchange.svg",
    order: 0,
    content:
      "Share and discover cutting-edge ideas, practical solutions, and real-world use cases specific to Generative AI in urban settings.",
  },
  {
    header: "Global Networking",
    image: "global-networking.svg",
    order: 1,
    content:
      "Connect with like-minded city leaders to collaborate on complex urban challenges.",
  },
  {
    header: "Resurce Hub",
    image: "resurce-hub.svg",
    order: 3,
    content:
      "Connect with like-minded city leaders to collaborate on complex urban challenges.",
  },
  {
    header: "Expert Insights",
    image: "expert-insights.svg",
    order: 2,
    content:
      "Gain guidance from leading Generative AI experts tailored to city governance and leadership.",
  },
  {
    header: "In-Depth Discussions",
    image: "in-depth-discussions.svg",
    order: 4,
    content:
      "Engage in deep discussions about early-stage questions and challenges in implementing Generative AI in city management.",
  },
];

export type TJoinHighlightProps = {
  className?: string;
};

const JoinHighlights: FC<TJoinHighlightProps> = ({ className }) => {
  whyJoinHighlights.sort((a, b) => a.order - b.order);
  const basePath = "/images/icons/";
  return (
    <div className={cx(styles.base, className)}>
      <div className={cx(styles.highlightItem, styles.initial)}>
        <Image
          className={styles.icon}
          src={`${basePath}${whyJoinHighlights[0].image}`}
          width={100}
          height={100}
          alt={whyJoinHighlights[0].header}
        />
        <h3 className={styles.header}>{whyJoinHighlights[0].header}</h3>
        <p className={styles.content}>{whyJoinHighlights[0].content}</p>
      </div>
      <div className={styles.contentBlock}>
        {whyJoinHighlights.slice(1).map((highlight, index) => (
          <div className={styles.highlightItem} key={index}>
            <Image
              className={styles.icon}
              src={`${basePath}${highlight.image}`}
              width={100}
              height={100}
              alt={highlight.header}
            />
            <h3 className={styles.header}>{highlight.header}</h3>
            <p className={styles.content}>{highlight.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JoinHighlights;
