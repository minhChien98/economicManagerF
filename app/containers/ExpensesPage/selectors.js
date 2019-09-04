import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the expensesPage state domain
 */

const selectExpensesPageDomain = state => state.expensesPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ExpensesPage
 */

const makeSelectExpensesPage = () =>
  createSelector(
    selectExpensesPageDomain,
    substate => substate.toJS(),
  );

export default makeSelectExpensesPage;
export { selectExpensesPageDomain };
