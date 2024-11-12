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

// type of Stock
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