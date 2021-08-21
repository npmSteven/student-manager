import { useState } from "react";
import { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Loader } from "../../../components/loader/Loader";
import { updateClassTypes } from "../../../redux/slices/classTypesSlice";
import { updateLocations } from "../../../redux/slices/locationsSlice";
import { addClass } from "../../../services/classes.service";
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
        console.error('ERROR - ClassesAdd - useEffect():', error);
        setIsLoadingState(false);
      }
    })();
  }, []);

  const onSubmit = async (values) => {
    try {
      if (
        !values.classCode ||
        !values.periodStart ||
        !values.periodEnd ||
        !values.classType ||
        !values.location ||
        !values.university
      ) return;
      setIsLoadingState(true);
      // Convert periodStart and periodEnd to timestamps
      values.periodStart = values.periodStart.unix();
      values.periodEnd = values.periodEnd.unix();
  
      // No point in updating redux store with new class as we will redirect them to classes which will do a get req
      await addClass(values);
      setIsLoadingState(false);
      history.push('/classes');
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
