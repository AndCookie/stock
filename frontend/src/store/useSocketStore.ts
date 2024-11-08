import { create } from "zustand";
import { io } from "socket.io-client";
// interface는 소켓 필요한 데이터 정리 다 되면 나중에 definitions.ts에 옮길게요.

interface IOrderBookData {
  ASKP1: number;
  ASKP2: number;
  ASKP3: number;
  ASKP4: number;
  ASKP5: number;
  ASKP6: number;
  ASKP7: number;
  ASKP8: number;
  ASKP9: number;
  ASKP10: number;
  BIDP1: number;
  BIDP2: number;
  BIDP3: number;
  BIDP4: number;
  BIDP5: number;
  BIDP6: number;
  BIDP7: number;
  BIDP8: number;
  BIDP9: number;
  BIDP10: number;
  ASKP_RSQN1: number;
  ASKP_RSQN2: number;
  ASKP_RSQN3: number;
  ASKP_RSQN4: number;
  ASKP_RSQN5: number;
  ASKP_RSQN6: number;
  ASKP_RSQN7: number;
  ASKP_RSQN8: number;
  ASKP_RSQN9: number;
  ASKP_RSQN10: number;
  BIDP_RSQN1: number;
  BIDP_RSQN2: number;
  BIDP_RSQN3: number;
  BIDP_RSQN4: number;
  BIDP_RSQN5: number;
  BIDP_RSQN6: number;
  BIDP_RSQN7: number;
  BIDP_RSQN8: number;
  BIDP_RSQN9: number;
  BIDP_RSQN10: number;
  TOTAL_ASKP_RSQN: number;
  TOTAL_BIDP_RSQN: number;
}

interface ITradingData {
  STCK_CNTG_HOUR: number;
  STCK_PRPR: number;
  CNTG_VOL: number;
  ACML_VOL: number;
  CTTR: number;
  CCLD_DVSN: number;
}

interface ISocketStore {
  orderBookData: IOrderBookData | null;
  tradingData: ITradingData[] | null;
  setOrderBookData: (data: IOrderBookData) => void;
  setTradingData: (data: ITradingData[]) => void;
}

const SOCKET_URL = "https://k11a204.p.ssafy.io/api";
const socket = io(`${SOCKET_URL}/ws/stocks/`);

const useSocketStore = create<ISocketStore>((set) => ({
  // orderBookData: null,
  // tradingData: null,
  orderBookData: {
    ASKP1: 2000,
    ASKP2: 2100,
    ASKP3: 2200,
    ASKP4: 2300,
    ASKP5: 2400,
    ASKP6: 2500,
    ASKP7: 2600,
    ASKP8: 2700,
    ASKP9: 2800,
    ASKP10: 2900,
    BIDP1: 1900,
    BIDP2: 1800,
    BIDP3: 1700,
    BIDP4: 1600,
    BIDP5: 1500,
    BIDP6: 1400,
    BIDP7: 1300,
    BIDP8: 1200,
    BIDP9: 1100,
    BIDP10: 1000,
    ASKP_RSQN1: 1,
    ASKP_RSQN2: 2,
    ASKP_RSQN3: 3,
    ASKP_RSQN4: 4,
    ASKP_RSQN5: 5,
    ASKP_RSQN6: 6,
    ASKP_RSQN7: 7,
    ASKP_RSQN8: 8,
    ASKP_RSQN9: 9,
    ASKP_RSQN10: 10,
    BIDP_RSQN1: 1,
    BIDP_RSQN2: 2,
    BIDP_RSQN3: 3,
    BIDP_RSQN4: 4,
    BIDP_RSQN5: 5,
    BIDP_RSQN6: 6,
    BIDP_RSQN7: 7,
    BIDP_RSQN8: 8,
    BIDP_RSQN9: 9,
    BIDP_RSQN10: 10,
    TOTAL_ASKP_RSQN: 55,
    TOTAL_BIDP_RSQN: 55,
  },
  tradingData: [
    {
      STCK_CNTG_HOUR: 111858,
      STCK_PRPR: 2000,
      CNTG_VOL: 10,
      ACML_VOL: 123,
      CTTR: 73.3,
      CCLD_DVSN: 1,
    },
    {
      STCK_CNTG_HOUR: 130105,
      STCK_PRPR: 1900,
      CNTG_VOL: 30,
      ACML_VOL: 153,
      CTTR: 69.84,
      CCLD_DVSN: 5,
    },
    {
      STCK_CNTG_HOUR: 142251,
      STCK_PRPR: 2000,
      CNTG_VOL: 20,
      ACML_VOL: 173,
      CTTR: 71.48,
      CCLD_DVSN: 1,
    },
  ],

  setOrderBookData: (data: IOrderBookData) => set({ orderBookData: data }),
  setTradingData: (data: ITradingData[]) => set({ tradingData: data }),
}));

// 소켓에서 데이터를 수신하여 Zustand 스토어 업데이트
// OrderBook(호가창) 데이터
socket.on("ORDER_BOOK", (data) => {
  useSocketStore.getState().setOrderBookData(data.ORDER_BOOK);
});
// Trading(체결창) 데이터
socket.on("TRADING", (data) => {
  useSocketStore.getState().setTradingData(data.TRADING);
});

export default useSocketStore;
