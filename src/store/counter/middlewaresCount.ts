import { Middleware } from "redux";
import { ACTION_TYPES } from "./types";

const asyncTimeout = async (fn: any, ms: number = 1000) => {
    setTimeout(() => {
        Promise.resolve(fn());
    }, ms);
}


export const asyncIncreaseMiddleware: Middleware = () =>
    (next: any) => {
        return async (action: any) => {
            if (action.type === ACTION_TYPES.INCREASE_COUNT) {
                await asyncTimeout(() => {
                    next(action);
                }, 2000);
            } else {
                next(action);
            }
        };
    };