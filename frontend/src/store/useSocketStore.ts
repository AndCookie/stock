import { create } from "zustand";
// import { io } from "socket.io-client";
// interface는 소켓 필요한 데이터 정리 다 되면 나중에 definitions.ts에 옮길게요.

interface IOrderBookData {
  ASKP1: number;  // 매도호가 1
  ASKP2: number;  // 매도호가 2
  ASKP3: number;  // 매도호가 3
  ASKP4: number;  // 매도호가 4
  ASKP5: number;  // 매도호가 5
  ASKP6: number;  // 매도호가 6
  ASKP7: number;  // 매도호가 7
  ASKP8: number;  // 매도호가 8
  ASKP9: number;  // 매도호가 9
  ASKP10: number;  // 매도호가 10
  BIDP1: number;  // 매수호가 1
  BIDP2: number;  // 매수호가 2
  BIDP3: number;  // 매수호가 3
  BIDP4: number;  // 매수호가 4
  BIDP5: number;  // 매수호가 5
  BIDP6: number;  // 매수호가 6
  BIDP7: number;  // 매수호가 7
  BIDP8: number;  // 매수호가 8
  BIDP9: number;  // 매수호가 9
  BIDP10: number;  // 매수호가 10
  ASKP_RSQN1: number;  // 매도호가 잔량 1
  ASKP_RSQN2: number;  // 매도호가 잔량 2
  ASKP_RSQN3: number;  // 매도호가 잔량 3
  ASKP_RSQN4: number;  // 매도호가 잔량 4
  ASKP_RSQN5: number;  // 매도호가 잔량 5
  ASKP_RSQN6: number;  // 매도호가 잔량 6
  ASKP_RSQN7: number;  // 매도호가 잔량 7
  ASKP_RSQN8: number;  // 매도호가 잔량 8
  ASKP_RSQN9: number;  // 매도호가 잔량 9
  ASKP_RSQN10: number;  // 매도호가 잔량 10
  BIDP_RSQN1: number;  // 매수호가 잔량 1
  BIDP_RSQN2: number;  // 매수호가 잔량 2
  BIDP_RSQN3: number;  // 매수호가 잔량 3
  BIDP_RSQN4: number;  // 매수호가 잔량 4
  BIDP_RSQN5: number;  // 매수호가 잔량 5
  BIDP_RSQN6: number;  // 매수호가 잔량 6
  BIDP_RSQN7: number;  // 매수호가 잔량 7
  BIDP_RSQN8: number;  // 매수호가 잔량 8
  BIDP_RSQN9: number;  // 매수호가 잔량 9
  BIDP_RSQN10: number;  // 매수호가 잔량 10
  TOTAL_ASKP_RSQN: number;  // 총 매도호가 잔량
  TOTAL_BIDP_RSQN: number;  // 총 매수호가 잔량
}

interface ITradingData {
  STCK_CNTG_HOUR: string;  // 주식 체결 시간
  STCK_PRPR: number;  // 주식 현재가
  CNTG_VOL: number;  // 체결 거래량
  ACML_VOL: number;  // 누적 거래량
  CTTR: number;  // 체결강도
  CCLD_DVSN: number;  // 체결구분
}

interface ISocketStore {
  orderBookData: IOrderBookData | null;
  tradingData: ITradingData | null;
  setOrderBookData: (data: IOrderBookData) => void;
  setTradingData: (data: ITradingData) => void;
}

// const SOCKET_URL = "https://k11a204.p.ssafy.io/api";
// const socket = io(`${SOCKET_URL}/ws/`);

const SOCKET_URL = "ws://localhost:8080";
const socket = new WebSocket(SOCKET_URL);

const useSocketStore = create<ISocketStore>((set) => ({
  orderBookData: null,
  tradingData: null,

  setOrderBookData: (data: IOrderBookData) => set({ orderBookData: data }),
  setTradingData: (data: ITradingData) => set({ tradingData: data }),
}));

// 소켓에서 데이터를 수신하여 Zustand 스토어 업데이트
socket.onopen = () => {
  console.log("Connect WebSocket");
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);

  if (data.type === "ORDER_BOOK") {
    useSocketStore.getState().setOrderBookData(data.payload);
  } else if (data.type === "TRADING") {
    useSocketStore.getState().setTradingData(data.payload);
  } else {
    console.warn(data.type);
  }
};

socket.onclose = () => {
  console.log("Close WebSocket");
};

socket.onerror = (error) => {
  console.error(error);
};

// OrderBook(호가창) 데이터
// socket.on("ORDER_BOOK", (data) => {
//   useSocketStore.getState().setOrderBookData(data.ORDER_BOOK);
// });
// Trading(체결창) 데이터
// socket.on("TRADING", (data) => {
//   useSocketStore.getState().setTradingData(data.TRADING);
// });

export default useSocketStore;
