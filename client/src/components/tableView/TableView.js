import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Typography, withStyles } from "@material-ui/core";
import RowView from "./rowView/RowView";
import TableHeader from "./TableHeader";

const LIMIT = 15;
let idx = 0;

const style = {
  buttonRowStyle: { margin: "auto" },
  buttonStyle: { margin: "1rem 1rem 1rem 1rem" },
  container: { width: "100%" },
  headerText: { marginBottom: "1rem" }
};

class TableView extends Component {
  goToUrl = (url, id) => {
    if (url === "") return;

    const { history } = this.props;
    const path = url + "/" + id;
    history.push(path);
  };

  render = () => {
    const {
      tableTitle,
      headers,
      url,
      rows,
      action,
      classes,
      buttons,
      buttonAction
    } = this.props;
    const displayRows = rows.splice(idx, LIMIT + idx);
    return (
      <div className={classes.container}>
        <Typography
          variant="h5"
          className={classes.headerText}
          style={{ color: "#005cb2" }}
        >
          <strong>{tableTitle}</strong>
        </Typography>
        <table className="table" style={{ width: "100%" }}>
          <TableHeader header={headers} />
          <tbody>
            {displayRows.map(row => {
              return (
                <RowView
                  key={row.id}
                  headers={headers}
                  rowValue={row}
                  action={action}
                  onClick={() => this.goToUrl(url, row.id)}
                />
              );
            })}
          </tbody>
        </table>
        {buttons && (
          <div className="row">
            <div className={classes.buttonRowStyle}>
              <button
                type="button"
                className={classNames("btn btn-light", classes.buttonStyle)}
                disabled={buttonAction.hasBack}
                onClick={this.onBack}
              >
                Back
              </button>
              <button
                type="button"
                className={classNames(
                  "btn btn-primary",
                  buttonAction.buttonStyle
                )}
                disabled={classes.hasNext}
                onClick={this.onNext}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };
}

TableView.propTypes = {
  headers: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  url: PropTypes.string
};

TableView.defaultProps = {
  url: ""
};

export default withStyles(style)(withRouter(TableView));
