// 주문하기 - 구매

import React, { useState } from "react";
import StandardOrder from "./orderType/StandardOrder";
import ScheduledOrder from "./orderType/ScheduledOrder";
import styles from "./Buy.module.css";

const TABS = [
  { label: "일반 주문", component: <StandardOrder/> },
  { label: "조건 주문", component: <ScheduledOrder/>}
]

const Buy: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div>
      {/* 네비게이션 바 */}
      <div className={styles.navbar}>
        {TABS.map((tab, index) => (
          <div
            key={index}
            className={`${styles.navItem} ${selectedTab === index ? styles.active : ""}`}
            onMouseDown={(event) => {
              event.stopPropagation(); // 클릭 시 드래그 방지
            }}
            onClick={() => {
              setSelectedTab(index);
            }}
          >
            {tab.label}
          </div>
        ))}
      </div>
      {/* 선택된 탭의 컴포넌트 렌더링 */}
      <div>{TABS[selectedTab].component}</div>
    </div>
  );
};

export default Buy;
