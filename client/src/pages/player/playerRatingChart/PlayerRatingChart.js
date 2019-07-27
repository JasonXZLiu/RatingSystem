import React, { Component } from "react";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer
} from "recharts";

class PlayerRatingChart extends Component {
  render = () => {
    const { player } = this.props;
    const data = [
      {
        month: "Jan",
        uv: 4000
      },
      {
        month: "Feb",
        uv: 3000
      },
      {
        month: "Mar",
        uv: 2000
      },
      {
        month: "Apr",
        uv: 2780
      },
      {
        month: "May",
        uv: 1890
      },
      {
        month: "Jun",
        uv: 2390
      },
      {
        month: "Jul",
        uv: 3490
      }
    ];

    return (
      <div style={{ width: "25rem", height: "15rem" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} style={{ margin: "auto" }}>
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };
}

export default PlayerRatingChart;
