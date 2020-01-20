/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import { setToLocaStorage, getFromLocalStorage } from '../../utils'

const { REACT_APP_API_KEY, REACT_APP_APP_NAME, REACT_APP_APP_URL, REACT_APP_APP_SCOPE } = process.env
const TOKEN_STORAGE_KEY = 'TOKEN';
interface Board {
    id: string;
    name: string;
    pinned: boolean;
    //опционально
    desc?: string;
}
interface AppState {
    token: string;
    board: Array<Board>;
}
export class App extends React.Component {
    public state:AppState = {
        token: '',
        board: []
    }

    //save token in local storage
    private async setToken(token: string) {
        this.setState({ token });
        await setToLocaStorage(TOKEN_STORAGE_KEY, token);
    }
//geting token in local storage
    private async getTokken() {
        const token = await getFromLocalStorage(TOKEN_STORAGE_KEY);
        return token;
    }

    private renderHeader() {
        const requestUrl = `https://trello.com/1/authorize?return_url=${REACT_APP_APP_URL}&expiration=1day&name=${REACT_APP_APP_NAME}&scope=${REACT_APP_APP_SCOPE}&response_type=token&key=${REACT_APP_API_KEY}`;
        return (
            <header>
                {this.state.token ? 'Hello user' : <a href={requestUrl}>Login with trello account</a>}
            </header>
        )
    }

    private renderContent() {
        return (
            this.state.token ? <h2>Some secret content</h2> : 'Please log in'
        )
    }

    //geting token from request location
    public async componentDidMount() {
        const newToken = window.location.hash.split('=')[1];
        this.setToken(newToken);
    }

    public render() {
        return (
            <div>
                {this.renderHeader()}
                {this.renderContent()}
            </div>
        )
    }
}
