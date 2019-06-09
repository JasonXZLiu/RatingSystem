import { FilterSelector } from "../models/filterSelector";

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
