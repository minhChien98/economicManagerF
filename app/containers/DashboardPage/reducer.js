/*
 *
 * DashboardPage reducer
 *
 */
import produce from 'immer';
import { fromJS } from 'immutable';
import { DEFAULT_ACTION, GET_REPORT, GET_REPORT_SUCCESS, GET_REPORT_FAILED, GET_COLLABOTOR, GET_COLLABOTOR_SUCCESS, GET_COLLABOTOR_FAILED, GET_IMPORT_STOCK, GET_IMPORT_STOCK_SUCCESS, GET_IMPORT_STOCK_FAILED, GET_EMPLOYEE, GET_EMPLOYEE_SUCCESS, GET_EMPLOYEE_FAILED, GET_SELL_RECORD, GET_SELL_RECORD_SUCCESS, GET_SELL_RECORD_FAILED } from './constants';

export const initialState = fromJS({});

/* eslint-disable default-case, no-param-reassign */
const dashboardPageReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, (/* draft */) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case GET_REPORT:
        return state
          .set('loading', true)
          .set('success', false)
          .set('error', false);
      case GET_REPORT_SUCCESS:
        return state
          .set('loading', false)
          .set('countReport', action.data.count)
          .set('reportList', action.data.list)
          .set('success', true)
          .set('error', false);
      case GET_REPORT_FAILED:
        return state
          .set('loading', false)
          .set('success', false)
          .set('error', true);
      case GET_COLLABOTOR:
        return state
          .set('loading', true)
          .set('success', false)
          .set('error', false);
      case GET_COLLABOTOR_SUCCESS:
        return state
          .set('loading', false)
          .set('countCollaborator', action.data.count)
          .set('collaboratorList', action.data.list)
          .set('success', true)
          .set('error', false);
      case GET_COLLABOTOR_FAILED:
        return state
          .set('loading', false)
          .set('success', false)
          .set('error', true);
      case GET_IMPORT_STOCK:
        return state
          .set('loading', true)
          .set('success', false)
          .set('error', false);
      case GET_IMPORT_STOCK_SUCCESS:
        return state
          .set('loading', false)
          .set('countImportStock', action.data.count)
          .set('importStockList', action.data.list)
          .set('success', true)
          .set('error', false);
      case GET_IMPORT_STOCK_FAILED:
        return state
          .set('loading', false)
          .set('success', false)
          .set('error', true);
      case GET_EMPLOYEE:
        return state
          .set('loading', true)
          .set('success', false)
          .set('error', false);
      case GET_EMPLOYEE_SUCCESS:
        return state
          .set('loading', false)
          .set('countEmployee', action.data.count)
          .set('employeeList', action.data.list)
          .set('success', true)
          .set('error', false);
      case GET_EMPLOYEE_FAILED:
        return state
          .set('loading', false)
          .set('success', false)
          .set('error', true);
      case GET_SELL_RECORD:
        return state
          .set('loading', true)
          .set('success', false)
          .set('error', false);
      case GET_SELL_RECORD_SUCCESS:
        return state
          .set('loading', false)
          .set('countSellRecord', action.data.count)
          .set('sellRecordList', action.data.list)
          .set('success', true)
          .set('error', false);
      case GET_SELL_RECORD_FAILED:
        return state
          .set('loading', false)
          .set('success', false)
          .set('error', true);
    }
  });

export default dashboardPageReducer;
