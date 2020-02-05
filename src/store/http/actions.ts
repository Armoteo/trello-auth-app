import { ActionHttp, RequestPayload, ACTION_TYPES } from "./types";


export const request = (p: RequestPayload): ActionHttp => ({
    type: ACTION_TYPES.REQUEST,
    ...p
});