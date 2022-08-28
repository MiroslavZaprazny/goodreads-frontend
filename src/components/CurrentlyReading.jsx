import React, { useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import WantToRead from "./WantToRead";
import Search from "./Search";

const CurrentlyReading = (props) => {
  const [book, setBook] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState("Reading");
  const [bookPage, setBookPage] = useState();

  useEffect(() => {
    const fetchCurrenltyReadingBook = async () => {
      const response = await fetch(
        "http://127.0.0.1:8000/api/currently-reading",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            mode: "no-cors",
          },
          body: JSON.stringify({ user_id: props.user.id }),
        }
      );
      const data = await response.json();
      setBook(data.book[0]);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };
    fetchCurrenltyReadingBook();
  }, [props.user, JSON.stringify(book)]);

  const setCurrentBookPage = () => {
    if (bookPage != undefined) {
      const sendData = async () => {
        const response = await fetch(
          "http://127.0.0.1:8000/api/set-current-page",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Requested-With": "XMLHttpRequest",
            },
            body: JSON.stringify({
              user_id: book.user_id,
              current_page: bookPage,
            }),
          }
        );

        const message = await response.json();
        setBook(message);
      };
      sendData();
      setOpen(false);
    } else {
      const sendData = async () => {
        const response = await fetch(
          "http://127.0.0.1:8000/api/set-current-page",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Requested-With": "XMLHttpRequest",
            },
            body: JSON.stringify({
              status: 0,
              user_id: book.user_id,
              book_id: book.id,
            }),
          }
        );
        const message = await response.json();
        setBook(message);
      };
      sendData();
      setOpen(false);
    }
  };

  const handleAddCurrReadingBook = () => {

  }

  return (
    <div className="py-20 px-36">
      <div className="flex flex-col currently-reading border-b">
        <h4 className="text-xl font-semibold text-gray-800">
          Currently reading
        </h4>
        {book && (
          <div className="description flex py-2 px-1">
            <Link
              to={book.book.title}
              state={{ data: book.book }}
              className="img-container flex-shrink-0"
            >
              <img src={book.book.img} className="w-24 mt-1 rounded-md" />
            </Link>
            <div className="text-lg ml-3 mt-1">
              <Link
                to={book.book.title}
                state={{ data: book.book }}
                className="text-gray-700 font-semibold hover:underline"
              >
                {book.book.title}
              </Link>
              <p className="text-gray-600 text-sm">
                by{" "}
                <span className="text-sm font-semibold text-gray-700">
                  {book.book.author.name}
                </span>{" "}
              </p>
              <div className="progress text-sm text-gray-600 mt-3 ml-1">
                Read {book.current_page} pages out of {book.book.pages}
              </div>
              <div className="update-progress text-sm">
                <button
                  onClick={() => setOpen(true)}
                  className="border px-1 py-2 rounded-lg text-gray-600 bg-gray-50 hover:bg-gray-100 hover:text-gray-700 transition ease-in duration-150 mt-2"
                >
                  Update progress
                </button>
              </div>
            </div>
          </div>
        )}

        {!book && !isLoading && (
          <div className="flex flex-col items-center text-gray-700 mt-2 pb-3 text-lg">
            Search for a book that you are currently reading!
            <div className="mt-4">
            <Search width="w-72" />
            </div>
          </div>
        )}

        {isLoading && (
          <div className="description flex py-2 px-1">
            <div className="img-container flex-shrink-0">
              <div className="w-24 h-32 mt-1 rounded-md bg-gray-200"></div>
            </div>
            <div className="text-lg ml-3 mt-1">
              <p className="text-gray-700 font-semibold text-transparent bg-gray-50">
                Title goes here
              </p>
              <p className="text-gray-600 text-sm text-transparent bg-gray-50">
                by{" "}
                <span className="text-sm font-semibold text-gray-700 bg-gray-100 text-transparent">
                  Name of the book goes here
                </span>{" "}
              </p>
              <div className="progress text-sm text-gray-600 mt-3 ml-1 text-transparent bg-gray-50">
                Read num of pages out of num of pages
              </div>
              <div className="update-progress text-sm">
                <button
                  onClick={book}
                  className="border px-1 py-2 rounded-lg text-transparent text-gray-600 bg-gray-50 mt-2"
                >
                  Update progress
                </button>
              </div>
            </div>
          </div>
        )}
        <Transition.Root show={open}>
          <Dialog as="div" className="relative z-10" onClose={setOpen}>
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                <Transition.Child
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start w-full">
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-lg leading-6 font-medium text-gray-900"
                          >
                            Update Progress
                          </Dialog.Title>
                          <div className="mt-4 text-sm text-gray-500">
                            {book && select === "Reading" && (
                              <div className="flex">
                                <input
                                  type="text"
                                  defaultValue={book.current_page}
                                  onChange={(e) => setBookPage(e.target.value)}
                                  className="border px-3 py-2 rounded-xl w-1/6 block mb-4"
                                />
                                <p className="ml-2 mt-2">
                                  out of {book.book.pages} read
                                </p>
                              </div>
                            )}

                            <select
                              name="status"
                              value={select}
                              onChange={(e) => setSelect(e.target.value)}
                              className="border rounded-xl px-3 py-2 w-80"
                            >
                              <option>Reading</option>
                              <option>Finished reading</option>
                              <option>Dropped</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2  bg-blue-400 text-gray-50 text-base font-medium hover:bg-blue-500 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm transition ease-in duration-150"
                        onClick={setCurrentBookPage}
                      >
                        Update progress
                      </button>
                      <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>

      <WantToRead user={props.user} />
    </div>
  );
};

export default CurrentlyReading;
