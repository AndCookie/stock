import axios from "axios";
import { create } from "zustand";
import { IPastStockState } from "./definitions";

const baseURL = import.meta.env.VITE_LOCAL_BASEURL;

export const usePastStockStore = create<IPastStockState>((set) => ({
  pastStockData: null,

  fetchPastStockData: async () => {
    try {
      const response = await axios.get(baseURL + 'stockDetail');
      set(() => ({
        pastStockData: response.data,
      }));
    } catch (error) {
      console.log(error);
    }
  },
}));