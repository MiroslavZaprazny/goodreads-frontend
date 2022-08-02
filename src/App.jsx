import { useEffect, useState } from 'react';

const App = () => {
  const [users, setUsers] = useState(null);
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/users', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((result) => setUsers(result));
  }, []);
  return (
    <>
      <ul>
        {users && users.map((user) => <li key={user.id}>{user.name}</li>)}
        No users
      </ul>
    </>
  );
};
export default App;
