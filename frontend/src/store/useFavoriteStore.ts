import axios from 'axios';
import { create } from 'zustand';
import { IFavoriteState } from './definitions';

const baseURL = import.meta.env.VITE_LOCAL_BASEURL;

export const useFavoriteStore = create<IFavoriteState>((set) => ({
  favoriteData: null,

  fetchFavoriteData: async () => {
    try {
      const response = await axios.get(`${baseURL}account/favorite`);
      set(() => ({
        favoriteData: response.data,
      }));
    } catch (error) {
      console.log(error);
    }
  },

  postFavoriteData: async (stockCode: string) => {
    try {
      const response = await axios.post(
        `${baseURL}account/favorite`,
        { stock_code: stockCode },
        {
          headers: {
            'Authorization': 'Bearer YOUR_TOKEN_HERE',
          },
        }
      );
      console.log('Success :', response.data)
    } catch (error) {
      console.log(error);
    }
  },

  deleteFavoriteData: async (stockCode: string) => {
    try {
      const response = await axios.delete(`${baseURL}account/favorite`, {
        headers: {
          'Authorization': 'Bearer YOUR_TOKEN_HERE',
        },
        data: {
          stock_code: stockCode,
        },
      });

      console.log('Success :', response.data)
    } catch (error) {
      console.log(error);
    }
  },
}));
