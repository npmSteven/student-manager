import { Field, Form, Formik } from "formik";
import moment from "moment";
import { ReactElement } from "react";
import { Link } from "react-router-dom";
import Datetime from 'react-datetime';

export const MeetingsEditView = ({
  onSubmit,
  tutorNames,
  studentNames,
  currencies,
  meeting,
}): ReactElement => {
  return (
    <div>
      <h1>Meetings Edit</h1>
      <Link to="/meetings">
        <button>Back</button>
      </Link>
      <Formik
        initialValues={meeting}
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
                <option value='None selected'>None selected</option>
                {tutorNames.map(t => <option value={t._id} key={t._id}>{t.firstName} {t.lastName}</option>)}
              </Field>
            </label>
            <label>
              Student:
              <Field name="studentId" as="select">
                <option value='None selected'>None selected</option>
                {studentNames.map(s => <option value={s._id} key={s._id}>{s.firstName} {s.lastName}</option>)}
              </Field>
            </label>
            <label>
              Period Start:
              <Field
                name="periodStart"
                render={() => (
                  <Datetime onChange={(e) => setFieldValue('periodStart', e)} value={values.periodStart} />
                )}
              />
            </label>
            <label>
              Period End:
              <Field
                name="periodEnd"
                render={() => (
                  <Datetime onChange={(e) => setFieldValue('periodEnd', e)} value={values.periodEnd} />
                )}
              />
            </label>
            <label>
              Currency:
              <Field name="currency" as="select">
                <option value='None selected'>None selected</option>
                {currencies.map(c => <option value={c} key={c}>{c}</option>)}
              </Field>
            </label>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
