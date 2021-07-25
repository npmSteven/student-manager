import { useState } from 'react';
import { useEffect } from 'react';
import { ReactElement } from 'react';
import { Loader } from '../../components/loader/Loader';
import { getClasses } from '../../services/classes.service';
import { ClassesView } from './ClassesView';

export const Classes = (): ReactElement => {
  const [isLoading, setIsLoading] = useState(true);
  const [classesState, setClassesState] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const classes = await getClasses();
        if (classes.success) {
          setClassesState(classes.payload);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('ERROR - Classes.tsx - useEffect():', error);
      }
    })();
  }, []);

  return (
    <Loader
      isLoading={isLoading}
      component={<ClassesView classes={classesState} />}
    />
  );
};
