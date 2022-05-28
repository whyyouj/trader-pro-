import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from '../Template/Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function Balance() {
  return (
    <React.Fragment>
      <Title>Current Balance</Title>
      <div>
        <Typography color="textSecondary" align="center">
          Cash Balance:
        </Typography>

        <Typography component="p" variant="h12" align="center">
          $100,000
        </Typography>
        <Typography color="textSecondary" align="center">
          Portfolio Balance:
        </Typography>

        <Typography component="p" variant="h12" align="center" gutterBottom>
          $000
        </Typography>
        <div>
          <Typography color="textSecondary" align="center">
            Total:
          </Typography>

          <Typography
            component="p"
            variant="h10"
            align="center"
            //className={temp}
          >
            $100,000
          </Typography>
        </div>
      </div>
      <div>
        <Typography color="textSecondary" align="center">
          {new Date().toDateString()}
        </Typography>
      </div>
    </React.Fragment>
  );
}

