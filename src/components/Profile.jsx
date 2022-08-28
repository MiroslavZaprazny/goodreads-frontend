import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import RemoveBookFromReadBooks from "./modals/RemoveBookFromReadBooks";
import NotesModal from "./modals/NotesModal";

const Profile = () => {
  const [books, setBooks] = useState();
  const location = useLocation();
  const { user } = location.state;
  const [open, setOpen] = useState(false);
  const [wantToReadBooks, setWantToReadBooks] = useState();
  const [openNotesWindow, setOpenNotesWindow] = useState(false);

    const fetchBooks = async () => {
      const response = await fetch(
        `http://127.0.0.1:8000/api/books-read/${user.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
          },
        }
      );
      const content = await response.json();
      setBooks(content);
    };

  useEffect(() => {
    const fetchWantToReadBooks = async () => {
      const response = await fetch(
        `http://127.0.0.1:8000/api/want-to-read/${user.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
          },
        }
      );
      const content = await response.json();
      setWantToReadBooks(content);
    };

    fetchWantToReadBooks();
    fetchBooks();
  }, [JSON.stringify(books)]);
  return (
    <div className="px-44 py-24">
      <h4 className="text-xl font-semibold text-gray-800">
        All the books you read!
      </h4>
      {books &&
        books.map((book) => {
          return (
            <div key={book.id}>
              <RemoveBookFromReadBooks
                open={open}
                setOpen={setOpen}
                setBooks={setBooks}
                user={user}
                book={book}
              />
              <div className="w-full h-72 border bg-gray-50 rounded-lg py-4 px-3 mt-6">
                <div className="flex justify-between">
                  <div className="flex">
                    <div className="flex mt-3 space-x-4">
                      <Link
                        to={"/" + book.book.title}
                        state={{ data: book.book }}
                      >
                        <img
                          src={book.book.img}
                          alt={book.book.name}
                          className="w-32 h-42"
                        />
                      </Link>
                      <div className="flex flex-col">
                        <p className="font-semibold text-xl text-gray-700 hover:underline">
                          <Link
                            to={"/" + book.book.title}
                            state={{ data: book.book }}
                          >
                            {book.book.title}
                          </Link>
                        </p>
                        <div className="flex items-center font-semibold text-gray-700 space-x-1">
                          <p className="font-normal text-gray-500 text-sm">
                            by
                          </p>
                          <p>{book.book.author.name}</p>
                        </div>
                      </div>
                    </div>
                    <div
                      onClick={() => setOpenNotesWindow(true)}
                      className="w-160 mt-12 ml-44 select-none cursor-pointer"
                    >
                      {book.notes && (
                        <div>
                          <h4 className="font-semibold text-lg text-gray-600 mb-1">
                            Your notes
                          </h4>
                          <p className="text-gray-500 ml-2 line-clamp-3">
                            {book.notes.notes}
                          </p>
                        </div>
                      )}
                      {!book.notes && (
                        <p className="text-gray-500">Add notes...</p>
                      )}
                    </div>
                  </div>
                  {openNotesWindow === true && 
                      <NotesModal 
                      openNotesWindow={openNotesWindow}
                      setOpenNotesWindow={setOpenNotesWindow}
                      book={book}
                      user={user}
                      fetchBooks={fetchBooks}
                     />
                  }

                  <div className="mr-4">
                    <button
                      onClick={() => setOpen(true)}
                      className="text-gray-500 hover:text-gray-900 transition ease-in duration-150"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

      {books?.length === 0 && (
        <p className="text-gray-600 mt-2">
          You have read no books, get to reading!!
        </p>
      )}

      <div className="want-to-read mt-12">
        <h3 className="font-semibold text-xl">Books you want to read!</h3>
        {wantToReadBooks &&
          wantToReadBooks.map((book) => {
            return book.book.title;
          })}
      </div>
    </div>
  );
};

export default Profile;
