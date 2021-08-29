import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import Datetime from 'react-datetime';
import LuxonUtils from '@date-io/luxon';
import { Button, createStyles, FormControl, InputLabel, makeStyles, MenuItem, Select, Theme } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import React from 'react';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Save, Undo } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '500px'
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    button: {
      margin: theme.spacing(1),
    },
  }),
);

export const ClassesAddEditView = ({
  isEdit,
  locations,
  classTypes,
  foundClass,
  onSubmit,
}): ReactElement => {
  const classes = useStyles();
  const [periodStart, handlePeriodStartChange] = React.useState(new Date());
  const [periodEnd, handlePeriodEndChange] = React.useState(new Date());
  const [location, setLocation] = React.useState('');
  const [classType, setClassType] = React.useState('');
  // const [university, setUniversity] = React.useState('');

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };
  const handleClassTypeChange = (event) => {
    setClassType(event.target.value);
  };
  // const handleUniversityChange = (event) => {
  //   setUniversity(event.target.value);
  // };

  return (
    <div
      style={{
        padding: 10,
      }}
    >
      <h1>Classes {isEdit ? 'Edit' : 'Add'}</h1>

      <MuiPickersUtilsProvider utils={LuxonUtils}>
        <Formik
          className={classes.root}
          initialValues={foundClass}
          onSubmit={onSubmit}>
          {({ values, setFieldValue }) => (
            <Form className={classes.form}
            >
              <Button
                href="/classes"
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<Undo />}
              >
                Back
              </Button>

              <Field
                component={TextField}
                name="classCode"
                label="Class Code"
                required
                variant="outlined"
                className={classes.formControl}
              />
              <DateTimePicker
                ampm={false}
                label="Period Start"
                inputVariant="outlined"
                name="periodStart"
                value={periodStart}
                onChange={handlePeriodStartChange}
                className={classes.formControl}
              />
              <DateTimePicker
                ampm={false}
                label="Period End"
                inputVariant="outlined"
                name="periodEnd"
                value={periodEnd}
                onChange={handlePeriodEndChange}
                className={classes.formControl}
              />

              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="class-type-label">Location</InputLabel>
                <Select
                  labelId="class-type-label"
                  label="Location"
                  name="location"
                  value={location}
                  onChange={handleLocationChange}
                >
                  {locations.map((c) => (
                    <MenuItem value={c} key={c}>{c}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="class-type-label">Class Type</InputLabel>
                <Select
                  labelId="class-type-label"
                  label="Class Type"
                  name="classType"
                  value={classType}
                  onChange={handleClassTypeChange}
                >
                  {classTypes.map((c) => (
                    <MenuItem value={c} key={c}>{c}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Field
                component={TextField}
                name="university"
                label="University"
                // value={university}
                // onChange={handleUniversityChange}
                variant="outlined"
                className={classes.formControl}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<Save />}
              >
                Save
              </Button>
            </Form>
          )}
        </Formik>
      </MuiPickersUtilsProvider>
    </div>
  );
};
