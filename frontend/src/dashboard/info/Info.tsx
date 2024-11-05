// 기업 정보, 뉴스, 공시

import { useState } from "react";
import Overview from "./Overview";
import News from "./News";
import Disclosure from "./Disclosure";

type InfoProps = {
  setIsDraggable: (value: boolean) => void; // 드래그 활성화 제어 함수
};

const TABS = [
  { label: "기업 정보", component: <Overview /> },
  { label: "뉴스", component: <News /> },
  { label: "공시", component: <Disclosure /> },
];

const Info = ({ setIsDraggable }: InfoProps) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div>
      {/* 탭 */}
      <div>
        {TABS.map((tab, index) => (
          <button
            key={index}
            onMouseDown={(event) => {
              event.stopPropagation(); // 클릭 시 드래그 방지
              setIsDraggable(false); // 버튼 클릭 시 드래그 비활성화
            }}
            onClick={() => {
              setSelectedTab(index);
              setIsDraggable(true); // 클릭 후 드래그 다시 활성화
            }}
          >
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
