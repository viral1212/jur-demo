import { all, fork, put, takeEvery } from 'redux-saga/effects';
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
} from '../actions/conversions';

function* getConversionsList(action) {
  try {
    const { successCB } = action;
    const payload = yield customAxios.get('/conversations');

    if (successCB) {
      successCB();
    }
    yield put(getConversationsListAction.success(payload));
  } catch (error) {
    yield put(getConversationsListAction.success(error));
    console.error(error);
  }
}
function* addConversions(action) {
  try {
    const { successCB, body } = action;
    const payload = yield customAxios.post('/conversations', body);

    if (successCB) {
      successCB();
    }
    yield put(addConversationAction.success(payload));
  } catch (error) {
    yield put(addConversationAction.success(error));
    console.error(error);
  }
}
function* getConversion(action) {
  try {
    const { id, successCB } = action;
    const payload = yield customAxios.get(`/conversations/:${id}`);

    if (successCB) {
      successCB();
    }
    yield put(getConversationAction.success(payload));
  } catch (error) {
    yield put(getConversationAction.success(error));
    console.error(error);
  }
}
function* addMessage(action) {
  try {
    const { successCB, body, id } = action;
    const payload = yield customAxios.post(
      `/conversations/:${id}/messages`,
      body
    );

    if (successCB) {
      successCB();
    }
    yield put(addConversationsMessagesAction.success(payload));
  } catch (error) {
    yield put(addConversationsMessagesAction.success(error));
    console.error(error);
  }
}
function* getMessage(action) {
  try {
    const { id, successCB } = action;
    const payload = yield customAxios.get(
      `/conversations/:${id}/messages/:messageId`
    );

    if (successCB) {
      successCB();
    }
    yield put(getConversationsMessageAction.success(payload));
  } catch (error) {
    yield put(getConversationsMessageAction.success(error));
    console.error(error);
  }
}
function* getMessagesList(action) {
  try {
    const { id, successCB } = action;
    const payload = yield customAxios.get(`/conversations/:${id}/messages`);

    if (successCB) {
      successCB();
    }
    yield put(getConversationsMessageListAction.success(payload));
  } catch (error) {
    yield put(getConversationsMessageListAction.success(error));
    console.error(error);
  }
}

function* watchGetConversionsList() {
  yield takeEvery(GET_CONVERSATIONS_LIST[REQUEST], getConversionsList);
}
function* watchAddConversions() {
  yield takeEvery(ADD_CONVERSATION[REQUEST], addConversions);
}
function* watchGetConversion() {
  yield takeEvery(GET_CONVERSATION[REQUEST], getConversion);
}
function* watchAddMessage() {
  yield takeEvery(ADD_CONVERSATIONS_MESSAGE[REQUEST], addMessage);
}
function* watchGetMessage() {
  yield takeEvery(GET_CONVERSATIONS_MESSAGE[REQUEST], getMessage);
}
function* watchGetMessagesList() {
  yield takeEvery(GET_CONVERSATIONS_MESSAGE_LIST[REQUEST], getMessagesList);
}

export default function* conversionsSaga() {
  yield all([
    fork(watchGetConversionsList),
    fork(watchAddConversions),
    fork(watchGetConversion),
    fork(watchAddMessage),
    fork(watchGetMessage),
    fork(watchGetMessagesList),
  ]);
}
