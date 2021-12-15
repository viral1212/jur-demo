import { useState } from 'react';
import FirstTimeUser from './containers/FirstTimeUser/FirstTimeUser';

function App() {
  const [selectedUser, setSelectedUser] = useState(null);
  return (
    <>
      {!selectedUser ? (
        <FirstTimeUser setSelectedUser={setSelectedUser} />
      ) : (
        <div>No New User</div>
      )}
    </>
  );
}

export default App;
