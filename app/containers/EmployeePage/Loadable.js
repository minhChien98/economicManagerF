/**
 *
 * Asynchronously loads the component for EmployeePage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
