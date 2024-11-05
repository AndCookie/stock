import axios from "axios";
import { create } from "zustand";
import { IBalanceState } from "./definitions";

const baseURL = import.meta.env.VITE_LOCAL_BASEURL;

export const useBalanceStore = create<IBalanceState>((set) => ({
  balanceData: null,

  fetchBalanceData: async () => {
    try {
      const response = await axios.get(baseURL + "account/balance");
      set(() => ({
        balanceData: response.data,
      }));
    } catch (error) {
      console.log(error);
    }
  },
}));
