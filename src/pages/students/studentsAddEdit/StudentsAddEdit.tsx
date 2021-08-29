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
import { StudentsAddEditView } from "./StudentsAddEditView";

export const StudentsAddEdit = ({ match }): ReactElement => {
  const { id } = match.params;
  const isEdit: boolean = !!id;

  const history = useHistory();

  // State
  const [isLoadingState, setIsLoadingState] = useState(true);
  const [classCodesState, setClassCodesState] = useState([]);
  const [tutorNamesState, setTutorNamesState] = useState([]);
  const [studentState, setStudentState] = useState({
    tutorId: '',
    classId: '',
    firstName: '',
    lastName: '',
    email: '',
    timezone: 'Europe/London',
    didWithdraw: false,
    didDefer: false,
    didSendSlackInvite: false,
    didSendIntroEmail: false,
  });

  // Redux
  const dispatch = useDispatch();
  const timezonesStore = useSelector((state: any) => state.timezones);

  useEffect(() => {
    (async () => {
      try {
        const promiseArr = [
          getClassesClassCode(),
          getTutorsNames(),
          getTimezones(),
        ];
        if (isEdit){
          promiseArr.push(getStudent(id));
        }
        const [classCodes, tutorNames, timezones, student] = await Promise.all(promiseArr);
        if (classCodes.success) {
          setClassCodesState(classCodes.payload.docs);
        }

        if (tutorNames.success) {
          setTutorNamesState(tutorNames.payload.docs);
        }

        if (timezones.success) {
          dispatch(updateTimezones(timezones.payload));
        }
        
        if (isEdit && student.success) {
          setStudentState(student.payload);
        }

        setIsLoadingState(false);
      } catch (error) {
        console.error('ERROR - StudentsAddEdit.tsx - useEffect():', error);
        setIsLoadingState(false);
      }
    })();
  }, []);

  const addEditStudent = async (id: any, values: any) => {
    if (isEdit) return updateStudent(id, values);
    else return addStudent(values);
  }

  const onSubmit = async (values) => {
    try {
      setIsLoadingState(true);

      const newStudent = await addEditStudent(id, values);
      setIsLoadingState(false);
      if (newStudent.success) {
        history.push('/students');
        toast.success(isEdit ? 'Updated Student' : 'Added Student');
      }
    } catch (error) {
      console.error('ERROR - StudentsAddEdit.tsx - onSubmit():', error);
      setIsLoadingState(false);
    }
  }

  return (
    <Loader
      isLoading={isLoadingState}
      component={
        <StudentsAddEditView
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
