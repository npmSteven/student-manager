import { useState, useEffect } from 'react';
import { CopyToClipboard } from './CopyToClipboard';

export const ClassCode = ({ classId, classes }: any) => {
  const [classCode, setClassCode] = useState('');

  useEffect(() => {
    const classObj = classes.find(({ _id }) => _id === classId);
    if (classObj) {
      const { classCode } = classObj;
      setClassCode(classCode);
    }
  }, []);

  return <CopyToClipboard text={classCode} />;
};
