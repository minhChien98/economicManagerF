import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the sellPage state domain
 */

const selectSellPageDomain = state => state.sellPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SellPage
 */

const makeSelectSellPage = () =>
  createSelector(
    selectSellPageDomain,
    substate => substate.toJS(),
  );

export default makeSelectSellPage;
export { selectSellPageDomain };
