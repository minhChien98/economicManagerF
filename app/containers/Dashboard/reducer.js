/*
 *
 * Dashboard reducer
 *
 */
import produce from 'immer';
import { fromJS } from 'immutable';
import { DEFAULT_ACTION, CHANGE_SNACKBAR, CLOSE_SNACKBAR } from './constants';

export const initialState = fromJS({
  message: '',
  variant: null,
  status: false,
});

/* eslint-disable default-case, no-param-reassign */
const dashboardReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, (/* draft */) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case CLOSE_SNACKBAR:
        return state.set('status', false);
      case CHANGE_SNACKBAR:
        return state
          .set('status', action.data.status)
          .set('message', action.data.message)
          .set('variant', action.data.variant);
    }
  });

export default dashboardReducer;
