import { useEffect, useRef } from "react";
import { createChart, ColorType } from "lightweight-charts";
import { IIndicatorCardProps } from "./definitions";
import { useIndexStore } from "../../store/useIndexStore";

const IndicatorChart = ({ indexTypeId, index, color }: IIndicatorCardProps) => {
  const chartContainerRef = useRef(null);

  const { indexData } = useIndexStore();
  const indexTypes = ['국내', '해외', '환율', '원자재'];
  const indexList = indexData![indexTypes[indexTypeId]][index];

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chartOptions = {
      layout: { textColor: "white", background: { type: ColorType.Solid, color: "black" } },
      grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
      },
      crosshair: {
        mode: 2,
      },
      timeScale: {
        visible: false,
      },
      priceScale: {
        visible: false,
      },
    };

    const chart = createChart(chartContainerRef.current, chartOptions);

    const lineSeries = chart.addLineSeries({ color: color });
    console.log(indexList);
    lineSeries.setData(indexList);
    chart.timeScale().fitContent();

    return () => chart.remove();
  }, []);

  return (
    <>
      <div ref={chartContainerRef} style={{ width: "250px", height: "250px" }} />
    </>
  );
};

export default IndicatorChart;