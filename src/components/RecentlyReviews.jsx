import React, { useEffect, useState } from 'react';

const RecentlyReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await fetch('http://127.0.0.1:8000/api/reviews', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const content = await response.json();
      setReviews(content);
    };
    fetchReviews();
  }, []);

  return (
    <div className="friends-books px-16 py-6">
      <h3 className="text-lg font-semibold text-gray-800">
        See recently posted reviews!
      </h3>
      {reviews &&
        reviews.map((review) => {
          return (
            <div
              key={review.id}
              className="card flex mt-8 border px-4 py-6 rounded-xl w-160"
            >
              <div className="img-cotainer border-r pr-4">
                <div className="avatar w-10 h-10 rounded-full bg-black"></div>
              </div>
              <div className="progress ml-2 px-2">
                <p className="text-gray-600 text-sm">
                  <span className="text-gray-700 font-semibold text-md">
                    {review.user.name}
                  </span>{' '}
                  {review.status}
                  <span className="text-gray-700 font-semibold text-md ml-1">
                    {review.book.title}
                  </span>
                </p>
                <div className="book-container mt-4 flex space-x-4">
                  <div className="img flex-shrink-0">
                    <img
                      src="../../public/images/test_cover.jpg"
                      alt="book-cover"
                      className="h-20 w-14 rounded-sm"
                    />
                  </div>
                  <div className="book-description">
                    <p className="line-clamp-4 text-gray-700">{review.body}</p>
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
