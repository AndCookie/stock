// 거래동향 / 거래원 /투자자

import { useState } from "react";
import Daily from "./Daily";
import Trader from "./Trader";
import Investor from "./Investor";

const TradingTrend = () => {
  const TABS = [
    { label: "거래동향", component: <Daily /> },
    { label: "거래원", component: <Trader /> },
    { label: "투자자", component: <Investor /> },
  ];
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div>
      <div>
        {TABS.map((tab, index) => (
          <button key={index} onClick={() => setSelectedTab(index)}>
            {tab.label}
          </button>
        ))}
      </div>
      <div>{TABS[selectedTab].component}</div>
    </div>
  );
};

export default TradingTrend;
