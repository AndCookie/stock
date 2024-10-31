import { useState, useEffect } from "react";
import axios from "axios";
import { INews } from "./definitions";
const baseURL = import.meta.env.VITE_LOCAL_BASEURL;

const useNews = () => {
  const [news, setNews] = useState<INews[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(baseURL + "aiNews");
        setNews(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNews();
  }, []);

  return news;
};

export default useNews;
