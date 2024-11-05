// 거래원
import useFetch from "../../common/useFetch";
import { ITrader } from "./definitions";

const Trader = () => {
  // TODO: companyId
  const companyId = 1;
  const { data, loading, error } = useFetch<ITrader>(
    `trend/${companyId}/trader`
  );

  if (loading) return <p>loading...</p>;
  if (error) return <p>error</p>;

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>증감</th>
            <th></th>
            <th>매도상위</th>
            <th>매수상위</th>
            <th></th>
            <th>증감</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            Array.from({ length: 5 }).map((_, index) => (
              <tr key={index}>
                <td>{data.sell[index].diff}</td>
                <td>{data.sell[index].amount}</td>
                <td>{data.sell[index].company}</td>
                <td>{data.buy[index].company}</td>
                <td>{data.buy[index].amount}</td>
                <td>{data.buy[index].diff}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Trader;
