import React, { useEffect, useState } from 'react';

const CurrentlyReading = (props) => {
  const [book, setBook] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const fetchCurrenltyReadingBook = async () => {
      const response = await fetch(
        'http://127.0.0.1:8000/api/currently-reading',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            mode: 'no-cors',
          },
          body: JSON.stringify({ user_id: props.user.id }),
        }
      );
      const data = await response.json();
      setBook(data.book[0]);
      setIsLoading(false);
    };
    fetchCurrenltyReadingBook();
  }, [props.user]);
  return (
    <div className="py-20 px-36">
      <div className="flex flex-col currently-reading border-b">
        <h4 className="text-xl font-semibold text-gray-800">
          Currently reading
        </h4>
        {book && (
          <div className="description flex py-2 px-1">
            <div className="img-container flex-shrink-0">
              <img
                src="../../public/images/test_cover.jpg"
                className="w-24 mt-1 rounded-md"
              />
            </div>
            <div className="text-lg ml-3 mt-1">
              <p className="text-gray-700 font-semibold">{book.book.title}</p>
              <p className="text-gray-600 text-sm">
                by{' '}
                <span className="text-sm font-semibold text-gray-700">
                  {book.book.author.name}
                </span>{' '}
              </p>
              <div className="progress text-sm text-gray-600 mt-3 ml-1">
                Read {book.current_page} pages out of {book.book.pages}
              </div>
              <div className="update-progress text-sm">
                <button className="border px-1 py-2 rounded-lg text-gray-600 bg-gray-50 hover:bg-gray-100 hover:text-gray-700 transition ease-in duration-150 mt-2">
                  Update progress
                </button>
              </div>
            </div>
          </div>
        )}
        {isLoading && (
          <div className="description flex py-2 px-1">
            <div className="img-container flex-shrink-0">
              <div
                className="w-24 mt-1 rounded-md bg-gray-300"
              ></div>
            </div>
            <div className="text-lg ml-3 mt-1">
              <p className="text-gray-700 font-semibold text-transparent bg-gray-50">
                Title goes here
              </p>
              <p className="text-gray-600 text-sm text-transparent bg-gray-50">
                by{' '}
                <span className="text-sm font-semibold text-gray-700 bg-gray-100 text-transparent">
                  Name of the book goes here
                </span>{' '}
              </p>
              <div className="progress text-sm text-gray-600 mt-3 ml-1 text-transparent bg-gray-50">
                Read num of pages out of num of pages
              </div>
              <div className="update-progress text-sm">
                <button className="border px-1 py-2 rounded-lg text-transparent text-gray-600 bg-gray-50 mt-2">
                  Update progress
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentlyReading;
