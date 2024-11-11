import styles from "./StockRanking.module.css";
import StockInfo from "./StockInfo";
import { useState } from "react";

const StockRanking = () => {
  // const data = useIndexData()
  const [stockData] = useState({
    dataRank: "1",
    stockName: "삼성전자",
    stockPrice: "100,000",
    previousDayVersusPrice: "40,000",
    previousDayVersus: "60",
  });
  return (
    <div className={styles.container}>
      StockRanking
      <StockInfo {...stockData} />
    </div>
  );
};

export default StockRanking;
