import React, { Component } from 'react';
import './ProfilePage.scss';
import { getFromLocalStorage } from '../../utils';
import { RouteChildrenProps } from 'react-router-dom';


const TOKEN_STRORAGE_KEY = 'TOKEN';
const { REACT_APP_API_KEY } = process.env;


interface ProfilePageProps extends RouteChildrenProps {

}

interface arrProfile {
    arrProfile: object;
    id?: string;
    avatarHash?: string;
    avatarUrl?: string;
    gravatarHash?: string;
    email?: string;
    fullName?: string;
    url?: string;
    username?: string;
}

interface ProfileState {
    // arrProfile: Array<arrProfile>;
}

export class ProfilePage extends Component<ProfilePageProps> {

    public state: any = {
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
        const url = `https://api.trello.com/1/members/armoteo?fields=id,avatarHash,avatarUrl,gravatarHash,email,fullName,url,username&key=${REACT_APP_API_KEY}&token=${token}`;
        const response = await fetch(url);
        if (response.ok === true && response.status === 200) {
            const parsResponse = await response.json();
            this.setState({ arrProfile: parsResponse });
        }
    }

    private renderHeaderProfile() {
        const urlVatar = `${this.state.arrProfile.avatarUrl}/170.png`;
        const name = this.state.arrProfile.username ? this.state.arrProfile.username : 'error';
        return (
            <div className='ProfileHeader'>
                <img src={urlVatar} alt="PHOTO"></img>
                <h3>{name}</h3>
            </div>
        )
    }

    private renderContentProfile() {
        return (
            <div className="PrifileContent">
                <span></span>
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