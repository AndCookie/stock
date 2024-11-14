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
          // console.log(current);
        }

        const previousValue = Number(previous.bstp_nmix_prpr ? previous.bstp_nmix_prpr : previous.ovrs_nmix_prpr);
        const currentValue = Number(typeof current !== "object" ? current : "bstp_nmix" in current ? current.bstp_nmix : "ovrs_nmix_prpr" in current ? current.ovrs_nmix_prpr : "0");

        const change = currentValue - previousValue;
        const changeClass = change >= 0 ? styles.positive : styles.negative;

        return (
          <div key={`${key}-${subKey}`} className={styles.indexItem}>
            <span className={styles.subKey}>{subKey}</span>
            <span className={styles.value}>{Number(currentValue.toFixed(2)).toLocaleString()}</span>
            <span className={changeClass}>
              {change >= 0 ? " +" : ""}{Number(change.toFixed(2)).toLocaleString()} ({Number(((change / previousValue) * 100).toFixed(2)).toLocaleString()}%)
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
