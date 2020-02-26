import React from 'react';
import style from './NavigationBar.module.scss';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteToken } from "../../store/auth";
import { setToLocalStorage } from '../../utils';

interface NavProps{
    deleteToken?: () => void;
}
const APP_TOKEN = 'TREELLO_CUSTOM_APP_TOKEN';

class NavigationBar extends React.Component<NavProps>{
    
    private clearToken = () => {
        setToLocalStorage(APP_TOKEN, '');
        this.props.deleteToken!();
    };
    render() {
        return (
            <div className={style.NavigationBar}>
                <div className={style.ContainerNav}>
                    <Link to='/main'>Main</Link>
                    <Link to='/profile'>Profile</Link>
                </div>
               <Link to='/login'> <button onClick={this.clearToken}>Logout<i className="fas fa-share-square"></i></button></Link>
            </div >
        )
    }
}
const mapDispatchProps = (dispatch: any) => {
    return {
        deleteToken: () => dispatch(deleteToken())
    };
};

const NavWithRouter = withRouter(connect(undefined, mapDispatchProps)(NavigationBar));
export { NavWithRouter as NavigationBar };

