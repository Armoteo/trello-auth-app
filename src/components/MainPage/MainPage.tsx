import * as React from 'react';
import './MainPage.scss';
import { RouteChildrenProps } from 'react-router';
import { getFromLocalStorage } from "../../utils";
import { BoardComponent } from '../BoardComponent';


const TOKEN_STRORAGE_KEY = 'TOKEN';
const { REACT_APP_API_KEY } = process.env;

interface MainPageProps extends RouteChildrenProps {
    text?: string;
}

interface Board {
    id: string;
    name: string;
    pinned?: boolean;
    desc?: string;
    lists: [];
}

interface AppState {
    idBoard: string;
    boards: Array<Board>;
}

export class MainPage extends React.Component<MainPageProps> {

    public state: AppState = {
        idBoard: "",
        boards: []
    }

    componentDidMount() {
        this.getBoard();
    }

    //go to  previous page
    // goBack = () => {
    //     this.props.history.goBack();
    // }

    //save our tokken in localstorage
    private getToken = () => {
        return getFromLocalStorage(TOKEN_STRORAGE_KEY);
    }

    private async getBoard() {
        const token = this.getToken();
        const url = `https://api.trello.com/1/members/armoteo/boards?filter=all&fields=id,name,pinned,descData&lists=all&memberships=none&organization=false&organization_fields=name%2CdisplayName&key=${REACT_APP_API_KEY}&token=${token}`;
        const response = await fetch(url);
        if (response.ok === true && response.status === 200) {
            const parsResponse = await response.json();
            this.setState({ boards: parsResponse });
        }
    }


    render() {

        const createdBoard = this.state.boards.map((item, index) =>
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