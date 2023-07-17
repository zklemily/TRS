import * as React from 'react';
import moment from "moment-timezone";
import { Box, ThemeProvider, Modal, Button, Grid, Paper} from '@mui/material';
import { styled, alpha, } from '@mui/material/styles';

import { 
  ViewState,
  EditingState,
  IntegratedEditing,
} from '@devexpress/dx-react-scheduler';

import {
  Scheduler,
  DayView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
  AppointmentTooltip,
  AppointmentForm,
  ConfirmationDialog,
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

// Define custom appointment form style
const RootPaper = styled(Paper)(({ theme }) => ({
  width: theme.spacing(50),
  padding: `20px`,
  margin: '0 auto',
  transform: 'translateY(20%)',
  msTransform: 'translateY(20%)',
  borderRadius: '20px',
}));

// Define custom appointment form overlay
const FormOverlay = React.forwardRef(({ visible, onHide, children }, ref) => {

  return (
    <Modal open={visible} onClose={onHide}>
      <RootPaper ref={ref}>{children}</RootPaper>
    </Modal>
  );
});

// styling the disabled cells
const StyledDayViewTimeTableCell = styled(DayView.TimeTableCell)(({
  theme: { palette },
  }) => ({
    [`&.${classes.unbookableCell}`]: {
      backgroundColor: alpha(palette.action.disabledBackground, 0.2),
      '&:hover': {
        backgroundColor: alpha(palette.action.disabledBackground, 0.2),
      },
      '&:focus': {
        backgroundColor: alpha(palette.action.disabledBackground, 0.2),
      },
    },
  }));



// customize rules for selecting disabled cells 
const TimeTableCell = (({ ...restProps }) => {
  const { startDate } = restProps;
  const handleDoubleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  if (!ReservationUtils.isWithinRange(startDate)) {
    return <StyledDayViewTimeTableCell {...restProps} className={classes.unbookableCell} onDoubleClick={handleDoubleClick}/>;
  } 
  
  return <StyledDayViewTimeTableCell {...restProps} />;
});

export default class CourtAvail extends React.PureComponent {
  constructor(props) {
    super(props);
    
    this.state = {
      data: appointments,
      currentDate: moment.tz(currDate, "US/Eastern").format("YYYY-MM-DD"),
    };
    this.currentDateChange = (currentDate) => { this.setState({ currentDate }); };
    this.commitChanges = this.commitChanges.bind(this);
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
      }
      if (deleted !== undefined) {
        data = data.filter((appointment) => appointment.id !== deleted);
      }
      return { data };
    });
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
              intervalCount={7}
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
            overlayComponent={FormOverlay}
            />
          </Scheduler>
        </Box>
      </ThemeProvider>
    );
  }
}
