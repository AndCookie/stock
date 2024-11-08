import { stringToRelativeDate } from "../../common/utils";
import styles from "./Info.module.css";

// 날짜 포맷팅 함수
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear().toString().slice(2); // 연도 2자리
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월
  const day = date.getDate().toString().padStart(2, '0'); // 일
  const hours = date.getHours().toString().padStart(2, '0'); // 시
  const minutes = date.getMinutes().toString().padStart(2, '0'); // 분

  return `${year}/${month}/${day} ${hours}:${minutes}`;
};

// 뉴스와 공시 모두 사용합니다
const Item = ({
  main,
  date,
  sub,
  url,
  isNews = false, // 뉴스인지 공시인지 구분하는 prop
}: {
  main: string;
  date: string;
  sub: string;
  url: string;
  isNews?: boolean;
}) => {
  const handleClick = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // 뉴스면 상대 날짜, 공시면 지정된 날짜 형식
  const displayDate = isNews ? stringToRelativeDate(date) : formatDate(date);

  return (
    <div className={styles.newsContent} onClick={handleClick}>
      <div className={styles.newsTitle}>{main}</div>
      <div className={styles.newsInfo}>
        {displayDate} | {sub}
      </div>
    </div>
  );
};

export default Item;
