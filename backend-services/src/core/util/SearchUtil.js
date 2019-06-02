export const searchByStringValue = (value, target) => {
  return (
    target === "undefined" || value.toLowerCase().includes(target.toLowerCase())
  );
};

export const searchByNumberValue = (value, target) => {
  return target === "undefined" || value <= parseInt(target);
};
