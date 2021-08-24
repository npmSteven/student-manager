import { ReactElement, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader } from "../../../components/loader/Loader";
import { updateTimezones } from "../../../redux/slices/timezonesSlice";
import { getClassesClassCode } from "../../../services/classes.service";
import { getTimezones } from "../../../services/selects.service";
import { addStudent, getStudent, updateStudent } from "../../../services/students.service";
import { getTutorsNames } from "../../../services/tutors.service";

import { StudentsEditView } from "./StudentsEditView";

export const StudentsEdit = ({ match }): ReactElement => {
  const { id } = match.params;

  const history = useHistory();

  // State
  const [isLoadingState, setIsLoadingState] = useState(true);
  const [classCodesState, setClassCodesState] = useState([]);
  const [tutorNamesState, setTutorNamesState] = useState([]);
  const [studentState, setStudentState] = useState({});

  // Redux
  const dispatch = useDispatch();
  const timezonesStore = useSelector((state: any) => state.timezones);

  useEffect(() => {
    (async () => {
      try {
        const [classCodes, tutorNames, timezones, student] = await Promise.all([
          getClassesClassCode(),
          getTutorsNames(),
          getTimezones(),
          getStudent(id),
        ]);
        
        if (classCodes.success) {
          setClassCodesState(classCodes.payload.docs);
        }

        if (tutorNames.success) {
          setTutorNamesState(tutorNames.payload.docs);
        }

        if (timezones.success) {
          dispatch(updateTimezones(timezones.payload));
        }
        
        if (student.success) {
          setStudentState(student.payload);
        }

        setIsLoadingState(false);
      } catch (error) {
        console.error('ERROR - StudentsEdit.tsx - useEffect():', error);
        setIsLoadingState(false);
      }
    })();
  }, []);

  const onSubmit = async (values) => {
    try {
      setIsLoadingState(true);

      const updatedStudent = await updateStudent(id, values);
      setIsLoadingState(false);
      if (updatedStudent.success) {
        history.push('/students');
        toast.success('Updated Student');
      }
    } catch (error) {
      console.error('ERROR - StudentsEdit.tsx - onSubmit():', error);
      setIsLoadingState(false);
    }
  }

  return (
    <Loader
      isLoading={isLoadingState}
      component={
        <StudentsEditView
          student={studentState}
          timezones={timezonesStore}
          tutors={tutorNamesState}
          classCodes={classCodesState}
          onSubmit={onSubmit}
        />
      }
    />
  );
}
