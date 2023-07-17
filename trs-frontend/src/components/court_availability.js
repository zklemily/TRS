import * as React from 'react';
import moment from "moment-timezone";
import { 
  FormControl,
  Select,
  MenuItem,
  ListSubheader,
  TextField,
  Box, 
  ThemeProvider, 
  Modal, 
  Button, 
  Fab, 
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import {
   styled, 
   alpha, 
} from '@mui/material/styles';

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import AddIcon from '@mui/icons-material/Add';
import Close from '@mui/icons-material/Close';
import CalendarToday from '@mui/icons-material/CalendarToday';
import Create from '@mui/icons-material/Create';

import { 
  ViewState,
  EditingState,
  IntegratedEditing,
} from '@devexpress/dx-react-scheduler';

import { connectProps } from '@devexpress/dx-react-core';

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

const classes = {
  content: `${PREFIX}-content`,
  header: `${PREFIX}-header`,
  closeButton: `${PREFIX}-closeButton`,
  buttonGroup: `${PREFIX}-buttonGroup`,
  picker: `${PREFIX}-picker`,
  wrapper: `${PREFIX}-wrapper`,
  icon: `${PREFIX}-icon`,
  selectField: `${PREFIX}-selectField`,
  addButton: `${PREFIX}-addButton`,
  flexibleSpace: `${PREFIX}-flexibleSpace`,
  locationSelector: `${PREFIX}-locationSelector`,
  button: `${PREFIX}-button`,
  selectedButton: `${PREFIX}-selectedButton`,
  longButtonText: `${PREFIX}-longButtonText`,
  shortButtonText: `${PREFIX}-shortButtonText`,
  court: `${PREFIX}-court`,
  textContainer: `${PREFIX}-textContainer`,
  time: `${PREFIX}-time`,
  text: `${PREFIX}-text`,
  container: `${PREFIX}-container`,
  unbookableCell: `${PREFIX}-unbookableCell`,
};


// styling appointment form components
const StyledDiv = styled(Paper)(({ theme }) => ({
  width: theme.spacing('30vw'),
  padding: `20px`,
  margin: '0 auto',
  transform: 'translateY(20%)',
  msTransform: 'translateY(20%)',
  borderRadius: '20px',
  [`& .${classes.icon}`]: {
    margin: theme.spacing(2, 0),
    marginRight: theme.spacing(2),
  },
  [`& .${classes.header}`]: {
    overflow: 'hidden',
    paddingTop: theme.spacing(0.5),
  },
  [`& .${classes.selectField}`]: {
    justifyContent: 'flex-start',
    width: '100%',
  },
  [`& .${classes.content}`]: {
    padding: theme.spacing(2),
    paddingTop: 0,
  },
  [`& .${classes.closeButton}`]: {
    float: 'right',
  },
  [`& .${classes.picker}`]: {
    width: '100%',
  },
  [`& .${classes.wrapper}`]: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 0),
  },
  [`& .${classes.buttonGroup}`]: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 2),
  },
  [`& .${classes.button}`]: {
    marginLeft: theme.spacing(2),
  },
}));
const StyledFab = styled(Fab)(({ theme }) => ({
  [`&.${classes.addButton}`]: {
    position: 'absolute',
    bottom: theme.spacing(3),
    right: theme.spacing(4),
  },
}));


// styling the save button
const StyledSaveButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  height: '50px',
  minWidth: '10vh',
  borderRadius: '100px',
  color: 'white',
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
  },
  '&:disabled': { 
    color: 'white',
  },
}));

const commandButtonComponent = (props) => {
  if (props.id === 'saveButton') {
    return <StyledSaveButton {...props} >Save</StyledSaveButton>;
  }
  return <AppointmentForm.CommandButton {...props} />;
};

// customize appointment as appeared on the scheduler
const Appointment = ({children, style, ...restProps}) => (
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
      <RootPaper ref={ref} > 
      {children}
      </RootPaper>
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

// appointment form definition
class AppointmentFormContainerBasic extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      appointmentChanges: {},
    };

    this.getAppointmentData = () => {
      const { appointmentData } = this.props;
      return appointmentData;
    };
    this.getAppointmentChanges = () => {
      const { appointmentChanges } = this.state;
      return appointmentChanges;
    };

    this.changeAppointment = this.changeAppointment.bind(this);
    this.commitAppointment = this.commitAppointment.bind(this);
  }

  changeAppointment({ field, changes }) {
    const nextChanges = {
      ...this.getAppointmentChanges(),
      [field]: changes,
    };
    this.setState({
      appointmentChanges: nextChanges,
    });
  }

  commitAppointment(type) {
    const { commitChanges } = this.props;
    const appointment = {
      ...this.getAppointmentData(),
      ...this.getAppointmentChanges(),
    };
    if (type === 'deleted') {
      commitChanges({ [type]: appointment.id });
    } else if (type === 'changed') {
      commitChanges({ [type]: { [appointment.id]: appointment } });
    } else {
      commitChanges({ [type]: appointment });
    }
    this.setState({
      appointmentChanges: {},
    });
  }

  render() {
    const {
      visible,
      visibleChange,
      appointmentData,
      cancelAppointment,
      target,
      onHide,
    } = this.props;
    const { appointmentChanges } = this.state;

    const displayAppointmentData = {
      ...appointmentData,
      ...appointmentChanges,
    };

    const isNewAppointment = appointmentData.id === undefined;
    const applyChanges = isNewAppointment
      ? () => this.commitAppointment('added')
      : () => this.commitAppointment('changed');

    const selectProps = field => ({
      onChange: ({ target: change }) => this.changeAppointment({
        field: [field], changes: change.value,
      }),
      value: displayAppointmentData[field],
      className: classes.selectField,
    });

    const pickerEditorProps = field => ({
      // keyboard: true,
      value: displayAppointmentData[field],
      onChange: date => this.changeAppointment({
        field: [field], changes: date ? date.toDate() : new Date(displayAppointmentData[field]),
      }),
      ampm: false,
      inputFormat: 'DD/MM/YYYY HH:mm',
      onError: () => null,
    });
    const startDatePickerProps = pickerEditorProps('startDate');
    const endDatePickerProps = pickerEditorProps('endDate');
    const cancelChanges = () => {
      this.setState({
        appointmentChanges: {},
      });
      visibleChange();
      cancelAppointment();
    };

    return (
      <Modal open={visible} onClose={onHide}
      >
        <StyledDiv>
          <div className={classes.header}>
            <IconButton className={classes.closeButton} onClick={cancelChanges} size="large">
              <Close color="action" />
            </IconButton>
          </div>
          <div className={classes.content}>
            <div className={classes.wrapper}>
              <Create className={classes.icon} color="action" />
              <FormControl sx={{ width: '100%', marginRight: 'auto' }}>
                <Select
                  {...selectProps('title')}
                >
                  <ListSubheader> Hamlin Outdoor Courts</ListSubheader>
                  {Array.from({ length: 12 }, (_, index) => (
                      <MenuItem key={`Outdoor Court ${index + 1}`} value={`Outdoor Court ${index + 1}`}>
                        Court {index + 1}
                      </MenuItem>
                    ))}
                  <ListSubheader> Hecht Indoor Courts </ListSubheader>
                  {Array.from({ length: 12 }, (_, index) => (
                      <MenuItem key={`Indoor Court ${index + 1}`} value={`Indoor Court ${index + 1}`}>
                        Court {index + 1}
                      </MenuItem>
                    ))}

                </Select>
              </FormControl>
            </div>
            <div className={classes.wrapper}>
              <CalendarToday className={classes.icon} color="action" />
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateTimePicker
                  label="Start Date"
                  renderInput={
                    props => <TextField className={classes.picker} {...props} />
                  }
                  {...startDatePickerProps}
                />
                <DateTimePicker
                  label="End Date"
                  renderInput={
                    props => <TextField className={classes.picker} {...props} />
                  }
                  {...endDatePickerProps}
                />
              </LocalizationProvider>
            </div>
          </div>
          <div className={classes.buttonGroup}>
            {!isNewAppointment && (
              <Button
                variant="outlined"
                color="secondary"
                className={classes.button}
                onClick={() => {
                  visibleChange();
                  this.commitAppointment('deleted');
                }}
              >
                Delete
              </Button>
            )}
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={() => {
                visibleChange();
                applyChanges();
              }}
            >
              {isNewAppointment ? 'Create' : 'Save'}
            </Button>
          </div>
        </StyledDiv>
      </Modal>
    );
  }
}

// actual scheduler definition
export default class CourtAvail extends React.PureComponent {
  constructor(props) {
    super(props);
    
    this.state = {
      data: appointments,
      currentDate: moment.tz(currDate, "US/Eastern").format("YYYY-MM-DD"),
      confirmationVisible: false,
      editingFormVisible: false,
      deletedAppointmentId: undefined,
      editingAppointment: undefined,
      previousAppointment: undefined,
      addedAppointment: {},
      isNewAppointment: false,
    };
    this.toggleConfirmationVisible = this.toggleConfirmationVisible.bind(this);
    this.commitDeletedAppointment = this.commitDeletedAppointment.bind(this);
    this.toggleEditingFormVisibility = this.toggleEditingFormVisibility.bind(this);
    this.currentDateChange = this.currentDateChange.bind(this);
    this.commitChanges = this.commitChanges.bind(this);
    this.onEditingAppointmentChange = this.onEditingAppointmentChange.bind(this);
    this.onAddedAppointmentChange = this.onAddedAppointmentChange.bind(this);
    this.appointmentForm = connectProps(AppointmentFormContainerBasic, () => {
      const {
        editingFormVisible,
        editingAppointment,
        data,
        addedAppointment,
        isNewAppointment,
        previousAppointment,
      } = this.state;

      const currentAppointment = data
        .filter(appointment => editingAppointment && appointment.id === editingAppointment.id)[0]
        || addedAppointment;
      const cancelAppointment = () => {
        if (isNewAppointment) {
          this.setState({
            editingAppointment: previousAppointment,
            isNewAppointment: false,
          });
        }
      };

      return {
        visible: editingFormVisible,
        appointmentData: currentAppointment,
        commitChanges: this.commitChanges,
        visibleChange: this.toggleEditingFormVisibility,
        onEditingAppointmentChange: this.onEditingAppointmentChange,
        cancelAppointment,
      };
    });
  }

  currentDateChange(currentDate) {
    this.setState({currentDate});
  }

  componentDidUpdate() {
    this.appointmentForm.update();
  }

  onEditingAppointmentChange(editingAppointment) {
    this.setState({ editingAppointment });
  }

  onAddedAppointmentChange(addedAppointment) {
    this.setState({ addedAppointment });
    const { editingAppointment } = this.state;
    if (editingAppointment !== undefined) {
      this.setState({
        previousAppointment: editingAppointment,
      });
    }
    this.setState({ editingAppointment: undefined, isNewAppointment: true });
  }

  setDeletedAppointmentId(id) {
    this.setState({ deletedAppointmentId: id });
  }

  toggleEditingFormVisibility() {
    const { editingFormVisible } = this.state;
    this.setState({
      editingFormVisible: !editingFormVisible,
    });
  }

  toggleConfirmationVisible() {
    const { confirmationVisible } = this.state;
    this.setState({ confirmationVisible: !confirmationVisible });
  }

  commitDeletedAppointment() {
    this.setState((state) => {
      const { data, deletedAppointmentId } = state;
      const nextData = data.filter(appointment => appointment.id !== deletedAppointmentId);

      return { data: nextData, deletedAppointmentId: null };
    });
    this.toggleConfirmationVisible();
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }
      if (deleted !== undefined) {
        this.setDeletedAppointmentId(deleted);
        this.toggleConfirmationVisible();
      }
      return { data, addedAppointment: {} };
    });
  }

  render() { 
    const { data, currentDate, confirmationVisible, editingFormVisible, } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            bgcolor: ``,
            border: `1px solid ${theme.palette.primary.light}`,
            borderRadius: '20px',
            maxWidth: '60vw',
            minHeight: '78vh',
          }}
        >
          <Scheduler
            data={data}
            height={700}
            firstDayOfWeek={0}
          >
            <ViewState
              currentDate={currentDate}
              onCurrentDateChange={this.currentDateChange}
            />
            <EditingState 
              onCommitChanges={this.commitChanges}
              onEditingAppointmentChange={this.onEditingAppointmentChange}
              onAddedAppointmentChange={this.onAddedAppointmentChange}
            />
            <IntegratedEditing />
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
              showDeleteButton
            />
            <AppointmentForm
            overlayComponent={this.appointmentForm}
            commandButtonComponent={commandButtonComponent}
            visible={editingFormVisible}
            onVisibilityChange={this.toggleEditingFormVisibility}
            />
          </Scheduler>

          <Dialog
            open={confirmationVisible}
            onClose={this.cancelDelete}
          >
            <DialogTitle>
              Delete Appointment
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this appointment?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.toggleConfirmationVisible} color="primary" variant="outlined">
                Cancel
              </Button>
              <Button onClick={this.commitDeletedAppointment} color="secondary" variant="outlined">
                Delete
              </Button>
            </DialogActions>
          </Dialog>

          <StyledFab
            color="primary"
            className={classes.addButton}
            onClick={() => {
              this.setState({ editingFormVisible: true });
              this.onEditingAppointmentChange(undefined);
              this.onAddedAppointmentChange({
                // TODO by default set hours to next available hour (add function to utils)
                startDate: new Date(currentDate).setHours(currDate.getHours()),
                endDate: new Date(currentDate).setHours(currDate.getHours() + 1),
              });
            }}
          >
            <AddIcon />
          </StyledFab>
        </Box>
      </ThemeProvider>
    );
  }
}
