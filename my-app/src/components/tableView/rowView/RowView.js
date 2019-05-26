import React, { Component } from "react";

const findCorrespondingEntry = (header, row) => {
  const headerValue =
    header.charAt(0).toLowerCase() + header.replace(" ", "").slice(1);
  if (row.hasOwnProperty(headerValue)) {
    return row[headerValue];
  }
};

class RowView extends Component {
  state = {
    hover: false
  };

  toggle = () => {
    this.setState({ hover: !this.state.hover });
  };

  render = () => {
    const { hover } = this.state;
    const { headers, rowValue } = this.props;
    let count = -1;
    return (
      <tr
        onMouseEnter={this.toggle}
        onMouseLeave={this.toggle}
        style={{ background: hover ? "#E8EAF6" : "" }}
      >
        {headers.map(header => {
          count++;
          return (
            <td key={count}>{findCorrespondingEntry(header, rowValue)}</td>
          );
        })}
      </tr>
    );
  };
}

export default RowView;
