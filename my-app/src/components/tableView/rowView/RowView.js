import React from "react";

const findCorrespondingEntry = (header, row) => {
  const headerValue = header.replace(" ", "").toLowerCase();
  if (row.hasOwnProperty(headerValue)) {
    return row[headerValue];
  }
};

const RowView = props => {
  const { headers, rowValue } = props;
  let count = -1;
  return (
    <tr>
      {headers.map(header => {
        count++;
        return <td key={count}>{findCorrespondingEntry(header, rowValue)}</td>;
      })}
    </tr>
  );
};

export default RowView;
