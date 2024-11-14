import axios from 'axios';

const BASEURL = import.meta.env.VITE_LOCAL_BASEURL;

const fetchAmountRanking = async () => {
  try {
    const res = await axios.get(BASEURL + 'stocks/amount-ranking/');
    if (res.data) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }

  return false;
};

export default fetchAmountRanking;
