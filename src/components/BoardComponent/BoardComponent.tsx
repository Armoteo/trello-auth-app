import React from 'react';
import './BoardComponent.scss';
import { Link } from 'react-router-dom';
import { setToLocalStorage } from '../../utils';


const ID_BOARD_STRORAGE_KEY = "ID_BOARD";

export class BoardComponent extends React.Component<any>{

    clickOpen = (e: { target: any; }) => {
        console.log(this.props.id);
        setToLocalStorage(ID_BOARD_STRORAGE_KEY, this.props.id);
    }

    render() {
        return (
            <div className='BoardComponent'>
                <div className='HeaderBoard'>
                    <h3>Board id:</h3>
                    <span>{this.props.id}</span>
                    <h3>Name:</h3>
                    <span>{this.props.name}</span>
                </div>
                <div className='BoardContainer' onClick={this.clickOpen}>
                    <Link to='/list'> <span >OPEN</span></Link>
                </div>
            </div>
        )
    }
}
