import axios from 'axios';
import { create } from 'zustand';
import { IFavoriteState } from './definitions';

const baseURL = import.meta.env.VITE_LOCAL_BASEURL;

export const useFavoriteStore = create<IFavoriteState>((set) => ({
  favoriteData: null,

  fetchFavoriteData: async () => {
    try {
      const response = await axios.get(`${baseURL}accounts/favorite-stock/`, {
        headers: {
          Authorization: '32b78c8997dd6bc6c2abb4aa18f18d8ddc023508',
        },
      });
      set(() => ({
        favoriteData: response.data,
      }));
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  },

  postFavoriteData: async (stockCode: string) => {
    try {
      const response = await axios.post(
        `${baseURL}accounts/favorite-stock`,
        { stock_code: stockCode },
        {
          headers: {
            Authorization: '32b78c8997dd6bc6c2abb4aa18f18d8ddc023508',
          },
        }
      );
      console.log('Success :', response.data);
    } catch (error) {
      console.log(error);
    }
  },

  deleteFavoriteData: async (stockCode: string) => {
    try {
      const response = await axios.delete(`${baseURL}accounts/favorite-stock`, {
        headers: {
          Authorization: '32b78c8997dd6bc6c2abb4aa18f18d8ddc023508',
        },
        data: {
          stock_code: stockCode,
        },
      });

      console.log('Success :', response.data);
    } catch (error) {
      console.log(error);
    }
  },
}));
