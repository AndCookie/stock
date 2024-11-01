import React from 'react';
import styles from './Favorites.module.css';

const Favorites = () => {
  const stocks = [
    { name: '시보드', price: '4,108,934원', change: '0', percentage: '0.0%'},
    { name: '삼성전자', price: '56,100원', change: '-500', percentage: '0.8%'},
    { name: '카카오', price: '36,550원', change: '-900', percentage: '2.4%'},
    { name: '테슬라', price: '356,583원', change: '-3,009', percentage: '0.8%'},
    { name: '쿠팡', price: '35,354원', change: '0', percentage: '0.0%'},
    { name: '메타', price: '784,814원', change: '+994', percentage: '0.1%'},
    { name: '로블록스', price: '57,677원', change: '0', percentage: '0.0%'},
    { name: '넷플릭스', price: '1,039,668원', change: '-1,988', percentage: '0.1%'},
    { name: '애플', price: '316,962원', change: '-1,339', percentage: '0.4%'},
  ];

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        <div className={styles.addButton}>
          <div className={styles.addIconContainer}>
            <span className={styles.addIcon}>+</span>
          </div>
          추가하기
        </div>
        {stocks.map((stock, index) => (
          <div key={index} className={styles.stockItem}>
            <div className={styles.stockInfo}>
              <span className={styles.stockName}>{stock.name}</span>
            </div>
            <div className={styles.stockDetails}>
              <div className={styles.stockPrice}>{stock.price}</div>
              <div className={styles.stockChange}>
                <span className={stock.change.startsWith('-') ? styles.negative : styles.positive}>
                  {stock.change}
                </span>
                &nbsp;
                <span className={styles.percentage}>({stock.percentage})</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
