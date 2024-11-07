import { AiOutlineClose } from "react-icons/ai";
import { INews } from "./definitions";
import styles from './NewsModal.module.css';

const NewsModal = ({
  news,
  closeModal,
}: {
  news: INews | null;
  closeModal: () => void;
}) => {
  // 안전성 검사
  if (!news) return null;

  const { title, created_at, author, description, image } = news;

  return (
    <div className={styles.modalOverlay} onClick={closeModal}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className="closeButton" onClick={closeModal}>
          <AiOutlineClose size={20} color="#888" />
        </button>
        <div className={styles.title}>{title}</div>
        <div className={styles.meta}>{created_at} · {author}</div>
        
        <div className={styles.content}>
          <img className={styles.image} src={image} alt="news" />
          <div className={styles.description}>{description}</div>
        </div>
      
        {/* 하단 */}
        <div className={styles.relatedStocks}>
          <h3 className={styles.relatedStocksTitle}>관련 주식</h3>
          <div className={styles.stockInfo}>
            <span className={styles.stockName}>현대차</span>
            <div className={styles.stockDetail}>
              <span className={styles.stockPrice}>241,000원</span>
              <span className={styles.stockChange}>+6,500원 (2.7%)</span>
              <button className={styles.favoriteButton}>&#x2764;</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsModal;
