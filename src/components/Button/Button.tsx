import React from 'react';
import style from './Button.module.scss';

export const Button = (props: any) => {

    return (
        <a href={props.href} className={style.Button}>{props.children}</a>
    )
}
