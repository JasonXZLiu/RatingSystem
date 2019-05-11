import React from "react";

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
              {entry}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHeader;
