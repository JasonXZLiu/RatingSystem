import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import RowView from "./rowView/RowView";
import TableHeader from "./TableHeader";

class TableView extends React.Component {
  render = () => {
    const { styling, table } = this.props;
    return (
      <table className="table" style={styling}>
        <TableHeader header={table.headers} />
        <tbody>
          {table.rows.map(row => {
            return <RowView key={row} rowValue={row} />;
          })}
        </tbody>
      </table>
    );
  };
}

TableView.propTypes = {
  table: PropTypes.object.isRequired
};

TableView.defaultProps = {
  table: {
    headers: ["#", "First", "Last", "Handle"],
    rows: [
      ["1", "Mark", "Otto", "@mdo"],
      ["2", "Jacob", "Thornton", "@fat"],
      ["3", "Larry", "the Bird", "@twitter"]
    ]
  }
};

export default TableView;
