import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import moment from "moment";
import Datetime from 'react-datetime';

import './ClassesAddStyles.css';

export const ClassesAddView = ({
  locations,
  classTypes,
  onSubmit,
}): ReactElement => {

  return (
    <div
      style={{
        padding: 10,
      }}
    >
      <h1>Classes Add</h1>
      <Link to="/classes">
        <button>Back</button>
      </Link>
      <Formik
        initialValues={{
          classCode: '',
          periodStart: moment(new Date()),
          periodEnd: moment(new Date()).add(50, 'minutes'),
          classType: '',
          location: '',
          university: '',
        }}
        onSubmit={onSubmit}
      >
        {({values, setFieldValue }) => (
          <Form
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <label>
              Class Code:
              <Field name="classCode" />
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
              Location:
              <Field name="location" as="select">
                <option value='None selected'>None selected</option>
                {locations.map(l => <option value={l} key={l}>{l}</option>)}
              </Field>
            </label>
            <label>
              Class Type:
              <Field name="classType" as="select">
                <option value='None selected'>None selected</option>
                {classTypes.map(c => <option value={c} key={c}>{c}</option>)}
              </Field>
            </label>
            <label>
              University:
              <Field name="university" />
            </label>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
