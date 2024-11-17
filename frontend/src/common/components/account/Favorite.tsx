import { useEffect, useState } from 'react';
import styles from './Favorite.module.css';
import { useFavoriteStore } from '../../../store/useFavoriteStore';
import useSocketStore, { sendMessage } from '../../../store/useSocketStore';
import { COLORS } from '../../../common/utils';
import { IFavoriteData } from '../../../store/definitions';

const Favorites = () => {
  const { favoriteData, fetchFavoriteData } = useFavoriteStore();
  // const postFavoriteData = useFavoriteStore((state) => state.postFavoriteData);
  const deleteFavoriteData = useFavoriteStore((state) => state.deleteFavoriteData);
  const { stockCode, tradingData } = useSocketStore();
  const [isEdit, setIsEdit] = useState(false);

  const [renderedFavoriteDataList, setRenderedFavoriteDataList] = useState<IFavoriteData[] | null>(null);

  const handleEdit = () => {
    if (!isEdit) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  };

  const handleDelete = (stockCode: string) => (e: React.MouseEvent<HTMLDivElement>) => {
    sendMessage({
      stock_code: stockCode,
      exit: "True"
    })
    deleteFavoriteData(stockCode);
    fetchFavoriteData();
  };

  useEffect(() => {
    if (!favoriteData) return;

    setRenderedFavoriteDataList(favoriteData);
  }, [favoriteData])

  // useEffect(() => {
  //   console.log(renderedFavoriteDataList)
  // }, [renderedFavoriteDataList])

  useEffect(() => {
    if (!renderedFavoriteDataList || !stockCode || !tradingData) return;

    setRenderedFavoriteDataList((prevList) => {
      const updateList = prevList!.map((stock) => {
        if (stock.stock_code === stockCode) {
          const previousPrice = Number(stock.stock_price) - Number(stock.fluctuation_difference);
          const fluctuationDifference = Number(tradingData.STCK_PRPR) - previousPrice;
          const fluctuationRate = (fluctuationDifference / previousPrice) * 100;

          return {
            ...stock,
            fluctuation_difference: fluctuationDifference.toString(),
            fluctuation_rate: fluctuationRate.toString(),
            stock_price: tradingData.STCK_PRPR.toString(),
          };
        }
        return stock;
      });
      return updateList;
    })
  }, [stockCode])

  if (!renderedFavoriteDataList || renderedFavoriteDataList.length === 0 || renderedFavoriteDataList[0].stock_code === "") return <div />;

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {/* <div className={styles.addButton} onClick=""> */}
        <div className={styles.addButton}>
          <div className={styles.addIconContainer}>
            <span className={styles.addIcon}>+</span>
          </div>
          추가하기
        </div>

        <div onClick={handleEdit}>편집</div>
        {/* get 요청에서 종목코드, 시장가, 등락률 보내준다고 가정하고 코드 작성 */}
        {renderedFavoriteDataList.map((stock, index) => (
          <div key={index} className={styles.stockItem}>
            <div className={styles.stockInfo}>
              <span className={styles.stockName}>{stock.stock_name}</span>
            </div>
            <div className={styles.stockDetails}>
              <div className={styles.stockPrice}>{parseInt(stock.stock_price).toLocaleString()}원</div>
              <div className={styles.stockChange}>
                <span style={{ color: Number(stock.fluctuation_rate) > 0 ? COLORS.positive : Number(stock.fluctuation_rate) < 0? COLORS.negative : COLORS.neutral }}>
                  {Number(stock.fluctuation_rate) > 0 ? '+' : ''}{parseInt(stock.fluctuation_difference).toLocaleString()}원
                </span>
                &nbsp;
                <span
                  className={styles.percentage}
                  style={{ color: Number(stock.fluctuation_rate) > 0 ? COLORS.positive : Number(stock.fluctuation_rate) < 0 ? COLORS.negative : COLORS.neutral }}>
                  ({Number(stock.fluctuation_rate).toFixed(2).toLocaleString()}%)
                </span>
              </div>
            </div>
            {isEdit ? <div onClick={handleDelete(stock.stock_code)}>삭제</div> : ''}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
