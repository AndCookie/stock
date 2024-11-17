import axios from 'axios';

const BASEURL = import.meta.env.VITE_LOCAL_BASEURL;

const fetchTrader = async (stockCode: string) => {
  try {
    const response = await axios.get(BASEURL + 'stocks/trend/', {
      params: {
        data_type: "trader",
        stock_code: stockCode,
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchTrader;
