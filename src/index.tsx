import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { App } from './components/App';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import './index.module.scss';
import configureStore from './store';
import { init } from './store/initialization';


const history = createBrowserHistory();
const store = configureStore(history);
store.dispatch(init());

const app = (
    <Provider store={store}>
       <ConnectedRouter history={history}>
      <App/>
    </ConnectedRouter>
    </Provider>
)

ReactDOM.render(app, document.querySelector('#root'));