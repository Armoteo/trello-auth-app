import * as React from 'react';
import style from './MainPage.module.scss';
import { RouteChildrenProps } from 'react-router';
import { BoardComponent } from '../BoardComponent';
import { connect } from 'react-redux';
import { fetchBoards, getBoards } from '../../store/mainPage';
import { AppState } from '../../store';

interface MainPageProps extends RouteChildrenProps {
  boards?: Array<any>;
  onFetchBoards?: () => void;
}

class MainPage extends React.Component<MainPageProps> {

  componentDidMount() {
    this.props.onFetchBoards!();
  }

  render() {
    const createdBoard = this.props.boards!.map((item, index) =>
      <BoardComponent
        key={index}
        id={item.shortLink}
        name={item.name}
      />
    );

    return (
      <div className={style.MainPage}>
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