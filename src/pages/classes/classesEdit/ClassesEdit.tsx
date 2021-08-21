import moment from "moment";
import { ReactElement, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Loader } from "../../../components/loader/Loader";
import { updateClassTypes } from "../../../redux/slices/classTypesSlice";
import { updateLocations } from "../../../redux/slices/locationsSlice";
import { getClass, updateClass } from "../../../services/classes.service";
import { getClassTypes, getLocations } from "../../../services/selects.service";
import { ClassesEditView } from "./ClassesEditView";

export const ClassesEdit = ({ match }): ReactElement => {
  const { id } = match.params;
  
  // State
  const [isLoadingState, setIsLoadingState] = useState(true);
  const [classState, setClassState] = useState({});

  // Redux
  const dispatch = useDispatch();
  const locationsStore = useSelector((state: any) => state.locations);
  const classTypesStore = useSelector((state: any) => state.classTypes);

  useEffect(() => {
    (async () => {
      try {
        const [locations, classTypes, foundClass] = await Promise.all([
          getLocations(),
          getClassTypes(),
          getClass(id),
        ])
        if (locations.success) {
          dispatch(updateLocations(locations.payload));
        }
        if (classTypes.success) {
          dispatch(updateClassTypes(classTypes.payload));
        }
        if (foundClass.success) {
          // Update period start and end to normal date format
          const updatedFoundClass = {...foundClass.payload};
          updatedFoundClass.periodStart = moment.unix(updatedFoundClass.periodStart);
          updatedFoundClass.periodEnd = moment.unix(updatedFoundClass.periodEnd);
          setClassState(updatedFoundClass);
        }
        setIsLoadingState(false);
      } catch (error) {
        console.error('ERROR - ClassesEdit.tsx - useEffect():', error);
        setIsLoadingState(false);
      }
    })();
  }, []);

  const onSubmit = async (values) => {
    try {
      if (
        !values.periodStart ||
        !values.periodEnd
      ) return;
      setIsLoadingState(true);
      // Convert periodStart and periodEnd to timestamps
      const newValues = {...values};
      newValues.periodStart = newValues.periodStart.unix();
      newValues.periodEnd = newValues.periodEnd.unix();
  
      const newClass = await updateClass(id, newValues);
      setIsLoadingState(false);
      if (newClass.success) {
        toast.success('Updated');
      }
    } catch (error) {
      console.error('ERROR - ClassesEdit.tsx - onSubmit():', error);
      setIsLoadingState(false);
    }
  }

  return (
    <Loader
      isLoading={isLoadingState}
      component={
        <ClassesEditView locations={locationsStore} classTypes={classTypesStore} foundClass={classState} onSubmit={onSubmit} />
      }
    />
  );
};
