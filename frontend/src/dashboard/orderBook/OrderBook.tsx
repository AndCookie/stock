import React, { useLayoutEffect, useRef } from 'react';
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
  
  // 스크롤을 중간 위치로 설정
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // 스크롤을 중간 위치로 맞추기 위해 약간의 지연을 줌
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight / 5;
    }
  }, [orderBookData, tradingData]);

  if (!orderBookData || !tradingData) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.categoryTabs}>
        호가
      </div>
      {/* <div className={styles.marketInfo}>
        <p>시간외단일가 56,800원 <span className={styles.priceChange}>+0.35%</span></p>
      </div> */}

      <div className={styles.content} ref={contentRef}>

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
                      <div className={styles.detailInfo}>최고가<br></br><span style={{color:"#FF4F4F"}}>{maxPrice.toLocaleString()}</span></div>
                      <div className={styles.detailInfo}>최저가<br></br><span style={{color:"#4881FF"}}>{minPrice.toLocaleString()}</span></div>
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
                  <td className={styles.bidInfo} rowSpan={10}>
                    <div className={styles.bidDetail}>
                      <span style={{ color: '#bbb' }}>
                        {tradingData.STCK_PRPR.toLocaleString()}
                      </span>
                      <span style={{
                        color: tradingData.CCLD_DVSN === 1 ? '#FF4F4F' : tradingData.CCLD_DVSN === 5 ? '#4881FF' : '#26d4a5',
                      }}>
                        {tradingData.CNTG_VOL.toLocaleString()}
                      </span>
                    </div>
                  </td>
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
        <p className={styles.askSummary}>
          <span>판매대기</span>
          {orderBookData.TOTAL_ASKP_RSQN.toLocaleString()}
        </p>
        <p className={styles.marketStatus}>정규장</p>
        <p className={styles.bidSummary}>
          <span>구매대기</span>
          {orderBookData.TOTAL_BIDP_RSQN.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default OrderBook;
