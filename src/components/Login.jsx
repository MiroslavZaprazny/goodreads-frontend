import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const navigateTo = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();

  const handleSubmit = async () => {
    const data = { email, password };
    const response = await fetch('http://127.0.0.1:8000/api/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const content = await response.json();
    if (content.status == 401) {
      setError(content.message);
      setEmail('');
      setPassword('');
    } else {
      props.setUser(content.user);
      setEmail('');
      setPassword('');
      localStorage.setItem('is_logged_in', content.user.id);
      navigateTo("/")
    }
  };
  return (
    <div className="container w-3/4 xl:w-1/3 shadow-sm border rounded-xl mx-auto space-y-6 py-8 px-6">
      <div className="font-semibold text-gray-700 text-xl">
        <p>Login to your account!</p>
        <span className="text-red-500 font-normal text-sm mt-2">
          {error && error}
        </span>
      </div>
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
      <button
        onClick={handleSubmit}
        className="rounded-lg border font-semibold text-sm text-gray-700 hover:bg-gray-50 transition ease-out duration-100 px-8 py-2 mt-4"
      >
        Login
      </button>
    </div>
  );
};

export default Login;
