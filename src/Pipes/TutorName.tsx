import { useState, useEffect } from 'react';
import { CopyToClipboard } from './CopyToClipboard';

export const TutorName = ({ tutorId, tutors }: any) => {
  const [tutorName, setTutorName] = useState('');

  useEffect(() => {
    const tutor = tutors.find(({ _id }) => _id === tutorId);
    if (tutor) {
      const { firstName, lastName } = tutor;
      setTutorName(`${firstName} ${lastName}`);
    }
  }, []);

  return  <CopyToClipboard text={tutorName} />;
};
