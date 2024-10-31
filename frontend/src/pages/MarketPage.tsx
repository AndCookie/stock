import { useState } from 'react';
import IndexChart from '../market/IndexChart';
// import styles from './MarketPage.module.css';

const MarketPage = () => {
  const [selectedIndex, setSelectedIndex] = useState('국내');

  const indices = ['국내', '해외', '환율', '원자재']

  return (
    <>
      <div>오늘의 지수</div>
      {indices.map((index, i) => (
        <button key={i} onClick={() => setSelectedIndex(index)}>{index}</button>
      ))}
      <IndexChart index={selectedIndex} />
    </>
  );
};

export default MarketPage;
