// 공시

import useFetch from "../../common/hooks/useFetch";
import Item from "./Item";
import { ICompanyNewsDisclosure } from "./definitions";
import styles from "./Info.module.css";

const Disclosure = () => {
  // TODO : companyId
  const companyId = 1;
  const { data, loading, error } = useFetch<ICompanyNewsDisclosure[]>(
    `info/${companyId}/disclosure`
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <div className={styles.subContent}>
      {data ? (
        <div className={styles.newsContainer}>
          {data.map((news, idx) => (
            <div className={styles.newsItem} key={idx}>
              <Item
                main={news.title}
                date={news.created_at}
                sub={news.author}
                url={news.url}
                key={idx}
                isNews={false} // 공시이므로 false 설정
              />
            </div>
          ))}
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Disclosure;
