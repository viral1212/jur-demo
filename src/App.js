import { useState } from 'react';
import FirstTimeUser from './containers/FirstTimeUser/FirstTimeUser';
import NewConversions from './containers/NewConversions';

function App() {
  const [selectedUser, setSelectedUser] = useState(null);
  return (
    <div className="bg-white">
      {!selectedUser ? (
        <FirstTimeUser setSelectedUser={setSelectedUser} />
      ) : (
        <NewConversions />
      )}
    </div>
  );
}

export default App;
