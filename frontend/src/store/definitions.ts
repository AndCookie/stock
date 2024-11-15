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
  mode: string; // 모드 (프론트에서 처리)
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
  stck_bsop_date: string;
  stck_clpr: string;
  stck_oprc: string;
  stck_hgpr: string;
  stck_lwpr: string;
  acml_vol: string;
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
  yesterdayStockData: string | null;
  fetchPastStockData: (arg0: string, arg1: string) => Promise<void>;
  fetchYesterdayStockData: () => void;
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

// type of Websocket
export interface IIndicatorData {
  prpr_nmix: string;
}

export interface IOrderBookData {
  ASKP1: string;  // 매도호가 1
  ASKP2: string;  // 매도호가 2
  ASKP3: string;  // 매도호가 3
  ASKP4: string;  // 매도호가 4
  ASKP5: string;  // 매도호가 5
  ASKP6: string;  // 매도호가 6
  ASKP7: string;  // 매도호가 7
  ASKP8: string;  // 매도호가 8
  ASKP9: string;  // 매도호가 9
  ASKP10: string;  // 매도호가 10
  BIDP1: string;  // 매수호가 1
  BIDP2: string;  // 매수호가 2
  BIDP3: string;  // 매수호가 3
  BIDP4: string;  // 매수호가 4
  BIDP5: string;  // 매수호가 5
  BIDP6: string;  // 매수호가 6
  BIDP7: string;  // 매수호가 7
  BIDP8: string;  // 매수호가 8
  BIDP9: string;  // 매수호가 9
  BIDP10: string;  // 매수호가 10
  ASKP_RSQN1: string;  // 매도호가 잔량 1
  ASKP_RSQN2: string;  // 매도호가 잔량 2
  ASKP_RSQN3: string;  // 매도호가 잔량 3
  ASKP_RSQN4: string;  // 매도호가 잔량 4
  ASKP_RSQN5: string;  // 매도호가 잔량 5
  ASKP_RSQN6: string;  // 매도호가 잔량 6
  ASKP_RSQN7: string;  // 매도호가 잔량 7
  ASKP_RSQN8: string;  // 매도호가 잔량 8
  ASKP_RSQN9: string;  // 매도호가 잔량 9
  ASKP_RSQN10: string;  // 매도호가 잔량 10
  BIDP_RSQN1: string;  // 매수호가 잔량 1
  BIDP_RSQN2: string;  // 매수호가 잔량 2
  BIDP_RSQN3: string;  // 매수호가 잔량 3
  BIDP_RSQN4: string;  // 매수호가 잔량 4
  BIDP_RSQN5: string;  // 매수호가 잔량 5
  BIDP_RSQN6: string;  // 매수호가 잔량 6
  BIDP_RSQN7: string;  // 매수호가 잔량 7
  BIDP_RSQN8: string;  // 매수호가 잔량 8
  BIDP_RSQN9: string;  // 매수호가 잔량 9
  BIDP_RSQN10: string;  // 매수호가 잔량 10
  TOTAL_ASKP_RSQN: string;  // 총 매도호가 잔량
  TOTAL_BIDP_RSQN: string;  // 총 매수호가 잔량
  [key: string]: string; // 추가하여 동적 키에 대한 타입 허용
}

export interface ITradingData {
  STCK_CNTG_HOUR: string;  // 주식 체결 시간
  STCK_PRPR: string;  // 주식 현재가
  CNTG_VOL: string;  // 체결 거래량
  ACML_VOL: string;  // 누적 거래량
  CTTR: string;  // 체결강도
  CCLD_DVSN: string;  // 체결구분
}

export interface ISocketStore {
  kospiData: IIndicatorData | null;
  kosdaqData: IIndicatorData | null;
  orderBookData: IOrderBookData | null;
  tradingData: ITradingData | null;

  setKospiData: (data: IIndicatorData) => void;
  setKosdaqData: (data: IIndicatorData) => void;
  setOrderBookData: (data: IOrderBookData) => void;
  setTradingData: (data: ITradingData) => void;
}