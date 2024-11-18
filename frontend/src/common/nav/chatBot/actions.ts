import axios from "axios";

const baseURL = import.meta.env.VITE_LOCAL_BASEURL;

export const postMessage = async (message: string) => {
  try {
    const res = await axios.post(baseURL + "chatbot/message", {
      message,
    });
    return res.data.message;
  } catch (error) {
    console.log("서버 오류:", error);
    return "죄송합니다. 서버와 연결되지 않았습니다.";
  }
};
