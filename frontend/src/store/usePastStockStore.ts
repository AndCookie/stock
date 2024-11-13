import { create } from "zustand";
import { IPastStockState } from "./definitions";
import axios from "axios";

// const baseURL = import.meta.env.VITE_LOCAL_BASEURL;
const baseURL = "https://k11a204.p.ssafy.io/api/";

export const usePastStockStore = create<IPastStockState>((set) => ({
  pastStockData: null,

  fetchPastStockData: async (stockCode, periodCode) => {
    try {
      const response = await axios.get(baseURL + "stocks/stock-price/", {
        params: {
          stock_code: stockCode,
          period_code: periodCode,
        }
      });
      set(() => ({
        pastStockData: response.data,
      }));
    } catch (error) {
      console.log(error);
    }
  },
}));