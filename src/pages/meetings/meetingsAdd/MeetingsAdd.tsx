import { useEffect } from 'react';
import { useState } from 'react';
import { ReactElement } from 'react';
import { getStudentsNamesByClass } from '../../../services/students.service';

import { MeetingsAddView } from './MeetingsAddView';

export const MeetingsAdd = (): ReactElement => {
  const [isLoadingState, setIsLoadingState] = useState(true);
  const [studentNamesState, setStudentNamesState] = useState([]);
  const [tutorNamesState, setTutorNamesState] = useState([]);

  useEffect(() => {
    (async () => {
      try {

        setIsLoadingState(false);
      } catch (error) {
        console.error('ERROR - MeetingsAdd.tsx - useEffect():', error);
        setIsLoadingState(false);
      }
    })();
  }, []);


  const onSubmit = (values) => {
    console.log(values);
  };

  return <MeetingsAddView onSubmit={onSubmit} classCodes={classCodesState} />;
};
