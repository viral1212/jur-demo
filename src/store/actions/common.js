/** @file contains the action to be dispatched */
export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';
export const RESET = 'RESET';

/**
 * Function creates request types
 *
 * @param {string} base - Resquest type
 * @returns {Array} Returns array object
 */
export function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE, RESET].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
}

/**
 * Function to create actions
 *
 * @param {string} type - Action type
 * @param {object} payload - Payload
 *
 * @returns {object} returns Type and payload
 */
export function action(type, payload = {}) {
  return { type, ...payload };
}

/**
 * @returns {{request: (query) => {type: string}, success: (payload) => {type: string}, failure: (query) => {type: string}}}
 * @param actionRoot
 */
export const createActionGroup = (actionRoot) => ({
  /**
   * Implementing request action
   *
   * @param {object} query - Request project body.
   * @returns {object} Request action
   */
  request: (query = '') => action(actionRoot[REQUEST], { query }),
  /**
   * Implementing success action
   *
   * @param {object} payload - Payload action
   * @returns {object} Success action
   */
  success: (payload) => action(actionRoot[SUCCESS], { payload }),
  /**
   * Implementing failure action
   *
   * @param {object} query - Failure query object.
   * @returns {object} Failure action
   */
  failure: (query) => action(actionRoot[FAILURE], { query }),
});
