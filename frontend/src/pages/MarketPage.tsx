import { useState } from 'react';
import { useParams } from 'react-router-dom';

import IndexChart from '../market/IndexChart';
// import styles from './MarketPage.module.css';

const MarketPage = () => {
  const { indexTypeId } = useParams();
  const indexTypes = ['국내', '해외', '환율', '원자재']

  const [selectedIndex, setSelectedIndex] = useState(indexTypes[indexTypeId]);

  return (
    <>
      <div>오늘의 지수</div>
      {indexTypes.map((indexType) => (
        <button key={indexType} onClick={() => setSelectedIndex(indexType)}>{indexType}</button>
      ))}
      <IndexChart indexType={selectedIndex} />
    </>
  );
};

export default MarketPage;
