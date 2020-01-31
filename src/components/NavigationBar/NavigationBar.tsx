import React from 'react';
import './NavigationBar.scss';
import { Link } from 'react-router-dom';



export const NavigationBar = (props: any) => {

    return (
        <div className='NavigationBar'>
            <div className='ContainerNav'>
                <Link to='/main'>Main</Link>
                <Link to='/profile'>Profile</Link>
            </div>
            <button onClick={props.logout}>Logout</button>
        </div>
    )
}