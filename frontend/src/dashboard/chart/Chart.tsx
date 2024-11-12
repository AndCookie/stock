import { useEffect, useRef, useState } from "react";
import { createChart, ISeriesApi, ColorType } from "lightweight-charts";
import { useStockStore } from "../../store/useStockStore";
import useVolumeData from "./hooks/useVolumeData";
import useMinuteData from "./hooks/useMinuteData";
import useSocketStore from "../../store/useSocketStore";
import { COLORS } from "../../common/utils";
import { IStockData } from "../../store/definitions";

const Chart = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  const { stockData } = useStockStore();
  const { volumeData } = useVolumeData();

  const { minuteData } = useMinuteData();
  const { tradingData } = useSocketStore();

  const [updatedStockData, setUpdatedStockData] = useState<IStockData[]>(stockData || []);

  // 차트 데이터 초기화
  useEffect(() => {
    if (!stockData || minuteData.length === 0) return;
    
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    
    const openPrice = minuteData[0].stck_oprc;
    const closePrice = minuteData[minuteData.length - 1].stck_prpr;
    
    let highPrice = minuteData[0].stck_hgpr;
    let lowPrice = minuteData[0].stck_lwpr;
    
    minuteData.forEach((data) => {
      if (data.stck_hgpr > highPrice) {
        highPrice = data.stck_hgpr;
      }
      if (data.stck_lwpr < lowPrice) {
        lowPrice = data.stck_lwpr;
      }
    });
    
    setUpdatedStockData(stockData);
    setUpdatedStockData((prev) =>
      [...prev,
      {
        time: `${year}-${month}-${day}`,
        open: parseFloat(openPrice),
        high: parseFloat(highPrice),
        low: parseFloat(lowPrice),
        close: parseFloat(closePrice),
      }]);
  }, [stockData, minuteData])

  // 차트 초기화
  useEffect(() => {
    if (!chartContainerRef.current || !updatedStockData || !volumeData) return;

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
    candlestickSeries.setData(updatedStockData);

    // 참조 저장
    candlestickSeriesRef.current = candlestickSeries;

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
  }, [updatedStockData, volumeData]);

  useEffect(() => {
    if (!tradingData || !candlestickSeriesRef.current) return ;

    const realtimeStockData = updatedStockData[updatedStockData.length - 1];
    realtimeStockData.close = tradingData.STCK_PRPR;
    realtimeStockData.high = Math.max(realtimeStockData.high, tradingData.STCK_PRPR);
    realtimeStockData.low = Math.min(realtimeStockData.low, tradingData.STCK_PRPR);

    candlestickSeriesRef.current.update(realtimeStockData);
  }, [tradingData])

  return (
    <div
      ref={chartContainerRef}
      style={{ width: "100%", height: "90%", marginTop: "3%" }}
      onMouseDown={(event) => {
        event.stopPropagation(); // 클릭 시 드래그 방지
      }}
    />
  );
};

export default Chart;
