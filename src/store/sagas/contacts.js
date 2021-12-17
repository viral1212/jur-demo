import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { customAxios } from '../../config/axios';
import { showPopup } from '../../utils/toast-notification';
import { REQUEST } from '../actions/common';
import { getContactsListAction, GET_CONTACTS_LIST } from '../actions/contacts';

function* getContacts(action) {
  try {
    const { successCB } = action;
    const { data } = yield customAxios.get('/contacts');

    if (successCB && data) {
      successCB();
    }
    yield put(getContactsListAction.success(data));
  } catch (error) {
    const { message = 'something went wrong' } = error;
    showPopup(message);
    yield put(getContactsListAction.failure(message));
    console.error(message);
  }
}

function* watchGetContacts() {
  yield takeEvery(GET_CONTACTS_LIST[REQUEST], getContacts);
}

export default function* contactSaga() {
  yield all([fork(watchGetContacts)]);
}
