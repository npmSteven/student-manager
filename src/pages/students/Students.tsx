import { useState } from 'react';
import { useEffect } from 'react';
import { ReactElement } from 'react';
import { Loader } from '../../components/loader/Loader';
import { parallelPromise } from '../../services/api.service';
import { getClasses } from '../../services/classes.service';
import { getStudents } from '../../services/students.service';
import { getTutors } from '../../services/tutors.service';
import { StudentsView } from './StudentsView';

export const Students = (): ReactElement => {

  const [isLoading, setIsLoading] = useState(true);
  const [studentsState, setStudentsState] = useState([]);
  const [tutorsState, setTutorsState] = useState([]);
  const [classesState, setClassesState] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const {
          students,
          tutors,
          classes,
        } = await parallelPromise({
          students: getStudents(),
          tutors: getTutors(),
          classes: getClasses(),
        });
        if (students.success) {
          setStudentsState(students.payload.docs);
        }
        if (tutors.success) {
          setTutorsState(tutors.payload.docs);
        }
        if (classes.success) {
          setClassesState(classes.payload.docs);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('ERROR - Students.tsx - useEffect():', error);
      }
    })();
  }, []);

  return (
    <Loader
      isLoading={isLoading}
      component={<StudentsView students={studentsState} tutors={tutorsState} classes={classesState} />}
    />
  );
};
