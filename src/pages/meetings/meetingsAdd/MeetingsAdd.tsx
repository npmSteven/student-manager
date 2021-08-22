import { useEffect } from 'react';
import { useState } from 'react';
import { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loader } from '../../../components/loader/Loader';
import { addMeeting } from '../../../services/meetings.service';
import { getCurrencies } from '../../../services/selects.service';
import { getStudentsNames } from '../../../services/students.service';
import { getTutorsNames } from '../../../services/tutors.service';

import { MeetingsAddView } from './MeetingsAddView';

export const MeetingsAdd = (): ReactElement => {
  const history = useHistory();

  // State
  const [isLoadingState, setIsLoadingState] = useState(true);
  const [studentNamesState, setStudentNamesState] = useState([]);
  const [tutorNamesState, setTutorNamesState] = useState([]);
  const [currenciesState, setCurrenciesState] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const [tutorNames, studentsNames, currencies] = await Promise.all([
          getTutorsNames(),
          getStudentsNames(),
          getCurrencies(),
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
        setIsLoadingState(false);
      } catch (error) {
        console.error('ERROR - MeetingsAdd.tsx - useEffect():', error);
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

      const newMeeting = await addMeeting(newValues);
      setIsLoadingState(false);
      if (newMeeting.success) {
        history.push('/meetings');
        toast.success('Added Meeting');
      }
    } catch (error) {
      console.error('ERROR - MeetingsAdd.tsx - onSubmit():', error);
      setIsLoadingState(false);
    }
  };

  return (
    <Loader
      isLoading={isLoadingState}
      component={
        <MeetingsAddView
          onSubmit={onSubmit}
          tutorNames={tutorNamesState}
          studentNames={studentNamesState}
          currencies={currenciesState}
        />
      }
    />
  );
};
