import { ReactElement } from 'react';
import { Table } from '../../components/table/Table';
import { Boolean } from '../../Pipes/Boolean';
import { ClassCode } from '../../Pipes/ClassCode';
import { CopyToClipboard } from '../../Pipes/CopyToClipboard';
import { TutorName } from '../../Pipes/TutorName';

export const StudentsView = ({ students, tutors, classes, getData, updateData, params }: any): ReactElement => {
  const columns = [
    {
      Header: 'First Name',
      accessor: 'firstName',
      Cell: ({ value }) => (
        <CopyToClipboard text={value} />
      )
    },
    {
      Header: 'Last Name',
      accessor: 'lastName',
      Cell: ({ value }) => (
        <CopyToClipboard text={value} />
      )
    },
    {
      Header: 'Email',
      accessor: 'email',
      Cell: ({ value }) => (
        <CopyToClipboard text={value} />
      )
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
      Cell: ({ value }) => (
        <CopyToClipboard text={value} />
      )
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
  ];
  return (
    <div>
      <h1>Students</h1>
      <Table data={students} columns={columns} getData={getData} updateData={updateData} params={params} />
    </div>
  );
};
