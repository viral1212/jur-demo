import { all, fork } from 'redux-saga/effects';
import contactSaga from './contacts';
import conversionsSaga from './conversions';

export default function* root() {
  yield all([fork(contactSaga), fork(conversionsSaga)]);
}
