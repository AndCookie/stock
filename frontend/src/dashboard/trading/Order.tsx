// 주문하기(구매, 판매, 대기)

import { useState } from "react";
import Buy from "./order/Buy";
import Sell from "./order/Sell";
import Hold from "./order/Hold";
import styles from "./Order.module.css";

const TABS = [
  { label: "구매", component: <Buy />, styleClass: "activeBuy" },
  { label: "판매", component: <Sell />, styleClass: "activeSell" },
  { label: "대기", component: <Hold />, styleClass: "activeHold" },
];

const Order = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div>
      {/* 네비게이션 바 */}
      <div className={styles.navbar}>
        {TABS.map((tab, index) => (
          <div
            key={index}
            className={`${styles.navItem} ${selectedTab === index ? styles[tab.styleClass] : ""}`}
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

export default Order;
