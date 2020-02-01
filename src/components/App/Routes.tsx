import React from "react";
import { AutorithationForm } from "../Authorization-form";
import { MainPage } from "../MainPage";
import { RouteChildrenProps, Redirect } from "react-router-dom";
import { NotFound } from "../NotFound";
import { ListBoard } from "../ListBoard";
import { NavigationBar } from "../NavigationBar";
import { ProfilePage } from "../ProfilePage";


export enum ROUTES_URLS {
    HOME = '/',
    LOGIN = '/login',
    MAIN_PAGE = '/main',
    LIST_PAGE = '/list',
    PROFILE_PAGE = '/profile',
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
    id?: string
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
        render: (props: RouteChildrenProps) =>
            <div>
                <NavigationBar {...props} />
                <MainPage  {...props} />
            </div>,
        title: 'MainPage'
    },
    {
        path: ROUTES_URLS.LIST_PAGE,
        render: (props: RouteChildrenProps) =>
            <div>
                <NavigationBar {...props} />
                <ListBoard  {...props} />
            </div>,
        title: 'ListPage'
    },
    {
        path: ROUTES_URLS.PROFILE_PAGE,
        isProtected: true,
        render: (props: RouteChildrenProps) =>
            <div>
                <NavigationBar {...props} />
                <ProfilePage  {...props} />
            </div>,
        title: 'ListPage'
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