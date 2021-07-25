import { useState, useEffect } from 'react';

export const ClassCode = ({ classId, classes }) => {
  const [classCode, setClassCode] = useState('');

  useEffect(() => {
    const classObj = classes.find(({ _id }) => _id === classId);
    if (classObj) {
      const { classCode } = classObj;
      setClassCode(classCode);
    }
  }, []);

  return <p>{classCode}</p>;
};
