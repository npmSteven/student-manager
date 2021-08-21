import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Table } from '../../components/table/Table';
import { CopyToClipboard } from '../../Pipes/CopyToClipboard';

import { timestampToDate } from '../../services/time.service';

export const ClassesView = ({
  classes,
  getData,
  updateData,
  params,
  updateParams,
  deleteNoteUi,
}): ReactElement => {
  const columns = [
    {
      Header: 'Class Code',
      accessor: 'classCode',
      Cell: ({ value }) => <CopyToClipboard text={value} />,
    },
    {
      Header: 'Class Type',
      accessor: 'classType',
      Cell: ({ value }) => <CopyToClipboard text={value} />,
    },
    {
      Header: 'Location',
      accessor: 'location',
      Cell: ({ value }) => <CopyToClipboard text={value} />,
    },
    {
      Header: 'University',
      accessor: 'university',
      Cell: ({ value }) => <CopyToClipboard text={value} />,
    },
    {
      Header: 'Period Start',
      accessor: 'periodStart',
      Cell: ({ value }) => <CopyToClipboard text={timestampToDate(value)} />,
    },
    {
      Header: 'Period End',
      accessor: 'periodEnd',
      Cell: ({ value }) => <CopyToClipboard text={timestampToDate(value)} />,
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
          <p
            style={{
              padding: 5,
              backgroundColor: 'red',
              textAlign: 'center',
              borderRadius: 5,
              color: 'white',
              cursor: 'pointer',
            }}
            onClick={() => deleteNoteUi(_id)}
          >
            Remove
          </p>
        );
      },
    },
  ];

  return (
    <div>
      <h1>Classes</h1>
      <Link to="/classes/add">
        <button>Add</button>
      </Link>
      <Table
        columns={columns}
        data={classes}
        getData={getData}
        updateData={updateData}
        params={params}
        updateParams={updateParams}
      />
    </div>
  );
};
