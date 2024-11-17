// 주문내역

import { useState } from "react";
import StandardHistory from "./history/StandardHistory";
import ScheduledHistory from "./history/ScheduledHistory";
import styles from "./History.module.css";

const TABS = [
  { label: "일반 주문", component: <StandardHistory /> },
  { label: "조건 주문", component: <ScheduledHistory /> }
]

const History = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  return(
    <div className={styles.container}>
      {/* 탭 */}
      <div className="categoryTabs">
        {TABS.map((tab, index) => (
          <button
            key={index}
            className={`tabButton ${styles.tabButton}
              ${selectedTab === index ? "activeTab" : ""}`}
            onClick={() => {
              setSelectedTab(index);
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* 선택된 탭의 컴포넌트 렌더링 */}
      <div className={`content ${styles.content}`}>
        {TABS[selectedTab].component}
      </div>
    </div>
  );
};

export default History;
