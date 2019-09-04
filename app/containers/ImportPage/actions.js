/*
 *
 * ImportPage actions
 *
 */

import {
  DEFAULT_ACTION,
  RESET_NOTI,
  CREATE_NEW_RECORD,
  CREATE_NEW_RECORD_SUCCESS,
  CREATE_NEW_RECORD_FAILED,
  GET_ALL_ITEM,
  GET_ALL_ITEM_SUCCESS,
  GET_ALL_ITEM_FAILED,
  UPDATE_ITEM,
  UPDATE_ITEM_SUCCESS,
  UPDATE_ITEM_FAILED,
  DELETE_ITEM,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_FAILED,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function resetNoti() {
  return {
    type: RESET_NOTI,
  };
}

export function createNewItemAct(body) {
  return {
    type: CREATE_NEW_RECORD,
    body,
  };
}

export function createNewItemSuccess(data) {
  return {
    type: CREATE_NEW_RECORD_SUCCESS,
    data,
  };
}

export function createNewItemFailed(err) {
  return {
    type: CREATE_NEW_RECORD_FAILED,
    err,
  };
}

export function getAllItemAct(body) {
  return {
    type: GET_ALL_ITEM,
    body,
  };
}

export function getAllItemSuccess(data) {
  return {
    type: GET_ALL_ITEM_SUCCESS,
    data,
  };
}

export function getAllItemFailed(err) {
  return {
    type: GET_ALL_ITEM_FAILED,
    err,
  };
}

export function updateItemAct(body) {
  return {
    type: UPDATE_ITEM,
    body,
  };
}

export function updateItemSuccess(data) {
  return {
    type: UPDATE_ITEM_SUCCESS,
    data,
  };
}

export function updateItemFailed(err) {
  return {
    type: UPDATE_ITEM_FAILED,
    err,
  };
}

export function deleteItemAct(body) {
  return {
    type: DELETE_ITEM,
    body,
  };
}

export function deleteItemSuccess(data) {
  return {
    type: DELETE_ITEM_SUCCESS,
    data,
  };
}

export function deleteItemFailed(err) {
  return {
    type: DELETE_ITEM_FAILED,
    err,
  };
}
