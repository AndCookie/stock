import React, { useEffect, useRef } from "react";
import "../modal.css";
import useChatBot from "./useChatBot";
import styles from './ChatBot.module.css';

// closeModal의 타입을 명시한 인터페이스
interface ModalComponentProps {
  closeModal: () => void;
}

const ChatBot: React.FC<ModalComponentProps> = ({ closeModal }) => {
  const { chat, sendChat, newchat, setNewchat, loading } = useChatBot();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // useEffect를 사용하여 새 메시지가 추가될 때마다 스크롤을 맨 아래로 이동
  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chat]);

  // 엔터 키를 감지하여 메시지 전송
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !loading && newchat.trim()) {
      e.preventDefault();
      sendChat(newchat);
    }
  };

  return (
    <div className="modalOverlay" onClick={closeModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modalCloseButton" onClick={closeModal}>
          &times;
        </button>
        <div className="modalContent">
          <h2 className={styles.header}>AI 챗봇</h2>
          <div className={styles.chatContainer} ref={chatContainerRef}>
            {chat.map((c, idx) => (
              <div
                key={idx}
                className={`${styles.chatMessage} ${
                  c.role !== "gpt" ? styles.userMessage : styles.botMessage
                }`}
              >
                <p>{c.message}</p>
              </div>
            ))}
          </div>
          <div className={styles.chatInputContainer}>
            <input
              className={styles.chatInput}
              type="text"
              placeholder="메시지를 입력하세요"
              value={newchat}
              onChange={(e) => setNewchat(e.target.value)}
              onKeyDown={handleKeyDown} // 엔터 키 감지 이벤트 추가
            />
            <button
              className={styles.sendButton}
              onClick={() => sendChat(newchat)}
              disabled={loading || !newchat.trim()}
            >
              {loading ? "답변 생성 중.." : "전송"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;