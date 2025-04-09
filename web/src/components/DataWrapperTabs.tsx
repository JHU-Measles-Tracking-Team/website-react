import React, { useState, useEffect } from "react";
import DataWrapperEmbed from "./DataWrapperEmbed";
import styles from "./DataWrapperTabs.module.css";

interface Tab {
  id: string;
  label: string;
  identifier: string;
  title: string;
  ariaLabel: string;
  height: string;
}

interface DataWrapperTabsProps {
  tabs: Tab[];
}

const DataWrapperTabs: React.FC<DataWrapperTabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<string>("");

  useEffect(() => {
    if (tabs.length > 0 && !activeTab) {
      setActiveTab(tabs[0].id);
    }
  }, [tabs, activeTab]);

  return (
    <div className={styles.tabs}>
      <div className={styles.buttons}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.button} ${activeTab === tab.id ? styles.buttonActive : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={styles.content}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`${styles.pane} ${activeTab === tab.id ? styles.paneActive : ""}`}
          >
            <DataWrapperEmbed
              identifier={tab.identifier}
              title={tab.title}
              ariaLabel={tab.ariaLabel}
              height={tab.height}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataWrapperTabs;
