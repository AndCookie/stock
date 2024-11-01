export interface IIndexChartProps {
  indexType: string;
}

export interface IIndexData {
  [key: string]: { time: string; value: number }[];
}