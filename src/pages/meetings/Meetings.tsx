import { useState } from 'react';
import { useEffect } from 'react';
import { ReactElement } from 'react';
import { Loader } from '../../components/loader/Loader';
import { getMeetings } from '../../services/meetings.service';
import { MeetingsView } from './MeetingsView';

export const Meetings = (): ReactElement => {
  const [isLoading, setIsLoading] = useState(true);
  const [meetingsState, setMeetingsState] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const meetings = await getMeetings();
        if (meetings.success) {
          setMeetingsState(meetings.payload);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('ERROR - Meetings.tsx - useEffect():', error);
      }
    })();
  }, []);

  return (
    <Loader
      isLoading={isLoading}
      component={<MeetingsView meetings={meetingsState} />}
    />
  );
};
