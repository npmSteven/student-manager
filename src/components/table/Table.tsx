import { useTable } from 'react-table';

import { TableView } from './TableView';

// const columns = [
//   {
//     Header: 'Age',
//     accessor: 'age',
//   },
//   {
//     Header: 'Visits',
//     accessor: 'visits',
//   },
//   {
//     Header: 'Status',
//     accessor: 'status',
//   },
//   {
//     Header: 'Profile Progress',
//     accessor: 'progress',
//   },
// ];

export const Table = ({ columns, data }: any) => {
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <TableView
      getTableProps={getTableProps}
      headerGroups={headerGroups}
      rows={rows}
      prepareRow={prepareRow}
    />
  );
};
