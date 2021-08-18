import { TableFooter } from '@material-ui/core';
import MaUTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export const TableView = ({ table, data, nextPage, prevPage }) => {
  const { getTableProps, headerGroups, rows, prepareRow } = table;

  return (
    <MaUTable {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <TableCell {...column.getHeaderProps()}>
                {column.render('Header')}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
      <TableFooter>
        <p>Limit: {data?.limit}</p>
        <button disabled={!data?.hasNextPage} onClick={nextPage}>Next</button>
        <p>Current Page: {data?.page}</p>
        <button disabled={!data?.hasPrevPage} onClick={prevPage}>Prev</button>
      </TableFooter>
    </MaUTable>
  );
};
