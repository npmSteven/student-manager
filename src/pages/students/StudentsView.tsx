import { ReactElement } from 'react';

export const StudentsView = ({
  students
}): ReactElement => {
  return (
    <div>
      <h1>Students</h1>
      {students.map(({ _id, firstName, lastName }) => (
        <p key={_id}>{firstName} - {lastName}</p>
      ))}
    </div>
  );
};
