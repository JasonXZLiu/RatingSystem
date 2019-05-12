import { data, selectors } from "../data";

const get = action => {
  switch (action) {
    case "PLAYERS":
      return data.players;
    case "GENDER":
      return selectors.gender;
    case "PROVINCE":
      return selectors.province;
    case "CATEGORY":
      return selectors.category;
    default:
      break;
  }
};

export default get;
