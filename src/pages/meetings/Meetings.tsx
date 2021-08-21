import { useState, useEffect, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Loader } from '../../components/loader/Loader';
import { updateMeetingsParams } from '../../redux/slices/meetingsParamsSlice';
import { updateMeetings } from '../../redux/slices/meetingsSlice';
import { deleteMeeting, getMeetings } from '../../services/meetings.service';
import { getStudentsBulk } from '../../services/students.service';
import { getTutorsBulk } from '../../services/tutors.service';
import { MeetingsView } from './MeetingsView';

export const Meetings = (): ReactElement => {

  const history = useHistory();

  // State
  const [isLoadingState, setIsLoadingState] = useState(true);
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
          setIsLoadingState(false);
          return;
        }
        
        const meetings = response.payload.docs;
        dispatch(updateMeetings(response.payload));

        // Check if there are any meetings
        if (!meetings.length) {
          setIsLoadingState(false);
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

        setIsLoadingState(false);
      } catch (error) {
        console.error('ERROR - Meetings.tsx - useEffect():', error);
        setIsLoadingState(false);
      }
    })();
  }, []);

  const readMeeting = (id) => history.push(`/meetings/read/${id}`);

  const editMeeting = (id) => history.push(`/meetings/edit/${id}`);

  const deleteMeetingUi = async (id) => {
    try {
      setIsLoadingState(true);
      const deletedMeeting = await deleteMeeting(id);
      if (deletedMeeting.success) {
        const meetings = await getMeetings(meetingsParamsStore);
        if (meetings.success) {
          dispatch(updateMeetings(meetings.payload));
        }
      }
      setIsLoadingState(false);
    } catch (error) {
      console.error('ERROR - deleteMeetingUi():', error);
      setIsLoadingState(false);
    }
  };

  return (
    <Loader
      isLoading={isLoadingState}
      component={
        <MeetingsView
          meetings={meetingsStore}
          tutors={tutorsState}
          students={studentsState}

          editMeeting={editMeeting}
          readMeeting={readMeeting}
          deleteMeetingUi={deleteMeetingUi}
          
          getData={getMeetings}
          updateData={updateMeetings}

          params={meetingsParamsStore}
          updateParams={updateMeetingsParams}
        />
      }
    />
  );
};
