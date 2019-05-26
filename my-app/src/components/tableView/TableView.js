import React, { Component } from "react";
import PropTypes from "prop-types";
import RowView from "./rowView/RowView";
import TableHeader from "./TableHeader";

const LIMIT = 15;
let idx = 0;

class TableView extends Component {
  render = () => {
    const { styling, headers, rows } = this.props;
    const displayRows = rows.splice(idx, LIMIT + idx);
    let count = 0;
    return (
      <table className="table">
        <TableHeader header={headers} />
        <tbody>
          {displayRows.map(row => {
            count++;
            return <RowView key={count} headers={headers} rowValue={row} />;
          })}
        </tbody>
      </table>
    );
  };
}

TableView.propTypes = {
  headers: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired
};

export default TableView;
