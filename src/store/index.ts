import { combineReducers, compose, createStore, applyMiddleware } from 'redux';
import auth, { AuthState, middlewaresAuth } from './auth';
import http, { httpMiddlewares, HTTPState } from './http';
import { initMiddleware } from './initialization';
import connectRouter from './router';
import { History } from 'history';
import boards, { boardsMiddleware } from './mainPage';

export interface AppState {
    auth: AuthState;
    http: HTTPState;
    router?: any;
    boards?: any;
}
//@ts-ignore
const t = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers =
    process.env.NODE_ENV !== 'production' && t ? t : compose;

// root
export default function configureStore(history: History) {
    const rootReducer = combineReducers<AppState>({
        router: connectRouter(history),
        auth,
        boards,
        http
    });
    return createStore(
        rootReducer,
        undefined,
        composeEnhancers(
            applyMiddleware(
                ...middlewaresAuth,
                 ...httpMiddlewares,
                  ...initMiddleware,
                  ...boardsMiddleware
                  ))
    );
}
export * from './auth';

