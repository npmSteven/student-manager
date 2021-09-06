import { TableFooter, TablePagination } from '@material-ui/core';
import MaUTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export const TableView = ({ table, data, handlePageChange, changeLimit, limit }) => {
  const { getTableProps, headerGroups, rows, prepareRow } = table;

  return (
    <div>
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
          <TableRow>
            <TablePagination
              style={{
                overflow: "visible",
                display: "flex"
              }}
              component="div"
              count={data.totalDocs}
              page={data.page - 1}//Material UI thinks pages start at 0
              onPageChange={handlePageChange}
              rowsPerPage={limit}
              onRowsPerPageChange={changeLimit}
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
            />
          </TableRow>
        </TableFooter>
      </MaUTable>
    </div>
  );
};
