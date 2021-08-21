import { Field, Form, Formik } from "formik";
import moment from "moment";
import { ReactElement } from "react";
import { Link } from "react-router-dom";

export const MeetingsAddView = ({
  onSubmit,
  classCodes,
}): ReactElement => {
  return (
    <div>
      <h1>Meetings Add</h1>
      <Link to="/meetings">
        <button>Back</button>
      </Link>
      <Formik
        initialValues={{
          tutorId: '',
          studentId: '',
          periodStart: moment(new Date()),
          periodEnd: moment(new Date()).add(50, 'minutes'),
          currency: 'GBP',
        }}
        onSubmit={onSubmit}
      >
        {({ values }) => (
          <Form>
            <label>
              Location:
              <Field name="tutorId" as="select">
                <option value='None selected'>None selected</option>
                {classCodes.map(c => <option value={c._id} key={c._id}>{c.classCode}</option>)}
              </Field>
            </label>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
