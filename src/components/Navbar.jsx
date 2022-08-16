import React from 'react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Search from './Search';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = (props) => {
  const { user, setUser } = props;
  const [settingMenuIsVisible, setSettingMenuIsVisible] = useState(false);

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
      <>
        <Link
          to="/"
          className="hover:text-navy transition ease-in-out duration-150"
          onClick={logout}
        >
          Logout
        </Link>
        {user.avatar && (
          <div className="ml-6">
            <button
              onClick={() => {
                setSettingMenuIsVisible(!settingMenuIsVisible);
              }}
              onBlur={() => {
                setSettingMenuIsVisible(false);
              }}
              className="relative"
            >
              <img
                src={user.avatar}
                alt="avatar"
                className="relative w-10 h-10 rounded-full"
              />
              <AnimatePresence>
                {settingMenuIsVisible === true && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.75 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="absolute -bottom-12 -left-8 border bg-gray-100 rounded-xl w-28 px-3 py-2"
                  >
                    <Link
                      to={'profile/' + user.email}
                      className="text-sm font-medium text-gray-600 hover:text-gray-800 transition ease-in duration-150"
                    >
                      Your profile
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        )}
        {!user.avatar && (
          <img
            src="http://www.gravatar.com/avatar/?d=mp"
            alt="loading..."
            className="w-10 h-10 rounded-full ml-6"
          />
        )}
      </>
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
        <div className="nav-links mr-28 flex items-center">
          <div className="mr-28">
            <Search />
          </div>
          {menu}
        </div>
      </div>
    </ul>
  );
};

export default Navbar;
