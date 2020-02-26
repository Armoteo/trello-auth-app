import React, { ReactNode } from 'react';
import style from './Button.module.scss';

interface ButtonProps{
    href:string;
    children:ReactNode;
}

export const Button = (props: ButtonProps) => {

    return (
        <a href={props.href} className={style.Button}>{props.children}</a>
    )
}
