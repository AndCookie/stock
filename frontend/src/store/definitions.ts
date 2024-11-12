// type of Index
export interface IIndexEntry {
  stck_bsop_date: string;
  bstp_nmix_prpr?: string;
  bstp_nmix_oprc?: string;
  bstp_nmix_hgpr?: string;
  bstp_nmix_lwpr?: string;
  ovrs_nmix_prpr?: string;
  ovrs_nmix_oprc?: string;
  ovrs_nmix_hgpr?: string;
  ovrs_nmix_lwpr?: string;
  acml_vol: string;
  acml_tr_pbmn: string;
  mod_yn: string;
}

export interface IIndexData {
  "국내": {
    "코스피": IIndexEntry[] | null;
    "코스닥": IIndexEntry[] | null;
  };
  "해외": {
    "다우존스": IIndexEntry[] | null;
    "나스닥": IIndexEntry[] | null;
  };
  "환율": {
    "원/달러": IIndexEntry[] | null;
    "엔/달러": IIndexEntry[] | null;
  };
  "원자재": {
    "WTI": IIndexEntry[] | null;
    "금": IIndexEntry[] | null;
  };
}

export interface IIndexState {
  indexData: IIndexData | null;
  fetchIndexData: () => Promise<void>;
}


// type of Balance
export interface IHolding {
  name: string;
  shares: number;
  currentValue: number;
  prevValue: number;
  currentEstimatedValue: number;
  prevEstimatedValue: number;
}

export interface IBalanceData {
  balance: number;
  currentValue: number;
  prevValue: number;
  holdings: IHolding[];
}

export interface IBalanceState {
  balanceData: IBalanceData | null;
  fetchBalanceData: () => Promise<void>;
}

// type of History
export interface IHistoryData {
  date: string;
  name: string;
  status: string;
  shares: number;
  price: number;
}

export interface IHistoryState {
  historyData: IHistoryData[] | null;
  fetchHistoryData: () => Promise<void>;
}

// type of Favorite
export interface IFavoriteData {
  name: string;
  currentValue: number;
  prevValue: number;
}

export interface IFavoriteState {
  favoriteData: IFavoriteData[] | null;
  fetchFavoriteData: () => Promise<void>;
}

// type of Past Stock
export interface IStockData {
  stck_bsop_date: string;
  stck_clpr: string;
  stck_oprc: string;
  stck_hgpr: string;
  stck_lwpr: string;
  cntg_vol: string;
  acml_tr_pbmn: string;
  flng_cls_code: string;
  prtt_rate: string;
  mod_yn: string;
  prdy_vrss_sign: string;
  prdy_vrss: string;
  revl_issu_reas: string;
}

export interface IPastStockState {
  pastStockData: IStockData[] | null;
  fetchPastStockData: (arg0: string, arg1: string) => Promise<void>;
}

// type of Today Stock
export interface ITodayStockData {
  stck_bsop_date: string;
  stck_cntg_hour: string;
  stck_prpr: string;
  stck_oprc: string;
  stck_hgpr: string;
  stck_lwpr: string;
  cntg_vol: string;
  acml_tr_pbmn: string;
}

export interface ITodayStockState {
  minuteStockData: ITodayStockData[] | null;
  fetchMinuteStockData: () => Promise<void>;
}