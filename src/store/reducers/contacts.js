import { FAILURE, REQUEST, RESET, SUCCESS } from '../actions/common';
import {
  GET_CONTACTS_LIST,
  SELECTED_CONTACT,
  SELECTED_CONTACT_FOR_CONVERSATIONS,
} from '../actions/contacts';

const initialState = {
  isLoading: false,
  selectedUser: {},
  contactList: [],
  conversationContacts: [],
  error: null,
};

const contactsReducers = (
  state = initialState,
  { payload, error, query, ...action }
) => {
  switch (action.type) {
    case SELECTED_CONTACT[REQUEST]:
      return {
        ...state,
        isLoading: false,
        selectedUser: query,
      };
    case SELECTED_CONTACT[FAILURE]:
      return {
        ...state,
        isLoading: false,
        selectedUser: {},
        error: query,
      };

    case GET_CONTACTS_LIST[REQUEST]:
      return {
        ...state,
        isLoading: true,
      };
    case GET_CONTACTS_LIST[SUCCESS]:
      return {
        ...state,
        contactList: payload,
        error: null,
        isLoading: false,
      };
    case GET_CONTACTS_LIST[FAILURE]:
      return {
        ...state,
        isLoading: false,
        error: query,
      };

    case SELECTED_CONTACT_FOR_CONVERSATIONS[REQUEST]:
      return {
        ...state,
        isLoading: false,
        conversationContacts: query,
      };
    case SELECTED_CONTACT_FOR_CONVERSATIONS[RESET]:
      return {
        ...state,
        isLoading: false,
        conversationContacts: [],
      };

    default:
      return state;
  }
};

export default contactsReducers;
