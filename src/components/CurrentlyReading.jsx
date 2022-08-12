import React from 'react';

const CurrentlyReading = () => {
  return (
    <div className="py-20 px-36">
      <div className="flex flex-col currently-reading border-b">
        <h4 className="text-xl font-semibold text-gray-800">Currently reading</h4>
        <div className="description flex py-2 px-1">
          <div className="img-container">
            <img
              src="../../public/images/test_cover.jpg"
              className="w-24 mt-1 rounded-md"
            />
          </div>
          <div className="text-lg ml-3 mt-1">
            <p className='text-gray-700 font-semibold'>Deep work</p>
            <p className='text-gray-600 text-sm'>
              by <span className="text-sm font-semibold text-gray-700">Cal newport</span>{' '}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentlyReading;
