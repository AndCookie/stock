import Styles from './StockInfo.module.css'

const StockInfo = () => {
  return (
    <div className={Styles.stockInfoContainer}>
      <div>숫자</div>
      <img src="" alt="기업 로고" />
      <div>종목명</div>
      <div>가격</div>
      <div>등락률</div>
    </div>
  );
};

export default StockInfo;
