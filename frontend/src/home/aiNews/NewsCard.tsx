import { DateTime } from "luxon";
import { INews } from "./definitions";

const NewsCard = ({
  news,
  openModal,
}: {
  news: INews;
  openModal: () => void;
}) => {
  const { author, image, title, created_at } = news;
  const relativeDate = DateTime.fromISO(created_at).toRelative();

  return (
    <div onClick={openModal}>
      <div>
        {/* TODO: 임시 CSS 입니다. */}
        <img
          style={{ width: "100px", height: "100px" }}
          src={image}
          alt="news image"
        />
      </div>
      <div>{title}</div>
      <div>
        {relativeDate} · {author}
      </div>
    </div>
  );
};

export default NewsCard;
