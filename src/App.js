import React from 'react';
import { useSelector } from 'react-redux';
import AllConversation from './containers/AllConversation';
import NewConversation from './containers/NewConversation';
import FirstTimeUser from './containers/FirstTimeUser';
import SelectedContacts from './containers/SelectedContacts';
import NoExistingConversation from './containers/NoExistingConversation';
import { SCREEN_NAME } from './utils/screens';

export default function App() {
  const Screen = useSelector((state) => state.Screen);
  const { currentScreen } = Screen;

  switch (currentScreen) {
    case SCREEN_NAME.firstTimeUser:
      return <FirstTimeUser />;
    case SCREEN_NAME.noExistingConversation:
      return <NoExistingConversation />;
    case SCREEN_NAME.selectedContacts:
      return <SelectedContacts />;
    case SCREEN_NAME.newConversation:
      return <NewConversation />;
    case SCREEN_NAME.allConversation:
      return <AllConversation />;

    default:
      return <></>;
  }
}
