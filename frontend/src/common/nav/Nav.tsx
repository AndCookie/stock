import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Nav.module.css';
import { FaSearch } from 'react-icons/fa';
import heart from '../../assets/images/heart.png';
import chatBot from '../../assets/images/chatBot.png';
import heatMap from '../../assets/images/heatMap.png';
import Heart from './heart/Heart';

const Nav = () => {
  const navigate = useNavigate();
  const [isHeartModalOpen, setHeartModalOpen] = useState(false); // 모달 상태 관리

  const openHeartModal = () => setHeartModalOpen(true);
  const closeHeartModal = () => setHeartModalOpen(false);

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
          <div className={styles.icon} onClick={() => navigate('/chatbot')}>
            <img className={styles.icon1} src={chatBot} alt="chatBot" />
          </div>
          <div className={styles.icon} onClick={() => navigate('/heatmap')}>
            <img className={styles.icon2} src={heatMap} alt="heatMap" />
          </div>
          <div className={styles.icon} onClick={openHeartModal}>
            <img className={styles.icon3} src={heart} alt="heart" />
          </div>
        </div>
      </header>

      {/* Heart 모달이 열릴 때만 렌더링 */}
      {isHeartModalOpen && <Heart closeModal={closeHeartModal} />}
    </>
  );
};

export default Nav;