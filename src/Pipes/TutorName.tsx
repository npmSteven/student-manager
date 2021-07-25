import { useState, useEffect } from 'react';

export const TutorName = ({ tutorId, tutors }: any) => {
  const [tutorName, setTutorName] = useState('');

  useEffect(() => {
    const tutor = tutors.find(({ _id }) => _id === tutorId);
    if (tutor) {
      const { firstName, lastName } = tutor;
      setTutorName(`${firstName} ${lastName}`);
    }
  }, []);

  return <p>{tutorName}</p>;
};
