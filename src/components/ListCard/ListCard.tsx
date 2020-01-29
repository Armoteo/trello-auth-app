import React from 'react';
import './ListCard.scss';

export const ListCard = (props: any) => {
    return (
        <div className="ListCard" >
            <p>id: {props.id}</p>
            <p>name: {props.name} </p>
        </div>
    )
}