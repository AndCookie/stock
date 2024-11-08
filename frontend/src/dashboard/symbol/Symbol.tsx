// 종목개요
// 삼성전자 #IT 가격 등락률

import { useState } from "react";
import { IWidgetComponentProps } from "../../common/definitions";

const Symbol = ({ setIsDraggable }: IWidgetComponentProps) => {
  // TODO: 실제 data를 넣어주세요
  const {
    name,
    industry,
    companyDetail,
    currentPrice,
    change,
    rate,
    favorite,
  } = {
    name: "삼성전자",
    industry: "IT",
    companyDetail: "반도체와반도체장비",
    currentPrice: 58300,
    change: -700, // 증감
    rate: -1.1, // 증감률 (%)
    favorite: false, // 좋아요(관심종목) 여부
  };
  const [isFavorite, setIsFavorite] = useState<boolean>(favorite || false);

  // TODO: 비즈니스 로직이니 분리하세요
  const toggleFavorite = () => {
    // TODO: post 요청을 통해 서버 상태 업데이트
    setIsFavorite((prev) => !prev);
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {/* 왼쪽과 오른쪽으로 나눠놨습니다 (임시 CSS)*/}
      <div>
        <div>
          <span>{name}</span>
          <span
            onMouseDown={(event) => {
              event.stopPropagation(); // 클릭 시 드래그 방지
              setIsDraggable(false); // 버튼 클릭 시 드래그 비활성화
            }}
            onClick={() => {
              toggleFavorite();
              setIsDraggable(true);
            }}
          >
            {isFavorite ? "♥" : "♡"}
          </span>
        </div>
        <div>
          #{industry}#{companyDetail}
        </div>
      </div>
      <div>
        <div>{currentPrice}</div>
        <div>
          <span>{change}</span>
          <span>{rate}%</span>
        </div>
      </div>
    </div>
  );
};

export default Symbol;
