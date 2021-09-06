import { Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';
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
  deleteClassUi,
  editClass,
  readClass,
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
              onClick={() => readClass(_id)}
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
              onClick={() => editClass(_id)}
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
              onClick={() => deleteClassUi(_id)}
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
      <div style={{
        paddingLeft: 24
      }}>
        <h1>Classes</h1>
        <Link to="/classes/add" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<Add />}
          >
            Add
          </Button>
        </Link>
      </div>
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
