import { useEffect } from 'react';
import { useState } from 'react';
import { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../../components/loader/Loader';
import { updateTutorsParams } from '../../redux/slices/tutorsParamsSlice';
import { updateTutors } from '../../redux/slices/tutorsSlice';
import { getTutors } from '../../services/tutors.service';

import { TutorsView } from './TutorsView';

export const Tutors = (): ReactElement => {
  const [isLoading, setIsLoading] = useState(true);

  // Redux
  const dispatch = useDispatch();
  const tutorsStore = useSelector((state: any) => state.tutors);
  const tutorsParamsStore = useSelector((state: any) => state.tutorsParams);

  useEffect(() => {
    (async () => {
      try {
        const tutors = await getTutors(tutorsParamsStore);
        if (tutors.success) {
          dispatch(updateTutors(tutors.payload));
        }
        setIsLoading(false);
      } catch (error) {
        console.error('ERROR - Tutors.tsx - useEffect():', error);
      }
    })();
  }, []);

  return (
    <Loader
      isLoading={isLoading}
      component={
        <TutorsView
          tutors={tutorsStore}
          getData={getTutors}
          updateData={updateTutors}
          params={tutorsParamsStore}
          updateParams={updateTutorsParams}
        />
      }
    />
  );
};
