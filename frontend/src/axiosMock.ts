import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

const mock = new AxiosMockAdapter(axios);

const BASEURL = "http://localhost:3000/api/v1/";

// home-indicators
const generateIndexData = () => {
  const startDate = new Date("2024-07-01");
  const endDate = new Date("2024-10-30");

  const data = [];

  const currentDate = new Date(startDate);
  let indexValue = 3000;

  while (currentDate <= endDate) {
    const dailyChangeRate = (Math.random() - 0.5) * 0.01;
    indexValue = parseFloat((indexValue * (1 + dailyChangeRate)).toFixed(2));

    data.push({
      time: currentDate.toISOString().split("T")[0],
      value: indexValue,
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }
  return data;
};

const indexData = {
  국내: {
    코스피: generateIndexData(),
    코스닥: generateIndexData(),
  },
  해외: {
    다우존스: generateIndexData(),
    나스닥: generateIndexData(),
  },
  환율: {
    "원/달러": generateIndexData(),
    "엔/달러": generateIndexData(),
  },
  원자재: {
    WTI: generateIndexData(),
    금: generateIndexData(),
  },
};

// TODO : url에는 가급적 소문자 / '-'를 써주세요
mock.onGet(BASEURL + "indexDetail").reply(200, indexData);

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
    created_at: "24/10/08 08:55",
    author: "거래소 공시",
    url: "https://www.google.com", // 실제 URL로 변경 가능
  },
  {
    id: 2,
    title: "삼성전자(주) 연결재무제표기준영업(잠정)실적(공정공시)",
    created_at: "24/10/08 08:45",
    author: "거래소 공시",
    url: "https://www.google.com",
  },
  {
    id: 3,
    title:
      "삼성전자(주) 주식선물 - 주식옵션 3단계 가격제한폭 확대요건 도달(하락)",
    created_at: "24/08/05 14:52",
    author: "거래소 공시",
    url: "https://www.google.com",
  },
  {
    id: 4,
    title:
      "삼성전자(주) 주식선물 - 주식옵션 2단계 가격제한폭 확대요건 도달(하락)",
    created_at: "24/08/05 14:47",
    author: "거래소 공시",
    url: "https://www.google.com",
  },
  {
    id: 5,
    title: "삼성전자(주) 기타 경영사항(자율공시)",
    created_at: "24/07/31 17:08",
    author: "거래소 공시",
    url: "https://www.google.com",
  },
]);

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

// dashboard-chart
const generateStockData = () => {
  const stockPriceData = [];

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

    stockPriceData.push({
      time: currentDate.toISOString().split("T")[0],
      open,
      high,
      low,
      close,
    });

    previousClose = close;
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return stockPriceData;
};

const generateVolumeData = () => {
  const volumeData = [];

  const startDate = new Date("2024-07-01");
  const endDate = new Date("2024-10-30");

  const currentDate = new Date(startDate);
  const minVolume = 1000000;
  const maxVolume = 5000000;

  while (currentDate <= endDate) {
    const volume = Math.floor(
      Math.random() * (maxVolume - minVolume) + minVolume
    );

    volumeData.push({
      time: currentDate.toISOString().split("T")[0],
      value: volume,
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return volumeData;
};

mock.onGet(BASEURL + "stockDetail").reply(200, generateStockData());
mock.onGet(BASEURL + "volumeDetail").reply(200, generateVolumeData());

export default mock;
