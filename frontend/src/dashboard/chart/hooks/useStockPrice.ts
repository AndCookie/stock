import { useState, useEffect } from "react";

interface StockPriceData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

// 주가 데이터 생성 함수
const generateStockData = (): StockPriceData[] => {
  const data: StockPriceData[] = [];
  const startDate = new Date("2024-07-01");
  const endDate = new Date("2024-10-30");

  const currentDate = startDate;
  let previousClose = 50000;

  while (currentDate <= endDate) {
    const open = parseFloat((previousClose * (1 + (Math.random() - 0.5) * 0.02)).toFixed(2));
    const high = parseFloat((open * (1 + Math.random() * 0.02)).toFixed(2));
    const low = parseFloat((open * (1 - Math.random() * 0.02)).toFixed(2));
    const close = parseFloat((open * (1 + (Math.random() - 0.5) * 0.02)).toFixed(2));

    data.push({
      time: currentDate.toISOString().split("T")[0],
      open, high, low, close,
    });

    previousClose = close;
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return data;
};

export const useStockPrice = () => {
  const [data, setData] = useState<StockPriceData[]>([]);

  useEffect(() => {
    setData(generateStockData());
  }, []);

  return data;
};
