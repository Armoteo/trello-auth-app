import * as React from 'react';
import './ListBoard.scss';
import { RouteChildrenProps } from 'react-router';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import { fetchBoards, getBoards } from '../../store/listBoard';
import { ListCard } from '../ListCard';

interface ListPageProps extends RouteChildrenProps {
    token?: string;
    name?: string;
    id?: string;
    listBoard?: Array<any>;
    onFetchBoards?: () => void;
}

class ListBoard extends React.Component<ListPageProps>{

    componentDidMount() {
        this.props.onFetchBoards!();
    }


    render() {
        const createdListCard = this.props.listBoard!.map((item:any, index:number) =>
            <ListCard
            key={index}
            id={item.id}
            name={item.name}

            />
        );

        return (
            <div className="ListBoard">
                {createdListCard}
            </div>
        )
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        listBoard: getBoards(state)
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onFetchBoards: () => dispatch(fetchBoards())
    };
};
const ConnectedListBoards = connect(mapStateToProps,
    mapDispatchToProps)(ListBoard);

export { ConnectedListBoards as ListBoard };



