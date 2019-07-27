import { basePath } from "./index";

export async function getSexFilter() {
  return await fetch(basePath + "/filter/sex").then(res =>
    res.json().then(data => data)
  );
}

export async function getProvinceFilter() {
  return await fetch(basePath + "/filter/province").then(res =>
    res.json().then(data => data)
  );
}

export async function getCategoryFilter() {
  return await fetch(basePath + "/filter/category").then(res =>
    res.json().then(data => data)
  );
}

export async function getResultFilter() {
  return await fetch(basePath + "/filter/result").then(res =>
    res.json().then(data => data)
  );
}
