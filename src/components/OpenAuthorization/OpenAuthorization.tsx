import React, { FunctionComponent } from 'react';
import { RouteChildrenProps, Redirect } from 'react-router-dom';
import { ROUTES_URLS } from '../App/Routes';

interface OAuthProps extends RouteChildrenProps {
    onSaveToken: (token: string) => void;
}

export const OpenAuthorization: FunctionComponent<OAuthProps> = (props: OAuthProps) => {
    const token = window.location.hash.split('=')[1];
    console.log(token);
    props.onSaveToken(token);
    return <Redirect to={ROUTES_URLS.MAIN_PAGE} />
}