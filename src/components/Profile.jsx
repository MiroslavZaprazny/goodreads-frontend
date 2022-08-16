import React from 'react';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const Profile = () => {
  const [id, setId] = useState();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch('http://127.0.0.1:8000/api/user', {
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'include',
      });
      const content = await response.json();
      setId(content.id);
      setName(content.name);
      setEmail(content.email);
    };
    fetchUserData();
  }, []);

  const handleSubmit = () => {
    const sendData = async () => {
      const response = await fetch(`http://127.0.0.1:8000/api/user/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name, email: email }),
      });
      const content = await response.json();
      setName(content.name);
      setSuccessMessage(content.message);
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
      setEmail(content.email);
    };
    sendData();
  };

  return (
    <div className="profile mx-auto w-160 border rounded-xl px-4 py-5">
      <h3 className="font-semibold text-lg text-gray-800">
        Edit your profile!
      </h3>
      <p className="text-xs text-gray-400">
        In order to change your profile picture please visit
        <a
          className="ml-1 text-gray-500 hover:text-gray-600 hover:underline"
          href=" https://sk.gravatar.com/ "
        >
          Gravatar.
        </a>
      </p>
      <AnimatePresence>
        {successMessage && (
          <motion.p
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-4 text-sm text-green-500 font-medium"
          >
            {successMessage}
          </motion.p>
        )}
      </AnimatePresence>
      <div className="flex flex-col mt-8 ml-2">
        {id && (
          <>
            <div className="flex flex-col w-3/4">
              <label className="text-sm font-semibold text-gray-700">
                Username
              </label>
              <input
                type="text"
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
                className="border text-gray-700 px-4 py-2 rounded-lg text-sm mt-1"
              />
            </div>
            <div className="flex flex-col w-3/4 mt-5">
              <label className="text-sm font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border text-gray-700 px-4 py-2 rounded-lg text-sm mt-1"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="bg-gray-600 text-white hover:bg-gray-700 px-4 py-2 w-28 rounded-lg mt-8 transition ease-in duration-150"
            >
              Update
            </button>
          </>
        )}
      </div>
    </div>
  );
};
export default Profile;
