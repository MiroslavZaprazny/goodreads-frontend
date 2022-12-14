import { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Book from './components/Book';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Register from './components/Register';
import SettingProfile from './components/SettingProfile';

const App = () => {
  const [user, setUser] = useState({});
  const fetchUser = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/user', {
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      credentials: 'include',
    });
    const content = await response.json();
    setUser(content);
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/:book" element={<Book user={user} />} />
        <Route path="/profile/settings/:email" element={<SettingProfile />} />
        <Route path="/profile/:email" element={<Profile />} />
      </Routes>
    </Router>
  );
};
export default App;
