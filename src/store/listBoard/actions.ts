import { ACTION_TYPES } from './types';

export const fetchBoards = () => ({
  type: ACTION_TYPES.FETCH_LIST
});

export const setBoards = (data: Array<any>) => ({
  type: ACTION_TYPES.SET_BOARDSLIST,
  payload: data
});
//состояние редактирования списка
export const editListStatus = (data: Array<any>) => ({
  type: ACTION_TYPES.TOOGLE_EDIT_LIST,
  payload: data
});