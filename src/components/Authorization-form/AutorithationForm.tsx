import React from 'react';
import './AutorizationForm.scss';
import { Button } from '../Button';

export const AutorithationForm = (props: any) => {
    return (
        <div className="AuthForm">
            <h1>Authorization</h1>
            <Button href={props.href}>Please login on trello</Button>
        </div>
    )
}
