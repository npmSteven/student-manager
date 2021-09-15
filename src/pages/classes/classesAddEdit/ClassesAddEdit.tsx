import moment from "moment";
import { ReactElement, useState, useEffect } from "react";
import { DateTime } from "luxon";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader } from "../../../components/loader/Loader";
import { updateClassTypes } from "../../../redux/slices/classTypesSlice";
import { updateLocations } from "../../../redux/slices/locationsSlice";
import { addClass, getClass, updateClass } from "../../../services/classes.service";
import { getClassTypes, getLocations } from "../../../services/selects.service";
import { ClassesAddEditView } from "./ClassesAddEditView";

export const ClassesAddEdit = ({ match }): ReactElement => {
  const { id } = match.params;
  const isEdit: boolean = !!id;

  const history = useHistory();

  // State
  const [isLoadingState, setIsLoadingState] = useState(true);
  const [classState, setClassState] = useState({
    classCode: '',
    periodStart: DateTime.local(),
    periodEnd: DateTime.local().plus({months:6}),
    classType: '',
    location: '',
    university: '',
  });

  // Redux
  const dispatch = useDispatch();
  const locationsStore = useSelector((state: any) => state.locations);
  const classTypesStore = useSelector((state: any) => state.classTypes);

  useEffect(() => {
    (async () => {
      try {
        const promisesArr = [
          getLocations(),
          getClassTypes(),
        ];
        if (isEdit) promisesArr.push(getClass(id));
        const [locations, classTypes, foundClass] = await Promise.all(promisesArr)
        if (locations.success) {
          dispatch(updateLocations(locations.payload));
        }
        if (classTypes.success) {
          dispatch(updateClassTypes(classTypes.payload));
        }
        if (isEdit && foundClass.success) {
          // Update period start and end to normal date format
          const updatedFoundClass = { ...foundClass.payload };
          //Convert from unix to luxon DateTime
          updatedFoundClass.periodStart = DateTime.fromSeconds(updatedFoundClass.periodStart);
          updatedFoundClass.periodEnd = DateTime.fromSeconds(updatedFoundClass.periodEnd);
          setClassState(updatedFoundClass);
        }
        setIsLoadingState(false);
      } catch (error) {
        console.error('ERROR - ClassesAddEdit.tsx - useEffect():', error);
        setIsLoadingState(false);
      }
    })();
  }, []);

  const addEditClass = async (id: string, values: any) => {
    if (isEdit) return updateClass(id, values);
    return addClass(values);
  }

  const onSubmit = async (values) => {
    try {
      if (
        !values.periodStart ||
        !values.periodEnd
      ) return;
      setIsLoadingState(true);
      // Convert periodStart and periodEnd to timestamps
      const newValues = { ...values };
      newValues.periodStart = newValues.periodStart.toSeconds();
      newValues.periodEnd = newValues.periodEnd.toSeconds();

      const newClass = await addEditClass(id, newValues);
      if (newClass.success) {
        history.push('/classes');
        toast.success(`${isEdit ? 'Updated' : 'Added'} Class`);
        return null;
      }
      setClassState(values);
      setIsLoadingState(false);
    } catch (error) {
      console.error('ERROR - ClassesAddEdit.tsx - onSubmit():', error);
      setIsLoadingState(false);
    }
  }

  return (
    <Loader
      isLoading={isLoadingState}
      component={
        <ClassesAddEditView
          isEdit={isEdit}
          locations={locationsStore}
          classTypes={classTypesStore}
          foundClass={classState}
          onSubmit={onSubmit}
        />
      }
    />
  );
};
