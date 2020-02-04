import * as React from "react";
import './App.scss';
import { RouteComponentProps, Route, Redirect, Switch, RouteChildrenProps, withRouter } from "react-router-dom";
import { routes, AppRoute, ROUTES_URLS } from "./Routes";
import { OpenAuthorization } from "../OpenAuthorization";
import { ProtectedRoute } from "../ProtectedRoute";
import { setToLocalStorage, getFromLocalStorage } from "../../utils";


const TOKEN_STRORAGE_KEY = 'TOKEN';
const { REACT_APP_API_KEY } = process.env;

// interface Board {
//     id: string;
//     name: string;
//     pinned: boolean;
//     desc?: string;
// }

interface AppState {
    token: string;
    // boards: Array<Board>;
    userProfile: any;
}

interface AppProps extends RouteComponentProps { }

const INITIAL_STATE = {
    token: '',
    userProfile: undefined,
    // boards: []
}

class App extends React.Component<AppProps, AppState> {

    public state = INITIAL_STATE;

    componentDidMount() {
        this.getTokken();
    }

    private async getTokken() {
        // if (this.state.token) {
        //     return;
        // }
        // const token = getFromLocalStorage(TOKEN_STRORAGE_KEY);
        // if (!token) {
        //     return this.navigateToLogin();
        // }
        // const url = `https://api.trello.com/1/members/me?key=${REACT_APP_API_KEY}&token=${token}`;
        // const response = await fetch(url);

        // if (response.ok === true && response.status === 200) {
        //     const userProfile = await response.json();
        //     this.setProfile(userProfile);
        //     // this.saveToken(token);
        //     return this.navigateMainPage();
        // }

        // return this.navigateToLogin();
    }


    private setProfile(userProfile: any) {
        this.setState({ userProfile });
    }

    private navigateMainPage() {
        this.props.history.push(ROUTES_URLS.MAIN_PAGE);
    }

    private navigateToLogin() {
        this.props.history.push(ROUTES_URLS.LOGIN);
    }

    //save our tokken in localstorage
    // private saveToken = (token: string) => {
    //     this.setState({ token });
    //     setToLocalStorage(TOKEN_STRORAGE_KEY, token);
    // }

    // private logOut = () => {
    //     this.setState(INITIAL_STATE);
    //     this.navigateToLogin();
    // }

    //check tokken
    private get checkLoggin() {
        return !!this.state.token
    }

    private renderPage() {
        return (
            <main>
                <Switch>
                    {routes.map(this.renderRoute)}
                    <Route path={ROUTES_URLS.OAUTH} render={(props: RouteChildrenProps) => <OpenAuthorization {...props} />} />
                    <Redirect to={ROUTES_URLS.NOT_FOUND} />
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
            // isAuthenticated={this.checkLoggin}
            />
        } else {
            return <Route
                exact={route.exact}
                key={index}
                path={route.path}
                render={(props: RouteChildrenProps) => route.render({ ...props })} />
        }
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

const AppWithRouter = withRouter(App);
export { AppWithRouter as App };