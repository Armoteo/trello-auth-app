import React, { Component } from 'react';
import './ProfilePage.scss';
import { getFromLocalStorage } from '../../utils';
import { RouteChildrenProps } from 'react-router-dom';


const TOKEN_STRORAGE_KEY = 'TOKEN';
const { REACT_APP_API_KEY, REACT_APP_API_DOMAIN, REACT_APP_API_FULLNAME } = process.env;


interface ProfilePageProps extends RouteChildrenProps {

}

interface ProfileState {
    arrProfile: {
        id?: string;
        avatarHash?: string;
        avatarUrl?: string;
        gravatarHash?: string;
        email?: string;
        fullName?: string;
        url?: string;
        username?: string;
    }
}


export class ProfilePage extends Component<ProfilePageProps> {

    public state: ProfileState = {
        arrProfile: {

        }
    }

    componentDidMount() {
        this.getProfile();
    }

    private getToken = () => {
        return getFromLocalStorage(TOKEN_STRORAGE_KEY);
    }

    private async getProfile() {
        const token = this.getToken();
        const fields = `id,avatarUrl,email,fullName,url,username`;
        const url = `${REACT_APP_API_DOMAIN}/1/members/${REACT_APP_API_FULLNAME}?fields=all&key=${REACT_APP_API_KEY}&token=${token}`;
        const response = await fetch(url);
        if (response.ok === true && response.status === 200) {
            const parsResponse = await response.json();
            this.setState({ arrProfile: parsResponse });
        }
    }

    private renderHeaderProfile() {
        const urlVatar = `${this.state.arrProfile.avatarUrl}/170.png`;
        const alt = 'AVATAR';
        const name = this.state.arrProfile.username ? this.state.arrProfile.username : 'error';
        return (
            <div className='ProfileHeader'>
                <img src={urlVatar} alt={alt} ></img>
                <h3>{name}</h3>
            </div>
        )
    }


    private renderContentProfile() {
        return (
            <div className="PrifileContent">
                <span>Mail: {this.state.arrProfile.email}</span>
                <span>Fulname: {this.state.arrProfile.fullName} </span>
                <span>User Name: {this.state.arrProfile.username} </span>
                <span><a href={this.state.arrProfile.url}>Profile</a></span>
            </div>)
    }

    render() {
        return (
            <div className="ProfilePage">
                {this.renderHeaderProfile()}
                {this.renderContentProfile()}
            </div>
        )
    }
} 