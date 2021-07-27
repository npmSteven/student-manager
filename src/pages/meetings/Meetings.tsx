import { useState } from 'react';
import { useEffect } from 'react';
import { ReactElement } from 'react';
import { Loader } from '../../components/loader/Loader';
import { parallelPromise } from '../../services/api.service';
import { getMeetings } from '../../services/meetings.service';
import { getStudents } from '../../services/students.service';
import { getTutors } from '../../services/tutors.service';
import { MeetingsView } from './MeetingsView';

export const Meetings = (): ReactElement => {
  const [isLoading, setIsLoading] = useState(true);
  const [meetingsState, setMeetingsState] = useState([]);
  const [tutorsState, setTutorsState] = useState([]);
  const [studentsState, setStudentsState] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const {
          meetings,
          tutors,
          students,
        } = await parallelPromise({
          meetings: getMeetings(),
          tutors: getTutors(),
          students: getStudents(),
        });
        if (meetings.success) {
          setMeetingsState(meetings.payload.docs);
        }
        if (tutors.success) {
          setTutorsState(tutors.payload.docs);
        }
        if (students.success) {
          setStudentsState(students.payload.docs);
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
      component={<MeetingsView meetings={meetingsState} tutors={tutorsState} students={studentsState} />}
    />
  );
};
