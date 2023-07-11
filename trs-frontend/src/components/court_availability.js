import React, { PureComponent } from 'react';
import { Box, Divider, ThemeProvider } from '@mui/material';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';

import { appointments } from '../demo-data/appointments';
import theme from '../context/color_theme';

export default class CourtAvail extends PureComponent {
  constructor(props) {
    super(props);
    
    this.state = {
      data: appointments,
      currentDate: '2018-06-27',
    };
    this.currentDateChange = (currentDate) => { this.setState({ currentDate }); };
  }

  render() { 
    const { data, currentDate } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            bgcolor: ``,
            border: `1px solid ${theme.palette.primary.light}`,
            borderRadius: '20px',
            maxWidth: '60vw',
            minHeight: '80vh',
          }}
        >
          <Scheduler
            data={data}
            height={700}
          >
            <ViewState
              currentDate={currentDate}
              onCurrentDateChange={this.currentDateChange}
            />
            <WeekView
              startDayHour={7}
              endDayHour={23}
            />
            <Toolbar />
            <DateNavigator />
            <TodayButton />
            <Appointments />
          </Scheduler>
        </Box>
      </ThemeProvider>
    );
  }
}
