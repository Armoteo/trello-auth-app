import { subscribe } from '../../utils';
import { ACTION_TYPES } from './types';
import { request } from '../http';
import { setBoards } from './actions';

const {REACT_APP_API_FULLNAME } = process.env;

const fetchBoardsWorker: any = ({
  action,
  next,
  dispatch
}: {
  action: any;
  next: any;
  dispatch: any;
}) => {


  dispatch(
    request({
      path: `/1/members/${REACT_APP_API_FULLNAME}?fields=id,avatarUrl,email,fullName,url,username`,
      authRequired: true,
      onSuccess: data => {
        dispatch(setBoards(data));
      },
      onError: error => {
        console.log(error);
      }
    })
  );
};

const fetchMiddleware = ({ dispatch }: any) => (next: any) =>
  subscribe(ACTION_TYPES.FETCH_PROFILE, fetchBoardsWorker)(next, dispatch);

export const profileMiddleware = [fetchMiddleware];
