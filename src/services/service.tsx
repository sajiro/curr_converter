import { BeaconResponse, ConvertResponse } from "@/models/models";

const BASE_URL = "https://api.currencybeacon.com/v1";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

export const fetchCurrencies = async (): Promise<BeaconResponse> => {
  const response = await fetch(`${BASE_URL}/currencies?api_key=${API_KEY}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const convertCurrency = async (
  from: string,
  to: string,
  amount: number
): Promise<ConvertResponse> => {
  const response = await fetch(
    `${BASE_URL}/convert?api_key=${API_KEY}&from=${from}&to=${to}&amount=${amount}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
