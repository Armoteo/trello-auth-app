import { subscribe } from '../../utils';
import { ACTION_TYPES } from './types';

const fetchBoardsWorker: any = ({
  action,
  next,
  dispatch
}: {
  action: any;
  next: any;
  dispatch: any;
}) => {

  next(action);
};

const fetchMiddleware = ({ dispatch }: any) => (next: any) =>
  subscribe(ACTION_TYPES.FETCH_PROFILE, fetchBoardsWorker)(next, dispatch);

export const profileMiddleware = [fetchMiddleware];
