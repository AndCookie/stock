import { useEffect, useRef } from "react";
import { useFetchIndexData } from "./useIndexData";
import { createChart, ColorType, IChartApi } from "lightweight-charts";
import { IIndexChartProps } from "./definitions";
import { COLORS } from "../common/utils";

const IndexChart = ({ indexType }: IIndexChartProps) => {
  const chartContainerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const indexData = useFetchIndexData(indexType);

  useEffect(() => {
    if (!indexData) return;

    const charts: IChartApi[] = [];

    const chartOptions = {
      layout: { textColor: "white", background: { type: ColorType.Solid, color: "black" } },
      grid: {
        vertLines: { color: "rgba(105, 105, 105, 0.5)" },
        horzLines: { color: "rgba(105, 105, 105, 0.5)" },
      },
      timeScale: {
        tickMarkFormatter: (time: string) => {
          const [year, month, day] = time.split("-");
          return `${year}/${month}/${day}`;
        },
      },
    };

    Object.entries(indexData).forEach((data, i) => {
      if (chartContainerRefs.current[i]) {
        const chart = createChart(chartContainerRefs.current[i], chartOptions)

        const lineSeries = chart.addLineSeries({ color: COLORS.positive });
        lineSeries.setData(data[1]);
        chart.timeScale().fitContent();

        charts.push(chart);
      }
    });

    return () => {
      charts.forEach((chart) => chart.remove());
    };
  }, [indexData]);

  return (
    <>
      {Object.keys(indexData).map((key, i) => (
        <div key={key}>
          <div>{key}</div>
          <div ref={(el) => (chartContainerRefs.current[i] = el)} style={{ width: "500px", height: "500px" }} />
        </div>
      ))}
    </>
  );
};

export default IndexChart;
