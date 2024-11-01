// 뉴스

import Item from "./Item";
import useCompanyNews from "./useCompanyNews";

const News = () => {
  const companyId = 1;
  const { data, error, loading } = useCompanyNews(companyId);

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
