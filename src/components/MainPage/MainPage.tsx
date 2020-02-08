import * as React from 'react';
import './MainPage.scss';
import { RouteChildrenProps } from 'react-router';
import { BoardComponent } from '../BoardComponent';
import { connect } from 'react-redux';
import { fetchBoards, getBoards } from '../../store/mainPage';
import {AppState } from '../../store';

interface MainPageProps extends RouteChildrenProps {
    hello?: string;
  token?: string;
  myCount?: number;
  boards?: Array<any>;
  onFetchBoards?: () => void;
}

class MainPage extends React.Component<MainPageProps> {

    componentDidMount() {
        this.props.onFetchBoards!();
      }

    //go to  previous page
    goBack = () => {
        this.props.history.goBack();
    }

   
    render() {

        const createdBoard = this.props.boards!.map((item, index) =>
            <BoardComponent
                key={index}
                id={item.id}
                name={item.name}
                lists={item.lists}
            />
        );

        return (
            <div className="MainPage">
                {createdBoard}
            </div>
        )
    }
}

const mapStateToProps = (state: AppState) => {
    return {
      boards: getBoards(state)
    };
  };
  
  const mapDispatchToProps = (dispatch: any) => {
    return {
      onFetchBoards: () => dispatch(fetchBoards())
    };
  };
const ConnectedMainPage = connect(mapStateToProps,
    mapDispatchToProps)(MainPage);

export { ConnectedMainPage as MainPage };