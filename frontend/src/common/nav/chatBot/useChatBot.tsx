import { useState } from "react";
import { postMessage } from "./actions";

const useChatBot = () => {
  const [chat, setChat] = useState([
    {
      message: "안녕하세요! 저는 챗봇입니다. 무엇을 도와드릴까요?",
      role: "gpt",
    },
  ]);
  const [newchat, setNewchat] = useState("");
  const [loading, setLoading] = useState(false);

  const sendChat = async (message: string) => {
    if (message.length == 0) return;
    setLoading(true);

    try {
      const res = await postMessage(message);
      setChat((prevChat) => [
        ...prevChat,
        { message: message, role: "me" },
        { message: res, role: "gpt" },
      ]);
    } catch (error) {
      console.error("메시지 전송 실패:", error);
    } finally {
      setLoading(false);
      setNewchat("");
    }
  };

  return { chat, sendChat, newchat, setNewchat, loading };
};

export default useChatBot;
