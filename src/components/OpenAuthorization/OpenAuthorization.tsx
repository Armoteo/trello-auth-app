import React, { FunctionComponent } from 'react';
import { RouteChildrenProps, Redirect } from 'react-router-dom';
import { ROUTES_URLS } from '../App/Routes';
import { setToken } from '../../store/auth';
import { connect } from 'react-redux';

interface OAuthProps extends RouteChildrenProps {
    onSaveToken?: (token: string) => void;
}

const OpenAuthorization: FunctionComponent<OAuthProps> = (props: OAuthProps) => {
    const token = window.location.hash.split('=')[1];
    props.onSaveToken && props.onSaveToken(token);
    return <Redirect to={ROUTES_URLS.MAIN_PAGE} />
};

const mapDispathToProps = (dispatch: any) => {
    return {
        onSaveToken: (token: string) => dispatch(setToken(token))
    }
}

const ConnectedOAuth = connect(undefined, mapDispathToProps)(OpenAuthorization);

export { ConnectedOAuth as OpenAuthorization };