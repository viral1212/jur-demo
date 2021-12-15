import { combineReducers } from 'redux';
import contactsReducers from './contacts';
import conversationsReducers from './conversions';

const rootReducer = combineReducers({
  Contacts: contactsReducers,
  Conversations: conversationsReducers,
});

export default rootReducer;
