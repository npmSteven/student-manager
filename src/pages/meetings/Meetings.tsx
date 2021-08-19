import { useState, useEffect, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Loader } from '../../components/loader/Loader';
import { updateMeetingsParams } from '../../redux/slices/meetingsParamsSlice';
import { updateMeetings } from '../../redux/slices/meetingsSlice';
import { getMeetings } from '../../services/meetings.service';
import { getStudentsBulk } from '../../services/students.service';
import { getTutorsBulk } from '../../services/tutors.service';
import { MeetingsView } from './MeetingsView';

export const Meetings = (): ReactElement => {

  // State
  const [isLoading, setIsLoading] = useState(true);
  const [tutorsState, setTutorsState] = useState([]);
  const [studentsState, setStudentsState] = useState([]);

  // Redux
  const dispatch = useDispatch();
  const meetingsStore = useSelector((state: any) => state.meetings);
  const meetingsParamsStore = useSelector((state: any) => state.meetingsParams);

  useEffect(() => {
    (async () => {
      try {
        // Get meetings
        const response = await getMeetings(meetingsParamsStore);
        if (!response.success) {
          setIsLoading(false);
          return;
        }
        
        const meetings = response.payload.docs;
        dispatch(updateMeetings(response.payload));

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
          meetings={meetingsStore}
          tutors={tutorsState}
          students={studentsState}
          
          getData={getMeetings}
          updateData={updateMeetings}

          params={meetingsParamsStore}
          updateParams={updateMeetingsParams}
        />
      }
    />
  );
};
