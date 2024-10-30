import { useEffect, useRef } from "react";
import { createChart, ColorType } from "lightweight-charts";
import { useTotalData } from "./hooks/useChartData";

const Chart = () => {
  const chartContainerRef = useRef(null);
  const totalData = useTotalData();

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chartOptions = {
      layout: { textColor: "white", background: { type: ColorType.Solid, color: "black" } },
      grid: {
        vertLines: { color: "rgba(105, 105, 105, 0.5)" },
        horzLines: { color: "rgba(105, 105, 105, 0.5)" },
      },
      crosshair: {
        mode: 0,
      },
      timeScale: {
        timeVisible: true,
        borderColor: "dimgray",
        tickMarkFormatter: (time: string) => {
          const date = new Date(time);
          const year = date.getFullYear();
          const month = (date.getMonth() + 1).toString().padStart(2, "0");
          const day = date.getDay().toString().padStart(2, "0");
          return `${year}/${month}/${day}`;
        },
      },
    };

    const chart = createChart(chartContainerRef.current, chartOptions);

    // 주가 캔들 차트
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "#ef2d21", downColor: "#4881ff", wickUpColor: "#ef2d21", wickDownColor: "#4881ff",
      borderVisible: false,
    });
    candlestickSeries.setData(totalData.stockPriceData);

    // 거래량 히스토그램 차트
    const histogramSeries = chart.addHistogramSeries({
      priceScaleId: "volume",
    });
    chart.priceScale("volume").applyOptions({
      scaleMargins: {
        top: 0.9,
        bottom: 0,
      },
    });

    histogramSeries.setData(totalData.volumeData);

    chart.timeScale().fitContent();

    return () => chart.remove();
  }, [totalData]);

  return (
    <div ref={chartContainerRef} style={{ width: "1000px", height: "500px" }} />
  );
};

export default Chart;
