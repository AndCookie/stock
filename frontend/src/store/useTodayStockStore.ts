import axios from "axios";
import { create } from "zustand";
import { ITodayStockState } from "./definitions";

const baseURL = import.meta.env.VITE_LOCAL_BASEURL;

export const useTodayStockStore = create<ITodayStockState>((set) => ({
  // 금일 주식 분봉 데이터
  minuteStockData: null,

  fetchMinuteStockData: async () => {
    try {
      const response = await axios.get(baseURL + "stocks/minute-price/");
      set(() => ({
        minuteStockData: response.data,
      }));
    } catch (error) {
      console.log(error);
    }
  },
}));