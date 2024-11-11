import Styles from "./StockInfo.module.css";
import { IStockInfoProps } from "./definitions";

const StockInfo = ({
  dataRank,
  logoLink,
  stockName,
  stockPrice,
  previousDayVersusPrice,
  previousDayVersus,
}: IStockInfoProps) => {
  return (
    <div className={Styles.stockInfoContainer}>
      <div className={Styles.companyInfo}>
        <div className={Styles.dataRank}>{dataRank}</div>
        <img src={logoLink} alt="기업 로고" className={Styles.logo} />
        <div>{stockName}</div>
      </div>
      <div className={Styles.priceData}>
        <div>{stockPrice}원</div>
        <div
          className={`${Styles.previousDayVersusData} ${
            Number(previousDayVersus) > 0
              ? Styles.previousDayVersusPricePlus
              : Styles.previousDayVersusPriceMinus
          }`}
        >
          {Number(previousDayVersus) > 0 ? "▲" : "▼"} {previousDayVersusPrice}원
          ({previousDayVersus}%)
        </div>
      </div>
    </div>
  );
};

export default StockInfo;
