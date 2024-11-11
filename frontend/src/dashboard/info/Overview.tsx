import useFetch from "../../common/hooks/useFetch";
import { ICompanyData } from "./definitions";
import styles from "./Info.module.css";


const Overview = () => {
  // TODO: companyId
  const companyId = 1;
  const { data, loading, error } = useFetch<ICompanyData>(`info/${companyId}`);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data.</p>;

  return (
    <div className={styles.subContent}>
      {data ? (
        <div className={styles.overviewContainer}>
          {/* 상단 정보: KOSPI | 전기전자 ... 기업분석 자세히 보기 */}
          <div className={styles.headerSection}>
            <span className={styles.marketInfo}>
              {data.market} | {data.industry}
            </span>
            <span className={styles.detailsLink}>{data.companyDetailsLink}</span>
          </div>
          
          {/* 중간 정보: 대표이사, 시가총액 */}
          <div className={styles.infoBox}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>대표이사</span>
              <span className={styles.infoValue}>{data.ceo}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>시가총액</span>
              <span className={styles.infoValue}>{data.marketCap.toLocaleString()}억원</span>
            </div>
          </div>

          {/* 설명 */}
          <div className={styles.description}>{data.description}</div>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Overview;
