import { ReactElement } from 'react';
import { Field, Form, Formik } from 'formik';
import { Link } from 'react-router-dom';

export const TutorsAddEditView = ({
  tutor,
  onSubmit
}): ReactElement => {
  return (
    <div >
      <h1>Tutors Add</h1>
      <Link to="/tutors">
        <button>Back</button>
      </Link>
      <Formik
        initialValues={tutor}
        onSubmit={onSubmit}
      >
        {() => (
          <Form
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
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
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
