import { ActionHttp, RequestPayload, ACTION_TYPES } from "./types";


export const request = (p: RequestPayload): ActionHttp => ({
    type: ACTION_TYPES.REQUEST,
    ...p
});

export const requestPUT = (p: RequestPayload): ActionHttp => ({
    type: ACTION_TYPES.REQUEST_PUT,
    ...p
});

export const requestPOST = (p: RequestPayload): ActionHttp => ({
    type: ACTION_TYPES.REQUEST_POST,
    ...p
});