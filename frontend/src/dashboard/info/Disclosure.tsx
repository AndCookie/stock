// 공시

import Item from "./Item";
import useCompanyDisclosure from "./useCompanyDisclosure";

const Disclosure = () => {
  // TODO : companyId
  const companyId = 1;
  const { data, error, loading } = useCompanyDisclosure(companyId);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <div>
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
    </div>
  );
};

export default Disclosure;
