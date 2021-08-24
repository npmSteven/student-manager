import { useEffect } from "react";
import { ReactElement, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader } from "../../../components/loader/Loader";
import { getTutor, updateTutor } from "../../../services/tutors.service";
import { TutorsEditView } from "./TutorsEditView";

export const TutorsEdit = ({ match }): ReactElement => {
  const { id } = match.params;

  const history = useHistory();

  // State
  const [isLoadingState, setIsLoadingState] = useState(true);
  const [tutorState, setTutorState] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const tutor = await getTutor(id);
        if (tutor.success) {
          setTutorState(tutor.payload);
        }
        setIsLoadingState(false);
      } catch (error) {
        setIsLoadingState(false);
      }
    })();
  }, []);

  const onSubmit = async (values) => {
    try {
      setIsLoadingState(true);
      const newTutor = await updateTutor(id, values);
      setIsLoadingState(false);
      if (newTutor.success) {
        history.push('/tutors');
        toast.success('Added Tutor');
      }
    } catch (error) {
      console.error('ERROR - TutorsAdd.tsx - onSubmit():', error);
      setIsLoadingState(false);
    }
  };

  return (
    <Loader
      isLoading={isLoadingState}
      component={
        <TutorsEditView
          onSubmit={onSubmit}
          tutor={tutorState}
        />
      }
    />
  );
}
