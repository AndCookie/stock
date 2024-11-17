import styles from './App.module.css';

import { Routes, Route } from 'react-router-dom';

import Nav from './common/nav/Nav';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import MarketPage from './pages/MarketPage';
import Rolling from './common/rolling/Rolling';
import './index.css';

// 백엔드 구현 전 axios MOCK !!! 배포 시에는 제거하세요
import './axiosMock';

function App() {
  return (
    <div id="app" className={styles.mainContainer}>
      <Nav />
      <Routes>
        <Route path="" element={<HomePage />}></Route>
        <Route path="/dashboard/:stockCode" element={<DashboardPage />}></Route>
        <Route path="/market/:indexTypeId" element={<MarketPage />}></Route>
      </Routes>
      <Rolling />
    </div>
  );
}

export default App;
