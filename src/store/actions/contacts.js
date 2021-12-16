import { createActionGroup, createRequestTypes } from './common';

// SET SELECTED CONTACT
export const SELECTED_CONTACT = createRequestTypes('SELECTED_CONTACT');
export const setSelectedContactAction = createActionGroup(SELECTED_CONTACT);

// GET CONTACTS
export const GET_CONTACTS_LIST = createRequestTypes('GET_CONTACTS_LIST');
export const getContactsListAction = createActionGroup(GET_CONTACTS_LIST);

// SET SELECTED CONTACTS FOR CONVERSATIONS
export const SELECTED_CONTACT_FOR_CONVERSATIONS = createRequestTypes(
  'SELECTED_CONTACT_FOR_CONVERSATIONS'
);
export const setSelectedContactForConversationAction = createActionGroup(
  SELECTED_CONTACT_FOR_CONVERSATIONS
);
