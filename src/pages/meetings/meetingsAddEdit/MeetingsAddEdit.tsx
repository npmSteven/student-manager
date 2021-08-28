import moment from 'moment';
import { ReactElement, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loader } from '../../../components/loader/Loader';
import { addMeeting, getMeeting, updateMeeting } from '../../../services/meetings.service';
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
  const [tutorNamesState, setTutorNamesState] = useState([]);
  const [currenciesState, setCurrenciesState] = useState([]);
  const [meetingState, setMeetingState] = useState({
    tutorId: '',
    studentId: '',
    periodStart: moment(new Date()),
    periodEnd: moment(new Date()).add(50, 'minutes'),
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
        if(isEdit) promisesArr.push(getMeeting(id));
        const [tutorNames, studentsNames, currencies, meeting] =
          await Promise.all(promisesArr);
        if (tutorNames.success) {
          setTutorNamesState(tutorNames.payload.docs);
        }
        if (studentsNames.success) {
          setStudentNamesState(studentsNames.payload.docs);
        }
        if (currencies.success) {
          setCurrenciesState(currencies.payload);
        }
        if (isEdit && meeting.success) {
          // Update period start and end to normal date format
          const updatedMeeting = {...meeting.payload};
          updatedMeeting.periodStart = moment.unix(updatedMeeting.periodStart);
          updatedMeeting.periodEnd = moment.unix(updatedMeeting.periodEnd);
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
    if (isEdit) return await updateMeeting(id, values);
    else return await addMeeting(values);
  }

  const onSubmit = async (values) => {
    try {
      if (!values.periodStart || !values.periodEnd) return;
      setIsLoadingState(true);
      // Convert periodStart and periodEnd to timestamps
      const newValues = { ...values };
      newValues.periodStart = newValues.periodStart.unix();
      newValues.periodEnd = newValues.periodEnd.unix();

      console.log(newValues);
      
      const newMeeting = await addEditMeeting(id, newValues);
      setIsLoadingState(false);
      if (newMeeting.success) {
        history.push('/meetings');
        toast.success(isEdit ? 'Updated Meeting' : 'Added Meeting');
      }
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
