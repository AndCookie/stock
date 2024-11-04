export interface IDaily {
  date: string;
  price: number;
  change: number;
  rate: number;
  volume: number;
}

export interface IItem {
  company: string;
  amount: number;
  diff: number;
}

export interface ITrader {
  buy: IItem[];
  sell: IItem[];
  // TODO: 외국계 추정 거래량
}

export interface IInvestor {
  date: string;
  foreigner: number;
  corporate: number;
  indiviual: number;
}
