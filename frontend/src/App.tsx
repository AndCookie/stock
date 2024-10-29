import styles from './App.module.css';

import { Routes, Route } from 'react-router-dom';

import Nav from './common/nav/Nav';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import MarketPage from './pages/MarketPage';

import ChatBot from './common/nav/chatBot/ChatBot';
import HeatMap from './common/nav/heatMap/HeatMap';
import Heart from './common/nav/heart/Heart';


function App() {

  return (
    <div id='app'>
      <div className={styles.mainContainer}>
        <Nav />
        <Routes>
          <Route path="" element={<HomePage />}></Route>
          <Route path="/dashboard" element={<DashboardPage />}></Route>
          <Route path="/market" element={<MarketPage />}></Route>

          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/heatmap" element={<HeatMap />} />
          <Route path="/heart" element={<Heart />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
