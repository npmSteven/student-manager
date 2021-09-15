import { ReactElement, useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Loader } from '../../../components/loader/Loader';
import {
  addMeeting,
  getMeeting,
  updateMeeting,
} from '../../../services/meetings.service';
import { getCurrencies } from '../../../services/selects.service';
import { getStudentsNames } from '../../../services/students.service';
import { getTutorsNames } from '../../../services/tutors.service';
import { MeetingsAddEditView } from './MeetingsAddEditView';

export const MeetingsAddEdit = ({ match }): ReactElement => {
  const { id } = match.params;
  const isEdit: boolean = !!id;

  const history = useHistory();

  // State
  const [isLoadingState, setIsLoadingState] = useState(true);
  const [studentNamesState, setStudentNamesState] = useState([]);
  const [tutorsState, setTutorsState] = useState([]);
  const [currenciesState, setCurrenciesState] = useState([]);
  const [meetingState, setMeetingState] = useState({
    tutorId: '',
    studentId: '',
    periodStart: DateTime.local(),
    periodEnd: DateTime.local().plus({ minutes: 50 }),
    currency: 'GBP',
    didShow: false,
    didFillTutorEvaluationSheet: false,
    didFillStudentEvaluationSheet: false,
    topicsCovered: '',
    notes: '',
  });

  useEffect(() => {
    (async () => {
      try {
        const promisesArr = [
          getTutorsNames(),
          getStudentsNames(),
          getCurrencies(),
        ];
        if (isEdit) promisesArr.push(getMeeting(id));
        const [tutors, studentsNames, currencies, meeting] = await Promise.all(
          promisesArr
        );
        if (tutors.success) {
          setTutorsState(tutors.payload.docs);
        }
        if (studentsNames.success) {
          setStudentNamesState(studentsNames.payload.docs);
        }
        if (currencies.success) {
          setCurrenciesState(currencies.payload);
        }
        if (isEdit && meeting.success) {
          // Update period start and end to normal date format
          const updatedMeeting = { ...meeting.payload };
          updatedMeeting.periodStart = DateTime.fromSeconds(
            updatedMeeting.periodStart
          );
          updatedMeeting.periodEnd = DateTime.fromSeconds(
            updatedMeeting.periodEnd
          );
          setMeetingState(updatedMeeting);
        }
        setIsLoadingState(false);
      } catch (error) {
        console.error('ERROR - MeetingsAddEdit.tsx - useEffect():', error);
        setIsLoadingState(false);
      }
    })();
  }, []);

  const addEditMeeting = async (id: string, values: any) => {
    if (isEdit) return updateMeeting(id, values);
    return addMeeting(values);
  };

  const onSubmit = async (values) => {
    try {
      if (!values.periodStart || !values.periodEnd) return;
      setIsLoadingState(true);
      // Convert periodStart and periodEnd to timestamps
      const newValues = { ...values };
      newValues.periodStart = newValues.periodStart.toSeconds();
      newValues.periodEnd = newValues.periodEnd.toSeconds();

      const newMeeting = await addEditMeeting(id, newValues);
      if (newMeeting.success) {
        history.push('/meetings');
        toast.success(`${isEdit ? 'Updated' : 'Added'} Meeting`);
        return null;
      }
      setMeetingState(values);
      setIsLoadingState(false);
    } catch (error) {
      console.error('ERROR - MeetingsAddEdit.tsx - onSubmit():', error);
      setIsLoadingState(false);
    }
  };

  return (
    <Loader
      isLoading={isLoadingState}
      component={
        <MeetingsAddEditView
          isEdit={isEdit}
          meeting={meetingState}
          tutors={tutorsState}
          studentNames={studentNamesState}
          currencies={currenciesState}
          onSubmit={onSubmit}
        />
      }
    />
  );
};
