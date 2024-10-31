import { useState } from "react";

import NewsCard from "./NewsCard";
import NewsModal from "./NewsModal";
import { INews } from "./definitions";
import useNews from "./useNews";

const AiNews = () => {
  const newsList = useNews();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<INews | null>(null);

  const openModal = (article: INews) => {
    setSelectedNews(article);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedNews(null);
    setIsModalOpen(false);
  };

  return (
    <section>
      <div>AI 뉴스</div>
      <div>
        {newsList &&
          newsList.map((news, idx) => (
            <NewsCard news={news} openModal={() => openModal(news)} key={idx} />
          ))}
      </div>
      {isModalOpen && <NewsModal news={selectedNews} closeModal={closeModal} />}
    </section>
  );
};

export default AiNews;
