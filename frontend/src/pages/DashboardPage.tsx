// import styles from './DashboardPage.module.css';

import Chart from "../dashboard/chart/Chart";
import Info from "../dashboard/info/Info";
import TradingTrend from "../dashboard/tradingTrend/TradingTrend";

const DashboardPage = () => {
  return (
    <>
      <Chart />
      <Info />
      <TradingTrend />
    </>
  );
};

export default DashboardPage;
