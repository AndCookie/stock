// 거래동향

import useDaily from "./useDaily";

const Daily = () => {
  // TODO: companyId 설정
  const companyId = 1;
  const { data, loading, error } = useDaily(companyId);

  if (loading) return <p>loading...</p>;
  if (error) return <p>error</p>;
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>일자</th>
            <th>주가</th>
            <th>대비</th>
            <th>등락률</th>
            <th>거래량</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{item.price}</td>
                <td>{item.change}</td>
                <td>{item.rate}</td>
                <td>{item.volume}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Daily;
