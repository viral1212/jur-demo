import { all, fork } from 'redux-saga/effects';
import contactSaga from './contacts';
import conversationSaga from './conversation';

export default function* root() {
  yield all([fork(contactSaga), fork(conversationSaga)]);
}
