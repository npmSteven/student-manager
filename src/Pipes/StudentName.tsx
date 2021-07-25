import { useState, useEffect } from 'react';
import { CopyToClipboard } from './CopyToClipboard';

export const StudentName = ({ studentId, students }: any) => {
  const [studentName, setStudentName] = useState('');

  useEffect(() => {
    const student = students.find(({ _id }) => _id === studentId);
    if (student) {
      const { firstName, lastName } = student;
      setStudentName(`${firstName} ${lastName}`);
    }
  }, []);

  return <CopyToClipboard text={studentName} />;
};
