import { SCREEN_NAME } from '../../utils/screens';
import { REQUEST, RESET } from '../actions/common';
import { SET_CURRENT_SCREEN } from '../actions/screen';

const initialState = {
  currentScreen: SCREEN_NAME.firstTimeUser,
  queryState: {},
};

const screensReducers = (
  state = initialState,
  { payload, error, query, ...action }
) => {
  switch (action.type) {
    case SET_CURRENT_SCREEN[REQUEST]:
      return {
        ...state,
        currentScreen: query.screenName,
        queryState: query.queryState || {},
      };
    case SET_CURRENT_SCREEN[RESET]:
      return {
        ...state,
        currentScreen: SCREEN_NAME.firstTimeUser,
        queryState: {},
      };

    default:
      return state;
  }
};

export default screensReducers;
