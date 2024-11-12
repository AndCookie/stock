import { create } from "zustand";
import { IIndexState } from "./definitions";
import axios from "axios";

// const baseURL = import.meta.env.VITE_LOCAL_BASEURL;
const baseURL = "https://k11a204.p.ssafy.io/api/";

export const useIndexStore = create<IIndexState>((set) => ({
  kospiData: null,
  kosdaqData: null,
  nasdaqData: null,
  sp500Data: null,
  djiData: null,
  yendollarData: null,
  wondollarData: null,
  wtiData: null,
  goldData: null,

  fetchIndexData: async () => {
    try {
      const kospiRequest = axios.get(baseURL + "stocks/kospi/");
      const kosdaqRequest = axios.get(baseURL + "stocks/kosdaq/");
      const nasdaqRequest = axios.get(baseURL + "stocks/nasdaq/");
      const sp500Request = axios.get(baseURL + "stocks/sp500/");
      const djiRequest = axios.get(baseURL + "stocks/dji/");
      const yendollarRequest = axios.get(baseURL + "stocks/yen-dollar/");
      const wondollarRequest = axios.get(baseURL + "stocks/won-dollar/");
      const wtiRequest = axios.get(baseURL + "stocks/wti/");
      const goldRequest = axios.get(baseURL + "stocks/gold/");
      const [ kospiResponse, kosdaqResponse, nasdaqResponse, sp500Response, djiResponse, yendollarResponse, wondollarResponse, wtiResponse, goldResponse ] = await Promise.all([ kospiRequest, kosdaqRequest, nasdaqRequest, sp500Request, djiRequest, yendollarRequest, wondollarRequest, wtiRequest, goldRequest ]);
      
      set(() => ({ kospiData: kospiResponse.data }));
      set(() => ({ kosdaqData: kosdaqResponse.data }));
      set(() => ({ nasdaqData: nasdaqResponse.data }));
      set(() => ({ sp500Data: sp500Response.data }));
      set(() => ({ djiData: djiResponse.data }));
      set(() => ({ yendollarData: yendollarResponse.data }));
      set(() => ({ wondollarData: wondollarResponse.data }));
      set(() => ({ wtiData: wtiResponse.data }));
      set(() => ({ goldData: goldResponse.data }));
    } catch (error) {
      console.log(error);
    }
  },
}));
