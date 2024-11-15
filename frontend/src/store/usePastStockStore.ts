import { create } from "zustand";
import { IPastStockState } from "./definitions";
import axios from "axios";

const baseURL = import.meta.env.VITE_LOCAL_BASEURL;

export const usePastStockStore = create<IPastStockState>((set, get) => ({
  pastStockData: null,
  yesterdayStockData: null,

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

  fetchYesterdayStockData: () => {
    const { pastStockData } = get();

    if (pastStockData) {
      set(() => ({
        yesterdayStockData: pastStockData[pastStockData.length - 2].stck_clpr,
      }));
    }
  },
}));