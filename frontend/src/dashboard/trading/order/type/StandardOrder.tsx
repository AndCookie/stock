// 일반 주문

import React, { useState } from "react";
import MarketOrder from "./standardOrder/MarketOrder";
import LimitOrder from "./standardOrder/LimitOrder";
import styles from "./StandardOrder.module.css";

const TABS = [
  { label: "지정가 주문", component: <LimitOrder/> },
  { label: "시장가 주문", component: <MarketOrder/> },
];

const StandardOrder: React.FC = () => {
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

export default StandardOrder
