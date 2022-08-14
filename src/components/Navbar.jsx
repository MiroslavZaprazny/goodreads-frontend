import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Search from './Search';

const Navbar = (props) => {
  const { user, setUser } = props;
  const logout = async () => {
    await fetch('http://127.0.0.1:8000/api/logout', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    localStorage.removeItem('is_logged_in');
    setUser('');
  };
  let menu;
  if (localStorage.getItem('is_logged_in')) {
    menu = (
      <Link
        to="/"
        className="hover:text-navy transition ease-in-out duration-150"
        onClick={logout}
      >
        Logout
      </Link>
    );
  } else {
    menu = (
      <Link
        to="/register"
        className="hover:text-navy transition ease-in-out duration-150"
      >
        Sign up
      </Link>
    );
  }
  return (
    <ul className="px-6 py-4 ">
      <div className="flex items-center justify-between text-gray-800">
        <div className="logo ml-12">
          <NavLink
            to="/"
            className="hover:text-navy transition ease-in-out duration-150"
          >
            <img
              src="../../public/images/logo.png"
              alt="Logo"
              className="w-20 h-20 rounded-md"
            />
          </NavLink>
        </div>
        <div className="nav-links mr-28 space-x-28 flex items-center">
          <Search />
          {menu}
        </div>
      </div>
    </ul>
  );
};

export default Navbar;
