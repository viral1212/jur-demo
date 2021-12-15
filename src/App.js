import { useState } from 'react';
import AllConversions from './containers/AllConversions';
import Conversions from './containers/Conversions';
import FirstTimeUser from './containers/FirstTimeUser';
import SelectedContacts from './containers/SelectedContacts';
import NoConversationLayout from './containers/NoConversationLayout';

const contactList = [
  {
    id: 1,
    title: 'Amanda Nano',
    description: 'Hey there! I’m using Jur chat',
  },
  {
    id: 2,
    title: 'Rama Jr',
    description: 'Busy',
  },
  {
    id: 3,
    title: 'George Silva',
    description: 'Call if urgent',
  },
  {
    id: 4,
    title: 'Fu Shang',
    description: 'New day, new challenges',
  },
  {
    id: 5,
    title: 'Person Name',
    description: 'Chat only',
  },
  {
    id: 6,
    title: 'Person Name',
    description: 'Hey there! I’m using Jur chat',
  },
];

function App() {
  const [screenCount, setScreenCount] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedContactsforConv, setSelectedContactsforConv] = useState(null);
  const [conversations, setConversations] = useState(null);

  switch (screenCount) {
    case 1:
      return (
        <FirstTimeUser
          contactList={contactList}
          setSelectedUser={setSelectedUser}
          setScreenCount={setScreenCount}
        />
      );
    case 2:
      return (
        <NoConversationLayout
          selectedUser={selectedUser}
          contactList={contactList}
          setSelectedContactsforConv={setSelectedContactsforConv}
          setScreenCount={setScreenCount}
        />
      );
    case 3:
      return (
        <SelectedContacts
          selectedUser={selectedUser}
          selectedContactsforConvo={selectedContactsforConv}
          setConversations={setConversations}
          setScreenCount={setScreenCount}
        />
      );
    case 4:
      return (
        <Conversions
          conversations={conversations}
          setScreenCount={setScreenCount}
        />
      );
    case 5:
      return <AllConversions setScreenCount={setScreenCount} />;

    default:
      return <></>;
  }
}

export default App;
