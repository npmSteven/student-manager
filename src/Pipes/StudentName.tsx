import { useState, useEffect } from 'react';

export const StudentName = ({ studentId, students }) => {
  const [studentName, setStudentName] = useState('');

  useEffect(() => {
    const student = students.find(({ _id }) => _id === studentId);
    if (student) {
      const { firstName, lastName } = student;
      setStudentName(`${firstName} ${lastName}`);
    }
  }, []);

  return <p>{studentName}</p>;
};
