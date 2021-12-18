import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { customAxios } from '../../config/axios';
import { SCREEN_NAME } from '../../utils/screens';
import { showPopup } from '../../utils/toast-notification';
import { REQUEST } from '../actions/common';
import {
  getContactsListAction,
  GET_CONTACTS_LIST,
  SELECTED_CONTACT,
  setSelectedContactAction,
} from '../actions/contacts';
import { setCurrentScreenAction } from '../actions/screen';

function* selectUser(action) {
  try {
    const { query } = action;
    const { id } = query;
    const { data } = yield customAxios.get(`/conversations`, {
      headers: { user_id: id },
    });

    if (data) {
      const haveConversations = data.some((con) => {
        return (
          !!con.last_message?.length && con.last_message[0]?.sender_id === id
        );
      });

      yield put(
        setCurrentScreenAction.request({
          screenName: haveConversations
            ? SCREEN_NAME.allConversation
            : SCREEN_NAME.noExistingConversation,
        })
      );
    }
  } catch (error) {
    const { message = 'something went wrong' } = error;
    showPopup(message);
    yield put(setSelectedContactAction.failure(message));
    console.error(message);
  }
}

function* getContacts() {
  try {
    const { data } = yield customAxios.get('/contacts');

    yield put(getContactsListAction.success(data));
  } catch (error) {
    const { message = 'something went wrong' } = error;
    showPopup(message);
    yield put(getContactsListAction.failure(message));
    console.error(message);
  }
}

function* watchSelectUser() {
  yield takeEvery(SELECTED_CONTACT[REQUEST], selectUser);
}
function* watchGetContacts() {
  yield takeEvery(GET_CONTACTS_LIST[REQUEST], getContacts);
}

export default function* contactSaga() {
  yield all([fork(watchSelectUser), fork(watchGetContacts)]);
}
