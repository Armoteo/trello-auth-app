import { ACTION_TYPES } from "./types";
import { setToLocalStorage, subscribe, getFromLocalStorage } from "../../utils";
import { setToken } from './actions';
import { ROUTES_URLS } from '../../components/App/Routes';
import { navigate } from '../router';

const APP_TOKEN = 'TREELLO_CUSTOM_APP_TOKEN';

const setTokenWorker = ({ action, next, dispatch }: any) => {
  setToLocalStorage(APP_TOKEN, action.payload);
  dispatch(navigate(ROUTES_URLS.MAIN_PAGE));
  next(action);
};


const readTokenWorker = ({ action, next, dispatch }: any) => {
  const token = getFromLocalStorage(APP_TOKEN);
  if (token) {
    dispatch(setToken(token));
  }
  next(action);
};


const deleteTokenWorker = ({ action, next, dispatch }: any) => {
  dispatch(navigate(ROUTES_URLS.LOGIN));
  next(action);
};


const readTokenMiddleware = ({ dispatch }: any) => (next: any) =>
  subscribe(ACTION_TYPES.READ_TOKEN, readTokenWorker)(next, dispatch);

const setTokenMiddleware = ({ dispatch }: any) => (next: any) =>
  subscribe(ACTION_TYPES.SET_TOKEN, setTokenWorker)(next, dispatch);

const deleteTokenMiddleware = ({ dispatch }: any) => (next: any) =>
  subscribe(ACTION_TYPES.DELETE_TOKEN, deleteTokenWorker)(next, dispatch);

export const middlewaresAuth = [setTokenMiddleware, readTokenMiddleware, deleteTokenMiddleware];
