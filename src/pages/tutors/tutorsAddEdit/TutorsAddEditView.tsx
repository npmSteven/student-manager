import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { Button, createStyles, FormControl, InputLabel, makeStyles, MenuItem, Select, Theme } from '@material-ui/core';
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

export const TutorsAddEditView = ({
  isEdit,
  tutor,
  currencies,
  onSubmit,
}): ReactElement => {
  const classes = useStyles();

  return (
    <div
      style={{
        padding: 10,
      }}
    >
      <h1>Tutors {isEdit ? 'Edit' : 'Add'}</h1>
      <Link to="/tutors" style={{ textDecoration: 'none' }}>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<Undo />}
        >
          Back
        </Button>
      </Link>
      <Formik
        className={classes.root}
        initialValues={tutor}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className={classes.form}>
            <Field
              component={TextField}
              name="firstName"
              label="First Name"
              required
              variant="outlined"
              className={classes.formControl}
            />
            <Field
              component={TextField}
              name="middleName"
              label="Middle Name"
              variant="outlined"
              className={classes.formControl}
            />
            <Field
              component={TextField}
              name="lastName"
              label="Last Name"
              required
              variant="outlined"
              className={classes.formControl}
            />
            <Field
              component={TextField}
              name="email"
              label="Email"
              required
              variant="outlined"
              className={classes.formControl}
            />
            <FormControl variant="outlined" className={classes.formControl} required>
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
            <Field
              component={TextField}
              name="hourlyRate"
              label="Hourly Rate"
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
    </div>
  );
}
