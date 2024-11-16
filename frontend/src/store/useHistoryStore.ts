import axios from "axios";
import { create } from "zustand";
import { IScheduledHistoryState, IStandardHistoryState } from "./definitions";
import codeToName from "../assets/codeToName.json";

const baseURL = import.meta.env.VITE_LOCAL_BASEURL;

export const useStandardHistoryStore = create<IStandardHistoryState>((set) => ({
  standardHistoryData: null,
  fetchStandardHistoryData: async () => {
    try {
      const response = await axios.get(baseURL + "stocks/history/standard");
      const formattedData = response.data.map((item: any) => {
        let mode = "";
        if (item.rmn_qty === "0") {
          if (item.ord_qty === item.tot_ccld_qty) {
            mode = "completed";
          } else if (item.ord_qty === item.cncl_cfrm_qty) {
            mode = "cancelled";
          }
        } else {
          mode = "pending";
        }

        const prdt_name = item.pdno && item.pdno in codeToName ? codeToName[item.pdno as keyof typeof codeToName] : "";

        return {
          ...item,
          ord_qty: Number(item.ord_qty),
          tot_ccld_qty: Number(item.tot_ccld_qty),
          cncl_cfrm_qty: Number(item.cncl_cfrm_qty),
          rmn_qty: Number(item.rmn_qty),
          ord_unpr: Number(item.ord_unpr),
          avg_prvs: Number(item.avg_prvs),
          prdt_name, // 종목명 필드 추가
          mode, // mode 필드 추가
        };
      });

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
      const formattedData = response.data.map((item: any) => {
        const prdt_name = item.pdno && item.pdno in codeToName ? codeToName[item.pdno as keyof typeof codeToName] : "";

        return {
          ...item,
          ord_qty: Number(item.ord_qty),
          ord_unpr: Number(item.ord_unpr),
          tar_pr: Number(item.tar_pr),
          prdt_name, // 종목명 필드 추가
        };
      });

      set(() => ({
        scheduledHistoryData: formattedData,
      }));
    } catch (error) {
      console.log(error)
    }
  },
}));
