import styles from './ChatBot.module.css';

// closeModal의 타입을 () => void로 지정
interface ChatBotProps {
  closeModal?: () => void; // closeModal을 선택적 prop으로 설정
}

const Heart: React.FC<ChatBotProps> = ({ closeModal }) => {
  return (
    <div className={styles.modalOverlay} onClick={closeModal}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>ChatBot 모달</h2>
        <p>여기에 모달 내용을 추가하세요.</p>
        <button onClick={closeModal}>닫기</button>
      </div>
    </div>
  );
};

export default Heart;
