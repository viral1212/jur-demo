import { FAILURE, REQUEST, SUCCESS } from '../actions/common';
import { GET_CONTACTS_LIST } from '../actions/contacts';

const initialState = {
  isLoading: false,
  contacts: [],
  error: null,
};

const contactsReducers = (
  state = initialState,
  { payload, error, query, ...action }
) => {
  switch (action.type) {
    case GET_CONTACTS_LIST[REQUEST]:
      return {
        ...state,
        isLoading: true,
      };
    case GET_CONTACTS_LIST[SUCCESS]:
      return {
        ...state,
        contacts: payload,
        error: null,
        isLoading: false,
      };
    case GET_CONTACTS_LIST[FAILURE]:
      return {
        ...state,
        isLoading: false,
        error,
      };

    default:
      return state;
  }
};

export default contactsReducers;
