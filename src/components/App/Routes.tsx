import React from "react";
import { AutorithationForm } from "../Authorization-form";
import { MainPage } from "../MainPage";
import { RouteChildrenProps, Redirect } from "react-router-dom";
import { NotFound } from "../NotFound";


export enum ROUTES_URLS {
    HOME = '/',
    LOGIN = '/login',
    MAIN_PAGE = '/main',
    OAUTH = '/oauth',
    NOT_FOUND = '/404'
}

export interface AppRoute {
    path: ROUTES_URLS,
    render: (props: any) => any,
    title?: string,
    exact?: boolean,
    isHidden?: boolean,
    isProtected?: boolean,
}

export const routes: Array<AppRoute> = [
    {
        path: ROUTES_URLS.LOGIN,
        render: (props: any) => <AutorithationForm {...props} />,
        title: 'Login'
    },
    {
        path: ROUTES_URLS.MAIN_PAGE,
        isProtected: true,
        render: (props: RouteChildrenProps) => <MainPage  {...props} />,
        title: 'MainPage'
    },
    {
        path: ROUTES_URLS.HOME,
        exact: true,
        isHidden: true,
        render: () => <Redirect to={ROUTES_URLS.LOGIN} />,
    },
    {
        path: ROUTES_URLS.NOT_FOUND,
        isHidden: true,
        render: (props: RouteChildrenProps) => <NotFound {...props} />,
    }
]