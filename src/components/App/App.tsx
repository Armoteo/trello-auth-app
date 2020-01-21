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
    public state: AppState = {
        token: '',
        board: []
    };

    //save token in local storage
    private async setToken(token: string) {
       await this.setState({ token : token });
        await setToLocaStorage(TOKEN_STORAGE_KEY, token);
    }
    //getting token in local storage
    private   getToken() {
        return  getFromLocalStorage(TOKEN_STORAGE_KEY);
    }

    private async  getBoard() {
        const token = this.getToken();
        const boardRequest = await fetch(`https://api.trello.com/1/members/me/boards?key=${REACT_APP_API_KEY}&token=${token}`);
        if(boardRequest.ok){
            let board = await boardRequest.json();
            this.setState({board});
        }
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

    //getting token from request location
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
