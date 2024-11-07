// src/components/Buy.tsx
import React from "react";
import useSocketStore from "../../../store/useSocketStore";

const Buy: React.FC = () => {
  // Zustand 스토어에서 tradingData의 STCK_PRPR 값 가져오기
  const marketPrice = useSocketStore((state) => state.tradingData?.STCK_PRPR);

  return (
    <div>
      <h2>구매 화면</h2>
      <div>
        <h3>시장가</h3>
        <p>{marketPrice ? `${marketPrice} 원` : "데이터 없음"}</p>
      </div>
    </div>
  );
};

export default Buy;
