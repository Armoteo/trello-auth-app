// import uuid from 'uuid/v4';
import { ACTION_TYPES } from './types';
import { Worker, subscribe } from '../../utils';
import { getToken } from '../auth';


const { REACT_APP_API_DOMAIN, REACT_APP_API_KEY } = process.env;

const makeUrl = (path: string, authRequired: boolean, token: string) => {
    let url = REACT_APP_API_DOMAIN + path + `?key=${REACT_APP_API_KEY}`;
    if (authRequired && token) {
        url = url + `&token=${token}`;
    }

    return url;
};

const makeUrlPUT = (path: string, authRequired: boolean, token: string) => {
    let url = REACT_APP_API_DOMAIN + path + `&key=${REACT_APP_API_KEY}`;
    if (authRequired && token) {
        url = url + `&token=${token}`;
    }

    return url;
};




export const requestWorker: Worker<any> = async ({ action, next, getState }) => {
    // const requestId = uuid();
    const { path, onSuccess, method = "GET", authRequired } = action;
    const appState = getState!();
    const token = getToken(appState);

    const options: any = {
        method, headers: {
            Accept: 'application/json', 'Content-Type': 'application/json',
        }
    };

    const response = await fetch(makeUrl(path, authRequired, token), options);
    if (response.status >= 400) {
        console.log("ERRR")
    }

    const data = await response.json();
    onSuccess(data);
};


export const requestWorkerPUT: Worker<any> = async ({ action, next, getState }) => {
    const { path, onSuccess, method = "PUT", authRequired } = action;
    const appState = getState!();
    const token = getToken(appState);

    const options: any = {
        method, headers: {
            Accept: 'application/json', 'Content-Type': 'application/json',
        }
    };
    const response = await fetch(makeUrlPUT(path, authRequired, token), options);
    if (response.status >= 400) {
        console.log("ERRR")
    }
    onSuccess();
};


const requestMiddlewaresHttp = ({ dispatch, getState }: any) =>
    (next: any) =>
        subscribe(ACTION_TYPES.REQUEST, requestWorker)(next,
            dispatch, getState);

const requestMiddlewaresHttpPUT = ({ dispatch, getState }: any) =>
    (next: any) =>
        subscribe(ACTION_TYPES.REQUEST_PUT, requestWorkerPUT)(next,
            dispatch, getState);


export const httpMiddlewares = [requestMiddlewaresHttp, requestMiddlewaresHttpPUT];



