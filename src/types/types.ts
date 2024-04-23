export interface ICurrencyItem {
  id: string;
  name: string;
  symbol: string;
  values: {
    USD: {
      price: number;
    };
  };
}

export interface IGetCurrenciesResponse {
  [key: string]: ICurrencyItem;
}

export enum SortType {
  PositiveRank = 'rank',
  NegativeRank = '-rank',
  PositivePrice = 'price',
  NegativePrice = '-price',
}
