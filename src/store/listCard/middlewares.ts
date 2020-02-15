import { subscribe, getFromLocalStorage } from '../../utils';
import { ACTION_TYPES } from './types';
import { request } from '../http';
import { setBoards, editCardStatus } from './actions';

const ID_BOARD_STRORAGE_KEY = "ID_BOARD";

function getIdBoard() {
  return getFromLocalStorage(ID_BOARD_STRORAGE_KEY);
};


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
      path: `/1/boards/${getIdBoard()}/cards`,
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
  subscribe(ACTION_TYPES.FETCH_LIST_CARD, fetchBoardsWorker)(next, dispatch);

export const CardMiddleware = [fetchMiddleware];
