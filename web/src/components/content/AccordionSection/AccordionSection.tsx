import React, { useEffect, useState } from "react";
import styles from "./AccordionSection.module.scss";
import cx from "classnames";
import Accordion from "../Accordion/Accordion";
import Button from "../Button/Button";

export type TAccordionSectionProps = {
  accordions: {
    title: string;
    content: string;
  }[];
  title: string;
  className?: string;
};

const AccordionSection: React.FC<TAccordionSectionProps> = ({
  title,
  accordions = [],
  className,
}) => {
  const [isOpen, setIsOpen] = useState<boolean[]>(accordions.map(() => false));

  useEffect(() => {
    setIsOpen(accordions.map(() => false));
  }, [accordions]);

  const toggleAccordion = (index: number) => {
    const updatedIsOpen = [...isOpen];
    updatedIsOpen[index] = !updatedIsOpen[index];
    setIsOpen(updatedIsOpen);
  };

  const expandAll = () => {
    setIsOpen(accordions.map(() => true));
  };

  return (
    <div className={cx(styles.base, className)}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <Button
          className={styles.button}
          text="Expand All"
          variant="default"
          theme="dark"
          onClick={expandAll}
        />
      </div>
      <div className={styles.accordionsBlock}>
        {accordions.map((section, index) => (
          <Accordion
            className={styles.accordion}
            key={index}
            title={section.title}
            content={section.content}
            isOpen={isOpen[index]}
            handleToggle={() => toggleAccordion(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default AccordionSection;
