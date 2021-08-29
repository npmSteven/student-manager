import { Field, Form, Formik } from 'formik';
import moment from 'moment';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import Datetime from 'react-datetime';

export const MeetingsAddEditView = ({
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
      <Formik initialValues={meeting} onSubmit={onSubmit}>
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
                {tutorNames.map((t) => (
                  <option value={t._id} key={t._id}>
                    {t.firstName} {t.lastName}
                  </option>
                ))}
              </Field>
            </label>
            <label>
              Student:
              <Field name="studentId" as="select">
                <option value="None selected">None selected</option>
                {studentNames.map((s) => (
                  <option value={s._id} key={s._id}>
                    {s.firstName} {s.lastName}
                  </option>
                ))}
              </Field>
            </label>
            <label>
              Period Start:
              <Field
                name="periodStart"
                render={() => (
                  <Datetime
                    onChange={(e) => setFieldValue('periodStart', e)}
                    value={values.periodStart}
                  />
                )}
              />
            </label>
            <label>
              Period End:
              <Field
                name="periodEnd"
                render={() => (
                  <Datetime
                    onChange={(e) => setFieldValue('periodEnd', e)}
                    value={values.periodEnd}
                  />
                )}
              />
            </label>
            <label>
              Currency:
              <Field name="currency" as="select">
                <option value="None selected">None selected</option>
                {currencies.map((c) => (
                  <option value={c} key={c}>
                    {c}
                  </option>
                ))}
              </Field>
            </label>
            <label>
              Show:
              <Field
                name="didShow"
                render={() => (
                  <input
                    type="checkbox"
                    checked={values.didShow}
                    onChange={() => setFieldValue('didShow', !values.didShow)}
                  />
                )}
              />
            </label>
            <label>
              Tutor Evaluation Sheet:
              <Field
                name="didFillTutorEvaluationSheet"
                render={() => (
                  <input
                    type="checkbox"
                    checked={values.didFillTutorEvaluationSheet}
                    onChange={() =>
                      setFieldValue(
                        'didFillTutorEvaluationSheet',
                        !values.didFillTutorEvaluationSheet
                      )
                    }
                  />
                )}
              />
            </label>
            <label>
              Student Evaluation Sheet:
              <Field
                name="didFillStudentEvaluationSheet"
                render={() => (
                  <input
                    type="checkbox"
                    checked={values.didFillStudentEvaluationSheet}
                    onChange={() =>
                      setFieldValue(
                        'didFillStudentEvaluationSheet',
                        !values.didFillStudentEvaluationSheet
                      )
                    }
                  />
                )}
              />
            </label>
            <label>
              Topics Covered
              <Field name="topicsCovered" as="textarea" />
            </label>
            <label>
              Notes
              <Field name="notes" as="textarea" />
            </label>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
