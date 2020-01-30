import * as React from 'react';
import './ListBoard.scss';
import { RouteChildrenProps } from 'react-router';
import { ListCard } from '../ListCard';
import { getFromLocalStorage } from '../../utils';

interface ListPageProps extends RouteChildrenProps {
    text?: string;
    id?: string;
}

interface listCard {
    id: string;
    name: string;
    pinned?: boolean;
    desc?: string;
    lists?: [];
}

interface AppState {
    listCard: Array<listCard>;
}

const ID_BOARD_STRORAGE_KEY = "ID_BOARD";
const TOKEN_STRORAGE_KEY = 'TOKEN';
const { REACT_APP_API_KEY } = process.env;


export class ListBoard extends React.Component<ListPageProps>{

    public state: AppState = {
        listCard: []
    }

    componentDidMount() {
        this.getList();
    }


    private getToken = () => {
        return getFromLocalStorage(TOKEN_STRORAGE_KEY);
    }
    private getIDboard = () => {
        return getFromLocalStorage(ID_BOARD_STRORAGE_KEY);
    }

    private async getList() {
        const token = this.getToken();
        const idBoard = this.getIDboard();
        const url = `https://api.trello.com/1/members/armoteo/boards?filter=all&fields=id,name,pinned,descData&lists=all&memberships=none&organization=false&organization_fields=name%2CdisplayName&key=${REACT_APP_API_KEY}&token=${token}`;
        const response = await fetch(url);
        if (response.ok === true && response.status === 200) {
            const parsResponse = await response.json();
            parsResponse.map((item: any) => {
                if (item.id === idBoard) {
                    this.setState({ listCard: item.lists });
                }

            });
        }
    }

    private createdListCard = () => {
        const array = this.state.listCard;
        return array.map((item: any) =>
            <ListCard
                name={item.name}
                id={item.id}
                key={item.id}
            />
        )
    }


    render() {
        const listCardView = this.createdListCard();
        return (
            <div className="ListBoard">
                {listCardView}
            </div>
        )
    }
}

