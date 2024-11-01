import { useEffect, useState } from "react";
import axios from "axios";
import { IVolumeData } from "../definitions";

const baseURL = import.meta.env.VITE_LOCAL_BASEURL;

const useVolumeData = () => {
  const [volumeData, setVolumeData] = useState<IVolumeData[]>([]);

  useEffect(() => {
    const fetchVolumeData = async () => {
      try {
        const response = await axios.get(baseURL + 'volumeDetail');
        setVolumeData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchVolumeData();
  }, []);

  return { volumeData };
};

export default useVolumeData;
