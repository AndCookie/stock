import React from 'react';
import useSocketStore from '../../store/useSocketStore';
import styles from './OrderBook.module.css';

const OrderBook: React.FC = () => {
  const { orderBookData, tradingData } = useSocketStore();
  const maxAskPrice = 76800; // 상한가
  const minBidPrice = 41400; // 하한가
  const currentPrice = 56300; // 기준 가격
  const maxPrice = 58200; // 최고가
  const minPrice = 56600; // 최저가
  const quantity = 31499922; // 거래량

  if (!orderBookData || !tradingData) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.categoryTabs}>
        호가
      </div>
      <div className={styles.marketInfo}>
        <p>시간외단일가 56,800원 <span className={styles.priceChange}>+0.35%</span></p>
      </div>
        <div className={styles.content}>

          <table className={styles.orderTable}>
            <thead>
              <tr>
                <th>매도잔량</th>
                <th>가격</th>
                <th>매수잔량</th>
              </tr>
            </thead>
            <tbody>
              {/* 매도 데이터 */}
              {[...Array(10)].map((_, i) => (
                <tr key={`ask-${i}`} className={styles.orderRow}>
                  <td className={styles.askVolume}>{orderBookData[`ASKP_RSQN${10 - i}`].toLocaleString()}</td>
                  <td
                    className={styles.askPrice}
                    style={{ color: orderBookData[`ASKP${10 - i}`] > currentPrice ? '#FF4F4F' : '#4881FF' }}
                  >
                    {orderBookData[`ASKP${10 - i}`].toLocaleString()}
                  </td>
                  {i === 0 && (
                    <td className={styles.askInfo} rowSpan={10}>
                      <div className={styles.askInfoContainer}>
                        <div className={styles.detailInfo}>상한가<br></br>{maxAskPrice.toLocaleString()}</div>
                        <div className={styles.detailInfo}>하한가<br></br>{minBidPrice.toLocaleString()}</div>
                      </div>
                      <div className={styles.askInfoContainer}>
                        <div className={styles.detailInfo}>최고가<br></br>{maxPrice.toLocaleString()}</div>
                        <div className={styles.detailInfo}>최저가<br></br>{minPrice.toLocaleString()}</div>
                      </div>
                      <div className={styles.detailInfo}>거래량<br></br>{quantity.toLocaleString()}</div>
                    </td>
                  )}
                </tr>
              ))}

              {/* 구분선 */}
              <tr style={{ borderTop: '3px solid #333'}}></tr>

              {/* 매수 데이터 */}
              {[...Array(10)].map((_, i) => (
                <tr key={`bid-${i}`} className={styles.orderRow}>
                  {i === 0 && (
                    <td className={styles.bidInfo} rowSpan={10}></td>
                  )}
                  <td
                    className={styles.bidPrice}
                    style={{ color: orderBookData[`BIDP${i + 1}`] > currentPrice ? '#FF4F4F' : '#4881FF' }}
                  >
                    {orderBookData[`BIDP${i + 1}`].toLocaleString()}
                  </td>
                  <td className={styles.bidVolume}>{orderBookData[`BIDP_RSQN${i + 1}`].toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>   
        </div>
        <div className={styles.summary}>
          <p className={styles.askSummary}>판매대기 {orderBookData.TOTAL_ASKP_RSQN.toLocaleString()}</p>
          <p className={styles.marketStatus}>정규장</p>
          <p className={styles.bidSummary}>구매대기 {orderBookData.TOTAL_BIDP_RSQN.toLocaleString()}</p>
        </div>
    </div>
  );
};

export default OrderBook;
