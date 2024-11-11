import Styles from "./StockInfo.module.css";
import { IStockInfoProps } from "./definitions";

const StockInfo = ({
  dataRank,
  stockName,
  stockPrice,
  previousDayVersusPrice,
  previousDayVersus,
}: IStockInfoProps) => {
  return (
    <div className={Styles.stockInfoContainer}>
      <div>{dataRank}</div>
      <img src="" alt="기업 로고" />
      <div>{stockName} </div>
      <div>{stockPrice} </div>
      <div>
        {previousDayVersusPrice}원 ({previousDayVersus}%){" "}
      </div>
    </div>
  );
};

export default StockInfo;
