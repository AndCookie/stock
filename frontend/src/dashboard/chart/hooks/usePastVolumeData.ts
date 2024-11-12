import { useEffect, useState } from "react";
import axios from "axios";
import { IVolumeData } from "../definitions";

const baseURL = import.meta.env.VITE_LOCAL_BASEURL;

const usePastVolumeData = () => {
  const [pastVolumeData, setPastVolumeData] = useState<IVolumeData[]>([]);

  useEffect(() => {
    const fetchPastVolumeData = async () => {
      try {
        const response = await axios.get(baseURL + 'volumeDetail');
        setPastVolumeData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPastVolumeData();
  }, []);

  return { pastVolumeData };
};

export default usePastVolumeData;
