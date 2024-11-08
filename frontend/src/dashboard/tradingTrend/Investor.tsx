// 투자자

import useFetch from "../../common/useFetch";
import { IInvestor } from "./definitions";
import styles from "./TradingTrend.module.css";

const Investor = () => {
  // TODO: companyId
  const companyId = 1;
  const { data, loading, error } = useFetch<IInvestor[]>(
    `trend/${companyId}/investor`
  );

  if (loading) return <p>loading...</p>;
  if (error) return <p>error</p>;
  return (
    <div className={styles.subContent}>
      <table className={styles.investorTable}>
        <thead>
          <tr>
            <th className={styles.thDate}>일자</th>
            <th className={styles.thInvest}>외국인</th>
            <th className={styles.thInvest}>기관계</th>
            <th className={styles.thInvest}>개인</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td className={item.foreigner >= 0 ? styles.positive : styles.negative}>
                  {item.foreigner.toLocaleString()}
                </td>
                <td className={item.corporate >= 0 ? styles.positive : styles.negative}>
                  {item.corporate.toLocaleString()}
                </td>
                <td className={item.individual >= 0 ? styles.positive : styles.negative}>
                  {item.individual.toLocaleString()}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Investor;
