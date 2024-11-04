export interface IndexEntry {
  time: string;
  value: number;
}

export interface IndexCategory {
  [indexName: string]: IndexEntry[];
}

interface IndexData {
  [category: string]: IndexCategory;
}

export interface IndexState {
  indexData: IndexData | null;
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