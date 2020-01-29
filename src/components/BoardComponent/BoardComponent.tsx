import React from 'react';
import './BoardComponent.scss';

export const BoardComponent = (props: any) => {


    return (
        <div className='BoardComponent'>
            <div className='HeaderBoard'>
                <h3>Board id:</h3>
                <span>{props.id}</span>
                <h3>Name:</h3>
                <span>{props.name}</span>
            </div>
        </div>
    )
}