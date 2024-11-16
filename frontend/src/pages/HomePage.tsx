import { useEffect } from 'react';

import Indicators from '../home/indicators/Indicators';
import Account from '../home/account/HomeAccount';
import UserRanking from '../home/userRanking/UserRanking';
import StockRanking from '../home/stockRanking/StockRanking';
// import Advice from '../home/advice/Advice';
// import AiNews from '../home/aiNews/AiNews';
import { useIndexStore } from '../store/useIndexStore';
import { useLoginStore } from './hooks/useLoginStore';

import styles from './HomePage.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HomePage: React.FC = () => {
  const { indexData, fetchIndexData } = useIndexStore();
  const { login } = useLoginStore();

  useEffect(() => {
    fetchIndexData();
    // 여기에다가 로그인 로직 작성해야지
    login();
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
