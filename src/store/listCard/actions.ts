import { ACTION_TYPES } from './types';
//запрос на сервер
export const fetchBoardsCard = () => ({
  type: ACTION_TYPES.FETCH_LIST_CARD
});
//храним ответ с сервера
export const setBoards = (data: Array<any>) => ({
  type: ACTION_TYPES.SET_LIST_CARD,
  payload: data
});

//перемещаєм по листам карточки
export const toogleList = (data: Array<any>) => ({
  type: ACTION_TYPES.TOOGLE_LIST,
  payload: data
});

//имя карточек
export const toogleText = (data: Array<any>) => ({
  type: ACTION_TYPES.TOOGLE_TEXT,
  payload: data
});

//состояние редактирования карточки
export const editCardStatus = (data: Array<any>) => ({
  type: ACTION_TYPES.TOOGLE_EDIT,
  payload: data
});

