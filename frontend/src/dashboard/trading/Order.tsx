// 주문하기(구매, 판매, 대기)

import { useState } from "react";
import useSocketStore from "../../store/useSocketStore";
import Buy from "./order/Buy";
import Sell from "./order/Sell";
import Hold from "./order/Hold";
import styles from "./Order.module.css";

const Order = () => {
  // Zustand 스토어에서 tradingData 배열 가져오기
  const tradingData = useSocketStore((state) => state.tradingData);
  
  // 접속 시점의 가장 최신 STCK_PRPR 값을 한 번만 설정
  const [initialMarketPrice] = useState(() =>
    tradingData && tradingData.length > 0
      ? tradingData[tradingData.length - 1].STCK_PRPR
      : 0
  );
  
  const TABS = [
    { label: "구매", component: <Buy initialMarketPrice={initialMarketPrice} />, styleClass: "activeBuy" },
    { label: "판매", component: <Sell initialMarketPrice={initialMarketPrice} />, styleClass: "activeSell" },
    { label: "대기", component: <Hold />, styleClass: "activeHold" },
  ];

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
