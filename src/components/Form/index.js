import React, { useState } from 'react';
import { Grid, MenuItem, Select, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DatePicker } from '@material-ui/pickers';
import { useQuery } from 'react-query';
import dayjs from 'dayjs';
import axios from 'axios';
import currencies from '../../constants/currencies';
import Result from '../Result';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  textField: {
    width: '100%',
  },
}));

export default function Form() {
  const [selectedDate, handleDateChange] = useState(dayjs());
  const [base, setBase] = useState('');
  const [toCurrency, setToCurrency] = useState('');

  const classes = useStyles();

  const { data } = useQuery([base, toCurrency, selectedDate], async () => {
    const date = selectedDate.format('YYYY-MM-DD');
    if (date && base && toCurrency) {
      const { data } = await axios.get(
        `https://api.exchangeratesapi.io/${date}?base=${base}&symbols=${toCurrency}`
      );

      let rate = data.rates[toCurrency];
      if (typeof rate === 'number') {
        rate = rate.toFixed(2);
      }

      return rate;
    }

    return 'Missing the mandatory fields';
  });

  console.log(data);

  return (
    <Grid>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <Grid container align='flex-start' style={{ margin: 5 }}>
            <InputLabel id='from-currency'>Base Currency</InputLabel>
          </Grid>

          <Select
            // placeholder="Currency I Have"
            labelId='from-currency'
            defaultValue=''
            variant='outlined'
            margin='normal'
            className={classes.textField}
            onChange={(e) => setBase(e.target.value)}
          >
            {currencies.map((currency) => (
              <MenuItem value={currency}>{currency}</MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container align='flex-start' style={{ margin: 5 }}>
            <InputLabel id='from-currency'>To Currency</InputLabel>
          </Grid>
          <Select
            label='Currency I Want'
            defaultValue=''
            variant='outlined'
            margin='normal'
            className={classes.textField}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            {currencies.map((currency) => (
              <MenuItem value={currency}>{currency}</MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container align='flex-start' style={{ margin: 5 }}>
            <InputLabel id='from-currency'>Date</InputLabel>
          </Grid>
          <DatePicker
            value={selectedDate}
            onChange={handleDateChange}
            minDate='1999-01-01'
            labelFunc={(date) => dayjs(date).format('YYYY-MM-DD')}
          />
        </Grid>

        <Result data={data} />

        <Grid container item xs={12} justify='center'>
          Source From&nbsp;
          <a
            href='https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html'
            target='_blank'
            rel='noopener noreferrer'
          >
            European Central Bank
          </a>
        </Grid>
      </Grid>
    </Grid>
  );
}
