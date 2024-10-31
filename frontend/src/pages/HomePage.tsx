import styles from './HomePage.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Indicators from '../home/indicators/Indicators';
import Account from '../home/account/Account';
import UserRanking from '../home/userRanking/UserRanking';
import StockRanking from '../home/stockRanking/StockRanking';
import Advice from '../home/advice/Advice';
import AiNews from '../home/aiNews/AiNews';


const HomePage: React.FC = () => (
  <>
    <Indicators />

    <section className={styles.mainContent}>
      <Account />
      <UserRanking />
      <StockRanking />
    </section>
    
    <section className={styles.bottomContent}>
      <Advice />
      <AiNews />
    </section>
  </>
);

export default HomePage;