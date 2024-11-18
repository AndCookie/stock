import { useEffect, useState } from 'react';
import axios from 'axios';

const BASEURL = import.meta.env.VITE_LOCAL_BASEURL;

const useDisclosure = (stockCode: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASEURL}stocks/disclosure/`, {
          data: {
            stock_code: stockCode,
          },
        });
        setData(res.data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  });

  return { data, loading, error };
};

export default useDisclosure;
