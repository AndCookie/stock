import { useState, useEffect } from "react";

interface StockPriceData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface VolumeData {
  time: string;
  value: number;
  color?: string;
}

interface TotalData {
  stockPriceData: StockPriceData[];
  volumeData: VolumeData[];
}

// 데이터 생성 함수
const generateData = (): TotalData => {
  const stockPriceData: StockPriceData[] = [];
  const volumeData: VolumeData[] = [];

  const startDate = new Date("2024-07-01");
  const endDate = new Date("2024-10-30");

  const currentDate = new Date(startDate);
  let previousClose = 50000;
  let previousVolume = 1000000;
  const minVolume = 1000000;
  const maxVolume = 5000000;

  while (currentDate <= endDate) {
    // 주가 데이터
    const open = parseFloat((previousClose * (1 + (Math.random() - 0.5) * 0.02)).toFixed(2));
    const high = parseFloat((open * (1 + Math.random() * 0.02)).toFixed(2));
    const low = parseFloat((open * (1 - Math.random() * 0.02)).toFixed(2));
    const close = parseFloat((open * (1 + (Math.random() - 0.5) * 0.02)).toFixed(2));

    stockPriceData.push({
      time: currentDate.toISOString().split("T")[0],
      open,
      high,
      low,
      close,
    });

    // 거래량 데이터
    const volume = Math.floor(Math.random() * (maxVolume - minVolume) + minVolume);
    const color = volume >= previousVolume ? "#872523" : "#334f92";

    volumeData.push({
      time: currentDate.toISOString().split("T")[0],
      value: volume,
      color,
    });

    previousClose = close;
    previousVolume = volume;
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return { stockPriceData, volumeData };
};

export const useTotalData = () => {
  const [data, setData] = useState<TotalData>({ stockPriceData: [], volumeData: [] });

  useEffect(() => {
    setData(generateData());
  }, []);

  return data;
};
