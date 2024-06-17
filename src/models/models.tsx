export type RequestToConvert = {
  converted?: number;
  from: string;
  to: string;
  amount: number;
};

export type Currency = {
  code: string;
  decimal_mark: string;
  id: number;
  name: string;
  precision: number;
  short_code: string;
  subunit: number;
  symbol: string;
  symbol_first: boolean;
  thousands_separator: string;
};

type MetaType = {
  code: number;
  disclaimer: string;
};
export type BeaconResponse = {
  [key: string]: Currency[] | MetaType;
  meta: MetaType;
  response: Currency[];
};

type ResponseType = {
  timestamp: number;
  date: string;
  from: string;
  to: string;
  amount: number;
  value: number;
};

export type ConvertResponse = {
  meta: MetaType;
  response: ResponseType;
  timestamp: number;
  date: string;
  from: string;
  to: string;
  amount: number;
  value: number;
};
