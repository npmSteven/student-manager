import { ReactElement } from 'react';
import { Table } from '../../components/table/Table';
import { CopyToClipboard } from '../../Pipes/CopyToClipboard';
import { timestampToDate } from '../../services/time.service';

const columns = [
  {
    Header: 'Class Code',
    accessor: 'classCode',
    Cell: ({ value }) => (
      <CopyToClipboard text={value} />
    )
  },
  {
    Header: 'Class Type',
    accessor: 'classType',
    Cell: ({ value }) => (
      <CopyToClipboard text={value} />
    )
  },
  {
    Header: 'Location',
    accessor: 'location',
    Cell: ({ value }) => (
      <CopyToClipboard text={value} />
    )
  },
  {
    Header: 'University',
    accessor: 'university',
    Cell: ({ value }) => (
      <CopyToClipboard text={value} />
    )
  },
  {
    Header: 'Period Start',
    accessor: 'periodStart',
    Cell: ({ value }) => (
      <CopyToClipboard text={timestampToDate(value)} />
    )
  },
  {
    Header: 'Period End',
    accessor: 'periodEnd',
    Cell: ({ value }) => (
      <CopyToClipboard text={timestampToDate(value)} />
    )
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
