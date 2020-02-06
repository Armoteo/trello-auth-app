import uuid from 'uuid/v4';
import { ACTION_TYPES } from './types';
import { Worker, subscribe } from '../../utils';



export const requestWorker: Worker<any> = async ({ action, next }) => {
    const requestId = uuid();
    const { path, onSuccess, method = "GET" } = action;

    const options: any = {
        headers: {
            Accept: 'application/json', 'Content-Type': 'application/json',
        }
    };

    const response = await fetch(path, options);
    if (response.status >= 400) {
        console.log("ERRR")
    }

    const data = await response.json();
    onSuccess(data);
};

const requestMiddlewaresHttp = ({ dispatch, getState }: any) =>
    (next: any) =>
        subscribe(ACTION_TYPES.REQUEST, requestWorker)(next,
            dispatch, getState);

export const httpMiddlewares = [requestMiddlewaresHttp];



