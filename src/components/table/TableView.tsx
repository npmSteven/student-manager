import { TableFooter } from '@material-ui/core';
import MaUTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export const TableView = ({ table, data, nextPage, prevPage, changeLimit, limit }) => {
  const { getTableProps, headerGroups, rows, prepareRow } = table;

  return (
    <div>
      <select onChange={(event) => changeLimit(event.target.value)} value={limit}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
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
    </div>
  );
};
