import { subscribe } from '../../utils';
import { ACTION_TYPES } from './types';
import { request } from '../http';
import { setBoards } from './actions';

const fetchBoardsWorker: any = ({
  action,
  next,
  dispatch
}: {
  action: any;
  next: any;
  dispatch: any;
}) => {
  console.log('FETCHED');

  
  dispatch(
    request({
      path: '/1/members/me/boards',
      authRequired: true,
      onSuccess: data => {
        console.log(data);
        dispatch(setBoards(data));
      },
      onError: error => {
        console.log(error);
      }
    })
  );
};

const testMiddleware = () => (next:any) => (action: any) => {
  console.log(">>>", action);
  next(action);
}
const fetchMiddleware = ({ dispatch }: any) => (next: any) =>
  subscribe(ACTION_TYPES.FETCH, fetchBoardsWorker)(next, dispatch);

export const boardsMiddleware = [fetchMiddleware, testMiddleware];
