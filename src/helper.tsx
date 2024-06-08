import { Currency } from "./models/models";

export const getCurrencyInfoFromArr = (short_code: string, arr: Currency[]) => {
  return Object.values(arr).find((item) => item.short_code === short_code);
};
