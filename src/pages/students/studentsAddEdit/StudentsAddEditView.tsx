import { Field, Form, Formik } from 'formik';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

export const StudentsAddEditView = ({
  student,
  timezones,
  tutors,
  classCodes,
  onSubmit,
}): ReactElement => {
  return (
    <div>
      <h1>Students Edit</h1>
      <Link to="/students">
        <button>Back</button>
      </Link>
      <Formik
        initialValues={student}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <label>
              Tutor:
              <Field name="tutorId" as="select">
                <option value="None selected">None selected</option>
                {tutors.map(({ _id, firstName, lastName }) => (
                  <option value={_id} key={_id}>
                    {firstName} {lastName}
                  </option>
                ))}
              </Field>
            </label>
            <label>
              Class:
              <Field name="classId" as="select">
                <option value="None selected">None selected</option>
                {classCodes.map(({ _id, classCode }) => (
                  <option value={_id} key={_id}>
                    {classCode}
                  </option>
                ))}
              </Field>
            </label>
            <label>
              Timezone:
              <Field name="timezone" as="select">
                <option value="None selected">None selected</option>
                {timezones.map((t) => (
                  <option value={t} key={t}>
                    {t}
                  </option>
                ))}
              </Field>
            </label>
            <label>
              First Name:
              <Field name="firstName" />
            </label>
            <label>
              Middle Name:
              <Field name="middleName" />
            </label>
            <label>
              Last Name:
              <Field name="lastName" />
            </label>
            <label>
              Email:
              <Field name="email" />
            </label>
            <label>
              Withdraw:
              <Field
                name="didWithdraw"
                render={() => (
                  <input
                    type="checkbox"
                    checked={values.didWithdraw}
                    onChange={() =>
                      setFieldValue('didWithdraw', !values.didWithdraw)
                    }
                  />
                )}
              />
            </label>
            <label>
              Defer:
              <Field
                name="didDefer"
                render={() => (
                  <input
                    type="checkbox"
                    checked={values.didDefer}
                    onChange={() => setFieldValue('didDefer', !values.didDefer)}
                  />
                )}
              />
            </label>
            <label>
              Slack Invite:
              <Field
                name="didSendSlackInvite"
                render={() => (
                  <input
                    type="checkbox"
                    checked={values.didSendSlackInvite}
                    onChange={() =>
                      setFieldValue(
                        'didSendSlackInvite',
                        !values.didSendSlackInvite
                      )
                    }
                  />
                )}
              />
            </label>
            <label>
              Intro Email:
              <Field
                name="didSendIntroEmail"
                render={() => (
                  <input
                    type="checkbox"
                    checked={values.didSendIntroEmail}
                    onChange={() =>
                      setFieldValue(
                        'didSendIntroEmail',
                        !values.didSendIntroEmail
                      )
                    }
                  />
                )}
              />
            </label>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
