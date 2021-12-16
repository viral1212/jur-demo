import { all, fork, put, select, takeEvery } from 'redux-saga/effects';
import { customAxios } from '../../config/axios';
import { REQUEST } from '../actions/common';
import {
  addConversationAction,
  addConversationsMessagesAction,
  ADD_CONVERSATION,
  ADD_CONVERSATIONS_MESSAGE,
  getConversationAction,
  getConversationsListAction,
  getConversationsMessageAction,
  getConversationsMessageListAction,
  GET_CONVERSATION,
  GET_CONVERSATIONS_LIST,
  GET_CONVERSATIONS_MESSAGE,
  GET_CONVERSATIONS_MESSAGE_LIST,
} from '../actions/conversations';

function* getConversationList(action) {
  try {
    const { successCB } = action;
    const user_id = yield select((state) => state.Contact.selectedUser.id);

    const payload = yield customAxios
      .get('/conversations', {
        headers: { user_id },
      })
      .then((res) => res.data)
      .catch((err) => console.error(err));

    if (successCB && payload) {
      successCB();
    }
    yield put(getConversationsListAction.success(payload));
  } catch (error) {
    yield put(getConversationsListAction.success(error));
    console.error(error);
  }
}

function* addConversation(action) {
  try {
    const { query } = action;
    const user_id = yield select((state) => state.Contact.selectedUser.id);

    const payload = yield customAxios
      .post('/conversations', query, {
        headers: { user_id },
      })
      .then((res) => res.data)
      .catch((err) => console.error(err));

    yield put(addConversationAction.success(payload));
  } catch (error) {
    yield put(addConversationAction.success(error));
    console.error(error);
  }
}

function* getConversion(action) {
  try {
    const { query } = action;
    const user_id = yield select((state) => state.Contact.selectedUser.id);

    const payload = yield customAxios
      .get(`/conversations/${query}`, {
        headers: { user_id },
      })
      .then((res) => res.data)
      .catch((err) => console.error(err));

    yield put(getConversationAction.success(payload));
  } catch (error) {
    yield put(getConversationAction.success(error));
    console.error(error);
  }
}

function* addMessage(action) {
  try {
    const { query } = action;
    const { body, successCB } = query;

    const user_id = yield select((state) => state.Contact.selectedUser.id);
    const id = yield select((state) => state.Conversation.conversations.id);

    const payload = yield customAxios
      .post(`/conversations/${id}/messages`, body, {
        headers: { user_id },
      })
      .then((res) => res.data)
      .catch((err) => console.error(err));

    if (successCB && payload) {
      successCB();
    }
    yield put(addConversationsMessagesAction.success(payload));
  } catch (error) {
    yield put(addConversationsMessagesAction.success(error));
    console.error(error);
  }
}

function* getMessagesList(action) {
  try {
    const { id } = action;
    const user_id = yield select((state) => state.Contact.selectedUser.id);

    const payload = yield customAxios
      .get(`/conversations/${id}/messages`, {
        headers: { user_id },
      })
      .then((res) => res.data)
      .catch((err) => console.error(err));

    yield put(getConversationsMessageListAction.success(payload));
  } catch (error) {
    yield put(getConversationsMessageListAction.success(error));
    console.error(error);
  }
}

function* getMessage(action) {
  try {
    const { id, messageId, successCB } = action;
    const user_id = yield select((state) => state.Contact.selectedUser.id);

    const payload = yield customAxios
      .get(`/conversations/${id}/messages/${messageId}`, {
        headers: { user_id },
      })
      .then((res) => res.data)
      .catch((err) => console.error(err));

    if (successCB && payload) {
      successCB();
    }
    yield put(getConversationsMessageAction.success(payload));
  } catch (error) {
    yield put(getConversationsMessageAction.success(error));
    console.error(error);
  }
}

function* watchGetConversationList() {
  yield takeEvery(GET_CONVERSATIONS_LIST[REQUEST], getConversationList);
}
function* watchAddConversation() {
  yield takeEvery(ADD_CONVERSATION[REQUEST], addConversation);
}
function* watchGetConversion() {
  yield takeEvery(GET_CONVERSATION[REQUEST], getConversion);
}
function* watchAddMessage() {
  yield takeEvery(ADD_CONVERSATIONS_MESSAGE[REQUEST], addMessage);
}
function* watchGetMessagesList() {
  yield takeEvery(GET_CONVERSATIONS_MESSAGE_LIST[REQUEST], getMessagesList);
}
function* watchGetMessage() {
  yield takeEvery(GET_CONVERSATIONS_MESSAGE[REQUEST], getMessage);
}

export default function* ConversationSaga() {
  yield all([
    fork(watchGetConversationList),
    fork(watchAddConversation),
    fork(watchGetConversion),
    fork(watchAddMessage),
    fork(watchGetMessagesList),
    fork(watchGetMessage),
  ]);
}