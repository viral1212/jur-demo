import { FAILURE, REQUEST, SUCCESS } from '../actions/common';
import {
  ADD_CONVERSATION,
  ADD_CONVERSATIONS_MESSAGE,
  GET_CONVERSATION,
  GET_CONVERSATIONS_LIST,
  GET_CONVERSATIONS_MESSAGE,
  GET_CONVERSATIONS_MESSAGE_LIST,
} from '../actions/conversions';

const initialState = {
  isLoading: false,
  conversionsList: [],
  addNewconversationsId: null,
  conversations: {},
  addNewconversationsMessageId: null,
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
      return {
        ...state,
        isLoading: true,
      };
    case GET_CONVERSATIONS_LIST[SUCCESS]:
      return {
        ...state,
        conversionsList: payload,
        error: null,
        isLoading: false,
      };
    case GET_CONVERSATIONS_LIST[FAILURE]:
      return {
        ...state,
        isLoading: false,
        error,
      };

    case ADD_CONVERSATION[REQUEST]:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_CONVERSATION[SUCCESS]:
      return {
        ...state,
        addNewconversationsId: payload,
        error: null,
        isLoading: false,
      };
    case ADD_CONVERSATION[FAILURE]:
      return {
        ...state,
        isLoading: false,
        error,
      };

    case GET_CONVERSATION[REQUEST]:
      return {
        ...state,
        isLoading: true,
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
        error,
      };

    case ADD_CONVERSATIONS_MESSAGE[REQUEST]:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_CONVERSATIONS_MESSAGE[SUCCESS]:
      return {
        ...state,
        addNewconversationsMessageId: payload,
        error: null,
        isLoading: false,
      };
    case ADD_CONVERSATIONS_MESSAGE[FAILURE]:
      return {
        ...state,
        isLoading: false,
        error,
      };

    case GET_CONVERSATIONS_MESSAGE[REQUEST]:
      return {
        ...state,
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
        error,
      };

    case GET_CONVERSATIONS_MESSAGE_LIST[REQUEST]:
      return {
        ...state,
        isLoading: true,
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
        error,
      };

    default:
      return state;
  }
};

export default conversationsReducers;
