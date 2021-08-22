import { useState } from "react";
import { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader } from "../../../components/loader/Loader";
import { updateClassTypes } from "../../../redux/slices/classTypesSlice";
import { updateLocations } from "../../../redux/slices/locationsSlice";
import { addClass, getClass } from "../../../services/classes.service";
import { getClassTypes, getLocations } from "../../../services/selects.service";

import { ClassesAddView } from "./ClassesAddView";

export const ClassesAdd = (): ReactElement => {
  const history = useHistory();
  // State
  const [isLoadingState, setIsLoadingState] = useState(true);

  // Redux
  const dispatch = useDispatch();
  const locationsStore = useSelector((state: any) => state.locations);
  const classTypesStore = useSelector((state: any) => state.classTypes);

  useEffect(() => {
    (async () => {
      try {
        const [locations, classTypes] = await Promise.all([
          getLocations(),
          getClassTypes(),
        ])
        if (locations.success) {
          dispatch(updateLocations(locations.payload));
        }
        if (classTypes.success) {
          dispatch(updateClassTypes(classTypes.payload));
        }
        setIsLoadingState(false);
      } catch (error) {
        console.error('ERROR - ClassesAdd.tsx - useEffect():', error);
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
  
      const newClass = await addClass(newValues);
      setIsLoadingState(false);
      if (newClass.success) {
        toast.success('Added Class');
        history.push('/classes');
      }
    } catch (error) {
      console.error('ERROR - ClassesAdd.tsx - onSubmit():', error);
      setIsLoadingState(false);
    }
  }

  return (
    <Loader
      isLoading={isLoadingState}
      component={
        <ClassesAddView locations={locationsStore} classTypes={classTypesStore} onSubmit={onSubmit} />
      }
    />
  );
};
