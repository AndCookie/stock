import { useEffect } from 'react';

import { useIndexStore } from '../../store/useIndexStore';
import { IIndexEntry } from '../../store/definitions';

import styles from './Rolling.module.css';

const Rolling = () => {
  const { indexData, fetchIndexData } = useIndexStore();

  useEffect(() => {
    fetchIndexData();
  }, [fetchIndexData]);

  if (!indexData) {
    return <div className={styles.rolling} />;
  }

  const formattedData = Object.entries(indexData).flatMap(([key, indices]) => {
    return Object.entries(indices as Record<string, IIndexEntry[]>).map(([subKey, data]) => {
      const latestData = data[data.length - 1]; // 가장 최근의 데이터 가져오기

      if (!latestData) return null;

      // 증가 또는 감소에 따라 색상을 결정
      const change = data.length > 1 ? Number(latestData.bstp_nmix_prpr ? latestData.bstp_nmix_prpr : latestData.ovrs_nmix_prpr) - Number(data[data.length - 2].bstp_nmix_prpr ? data[data.length - 2].bstp_nmix_prpr : data[data.length - 2].ovrs_nmix_prpr) : 0;
      const changeClass = change >= 0 ? styles.positive : styles.negative;

      return (
        <div key={`${key}-${subKey}`} className={styles.indexItem}>
          <span className={styles.subKey}>{subKey}</span>
          <span className={styles.value}>{Number(latestData.bstp_nmix_prpr ? latestData.bstp_nmix_prpr : latestData.ovrs_nmix_prpr)}</span>
          <span className={changeClass}>
            {change >= 0 ? ` +${change.toFixed(2)} (${((change / Number(data[data.length - 2].bstp_nmix_prpr ? data[data.length - 2].bstp_nmix_prpr : data[data.length - 2].ovrs_nmix_prpr)) * 100).toFixed(2)}%)` : ` ${change.toFixed(2)} (${((change / Number(data[data.length - 2].bstp_nmix_prpr ? data[data.length - 2].bstp_nmix_prpr : data[data.length - 2].ovrs_nmix_prpr)) * 100).toFixed(2)}%)`}
          </span>
        </div>
      );
    });
  });

  return (
    <div className={styles.rolling}>
      <div className={styles.inner}>
        {formattedData}
        {formattedData}
        {formattedData}
      </div>
    </div>
  );
};

export default Rolling;
