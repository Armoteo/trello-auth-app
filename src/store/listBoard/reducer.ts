import { Action } from '../types';
import { ACTION_TYPES } from './types';

interface BoardsState {
  list: Array<any>;
  selected: string;
}

const INITIAL_STATE = {
  list: [],
  selected: ''
};

export default (
  state: BoardsState = INITIAL_STATE,
  { type, payload }: Action<any>
) => {
  switch (type) {
    case ACTION_TYPES.SET_BOARDSLIST:
      return { ...state, list: payload };
      case ACTION_TYPES.TOOGLE_EDIT_LIST:
      return { ...state, list: payload };
    default:
      return state;
  }
};
