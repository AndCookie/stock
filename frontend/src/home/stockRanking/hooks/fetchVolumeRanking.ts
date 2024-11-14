import axios from 'axios';

const BASEURL = import.meta.env.VITE_LOCAL_BASEURL;

const fetchVolumeRanking = async () => {
  try {
    const res = await axios.get(BASEURL + 'stocks/volume-ranking/');
    if (res.data) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }

  return false;
};

export default fetchVolumeRanking;
