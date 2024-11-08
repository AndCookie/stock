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
  foreignVolume: Array<{
    sell: number;
    buy: number;
  }>;
}

export interface IInvestor {
  date: string;
  foreigner: number;
  corporate: number;
  individual: number;
}
