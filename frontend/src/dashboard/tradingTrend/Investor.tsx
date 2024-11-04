// 투자자

import useInvestor from "./useInvestor";

const Investor = () => {
  // TODO: companyId
  const companyId = 1;
  const { data, loading, error } = useInvestor(companyId);

  if (loading) return <p>loading...</p>;
  if (error) return <p>error</p>;
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>일자</th>
            <th>외국인</th>
            <th>기관계</th>
            <th>개인</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{item.foreigner}</td>
                <td>{item.corporate}</td>
                <td>{item.indiviual}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Investor;
