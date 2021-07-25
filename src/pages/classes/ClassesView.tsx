import { ReactElement } from 'react';

export const ClassesView = ({
  classes
}): ReactElement => {
  return (
    <div>
      <h1>Classes:</h1>
      {classes.map(({ _id, classCode, classType }) => (
        <p key={_id}>{classCode} - {classType}</p>
      ))}
    </div>
  );
};
