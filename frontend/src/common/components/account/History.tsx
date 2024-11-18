// 주문내역
import React from "react";
import { useState } from "react";
import StandardHistory from "./history/StandardHistory";
import ScheduledHistory from "./history/ScheduledHistory";
import styles from "./History.module.css";

const History: React.FC<{ filter?: string; isMyPage?: boolean }> = ({ filter = "ALL", isMyPage = false }) => {
  const TABS = [
    { label: "일반 주문", component: <StandardHistory filter={filter} isMyPage={isMyPage} /> },
    { label: "조건 주문", component: <ScheduledHistory filter={filter} isMyPage={isMyPage} /> }
  ];

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
            onMouseDown={(event) => {
              event.stopPropagation(); // 클릭 시 드래그 방지
            }}
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
