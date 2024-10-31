import { INews } from "./definitions";

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
    <div>
      {/* 상단 닫기 */}
      <div>
        <button onClick={closeModal}>X</button>
      </div>
      {/* 타이틀 */}
      <div>{title}</div>
      <div>
        {created_at} · {author}
      </div>
      <div>
        {/* TODO */}
        연관 주식 정보...
      </div>
      <div>
        {/* TODO: 임시 CSS 입니다 */}
        <img style={{ width: 300, height: 300 }} src={image} alt="news image" />
        {description}
      </div>
      {/* footer */}
      <div>
        {/* TODO */}
        <div>관련 주식</div>
        <div>관련주식아이콘</div>
      </div>
    </div>
  );
};

export default NewsModal;
