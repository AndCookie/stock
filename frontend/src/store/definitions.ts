// type of Index
export interface IIndexEntry {
  time: string;
  value: number;
}

export interface IIndexCategory {
  [indexName: string]: IIndexEntry[];
}

interface IIndexData {
  [category: string]: IIndexCategory;
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
export interface IStandardHistoryData {
  odno: string; // 주문번호
  pdno: string; // 종목코드
  prdt_name: string; // 종목명
  sll_buy_dvsn_cd: string; // 구매/판매
  ord_dt: string; // 주문일자
  ord_tmd: string; // 주문시간
  ord_qty: number; // 주문수량
  tot_ccld_qty: number; // 총체결수량
  cncl_cfrm_qty: number; // 취소확인수량
  rmn_qty: number; // 잔여수량
  ord_unpr: number; // 주문단가
  avg_prvs: number; // 체결평균가
}

export interface IStandardHistoryState {
  standardHistoryData: IStandardHistoryData[] | null;
  fetchStandardHistoryData: () => Promise<void>;
}

export interface IScheduledHistoryData{
  pdno: string; // 종목코드
  prdt_name: string; // 종목명
  sll_buy_dvsn_cd: string; // 구매/판매
  ord_qty: number; // 주문수량
  ord_unpr: number; // 주문단가
  tar_pr: number; // 감시가격
}

export interface IScheduledHistoryState {
  scheduledHistoryData: IScheduledHistoryData[] | null;
  fetchScheduledHistoryData: () => Promise<void>;
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
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface IPastStockState {
  pastStockData: IStockData[] | null;
  fetchPastStockData: () => Promise<void>;
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