import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Book = () => {
  const location = useLocation();
  const { data } = location.state;
  const [booksFromAuthor, setBooksFromAuthor] = useState([]);
  const [genres, setGenres] = useState();
  const [reviewInput, setReviewInput] = useState();
  const [reviews, setReviews] = useState();

  const fetchReviews = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/reviews/${data.id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
      }
    );
    const content = await response.json();
    setReviews(content);
  };

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
    const fetchGenres = async () => {
      const response = await fetch('http://127.0.0.1:8000/api/genres', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({ book_id: data.id }),
      });
      const content = await response.json();
      setGenres(content);
    };
    fetchAuthor();
    fetchGenres();
    fetchReviews();
  }, [JSON.stringify(reviews)]);

  const handleInput = () => {
    const sendReview = async () => {
      const response = await fetch('http://127.0.0.1:8000/api/post-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        //TODO dynamicky user
        body: JSON.stringify({
          user_id: 1,
          book_id: data.id,
          rating: 1,
          review_body: reviewInput,
        }),
      });
      //TODO SEt reviewinput na prazny string
      const content = await response.json();
      // setReviews((reviews) => [...reviews, content]);
      reviews.push(content);
    };
    sendReview();
  };

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
            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Book reviews
              </h3>
              {reviews &&
                reviews.map((review) => {
                  return (
                    <div
                      key={review.id}
                      className="card flex mt-8 border px-4 py-6 rounded-xl w-full"
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
              {!reviews &&
                [...Array(5)].map((review, i) => {
                  return (
                    <div
                      key={i}
                      className="card flex mt-8 border px-4 py-6 rounded-xl w-full"
                    >
                      <div className="img-cotainer border-r pr-4">
                        <div className="avatar w-10 h-10 rounded-full bg-gray-300"></div>
                      </div>
                      <div className="progress w-full ml-2 px-2">
                        <div className="flex justify-between">
                          <p className="text-gray-600 text-sm space-x-1">
                            <span className="text-transparent bg-gray-200 font-semibold text-md">
                              Reviewer name goes here
                            </span>{' '}
                            <span className="text-transparent bg-gray-100">
                              rated this book as
                            </span>
                            <span className="text-transparent bg-gray-100 ">
                              10/10
                            </span>
                          </p>
                          <p className="text-transparent bg-gray-50 text-sm">
                            Created at goes here
                          </p>
                        </div>
                        <div className="book-container mt-4 flex space-x-4">
                          <div className="book-description">
                            <p className="line-clamp-4 text-transparent bg-gray-200">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Commodi laboriosam, aliquam ratione quis
                              illo beatae quos officia, eveniet voluptatem,
                              quidem suscipit tenetur ex rem. Repellat a nisi
                              sint sunt aperiam.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            <h4 className="font-semibold text-lg text-gray-700 mt-12 mb-2">
              Write a review
            </h4>
            <textarea
              rows="8"
              onChange={(e) => setReviewInput(e.target.value)}
              className="border-2 px-4 py-2 resize-none rounded-xl w-3/4"
              placeholder="Share your thoughts on this book..."
            >
              {reviewInput}
            </textarea>
            <button
              onClick={handleInput}
              type="button"
              className="rounded-xl block mt-2 px-6 py-2 bg-blue-500 text-white hover:bg-blue-600 transition ease-in duration-150"
            >
              Submit your review
            </button>
          </div>
        </div>

        <div className="ml-12 flex-shrink-0">
          <div className="space-y-2 px-12 border-b pb-4">
            <h4 className="font-semibold text-lg text-gray-700">Genres</h4>
            {genres &&
              genres.map((genre) => {
                return (
                  <p key={genre.id} className="text-sm text-gray-500">
                    {genre.genre}
                  </p>
                );
              })}
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
                    <div key={book.id} className="flex border-b pb-4">
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
