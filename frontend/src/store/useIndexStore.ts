// src/store/useIndexStore.ts
import axios from "axios";
import { create } from "zustand";
import { IndexState } from "./definitions";

export const useIndexStore = create<IndexState>((set) => ({
  indexData: null,

  fetchIndexData: async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/indexDetail");
      set(() => ({
        indexData: response.data,
      }));
    } catch (error) {
      console.log(error);
    }
  },
}));
