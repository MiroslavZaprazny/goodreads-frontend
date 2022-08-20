import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const WantToRead = (props) => {
  const [wantToReadBooks, setWantToReadBooks] = useState([]);
  useEffect(() => {
    const fetchWantToReadBooks = async () => {
      const response = await fetch(
        `http://127.0.0.1:8000/api/want-to-read/${props.user.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
        }
      );
      const content = await response.json();
      if (!content.message) {
        setWantToReadBooks(content);
      }
    };
    fetchWantToReadBooks();
  }, [props.user]);

  return (
    <>
      {wantToReadBooks && (
        <div className="mt-12 border-b pb-2">
          <h4 className="text-xl font-semibold text-gray-800">Want to read</h4>
          <div className="grid grid-rows-2 grid-cols-2 gap-y-3 mt-1">
            {wantToReadBooks.map((book) => {
              return (
                <div key={book.id}>
                  <Link to={book.book.title} state={{ data: book.book }}>
                    <img src={book.book.img} className="rounded-md w-14 h-22" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default WantToRead;
