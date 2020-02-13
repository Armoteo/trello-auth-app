import * as React from "react";
import { RouteComponentProps, Route, Switch, RouteChildrenProps, withRouter } from "react-router-dom";
import { routes, AppRoute, ROUTES_URLS } from "./Routes";
import { OpenAuthorization } from "../OpenAuthorization";
import { ProtectedRoute } from "../ProtectedRoute";
import { connect } from "react-redux";


interface Board {
    id: string;
    name: string;
    pinned: boolean;
    desc?: string;
}

interface AppState {
    token: string;
    boards: Array<Board>;
    userProfile: any;
}


interface AppProps extends RouteComponentProps {

}

const INITIAL_STATE = {
    token: '',
    userProfile: undefined,
    boards: []
}

class App extends React.Component<AppProps, AppState> {

    public state = INITIAL_STATE;

    private renderPage() {
        return (
            <main>
                <Switch>
                    {routes.map(this.renderRoute)}
                    <Route path={ROUTES_URLS.OAUTH} render={(props: RouteChildrenProps) => <OpenAuthorization {...props} />} />
                </Switch>
            </main>
        )
    }

    private renderRoute = (route: AppRoute, index: number) => {
        if (route.isProtected) {
            return <ProtectedRoute
                exact={route.exact}
                key={index}
                path={route.path}
                render={(props: any) => route.render({ ...props })}
            />
        } else {
            return <Route
                exact={route.exact}
                key={index}
                path={route.path}
                render={(props) => route.render({ ...props })} />
        }
    };
    public render() {
        return (
            <div className="App">
                {this.renderPage()}
            </div>
        )
    }
}


const mapDispatchProps = (dispatch: any) => {
    return {

    };
};

const AppWithRouter = withRouter(connect(undefined, mapDispatchProps)(App));
export { AppWithRouter as App };
