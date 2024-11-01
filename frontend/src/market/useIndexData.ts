import { useState, useEffect } from "react";
import axios from "axios";
import { IIndexData } from "./definitions";

export const useFetchIndexData = (indexType: string) => {
  const [indexData, setIndexData] = useState<IIndexData>({});

  useEffect(() => {
    const fetchIndexData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/indexDetail", {
          params: {
            indexType: indexType,
          },
        });
        setIndexData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchIndexData();
  }, [indexType]);

  return indexData;
};
