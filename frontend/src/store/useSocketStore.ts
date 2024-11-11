import { create } from "zustand";
import { io } from "socket.io-client";
// interface는 소켓 필요한 데이터 정리 다 되면 나중에 definitions.ts에 옮길게요.

interface IOrderBookData {
  [key: string]: number;
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
    ASKP1: 57300,
    ASKP2: 57200,
    ASKP3: 57100,
    ASKP4: 57000,
    ASKP5: 56900,
    ASKP6: 56800,
    ASKP7: 56700,
    ASKP8: 56600,
    ASKP9: 56500,
    ASKP10: 56400,
    BIDP1: 56600,
    BIDP2: 56500,
    BIDP3: 56400,
    BIDP4: 56300,
    BIDP5: 56200,
    BIDP6: 56100,
    BIDP7: 56000,
    BIDP8: 55900,
    BIDP9: 55800,
    BIDP10: 55700,
    ASKP_RSQN1: 27366,
    ASKP_RSQN2: 60426,
    ASKP_RSQN3: 56285,
    ASKP_RSQN4: 17482,
    ASKP_RSQN5: 7072,
    ASKP_RSQN6: 70074,
    ASKP_RSQN7: 12673,
    ASKP_RSQN8: 9345,
    ASKP_RSQN9: 8623,
    ASKP_RSQN10: 7281,
    BIDP_RSQN1: 230395,
    BIDP_RSQN2: 645355,
    BIDP_RSQN3: 176054,
    BIDP_RSQN4: 123999,
    BIDP_RSQN5: 119252,
    BIDP_RSQN6: 187603,
    BIDP_RSQN7: 155878,
    BIDP_RSQN8: 100543,
    BIDP_RSQN9: 85432,
    BIDP_RSQN10: 65321,
    TOTAL_ASKP_RSQN: 401467,
    TOTAL_BIDP_RSQN: 1700340,
  },
  tradingData: [
    {
      STCK_CNTG_HOUR: 151759,
      STCK_PRPR: 50900,
      CNTG_VOL: 11,
      ACML_VOL: 197895,
      CTTR: 73.3,
      CCLD_DVSN: 5, // 매도
    },
    {
      STCK_CNTG_HOUR: 151755,
      STCK_PRPR: 51000,
      CNTG_VOL: 141,
      ACML_VOL: 197884,
      CTTR: 69.84,
      CCLD_DVSN: 1, // 매수
    },
    {
      STCK_CNTG_HOUR: 151755,
      STCK_PRPR: 51000,
      CNTG_VOL: 5,
      ACML_VOL: 197743,
      CTTR: 71.48,
      CCLD_DVSN: 5, // 매도
    },
    {
      STCK_CNTG_HOUR: 151754,
      STCK_PRPR: 50900,
      CNTG_VOL: 11,
      ACML_VOL: 197738,
      CTTR: 72.4,
      CCLD_DVSN: 1, // 매수
    },
    {
      STCK_CNTG_HOUR: 151749,
      STCK_PRPR: 50900,
      CNTG_VOL: 11,
      ACML_VOL: 197727,
      CTTR: 72.8,
      CCLD_DVSN: 5, // 매도
    },
    {
      STCK_CNTG_HOUR: 151744,
      STCK_PRPR: 51000,
      CNTG_VOL: 6,
      ACML_VOL: 197716,
      CTTR: 70.5,
      CCLD_DVSN: 1, // 매수
    },
    {
      STCK_CNTG_HOUR: 151740,
      STCK_PRPR: 51000,
      CNTG_VOL: 2,
      ACML_VOL: 197710,
      CTTR: 71.1,
      CCLD_DVSN: 5, // 매도
    },
    {
      STCK_CNTG_HOUR: 151739,
      STCK_PRPR: 51000,
      CNTG_VOL: 7,
      ACML_VOL: 197708,
      CTTR: 69.9,
      CCLD_DVSN: 1, // 매수
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
