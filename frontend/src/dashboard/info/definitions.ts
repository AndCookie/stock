export interface ICompanyData {
  market: string;
  industry: string;
  companyDetailsLink: string;
  ceo: string;
  marketCap: number;
  description: string;
}

// 필요시에는 뉴스랑 공시 분리할 것
export interface ICompanyNewsDisclosure {
  // HTS 공시 제목 내용
  hts_pbnt_titl_cntt: string;
  // 자료원
  dorg: string;
  // 일자
  data_dt: string;
}
