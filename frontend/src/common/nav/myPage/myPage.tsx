import React from 'react';
import '../modal.css';
import Account  from '../../components/account/Account';
// import styles from './myPage.module.css';

// closeModal prop을 필수로 지정한 인터페이스
interface ModalComponentProps {
  closeModal: () => void;
}

const MyPage: React.FC<ModalComponentProps> = ({ closeModal }) => (
  <div className="modalOverlay" onClick={closeModal}>
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <button className="modalCloseButton" onClick={closeModal}>&times;</button>
      <div className="modalContent">
        <h2>MyPage</h2>
        <Account />
      </div>
    </div>
  </div>
);

export default MyPage;
