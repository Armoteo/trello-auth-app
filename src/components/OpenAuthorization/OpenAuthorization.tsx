import React, { FunctionComponent } from 'react';
import { RouteChildrenProps, Redirect } from 'react-router-dom';

interface OAuthProps extends RouteChildrenProps {
    onSaveToken: (token: string) => void;
}

export const OpenAuthorization: FunctionComponent<OAuthProps> = (props: OAuthProps) => {
    const token = window.location.hash.split('=')[1];
    props.onSaveToken(token);
    return <Redirect to={'/main'} />
}