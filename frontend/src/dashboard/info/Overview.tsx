import useCompanyData from "./useComponyData";

const Overview = () => {
  // TODO: companyId
  const companyId = 1;
  const { data, loading, error } = useCompanyData(companyId);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data.</p>;

  return (
    <div>
      {data ? (
        <div>
          {/* KOSPI | 전기전자 ... 기업분석자세히보기> */}
          <div>
            {/* space-between 쓰실까봐 분리해뒀어요 */}
            <span>
              {data.market} | {data.industry}
            </span>
            <span>{data.companyDetailsLink}</span>
          </div>
          {/* 대표이사, 시가총액 */}
          <div>
            <div>
              <span>대표이사</span>
              <span>{data.ceo}</span>
            </div>
            <div>
              <span>시가총액</span>
              <span>{data.marketCap}원</span>
            </div>
          </div>
          {/* 설명 */}
          <div>{data.description}</div>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Overview;
