import { subscribe, getFromLocalStorage } from '../../utils';
import { ACTION_TYPES } from './types';
import { request, requestPUT } from '../http';
import { setBoards, fetchBoards } from './actions';

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

      path: `/1/boards/${getIdBoard()}/lists`,
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


const fetchListNameWorker: any = ({
  action,
  next,
  dispatch
}: {
  action: any;
  next: any;
  dispatch: any;
}) => {

  const { id, text } = action.payload;

  dispatch(
    requestPUT({
      path: `/1/lists/${id}/name?value=${text}`,
      authRequired: true,
      onSuccess: () => {
        dispatch(fetchBoards());
      },
      onError: error => {
        console.log(error);
      }
    })
  );
};


const fetchMiddleware = ({ dispatch }: any) => (next: any) =>
  subscribe(ACTION_TYPES.FETCH_LIST, fetchBoardsWorker)(next, dispatch);

const fetchMiddlewareNameList = ({ dispatch }: any) => (next: any) =>
  subscribe(ACTION_TYPES.SET_EDIT_LIST, fetchListNameWorker)(next, dispatch);

export const ListsMiddleware = [fetchMiddleware, fetchMiddlewareNameList];
