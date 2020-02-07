import { ACTION_TYPES } from "./types";

export const setToken = (token: string) => ({
    type: ACTION_TYPES.SET_TOKEN,
    payload: token
});

export const readToken = () => ({
    type: ACTION_TYPES.READ_TOKEN
});

export const deleteToken = () => ({
    type: ACTION_TYPES.DELETE_TOKEN
});