import { client } from "../../index";

export const PLAYER_INDEX = "player";

export async function insertPlayers(players) {
  if (players instanceof Array) {
    return await Promise.all(players.map(player => insertPlayer(player)));
  }
  return await insertPlayer(players);
}

export async function insertPlayer(player) {
  console.log("player to be inserted", player);
  const { id, name, rating, province, sex, age } = player;
  await client.index({
    index: PLAYER_INDEX,
    type: PLAYER_INDEX,
    body: {
      id,
      name,
      rating,
      province,
      sex,
      age
    }
  });
}
