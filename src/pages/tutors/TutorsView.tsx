import { ReactElement } from 'react';
import { Table } from '../../components/table/Table';
import { CopyToClipboard } from '../../Pipes/CopyToClipboard';

export const TutorsView = ({
  tutors,
  getData,
  updateData,
  params,
}): ReactElement => {
  const columns = [
    {
      Header: 'First Name',
      accessor: 'firstName',
      Cell: ({ value }) => <CopyToClipboard text={value} />,
    },
    {
      Header: 'Middle Name',
      accessor: 'middleName',
      Cell: ({ value }) => <CopyToClipboard text={value} />,
    },
    {
      Header: 'Last Name',
      accessor: 'lastName',
      Cell: ({ value }) => <CopyToClipboard text={value} />,
    },
    {
      Header: 'Email',
      accessor: 'email',
      Cell: ({ value }) => <CopyToClipboard text={value} />,
    },
  ];
  return (
    <div>
      <h1>Tutors</h1>
      <Table
        data={tutors}
        columns={columns}
        getData={getData}
        updateData={updateData}
        params={params}
      />
    </div>
  );
};
