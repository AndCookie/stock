import { useEffect, useRef } from "react";
import { createChart, ColorType } from "lightweight-charts";
import useStockData from "./hooks/useStockData";
import useVolumeData from "./hooks/useVolumeData";
import { COLORS } from "../../common/utils";

const Chart = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const { stockData } = useStockData();
  const { volumeData } = useVolumeData();

  useEffect(() => {
    if (!chartContainerRef.current || !stockData || !volumeData) return;

    const chartOptions = {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: { textColor: "white", background: { type: ColorType.Solid, color: "#252525" } },
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

    const resizeObserver = new ResizeObserver(() => {
      if (chartContainerRef.current) {
        chart.resize(
          chartContainerRef.current.clientWidth,
          chartContainerRef.current.clientHeight
        );
      }
    });

    resizeObserver.observe(chartContainerRef.current);

    // 주가 캔들 차트
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: COLORS.positive, downColor: COLORS.negative, wickUpColor: COLORS.positive, wickDownColor: COLORS.negative,
      borderVisible: false,
    });
    candlestickSeries.setData(stockData);

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

    const volumeDataColored = volumeData.map((data, i) => {
      if (i === 0) {
        return { ...data, color: COLORS.positive };
      }

      const previousVolume = volumeData[i - 1].value;
      const color = data.value > previousVolume ? COLORS.positive : COLORS.negative;

      return { ...data, color };
    });

    histogramSeries.setData(volumeDataColored);

    chart.timeScale().fitContent();

    return () => {
      resizeObserver.disconnect();
      chart.remove();
    };
  }, [stockData, volumeData]);

  return (
    <div
      ref={chartContainerRef}
      style={{ width: "100%", height: "90%", marginTop: "2.5%" }}
      onMouseDown={(event) => {
        event.stopPropagation(); // 클릭 시 드래그 방지
      }}
    />
  );
};

export default Chart;
