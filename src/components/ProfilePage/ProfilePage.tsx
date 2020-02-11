import React, { Component } from 'react';
import './ProfilePage.scss';
import { getBoards, fetchBoards } from '../../store/profile';
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
    onFetchBoards?: () => void;
  }

 class ProfilePage extends Component<ProfilePageProps> {

    componentDidMount() {
        this.props.onFetchBoards!();   
    }

    private renderHeaderProfile() {
        const urlVatar = `${this.props.profile!.avatarUrl}/170.png`;
        const alt = 'AVATAR';
        const name = this.props.profile!.username ? this.props.profile!.username : this.props.profile!.fullName;
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
      onFetchBoards: () => dispatch(fetchBoards())
    };
  };
  const ConnectedProfilePage = connect(mapStateToProps,
    mapDispatchToProps)(ProfilePage);
  
  export { ConnectedProfilePage as ProfilePage };