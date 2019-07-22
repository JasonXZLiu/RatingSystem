import { FilterSelector } from "../schemas/filterSelector";

export function getSex() {
  const params = {
    title: {
      $regex: "Sex",
      $options: "mi"
    }
  };
  return FilterSelector.findOne(params);
}

export function getProvince() {
  const params = {
    title: {
      $regex: "province",
      $options: "mi"
    }
  };
  return FilterSelector.findOne(params);
}

export function getCategory() {
  const params = {
    title: {
      $regex: "category",
      $options: "mi"
    }
  };
  return FilterSelector.findOne(params);
}

export function getResult() {
  const params = {
    title: {
      $regex: "result",
      $options: "mi"
    }
  };
  return FilterSelector.findOne(params);
}
