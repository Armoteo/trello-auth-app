import React from 'react';
import './ListCard.scss';
import { RouteChildrenProps } from 'react-router';
import { fetchBoards, getBoards } from '../../store/listCard';
import { connect } from 'react-redux';
import { AppState } from '../../store';

interface ListCardsProps extends RouteChildrenProps {
    token?: string;
    name?: string;
    id?: string;
    listBoard?: Array<any>;
    onFetchBoards?: () => void;
}


// const ID_LIST_CARDS = "ID_LIST_CARDS";

class ListCard extends React.Component<any> {



    componentDidMount() {
        this.props.onFetchBoards!();

    }

    private createListItem() {
        const arr = this.props.listCard;
        return arr.map((item: any, index: number) => {
            return item.idList === this.props.id ?
                <div className="ItemListCard" key={index}>
                    <span>{item.name}</span>
                    <div>
                        <button type="button">
                            <i className="fas fa-arrow-left"></i>
                        </button>
                        <button type="button">
                            <i className="fas fa-arrow-right"></i>
                        </button>
                        <button type="button">
                            <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button type="button">
                            <i className="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
                : null;
        });
    };

    render() {
        return (
            <div className="ListCard" >
                <div className="HeaderListCard">
                    <div>
                        <button type="button">
                        <i className="fas fa-pencil-alt"></i>
                    </button>
                        <button type="button">
                            <i className="fas fa-trash-alt"></i>
                        </button>
                    </div>
                    <p>Name list: {this.props.name} </p>
                </div>
                {this.createListItem()}
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