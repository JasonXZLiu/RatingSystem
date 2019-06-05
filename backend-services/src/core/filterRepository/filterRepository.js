import fs from "fs";

export function getJSON() {
  var data = fs.readFileSync(
    "./src/core/filterRepository/filterData.json",
    "utf8"
  );
  return data;
}

export function getSex(params) {
  const data = JSON.parse(getJSON());
  return data.sex;
}

export function getProvince(params) {
  const data = JSON.parse(getJSON());
  return data.province;
}

export function getCategory(params) {
  const data = JSON.parse(getJSON());
  return data.category;
}
