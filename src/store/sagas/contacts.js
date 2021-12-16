import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { customAxios } from '../../config/axios';
import { showPopup } from '../../utils/toast-notification';
import { REQUEST } from '../actions/common';
import { getContactsListAction, GET_CONTACTS_LIST } from '../actions/contacts';

function* getContacts(action) {
  try {
    const { successCB } = action;
    const payload = yield customAxios
      .get('/contacts')
      .then((res) => res.data)
      .catch((error) => {
        throw error?.message || 'something went wrong';
      });

    if (successCB && payload) {
      successCB();
    }
    yield put(getContactsListAction.success(payload));
  } catch (error) {
    showPopup(error);
    yield put(getContactsListAction.failure(error));
    console.error(error);
  }
}

function* watchGetContacts() {
  yield takeEvery(GET_CONTACTS_LIST[REQUEST], getContacts);
}

export default function* contactSaga() {
  yield all([fork(watchGetContacts)]);
}
