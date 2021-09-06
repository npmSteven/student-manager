import { ReactElement } from 'react';
import { Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { Table } from '../../components/table/Table';
import { Boolean } from '../../Pipes/Boolean';
import { CopyToClipboard } from '../../Pipes/CopyToClipboard';
import { StudentName } from '../../Pipes/StudentName';
import { TutorName } from '../../Pipes/TutorName';
import { timestampToDate } from '../../services/time.service';

export const MeetingsView = ({ meetings, tutors, students, deleteMeetingUi, readMeeting, editMeeting, getData, updateData, params, updateParams }): ReactElement => {
  const columns = [
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
      Header: 'Student',
      accessor: 'studentId',
      Cell: ({ value }) => (
        <StudentName studentId={value} students={students} />
      ),
    },
    {
      Header: 'Tutor',
      accessor: 'tutorId',
      Cell: ({ value }) => (
        <TutorName tutorId={value} tutors={tutors} />
      ),
    },
    {
      Header: 'Show',
      accessor: 'didShow',
      Cell: ({ value }) => (
        <Boolean has={value} />
      ),
    },
    {
      Header: 'Student Evaluation',
      accessor: 'didFillStudentEvaluationSheet',
      Cell: ({ value }) => (
        <Boolean has={value} />
      ),
    },
    {
      Header: 'Tutor Evaluation',
      accessor: 'didFillTutorEvaluationSheet',
      Cell: ({ value }) => (
        <Boolean has={value} />
      ),
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
              onClick={() => readMeeting(_id)}
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
              onClick={() => editMeeting(_id)}
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
              onClick={() => deleteMeetingUi(_id)}
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
        <h1>Meetings</h1>
        <Link to="/meetings/add" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<Add />}
          >
            Add
          </Button>
        </Link>
      </div>
      <Table data={meetings} columns={columns} getData={getData} updateData={updateData} params={params} updateParams={updateParams} />
    </div>
  );
};
