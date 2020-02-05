// import uuid from 'uuid/v4';
import { ActionHttp, ACTION_TYPES } from './types';
import { Worker, subscribe } from '../../utils';
import uuid from 'uuid';


export const requestWorker: Worker<any> = async ({ action }) => {
    const requestId = uuid();
    const { path, onSuccess, method = "GET" } = action.meta;

    const options: any = {
        headers: {
            Accept: 'application/json', 'Content-Type': 'application/json',
            //...(authRequired && token ? {Authorization: `Bearer ${token}`}:{}),
        }
    };

    const response = await fetch(path, options);
    if (response.status >= 400) {
        console.log("ERRR")
    }

    const data = await response.json();
    onSuccess(data);
};

const requestMiddlewaresHttp = ({ dispatch, getState }: any) => (next: any) =>
    subscribe(ACTION_TYPES.REQUEST, requestWorker)(next, dispatch, getState);

export const httpMiddlewares = [requestMiddlewaresHttp];



