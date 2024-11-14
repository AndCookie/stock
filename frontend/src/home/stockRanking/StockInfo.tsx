import styles from "./StockInfo.module.css";
import { IStockInfoProps } from "./definitions";

const StockInfo = ({
  dataRank,
  // 로고 어떻게 해야하지요?
  logoLink,
  stockName,
  stockPrice,
  previousDayVersusPrice,
  previousDayVersus,
}: IStockInfoProps) => {
  return (
    <div className={styles.stockInfoContainer}>
      <div className={styles.companyInfo}>
        <div className={styles.dataRank}>{dataRank}</div>
        <img src={logoLink || ''} alt="기업 로고" className={styles.logo} />
        <div className={styles.stockName}>{stockName}</div>
      </div>
      <div className={styles.priceData}>
        <div>{stockPrice.toLocaleString()}원</div>
        <div
          className={`${styles.previousDayVersusData} ${
            previousDayVersusPrice > 0
              ? styles.previousDayVersusPricePlus
              : styles.previousDayVersusPriceMinus
          }`}
        >
          {previousDayVersusPrice > 0 ? "▲" : "▼"} {Math.abs(previousDayVersusPrice).toLocaleString()}원
          ({previousDayVersus.toLocaleString()}%)
        </div>
      </div>
    </div>
  );
};

export default StockInfo;
