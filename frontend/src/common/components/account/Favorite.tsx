import { useEffect } from 'react';
import styles from './Favorite.module.css';
import { useFavoriteStore } from '../../../store/useFavoriteStore';
import { COLORS } from '../../../common/utils';

const Favorites = () => {
  const { favoriteData, fetchFavoriteData } = useFavoriteStore();

  useEffect(() => {
    fetchFavoriteData();
  }, []);

  if (!favoriteData) return <div></div>;

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        <div className={styles.addButton} onClick="">
          <div className={styles.addIconContainer}>
            <span className={styles.addIcon}>+</span>
          </div>
          추가하기
        </div>
        <div>편집</div>
        {/* get 요청에서 종목코드, 시장가, 등락률 보내준다고 가정하고 코드 작성 */}
        {favoriteData.map((stock, index) => (
          <div key={index} className={styles.stockItem}>
            <div className={styles.stockInfo}>
              <span className={styles.stockName}>{stock.stock_name}</span>
            </div>
            <div className={styles.stockDetails}>
              <div className={styles.stockPrice}>{stock.stock_price.toLocaleString()}원</div>
              <div className={styles.stockChange}>
                <span
                  style={{
                    color:
                      Number(stock.fluctuation_rate) > 0
                        ? COLORS.positive
                        : Number(stock.fluctuation_rate) < 0
                        ? COLORS.negative
                        : COLORS.neutral,
                  }}
                >
                  {Number(stock.fluctuation_rate) > 0 ? '+' : ''}
                  {stock.fluctuation_difference.toLocaleString()}
                </span>
                &nbsp;
                <span
                  className={styles.percentage}
                  style={{
                    color:
                      Number(stock.fluctuation_rate) > 0
                        ? COLORS.positive
                        : Number(stock.fluctuation_rate) < 0
                        ? COLORS.negative
                        : COLORS.neutral,
                  }}
                >
                  ({stock.fluctuation_rate}%)
                </span>
              </div>
            </div>
            <div>삭제</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
