import React from 'react';
import './Button.scss';

export const Button = (props: any) => {

    return (
        <a href={props.href} className='Button'>{props.children}</a>
    )
}
