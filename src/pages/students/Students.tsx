import { useState, useEffect, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Loader } from '../../components/loader/Loader';
import { updateStudentsParams } from '../../redux/slices/studentsParamsSlice';
import { updateStudents } from '../../redux/slices/studentsSlice';
import { getClassesBulk } from '../../services/classes.service';
import { getStudents } from '../../services/students.service';
import { getTutorsBulk } from '../../services/tutors.service';
import { StudentsView } from './StudentsView';

export const Students = (): ReactElement => {
  // State
  const [isLoading, setIsLoading] = useState(true);
  const [tutorsState, setTutorsState] = useState([]);
  const [classesState, setClassesState] = useState([]);

  // Redux
  const dispatch = useDispatch();
  const studentsStore = useSelector((state: any) => state.students);
  const studentsParamsStore = useSelector((state: any) => state.studentsParams);

  useEffect(() => {
    (async () => {
      try {
        const response = await getStudents(studentsParamsStore);
        if (!response.success) {
          setIsLoading(false);
          return;
        }
        const students = response.payload.docs;
        dispatch(updateStudents(response.payload));

        if (!students.length) {
          setIsLoading(false);
          return;
        }

        const tutorIds = Array.from(
          new Set(students.map(({ tutorId }) => tutorId))
        );
        if (tutorIds.length) {
          const tutors = await getTutorsBulk(tutorIds);
          if (tutors.success) {
            setTutorsState(tutors.payload);
          }
        }

        const classIds = Array.from(
          new Set(students.map(({ classId }) => classId))
        );
        if (classIds.length) {
          const classes = await getClassesBulk(classIds);
          if (classes.success) {
            setClassesState(classes.payload);
          }
        }

        setIsLoading(false);
      } catch (error) {
        console.error('ERROR - Students.tsx - useEffect():', error);
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <Loader
      isLoading={isLoading}
      component={
        <StudentsView
          students={studentsStore}
          tutors={tutorsState}
          classes={classesState}
          getData={getStudents}
          updateData={updateStudents}
          params={studentsParamsStore}
          updateParams={updateStudentsParams}
        />
      }
    />
  );
};
