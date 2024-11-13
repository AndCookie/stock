import { useState, useEffect } from 'react';

import { useIndexStore } from '../../store/useIndexStore';
import useSocketStore from '../../store/useSocketStore';
import { IIndexEntry } from '../../store/definitions';

import styles from './Rolling.module.css';

const Rolling = () => {
  const { indexData } = useIndexStore();
  const { kospiData, kosdaqData } = useSocketStore();

  const [formattedData, setFormattedData] = useState<JSX.Element[] | null>(null);

  useEffect(() => {
    if (!indexData) return;

    const updatedData = Object.entries(indexData).flatMap(([key, indices]) => {
      return Object.entries(indices as Record<string, IIndexEntry[]>).map(([subKey, data]) => {
        const previous = data[data.length - 2];
        let current;
        if (kospiData && subKey === "코스피") {
          current = kospiData;
        } else if (kosdaqData && subKey === "코스닥") {
          current = kosdaqData;
        } else {
          current = data[data.length - 1];
        }

        const previousValue = Number(previous.bstp_nmix_prpr ? previous.bstp_nmix_prpr : previous.ovrs_nmix_prpr);
        const currentValue = Number(typeof current !== "object" ? current : "prpr_nmix" in current ? current.prpr_nmix : current.bstp_nmix_prpr);

        const change = currentValue - previousValue;
        const changeClass = change >= 0 ? styles.positive : styles.negative;

        return (
          <div key={`${key}-${subKey}`} className={styles.indexItem}>
            <span className={styles.subKey}>{subKey}</span>
            <span className={styles.value}>{currentValue}</span>
            <span className={changeClass}>
              {change >= 0 ? ` +${change.toFixed(2)} (${((change / previousValue) * 100).toFixed(2)}%)` : ` ${change.toFixed(2)} (${((change / previousValue) * 100).toFixed(2)}%)`}
            </span>
          </div>
        );
      });
    });

    setFormattedData(updatedData);
  }, [indexData, kospiData, kosdaqData]);

  if (!formattedData) {
    return <div className={styles.rolling} />;
  }

  return (
    <div className={styles.rolling}>
      <div className={styles.inner}>
        {formattedData}
        {formattedData}
      </div>
    </div>
  );
};

export default Rolling;
