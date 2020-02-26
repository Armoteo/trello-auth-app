import React, { Component } from 'react';
import style from './ProfilePage.module.scss';
import { getBoards, fetchProfile } from '../../store/profile';
import { AppState } from '../../store';
import { RouteChildrenProps } from 'react-router';
import { connect } from 'react-redux';


interface ProfilePageProps extends RouteChildrenProps {
    profile?:{
        avatarUrl?:string, 
        username?: string,
        fullName?:string,
        email?:string,
        url?:string,
    },
    onFetchProfile?: () => void;
  }

 class ProfilePage extends Component<ProfilePageProps> {
     
    componentDidMount() {
        this.props.onFetchProfile!();   
    }

    private renderHeaderProfile() {
        const {avatarUrl, username, fullName} = this.props.profile!;
        const urlVatar = `${avatarUrl}/170.png`;
        const alt = 'AVATAR';
        const name = username ? username : fullName;
        return (
            <div className={style.ProfileHeader}>
                <img src={urlVatar} alt={alt} ></img>
                <h3>{name}</h3>
            </div>
        )
    }

    private renderContentProfile() {
        const {email,fullName, username, url } = this.props.profile!;
        return (
            <div className={style.PrifileContent}>
                <span>Mail: {email}</span>
                <span>Fulname: {fullName} </span>
                <span>User Name: {username} </span>
                <span><a href={url}>Profile</a></span>
            </div>)
    }

    render() {
        return (
            <div className="ProfilePage">
                {this.renderHeaderProfile()}
                {this.renderContentProfile()}
            </div>
        )
    };
};


const mapStateToProps = (state: AppState) => {
    return {
      profile: getBoards(state)
    };
  };
  
  const mapDispatchToProps = (dispatch: any) => {
    return {
      onFetchProfile: () => dispatch(fetchProfile())
    };
  };
  const ConnectedProfilePage = connect(mapStateToProps,
    mapDispatchToProps)(ProfilePage);
  
  export { ConnectedProfilePage as ProfilePage };