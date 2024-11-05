import React from "react";
import "../modal.css";
import useChatBot from "./useChatBot";
// import styles from './ChatBot.module.css';

// closeModal의 타입을 명시한 인터페이스
interface ModalComponentProps {
  closeModal: () => void;
}

const ChatBot: React.FC<ModalComponentProps> = ({ closeModal }) => {
  const { chat, sendChat, newchat, setNewchat, loading } = useChatBot();

  return (
    <div className="modalOverlay" onClick={closeModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modalCloseButton" onClick={closeModal}>
          &times;
        </button>
        <div className="modalContent">
          <h2>ChatBot</h2>
          {/* TODO : role 따라 채팅 ui 구현 */}
          {chat.map((c, idx) => (
            <p key={idx}>{c.message}</p>
          ))}
          <input
            style={{ color: "black" }}
            type="text"
            value={newchat}
            onChange={(e) => {
              setNewchat(e.target.value);
            }}
          />
          {loading ? (
            <button>답변 생성 중</button>
          ) : (
            <button
              style={{ color: "black" }}
              onClick={() => sendChat(newchat)}
            >
              보내기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
