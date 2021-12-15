import { createActionGroup, createRequestTypes } from './common';

// GET CONVERSATIONS
export const GET_CONVERSATIONS_LIST = createRequestTypes(
  'GET_CONVERSATIONS_LIST'
);
export const getConversationsListAction = createActionGroup(
  GET_CONVERSATIONS_LIST
);

// ADD CONVERSATIONS
export const ADD_CONVERSATION = createRequestTypes('ADD_CONVERSATION');
export const addConversationAction = createActionGroup(ADD_CONVERSATION);

// GET CONVERSATIONS BY ID
export const GET_CONVERSATION = createRequestTypes('GET_CONVERSATION');
export const getConversationAction = createActionGroup(GET_CONVERSATION);

// ADD CONVERSATIONS MESSAGE
export const ADD_CONVERSATIONS_MESSAGE = createRequestTypes(
  'ADD_CONVERSATIONS_MESSAGE'
);
export const addConversationsMessagesAction = createActionGroup(
  ADD_CONVERSATIONS_MESSAGE
);

// GET CONVERSATIONS MESSAGE BY MESSAGE ID
export const GET_CONVERSATIONS_MESSAGE = createRequestTypes(
  'GET_CONVERSATIONS_MESSAGE'
);
export const getConversationsMessageAction = createActionGroup(
  GET_CONVERSATIONS_MESSAGE
);

// GET CONVERSATIONS MESSAGE LIST
export const GET_CONVERSATIONS_MESSAGE_LIST = createRequestTypes(
  'GET_CONVERSATIONS_MESSAGE_LIST'
);
export const getConversationsMessageListAction = createActionGroup(
  GET_CONVERSATIONS_MESSAGE_LIST
);
