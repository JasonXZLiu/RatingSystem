import { client } from "../../index";

export async function insertMatches(matches) {
  if (matches instanceof Array) {
    return await Promise.all(matches.map(match => insertMatches(match)));
  }
  return await insertMatch(matches);
}

export async function insertMatch(match) {
  await client.index({
    index: "match",
    type: "_doc",
    body: {
      ...match
    }
  });
}
