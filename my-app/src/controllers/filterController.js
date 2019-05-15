const basePath = "https://8a8f46a4.ngrok.io";

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
