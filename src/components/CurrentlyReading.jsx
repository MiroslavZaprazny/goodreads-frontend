import React from 'react';

const CurrentlyReading = () => {
  return (
    <div className="py-20 px-36">
      <div className="flex flex-col currently-reading border-b">
        <h4 className="text-xl font-semibold text-gray-800">
          Currently reading
        </h4>
        <div className="description flex py-2 px-1">
          <div className="img-container flex-shrink-0">
            <img
              src="../../public/images/test_cover.jpg"
              className="w-24 mt-1 rounded-md"
            />
          </div>
          <div className="text-lg ml-3 mt-1">
            <p className="text-gray-700 font-semibold">Deep work</p>
            <p className="text-gray-600 text-sm">
              by{' '}
              <span className="text-sm font-semibold text-gray-700">
                Cal newport
              </span>{' '}
            </p>
            <div className="progress text-sm text-gray-600 mt-3 ml-1">
              Read 5 pages out of 50
            </div>
            <div className="update-progress text-sm">
              <button className="border px-1 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 mt-2">
                Update progress
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentlyReading;
