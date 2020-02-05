import { subscribe } from "../../utils"
import { ACTION_TYPES } from './types';
import { initStart, initEnd } from "./actions";
import { readToken } from "../auth";


const initWorker = ({ action, dispatch, next }: any) => {
  dispatch(initStart());
  dispatch(readToken());
  dispatch(initEnd());
  next(action);

};

const init = ({ dispatch }: any) => (next: any) => subscribe(ACTION_TYPES.INIT, initWorker)({ next, dispatch });
export const initMiddleware = [init];