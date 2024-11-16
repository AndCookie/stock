import { useEffect } from 'react';

import Indicators from '../home/indicators/Indicators';
import Account from '../home/account/HomeAccount';
import UserRanking from '../home/userRanking/UserRanking';
import StockRanking from '../home/stockRanking/StockRanking';
// import Advice from '../home/advice/Advice';
// import AiNews from '../home/aiNews/AiNews';
import { useIndexStore } from '../store/useIndexStore';

import styles from './HomePage.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HomePage: React.FC = () => {
  const { indexData, fetchIndexData } = useIndexStore();

  useEffect(() => {
    fetchIndexData();
  }, []);

  if (!indexData) return <div />;

  return (
    <>
      <Indicators />

      <section className={styles.mainContent}>
        <Account />
        <UserRanking />
        <StockRanking />
      </section>

      {/* <section className={styles.bottomContent}>
        <Advice />
        <AiNews />
      </section> */}
    </>
  );
};

export default HomePage;
