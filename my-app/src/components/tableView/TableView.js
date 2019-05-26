import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import RowView from "./rowView/RowView";
import TableHeader from "./TableHeader";

const LIMIT = 15;
let idx = 0;

class TableView extends Component {
  goToUrl = (url, id) => {
    const { history } = this.props;
    const path = url + "/" + id;
    history.push(path);
  };

  render = () => {
    const { headers, url, rows } = this.props;
    const displayRows = rows.splice(idx, LIMIT + idx);
    return (
      <table className="table">
        <TableHeader header={headers} />
        <tbody>
          {displayRows.map(row => {
            return (
              <RowView
                key={row.id}
                headers={headers}
                rowValue={row}
                onClick={() => this.goToUrl(url, row.id)}
              />
            );
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

export default withRouter(TableView);
