import axios from "axios";
import { create } from "zustand";
import { IScheduledHistoryState, IStandardHistoryState } from "./definitions";

const baseURL = import.meta.env.VITE_LOCAL_BASEURL;

export const useStandardHistoryStore = create<IStandardHistoryState>((set) => ({
  standardHistoryData: null,
  fetchStandardHistoryData: async () => {
    try {
      const response = await axios.get(baseURL + "stocks/history/standard");
      const formattedData = response.data.map((item: any) => ({
        ...item,
        ord_qty: Number(item.ord_qty),
        tot_ccld_qty: Number(item.tot_ccld_qty),
        cncl_cfrm_qty: Number(item.cncl_cfrm_qty),
        rmn_qty: Number(item.rmn_qty),
        ord_unpr: Number(item.ord_unpr),
        avg_prvs: Number(item.avg_prvs),
      }));
      set(() => ({
        standardHistoryData: formattedData,
      }));
    } catch (error) {
      console.log(error)
    }
  },
}));

export const useScheduledHistoryStore = create<IScheduledHistoryState>((set) => ({
  scheduledHistoryData: null,
  fetchScheduledHistoryData: async () => {
    try {
      const response = await axios.get(baseURL + "stocks/history/scheduled");
      set(() => ({
        scheduledHistoryData: response.data,
      }));
    } catch (error) {
      console.log(error)
    }
  },
}));
