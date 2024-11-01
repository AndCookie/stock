import { useEffect, useRef } from "react";
import { createChart, ColorType } from "lightweight-charts";
import { useTotalData } from "./useChartData";
import { COLORS } from "../../common/utils";

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
        tickMarkFormatter: (time: string) => {
          const [year, month, day] = time.split("-");
          return `${year}/${month}/${day}`;
        },
      },
    };

    const chart = createChart(chartContainerRef.current, chartOptions);

    // 주가 캔들 차트
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: COLORS.positive, downColor: COLORS.negative, wickUpColor: COLORS.positive, wickDownColor: COLORS.negative,
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
