import { Action } from '../types';
import { ACTION_TYPES } from './types';

interface BoardsState {
  list: any;
  selected: string;
}

const INITIAL_STATE = {
  list: '',
  selected: ''
};

export default (
  state: BoardsState = INITIAL_STATE,
  { type, payload }: Action<any>
) => {
  switch (type) {
    case ACTION_TYPES.SET_PROFILE:
      return { ...state, list: payload };
    default:
      return state;
  }
};
