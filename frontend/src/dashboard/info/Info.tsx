import { useState } from "react";
import Overview from "./Overview";
import News from "./News";
import Disclosure from "./Disclosure";

const TABS = [
  { label: "기업 정보", component: <Overview /> },
  { label: "뉴스", component: <News /> },
  { label: "공시", component: <Disclosure /> },
];

const Info = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <div>
      {/* 탭 */}
      <div>
        {TABS.map((tab, index) => (
          <button key={index} onClick={() => setSelectedTab(index)}>
            {tab.label}
          </button>
        ))}
      </div>
      {/* 선택된 탭의 컴포넌트 렌더링 */}
      <div>{TABS[selectedTab].component}</div>
    </div>
  );
};

export default Info;
