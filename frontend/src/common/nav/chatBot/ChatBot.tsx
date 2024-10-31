import React from 'react';
import '../modal.css';
// import styles from './ChatBot.module.css';

// closeModal의 타입을 명시한 인터페이스
interface ModalComponentProps {
  closeModal: () => void;
}

const ChatBot: React.FC<ModalComponentProps> = ({ closeModal }) => (
  <div className="modalOverlay" onClick={closeModal}>
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <button className="modalCloseButton" onClick={closeModal}>&times;</button>
      <div className="modalContent">
        <h2>ChatBot</h2>
        <p>여기에 모달 내용을 추가하세요.</p>
      </div>
    </div>
  </div>
);

export default ChatBot;
