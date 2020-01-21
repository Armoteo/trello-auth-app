import * as React from "react";
import { setToLocaStorage, getFromLocalStorage } from '../../utils'
import { Route, Link, Switch, Redirect } from "react-router-dom";
import { routes } from "./Routes";


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
        await this.setState({ token: token });
        await setToLocaStorage(TOKEN_STORAGE_KEY, token);
    }
    //getting token in local storage
    private getToken() {
        return getFromLocalStorage(TOKEN_STORAGE_KEY);
    }

    // private async  getBoard() {
    //     const token = this.getToken();
    //     const boardRequest = await fetch(`https://api.trello.com/1/members/me/boards?key=${REACT_APP_API_KEY}&token=${token}`);
    //     if (boardRequest.ok) {
    //         let board = await boardRequest.json();
    //         this.setState({ board });
    //     }
    // }

    private renderHeader() {
        return (
            <header>
                {routes.map((route: any, i: number) =>
                    <Link key={i} to={route.path}>{route.title}</Link>
                )}
            </header>
        )
    }

    private renderContent() {
        return (
            <main>
                < Switch>
                    {routes.map((route: any, i: number) =>
                        <Route key={i}
                            exact={route.exact}
                            path={route.path}
                            render={(props) => route.render({ ...props, token: this.state.token })} />
                    )}
                    <Redirect to="/login" />
                </ Switch>
            </main>
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
