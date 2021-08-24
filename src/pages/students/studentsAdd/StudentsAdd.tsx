import { ReactElement, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader } from "../../../components/loader/Loader";
import { updateTimezones } from "../../../redux/slices/timezonesSlice";
import { getClassesClassCode } from "../../../services/classes.service";
import { getTimezones } from "../../../services/selects.service";
import { addStudent } from "../../../services/students.service";
import { getTutorsNames } from "../../../services/tutors.service";

import { StudentsAddView } from "./StudentsAddView";

export const StudentsAdd = (): ReactElement => {

  const history = useHistory();

  // State
  const [isLoadingState, setIsLoadingState] = useState(true);
  const [classCodesState, setClassCodesState] = useState([]);
  const [tutorNamesState, setTutorNamesState] = useState([]);

  // Redux
  const dispatch = useDispatch();
  const timezonesStore = useSelector((state: any) => state.timezones);

  useEffect(() => {
    (async () => {
      try {
        const [classCodes, tutorNames, timezones] = await Promise.all([
          getClassesClassCode(),
          getTutorsNames(),
          getTimezones(),
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

        setIsLoadingState(false);
      } catch (error) {
        console.error('ERROR - StudentsAdd.tsx - useEffect():', error);
        setIsLoadingState(false);
      }
    })();
  }, []);

  const onSubmit = async (values) => {
    try {
      setIsLoadingState(true);

      const newStudent = await addStudent(values);
      setIsLoadingState(false);
      if (newStudent.success) {
        history.push('/students');
        toast.success('Added Student');
      }
    } catch (error) {
      console.error('ERROR - StudentsAdd.tsx - onSubmit():', error);
      setIsLoadingState(false);
    }
  }

  return (
    <Loader
      isLoading={isLoadingState}
      component={
        <StudentsAddView
          timezones={timezonesStore}
          tutors={tutorNamesState}
          classCodes={classCodesState}
          onSubmit={onSubmit}
        />
      }
    />
  );
}
