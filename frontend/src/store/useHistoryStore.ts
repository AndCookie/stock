import axios from "axios";
import { create } from "zustand";
import { IHistoryState } from "./definitions";

const baseURL = import.meta.env.VITE_LOCAL_BASEURL;

export const useHistoryStore = create<IHistoryState>((set) => ({
  historyData: null,

  fetchHistoryData: async () => {
    try {
      const response = await axios.get(baseURL + "account/history");
      set(() => ({
        historyData: response.data,
      }));
    } catch (error) {
      console.log(error);
    }
  },
}));
