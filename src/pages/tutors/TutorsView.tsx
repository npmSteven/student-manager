import { ReactElement } from 'react';
import { Table } from '../../components/table/Table';
import { CopyToClipboard } from '../../Pipes/CopyToClipboard';

export const TutorsView = ({
  tutors,
  getData,
  updateData,
  params,
  updateParams,
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
    {
      Header: 'Actions',
      accessor: '',
      Cell: ({
        row: {
          original: { _id },
        },
      }) => {
        return (
          <div>
            <p
              style={{
                padding: 5,
                margin: 0,
                marginTop: 5,
                marginBottom: 5,
                backgroundColor: 'green',
                textAlign: 'center',
                borderRadius: 5,
                color: 'white',
                cursor: 'pointer',
              }}
            >
              View
            </p>
            <p
              style={{
                padding: 5,
                margin: 0,
                marginTop: 5,
                marginBottom: 5,
                backgroundColor: 'blue',
                textAlign: 'center',
                borderRadius: 5,
                color: 'white',
                cursor: 'pointer',
              }}
            >
              Edit
            </p>
            <p
              style={{
                padding: 5,
                margin: 0,
                marginTop: 5,
                marginBottom: 5,
                backgroundColor: 'red',
                textAlign: 'center',
                borderRadius: 5,
                color: 'white',
                cursor: 'pointer',
              }}
            >
              Remove
            </p>
          </div>
        );
      },
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
        updateParams={updateParams}
      />
    </div>
  );
};
