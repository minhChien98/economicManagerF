import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the timekeepingPage state domain
 */

const selectTimekeepingPageDomain = state =>
  state.timekeepingPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TimekeepingPage
 */

const makeSelectTimekeepingPage = () =>
  createSelector(
    selectTimekeepingPageDomain,
    substate => substate.toJS(),
  );

export default makeSelectTimekeepingPage;
export { selectTimekeepingPageDomain };
