import * as React from 'react';
import { Login } from "../Login";
import { Dashboard } from "../Dashboard";
import { Redirect, RouteChildrenProps } from 'react-router-dom';
import { NotFound } from '../NotFound';


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
        render: (props: RouteChildrenProps) => <Dashboard {...props} />
    },
    {
        path: "/",
        isHidden: true,
        exact: true,
        render: () => <Redirect to="/" />
    },
    {
        path: "/404",
        isHidden: true,
        render: (props: RouteChildrenProps) => <NotFound {...props}/>
    }
]