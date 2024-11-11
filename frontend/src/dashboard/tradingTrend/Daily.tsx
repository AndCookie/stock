// 거래동향

import useFetch from "../../common/hooks/useFetch";
import { IDaily } from "./definitions";
import styles from "./TradingTrend.module.css";

const Daily = () => {
  // TODO: companyId 설정
  const companyId = 1;
  const { data, loading, error } = useFetch<IDaily[]>(
    `trend/${companyId}/daily`
  );

  if (loading) return <p>loading...</p>;
  if (error) return <p>error</p>;
  return (
    <div className={styles.subContent}>
      <table>
        <thead>
          <tr className={styles.tableHeader}>
            <th className={styles.thDate}>일자</th>
            <th className={styles.thPrice}>주가</th>
            <th className={styles.thChange}>대비</th>
            <th className={styles.thRate}>등락률</th>
            <th className={styles.thVolume}>거래량</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td className={item.change > 0 ? styles.positive : styles.negative}>
                  {item.price.toLocaleString()}
                </td>
                <td className={item.change > 0 ? styles.positive : styles.negative}>
                  {item.change > 0 ? `▲ ${item.change.toLocaleString()}` : `▼ ${Math.abs(item.change).toLocaleString()}`}
                </td>
                <td className={item.rate > 0 ? styles.positive : styles.negative}>
                  {item.rate > 0 ? `+${item.rate.toLocaleString()}%` : `${item.rate.toLocaleString()}%`}
                </td>
                <td>{item.volume.toLocaleString()}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Daily;
