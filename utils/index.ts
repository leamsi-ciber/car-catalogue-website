import { CarProps, FilterProps } from "@/types";
export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, fuel, limit, model } = filters;

  const headers = {
    "X-RapidAPI-Key": "bd51b957c5msh474524f1fb07f36p11bc9cjsnd0bce0c42395",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };
  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,
    {
      headers: headers,
    }
  );

  const result = await response.json();
  return result;
}

export const calculateCarRent = (
  city_mpg: number,
  year: number,
  currency: string
) => {
  const basePricePerDay = 50; //Base rental price per day in dollars

  const mileageFactor = 0.1; //Aditional rate per mile driven

  const ageFactor = 0.05; // Additional rate per year of vehicle age

  const mileageRate = city_mpg * mileageFactor;

  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  const totalRentalRatePerDay = convertCurrency(currency, rentalRatePerDay);
  return totalRentalRatePerDay;
};

const convertCurrency = (currency: string, totalRentalRatePerDay: number) => {
  const USD = 1;
  const DOP = 54.75;
  const EUR = 0.92;

  switch (currency) {
    case "USD":
      totalRentalRatePerDay *= USD;
      break;
    case "DOP":
      totalRentalRatePerDay *= DOP;
      break;
    case "EUR":
      totalRentalRatePerDay *= EUR;
      break;
    default:
      "currency unavalible";
      break;
  }
  return totalRentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");

  const { make, year, model } = car;

  url.searchParams.append("customer", "hrjavascript-mastery");
  url.searchParams.append("make", make);
  url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("modelYear", `${year}`);
  url.searchParams.append("angle", `${angle}`);
  return `${url}`;
};

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);

  searchParams.set(type, value);
  const newPathName = `${window.location.pathname}?${searchParams.toString()}`;
  return newPathName;
};
