import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the collaboratorPage state domain
 */

const selectCollaboratorPageDomain = state =>
  state.collaboratorPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CollaboratorPage
 */

const makeSelectCollaboratorPage = () =>
  createSelector(
    selectCollaboratorPageDomain,
    substate => substate.toJS(),
  );

export default makeSelectCollaboratorPage;
export { selectCollaboratorPageDomain };
