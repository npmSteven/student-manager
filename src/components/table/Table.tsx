import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTable } from 'react-table';

import { TableView } from './TableView';

export const Table = ({ columns, data, getData, updateData, params, updateParams }: any) => {
  const [limit, setLimit] = useState(params.limit);

  const dispatch = useDispatch();

  const table = useTable({
    columns,
    data: data.docs,
  });

  const changeLimit = async event => {
    const limit = event.target.value;
    setLimit(limit);
    const newParams = { ...params, limit };
    dispatch(updateParams(newParams));
    const newData = await getData(newParams);
    if (newData.success) {
      dispatch(updateData(newData.payload));
    }
  };

  const nextPage = async () => {
    if (data.hasNextPage) {
      const newParams = { ...params, page: data.nextPage };
      dispatch(updateParams(newParams));
      const newData = await getData(newParams);
      if (newData.success) {
        dispatch(updateData(newData.payload));
      }
    }
  }

  const prevPage = async () => {
    if (data.hasPrevPage) {
      const newParams = { ...params, page: data.prevPage };
      dispatch(updateParams(newParams));
      const newData = await getData(newParams);
      if (newData.success) {
        dispatch(updateData(newData.payload));
      }
    }
  }

  const handlePageChange = async (e, page) => {
    if (data.page > page) {
      prevPage();
    } else {
      nextPage();
    }
  }

  return (
    <TableView
      table={table}
      data={data}
      handlePageChange={handlePageChange}
      changeLimit={changeLimit}
      limit={limit}
    />
  );
};
