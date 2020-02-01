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
        const url = `https://api.trello.com/1/members/armoteo?fields=id,avatarUrl,gravatarHash,email,fullName,url,username&key=${REACT_APP_API_KEY}&token=${token}`;
        // const url = `https://api.trello.com/1/members/armoteo?fields=all&key=${REACT_APP_API_KEY}&token=${token}`;
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

    // private renderContentProfile() {
    //     const arr = this.state.arrProfile;
    //     return (
    //         <div className="PrifileContent">
    //         {Object.keys(arr).map((item, index)=>
    //          <span key={index}>{arr[item]}</span>
    //             )}
    //         </div>)
    // }

    private renderContentProfile() {
        return (
            <div className="PrifileContent">
                <img src={`${this.state.arrProfile.gravatarHash}/170.png`} alt="AVATAR"></img>
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