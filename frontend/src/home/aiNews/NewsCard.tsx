import { INews } from "./definitions";
import { stringToRelativeDate } from "../../common/utils";
import styles from './NewsCard.module.css';

const NewsCard = ({
  news,
  openModal,
}: {
  news: INews;
  openModal: () => void;
}) => {
  const { author, image, title, created_at } = news;
  const relativeDate = stringToRelativeDate(created_at);

  return (
    <div className={styles.newsCard} onClick={openModal}>
      <img className={styles.image} src={image} alt="news" />
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.meta}>
          {relativeDate} · {author}
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
