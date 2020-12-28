import React from "react";
import { Grid, Typography } from "@material-ui/core";

const Result = (props) => {
  const { data } = props;
  return (
    <Grid container item xs={12} sm={6} direction="column">
      <Typography>Rate:</Typography>
      <Typography>{data}</Typography>
    </Grid>
  );
};

export default Result;
