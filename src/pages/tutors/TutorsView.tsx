import { ReactElement } from 'react';

export const TutorsView = ({
  tutors
}): ReactElement => {
  return (
    <div>
      <h1>Tutors</h1>
      {tutors.map(({ _id, firstName, lastName }) => (
        <p key={_id}>{firstName} - {lastName}</p>
      ))}
    </div>
  );
};
