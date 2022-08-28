import React, { Fragment, useState } from "react";
import { Dialog, Transition } from '@headlessui/react';

const NotesModal = (props) => {
  const [noteInput, setNoteInput] = useState("");
  const [errors, setErrors] = useState("");

  const handleSaveNotes = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({
        user_id: props.user.id,
        book_id: props.book.book.id,
        notes: noteInput,
      }),
    });

    const content = await response.json();

    if (content.errors) {
      setErrors(content.message);
    } else {
      props.fetchBooks();
      props.setOpenNotesWindow(false);
    }
  };
  return (
    <Transition.Root show={props.openNotesWindow} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={props.setOpenNotesWindow}
      >
        <Transition.Child
          as={Fragment}
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
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-md text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-4xl h-130 sm:w-full">
                <div className="pt-8 px-6">
                  <div className="flex items-center justify-between border-b pb-4">
                    <h3 className="font-semibold text-lg text-gray-700">
                      Manage your notes!
                    </h3>
                    <div className="mr-4">
                      <button
                        onClick={() => props.setOpenNotesWindow(false)}
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
                  <div className="mt-2">
                    {errors && <p className="text-red-500 text-sm">{errors}</p>}
                  </div>
                  <div className="w-full mt-6 border-b pb-4">
                    <textarea
                      defaultValue={props.book.notes.notes}
                      onChange={(e) => setNoteInput(e.target.value)}
                      name="notes"
                      rows="10"
                      className="resize-none text-gray-600 w-full border rounded-lg focus:border-none 
                                       focus:outline-gray-100 transition ease-in duration-75 px-4 py-3 placeholder:text-sm"
                      placeholder="Add something you learned in this book!"
                    ></textarea>
                  </div>
                </div>
                <div className="flex justify-end flex-shrink- mt-4 mr-4">
                  <button
                    onClick={handleSaveNotes}
                    className="rounded-lg border font-semibold text-sm text-white
                     bg-gray-600 hover:bg-gray-700 transition ease-out duration-300 px-7 py-3"
                  >
                    Save notes
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default NotesModal;
