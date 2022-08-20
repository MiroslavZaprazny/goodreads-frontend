import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Profile = () => {
  const [books, setBooks] = useState();
  const location = useLocation();
  const { user } = location.state;

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        `http://127.0.0.1:8000/api/books-read/${user.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
        }
      );
      const content = await response.json();
      console.log(books);
      setBooks(content);
    };
    fetchBooks();
  }, [JSON.stringify(books)]);
  return (
    <div className="px-44 py-24">
      <h4 className="text-xl font-semibold text-gray-800">
        All the books you read!
      </h4>
      <div className="w-1/2 border rounded py-4 px-3 mt-6">
        {books &&
          books.map((book) => {
            return (
              <div className="flex justify-between">
                <div key={book.id} className="flex space-x-4">
                  <Link to={'/' + book.book.title} state={{ data: book.book }}>
                    <img
                      src={book.book.img}
                      alt={book.book.name}
                      className="w-20 h-28"
                    />
                  </Link>
                  <div className="flex flex-col">
                    <p className="font-semibold text-lg text-gray-700 hover:underline">
                      <Link
                        to={'/' + book.book.title}
                        state={{ data: book.book }}
                      >
                        {book.book.title}
                      </Link>
                    </p>
                    <div className="flex items-center font-semibold text-gray-700 space-x-1">
                      <p className="font-normal text-gray-500 text-sm">by</p>
                      <p>{book.book.author.name}</p>
                    </div>
                  </div>
                </div>
                <div className="mr-24">
                  <p className='font-semibold text-lg text-gray-600'>
                    You rated it a <span className='font-normal text-gray-500 text-base'>4/10</span> !
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Profile;
