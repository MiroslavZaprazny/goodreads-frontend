import React from 'react';
import CurrentlyReading from './CurrentlyReading';
import RecentlyReviews from './RecentlyReviews';

const Home = (props) => {
  return (
    <div className="main-page flex flex-col lg:flex-row ">
      <CurrentlyReading user={props.user}/>
      <RecentlyReviews user={props.user} />
    </div>
  );
};

export default Home;
