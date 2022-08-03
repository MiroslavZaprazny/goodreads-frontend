import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState();
  const [successMessage, setSuccessMessage] = useState();

  const handleSubmit = async () => {
    let userInfo = { email, password, password_confirmation };
    let result = await fetch('http://127.0.0.1:8000/api/register', {
      method: 'POST',
      body: JSON.stringify(userInfo),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    setEmail('');
    setPassword('');
    setPasswordConfirmation('');
    result = await result.json();
    if (result.status != 200) {
      setError(result.validate_err);
    } else if (result.status == 200) {
      setError('');
      setSuccessMessage(result.message);
    }
  };
  useEffect(() => {
    setTimeout(() =>{
      setSuccessMessage('')
    }, 5000)
  }, [successMessage]);
  return (
    <div>
      <div className="container w-3/4 xl:w-1/3 shadow-sm border rounded-xl mx-auto space-y-6 py-8 px-6">
        <div className="font-semibold text-gray-700 text-xl">
          <p>Create an account!</p>
          <p className="text-sm text-gray-400 font-normal">
            If you have an account click here to
            <span className="ml-1 uppercase font-semibold text-xs hover:text-gray-500 transition ease-in-out duration-150">
              <Link to="/login">Login</Link>
            </span>
            .
          </p>
        </div>
        {/* <div className="row flex flex-col w-full">
          <label className="font-semibold text-gray-800 mb-2">Username</label>
          <input
            type="text"
            name="name"
            className="rounded-lg border border-gray-300 text-gray-700 h-10 px-2 py-5"
            placeholder="Enter your username..."
          />
        </div> */}
        <div className="row flex flex-col w-full">
          <label className="font-semibold text-gray-800 mb-2">Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            className="rounded-lg border border-gray-300 text-gray-700 h-10 px-2 py-5"
            placeholder="Enter your email..."
          />
          {error && (
            <span className="text-sm text-red-500 mt-1 ml-2 transition ease-in duration-300">
              {error.email}
            </span>
          )}
        </div>
        <div className="row flex flex-col w-full">
          <label className="font-semibold text-gray-800 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            className="rounded-lg border border-gray-300 text-gray-700 h-10 px-2 py-5"
            placeholder="Enter your password..."
          />
          {error && (
            <span className="text-sm text-red-500 mt-1 ml-2 transition ease-in duration-300">
              {error.password}
            </span>
          )}
        </div>
        <div className="row flex flex-col w-full">
          <label className="font-semibold text-gray-800 mb-2">
            Repeat Password
          </label>
          <input
            type="password"
            name="password_confirmation"
            value={password_confirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            className="rounded-lg border border-gray-300 text-gray-700 h-10 px-2 py-5"
            placeholder="Repeat your password..."
          />
          {error && (
            <span className="text-sm text-red-500 mt-1 ml-2 transition ease-in duration-300">
              {error.password_confirmation}
            </span>
          )}
        </div>
        <button
          onClick={handleSubmit}
          className="rounded-lg border font-semibold text-sm text-gray-700 hover:bg-gray-50 transition ease-out duration-100 px-8  py-2 mt-4"
        >
          Register
        </button>
        {successMessage && (
          <p className="mt-2 text-green-500 text-lg font-medium transition-all">
            {successMessage}
          </p>
        )}
      </div>
    </div>
  );
};
export default Register;
