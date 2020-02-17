import { subscribe, getFromLocalStorage } from '../../utils';
import { ACTION_TYPES } from './types';
import { request, requestPUT } from '../http';
import { setBoards, editCardStatus, fetchBoards } from './actions';

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


const fetchCardNameWorker: any = ({
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
      path: `/1/cards/${id}/name?value=${text}`,
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

const fetchToogleListWorker: any = ({
  action,
  next,
  dispatch
}: {
  action: any;
  next: any;
  dispatch: any;
}) => {
  const { idCard, idList } = action.payload;

  dispatch(
    requestPUT({
      path: `/1/cards/${idCard}/idList?value=${idList}`,
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
  subscribe(ACTION_TYPES.FETCH_LIST_CARD, fetchBoardsWorker)(next, dispatch);

const fetchMiddlewareNameCard = ({ dispatch }: any) => (next: any) =>
  subscribe(ACTION_TYPES.TOOGLE_TEXT, fetchCardNameWorker)(next, dispatch);

const fetchMiddlewareToogleList = ({ dispatch }: any) => (next: any) =>
  subscribe(ACTION_TYPES.TOOGLE_LIST, fetchToogleListWorker)(next, dispatch);

export const CardMiddleware = [fetchMiddleware, fetchMiddlewareNameCard, fetchMiddlewareToogleList];
