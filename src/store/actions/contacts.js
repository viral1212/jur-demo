import { createActionGroup, createRequestTypes } from './common';

// GET CONTACTS
export const GET_CONTACTS_LIST = createRequestTypes('GET_CONTACTS_LIST');
export const getContactsListAction = createActionGroup(GET_CONTACTS_LIST);
