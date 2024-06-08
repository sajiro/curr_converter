import { useMutation, useQuery } from "@tanstack/react-query";
import { convertCurrency, fetchCurrencies } from "@/services/service";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Currency, RequestToConvert } from "@/models/models";
import LoadingSpinner from "@/components/spinner";
import CurrencySelector from "@/components/currency-selector";
import { currencyToFromMap } from "@/constants";
import ConvertedInfo from "@/components/converted-info";

function Converter(): JSX.Element {
  const queryCurrencies = useQuery({
    queryKey: ["currencies"],
    queryFn: () => fetchCurrencies(),
  });

  const convertMutation = useMutation({
    mutationFn: (item: RequestToConvert) =>
      convertCurrency(item.from, item.to, item.amount),
    onSuccess: (data) => {
      setConvertedValue(data.value);
    },
  });

  const [inputValue, setInputValue] = useState<number>(0);
  const [toCurrency, setToCurrency] = useState<string>();
  const [fromCurrency, setFromCurrency] = useState<string>();
  const [convertedValue, setConvertedValue] = useState(0);
  const currencies: Currency[] = queryCurrencies?.data?.response ?? [];

  const onClickHandler = () => {
    if (!toCurrency || !fromCurrency) return;
    convertMutation.mutate({
      to: toCurrency,
      from: fromCurrency,
      amount: inputValue,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(parseFloat(value));
  };

  if (queryCurrencies.isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Currency Converter
      </h1>
      <div className="mb-4">
        <label
          htmlFor="amount"
          className="block text-sm font-normal text-gray-700 text-left"
        >
          Amount
        </label>
        <Input
          id="amount"
          type="text"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter amount"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
      {currencyToFromMap.map(({ label, isFrom }, idx) => (
        <CurrencySelector
          key={idx + label}
          label={label}
          selectedCurrency={(isFrom ? fromCurrency : toCurrency) ?? ""}
          currencies={currencies}
          onValueChange={(value) => {
            isFrom ? setFromCurrency(value) : setToCurrency(value);
            setConvertedValue(0);
          }}
        />
      ))}

      <div className="border bg-top border-gray-200 p-3 rounded">
        {convertMutation.isPending ? (
          <LoadingSpinner />
        ) : (
          <ConvertedInfo
            convertedValue={convertedValue}
            toCurrency={toCurrency ?? ""}
            currencies={currencies}
          />
        )}
      </div>
      <div className="mb-4 text-right mt-4">
        <Button
          className=""
          onClick={onClickHandler}
          disabled={!toCurrency || !fromCurrency}
        >
          Convert
        </Button>
      </div>
    </div>
  );
}

export default Converter;
