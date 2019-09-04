import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the employeePage state domain
 */

const selectEmployeePageDomain = state => state.employeePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by EmployeePage
 */

const makeSelectEmployeePage = () =>
  createSelector(
    selectEmployeePageDomain,
    substate => substate.toJS(),
  );

export default makeSelectEmployeePage;
export { selectEmployeePageDomain };
