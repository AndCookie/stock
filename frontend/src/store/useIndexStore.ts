// src/store/useIndexStore.ts
import axios from "axios";
import { create } from "zustand";
import { IndexState } from "./definitions";
const baseURL = import.meta.env.VITE_LOCAL_BASEURL;

export const useIndexStore = create<IndexState>((set) => ({
  indexData: null,

  fetchIndexData: async () => {
    try {
      const response = await axios.get(baseURL + "index-detail");
      set(() => ({
        indexData: response.data,
      }));
    } catch (error) {
      console.log(error);
    }
  },
}));
