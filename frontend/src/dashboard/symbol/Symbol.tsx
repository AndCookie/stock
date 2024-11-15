import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import codeToName from '../../assets/codeToName.json';
import { usePastStockStore } from "../../store/usePastStockStore";
import { useMinuteStockStore } from "../../store/useMinuteStockStore";
import useSocketStore from "../../store/useSocketStore";
import { IWidgetComponentProps } from "../../common/definitions";

import styles from './Symbol.module.css'
import { COLORS } from "../../common/utils";

const Symbol = ({ setIsDraggable }: IWidgetComponentProps) => {
  const { stockCode } = useParams();

  // TODO: 실제 data를 넣어주세요
  const name = stockCode ? codeToName[stockCode] : "";
  const { industry, companyDetail, favorite } = { industry: "IT", companyDetail: "반도체와반도체장비", favorite: false };

  const { pastStockData, yesterdayStockData } = usePastStockStore();
  const { minuteStockData } = useMinuteStockStore();
  const { tradingData } = useSocketStore();

  const [renderedValue, setRenderedValue] = useState(0);
  const [renderedChangeValue, setRenderedChangeValue] = useState(0);
  const [renderedChangeRate, setRenderedChangeRate] = useState(0);
  const [isFavorite, setIsFavorite] = useState<boolean>(favorite || false);

  useEffect(() => {
    if (!pastStockData || !minuteStockData) return;

    setRenderedValue(Number(minuteStockData![minuteStockData!.length - 1].stck_prpr));
    setRenderedChangeValue(Number(minuteStockData![minuteStockData!.length - 1].stck_prpr) - Number(yesterdayStockData));
    setRenderedChangeRate((Number(minuteStockData![minuteStockData!.length - 1].stck_prpr) - Number(yesterdayStockData)) / Number(yesterdayStockData) * 100);
  }, [pastStockData])

  useEffect(() => {
    if (!tradingData) return;

    setRenderedValue(Number(tradingData.STCK_PRPR));
    setRenderedChangeValue(Number(tradingData.STCK_PRPR) - Number(yesterdayStockData));
    setRenderedChangeRate((Number(tradingData.STCK_PRPR) - Number(yesterdayStockData)) / Number(yesterdayStockData) * 100);
  }, [tradingData])

  // TODO: 비즈니스 로직이니 분리하세요
  const toggleFavorite = () => {
    // TODO: post 요청을 통해 서버 상태 업데이트
    setIsFavorite((prev) => !prev);
  };

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
        <div
          className={styles.price}
          style={{ color: renderedChangeValue >= 0 ? COLORS.positive : COLORS.negative }}
        >
          {Number(renderedValue.toFixed(2)).toLocaleString()}원
        </div>
        <div className={`${styles.change}`}>
          <span style={{ color: renderedChangeValue >= 0 ? COLORS.positive : COLORS.negative }}>
            {renderedChangeValue >= 0 ? "+" : ""}{Number(renderedChangeValue.toFixed(2)).toLocaleString()}원
          </span>
          <span style={{ color: renderedChangeValue >= 0 ? COLORS.positive : COLORS.negative }}>
            ({renderedChangeRate >= 0 ? "+" : ""}{renderedChangeRate.toFixed(2)}%)
          </span>
        </div>
      </div>
    </div>
  );
};

export default Symbol;