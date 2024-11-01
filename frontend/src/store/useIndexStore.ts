import axios from "axios";
import { create } from "zustand";

export const useIndexStore = create((set) => ({
  indexData: {},

  fetchIndexData: async (indexType: string) => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/indexDetail", {
        params: {
          indexType: indexType,
        },
      });

      set(() => ({
        indexData: response.data,
      }));
    } catch (error) {
      console.log(error);
    }
  },
}));
