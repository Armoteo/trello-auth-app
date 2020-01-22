import * as React from "react";
import {Route, Link, Switch, Redirect, RouteChildrenProps} from "react-router-dom";
import {routes, AppRoute } from "./Routes";
import {OAuth} from "../OAuth";
import {ProtectedRoute} from "../ProtectedRoute";


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
    };


    //save token in local storage
    private setToken = (token: string) => {
        this.setState({token: token});
        
    };

    private  isLoggedIn() {
        return !!this.state.token;
    }


    private renderHeader() {
        return (
            <header>
                {routes.map((route: any, i: number) =>
                    route.isHidden ? null : <Link key={i} to={route.path}>{route.title}</Link>
                )}
            </header>
        )
    }

    private renderContent() {
        return (
            <main>
                < Switch>
                    {routes.map(this.renderRoute)}
                    <Route path="/oauth" render={(props: RouteChildrenProps) =>
                        <OAuth {...props} onSetToken={this.setToken}/>
                    }/>
                    <Redirect to="/404"/>
                </ Switch>
            </main>
        );
    }

    private renderRoute = (route: AppRoute, i: number)=> {
        if (route.isProtected) {
           return <ProtectedRoute
                key={i}
                exact={route.exact}
                path={route.path}
                render={route.render}
                isAuthenticated={this.isLoggedIn()}/>
        } else {
           return <Route
                key={i}
                exact={route.exact}
                path={route.path}
                render={(props) => route.render({...props})}
                />

        }
    };


    public render() {
        return (
            <div>
                {this.renderHeader()}
                {this.renderContent()}
            </div>
        )
    }
}
