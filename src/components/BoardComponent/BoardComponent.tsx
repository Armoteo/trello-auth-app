import React from 'react';
import style from './BoardComponent.module.scss';
import { Link } from 'react-router-dom';
import { setToLocalStorage } from '../../utils';

interface BoardComponentProps{
    name?:string;
    id?: string;
}

const ID_BOARD_STRORAGE_KEY = "ID_BOARD";

export class BoardComponent extends React.Component<BoardComponentProps>{

    clickOpen = (e: { target: any; }) => {
        const {id}= this.props;
        setToLocalStorage(ID_BOARD_STRORAGE_KEY, id);
    }
    render() {
        const {name}= this.props;
        return (
            <div className={style.BoardComponent}>
                <div className={style.HeaderBoard}>
                    <h3>Name:</h3>
                    <span>{name}</span>
                </div>
                <div className={style.BoardContainer} onClick={this.clickOpen}>
                    <Link to='/list'> <span >OPEN</span></Link>
                </div>
            </div>
        )
    }
}
