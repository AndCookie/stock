import { useState, useEffect } from "react";

interface IIndexData {
  [key: string]: { time: string; value: number }[];
}

// 데이터 생성 함수
const generateData = () => {
  const data = [];
  const startDate = new Date("2021-10-30");
  const endDate = new Date("2024-10-30");

  const currentDate = new Date(startDate);
  let indexValue = 3000;

  while (currentDate <= endDate) {
    const dailyChangeRate = (Math.random() - 0.5) * 0.01;
    indexValue = parseFloat((indexValue * (1 + dailyChangeRate)).toFixed(2));

    data.push({
      time: currentDate.toISOString().split("T")[0],
      value: indexValue,
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return data;
};

export const useIndexData = (index: string) => {
  const [data, setData] = useState<IIndexData>({});

  useEffect(() => {
    if (index === '국내') {
      setData({
        '코스피': generateData(),
        '코스닥': generateData(),
      });
    } else if (index === '해외') {
      setData({
        '다우 산업': generateData(),
        '나스닥 종합': generateData(),
      });
    } else if (index === '환율') {
      setData({
        '원/달러': generateData(),
        '엔/달러': generateData(),
      });
    } else {
      setData({
        'WTI': generateData(),
        '금': generateData(),
      });
    }
  }, [index]);

  return data;
};
