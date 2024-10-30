import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Nav.module.css';
import { FaSearch } from 'react-icons/fa';

import member from '../../assets/images/member.png';
import chatBot from '../../assets/images/chatBot.png';
import heatMap from '../../assets/images/heatMap.png';

import MyPage from './myPage/myPage';
import ChatBot from './chatBot/ChatBot';
import HeatMap from './heatMap/HeatMap';

const Nav = () => {
  const navigate = useNavigate();

  // 각각의 모달 상태 관리
  const [isChatBotModalOpen, setChatBotModalOpen] = useState(false);
  const [isHeatMapModalOpen, setHeatMapModalOpen] = useState(false);
  const [isMyPageModalOpen, setMyPageModalOpen] = useState(false);

  const openChatBotModal = () => setChatBotModalOpen(true);
  const closeChatBotModal = () => setChatBotModalOpen(false);
  
  const openHeatMapModal = () => setHeatMapModalOpen(true);
  const closeHeatMapModal = () => setHeatMapModalOpen(false);
  
  const openMyPageModal = () => setMyPageModalOpen(true);
  const closeMyPageModal = () => setMyPageModalOpen(false);

  return (
    <>
      {/* Header 영역 */}
      <header className={styles.header}>
        <div className={styles.logo} onClick={() => navigate('/')}>
          <span className={styles.modu}>모두</span>모투
        </div>
        <div className={styles.searchContainer}>
          <FaSearch className={styles.searchIcon} />
          <input className={styles.search} placeholder="주식, 메뉴, 종목코드를 검색하세요" />
        </div>
        <div className={styles.icons}>
          <div className={styles.icon} onClick={openChatBotModal}>
            <img className={styles.icon1} src={chatBot} alt="chatBot" />
          </div>
          <div className={styles.icon} onClick={openHeatMapModal}>
            <img className={styles.icon2} src={heatMap} alt="heatMap" />
          </div>
          <div className={styles.icon} onClick={openMyPageModal}>
            <img className={styles.icon3} src={member} alt="member" />
          </div>
        </div>
      </header>

      {/* 모달이 열릴 때만 렌더링 */}
      {isChatBotModalOpen && <ChatBot closeModal={closeChatBotModal} />}
      {isHeatMapModalOpen && <HeatMap closeModal={closeHeatMapModal} />}
      {isMyPageModalOpen && <MyPage closeModal={closeMyPageModal} />}
    </>
  );
};

export default Nav;