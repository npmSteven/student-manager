import { ReactElement, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader } from "../../../components/loader/Loader";
import { addTutor } from "../../../services/tutors.service";
import { TutorsAddView } from "./TutorsAddView";

export const TutorsAdd = (): ReactElement => {

  const history = useHistory();

  // State
  const [isLoadingState, setIsLoadingState] = useState(false);

  const onSubmit = async (values) => {
    try {
      setIsLoadingState(true);
      const newTutor = await addTutor(values);
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
        <TutorsAddView
          onSubmit={onSubmit}
        />
      }
    />
  );
}
