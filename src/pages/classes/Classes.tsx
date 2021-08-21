import { ReactElement, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Loader } from '../../components/loader/Loader';
import { updateClassesParams } from '../../redux/slices/classesParamsSlice';
import { updateClasses } from '../../redux/slices/classesSlice';
import { deleteClass, getClasses } from '../../services/classes.service';
import { ClassesView } from './ClassesView';

export const Classes = (): ReactElement => {
  const history = useHistory();

  // State
  const [isLoadingState, setIsLoadingState] = useState(true);

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
        setIsLoadingState(false);
      } catch (error) {
        console.error('ERROR - Classes.tsx - useEffect():', error);
      }
    })();
  }, []);

  const readClass = (id) => history.push(`/classes/read/${id}`);

  const editClass = (id) => history.push(`/classes/edit/${id}`);

  const deleteClassUi = async (id) => {
    try {
      setIsLoadingState(true);
      const deletedClass = await deleteClass(id);
      if (deletedClass.success) {
        const classes = await getClasses(classesParamsStore);
        if (classes.success) {
          dispatch(updateClasses(classes.payload));
        }
      }
      setIsLoadingState(false);
    } catch (error) {
      console.error('ERROR - deleteClassUi():', error);
      setIsLoadingState(false);
    }
  };

  return (
    <Loader
      isLoading={isLoadingState}
      component={
        <ClassesView
          classes={classesStore}
          getData={getClasses}
          updateData={updateClasses}
          params={classesParamsStore}
          updateParams={updateClassesParams}
          deleteClassUi={deleteClassUi}
          readClass={readClass}
          editClass={editClass}
        />
      }
    />
  );
};
