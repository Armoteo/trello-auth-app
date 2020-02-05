import { Action } from "../types";
import { ACTION_TYPES } from "./types";
import { setToLocalStorage, subscribe } from "../../utils";

const APP_TOKEN = 'TREELLO_APP_TOKEN';

export const authMiddlewares = ({ dispatch }: any) => (next: any) =>
    (action: Action<ACTION_TYPES>) => {
        if (action.type === ACTION_TYPES.SET_TOKEN) {
            console.log('TOKEN SET!');
            setToLocalStorage(APP_TOKEN, action.payload);
        }
        next(action);
    };


const readTokenWorker = ({ action, next }: any) => {
    next(action);
}

const readTokenMiddleware = ({ dispatch }: any) => (next: any) =>
    subscribe(ACTION_TYPES.READ_TOKEN, readTokenWorker)(next, dispatch);

export const middlewaresAuth = [authMiddlewares, readTokenMiddleware ];
