import { Field, Form, Formik } from 'formik';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Button, Checkbox, createStyles, FormControl, FormControlLabel, InputLabel, makeStyles, MenuItem, Select, Theme } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
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

export const StudentsAddEditView = ({
  isEdit,
  student,
  timezones,
  tutors,
  classCodes,
  onSubmit,
}): ReactElement => {
  const classes = useStyles();

  return (
    <div
      style={{
        padding: 10,
      }}
    >
      <h1>Students {isEdit ? 'Edit' : 'Add'}</h1>
      <Link to="/students" style={{ textDecoration: 'none' }}>
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
        initialValues={student}
        onSubmit={onSubmit}
      >
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
                {tutors.map(({ _id, firstName, lastName }) => (
                  <MenuItem value={_id} key={_id}>{firstName} {lastName}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="class-type-label">Class</InputLabel>
              <Select
                labelId="class-type-label"
                label="classId"
                name="classId"
                value={values.classId}
                onChange={(e) => (
                  setFieldValue("classId", e.target.value)
                )}
              >
                {classCodes.map(({ _id, classCode }) => (
                  <MenuItem value={_id} key={_id}>{classCode}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="class-type-label">Timezone</InputLabel>
              <Select
                labelId="class-type-label"
                label="timezone"
                name="timezone"
                value={values.timezone}
                onChange={(e) => (
                  setFieldValue("timezone", e.target.value)
                )}
              >
                {timezones.map((t) => (
                  <MenuItem value={t} key={t}>{t}</MenuItem>
                ))}
              </Select>
            </FormControl>

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

            <FormControl className={classes.formControl}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.didWithdraw}
                    onChange={() => (
                      setFieldValue('didWithdraw', !values.didWithdraw)
                    )}
                    name="didWithdraw"
                    color="primary"
                  />
                }
                label="Withdraw"
              />
            </FormControl>

            <FormControl className={classes.formControl}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.didDefer}
                    onChange={() => (
                      setFieldValue('didDefer', !values.didDefer)
                    )}
                    name="didDefer"
                    color="primary"
                  />
                }
                label="Defer"
              />
            </FormControl>

            <FormControl className={classes.formControl}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.didSendSlackInvite}
                    onChange={() => (
                      setFieldValue('didSendSlackInvite', !values.didSendSlackInvite)
                    )}
                    name="didSendSlackInvite"
                    color="primary"
                  />
                }
                label="Slack Invite"
              />
            </FormControl>

            <FormControl className={classes.formControl}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.didSendIntroEmail}
                    onChange={() => (
                      setFieldValue('didSendIntroEmail', !values.didSendIntroEmail)
                    )}
                    name="didSendIntroEmail"
                    color="primary"
                  />
                }
                label="Intro Email"
              />
            </FormControl>

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
};
