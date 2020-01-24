import * as React from "react";
import './App.scss';
import { setToLocalStorage } from "../../utils";
import { AutorithationForm } from '../Authorization-form';


const { REACT_APP_API_KEY, REACT_APP_APP_NAME, REACT_APP_APP_URL, REACT_APP_APP_SCOPE } = process.env
const TOKEN_STRORAGE_KEY = 'TOKEN';

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

// interface AppProps extends RouteComponentProps { }

export class App extends React.Component<any, AppState> {
    public state = {
        token: '',
        board: []
    };

    //save our tokken in localstorage
    private async saveToken(token: string) {
        this.setState({ token });
        await setToLocalStorage(TOKEN_STRORAGE_KEY, token);
    }

    //check tokken
    private checkLoggin() {
        return !!this.state.token
    }

    public componentDidMount() {
        const token = window.location.hash.split('=')[1];
        this.saveToken(token);
    }

    public render() {

        const request = `https://trello.com/1/authorize?return_url=${REACT_APP_APP_URL}&expiration=1day&name=${REACT_APP_APP_NAME}&scope=${REACT_APP_APP_SCOPE}&response_type=token&key=${REACT_APP_API_KEY}`;

        return (
            <div className="App">
                <div className="ContainerApp">
                    {this.checkLoggin() ? null : <AutorithationForm href={request} />}
                    {this.checkLoggin() ? <h2>my tokken: {this.state.token}</h2> : null}
                </div>
            </div>
        )
    }
}
