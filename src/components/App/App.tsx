import * as React from "react";
import { setToLocaStorage } from '../../utils'
import { Route, Link, Switch, Redirect, RouteChildrenProps } from "react-router-dom";
import { routes } from "./Routes";
import { OAuth } from "../OAuth";


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
    private setToken = (token: string)=> {
         this.setState({ token: token });
        // await setToLocaStorage(TOKEN_STORAGE_KEY, token);
    }
   
    private renderHeader() {
        return (
            <header>
                {routes.map((route: any, i: number) =>
                    route.isHidden?null:<Link key={i} to={route.path}>{route.title}</Link>
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
                    <Route path="/oauth" render = {(props:RouteChildrenProps)=>
                    <OAuth {...props} onSetToken={this.setToken}/>
                    }/>
                    <Redirect to="/404" />
                </ Switch>
            </main>
        )
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
