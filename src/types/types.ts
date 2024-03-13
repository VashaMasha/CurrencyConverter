export interface ICurrencyItem {
  code: string;
  name: string;
  symbolNative: string;
  flagSrc: string;
}

export interface ICurrencyApiItem {
  code: string;
  name: string;
  symbol_native: string;
}

export interface IConvertValueResponse {
  base: string;
  rates: Record<string, number>;
}

export interface IGetCurrenciesResponse {
  [key: string]: ICurrencyApiItem;
}
