import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './components/App';
import { BrowserRouter } from 'react-router-dom';

const browser = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
)

ReactDOM.render(browser, document.querySelector('#root'));