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
  id: number;
  title: string;
  created_at: string; // 날짜 형식이라면 Date
  author: string;
  url: string;
}
