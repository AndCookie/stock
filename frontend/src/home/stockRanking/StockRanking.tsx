import styles from './StockRanking.module.css';
import StockInfo from './StockInfo';
import { useState } from 'react';
import samsungLogo from '../../assets/images/samsung.png';

const StockRanking = () => {
  // const data = useIndexData()
  const [selectedCategory, setSelectedCategory] = useState('거래 대금');

  const categories = ['거래 대금', '거래량', '급상승', '급하락'];

  // 이거 각각의 세부 카테고리 호출할 때마다 axios로 데이터 저장
  const [stockData] = useState([
    {
      dataRank: '1',
      stockName: '삼성전자',
      logoLink: samsungLogo,
      stockPrice: '100,000',
      previousDayVersusPrice: '40,000',
      previousDayVersus: '60',
    },
    {
      dataRank: '1',
      stockName: '삼성전자',
      logoLink: samsungLogo,
      stockPrice: '100,000',
      previousDayVersusPrice: '40,000',
      previousDayVersus: '60',
    },
    {
      dataRank: '1',
      stockName: '삼성전자',
      logoLink: samsungLogo,
      stockPrice: '100,000',
      previousDayVersusPrice: '40,000',
      previousDayVersus: '60',
    },
    {
      dataRank: '1',
      stockName: '삼성전자',
      logoLink: samsungLogo,
      stockPrice: '100,000',
      previousDayVersusPrice: '40,000',
      previousDayVersus: '60',
    },
    {
      dataRank: '1',
      stockName: '삼성전자',
      logoLink: samsungLogo,
      stockPrice: '100,000',
      previousDayVersusPrice: '40,000',
      previousDayVersus: '60',
    },
  ]);

  return (
    <div className={styles.container}>
      StockRanking
      <div className="categoryTabs">
        {categories.map((category) => (
          <button
            key={category}
            className={`${'tabButton'} ${selectedCategory === category ? 'activeTab' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className={styles.stockData}>
        {stockData.map((stockinfo, index) => (
          <StockInfo key={index} {...stockinfo} />
        ))}
      </div>
    </div>
  );
};

export default StockRanking;
