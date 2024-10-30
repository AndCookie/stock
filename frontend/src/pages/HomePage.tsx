import styles from './HomePage.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Indicators from '../home/indicators/Indicators';


const HomePage: React.FC = () => (
  <>
    <Indicators />

    <section className={styles.mainContent}>
      <div className={styles.portfolio}>보유 종목</div>
      <div className={styles.rankings}>모의투자 랭킹</div>
      <div className={styles.realtimeChart}>실시간 차트</div>
    </section>

    <section className={styles.news}>
      {['뉴스 1', '뉴스 2', '뉴스 3'].map((news, index) => (
        <div key={index} className={styles.newsItem}>{news}</div>
      ))}
    </section>
  </>
);

export default HomePage;