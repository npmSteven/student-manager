import { useState, useEffect, ReactElement } from 'react';

import { Loader } from '../../components/loader/Loader';
import { getMeetings } from '../../services/meetings.service';
import { getStudentsBulk } from '../../services/students.service';
import { getTutorsBulk } from '../../services/tutors.service';
import { MeetingsView } from './MeetingsView';

export const Meetings = (): ReactElement => {
  const [isLoading, setIsLoading] = useState(true);
  const [meetingsState, setMeetingsState] = useState([]);
  const [tutorsState, setTutorsState] = useState([]);
  const [studentsState, setStudentsState] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        // Get meetings
        const response = await getMeetings();
        if (!response.success) {
          setIsLoading(false);
          return;
        }
        const meetings = response.payload.docs;
        setMeetingsState(meetings);

        // Check if there are any meetings
        if (!meetings.length) {
          setIsLoading(false);
          return;
        }

        // Check if there are any tutors
        const tutorIds = Array.from(
          new Set(meetings.map(({ tutorId }) => tutorId))
        );
        if (tutorIds.length) {
          const tutors = await getTutorsBulk(tutorIds);
          if (tutors.success) {
            setTutorsState(tutors.payload);
          }
        }

        // Check if there are any students
        const studentIds = Array.from(
          new Set(meetings.map(({ studentId }) => studentId))
        );
        if (studentIds.length) {
          const students = await getStudentsBulk(studentIds);
          if (students.success) {
            setStudentsState(students.payload);
          }
        }

        setIsLoading(false);
      } catch (error) {
        console.error('ERROR - Meetings.tsx - useEffect():', error);
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <Loader
      isLoading={isLoading}
      component={
        <MeetingsView
          meetings={meetingsState}
          tutors={tutorsState}
          students={studentsState}
        />
      }
    />
  );
};
