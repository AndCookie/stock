import { useEffect, useRef, useState } from "react";
import { createChart, ISeriesApi, ColorType } from "lightweight-charts";
import { usePastStockStore } from "../../store/usePastStockStore";
// import usePastVolumeData from "./hooks/usePastVolumeData";
// import useSocketStore from "../../store/useSocketStore";
import { COLORS } from "../../common/utils";

const Chart = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  const { pastStockData, fetchPastStockData } = usePastStockStore();
  // const { pastVolumeData } = usePastVolumeData();

  // const { tradingData } = useSocketStore();

  const [chartStockData, setChartStockData] = useState(pastStockData?.map((item) => ({
    time: `${item.stck_bsop_date.slice(0, 4)}-${item.stck_bsop_date.slice(4, 6)}-${item.stck_bsop_date.slice(6, 8)}`,
    open: Number(item.stck_oprc),
    close: Number(item.stck_clpr),
    high: Number(item.stck_hgpr),
    low: Number(item.stck_lwpr),
  })));

  const [selectedPeriodCode, setSelectedPeriodCode] = useState('D');

  useEffect(() => {
    fetchPastStockData("005930", selectedPeriodCode);
  }, [selectedPeriodCode])

  // chartStockData 업데이트
  useEffect(() => {
    // pastStockData 전처리
    const updatedPastStockData = pastStockData?.map((item) => ({
      time: `${item.stck_bsop_date.slice(0, 4)}-${item.stck_bsop_date.slice(4, 6)}-${item.stck_bsop_date.slice(6, 8)}`,
      open: Number(item.stck_oprc),
      close: Number(item.stck_clpr),
      high: Number(item.stck_hgpr),
      low: Number(item.stck_lwpr),
    }));

    setChartStockData(updatedPastStockData);
  }, [pastStockData])

  // 차트 초기화
  useEffect(() => {
    // if (!chartContainerRef.current || !chartStockData || !pastVolumeData) return;
    if (!chartContainerRef.current || !chartStockData) return;

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
    candlestickSeries.setData(chartStockData);

    // 참조 저장
    candlestickSeriesRef.current = candlestickSeries;

    // // 거래량 히스토그램 차트
    // const histogramSeries = chart.addHistogramSeries({
    //   priceScaleId: "volume",
    // });
    // chart.priceScale("volume").applyOptions({
    //   scaleMargins: {
    //     top: 0.9,
    //     bottom: 0,
    //   },
    // });

    // const volumeDataColored = pastVolumeData.map((data, i) => {
    //   if (i === 0) {
    //     return { ...data, color: COLORS.positive };
    //   }

    //   const previousVolume = pastVolumeData[i - 1].value;
    //   const color = data.value > previousVolume ? COLORS.positive : COLORS.negative;

    //   return { ...data, color };
    // });

    // histogramSeries.setData(volumeDataColored);

    chart.timeScale().fitContent();

    return () => {
      resizeObserver.disconnect();
      chart.remove();
    };
  }, [chartStockData]);

  // 금일 주가 업데이트
  // useEffect(() => {
  //   if (!tradingData || !candlestickSeriesRef.current) return ;

  //   const realtimeStockData = chartStockData[chartStockData.length - 1];
  //   realtimeStockData.close = tradingData.STCK_PRPR;
  //   realtimeStockData.high = Math.max(realtimeStockData.high, tradingData.STCK_PRPR);
  //   realtimeStockData.low = Math.min(realtimeStockData.low, tradingData.STCK_PRPR);

  //   candlestickSeriesRef.current.update(realtimeStockData);
  // }, [tradingData, chartStockData])

  return (
    <>
      {["W", "D", "M", "Y"].map((period) => (
        <button key={period} onClick={() => setSelectedPeriodCode(period)}>
          {period}
        </button>
      ))}
      <div
        ref={chartContainerRef}
        style={{ width: "100%", height: "90%", marginTop: "3%" }}
        onMouseDown={(event) => {
          event.stopPropagation(); // 클릭 시 드래그 방지
        }}
      />
    </>
  );
};

export default Chart;
