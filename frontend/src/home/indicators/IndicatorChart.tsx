// import { useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import { IIndicatorCardProps } from "./definitions";
import { useIndexStore } from "../../store/useIndexStore";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const IndicatorChart = ({ indexTypeId, index, color }: IIndicatorCardProps) => {
  const { indexData } = useIndexStore();

  const indexTypes = ["국내", "해외", "환율", "원자재"];
  const indexList = indexData![indexTypes[indexTypeId]][index];
  const indexValues = indexList.map(item => item.value);

  const data = {
    labels: indexValues.map((_, i) => i),
    datasets: [
      {
        data: indexValues,
        borderColor: color,
        backgroundColor: "#2b2b2b",
        borderWidth: 1,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default IndicatorChart;
