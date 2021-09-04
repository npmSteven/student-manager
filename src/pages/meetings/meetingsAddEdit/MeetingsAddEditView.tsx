import { Field, Form, Formik } from 'formik';
import moment from 'moment';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import Datetime from 'react-datetime';
import LuxonUtils from '@date-io/luxon';
import { Button, Checkbox, createStyles, FormControl, FormControlLabel, InputLabel, makeStyles, MenuItem, Select, Theme } from '@material-ui/core';
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

export const MeetingsAddEditView = ({
  isEdit,
  onSubmit,
  tutorNames,
  studentNames,
  currencies,
  meeting,
}): ReactElement => {
  const classes = useStyles();

  return (
    <div>
      <h1>Meetings {isEdit ? 'Edit' : 'Add'}</h1>
      <Link to="/meetings" style={{ textDecoration: 'none' }}>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<Undo />}
        >
          Back
        </Button>
      </Link>
      <MuiPickersUtilsProvider utils={LuxonUtils}>
        <Formik
          className={classes.root}
          initialValues={meeting}
          onSubmit={onSubmit}>
          {({ values, setFieldValue }) => (
            <Form className={classes.form}>

              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="class-type-label">Tutor</InputLabel>
                <Select
                  labelId="class-type-label"
                  label="tutorId"
                  name="tutorId"
                  value={values.tutorId}
                  onChange={(e) => (
                    setFieldValue("tutorId", e.target.value)
                  )}
                >
                  {tutorNames.map((c) => (
                    <MenuItem value={c._id} key={c._id}>{c.firstName} {c.lastName}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="class-type-label">Student</InputLabel>
                <Select
                  labelId="class-type-label"
                  label="studentId"
                  name="studentId"
                  value={values.studentId}
                  onChange={(e) => (
                    setFieldValue("studentId", e.target.value)
                  )}
                >
                  {studentNames.map((c) => (
                    <MenuItem value={c._id} key={c._id}>{c.firstName} {c.lastName}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <DateTimePicker
                ampm={false}
                format="dd/MM/yyyy HH:mm"
                label="Period Start"
                inputVariant="outlined"
                name="periodStart"
                value={values.periodStart}
                onChange={(e) => (
                  setFieldValue("periodStart", e)
                )}
                className={classes.formControl}
              />
              <DateTimePicker
                ampm={false}
                format="dd/MM/yyyy HH:mm"
                label="Period End"
                inputVariant="outlined"
                name="periodEnd"
                value={values.periodEnd}
                onChange={(e) => (
                  setFieldValue("periodEnd", e)
                )}
                className={classes.formControl}
              />

              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="class-type-label">Currency</InputLabel>
                <Select
                  labelId="class-type-label"
                  label="currency"
                  name="currency"
                  value={values.currency}
                  onChange={(e) => (
                    setFieldValue("currency", e.target.value)
                  )}
                >
                  {currencies.map((c) => (
                    <MenuItem value={c} key={c}>{c}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl className={classes.formControl}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.didShow}
                      onChange={() => (
                        setFieldValue('didShow', !values.didShow)
                      )}
                      name="didShow"
                      color="primary"
                    />
                  }
                  label="Show"
                />
              </FormControl>

              <FormControl className={classes.formControl}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.didFillTutorEvaluationSheet}
                      onChange={() => (
                        setFieldValue('didFillTutorEvaluationSheet', !values.didFillTutorEvaluationSheet)
                      )}
                      name="didFillTutorEvaluationSheet"
                      color="primary"
                    />
                  }
                  label="Tutor Evaluation Sheet"
                />
              </FormControl>

              <FormControl className={classes.formControl}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.didFillStudentEvaluationSheet}
                      onChange={() => (
                        setFieldValue('didFillStudentEvaluationSheet', !values.didFillStudentEvaluationSheet)
                      )}
                      name="didFillStudentEvaluationSheet"
                      color="primary"
                    />
                  }
                  label="Student Evaluation Sheet"
                />
              </FormControl>

              <Field
                component={TextField}
                name="topicsCovered"
                label="Topics Covered"
                multiline
                required
                variant="outlined"
                className={classes.formControl}
              />
              
              <Field
                component={TextField}
                name="notes"
                label="Notes"
                multiline
                required
                variant="outlined"
                className={classes.formControl}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<Save />}
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
