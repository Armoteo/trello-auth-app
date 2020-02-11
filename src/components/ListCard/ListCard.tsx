import React from 'react';
import './ListCard.scss';
import { RouteChildrenProps } from 'react-router';
import { fetchBoards, getBoards } from '../../store/listCard';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import { setToLocalStorage } from '../../utils';

interface ListCardsProps extends RouteChildrenProps {
    token?: string;
    name?: string;
    id?: string;
    listBoard?: Array<any>;
    onFetchBoards?: () => void;
}


const ID_LIST_CARDS = "ID_LIST_CARDS";

 class ListCard extends React.Component<any> {

    

    componentDidMount() {
        this.props.onFetchBoards!();
        
    }

    private createListItem() {
        const arr = this.props.listCard;
        return arr.map((item:any, index:number) =>{
            return item.idList=== this.props.id?<li key={index}>{item.name}</li>:null;
    });
    };

    render() {
        console.log(this.props.listCard);
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


const mapStateToProps = (state: AppState) => {
    return {
        listCard: getBoards(state)
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onFetchBoards: () => dispatch(fetchBoards())
    };
};
const ConnectedListCard = connect(mapStateToProps,
    mapDispatchToProps)(ListCard);

export { ConnectedListCard as ListCard };