import { ActionHttp } from "./types";

export const INITIAL_STATE = {};

export interface HTTPState {};

export default (state: HTTPState = INITIAL_STATE, action: ActionHttp) => {
    return state;
}