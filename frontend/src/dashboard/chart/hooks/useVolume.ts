import { useState, useEffect } from "react";

interface VolumeData {
  time: string;
  value: number;
}

// 거래량 데이터 생성 함수
const generateVolumeData = (): VolumeData[] => {
  const data: VolumeData[] = [];
  const startDate = new Date("2024-07-01");
  const endDate = new Date("2024-10-30");

  const currentDate = startDate;
  const minVolume = 1000;
  const maxVolume = 5000;

  while (currentDate <= endDate) {
    const value = Math.floor(Math.random() * (maxVolume - minVolume) + minVolume);

    data.push({
      time: currentDate.toISOString().split("T")[0],
      value,
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return data;
};

export const useVolume = () => {
  const [data, setData] = useState<VolumeData[]>([]);

  useEffect(() => {
    setData(generateVolumeData());
  }, []);

  return data;
};
