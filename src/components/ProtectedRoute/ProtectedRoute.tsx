import React, {FunctionComponent} from "react";
import {Route, Redirect, RouteProps, RouteComponentProps} from 'react-router-dom';

interface ProtectedRouteProps extends RouteProps {
    isAuthenticates: boolean;
}
const ProtectedRoute:FunctionComponent<ProtectedRouteProps> = ({render, isAuthenticates, ...rest})=> {
    return (
        <Route
            {...rest}
            render={(routeComProps:RouteComponentProps) =>
                isAuthenticates ? (
                    render!(routeComProps)
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: {from: routeComProps.location}
                        }}
                    />
                )
            }
        />
    );
};

export {ProtectedRoute};