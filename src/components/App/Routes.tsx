import React from "react";
import { AutorithationForm } from "../Authorization-form";
import { MainPage } from "../MainPage";
import { RouteChildrenProps, Redirect } from "react-router-dom";
import { NotFound } from "../NotFound";

export interface AppRoute {
    path: string,
    render: (props: any) => any,
    title?: string,
    exact?: boolean,
    isHidden?: boolean
}

export const routes: Array<AppRoute> = [
    {
        path: "/login",
        render: (props: any) => <AutorithationForm {...props} />,
        title: 'Login'
    },
    {
        path: "/main",
        render: (props: RouteChildrenProps) => <MainPage {...props} />,
        title: 'MainPage'
    },
    {
        path: '/',
        exact: true,
        isHidden: true,
        render: () => <Redirect to="/login" />,
    },
    {
        path: '/404',
        isHidden: true,
        render: (props: RouteChildrenProps) => <NotFound {...props} />,
    }
]