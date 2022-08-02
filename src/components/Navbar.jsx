import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <ul className="px-6 py-4 ">
      <div className="flex items-center justify-between text-gray-800">
        <div className="logo ml-12">
          <NavLink
            to="/"
            className="hover:text-navy transition ease-in-out duration-150">
            <img src="../../public/images/logo.png" alt="Logo" className='w-20 h-20 rounded-md' />
          </NavLink>
        </div>
        <div className="nav-links mr-28 space-x-4">
          <NavLink
            to="/register"
            className="hover:text-navy transition ease-in-out duration-150"
          >
            Register
          </NavLink>
        </div>
      </div>
    </ul>
  );
};

export default Navbar;
