import styles from './StockRanking.module.css';
import StockInfo from './StockInfo';
import { useState, useEffect } from 'react';
import samsungLogo from '../../assets/images/samsung.png';

import fetchStockRanking from './hooks/fetchStockRanking';

const StockRanking = () => {
  // const data = useIndexData()
  const [selectedCategory, setSelectedCategory] = useState<string>('거래 대금');
  const [currentTime, setCurrentTime] = useState('');

  const categories = ['거래 대금', '거래량', '급상승', '급하락'];
  const categoryToKeyword: { [key: string]: string } = {
    '거래 대금': 'amount',
    '거래량': 'volume',
    '급상승': 'advance',
    '급하락': 'declined',
  };

  // 이거 각각의 세부 카테고리 호출할 때마다 axios로 데이터 저장
  const [stockData, setStockData] = useState(
    [
      {
        dataRank: 1,
        stockName: '삼성전자',
        logoLink: samsungLogo,
        stockPrice: 58000,
        previousDayVersusPrice: 300,
      },
      {
        dataRank: 2,
        stockName: 'SK하이닉스',
        logoLink: samsungLogo,
        stockPrice: 146400,
        previousDayVersusPrice: -7600,
      },
      {
        dataRank: 3,
        stockName: '현대자동차',
        logoLink: samsungLogo,
        stockPrice: 1051900,
        previousDayVersusPrice: 95,
      },
      {
        dataRank: 4,
        stockName: '포스코',
        logoLink: samsungLogo,
        stockPrice: 2245,
        previousDayVersusPrice: -30,
      },
      {
        dataRank: 5,
        stockName: '두산',
        logoLink: samsungLogo,
        stockPrice: 192600,
        previousDayVersusPrice: 4800,
      },
    ].map((stock) => ({
      ...stock,
      previousDayVersus: (Math.abs(stock.previousDayVersusPrice) / stock.stockPrice) * 100,
    }))
  );

  const setCategoryAndGetData = (category: string) => {
    setSelectedCategory(category);
    // category 값에 따라 다른 API를 호출하는 코드 추가 가능
  };

  const fetchStockRankingData = async (category: string) => {
    const data = await fetchStockRanking(category);
    const transformedData = data.map((item) => ({
      dataRank: item['data_rank'],
      stockName: item['hts_kor_isnm'],
      stockPrice: item['stck_prpr'],
      previousDayVersusPrice: item['prdy_vrss']
    }))
    setStockData(transformedData);
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`오늘 ${hours}:${minutes} 기준`);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 60000); // 1분마다 업데이트

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 제거
  }, []);

  // API 호출
  useEffect(() => {
    fetchStockRankingData(categoryToKeyword[selectedCategory]);

    const intervalId = setInterval(fetchStockRankingData, 60000); // 1분마다 업데이트

    return () => clearInterval(intervalId);
  }, [selectedCategory]);

  return (
    <div className={styles.container}>
      <div className={styles.categoryTabs}>
        종목 랭킹
        <div className={styles.time}>{currentTime}</div>
      </div>

      <div className="categoryTabs">
        {categories.map((category) => (
          <button
            key={category}
            className={`${'tabButton'} ${selectedCategory === category ? 'activeTab' : ''}`}
            onClick={() => setCategoryAndGetData(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className={styles.content}>
        {stockData.map((stockinfo, index) => (
          <StockInfo key={index} {...stockinfo} />
        ))}
      </div>
    </div>
  );
};

export default StockRanking;
