import { useEffect } from 'react';
import { useState } from 'react';
import { ReactElement } from 'react';
import { Loader } from '../../components/loader/Loader';
import { getTutors } from '../../services/tutors.service';

import { TutorsView } from './TutorsView';

export const Tutors = (): ReactElement => {
  const [isLoading, setIsLoading] = useState(true);
  const [tutorsState, setTutorsState] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const tutors = await getTutors();
        if (tutors.success) {
          setTutorsState(tutors.payload);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('ERROR - Tutors.tsx - useEffect():', error);
      }
    })();
  }, []);

  return <Loader isLoading={isLoading} component={<TutorsView tutors={tutorsState} />} />;
};
