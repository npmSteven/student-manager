import { ReactElement } from 'react';
import { Table } from '../../components/table/Table';

export const TutorsView = ({
  tutors
}): ReactElement => {
  const columns = [
    {
      Header: 'First Name',
      accessor: 'firstName',
    },
    {
      Header: 'Middle Name',
      accessor: 'middleName',
    },
    {
      Header: 'Last Name',
      accessor: 'lastName',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
  ];
  return (
    <div>
      <h1>Tutors</h1>
      <Table data={tutors} columns={columns} />
    </div>
  );
};
