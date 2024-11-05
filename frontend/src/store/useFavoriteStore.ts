import axios from "axios";
import { create } from "zustand";
import { IFavoriteState } from "./definitions";

const baseURL = import.meta.env.VITE_LOCAL_BASEURL;

export const useFavoriteStore = create<IFavoriteState>((set) => ({
  favoriteData: null,

  fetchFavoriteData: async () => {
    try {
      const response = await axios.get(baseURL + "account/favorite");
      set(() => ({
        favoriteData: response.data,
      }));
    } catch (error) {
      console.log(error);
    }
  },
}));
