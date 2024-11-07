import React, { useState } from "react";
import useSocketStore from "../../../store/useSocketStore";

const Buy: React.FC = () => {
  // Zustand 스토어에서 tradingData 배열 가져오기
  const tradingData = useSocketStore((state) => state.tradingData);

  // 접속 시점의 가장 최신 STCK_PRPR 값을 한 번만 설정
  const [initialMarketPrice] = useState(() =>
    tradingData && tradingData.length > 0
      ? tradingData[tradingData.length - 1].STCK_PRPR
      : null
  );

  return (
    <div>
      <h2>구매 화면</h2>
      <div>
        <h3>시장가</h3>
        <p>{initialMarketPrice !== null ? `${initialMarketPrice}원` : "데이터 없음"}</p>
      </div>
    </div>
  );
};

export default Buy;
