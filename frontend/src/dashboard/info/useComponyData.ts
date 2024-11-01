import { useState, useEffect } from "react";
import axios from "axios";
import { ICompanyData } from "./definitions";

const BASEURL = import.meta.env.VITE_LOCAL_BASEURL;

const useCompanyData = (companyId: number) => {
  const [data, setData] = useState<null | ICompanyData>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASEURL}company/${companyId}`);
        console.log(res);
        setData(res.data);
      } catch (error) {
        setError(error as Error);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (companyId !== undefined) {
      fetchData();
    }
  }, [companyId]);

  return { data, loading, error };
};

export default useCompanyData;
