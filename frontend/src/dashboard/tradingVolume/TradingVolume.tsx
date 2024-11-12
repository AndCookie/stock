// 시세
// Realtime만 보여주기로 해서 그냥 파일 다 날렸습니다 - 우진
// import useSocketStore from '../../store/useSocketStore';
import styles from './TradingVolume.module.css'

const TradingVolume: React.FC = () => {
  const tradingData = [
    {
      STCK_CNTG_HOUR: 151759,
      STCK_PRPR: 50900,
      CNTG_VOL: 11,
      ACML_VOL: 197895,
      CTTR: 73.3,
      CCLD_DVSN: 5, // 매도
    },
    {
      STCK_CNTG_HOUR: 151755,
      STCK_PRPR: 51000,
      CNTG_VOL: 141,
      ACML_VOL: 197884,
      CTTR: 69.84,
      CCLD_DVSN: 1, // 매수
    },
    {
      STCK_CNTG_HOUR: 151755,
      STCK_PRPR: 51000,
      CNTG_VOL: 5,
      ACML_VOL: 197743,
      CTTR: 71.48,
      CCLD_DVSN: 5, // 매도
    },
    {
      STCK_CNTG_HOUR: 151754,
      STCK_PRPR: 50900,
      CNTG_VOL: 11,
      ACML_VOL: 197738,
      CTTR: 72.4,
      CCLD_DVSN: 1, // 매수
    },
    {
      STCK_CNTG_HOUR: 151749,
      STCK_PRPR: 50900,
      CNTG_VOL: 11,
      ACML_VOL: 197727,
      CTTR: 72.8,
      CCLD_DVSN: 5, // 매도
    },
    {
      STCK_CNTG_HOUR: 151744,
      STCK_PRPR: 51000,
      CNTG_VOL: 6,
      ACML_VOL: 197716,
      CTTR: 70.5,
      CCLD_DVSN: 1, // 매수
    },
    {
      STCK_CNTG_HOUR: 151740,
      STCK_PRPR: 51000,
      CNTG_VOL: 2,
      ACML_VOL: 197710,
      CTTR: 71.1,
      CCLD_DVSN: 5, // 매도
    },
    {
      STCK_CNTG_HOUR: 151739,
      STCK_PRPR: 51000,
      CNTG_VOL: 7,
      ACML_VOL: 197708,
      CTTR: 69.9,
      CCLD_DVSN: 1, // 매수
    },
  ];
  // const { tradingData } = useSocketStore();

  // 내림차순 정렬
  const sortedTradingData = [...tradingData].sort((a, b) => b.STCK_CNTG_HOUR - a.STCK_CNTG_HOUR);

  if (!tradingData) return <div />

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
