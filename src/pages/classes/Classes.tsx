import { useState } from 'react';
import { useEffect } from 'react';
import { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../../components/loader/Loader';
import { updateClassesParams } from '../../redux/slices/classesParamsSlice';
import { updateClasses } from '../../redux/slices/classesSlice';
import { getClasses } from '../../services/classes.service';
import { ClassesView } from './ClassesView';

export const Classes = (): ReactElement => {
  // State
  const [isLoading, setIsLoading] = useState(true);

  // Redux
  const dispatch = useDispatch();
  const classesStore = useSelector((state: any) => state.classes);
  const classesParamsStore = useSelector((state: any) => state.classesParams);

  useEffect(() => {
    (async () => {
      try {
        const classes = await getClasses(classesParamsStore);
        if (classes.success) {
          dispatch(updateClasses(classes.payload));
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
      component={<ClassesView classes={classesStore} getData={getClasses} updateData={updateClasses} params={classesParamsStore} updateParams={updateClassesParams} />}
    />
  );
};
