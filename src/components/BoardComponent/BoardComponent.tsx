import React from 'react';
import style from './BoardComponent.module.scss';
import { Link } from 'react-router-dom';
import { setToLocalStorage } from '../../utils';


const ID_BOARD_STRORAGE_KEY = "ID_BOARD";

export class BoardComponent extends React.Component<any>{

    clickOpen = (e: { target: any; }) => {
        setToLocalStorage(ID_BOARD_STRORAGE_KEY, this.props.id);
    }

    render() {
        return (
            <div className={style.BoardComponent}>
                <div className={style.HeaderBoard}>
                    <h3>Board id:</h3>
                    <span>{this.props.id}</span>
                    <h3>Name:</h3>
                    <span>{this.props.name}</span>
                </div>
                <div className={style.BoardContainer} onClick={this.clickOpen}>
                    <Link to='/list'> <span >OPEN</span></Link>
                </div>
            </div>
        )
    }
}
