import React from "react";
import { toast } from "react-toastify";
import { Grid, Icon } from "@material-ui/core";

const Toast = ({ msg, type }) => {
  return (
    <Grid container direction="row" alignItems="center">
      <Grid item xs={2}>
        {type === "success" && (
          <Icon style={{ color: "#00BFA5" }}>check_circle</Icon>
        )}
        {type === "error" && (
          <Icon style={{ color: "#f44336" }}>error_outline</Icon>
        )}
      </Grid>
      <Grid item xs={10}>
        {msg}
      </Grid>
    </Grid>
  );
};

export default {
  success(msg, options = {}) {
    return toast.success(<Toast msg={msg} type={"success"} />, {
      ...options,
      className: {
        borderRadius: "8px",
        background: "white",
        boxShadow: "2px 2px 20px 2px rgba(0,0,0,0.3)"
      },
      bodyClassName: {
        color: "#4CAF50"
      }
    });
  },
  error(msg, options = {}) {
    return toast.error(<Toast msg={msg} type={"error"} />, {
      ...options,
      className: {
        borderRadius: "8px",
        background: "white",
        boxShadow: "2px 2px 20px 2px rgba(0,0,0,0.3)"
      },
      bodyClassName: {
        color: "#e53935"
      },
      autoClose: false
    });
  }
};
