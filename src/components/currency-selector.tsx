import { Currency } from "@/models/models";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCurrencyInfoFromArr } from "@/helper";

type Props = {
  label: string;
  selectedCurrency: string | null;
  currencies: Currency[];
  onValueChange: (value: string) => void;
};

function CurrencySelector({
  label,
  selectedCurrency,
  currencies,
  onValueChange,
}: Props): JSX.Element {
  return (
    <div className="mb-4">
      <label
        htmlFor={`${label.toLowerCase()}Currency`}
        className="block text-sm font-normal text-gray-700 text-left mb-1"
      >
        <span className="text-gray-500 mr-2">{label}</span>
        {selectedCurrency &&
          getCurrencyInfoFromArr(selectedCurrency, currencies)?.symbol}
      </label>
      <Select onValueChange={onValueChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select currency" />
        </SelectTrigger>
        <SelectContent>
          {currencies.map((item: Currency) => (
            <SelectItem value={item.short_code} key={item.code + item.id}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default CurrencySelector;
