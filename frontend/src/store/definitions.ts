export interface IndexEntry {
  value: number;
  date: string;
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