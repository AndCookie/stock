// 호가

const OrderBook = () => {
  // TODO: data 연결
  // TODO: 상한가 하한가 정보 받아와야함...
  const { orderBookData, tradingData } = {
    orderBookData: {
      ASKP1: 2000,
      ASKP2: 2100,
      ASKP3: 2200,
      ASKP4: 2300,
      ASKP5: 2400,
      ASKP6: 2500,
      ASKP7: 2600,
      ASKP8: 2700,
      ASKP9: 2800,
      ASKP10: 2900,
      BIDP1: 1900,
      BIDP2: 1800,
      BIDP3: 1700,
      BIDP4: 1600,
      BIDP5: 1500,
      BIDP6: 1400,
      BIDP7: 1300,
      BIDP8: 1200,
      BIDP9: 1100,
      BIDP10: 1000,
      ASKP_RSQN1: 1,
      ASKP_RSQN2: 2,
      ASKP_RSQN3: 3,
      ASKP_RSQN4: 4,
      ASKP_RSQN5: 5,
      ASKP_RSQN6: 6,
      ASKP_RSQN7: 7,
      ASKP_RSQN8: 8,
      ASKP_RSQN9: 9,
      ASKP_RSQN10: 10,
      BIDP_RSQN1: 1,
      BIDP_RSQN2: 2,
      BIDP_RSQN3: 3,
      BIDP_RSQN4: 4,
      BIDP_RSQN5: 5,
      BIDP_RSQN6: 6,
      BIDP_RSQN7: 7,
      BIDP_RSQN8: 8,
      BIDP_RSQN9: 9,
      BIDP_RSQN10: 10,
      TOTAL_ASKP_RSQN: 55,
      TOTAL_BIDP_RSQN: 55,
    },
    tradingData: [
      {
        STCK_CNTG_HOUR: 111858,
        STCK_PRPR: 2000, // 체결가
        CNTG_VOL: 10, // 체결량
        ACML_VOL: 123,
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
        CTTR: 71.48, // 강도는 마지막게 가장 최신입니다.
        CCLD_DVSN: 1,
      },
    ],
  };

  return (
    <div>
      <div>호가</div>
      <table>
        <tbody>
          <tr>
            <td>{orderBookData.ASKP_RSQN10}</td>
            <td>{orderBookData.ASKP10}</td>
            <td rowSpan={10}>
              <table>
                <tbody>
                  <tr>
                    <td>상한가</td>
                    <td>76800</td>
                  </tr>
                  <tr>
                    <td>하한가</td>
                    <td>41400</td>
                  </tr>
                  <tr>
                    <td>상승VI</td>
                    <td>64100</td>
                  </tr>
                  <tr>
                    <td>하강VI</td>
                    <td>52300</td>
                  </tr>
                  <tr>
                    <td>시작</td>
                    <td>52300</td>
                  </tr>
                  <tr>
                    <td>최고</td>
                    <td>52300</td>
                  </tr>
                  <tr>
                    <td>최저</td>
                    <td>52300</td>
                  </tr>
                  <tr>
                    <td>거래량</td>
                    <td>3149만</td>
                  </tr>
                  <tr>
                    <td>어제보다</td>
                    <td>115.38%</td>
                  </tr>
                </tbody>
              </table>
              {/* <div>
                <span>상한가</span>
                <span>76800</span>
              </div>
              <div>
                <span>하한가</span>
                <span>41400</span>
              </div>
              <div>
                <span>상승VI</span>
                <span>64100</span>
              </div>
              <div>
                <span>하강VI</span>
                <span>52300</span>
              </div>
              <div>
                <div>
                  <span>시작</span>
                  <span>58200</span>
                </div>
                <div>
                  <span>최고</span>
                  <span>58200</span>
                </div>
                <div>
                  <span>최저</span>
                  <span>58200</span>
                </div>
                <div>
                  <span>거래량</span>
                  <span>3149만</span>
                </div>
                <div>
                  <span>어제보다</span>
                  <span>115.38%</span>
                </div>
              </div> */}
            </td>
          </tr>
          <tr>
            <td>{orderBookData.ASKP_RSQN9}</td>
            <td>{orderBookData.ASKP9}</td>
          </tr>
          <tr>
            <td>{orderBookData.ASKP_RSQN8}</td>
            <td>{orderBookData.ASKP8}</td>
          </tr>
          <tr>
            <td>{orderBookData.ASKP_RSQN7}</td>
            <td>{orderBookData.ASKP7}</td>
          </tr>
          <tr>
            <td>{orderBookData.ASKP_RSQN6}</td>
            <td>{orderBookData.ASKP6}</td>
          </tr>
          <tr>
            <td>{orderBookData.ASKP_RSQN5}</td>
            <td>{orderBookData.ASKP5}</td>
          </tr>
          <tr>
            <td>{orderBookData.ASKP_RSQN4}</td>
            <td>{orderBookData.ASKP4}</td>
          </tr>
          <tr>
            <td>{orderBookData.ASKP_RSQN3}</td>
            <td>{orderBookData.ASKP3}</td>
          </tr>
          <tr>
            <td>{orderBookData.ASKP_RSQN2}</td>
            <td>{orderBookData.ASKP2}</td>
          </tr>
          <tr>
            <td>{orderBookData.ASKP_RSQN1}</td>
            <td>{orderBookData.ASKP1}</td>
          </tr>

          <tr>
            <td rowSpan={10}>
              <div>체결강도{tradingData[tradingData.length - 1]["CTTR"]}%</div>
              <table>
                <tbody>
                  {tradingData.slice(-10).map((td, idx) => (
                    <tr key={idx}>
                      <td>{td.STCK_PRPR}</td>
                      <td>{td.CNTG_VOL}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
            <td>{orderBookData.BIDP1}</td>
            <td>{orderBookData.BIDP_RSQN1}</td>
          </tr>
          <tr>
            <td>{orderBookData.BIDP2}</td>
            <td>{orderBookData.BIDP_RSQN2}</td>
          </tr>
          <tr>
            <td>{orderBookData.BIDP3}</td>
            <td>{orderBookData.BIDP_RSQN3}</td>
          </tr>
          <tr>
            <td>{orderBookData.BIDP4}</td>
            <td>{orderBookData.BIDP_RSQN4}</td>
          </tr>
          <tr>
            <td>{orderBookData.BIDP5}</td>
            <td>{orderBookData.BIDP_RSQN5}</td>
          </tr>
          <tr>
            <td>{orderBookData.BIDP6}</td>
            <td>{orderBookData.BIDP_RSQN6}</td>
          </tr>
          <tr>
            <td>{orderBookData.BIDP7}</td>
            <td>{orderBookData.BIDP_RSQN7}</td>
          </tr>
          <tr>
            <td>{orderBookData.BIDP8}</td>
            <td>{orderBookData.BIDP_RSQN8}</td>
          </tr>
          <tr>
            <td>{orderBookData.BIDP9}</td>
            <td>{orderBookData.BIDP_RSQN9}</td>
          </tr>
          <tr>
            <td>{orderBookData.BIDP10}</td>
            <td>{orderBookData.BIDP_RSQN10}</td>
          </tr>
          <tr>
            <td>
              <p>판매대기</p> <p>{orderBookData.TOTAL_ASKP_RSQN}</p>
            </td>
            <td>정규장</td>
            <td>
              <p>구매대기</p> <p>{orderBookData.TOTAL_BIDP_RSQN}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderBook;
