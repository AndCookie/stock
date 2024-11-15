import { useEffect } from 'react';
import styles from './Favorite.module.css';
import { useFavoriteStore } from '../../../store/useFavoriteStore';
import { COLORS } from '../../../common/utils';

const Favorites = () => {
  const { favoriteData, fetchFavoriteData } = useFavoriteStore();

  useEffect(() => {
    fetchFavoriteData();
  }, []);

  const calculatePercentage = (prev: number, current: number) => {
    return ((Math.abs(current - prev) / prev) * 100).toFixed(1);
  };

  if (!favoriteData) return <div></div>;

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        <div className={styles.addButton}>
          <div className={styles.addIconContainer}>
            <span className={styles.addIcon}>+</span>
          </div>
          추가하기
        </div>
        {favoriteData.map((stock, index) => (
          <div key={index} className={styles.stockItem}>
            <div className={styles.stockInfo}>
              <span className={styles.stockName}>{stock.name}</span>
            </div>
            <div className={styles.stockDetails}>
              <div className={styles.stockPrice}>{stock.currentValue.toLocaleString()}원</div>
              <div className={styles.stockChange}>
                <span
                  style={{
                    color:
                      stock.currentValue - stock.prevValue > 0
                        ? COLORS.positive
                        : stock.currentValue - stock.prevValue < 0
                        ? COLORS.negative
                        : COLORS.neutral,
                  }}
                >
                  {stock.currentValue > stock.prevValue ? '+' : ''}
                  {(stock.currentValue - stock.prevValue).toLocaleString()}
                </span>
                &nbsp;
                <span
                  className={styles.percentage}
                  style={{
                    color:
                      stock.currentValue - stock.prevValue > 0
                        ? COLORS.positive
                        : stock.currentValue - stock.prevValue < 0
                        ? COLORS.negative
                        : COLORS.neutral,
                  }}
                >
                  ({calculatePercentage(stock.prevValue, stock.currentValue)}%)
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
