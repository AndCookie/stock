// 시세
// Realtime만 보여주기로 해서 그냥 파일 다 날렸습니다 - 우진
import useSocketStore from '../../store/useSocketStore';
import styles from './TradingVolume.module.css'

const TradingVolume: React.FC = () => {
  const { tradingData } = useSocketStore();

  if (!tradingData) {
    return <div className={styles.loading}>Loading...</div>;
  }

  // 내림차순 정렬
  const sortedTradingData = [...tradingData].sort((a, b) => b.STCK_CNTG_HOUR - a.STCK_CNTG_HOUR);

  return (
    <div className={styles.container}>
      <div className={styles.categoryTabs}>
        시세
      </div>

      <div className={styles.content}>
        <table className={styles.tradingTable}>
          <thead>
            <tr>
              <td>체결가</td>
              <td>체결량</td>
              <td>거래량</td>
              <td>시간</td>
            </tr>
          </thead>
          <tbody>
            {sortedTradingData.map((td, idx) => (
              <tr key={idx}>
                <td className={styles.tradePrice}>{td.STCK_PRPR.toLocaleString()}</td>
                <td
                  className={styles.tradeVolume}
                  style={{
                    color: td.CCLD_DVSN === 1 ? '#FF4F4F' : td.CCLD_DVSN === 5 ? '#4881FF' : 'inherit',
                  }}
                >
                  {td.CNTG_VOL.toLocaleString()}
                </td>
                <td className={styles.acmlVolume}>{td.ACML_VOL.toLocaleString()}</td>
                <td className={styles.tradeTime}>
                  {td.STCK_CNTG_HOUR.toString().slice(0, 2)}:
                  {td.STCK_CNTG_HOUR.toString().slice(2, 4)}:
                  {td.STCK_CNTG_HOUR.toString().slice(4, 6)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};

export default TradingVolume;
