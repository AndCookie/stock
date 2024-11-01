import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

const mock = new AxiosMockAdapter(axios);

const BASEURL = "http://localhost:3000/api/v1/";

// dashboard-overview
mock.onGet(BASEURL + "company/1").reply(200, {
  market: "KOSPI",
  industry: "전기전자",
  companyDetailsLink: "기업분석 자세히 보기",
  ceo: "한종희",
  marketCap: "337889700000000",
  description:
    "한국 및 DX부문 해외 9개 지역총괄과 DS부문 해외 5개 지역총괄, SDC, Harman 등 226개의 종속기업으로 구성된 글로벌 전자기업. " +
    "세트사업은 TV를 비롯 모니터, 냉장고, 세탁기, 에어컨, 스마트폰, 네트워크시스템, 컴퓨터 등을 생산하는 DX부문이 있음. " +
    "부품 사업에는 DRAM, NAND Flash, 모바일AP 등의 제품을 생산하고 있는 DS 부문과 스마트폰용 OLED 패널을 생산하고 있는 SDC가 있음.",
});

export default mock;
