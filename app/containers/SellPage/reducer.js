/* eslint-disable consistent-return */
/*
 *
 * SellPage reducer
 *
 */
import produce from 'immer';
import { fromJS } from 'immutable';
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
  DELETE_ITEM_FAILED,
  DELETE_ITEM_SUCCESS,
} from './constants';

export const initialState = fromJS({ successCreate: false });

/* eslint-disable default-case, no-param-reassign */
const sellPageReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case RESET_NOTI:
        return state
          .set('loading', false)
          .set('success', false)
          .set('successCreate', false)
          .set('error', false);
      case CREATE_NEW_RECORD:
        return state
          .set('loading', true)
          .set('successCreate', false)
          .set('error', false);
      case CREATE_NEW_RECORD_SUCCESS:
        return state
          .set('loading', false)
          .set('successCreate', true)
          .set('error', false);
      case CREATE_NEW_RECORD_FAILED:
        return state
          .set('loading', false)
          .set('successCreate', false)
          .set('error', true);
      case GET_ALL_ITEM:
        return state
          .set('loading', true)
          .set('success', false)
          .set('error', false);
      case GET_ALL_ITEM_SUCCESS:
        return state
          .set('loading', false)
          .set('count', action.data.count)
          .set('recordList', action.data.list)
          .set('success', true)
          .set('error', false);
      case GET_ALL_ITEM_FAILED:
        return state
          .set('loading', false)
          .set('success', false)
          .set('error', true);
      case UPDATE_ITEM:
        return state
          .set('loading', true)
          .set('successCreate', false)
          .set('error', false);
      case UPDATE_ITEM_SUCCESS:
        return state
          .set('loading', false)
          .set('successCreate', true)
          .set('error', false);
      case UPDATE_ITEM_FAILED:
        return state
          .set('loading', false)
          .set('successCreate', false)
          .set('error', true);
      case DELETE_ITEM:
        return state
          .set('loading', true)
          .set('successCreate', false)
          .set('error', false);
      case DELETE_ITEM_SUCCESS:
        return state
          .set('loading', false)
          .set('successCreate', true)
          .set('error', false);
      case DELETE_ITEM_FAILED:
        return state
          .set('loading', false)
          .set('successCreate', false)
          .set('error', true);
    }
  });

export default sellPageReducer;
