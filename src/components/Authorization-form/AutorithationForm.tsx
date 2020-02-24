import React from 'react';
import style from './AutorizationForm.module.scss';
import { Button } from '../Button';

const { REACT_APP_API_KEY, REACT_APP_APP_NAME, REACT_APP_APP_URL, REACT_APP_APP_SCOPE } = process.env

export class AutorithationForm extends React.Component {
    render() {
        const request = `https://trello.com/1/authorize?return_url=${REACT_APP_APP_URL}&expiration=1day&name=${REACT_APP_APP_NAME}&scope=${REACT_APP_APP_SCOPE}&response_type=token&key=${REACT_APP_API_KEY}`;

        return (
            <div className={style.ContainerAuthForm}>
                <div className={style.AuthForm}>
                    <h1>Authorization</h1>
                    <Button href={request}>Please login on trello</Button>
                </div>
            </div>

        )
    }

}
