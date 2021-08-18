import { useDispatch } from 'react-redux';
import { useTable } from 'react-table';

import { TableView } from './TableView';

export const Table = ({ columns, data, getData, updateData, params }: any) => {
  const dispatch = useDispatch();

  const table = useTable({
    columns,
    data: data.docs,
  });

  const nextPage = async () => {
    if (data.hasNextPage) {
      const newData = await getData({ ...params, page: data.nextPage });
      if (newData.success) {
        dispatch(updateData(newData.payload));
      }
    }
  }

  const prevPage = async () => {
    if (data.hasPrevPage) {
      const newData = await getData({ ...params, page: data.prevPage });
      if (newData.success) {
        dispatch(updateData(newData.payload));
      }
    }
  }

  return (
    <TableView
      table={table}
      data={data}
      nextPage={nextPage}
      prevPage={prevPage}
    />
  );
};
