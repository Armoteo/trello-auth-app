import React from 'react';
import './NavigationBar.scss';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteToken } from "../../store/auth";
import { setToLocalStorage } from '../../utils';



const APP_TOKEN = 'TREELLO_CUSTOM_APP_TOKEN';

class NavigationBar extends React.Component<any>{


    private clearToken = () => {
        setToLocalStorage(APP_TOKEN, '');
        this.props.deleteToken();
    };

    render() {
        return (
            <div className='NavigationBar'>
                <div className='ContainerNav'>
                    <Link to='/main'>Main</Link>
                    <Link to='/profile'>Profile</Link>
                </div>
                <button onClick={this.clearToken}>Logout</button>
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

