import { ReactElement, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader } from "../../../components/loader/Loader";
import { addTutor, getTutor, updateTutor } from "../../../services/tutors.service";
import { TutorsAddEditView } from "./TutorsAddEditView";

export const TutorsAddEdit = ({ match }): ReactElement => {
  const { id } = match.params;
  const isEdit = !!id;
  
  const history = useHistory();

  // State
  const [isLoadingState, setIsLoadingState] = useState(isEdit);
  const [tutorState, setTutorState] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  useEffect(() => {
    (async () => {
      try {
        if (isEdit) {
          const tutor = await getTutor(id);
          if (tutor.success) {
            setTutorState(tutor.payload);
          }
          setIsLoadingState(false);
        }
      } catch (error) {
        setIsLoadingState(false);
      }
    })();
  }, []);

  async function addEditTutor(id: any, values: any) {
    let newTutor;
    if (isEdit) newTutor = await updateTutor(id, values);
    else newTutor = await addTutor(values);
    return newTutor;
  }

  const onSubmit = async (values) => {
    try {
      setIsLoadingState(true);
      const newTutor = await addEditTutor(id, values);
      setIsLoadingState(false);
      if (newTutor.success) {
        history.push('/tutors');
        toast.success(isEdit ? 'Updated Tutor' : 'Added Tutor');
      }
    } catch (error) {
      console.error('ERROR - TutorsAddEdit.tsx - onSubmit():', error);
      setIsLoadingState(false);
    }
  };

  return (
    <Loader
      isLoading={isLoadingState}
      component={
        <TutorsAddEditView
          onSubmit={onSubmit}
          tutor={tutorState}
        />
      }
    />
  );
}

