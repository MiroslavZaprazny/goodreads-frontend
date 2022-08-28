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
              // onBlur={() => {
              //   setSettingMenuIsVisible(false);
              // }}
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
                    className="absolute -bottom-20 -left-8 border bg-gray-100 rounded-xl w-28 px-3 py-2 cursor-default space-y-4"
                  >
                    <Link
                      to={'profile/settings/' + user.email}
                      className="flex items-center justify-center text-sm font-medium space-x-2 border-b pb-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <div className="text-gray-600 hover:text-gray-900 transition ease-in duration-150">
                        Settings
                      </div>
                    </Link>
                    <Link
                      to={'profile/' + user.email}
                      state={{ user: user }}
                      className="flex items-center justify-center text-sm font-medium space-x-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <div className="text-gray-600 hover:text-gray-900 transition ease-in duration-150">
                        Profile
                      </div>
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
            <Search width="w-64"/>
          </div>
          {menu}
        </div>
      </div>
    </ul>
  );
};

export default Navbar;
