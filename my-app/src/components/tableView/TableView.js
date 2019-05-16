import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import RowView from "./rowView/RowView";
import TableHeader from "./TableHeader";

const LIMIT = 15;
let idx = 0;

class TableView extends React.Component {
  render = () => {
    const { styling, table } = this.props;
    const displayRows = table.rows.splice(idx, LIMIT + idx);
    console.log(table);
    return (
      <table className="table" style={styling}>
        <TableHeader header={table.headers} />
        <tbody>
          {displayRows.map(row => {
            return <RowView key={row} headers={table.headers} rowValue={row} />;
          })}
        </tbody>
      </table>
    );
  };
}

TableView.propTypes = {
  table: PropTypes.object.isRequired
};

export default TableView;
