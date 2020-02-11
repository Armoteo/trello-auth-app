import { ACTION_TYPES } from './types';

export const fetchBoards = () => ({
  type: ACTION_TYPES.FETCH_PROFILE
});

export const setBoards = (data: Array<any>) => ({
  type: ACTION_TYPES.SET_PROFILE,
  payload: data
});
