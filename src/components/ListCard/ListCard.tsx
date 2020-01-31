import React from 'react';
import './ListCard.scss';
import { getFromLocalStorage } from '../../utils';

const TOKEN_STRORAGE_KEY = 'TOKEN';
const { REACT_APP_API_KEY } = process.env;

interface listArray {
    id: string;
    name: string;
    lists?: [];
}

interface AppState {
    listArray: Array<listArray>;
}

export class ListCard extends React.Component<any> {

    public state: AppState = {
        listArray: []
    }

    componentDidMount() {
        this.getListCard();
    }

    private getToken = () => {
        return getFromLocalStorage(TOKEN_STRORAGE_KEY);
    }

    private async getListCard() {
        const token = this.getToken();
        const url = `https://api.trello.com/1/lists/${this.props.id}/cards?fields=id,name,badges,labels&key=${REACT_APP_API_KEY}&token=${token}`;
        const response = await fetch(url);
        if (response.ok === true && response.status === 200) {
            const parsResponse = await response.json();
            this.setState({ listArray: parsResponse });
        }
    }

    private createListItem() {
        const arr = this.state.listArray;
        return arr.map((item, index) =>
            <li key={index}>{item.name}</li>
        )
    }

    render() {
        const createListItem = this.createListItem();
        return (
            <div className="ListCard" >
                <div className="HeaderListCard">
                    <p>id: {this.props.id}</p>
                    <p>name: {this.props.name} </p>
                </div>
                <ul>
                    {createListItem}
                </ul>
            </div>
        )
    }
}