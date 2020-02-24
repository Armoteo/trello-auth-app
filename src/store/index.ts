import { combineReducers, compose, createStore, applyMiddleware } from 'redux';
import auth, { AuthState, middlewaresAuth } from './auth';
import http, { httpMiddlewares, HTTPState } from './http';
import { initMiddleware } from './initialization';
import connectRouter from './router';
import { History } from 'history';
import boards, { boardsMiddleware } from './mainPage';
import listBoard, { ListsMiddleware } from './listBoard';
import profile, { profileMiddleware } from './profile';
import listCard, { CardMiddleware } from './listCard';
import thunk from 'redux-thunk';

export interface AppState {
    auth: AuthState;
    http: HTTPState;
    router?: any;
    boards?: any;
    listBoard?: any;
    profile?:any;
    listCard?:any;
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
        listBoard,
        profile,
        listCard,
        http
    });
    return createStore(
        rootReducer,
        undefined,
        composeEnhancers(
            applyMiddleware(
                thunk,
                ...middlewaresAuth,
                ...httpMiddlewares,
                ...initMiddleware,
                ...boardsMiddleware,
                ...ListsMiddleware,
                ...profileMiddleware,
                ...CardMiddleware
            ))
    );
}
export * from './auth';

