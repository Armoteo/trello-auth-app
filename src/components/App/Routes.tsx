import * as React from 'react';
import { Login } from "../Login";
import { Dashboard } from "../Dashboard";
import { Redirect } from 'react-router-dom';


interface AppRoute {
    path: string;
    render: (props: any) => any;
    title?: string;
    isHidden?: boolean;
    exact?: boolean
}


export const routes: Array<AppRoute> = [
    {
        path: "/login",
        render: (props: any) => <Login {...props} />,
        title: 'Login'
    },
    {
        path: "/dashboard",
        title: 'Dashboard',
        render: (props: any) => <Dashboard {...props} />,
    },
    {
        path: "/",
        isHidden: true,
        exact: true,
        render: () => <Redirect to="/" />,

    }
]