import { useState, useEffect, ReactElement } from 'react';

import { Loader } from '../../components/loader/Loader';
import { getClassesBulk } from '../../services/classes.service';
import { getStudents } from '../../services/students.service';
import { getTutorsBulk } from '../../services/tutors.service';
import { StudentsView } from './StudentsView';

export const Students = (): ReactElement => {
  const [isLoading, setIsLoading] = useState(true);
  const [studentsState, setStudentsState] = useState([]);
  const [tutorsState, setTutorsState] = useState([]);
  const [classesState, setClassesState] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getStudents();
        if (!response.success) {
          setIsLoading(false);
          return;
        }
        const students = response.payload.docs;
        setStudentsState(students);

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
          students={studentsState}
          tutors={tutorsState}
          classes={classesState}
        />
      }
    />
  );
};
