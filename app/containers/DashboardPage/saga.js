import { takeEvery, call, put } from 'redux-saga/effects';
import request from '../../utils/request';
import { API_EMPLOYEE, API_COLLABORATORS, API_SELLRECORD, API_IMPORT, API_REPORT } from '../../utils/urlConfig';
import {
  getReportSuccess,
  getReportFailed,
  getCollabotorSuccess,
  getCollabotorFailed,
  getImportStockSuccess,
  getImportStockFailed,
  getEmployeeSuccess,
  getEmployeeFailed,
  getSellRecordSuccess,
  getSellRecordFailed,
} from './actions';
import {
  GET_REPORT,
  GET_COLLABOTOR,
  GET_IMPORT_STOCK,
  GET_EMPLOYEE,
  GET_SELL_RECORD,
} from './constants';

export function* getAllReport(action) {
  try {
    const data = yield call(
      request,
      `${API_REPORT}?limit=${1000}`,
      {
        method: 'GET',
      },
    );
    if (data) {
      yield put(getReportSuccess({ list: data.data, count: data.count }));
    } else {
      yield put(getReportFailed({}));
    }
  } catch (err) {
    yield put(getReportFailed(err));
  }
}

export function* getAllCollaborator(action) {
  try {
    const data = yield call(
      request,
      `${API_COLLABORATORS}?limit=${1000}`,
      {
        method: 'GET',
      },
    );
    if (data) {
      yield put(getCollabotorSuccess({ list: data.data, count: data.count }));
    } else {
      yield put(getCollabotorFailed({}));
    }
  } catch (err) {
    yield put(getCollabotorFailed(err));
  }
}

export function* getAllImportStock(action) {
  try {
    const data = yield call(
      request,
      `${API_IMPORT}?limit=${1000}&${action.body.params}`,
      {
        method: 'GET',
      },
    );
    if (data) {
      yield put(getImportStockSuccess({ list: data.data, count: data.count }));
    } else {
      yield put(getImportStockFailed({}));
    }
  } catch (err) {
    yield put(getImportStockFailed(err));
  }
}

export function* getAllEmployee(action) {
  try {
    const data = yield call(
      request,
      `${API_EMPLOYEE}?limit=${1000}`,
      {
        method: 'GET',
      },
    );
    if (data) {
      yield put(getEmployeeSuccess({ list: data.data, count: data.count }));
    } else {
      yield put(getEmployeeFailed({}));
    }
  } catch (err) {
    yield put(getEmployeeFailed(err));
  }
}

export function* getAllSellRecord(action) {
  try {
    const data = yield call(
      request,
      `${API_SELLRECORD}?limit=${1000}&${action.body.params}`,
      {
        method: 'GET',
      },
    );
    if (data) {
      yield put(getSellRecordSuccess({ list: data.data, count: data.count }));
    } else {
      yield put(getSellRecordFailed({}));
    }
  } catch (err) {
    yield put(getSellRecordFailed(err));
  }
}

// Individual exports for testing
export default function* dashboardPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(GET_REPORT, getAllReport);
  yield takeEvery(GET_REPORT, getAllCollaborator);
  yield takeEvery(GET_REPORT, getAllEmployee);
  yield takeEvery(GET_REPORT, getAllImportStock);
  yield takeEvery(GET_REPORT, getAllSellRecord);
}
