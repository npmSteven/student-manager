import { ReactElement, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader } from "../../../components/loader/Loader";
import { getCurrencies } from "../../../services/selects.service";
import { addTutor, getTutor, updateTutor } from "../../../services/tutors.service";
import { TutorsAddEditView } from "./TutorsAddEditView";

export const TutorsAddEdit = ({ match }): ReactElement => {
  const { id } = match.params;
  const isEdit: boolean = !!id;

  const history = useHistory();

  // State
  const [isLoadingState, setIsLoadingState] = useState(true);
  const [currenciesState, setCurrenciesState] = useState([]);
  const [tutorState, setTutorState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    currency: 'GBP',
  });

  useEffect(() => {
    (async () => {
      try {
        const currencies = await getCurrencies();
        if (currencies.success) {
          setCurrenciesState(currencies.payload);
        }
        // Edit
        if (isEdit) {
          const tutor = await getTutor(id);
          if (tutor.success) {
            setTutorState(tutor.payload);
          }
          setIsLoadingState(false);
        }
        setIsLoadingState(false);
      } catch (error) {
        console.error('ERROR - TutorsAddEdit.tsx - useEffect():', error);
        setIsLoadingState(false);
      }
    })();
  }, []);

  const addEditTutor = async (id: any, values: any) => {
    if (isEdit) return updateTutor(id, values);
    return addTutor(values);
  }

  const onSubmit = async (values) => {
    try {
      setIsLoadingState(true);
      const newTutor = await addEditTutor(id, values);
      if (newTutor.success) {
        history.push('/tutors');
        toast.success(`${isEdit ? 'Updated' : 'Added'} Tutor`);
        return null;
      }
      setTutorState(values);
      setIsLoadingState(false);
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
          isEdit={isEdit}
          tutor={tutorState}
          currencies={currenciesState}
          onSubmit={onSubmit}
        />
      }
    />
  );
}


