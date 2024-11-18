import styles from './Info.module.css';

// 뉴스와 공시 모두 사용합니다
const Item = ({
  hts_pbnt_titl_cntt,
  dorg,
  data_dt,
}: {
  hts_pbnt_titl_cntt: string;
  dorg: string;
  data_dt: string;
}) => {
  return (
    <div className={styles.newsContent}>
      <div className={styles.newsTitle}>{hts_pbnt_titl_cntt}</div>
      <div className={styles.newsInfo}>
        {data_dt} | {dorg}
      </div>
    </div>
  );
};

export default Item;
