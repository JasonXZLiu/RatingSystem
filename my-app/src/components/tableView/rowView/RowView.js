import React from "react";

const RowView = props => {
  const { rowValue } = props;
  let count = -1;
  return (
    <tr>
      {rowValue.map(entry => {
        count++;
        return <td key={count}>{entry}</td>;
      })}
    </tr>
  );
};

export default RowView;
