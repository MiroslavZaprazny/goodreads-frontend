import React, { useEffect, useState, Fragment } from 'react';
import Login from '../components/Login';
import { Dialog, Transition } from '@headlessui/react';

const Register = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState();
  const [successMessage, setSuccessMessage] = useState();
  const [isLoginVisable, setIsLoginVisable] = useState(false);

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
    setTimeout(() => {
      setSuccessMessage('');
    }, 5000);
  }, [successMessage]);

  return (
    <>
      {isLoginVisable && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
              <div className="relative bg-white rounded-xl text-left overflow-hidden shadow-xl sm:my-8 sm:max-w-lg sm:w-full transition ease-in-out duration-700"></div>
            </div>
          </div>
        </div>
      )}

      <Transition.Root show={isLoginVisable} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setIsLoginVisable}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                  <Login setUser={props.setUser} setIsLoginVisable={setIsLoginVisable} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <div className="container w-3/4 xl:w-1/3 shadow-sm border rounded-xl mx-auto space-y-6 py-8 px-6">
        <div className="font-semibold text-gray-700 text-xl">
          <p>Create an account!</p>
          <p className="text-sm text-gray-400 font-normal">
            If you have an account click here to
            <span className="ml-1 uppercase font-semibold text-xs hover:text-gray-500 transition ease-in-out duration-150">
              <button onClick={() => setIsLoginVisable(true)}>Login</button>
            </span>
          </p>
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
          className="rounded-lg border font-semibold text-sm text-gray-700 hover:bg-gray-100 transition ease-out duration-300 px-8  py-2 mt-4"
        >
          Register
        </button>
        {successMessage && (
          <p className="mt-2 text-green-500 text-lg font-medium transition-all">
            {successMessage}
          </p>
        )}
      </div>
    </>
  );
};
export default Register;
