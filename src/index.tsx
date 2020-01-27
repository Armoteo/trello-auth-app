import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.scss';
import { App } from './components/App';
import { BrowserRouter } from 'react-router-dom';

const app = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
)

ReactDOM.render(app, document.querySelector('#root'));