import { ReactElement } from 'react';

export const MeetingsView = ({
  meetings
}): ReactElement => {
  return (
    <div>
      <h1>Meetings</h1>
      {meetings.map(({ _id, periodStart, periodEnd }) => (
        <p key={_id}>Period Start: {periodStart} - Period End: {periodEnd}</p>
      ))}
    </div>
  );
};
