const basePath = "https://8a8f46a4.ngrok.io";

export async function getPlayers() {
  return await fetch(basePath + "/players").then(res =>
    res.json().then(data => data)
  );
}

export async function getRatings() {
  return await fetch(basePath + "/ratings").then(res =>
    res.json().then(data => data)
  );
}
