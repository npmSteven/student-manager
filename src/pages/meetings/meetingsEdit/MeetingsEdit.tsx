import moment from 'moment';
import { ReactElement, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loader } from '../../../components/loader/Loader';
import { getMeeting, updateMeeting } from '../../../services/meetings.service';
import { getCurrencies } from '../../../services/selects.service';
import { getStudentsNames } from '../../../services/students.service';
import { getTutorsNames } from '../../../services/tutors.service';
import { MeetingsEditView } from './MeetingsEditView';

export const MeetingsEdit = ({ match }): ReactElement => {
  const { id } = match.params;

  const history = useHistory();

  // State
  const [isLoadingState, setIsLoadingState] = useState(true);
  const [studentNamesState, setStudentNamesState] = useState([]);
  const [tutorNamesState, setTutorNamesState] = useState([]);
  const [currenciesState, setCurrenciesState] = useState([]);
  const [meetingState, setMeetingState] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const [tutorNames, studentsNames, currencies, meeting] =
          await Promise.all([
            getTutorsNames(),
            getStudentsNames(),
            getCurrencies(),
            getMeeting(id),
          ]);
        if (tutorNames.success) {
          setTutorNamesState(tutorNames.payload.docs);
        }
        if (studentsNames.success) {
          setStudentNamesState(studentsNames.payload.docs);
        }
        if (currencies.success) {
          setCurrenciesState(currencies.payload);
        }
        if (meeting.success) {
          // Update period start and end to normal date format
          const updatedMeeting = {...meeting.payload};
          updatedMeeting.periodStart = moment.unix(updatedMeeting.periodStart);
          updatedMeeting.periodEnd = moment.unix(updatedMeeting.periodEnd);
          setMeetingState(updatedMeeting);
        }
        setIsLoadingState(false);
      } catch (error) {
        console.error('ERROR - MeetingsEdit.tsx - useEffect():', error);
        setIsLoadingState(false);
      }
    })();
  }, []);

  const onSubmit = async (values) => {
    try {
      if (!values.periodStart || !values.periodEnd) return;
      setIsLoadingState(true);
      // Convert periodStart and periodEnd to timestamps
      const newValues = { ...values };
      newValues.periodStart = newValues.periodStart.unix();
      newValues.periodEnd = newValues.periodEnd.unix();

      const newMeeting = await updateMeeting(id, newValues);
      setIsLoadingState(false);
      if (newMeeting.success) {
        history.push('/meetings');
        toast.success('Updated Meeting');
      }
    } catch (error) {
      console.error('ERROR - MeetingsEdit.tsx - onSubmit():', error);
      setIsLoadingState(false);
    }
  };

  return (
    <Loader
      isLoading={isLoadingState}
      component={
        <MeetingsEditView
          meeting={meetingState}
          tutorNames={tutorNamesState}
          studentNames={studentNamesState}
          currencies={currenciesState}
          onSubmit={onSubmit}
        />
      }
    />
  );
};
