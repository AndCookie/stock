import { useEffect, useState } from "react";
import axios from "axios";
import { IMinuteData } from "../definitions";

const baseURL = import.meta.env.VITE_LOCAL_BASEURL;

const useMinuteData = () => {
  const [minuteData, setMinuteData] = useState<IMinuteData[]>([]);

  useEffect(() => {
    const fetchMinuteData = async () => {
      try {
        const response = await axios.get(baseURL + "stocks/minute-price/");
        setMinuteData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMinuteData();
  }, []);

  return { minuteData };
};

export default useMinuteData;
