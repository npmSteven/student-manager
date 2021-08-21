import { useState, useEffect, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Loader } from '../../components/loader/Loader';
import { updateStudentsParams } from '../../redux/slices/studentsParamsSlice';
import { updateStudents } from '../../redux/slices/studentsSlice';
import { getClassesBulk } from '../../services/classes.service';
import { deleteStudent, getStudents } from '../../services/students.service';
import { getTutorsBulk } from '../../services/tutors.service';
import { StudentsView } from './StudentsView';

export const Students = (): ReactElement => {

  const history = useHistory();

  // State
  const [isLoadingState, setIsLoadingState] = useState(true);
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
          setIsLoadingState(false);
          return;
        }
        const students = response.payload.docs;
        dispatch(updateStudents(response.payload));

        if (!students.length) {
          setIsLoadingState(false);
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

        setIsLoadingState(false);
      } catch (error) {
        console.error('ERROR - Students.tsx - useEffect():', error);
        setIsLoadingState(false);
      }
    })();
  }, []);

  const readStudent = (id) => history.push(`/students/read/${id}`);

  const editStudent = (id) => history.push(`/students/edit/${id}`);

  const deleteStudentUi = async (id) => {
    try {
      setIsLoadingState(true);
      const deletedStudent = await deleteStudent(id);
      if (deletedStudent.success) {
        const students = await getStudents(studentsParamsStore);
        if (students.success) {
          dispatch(updateStudents(students.payload));
        }
      }
      setIsLoadingState(false);
    } catch (error) {
      console.error('ERROR - deleteStudentUi():', error);
      setIsLoadingState(false);
    }
  };

  return (
    <Loader
      isLoading={isLoadingState}
      component={
        <StudentsView
          students={studentsStore}
          tutors={tutorsState}
          classes={classesState}

          editStudent={editStudent}
          readStudent={readStudent}
          deleteStudentUi={deleteStudentUi}

          getData={getStudents}
          updateData={updateStudents}
          params={studentsParamsStore}
          updateParams={updateStudentsParams}
        />
      }
    />
  );
};
