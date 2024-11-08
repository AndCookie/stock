import React from 'react';
import '../modal.css';
import Account from '../../components/account/Account';
import styles from './myPage.module.css';

// closeModal prop을 필수로 지정한 인터페이스
interface ModalComponentProps {
  closeModal: () => void;
}

const MyPage: React.FC<ModalComponentProps> = ({ closeModal }) => (
  <div className="modalOverlay" onClick={closeModal}>
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <button className="modalCloseButton" onClick={closeModal}>&times;</button>
      <div className="modalContent">
        <h2 className={styles.header}>마이페이지</h2>
        <div className={styles.content} style={{transform: 'scale(0.88)'}}>
          <Account contentStyle={{ height: '630px', overflowY: 'scroll'}} />
        </div>
      </div>
    </div>
  </div>
);

export default MyPage;
