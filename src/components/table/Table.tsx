import { useTable } from 'react-table';

import { TableView } from './TableView';

export const Table = ({ columns, data }: any) => {
  const table = useTable({
    columns,
    data: data.docs,
  });
  const { getTableProps, headerGroups, rows, prepareRow } = table;

  return (
    <TableView
      getTableProps={getTableProps}
      headerGroups={headerGroups}
      rows={rows}
      data={data}
      prepareRow={prepareRow}
    />
  );
};
