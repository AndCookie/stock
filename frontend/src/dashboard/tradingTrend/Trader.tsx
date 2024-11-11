// 거래원
import useFetch from "../../common/hooks/useFetch";
import { ITrader } from "./definitions";
import styles from "./TradingTrend.module.css";

const Trader = () => {
  // TODO: companyId
  const companyId = 1;
  const { data, loading, error } = useFetch<ITrader>(
    `trend/${companyId}/trader`
  );

  // 데이터 확인을 위해 추가
  console.log("Fetched data:", data);

  if (loading) return <p>loading...</p>;
  if (error) return <p>error</p>;

  const maxSellAmount = Math.max(...(data?.sell.map(item => item.amount) || [0]));
  const maxBuyAmount = Math.max(...(data?.buy.map(item => item.amount) || [0]));

  return (
    <div className={styles.subContent}>
      <table className={styles.traderTable}>
      <thead>
          <tr>
            <th className={styles.thDiff}>증감</th>
            <th colSpan={2} className={styles.thAmount}>매도상위</th>
            <th colSpan={2} className={styles.thAmount}>매수상위</th>
            <th className={styles.thDiff}>증감</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            Array.from({ length: 5 }).map((_, index) => (
              <tr key={index}>
                {/* 매도 */}
                <td className={styles.sellDiff}>{data.sell[index].diff.toLocaleString()}</td>
                <td colSpan={2} className={styles.barCell}>
                  <div
                    className={styles.sellBar}
                    style={{
                      width: `${(data.sell[index].amount / maxSellAmount) * 100}%`,
                    }}
                  ></div>
                  <div className={styles.barText}>
                    <span>{data.sell[index].amount.toLocaleString()}</span>
                    <span className={styles.company}>{data.sell[index].company}</span>
                  </div>
                </td>

                {/* 매수 */}
                <td colSpan={2} className={styles.barCell}>
                  <div
                    className={styles.buyBar}
                    style={{
                      width: `${(data.buy[index].amount / maxBuyAmount) * 100}%`,
                    }}
                  ></div>
                  <div className={styles.barText}>
                    <span className={styles.company}>{data.buy[index].company}</span>
                    <span>{data.buy[index].amount.toLocaleString()}</span>
                  </div>
                </td>
                <td className={styles.buyDiff}>{data.buy[index].diff.toLocaleString()}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className={styles.footer}>
        <span className={styles.sellForeignVolume}>
          {data?.foreignVolume[0]?.sell !== undefined ? data.foreignVolume[0].sell.toLocaleString() : 'N/A'}
        </span>
        <span className={styles.titleForeignVolume}>외국계 추정 거래량</span>
        <span className={styles.buyForeignVolume}>
          {data?.foreignVolume[0]?.buy !== undefined ? data.foreignVolume[0].buy.toLocaleString() : 'N/A'}
        </span>
      </div>
    </div>
  );
};

export default Trader;
