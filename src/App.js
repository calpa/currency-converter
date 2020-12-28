import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DayUtils from "@date-io/dayjs";
import { QueryClient, QueryClientProvider } from "react-query";
import Form from "./components/Form";

import "./styles.css";

const queryClient = new QueryClient();

const theme = createMuiTheme({
  typography: {
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
    fontSize: 12,
    h1: {
      fontSize: 30
    }
  }
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MuiPickersUtilsProvider utils={DayUtils}>
        <ThemeProvider theme={theme}>
          <Grid container align="center" direction="column">
            <Typography variant="h1">Real Time Currency Converter</Typography>

            <Form />
          </Grid>
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </QueryClientProvider>
  );
}
