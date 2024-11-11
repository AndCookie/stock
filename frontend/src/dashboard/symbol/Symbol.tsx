// 종목개요
// 삼성전자 #IT 가격 등락률
import { useState } from "react";
import { IWidgetComponentProps } from "../../common/definitions";
import styles from './Symbol.module.css'

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
    currentPrice: 56300,
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

  console.log("Change:", change);
  console.log("Rate:", rate);
  console.log('Styles:', styles);
  
  return (
    <div className={styles.container}>
      {/* 왼쪽 영역 */}
      <div className={styles.leftSection}>
        <div className={styles.nameSection}>
          <span className={styles.name}>{name}</span>
          <span
            className={isFavorite ? styles.heartActive : styles.heartInactive}
            onMouseDown={(event) => {
              event.stopPropagation();
              setIsDraggable(false);
            }}
            onClick={() => {
              toggleFavorite();
              setIsDraggable(true);
            }}
          >
            {isFavorite ? "♥" : "♡"}
          </span>
        </div>
        <div className={styles.details}>
          #{industry} #{companyDetail}
        </div>
      </div>

      {/* 오른쪽 영역 */}
      <div className={styles.rightSection}>
        <div className={styles.price}>{currentPrice.toLocaleString()}원</div>
        <div
          className={`${styles.change}`}
          style={{ color: change >= 0 ? '#FF4F4F' : '#4881FF' }}
        >
          <span>
            {change >= 0 ? `+${change}` : change}원
          </span>
          <span>
            ({rate >= 0 ? `+${rate}` : rate}%)
          </span>
        </div>


      </div>
    </div>

  );
};

export default Symbol;