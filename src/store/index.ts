import { combineReducers, compose, createStore, applyMiddleware } from 'redux';
import counter, { CounterState } from './counter';
import auth, { AuthState, middlewaresAuth } from './auth';
import http, { httpMiddlewares, HTTPState } from './http';
import { initMiddleware } from './initialization';

export interface AppState {
    counter: CounterState;
    auth: AuthState;
    http: HTTPState;
}
//@ts-ignore
const t = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers =
    process.env.NODE_ENV !== 'production' && t ? t : compose;

// root
export default function configureStore() {
    const rootReducer = combineReducers<AppState>({
        counter,
        auth,
        http
    });
    return createStore(
        rootReducer,
        undefined,
        composeEnhancers(applyMiddleware(...middlewaresAuth, ...httpMiddlewares, ...initMiddleware))
    );
}
export * from './counter';
export * from './auth';

