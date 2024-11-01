export interface IStockData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface IVolumeData {
  time: string;
  value: number;
  color?: string;
}