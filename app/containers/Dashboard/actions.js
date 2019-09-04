/*
 *
 * Dashboard actions
 *
 */

import { DEFAULT_ACTION, CLOSE_SNACKBAR, CHANGE_SNACKBAR } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export const closeSnackbar = () => ({ type: CLOSE_SNACKBAR });

export const changeSnackbar = data => ({ type: CHANGE_SNACKBAR, data });
