import { CountryCode } from "../models/countryCode";

export async function getCountryCode(params) {
  const findParams = {
    name: params.countryName
  };
  return await CountryCode.findOne(findParams);
}
