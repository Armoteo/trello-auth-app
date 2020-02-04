import { combineReducers, compose, createStore, applyMiddleware } from 'redux';
import counter, { CounterState } from './counter';
import auth, { AuthState, middlewaresAuth } from './auth';

export interface AppState {
    counter: CounterState;
    auth: AuthState;
}
//@ts-ignore
const t = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers =
    process.env.NODE_ENV !== 'production' && t ? t : compose;

// root
export default function configureStore() {
    const rootReducer = combineReducers<AppState>({
        counter,
        auth
    });
    return createStore(
        rootReducer,
        undefined,
        composeEnhancers(applyMiddleware(...middlewaresAuth))
    );
}
export * from './counter';
export * from './auth';

