/*
 *
 * DashboardPage actions
 *
 */

import { DEFAULT_ACTION, GET_REPORT, GET_REPORT_SUCCESS, GET_REPORT_FAILED, GET_COLLABOTOR, GET_COLLABOTOR_SUCCESS, GET_COLLABOTOR_FAILED, GET_IMPORT_STOCK, GET_IMPORT_STOCK_SUCCESS, GET_IMPORT_STOCK_FAILED, GET_EMPLOYEE, GET_EMPLOYEE_SUCCESS, GET_EMPLOYEE_FAILED, GET_SELL_RECORD, GET_SELL_RECORD_SUCCESS, GET_SELL_RECORD_FAILED } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getReportAct(body) {
  return {
    type: GET_REPORT,
    body,
  };
}

export function getReportSuccess(data) {
  return {
    type: GET_REPORT_SUCCESS,
    data,
  };
}

export function getReportFailed(err) {
  return {
    type: GET_REPORT_FAILED,
    err,
  };
}

export function getCollabotorAct(body) {
  return {
    type: GET_COLLABOTOR,
    body,
  };
}

export function getCollabotorSuccess(data) {
  return {
    type: GET_COLLABOTOR_SUCCESS,
    data,
  };
}

export function getCollabotorFailed(err) {
  return {
    type: GET_COLLABOTOR_FAILED,
    err,
  };
}

export function getImportStockAct(body) {
  return {
    type: GET_IMPORT_STOCK,
    body,
  };
}

export function getImportStockSuccess(data) {
  return {
    type: GET_IMPORT_STOCK_SUCCESS,
    data,
  };
}

export function getImportStockFailed(err) {
  return {
    type: GET_IMPORT_STOCK_FAILED,
    err,
  };
}

export function getEmployeeAct(body) {
  return {
    type: GET_EMPLOYEE,
    body,
  };
}

export function getEmployeeSuccess(data) {
  return {
    type: GET_EMPLOYEE_SUCCESS,
    data,
  };
}

export function getEmployeeFailed(err) {
  return {
    type: GET_EMPLOYEE_FAILED,
    err,
  };
}

export function getSellRecordAct(body) {
  return {
    type: GET_SELL_RECORD,
    body,
  };
}

export function getSellRecordSuccess(data) {
  return {
    type: GET_SELL_RECORD_SUCCESS,
    data,
  };
}

export function getSellRecordFailed(err) {
  return {
    type: GET_SELL_RECORD_FAILED,
    err,
  };
}