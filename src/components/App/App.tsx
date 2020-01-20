/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import { setToLocaStorage } from '../../utils'

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
export class App extends React.Component<any, AppState> {
    public state = {
        token: '',
        board: []
    }

    private async setToken(token: string) {
        this.setState({ token });
        await setToLocaStorage(TOKEN_STORAGE_KEY, token);
    }

    private async getTokken() {

    }

    public componentDidMount() {
        const token = window.location.hash.split('=')[1];
        if (token) {
            this.setToken(token);
        }
    }

    public render() {
        const redirectUrl = 'http://localhost:3000';
        const scope = ['read', 'write', 'account'];
        const appName = 'Group_Armoteo';
        const key = '76177928466605a771c8a8bf3c1642a9';
        const requestUrl = `https://trello.com/1/authorize?return_url=${redirectUrl}&expiration=1day&name=${appName}&scope=${scope.join(',')}&response_type=token&key=${key}`;
        return (
            <div>
                <header>
                    <a href={requestUrl}>Login with trello account</a>
                </header>
                <h2>Please login</h2>
            </div>
        )
    }
}
