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
        const urlVatar = `${this.props.profile!.avatarUrl}/170.png`;
        const alt = 'AVATAR';
        const name = this.props.profile!.username ? this.props.profile!.username : this.props.profile!.fullName;
        return (
            <div className={style.ProfileHeader}>
                <img src={urlVatar} alt={alt} ></img>
                <h3>{name}</h3>
            </div>
        )
    }

    private renderContentProfile() {
        return (
            <div className={style.PrifileContent}>
                <span>Mail: {this.props.profile!.email}</span>
                <span>Fulname: {this.props.profile!.fullName} </span>
                <span>User Name: {this.props.profile!.username} </span>
                <span><a href={this.props.profile!.url}>Profile</a></span>
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