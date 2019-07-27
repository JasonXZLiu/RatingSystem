import { countryCodeData } from "../../setup/countryCodeData.js";
import { CountryCode } from "../schemas/countryCode";

export async function getCountryCode(params) {
  const findParams = {
    name: params.countryName
  };
  return await CountryCode.findOne(findParams).then(data => data.code);
}

const searchByName = (countries, name) => {
  return countries.filter(country => country.name === name);
};

export function getSyncCountryCode(params) {
  return searchByName(countryCodeData, params.countryName);
}
