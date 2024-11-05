import axios from "axios";

const baseURL = import.meta.env.VITE_LOCAL_BASEURL;

export const postMessage = async (message: string) => {
  try {
    const res = await axios.post(baseURL + "chatbot/message", {
      message,
    });
    return res.data.message;
  } catch (error) {
    console.log(error);
    return false;
  }
};
