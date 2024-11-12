import { Line } from "react-chartjs-2";
import { IIndicatorCardProps } from "./definitions";
import { useIndexStore } from "../../store/useIndexStore";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const IndicatorChart = ({ indexTypeId, index, color }: IIndicatorCardProps) => {
  const { kospiData, kosdaqData, nasdaqData, djiData, yendollarData, wondollarData, wtiData, goldData } = useIndexStore();

  const indexData = {
    "국내": {
      "코스피": kospiData,
      "코스닥": kosdaqData,
    },
    "해외": {
      "다우존스": djiData,
      "나스닥": nasdaqData,
    },
    "환율": {
      "원/달러": wondollarData,
      "엔/달러": yendollarData,
    },
    "원자재": {
      "WTI": wtiData,
      "금": goldData,
    },
  };

  const indexTypes = ["국내", "해외", "환율", "원자재"];
  const indexList = indexData[indexTypes[indexTypeId]][index].slice(0, 100);
  const indexValues = indexList.map(item => item.bstp_nmix_prpr ? item.bstp_nmix_prpr : item.ovrs_nmix_prpr);

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
