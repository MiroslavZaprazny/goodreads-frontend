import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const RecentlyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const fetchReviews = async () => {
      const response = await fetch('http://127.0.0.1:8000/api/reviews', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const content = await response.json();
      setReviews(content);
      setIsLoading(false);
    };
    fetchReviews();
  }, []);

  return (
    <div className="friends-books px-16 py-6">
      <h3 className="text-lg font-semibold text-gray-800">
        See recently posted reviews!
      </h3>
      {isLoading &&
        [...Array(5)].map((arr, i) => {
          return (
            <div
              key={i}
              className="card flex mt-8 border px-4 py-6 rounded-xl w-160"
            >
              <div className="img-cotainer border-r pr-4">
                <div className="avatar w-10 h-10 rounded-full bg-gray-300"></div>
              </div>
              <div className="progress w-full ml-2 px-2">
                <div className="flex justify-between">
                  <p className="text-gray-600 text-sm space-x-1">
                    <span className="text-gray-700 font-semibold text-md text-transparent bg-gray-100">
                      Title goes here
                    </span>{' '}
                    <span className="text-gray-700 font-semibold text-md text-transparent bg-gray-100">
                      Title of the book goes here
                    </span>
                    <span className="text-transparent bg-gray-100">
                      Rating goes here
                    </span>
                    <span className="font-semibold text-gray-700"></span>
                  </p>
                  <p className="text-gray-500 text-sm text-transparent bg-gray-100">
                    Date
                  </p>
                </div>
                <div className="book-container mt-4 flex space-x-4">
                  <div className="img flex-shrink-0">
                    <div className="h-20 w-14 rounded-sm bg-gray-300"></div>
                  </div>
                  <div className="book-description">
                    <p className="line-clamp-4 text-transparent bg-gray-100">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Hic dolorem voluptates ullam deserunt soluta veniam ad
                      recusandae, eius ipsam maxime aspernatur quibusdam
                      provident culpa dicta nesciunt quo. Eum, iure nam! Iure
                      saepe, obcaecati cumque sint ratione mollitia expedita
                      amet ipsum rem assumenda maxime iste optio possimus harum
                      debitis facere non ullam quaerat eum accusamus eveniet
                      tempore sit blanditiis fugiat! Quis.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      {!isLoading &&
        reviews.map((review) => {
          return (
            <div
              key={review.id}
              className="card flex mt-8 border px-4 py-6 rounded-xl w-160"
            >
              <div className="img-cotainer border-r pr-4">
                <img
                  src={review.user.avatar}
                  className="avatar w-10 h-10 rounded-full"
                />
              </div>
              <div className="progress w-full ml-2 px-2">
                <div className="flex justify-between">
                  <p className="text-gray-600 text-sm space-x-1">
                    <span className="text-gray-700 font-semibold text-md">
                      {review.user.name}
                    </span>{' '}
                    rated
                    <Link
                      to={review.book.title}
                      state={{ data: review.book }}
                      className="text-gray-700 font-semibold text-md hover:underline"
                    >
                      {review.book.title}
                    </Link>
                    <span>as</span>
                    <span className="font-semibold text-gray-700">
                      {review.rating}/10
                    </span>
                  </p>
                  <p className="text-gray-500 text-sm">{review.created_at}</p>
                </div>
                <div className="book-container mt-4 flex space-x-4">
                  <Link
                    to={review.book.title}
                    state={{ data: review.book }}
                    className="img flex-shrink-0"
                  >
                    <img
                      src={review.book.img}
                      alt="book-cover"
                      className="h-20 w-14 rounded-sm"
                    />
                  </Link>
                  <div className="book-description">
                    <p className="line-clamp-4 text-gray-700">
                      {review.body ? review.body : review.book.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default RecentlyReviews;
