import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import fetchTraderTrend from "./hooks/fetchTraderTrend";
import { IInvestor } from "./definitions";

// import styles from "./TradingTrend.module.css";

const Investor = () => {
  const { stockCode } = useParams();
  const [renderedInvestorData, setRenderedInvestorData] = useState<IInvestor | null>(null);

  useEffect(() => {
    if (!stockCode) return;

    const fetchData = async () => {
      try {
        const data = await fetchTraderTrend("investor", stockCode);
        setRenderedInvestorData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData()
  }, [stockCode])

  useEffect(() => {
    console.log(renderedInvestorData);
  }, [renderedInvestorData])

  return <div />;

  // if (!renderedInvestorData) return <div />;

  // return (
  //   <div className={styles.subContent}>
  //     <table className={styles.investorTable}>
  //       <thead>
  //         <tr>
  //           <th className={styles.thDate}>일자</th>
  //           <th className={styles.thInvest}>외국인</th>
  //           <th className={styles.thInvest}>기관계</th>
  //           <th className={styles.thInvest}>개인</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {renderedInvestorData.map((item, index) => (
  //             <tr key={index}>
  //               <td>{item.date}</td>
  //               <td className={item.foreigner >= 0 ? styles.positive : styles.negative}>
  //                 {item.foreigner.toLocaleString()}
  //               </td>
  //               <td className={item.corporate >= 0 ? styles.positive : styles.negative}>
  //                 {item.corporate.toLocaleString()}
  //               </td>
  //               <td className={item.individual >= 0 ? styles.positive : styles.negative}>
  //                 {item.individual.toLocaleString()}
  //               </td>
  //             </tr>
  //           ))}
  //       </tbody>
  //     </table>
  //   </div>
  // );
};

export default Investor;
