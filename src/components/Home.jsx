import React from "react";
import CurrentlyReading from "./CurrentlyReading";
import RecentlyReviews from "./RecentlyReviews";

const Home = (props) => {
  return (
    <div className="main-page flex flex-col lg:flex-row">
      {!props.user.name && (
        <div className="mx-auto">
          <RecentlyReviews user={props.user} />
        </div>
      )}
    
      {props.user.name && (
        <>
          <CurrentlyReading user={props.user} />
          <RecentlyReviews user={props.user} />
        </>
      )}
    </div>
  );
};

export default Home;
