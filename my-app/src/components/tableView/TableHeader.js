import React from "react";

const getHeaderLabel = entry => {
  if (entry instanceof Object) return entry.label;
  return entry;
};

const TableHeader = props => {
  const { header } = props;
  let count = -1;
  return (
    <thead>
      <tr>
        {header.map(entry => {
          count++;
          return (
            <th scope="col" key={count}>
              {getHeaderLabel(entry)}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHeader;
