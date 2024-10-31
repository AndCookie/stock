import styles from './App.module.css';

import { Routes, Route } from 'react-router-dom';

import Nav from './common/nav/Nav';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import MarketPage from './pages/MarketPage';


function App() {

  return (
    <div id="app" className={styles.mainContainer}>
      <Nav />
      <Routes>
        <Route path="" element={<HomePage />}></Route>
        <Route path="/dashboard" element={<DashboardPage />}></Route>
        <Route path="/market" element={<MarketPage />}></Route>
      </Routes>
    </div>
  )
}

export default App
