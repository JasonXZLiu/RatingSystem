import { Player } from "../models/player";

export async function getPlayers() {
  return await Player.find();
}

export async function getPlayer(params) {
  return await Player.findOne(params);
}

export async function getPlayerById(params) {
  const findParams = {
    id: params.playerId
  };
  return await Player.findOne(findParams);
}

export async function getRatings(params) {
  let findParams = {};
  if (params) {
    if (params.searchValue !== "undefined")
      findParams.name = {
        $regex: params.searchValue,
        $options: "mi"
      };
    if (params.sexValue !== "undefined") findParams.sex = params.sexValue;
    if (params.provinceValue !== "undefined")
      findParams.province = params.provinceValue;
    if (params.categoryValue !== "undefined")
      findParams.$where = "this.age < " + parseInt(params.categoryValue);
  }
  console.log("find parameters: ");
  console.log(findParams);
  return await Player.find(findParams);
}
