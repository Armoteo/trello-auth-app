import * as React from "react";
import './App.scss';
import { RouteComponentProps, Route, Switch, RouteChildrenProps, withRouter } from "react-router-dom";
import { routes, AppRoute, ROUTES_URLS } from "./Routes";
import { OpenAuthorization } from "../OpenAuthorization";
import { ProtectedRoute } from "../ProtectedRoute";
import { init } from "../../store/initialization";
import { connect } from "react-redux";

interface AppState {
    token: string;
    userProfile: any;
}

interface AppProps extends RouteComponentProps {
    onInit: () => void;
}

const INITIAL_STATE = {
    token: '',
    userProfile: undefined,
}

class App extends React.Component<AppProps, AppState> {

    public state = INITIAL_STATE;

    componentDidMount() {
        this.props.onInit();
    }

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
                render={route.render}
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
                <div className="ContainerApp">
                    {this.renderPage()}
                </div>
            </div>
        )
    }
}


const mapDispatchProps = (dispatch: any) => {
    return {
        onInit: () => dispatch(init())
    };
};

const AppWithRouter = withRouter(connect(undefined, mapDispatchProps)(App));
export { AppWithRouter as App };