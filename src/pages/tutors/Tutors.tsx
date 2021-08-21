import { useEffect } from 'react';
import { useState } from 'react';
import { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Loader } from '../../components/loader/Loader';
import { updateTutorsParams } from '../../redux/slices/tutorsParamsSlice';
import { updateTutors } from '../../redux/slices/tutorsSlice';
import { deleteTutor, getTutors } from '../../services/tutors.service';

import { TutorsView } from './TutorsView';

export const Tutors = (): ReactElement => {

  const history = useHistory();

  // State
  const [isLoadingState, setIsLoadingState] = useState(true);

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
        setIsLoadingState(false);
      } catch (error) {
        console.error('ERROR - Tutors.tsx - useEffect():', error);
      }
    })();
  }, []);

  
  const readTutor = (id) => history.push(`/tutors/read/${id}`);

  const editTutor = (id) => history.push(`/tutors/edit/${id}`);

  const deleteTutorUi = async (id) => {
    try {
      setIsLoadingState(true);
      const deletedTutor = await deleteTutor(id);
      if (deletedTutor.success) {
        const tutors = await getTutors(tutorsParamsStore);
        if (tutors.success) {
          dispatch(updateTutors(tutors.payload));
        }
      }
      setIsLoadingState(false);
    } catch (error) {
      console.error('ERROR - deleteTutorUi():', error);
      setIsLoadingState(false);
    }
  };

  return (
    <Loader
      isLoading={isLoadingState}
      component={
        <TutorsView
          tutors={tutorsStore}

          editTutor={editTutor}
          readTutor={readTutor}
          deleteTutorUi={deleteTutorUi}

          getData={getTutors}
          updateData={updateTutors}
          params={tutorsParamsStore}
          updateParams={updateTutorsParams}
        />
      }
    />
  );
};
