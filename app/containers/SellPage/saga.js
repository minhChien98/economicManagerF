import { takeEvery, call, put } from 'redux-saga/effects';
import qs from 'qs';
import request from '../../utils/request';
import { API_SELLRECORD } from '../../utils/urlConfig';
import { changeSnackbar } from '../Dashboard/actions';
import {
  createNewItemSuccess,
  createNewItemFailed,
  getAllItemSuccess,
  getAllItemFailed,
  updateItemFailed,
  updateItemSuccess,
  deleteItemSuccess,
  deleteItemFailed,
} from './actions';
import {
  CREATE_NEW_RECORD,
  GET_ALL_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
} from './constants';

export function* getAllItem(action) {
  try {
    const data = yield call(
      request,
      `${API_SELLRECORD}?limit=${action.body.limit || 10}&skip=${action.body
        .skip || 0}`,
      {
        method: 'GET',
      },
    );
    if (data) {
      yield put(getAllItemSuccess({ list: data.data, count: data.count }));
    } else {
      yield put(getAllItemFailed({}));
    }
  } catch (err) {
    yield put(getAllItemFailed(err));
  }
}

export function* createNewRecord(action) {
  try {
    const data = yield call(request, `${API_SELLRECORD}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: qs.stringify(action.body),
    });
    if (data) {
      yield put(createNewItemSuccess(data));
      const data2 = yield call(
        request,
        `${API_SELLRECORD}?limit=${action.body.limit || 10}&skip=${action.body
          .skip || 0}`,
        {
          method: 'GET',
        },
      );
      if (data2) {
        yield put(getAllItemSuccess({ list: data2.data, count: data2.count }));
      }
      yield put(
        changeSnackbar({
          status: true,
          message: 'Thêm mới thành công',
          variant: 'success',
        }),
      );
    } else {
      yield put(createNewItemFailed({}));
      yield put(
        changeSnackbar({
          status: true,
          message: 'Thêm mới thất bại',
          variant: 'error',
        }),
      );
    }
  } catch (err) {
    yield put(createNewItemFailed(err));
    yield put(
      changeSnackbar({
        status: true,
        message: 'Thêm mới thất bại',
        variant: 'error',
      }),
    );
  }
}

export function* updateItem(action) {
  try {
    const data = yield call(request, `${API_SELLRECORD}/${action.body.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: qs.stringify(action.body),
    });
    if (data) {
      yield put(updateItemSuccess(data));
      const data2 = yield call(
        request,
        `${API_SELLRECORD}?limit=${action.body.limit || 10}&skip=${action.body
          .skip || 0}`,
        {
          method: 'GET',
        },
      );
      if (data2) {
        yield put(getAllItemSuccess({ list: data2.data, count: data2.count }));
      }
      yield put(
        changeSnackbar({
          status: true,
          message: 'Cập nhật thành công',
          variant: 'success',
        }),
      );
    } else {
      yield put(updateItemFailed({}));
      yield put(
        changeSnackbar({
          status: true,
          message: 'Cập nhật thất bại',
          variant: 'error',
        }),
      );
    }
  } catch (err) {
    yield put(updateItemFailed(err));
    yield put(
      changeSnackbar({
        status: true,
        message: 'Cập nhật thất bại',
        variant: 'error',
      }),
    );
  }
}

export function* deleteItem(action) {
  try {
    const data = yield call(request, `${API_SELLRECORD}/${action.body.id}`, {
      method: 'DELETE',
    });
    if (data) {
      yield put(deleteItemSuccess(data));
      const data2 = yield call(
        request,
        `${API_SELLRECORD}?limit=${action.body.limit || 10}&skip=${action.body
          .skip || 0}`,
        {
          method: 'GET',
        },
      );
      if (data2) {
        yield put(getAllItemSuccess({ list: data2.data, count: data2.count }));
      }
      yield put(
        changeSnackbar({
          status: true,
          message: 'Xóa thành công',
          variant: 'success',
        }),
      );
    } else {
      yield put(deleteItemFailed({}));
      yield put(
        changeSnackbar({
          status: true,
          message: 'Xóa thất bại',
          variant: 'error',
        }),
      );
    }
  } catch (err) {
    yield put(deleteItemFailed(err));
    yield put(
      changeSnackbar({
        status: true,
        message: 'Xóa thất bại',
        variant: 'error',
      }),
    );
  }
}

// Individual exports for testing
export default function* sellPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(CREATE_NEW_RECORD, createNewRecord);
  yield takeEvery(GET_ALL_ITEM, getAllItem);
  yield takeEvery(UPDATE_ITEM, updateItem);
  yield takeEvery(DELETE_ITEM, deleteItem);
}
