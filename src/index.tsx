import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.scss';
import { App } from './components/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {createStore, compose, Middleware} from 'redux';
import {mainReducer}from './store';
import { runInNewContext } from 'vm';

// export const Logger: Middleware= api => action =>{
//     console.log('HELLO');
//     return next(action);
// }

const composeEnhancers =
process.env.NODE_ENV !== 'production' &&
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:compose;

const store = createStore(mainReducer, undefined, composeEnhancers());

const app = (
    <Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.querySelector('#root'));