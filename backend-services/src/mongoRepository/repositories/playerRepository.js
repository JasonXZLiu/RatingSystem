import { Player } from "../schemas/player";

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
  return await Player.findOne(findParams).populate("matchHistory");
}

export async function getPlayerIdByName(params) {
  return await Player.find(params).then(data => {
    if (data.length > 1) return data.map(data => data._id);
    else return data[0]._id;
  });
}

export async function getPlayerObjectIdById(id) {
  return await Player.find({ id: id }).then(data => {
    return data[0]._id;
  });
}

export async function getPlayerIdToVerifyByName(params) {
  return await Player.find(params).then(data =>
    data.map(data => data.id + " - " + data.name)
  );
}

export async function getPlayerMatchHistory(params) {
  const findParams = {
    id: params.playerId
  };

  if (!(params.searchValue || params.resultValue)) {
    return await Player.findOne(findParams)
      .populate("matchHistory")
      .then(player => player.matchHistory);
  }

  return await Player.findOne(findParams)
    .populate("matchHistory")
    .then(player =>
      player.matchHistory.filter(match => {
        const searchValue =
          params.searchValue !== "undefined"
            ? params.searchValue.toLowerCase()
            : "";
        const resultValue =
          params.resultValue !== "undefined" ? params.resultValue : "";
        console.log(searchValue);
        if (
          (match.opponent.toLowerCase().includes(searchValue) ||
            match.tournament.toLowerCase().includes(searchValue)) &&
          match.result.includes(resultValue)
        ) {
          return match;
        }
      })
    );
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
  return await Player.find(findParams).sort({ rating: -1 });
}
