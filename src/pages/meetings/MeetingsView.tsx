import { ReactElement } from 'react';
import { Table } from '../../components/table/Table';
import { Boolean } from '../../Pipes/Boolean';
import { CopyToClipboard } from '../../Pipes/CopyToClipboard';
import { StudentName } from '../../Pipes/StudentName';
import { TutorName } from '../../Pipes/TutorName';
import { timestampToDate } from '../../services/time.service';

export const MeetingsView = ({ meetings, tutors, students, getData, updateData, params }): ReactElement => {
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
      Header: 'Hourly Rate',
      accessor: 'hourlyRate',
      Cell: ({ value }) => (
        <CopyToClipboard text={value} />
      )
    },
    {
      Header: 'Currency',
      accessor: 'currency',
      Cell: ({ value }) => (
        <CopyToClipboard text={value} />
      )
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
  ];

  return (
    <div>
      <h1>Meetings</h1>
      <Table data={meetings} columns={columns} getData={getData} updateData={updateData} params={params} />
    </div>
  );
};
