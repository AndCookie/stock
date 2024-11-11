import axios from "axios";
import { create } from "zustand";
import { IStockState } from "./definitions";

const baseURL = import.meta.env.VITE_LOCAL_BASEURL;

export const useStockStore = create<IStockState>((set) => ({
  stockData: null,

  fetchStockData: async () => {
    try {
      const response = await axios.get(baseURL + 'stockDetail');
      set(() => ({
        stockData: response.data,
      }));
    } catch (error) {
      console.log(error);
    }
  },
}));