import { client } from "../../index";

export async function insertPlayers(players) {
  if (players instanceof Array) {
    return await Promise.all(players.map(player => insertMatches(player)));
  }
  return await insertMatch(players);
}

export async function insertPlayer(player) {
  await client.index({
    index: "player",
    type: "_doc",
    body: {
      ...player
    }
  });
}
