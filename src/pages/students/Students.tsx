import { useState } from 'react';
import { useEffect } from 'react';
import { ReactElement } from 'react';
import { Loader } from '../../components/loader/Loader';
import { getStudents } from '../../services/students.service';
import { StudentsView } from './StudentsView';

export const Students = (): ReactElement => {

  const [isLoading, setIsLoading] = useState(true);
  const [studentsState, setStudentsState] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const students = await getStudents();
        if (students.success) {
          setStudentsState(students.payload);
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
      component={<StudentsView students={studentsState} />}
    />
  );
};
