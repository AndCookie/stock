// 시세
// Realtime만 보여주기로 해서 그냥 파일 다 날렸습니다 - 우진

const TradingVolume = () => {
  // TODO: 데이터 연결
  // (참고) orderBook 이랑 같은 데이터를 사용합니다
  const { tradingData } = {
    tradingData: [
      {
        STCK_CNTG_HOUR: 111858, // 시간 => 11시 18분 58초
        STCK_PRPR: 2000, // 체결가
        CNTG_VOL: 10, // 체결량
        ACML_VOL: 123, // 누적 체결량
        CTTR: 73.3,
        CCLD_DVSN: 1,
      },
      {
        STCK_CNTG_HOUR: 130105,
        STCK_PRPR: 1900,
        CNTG_VOL: 30,
        ACML_VOL: 153,
        CTTR: 69.84,
        CCLD_DVSN: 5,
      },
      {
        STCK_CNTG_HOUR: 142251,
        STCK_PRPR: 2000,
        CNTG_VOL: 20,
        ACML_VOL: 173,
        CTTR: 71.48,
        CCLD_DVSN: 1,
      },
    ],
  };
  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>체결가</td>
            <td>체결량</td>
            <td>거래량</td>
            <td>시간</td>
          </tr>
        </thead>
        <tbody>
          {tradingData.map((td, idx) => (
            <tr key={idx}>
              <td>{td.STCK_PRPR}</td>
              <td>{td.CNTG_VOL}</td>
              <td>{td.ACML_VOL}</td>
              <td>
                {td.STCK_CNTG_HOUR.toString().slice(0, 2)}:
                {td.STCK_CNTG_HOUR.toString().slice(2, 4)}:
                {td.STCK_CNTG_HOUR.toString().slice(4, 6)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TradingVolume;
