import { Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Table } from '../../components/table/Table';
import { Boolean } from '../../Pipes/Boolean';
import { ClassCode } from '../../Pipes/ClassCode';
import { CopyToClipboard } from '../../Pipes/CopyToClipboard';
import { TutorName } from '../../Pipes/TutorName';

export const StudentsView = ({
  students,
  tutors,
  classes,
  editStudent,
  readStudent,
  deleteStudentUi,
  getData,
  updateData,
  params,
  updateParams,
}: any): ReactElement => {
  const columns = [
    {
      Header: 'First Name',
      accessor: 'firstName',
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
      Header: 'Tutor',
      accessor: 'tutorId',
      Cell: ({ value }) => <TutorName tutorId={value} tutors={tutors} />,
    },
    {
      Header: 'Class Code',
      accessor: 'classId',
      Cell: ({ value }) => <ClassCode classId={value} classes={classes} />,
    },
    {
      Header: 'Timezone',
      accessor: 'timezone',
      Cell: ({ value }) => <CopyToClipboard text={value} />,
    },
    {
      Header: 'Intro Email',
      accessor: 'didSendIntroEmail',
      Cell: ({ value }) => <Boolean has={value} />,
    },
    {
      Header: 'Slack Invite',
      accessor: 'didSendSlackInvite',
      Cell: ({ value }) => <Boolean has={value} />,
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
              onClick={() => readStudent(_id)}
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
              onClick={() => editStudent(_id)}
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
              onClick={() => deleteStudentUi(_id)}
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
        <h1>Students</h1>
        <Link to="/students/add" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<Add />}
          >
            Add
          </Button>
        </Link>
      </div>
      <Table
        data={students}
        columns={columns}
        getData={getData}
        updateData={updateData}
        params={params}
        updateParams={updateParams}
      />
    </div>
  );
};
