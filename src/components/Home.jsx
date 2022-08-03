import React, { useEffect, useReducer, useState } from 'react';

const Home = (props) => {
  const { user } = props;
  return <div>{user.name}</div>;
};

export default Home;
