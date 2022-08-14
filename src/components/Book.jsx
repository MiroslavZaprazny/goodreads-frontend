import React from 'react';
import { useParams } from 'react-router-dom';

const Book = () => {
  const { book } = useParams();
  return <div>{book}</div>;
};

export default Book;
