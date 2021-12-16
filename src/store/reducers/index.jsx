import { combineReducers } from 'redux';
import contactsReducers from './contacts';
import conversationsReducers from './conversation';
import screensReducers from './screen';

const rootReducer = combineReducers({
  Screen: screensReducers,
  Contact: contactsReducers,
  Conversation: conversationsReducers,
});

export default rootReducer;
