import { ReactElement } from 'react';
import { Table } from '../../components/table/Table';
import { timestampToDate } from '../../services/time.service';

const columns = [
  {
    Header: 'Class Code',
    accessor: 'classCode',
  },
  {
    Header: 'Class Type',
    accessor: 'classType',
  },
  {
    Header: 'Location',
    accessor: 'location',
  },
  {
    Header: 'University',
    accessor: 'university',
  },
  {
    Header: 'Period Start',
    accessor: 'periodStart',
    Cell: ({ value }) => timestampToDate(value),
  },
  {
    Header: 'Period End',
    accessor: 'periodEnd',
    Cell: ({ value }) => timestampToDate(value),
  },
];

export const ClassesView = ({
  classes
}): ReactElement => {
  return (
    <div>
      <h1>Classes</h1>
      <Table columns={columns} data={classes} />
    </div>
  );
};
