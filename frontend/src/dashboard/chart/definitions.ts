export interface IStockPriceData {
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

export interface ITotalData {
  stockPriceData: IStockPriceData[];
  volumeData: IVolumeData[];
}