export const findById = (rows, id) => {
  return rows.filter(row => row.id === id)[0];
};
