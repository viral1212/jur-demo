import { useState } from 'react';
import AllConversions from './containers/AllConversions';
import Conversions from './containers/Conversions';
import FirstTimeUser from './containers/FirstTimeUser';
import SelectedContacts from './containers/SelectedContacts';

function App() {
  const [selectedUser, setSelectedUser] = useState(null);
  return (
    <div className="bg-white">
      {!selectedUser ? (
        <FirstTimeUser setSelectedUser={setSelectedUser} />
      ) : (
        <AllConversions />
      )}
      {/* <SelectedContacts /> */}
      {/* <Conversions /> */}
    </div>
  );
}

export default App;
