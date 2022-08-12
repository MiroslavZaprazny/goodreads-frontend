import React from 'react';
import CurrentlyReading from './CurrentlyReading';
import RecentlyReviews from './RecentlyReviews';

const Home = () => {
  return (
    <div className="main-page flex flex-col lg:flex-row ">
      <CurrentlyReading />
      <RecentlyReviews />
    </div>
  );
};

export default Home;
