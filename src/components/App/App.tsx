import * as React from "react";
import './App.scss';
import { RouteComponentProps, Route, Redirect, Switch, RouteChildrenProps } from "react-router-dom";
import { routes } from "./Routes";
import { OpenAuthorization } from "../OpenAuthorization";


// const { REACT_APP_API_KEY, REACT_APP_APP_NAME, REACT_APP_APP_URL, REACT_APP_APP_SCOPE } = process.env
// const TOKEN_STRORAGE_KEY = 'TOKEN';

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

interface AppProps extends RouteComponentProps { }

export class App extends React.Component<any, AppState> {
    public state = {
        token: '',
        board: []
    };

    //save our tokken in localstorage
    private saveToken = (token: string) => {
        this.setState({ token });
    }

    //check tokken
    // private checkLoggin() {
    //     return !!this.state.token
    // }

    private renderPage() {
        return (
            <main>
                <Switch>
                    {routes.map((route: any, index: number) => <Route
                        exact={route.exact}
                        key={index}
                        path={route.path}
                        render={(props) => route.render({ ...props })} />
                    )}

                    <Route path="/oauth" render={(props: RouteChildrenProps) => <OpenAuthorization {...props} onSaveToken={this.saveToken} />} />
                    <Redirect to='/404' />
                </Switch>
            </main>
        )
    }

    public render() {
        return (
            <div className="App">
                <div className="ContainerApp">
                    {this.renderPage()}
                </div>
            </div>
        )
    }
}
