import { create } from "zustand";
import { ISocketStore, IIndicatorData } from "./definitions";

const useSocketStore = create<ISocketStore>((set) => ({
  kospiData: null,
  kosdaqData: null,
  setKospiData: (data: IIndicatorData) => set({ kospiData: data }),
  setKosdaqData: (data: IIndicatorData) => set({ kosdaqData: data }),

  // orderBookData: null,
  // tradingData: null,
  // setOrderBookData: (data: IOrderBookData) => set({ orderBookData: data }),
  // setTradingData: (data: ITradingData) => set({ tradingData: data }),
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
      console.log(data.indicator.prpr_nmix)
      useSocketStore.getState().setKosdaqData(data.indicator.prpr_nmix);
    }

    // if (data.ORDER_BOOK) {
    //   console.log("ORDER_BOOK", data.ORDER_BOOK);
    //   useSocketStore.getState().setOrderBookData(data.ORDER_BOOK);
    // } else if (data.TRADING) {
    //   console.log("TRADING", data.TRADING);
    //   useSocketStore.getState().setTradingData(data.TRADING);
    // }
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

// const SOCKET_URL = "ws://localhost:8080";
// const socket = new WebSocket(SOCKET_URL);

// socket.onopen = () => {
//   console.log("Connect WebSocket");
// };

// socket.onmessage = (event) => {
//   const data = JSON.parse(event.data);

//   if (data.type === "ORDER_BOOK") {
//     useSocketStore.getState().setOrderBookData(data.payload);
//   } else if (data.type === "TRADING") {
//     useSocketStore.getState().setTradingData(data.payload);
//   } else {
//     console.warn(data.type);
//   }
// };

// socket.onclose = () => {
//   console.log("Close WebSocket");
// };

// socket.onerror = (error) => {
//   console.error(error);
// };
