import fs from "fs";

export function getJSON() {
  var data = fs.readFileSync(
    "./src/core/countryRepository/countryData.json",
    "utf8"
  );
  return data;
}

const searchByName = (countries, name) => {
  return countries.filter(country => country.name === name);
};

export function getCountryCode(params) {
  const data = JSON.parse(getJSON());
  return searchByName(data.countries, params.countryName);
}
