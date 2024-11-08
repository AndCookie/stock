import { useEffect } from 'react';
import { useIndexStore } from '../../store/useIndexStore';
import styles from './Rolling.module.css';

const Rolling = () => {
  const { indexData } = useIndexStore();

  useEffect(() => {
    console.log('Index Data:', indexData);
  }, [indexData]);


  if (!indexData) {
    return <div className={styles.rolling}>데이터를 불러오는 중입니다...</div>;
  }

  const formattedData = Object.entries(indexData).flatMap(([key, indices]) => {
    return Object.entries(indices).map(([subKey, data]) => {
      const latestData = data[data.length - 1]; // 가장 최근의 데이터 가져오기

      if (!latestData) return null;

      // 증가 또는 감소에 따라 색상을 결정
      const change = data.length > 1 ? latestData.value - data[data.length - 2].value : 0;
      const changeClass = change >= 0 ? styles.positive : styles.negative;

      return (
        <div key={`${key}-${subKey}`} className={styles.indexItem}>
          <span className={styles.subKey}>{subKey}</span>
          <span className={styles.value}>{latestData.value.toLocaleString()}</span>
          <span className={changeClass}>
            {change >= 0 ? ` +${change.toFixed(2)} (${((change / data[data.length - 2].value) * 100).toFixed(1)}%)` : ` ${change.toFixed(2)} (${((change / data[data.length - 2].value) * 100).toFixed(1)}%)`}
          </span>
        </div>
      );
    });
  });

  return (
    <div className={styles.rolling}>
      <div className={styles.inner}>
        {formattedData}
        {formattedData} {/* 두 번 렌더링하여 반복 효과 */}
      </div>
    </div>
  );
};

export default Rolling;
