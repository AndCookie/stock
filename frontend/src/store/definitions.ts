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