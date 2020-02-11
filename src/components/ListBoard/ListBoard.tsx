import * as React from 'react';
import './ListBoard.scss';
import { RouteChildrenProps } from 'react-router';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import { fetchBoards, getBoards } from '../../store/listBoard';



interface ListPageProps extends RouteChildrenProps {
    token?: string;
    name?: string;
    id?: string;
    listCard?: Array<any>;
    onFetchBoards?: () => void;
}


class ListBoard extends React.Component<ListPageProps>{



    componentDidMount() {
        this.props.onFetchBoards!();
    }

    render() {
        // const createdListCard = this.props.listCard!.map((item, index) =>
        //     <ListCard
        //     key={index}

        //     />
        // );

        return (
            <div className="ListBoard">
                {/* {createdListCard} */}
                {console.log(this.props.listCard)}
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
const ConnectedListBoards = connect(mapStateToProps,
    mapDispatchToProps)(ListBoard);

export { ConnectedListBoards as ListBoard };



