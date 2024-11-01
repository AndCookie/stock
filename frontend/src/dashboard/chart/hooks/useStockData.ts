import { useEffect, useState } from "react";
import axios from "axios";
import { IStockData } from "../definitions";

const baseURL = import.meta.env.VITE_LOCAL_BASEURL;

const useStockData = () => {
  const [stockData, setStockData] = useState<IStockData[]>([]);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get(baseURL + 'stockDetail');
        setStockData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStockData();
  }, []);

  return { stockData };
};

export default useStockData;
