// 뉴스

import useFetch from "../../common/useFetch";
import Item from "./Item";
import { ICompanyNewsDisclosure } from "./definitions";

const News = () => {
  const companyId = 1;
  const { data, loading, error } = useFetch<ICompanyNewsDisclosure[]>(
    `info/${companyId}/news`
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data.</p>;

  return (
    <div>
      {data ? (
        data.map((news, idx) => (
          <Item
            main={news.title}
            date={news.created_at}
            sub={news.author}
            url={news.url}
            key={idx}
          />
        ))
      ) : (
        <p>no data available</p>
      )}
    </div>
  );
};

export default News;
