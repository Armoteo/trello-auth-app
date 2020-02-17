import * as React from 'react';
import './ListBoard.scss';
import { RouteChildrenProps } from 'react-router';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import { fetchBoards, getBoards, editListStatus, editListName } from '../../store/listBoard';
import { ListCard } from '../ListCard';


interface ListPageProps extends RouteChildrenProps {
    token?: string;
    name?: string;
    id?: string;
    listBoard?: Array<any>;
    onFetchBoards?: () => void;
    editListStatus?: () => void;
}

class ListBoard extends React.Component<any>{

    public state = {
        text: ''
    }

    componentDidMount() {
        this.props.onFetchBoards!();
    }

    private toogleText(id: string) {
        const array = this.props.listBoard?.map((item: any) => {
            if (item.id === id) {
                if (item.flagTextArea) {
                    item = { ...item, flagTextArea: false };
                } else {
                    item = { ...item, flagTextArea: true };
                }
            }
            return item;
        });
        this.props.editListStatus(array);
    }

    private textState(e: any) {
        this.setState({ text: e.target.value });
    };

    render() {
        const createdListCard = this.props.listBoard!.map((item: any, index: number) => {

            const styleTextArea = item.flagTextArea === true ? "TextAreaCard anable" : "TextAreaCard disable";
            const styleSaveButton = item.flagTextArea === true ? "anable" : "disable";
            const styleEdit = item.flagTextArea === true ? "disable" : "anable";

            const text = { id: item.id, text: this.state.text };

            return (<div className="ListCard" key={index}>
                <div className="HeaderListCard">
                    <div>
                        <button type="button" className={styleEdit} onClick={() => this.toogleText(item.id)}>
                            <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button type="button" className={styleSaveButton} onClick={() => this.props.editListName(text)}>
                            <i className="fas fa-save"></i>
                        </button>
                    </div>
                    <p>Name list: {item.name} </p>
                    <textarea className={styleTextArea} placeholder={item.name} onChange={(e) => this.textState(e)}></textarea>
                </div>
                <ListCard
                    id={item.id}
                    name={item.name}
                />
            </div>)
        }
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
        onFetchBoards: () => dispatch(fetchBoards()),
        editListStatus: (data: any) => dispatch(editListStatus(data)),
        editListName: (data: any) => dispatch(editListName(data))
    };
};
const ConnectedListBoards = connect(mapStateToProps,
    mapDispatchToProps)(ListBoard);

export { ConnectedListBoards as ListBoard };



