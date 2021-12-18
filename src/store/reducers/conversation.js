import { FAILURE, REQUEST, SUCCESS } from '../actions/common';
import {
  ADD_CONVERSATION,
  ADD_CONVERSATIONS_MESSAGE,
  GET_CONVERSATION,
  GET_CONVERSATIONS_LIST,
  GET_CONVERSATIONS_MESSAGE,
  GET_CONVERSATIONS_MESSAGE_LIST,
} from '../actions/conversations';

const initialState = {
  isLoading: false,
  conversationList: [],
  addNewconversationsData: null,
  conversations: {},
  addNewconversationsMessageData: null,
  message: {},
  messageList: [],
  error: null,
};

const conversationsReducers = (
  state = initialState,
  { payload, error, query, ...action }
) => {
  switch (action.type) {
    case GET_CONVERSATIONS_LIST[REQUEST]:
    case ADD_CONVERSATION[REQUEST]:
    case GET_CONVERSATION[REQUEST]:
    case ADD_CONVERSATIONS_MESSAGE[REQUEST]:
    case GET_CONVERSATIONS_MESSAGE_LIST[REQUEST]:
      return {
        ...state,
        isLoading: true,
      };
    case GET_CONVERSATIONS_LIST[SUCCESS]:
      return {
        ...state,
        conversationList: payload,
        error: null,
        isLoading: false,
      };
    case GET_CONVERSATIONS_LIST[FAILURE]:
      return {
        ...state,
        isLoading: false,
        error: query,
      };

    case ADD_CONVERSATION[SUCCESS]:
      return {
        ...state,
        addNewconversationsData: payload,
        error: null,
        isLoading: false,
      };
    case ADD_CONVERSATION[FAILURE]:
      return {
        ...state,
        isLoading: false,
        error: query,
      };

    case GET_CONVERSATION[SUCCESS]:
      return {
        ...state,
        conversations: payload,
        error: null,
        isLoading: false,
      };
    case GET_CONVERSATION[FAILURE]:
      return {
        ...state,
        isLoading: false,
        error: query,
      };

    case ADD_CONVERSATIONS_MESSAGE[SUCCESS]:
      return {
        ...state,
        addNewconversationsMessageData: payload,
        error: null,
        isLoading: false,
      };
    case ADD_CONVERSATIONS_MESSAGE[FAILURE]:
      return {
        ...state,
        isLoading: false,
        error: query,
      };

    case GET_CONVERSATIONS_MESSAGE[REQUEST]:
      return {
        ...state,
        message: {},
        isLoading: true,
      };
    case GET_CONVERSATIONS_MESSAGE[SUCCESS]:
      return {
        ...state,
        message: payload,
        error: null,
        isLoading: false,
      };
    case GET_CONVERSATIONS_MESSAGE[FAILURE]:
      return {
        ...state,
        isLoading: false,
        error: query,
      };

    case GET_CONVERSATIONS_MESSAGE_LIST[SUCCESS]:
      return {
        ...state,
        messageList: payload,
        error: null,
        isLoading: false,
      };
    case GET_CONVERSATIONS_MESSAGE_LIST[FAILURE]:
      return {
        ...state,
        isLoading: false,
        error: query,
      };

    default:
      return state;
  }
};

export default conversationsReducers;
