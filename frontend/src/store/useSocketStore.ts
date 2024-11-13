import { create } from "zustand";
import { ISocketStore, IIndicatorData, IOrderBookData, ITradingData } from "./definitions";

const useSocketStore = create<ISocketStore>((set) => ({
  kospiData: null,
  kosdaqData: null,
  orderBookData: null,
  tradingData: null,

  setKospiData: (data: IIndicatorData) => set({ kospiData: data }),
  setKosdaqData: (data: IIndicatorData) => set({ kosdaqData: data }),
  setOrderBookData: (data: IOrderBookData) => set({ orderBookData: data }),
  setTradingData: (data: ITradingData) => set({ tradingData: data }),
}));

export default useSocketStore;

const SOCKET_URL = "wss://k11a204.p.ssafy.io/ws/";
const ws = new WebSocket(SOCKET_URL);

ws.onopen = () => {
  console.log("WebSocket is opened.")
}

ws.onmessage = (event) => {
  try {
    const data = JSON.parse(event.data);

    // kospi
    if (data.stock_code === "0001") {
      useSocketStore.getState().setKospiData(data.indicator.prpr_nmix);
    // kosdaq
    } else if (data.stock_code === "1001") {
      useSocketStore.getState().setKosdaqData(data.indicator.prpr_nmix);
    // order book
    } else if (data.ORDER_BOOK) {
      useSocketStore.getState().setOrderBookData(data.ORDER_BOOK);
    // trading
    } else if (data.trading) {
      useSocketStore.getState().setTradingData(data.trading);
    }
  } catch (error) {
    console.log(error);
  }
}

ws.onerror = (error) => {
  console.error(error);
};

ws.onclose = () => {
  console.log("WebSocket is closed.");
};

const sendMessage = (message: object) => {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(message));
  } else {
    console.error("WebSocket is not opened.");
  }
};

export { sendMessage };