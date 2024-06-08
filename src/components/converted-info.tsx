import { getCurrencyInfoFromArr } from "@/helper";
import { Currency } from "@/models/models";

type Props = {
  convertedValue: number;
  toCurrency: string;
  currencies: Currency[];
};

function ConvertedInfo({
  convertedValue,
  toCurrency,
  currencies,
}: Props): JSX.Element {
  return (
    <h1 className="text-xl font-bold text-left mt-1 mb-1 flex">
      <span className="text-gray-500 mr-2 ">
        {getCurrencyInfoFromArr(toCurrency, currencies)?.symbol}
      </span>
      <span>{convertedValue !== 0 ? convertedValue : "..."}</span>
    </h1>
  );
}

export default ConvertedInfo;
