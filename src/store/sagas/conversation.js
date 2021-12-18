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
import { showPopup } from '../../utils/toast-notification';

function* getConversationList(action) {
  try {
    const { successCB } = action;
    const user_id = yield select((state) => state.Contact.selectedUser.id);

    const { data } = yield customAxios.get('/conversations', {
      headers: { user_id },
    });

    if (successCB && data) {
      successCB();
    }
    yield put(getConversationsListAction.success(data));
  } catch (error) {
    const { message = 'something went wrong' } = error;
    showPopup(message);
    yield put(getConversationsListAction.failure(message));
    console.error(error);
  }
}

function* addConversation(action) {
  try {
    const { query } = action;
    const user_id = yield select((state) => state.Contact.selectedUser.id);

    const { data } = yield customAxios.post('/conversations', query, {
      headers: { user_id },
    });

    yield put(addConversationAction.success(data));
  } catch (error) {
    const { message = 'something went wrong' } = error;
    showPopup(message);
    yield put(addConversationAction.failure(message));
    console.error(error);
  }
}

function* getConversion(action) {
  try {
    const { query } = action;
    const user_id = yield select((state) => state.Contact.selectedUser.id);

    const { data } = yield customAxios.get(`/conversations/${query}`, {
      headers: { user_id },
    });

    yield put(getConversationAction.success(data));
  } catch (error) {
    const { message = 'something went wrong' } = error;
    showPopup(message);
    yield put(getConversationAction.failure(message));
    console.error(error);
  }
}

function* addMessage(action) {
  try {
    const { query } = action;
    const { body, successCB } = query;

    const user_id = yield select((state) => state.Contact.selectedUser.id);
    const id = yield select((state) => state.Conversation.conversations.id);

    const { data } = yield customAxios.post(
      `/conversations/${id}/messages`,
      body,
      {
        headers: { user_id },
      }
    );

    if (successCB && data) {
      successCB();
    }
    yield put(addConversationsMessagesAction.success(data));
  } catch (error) {
    const { message = 'something went wrong' } = error;
    showPopup(message);
    yield put(addConversationsMessagesAction.failure(message));
    console.error(error);
  }
}

function* getMessagesList(action) {
  try {
    const { query } = action;
    const user_id = yield select((state) => state.Contact.selectedUser.id);

    const { data } = yield customAxios.get(`/conversations/${query}/messages`, {
      headers: { user_id },
    });

    yield put(getConversationsMessageListAction.success(data));
  } catch (error) {
    const { message = 'something went wrong' } = error;
    showPopup(message);
    yield put(getConversationsMessageListAction.failure(message));
    console.error(error);
  }
}

function* getMessage(action) {
  try {
    const { query } = action;
    const { id, messageId, successCB } = query;
    const user_id = yield select((state) => state.Contact.selectedUser.id);

    const { data: coversationsData } = yield customAxios.get(
      `/conversations/${id}`,
      {
        headers: { user_id },
      }
    );
    if (coversationsData) {
      const { data } = yield customAxios.get(
        `/conversations/${id}/messages/${messageId}`,
        {
          headers: { user_id },
        }
      );

      if (successCB && data) {
        const { conversation_id, sender_name, content } = data;
        successCB(
          conversation_id,
          sender_name,
          coversationsData.title,
          content
        );
      }

      yield put(
        getConversationsMessageAction.success({
          ...data,
          title: coversationsData.title,
        })
      );
    }
  } catch (error) {
    const { message = 'something went wrong' } = error;
    showPopup(message);
    yield put(getConversationsMessageAction.failure(error));
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
