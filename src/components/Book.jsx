import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const Book = () => {
  const { book } = useParams();
  const location = useLocation();
  const { data } = location.state;
  const [booksFromAuthor, setBooksFromAuthor] = useState([]);

  useEffect(() => {
    const fetchAuthor = async () => {
      const response = await fetch('http://127.0.0.1:8000/api/author', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({ author_id: data.author.id }),
      });
      const content = await response.json();
      setBooksFromAuthor(content);
    };
    fetchAuthor();
  }, []);
  console.log(data);
  return (
    <div className="container px-48 py-16">
      <div className="flex flex-col lg:flex-row justify-between w-full">
        <div className="flex flex-col">
          <div className="book-info flex border-b pb-6">
            <div className="book-img flex-shrink-0 flex-grow-0">
              <img src={data.img} alt="Book cover" className="w-38 h-60" />
            </div>
            <div className="book-description ml-8">
              <p className="font-semibold text-2xl text-gray-700">
                {data.title}
                <span className="font-normal text-base text-gray-600 ml-1">
                  by
                </span>
                <span className="font-semibold text-lg text-gray-700 ml-1">
                  {data.author.name}
                </span>
              </p>
              <div className="rating flex space-x-2 text-sm mt-1 ml-2 text-gray-500">
                <p>5/10</p>
                <p>{String.fromCharCode(183)}</p>
                <p>500 ratings</p>
                <p>{String.fromCharCode(183)}</p>
                <p>20 reviews</p>
              </div>
              <p className="text-sm text-gray-600 leading-6 mt-2 line-clamp-5 lg:line-clamp-none">
                {data.description}
              </p>
            </div>
          </div>

          <div className="mt-12 ml-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Book reviews
            </h3>
            {data.reviews.map((review) => {
              return (
                <div
                  key={review.id}
                  className="card flex mt-8 border px-4 py-6 rounded-xl w-160"
                >
                  <div className="img-cotainer border-r pr-4">
                    <div className="avatar w-10 h-10 rounded-full bg-black"></div>
                  </div>
                  <div className="progress w-full ml-2 px-2">
                    <div className="flex justify-between">
                      <p className="text-gray-600 text-sm space-x-1">
                        <span className="text-gray-700 font-semibold text-md">
                          {review.user.name}
                        </span>{' '}
                        rated this book
                        <span>as</span>
                        <span className="font-semibold text-gray-700">
                          {review.rating}/10
                        </span>
                      </p>
                      <p className="text-gray-500 text-sm">
                        {review.created_at}
                      </p>
                    </div>
                    <div className="book-container mt-4 flex space-x-4">
                      <div className="book-description">
                        <p className="line-clamp-4 text-gray-700">
                          {review.body ? review.body : ''}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className='ml-12 flex-shrink-0'>
          <div className="space-y-2 px-12 border-b pb-4">
            <h4 className="font-semibold text-lg text-gray-700">Genres</h4>
            <p className="text-sm text-gray-500">Non-fiction</p>
            <p className="text-sm text-gray-500">Non-fiction</p>
            <p className="text-sm text-gray-500">Non-fiction</p>
          </div>
          <div className="author mt-12">
            <div>
              {/* <img src={data.author.picture} className="w-20 h-20 rounded-full object-fill" /> */}
              <h4 className="font-semibold text-lg text-gray-700">
                More books from {data.author.name}
              </h4>
            </div>
            {booksFromAuthor && (
              <div className="ml-4 mt-2 space-y-4">
                {booksFromAuthor.map((book) => {
                  return (
                    <div key={book.id}
                    className="flex border-b pb-4">
                      <div>
                        <img src={book.img} alt="" className="w-20 h-28 " />
                      </div>
                      <div className="ml-5 font-semibold text-lg text-gray-700">
                        {book.title}
                        <p className="text-xs font-normal text-gray-400 ml-1">
                          {book.published_at}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
