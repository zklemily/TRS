import * as React from 'react';
import moment from "moment-timezone";
import { Box, ThemeProvider, Modal, Button, Grid, Paper} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
  AppointmentTooltip,
  AppointmentForm,
} from '@devexpress/dx-react-scheduler-material-ui';

import {appointments} from '../demo-data/appointments';
import theme from '../context/color_theme';
import ReservationUtils from '../utils/reservation_utils';

const currDate = new Date();

const PREFIX = 'TRS-court';
// #FOLD_BLOCK
const classes = {
  flexibleSpace: `${PREFIX}-flexibleSpace`,
  textField: `${PREFIX}-textField`,
  locationSelector: `${PREFIX}-locationSelector`,
  button: `${PREFIX}-button`,
  selectedButton: `${PREFIX}-selectedButton`,
  longButtonText: `${PREFIX}-longButtonText`,
  shortButtonText: `${PREFIX}-shortButtonText`,
  title: `${PREFIX}-title`,
  textContainer: `${PREFIX}-textContainer`,
  time: `${PREFIX}-time`,
  text: `${PREFIX}-text`,
  container: `${PREFIX}-container`,
  unbookableCell: `${PREFIX}-unbookableCell`,
};

const Appointment = ({
  children, style, ...restProps
}) => (
  <Appointments.Appointment
    {...restProps}
    style={{
      backgroundColor: theme.palette.primary.main,
      borderRadius: '10px',
    }}
  >
    {children}
  </Appointments.Appointment>
);

const FormOverlay = () => (
    <Modal>
      <Paper>
        <Grid container spacing={1} justify={"flex-end"}>
          {/* delete should delete the appointment */}
          <Button >DELETE</Button>
        </Grid>

        <div>Test</div>
        <Grid container spacing={1} justify={"flex-end"}>
          {/* Cancel  should close the modal */}
          <Button>CANCEL</Button>
          {/* CREATE should create the appointment */}
          <Button>CREATE</Button>
        </Grid>
      </Paper>
    </Modal>

);

const StyledWeekViewTimeTableCell = styled(DayView.TimeTableCell)(({
  theme: { palette },
  }) => ({
    [`&.${classes.unbookableCell}`]: {
      backgroundColor: alpha(palette.action.disabledBackground, 0.4),
      '&:hover': {
        backgroundColor: alpha(palette.action.disabledBackground, 0.4),
      },
      '&:focus': {
        backgroundColor: alpha(palette.action.disabledBackground, 0.4),
      },
    },
  }));

const TimeTableCell = (({ ...restProps }) => {
  const { startDate } = restProps;
  if (!ReservationUtils.isWithinRange(startDate)) {
    return <StyledWeekViewTimeTableCell {...restProps} className={classes.unbookableCell} />;
  } return <StyledWeekViewTimeTableCell {...restProps} />;
});

export default class CourtAvail extends React.PureComponent {
  constructor(props) {
    super(props);
    
    this.state = {
      data: appointments,
      currentDate: moment.tz(currDate, "US/Eastern").format("YYYY-MM-DD"),
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
          <Box minHeight={20}/>
          <Scheduler
            data={data}
            height={700}
            firstDayOfWeek={0}
          >
            <ViewState
              currentDate={currentDate}
              onCurrentDateChange={this.currentDateChange}
            />
            <DayView
              cellDuration={60}
              startDayHour={7}
              endDayHour={23}
              intervalCount={12}
              timeTableCellComponent={TimeTableCell}
            />
            <Toolbar />
            <DateNavigator />
            <TodayButton />
            <Appointments appointmentComponent={Appointment}/>
            <AppointmentTooltip
              showCloseButton
              showOpenButton
            />
            <AppointmentForm
            />
          </Scheduler>
        </Box>
      </ThemeProvider>
    );
  }
}
