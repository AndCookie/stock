import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

const mock = new AxiosMockAdapter(axios);

const BASEURL = "http://localhost:3000/api/v1/";

// home-indicators
const fakeIndexData = () => {
  const startDate = new Date("2024-07-01");
  const endDate = new Date("2024-10-30");

  const fakeData = [];

  const currentDate = new Date(startDate);
  let indexValue = 3000;

  while (currentDate <= endDate) {
    const dailyChangeRate = (Math.random() - 0.5) * 0.01;
    indexValue = parseFloat((indexValue * (1 + dailyChangeRate)).toFixed(2));

    fakeData.push({
      time: currentDate.toISOString().split("T")[0],
      value: indexValue,
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }
  return fakeData;
};

const indexData = {
  국내: {
    코스피: fakeIndexData(),
    코스닥: fakeIndexData(),
  },
  해외: {
    다우존스: fakeIndexData(),
    나스닥: fakeIndexData(),
  },
  환율: {
    "원/달러": fakeIndexData(),
    "엔/달러": fakeIndexData(),
  },
  원자재: {
    WTI: fakeIndexData(),
    금: fakeIndexData(),
  },
};

mock.onGet(BASEURL + "index-detail").reply(200, indexData);

// home-aiNews
mock.onGet(BASEURL + "ai-news").reply(200, [
  {
    id: 1,
    title: "뉴스 타이틀",
    image:
      "https://img.freepik.com/free-photo/high-angle-kids-holding-hands_23-2149548011.jpg",
    author: "기자이름",
    description: "뉴스기사내용입니다.뉴스기사내용입니다.뉴스기사내용입니다.",
  },
  {
    id: 2,
    title: "뉴스 타이틀2",
    image:
      "https://img.freepik.com/free-photo/high-angle-kids-holding-hands_23-2149548011.jpg",
    author: "기자이름",
    description: "뉴스기사내용입니다.뉴스기사내용입니다.뉴스기사내용입니다.",
  },
  {
    id: 3,
    title: "뉴스 타이틀3",
    image:
      "https://img.freepik.com/free-photo/high-angle-kids-holding-hands_23-2149548011.jpg",
    author: "기자이름",
    description: "뉴스기사내용입니다.뉴스기사내용입니다.뉴스기사내용입니다.",
  },
]);

// home-account-balance
mock.onGet(BASEURL + "account/balance").reply(200, {
  balance: 1400,
  currentValue: 982859,
  prevValue: 999496,
  holdings: [
    {
      name: "피엔티",
      shares: 19,
      currentValue: 52300,
      prevValue: 71456,
      currentEstimatedValue: 978344,
      prevEstimatedValue: 969617,
    },
    {
      name: "로블록스",
      shares: 0.01563,
      currentValue: 60726,
      prevValue: 59593,
      currentEstimatedValue: 52901,
      prevEstimatedValue: 54035,
    },
    {
      name: "메타",
      shares: 0.004605,
      currentValue: 791579,
      prevValue: 817746,
      currentEstimatedValue: 3614,
      prevEstimatedValue: 3495,
    },
  ],
});

// home-account-history 일반주문
mock.onGet(BASEURL + "stocks/history/standard").reply(200, [
  { // 체결 지정가 매수
    odno: "0001569139", // 주문번호
    pdno: "009150", // 종목코드
    prdt_name: "삼성전기", // 종목명
    sll_buy_dvsn_cd: "BUY", // 구매/판매
    ord_dt: "20240101", // 주문일자
    ord_tmd: "131438", // 주문시간
    ord_qty: "90", // 주문수량
    tot_ccld_qty: "90", // 총체결수량
    cncl_cfrm_qty: "0", // 취소확인수량
    rmn_qty: "0", // 잔여수량
    ord_unpr: "140000", // 주문단가
    avg_prvs: "140000", // 체결평균가
  },
  { // 체결 시장가 매수
    odno: "0001569140",
    pdno: "009150",
    prdt_name: "삼성전기",
    sll_buy_dvsn_cd: "BUY",
    ord_dt: "20240101",
    ord_tmd: "142042",
    ord_qty: "50",
    tot_ccld_qty: "50",
    cncl_cfrm_qty: "0",
    rmn_qty: "0",
    ord_unpr: "0",
    avg_prvs: "150000", // 참고 시장가가 150500일 때 25주, 시장가가 149500일 때 25주 체결되면 평단이 150000임
  },
  { // 체결 지정가 매도
    odno: "0001569141",
    pdno: "009150",
    prdt_name: "삼성전기",
    sll_buy_dvsn_cd: "SELL",
    ord_dt: "20240201",
    ord_tmd: "100128",
    ord_qty: "60",
    tot_ccld_qty: "60",
    cncl_cfrm_qty: "0",
    rmn_qty: "0",
    ord_unpr: "170000",
    avg_prvs: "170000",
  },
  { // 체결 시장가 매도
    odno: "0001569142",
    pdno: "009150",
    prdt_name: "삼성전기",
    sll_buy_dvsn_cd: "SELL",
    ord_dt: "20240301",
    ord_tmd: "093850",
    ord_qty: "80",
    tot_ccld_qty: "80",
    cncl_cfrm_qty: "0",
    rmn_qty: "0",
    ord_unpr: "0",
    avg_prvs: "160000",
  },
  { // 취소
    odno: "0001569143",
    pdno: "009150",
    prdt_name: "삼성전기",
    sll_buy_dvsn_cd: "BUY",
    ord_dt: "20241010",
    ord_tmd: "130303",
    ord_qty: "80",
    tot_ccld_qty: "0",
    cncl_cfrm_qty: "80",
    rmn_qty: "0",
    ord_unpr: "0",
    avg_prvs: "180000",
  },
  { // 미체결
    odno: "0001569144",
    pdno: "009150",
    prdt_name: "삼성전기",
    sll_buy_dvsn_cd: "BUY",
    ord_dt: "20241010",
    ord_tmd: "130504",
    ord_qty: "80",
    tot_ccld_qty: "40",
    cncl_cfrm_qty: "0",
    rmn_qty: "40",
    ord_unpr: "0",
    avg_prvs: "180000",
  },
]);

// home-account-history 조건주문
mock.onGet(BASEURL + "stocks/history/scheduled").reply(200, [
  { // 지정가 조건주문
    pdno: "009150", // 종목코드
    prdt_name: "삼성전기", // 종목명
    sll_buy_dvsn_cd: "SELL", // 구매/판매
    ord_qty: "200", // 주문수량
    ord_unpr: "120000", // 주문단가
    tar_pr: "120000", // 감시가격
  },
  { // 시장가 조건주문
    pdno: "009150",
    prdt_name: "삼성전기",
    sll_buy_dvsn_cd: "SELL",
    ord_qty: "100",
    ord_unpr: "0",
    tar_pr: "130000",
  },
]);

// home-account-favorites
mock.onGet(BASEURL + "account/favorite").reply(200, [
  { name: "시보드", currentValue: 4108934, prevValue: 4108934 },
  { name: "삼성전자", currentValue: 56100, prevValue: 56600 },
  { name: "카카오", currentValue: 36550, prevValue: 37450 },
  { name: "테슬라", currentValue: 356583, prevValue: 359592 },
  { name: "쿠팡", currentValue: 35354, prevValue: 35354 },
  { name: "메타", currentValue: 784814, prevValue: 783820 },
  { name: "로블록스", currentValue: 57677, prevValue: 57677 },
  { name: "넷플릭스", currentValue: 1039668, prevValue: 1040648 },
  { name: "애플", currentValue: 316962, prevValue: 314941 },
]);

// dashboard-info-overview
mock.onGet(BASEURL + "info/1").reply(200, {
  market: "KOSPI",
  industry: "전기전자",
  companyDetailsLink: "기업분석 자세히 보기",
  ceo: "한종희",
  marketCap: 3378897,
  description:
    "한국 및 DX부문 해외 9개 지역총괄과 DS부문 해외 5개 지역총괄, SDC, Harman 등 226개의 종속기업으로 구성된 글로벌 전자기업. " +
    "세트사업은 TV를 비롯 모니터, 냉장고, 세탁기, 에어컨, 스마트폰, 네트워크시스템, 컴퓨터 등을 생산하는 DX부문이 있음. " +
    "부품 사업에는 DRAM, NAND Flash, 모바일AP 등의 제품을 생산하고 있는 DS 부문과 스마트폰용 OLED 패널을 생산하고 있는 SDC가 있음.",
});

// dashboard-info-news
mock.onGet(BASEURL + "info/1/news").reply(200, [
  {
    id: 1,
    title: "외국인, 34거래일만에 삼성전자 샀다... 3%대 강세",
    created_at: "2024-10-31",
    author: "이데일리",
    url: "https://www.google.com",
  },
  {
    id: 2,
    title: "오늘의 인기검색 20종목",
    created_at: "2024-10-30",
    author: "인포스탁",
    url: "https://www.google.com",
  },
  {
    id: 3,
    title: "코스피, 기관, 금투 순매수에 2600 회복",
    created_at: "2024-10-29",
    author: "파이낸셜뉴스",
    url: "https://www.google.com",
  },
  {
    id: 4,
    title:
      "인텔, AI PC 위한 '울트라 프로세서'출시 ... 삼성?LG와 AI 생태계 확장",
    created_at: "2024-10-28",
    author: "이투데이",
    url: "https://www.google.com",
  },
  {
    id: 5,
    title: "외국계 순매수,도 상위종목(코스피) 금액기준",
    created_at: "2024-10-27",
    author: "인포스탁",
    url: "https://www.google.com",
  },
]);

// dashboard-info-disclosure
mock.onGet(BASEURL + "info/1/disclosure").reply(200, [
  {
    id: 1,
    title: "삼성전자(주) 기업설명회(IR) 개최(안내공시)",
    created_at: "2024-10-08 08:55:00",
    author: "거래소 공시",
    url: "https://www.google.com", // 실제 URL로 변경 가능
  },
  {
    id: 2,
    title: "삼성전자(주) 연결재무제표기준영업(잠정)실적(공정공시)",
    created_at: "2024-10-08 08:45",
    author: "거래소 공시",
    url: "https://www.google.com",
  },
  {
    id: 3,
    title:
      "삼성전자(주) 주식선물 - 주식옵션 3단계 가격제한폭 확대요건 도달(하락)",
    created_at: "2024-08-05 14:52",
    author: "거래소 공시",
    url: "https://www.google.com",
  },
  {
    id: 4,
    title:
      "삼성전자(주) 주식선물 - 주식옵션 2단계 가격제한폭 확대요건 도달(하락)",
    created_at: "2024-08-05 14:47",
    author: "거래소 공시",
    url: "https://www.google.com",
  },
  {
    id: 5,
    title: "삼성전자(주) 기타 경영사항(자율공시)",
    created_at: "2024-07-31 17:08",
    author: "거래소 공시",
    url: "https://www.google.com",
  },
]);

// dashboard-chart
const fakeStockData = () => {
  const fakeData = [];

  const startDate = new Date("2024-07-01");
  const endDate = new Date("2024-10-30");

  const currentDate = new Date(startDate);
  let previousClose = 50000;

  while (currentDate <= endDate) {
    const open = parseFloat(
      (previousClose * (1 + (Math.random() - 0.5) * 0.02)).toFixed(2)
    );
    const high = parseFloat((open * (1 + Math.random() * 0.02)).toFixed(2));
    const low = parseFloat((open * (1 - Math.random() * 0.02)).toFixed(2));
    const close = parseFloat(
      (open * (1 + (Math.random() - 0.5) * 0.02)).toFixed(2)
    );

    fakeData.push({
      time: currentDate.toISOString().split("T")[0],
      open,
      high,
      low,
      close,
    });

    previousClose = close;
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return fakeData;
};

const fakeVolumeData = () => {
  const fakeData = [];

  const startDate = new Date("2024-07-01");
  const endDate = new Date("2024-10-30");

  const currentDate = new Date(startDate);
  const minVolume = 1000000;
  const maxVolume = 5000000;

  while (currentDate <= endDate) {
    const volume = Math.floor(
      Math.random() * (maxVolume - minVolume) + minVolume
    );

    fakeData.push({
      time: currentDate.toISOString().split("T")[0],
      value: volume,
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return fakeData;
};

mock.onGet(BASEURL + "stockDetail").reply(200, fakeStockData());
mock.onGet(BASEURL + "volumeDetail").reply(200, fakeVolumeData());

// dashboard-chart
const fakeMinuteData = () => {
  const now = new Date();

  const formatDate = (date: Date) => `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}`;

  const today = formatDate(now);

  const fakeTimeSeries = (startHour: number, endHour: number) => {
    const timeSeries: string[] = [];
    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute++) {
        if (hour === endHour && minute === 0) break;
        timeSeries.push(`${hour.toString().padStart(2, "0")}${minute.toString().padStart(2, "0")}00`
        );
      }
    }
    return timeSeries;
  };

  const timeSeries = fakeTimeSeries(9, 11);

  const randomStockPrice = () => parseFloat((50000 * (1 + (Math.random() - 0.5) * 0.02)).toFixed(2));
  const randomVolume = () => Math.floor(Math.random() * 200000);
  const randomTotalPrice = () => Math.floor(Math.random() * 10000000000);

  const fakeData = timeSeries.map((time) => {
    const openPrice = randomStockPrice();
    const closePrice = randomStockPrice();
    const highPrice = Math.max(openPrice, closePrice) + randomStockPrice() % 50;
    const lowPrice = Math.min(openPrice, closePrice) - randomStockPrice() % 50;

    return {
      stck_bsop_date: today,
      stck_cntg_hour: time,
      stck_prpr: closePrice,
      stck_oprc: openPrice,
      stck_hgpr: highPrice,
      stck_lwpr: lowPrice,
      cntg_vol: randomVolume(),
      acml_tr_pbmn: randomTotalPrice(),
    };
  });

  return fakeData;
};

mock.onGet(BASEURL + "stocks/minute-price/").reply(200, fakeMinuteData());

// dashboard-tradingTrend-daily
const fakeDailyData = () => {
  const data = [];
  const today = new Date();

  for (let i = 0; i < 30; i++) {
    // 일자: 오늘부터 i일 전
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    // 가짜 데이터 생성
    const fakeData = {
      date: date.toISOString().split("T")[0], // YYYY-MM-DD 형식으로 변환
      price: Math.round(1000 + Math.random() * 500), // 주가: 1000 ~ 1500 사이 랜덤값
      change: Math.round(-10 + Math.random() * 20), // 대비: -10 ~ 10 사이 랜덤값
      rate: parseFloat((Math.random() * 2 - 1).toFixed(2)), // 등락률: -1.00 ~ 1.00 사이 랜덤값
      volume: Math.floor(10000 + Math.random() * 5000), // 거래량: 10000 ~ 15000 사이 랜덤값
    };

    data.push(fakeData);
  }

  return data;
};

mock.onGet(BASEURL + "trend/1/daily").reply(200, fakeDailyData());

// dashboad-tradingTrend-trader
mock.onGet(BASEURL + "trend/1/trader").reply(200, {
  sell: [
    {
      company: "미래에셋",
      amount: 4384406,
      diff: 34364,
    },
    {
      company: "키움증권",
      amount: 3283549,
      diff: 80707,
    },
    {
      company: "LS증권",
      amount: 2218356,
      diff: 2550,
    },
    {
      company: "BNK증권",
      amount: 2142288,
      diff: 224,
    },
    {
      company: "KB증권",
      amount: 2114131,
      diff: 50359,
    },
  ],
  buy: [
    {
      company: "미래에셋",
      amount: 5133436,
      diff: 224364,
    },
    {
      company: "LS증권",
      amount: 3351748,
      diff: 1865,
    },
    {
      company: "BNK증권",
      amount: 2171911,
      diff: 25647,
    },
    {
      company: "한국증권",
      amount: 1932250,
      diff: 52928,
    },
    {
      company: "신한증권",
      amount: 1840511,
      diff: 1840511,
    },
  ],
  foreignVolume: [
    {
      sell: 405832,
      buy: 161328,
    }
  ],
});

const fakeInvestorData = () => {
  const data = [];
  const today = new Date();

  for (let i = 0; i < 30; i++) {
    // 일자: 오늘부터 i일 전
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    // 가짜 데이터 생성
    const fakeData = {
      date: date.toISOString().split("T")[0], // YYYY-MM-DD 형식으로 변환
      foreigner: Math.round(-10000 + Math.random() * 20000),
      corporate: Math.round(-10000 + Math.random() * 20000),
      individual: Math.round(-10000 + Math.random() * 20000),
    };

    data.push(fakeData);
  }
  return data;
};

// dashboard-tradingTrend-investor
mock.onGet(BASEURL + "trend/1/investor").reply(200, fakeInvestorData());

mock
  .onPost(BASEURL + "chatbot/message")
  .reply(200, { message: "지피티의 답변~~" });

mock.onGet(BASEURL + "search").reply(200, {
  companyId: 12345,
});

export default mock;

// dashboard-trading-order
mock.onPost(BASEURL + "stocks/order/").reply(config => {
  const orderData = JSON.parse(config.data);
  return [200, { message: "Order placed successfully", orderData }]
})
