import { useState } from "react";

import NewsCard from "./NewsCard";
import NewsModal from "./NewsModal";
import { INews } from "./definitions";
import useFetch from "../../common/useFetch";

const AiNews = () => {
  const { data, loading, error } = useFetch<INews[]>(`ai-news`);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<INews | null>(null);

  if (loading) return <p>loading...</p>;
  if (error) return <p>error</p>;

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
        {data &&
          data.map((news, idx) => (
            <NewsCard news={news} openModal={() => openModal(news)} key={idx} />
          ))}
      </div>
      {isModalOpen && <NewsModal news={selectedNews} closeModal={closeModal} />}
    </section>
  );
};

export default AiNews;
