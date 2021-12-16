import { createActionGroup, createRequestTypes } from './common';

// SET CURRENT SCREEN
export const SET_CURRENT_SCREEN = createRequestTypes('SET_CURRENT_SCREEN');
export const setCurrentScreenAction = createActionGroup(SET_CURRENT_SCREEN);
