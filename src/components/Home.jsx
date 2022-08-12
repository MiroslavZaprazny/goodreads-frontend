import React from 'react';
import CurrentlyReading from './CurrentlyReading';
import FriendProgress from './FriendProgress';

const Home = () => {
  return (
    <div className="main-page flex">
      <CurrentlyReading />
      <FriendProgress />
    </div>
  );
};

export default Home;
