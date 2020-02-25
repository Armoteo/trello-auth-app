import * as React from 'react';
import style from './ListBoard.module.scss';
import { RouteChildrenProps } from 'react-router';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import { fetchBoards, getBoards, editListStatus, editListName, createNewCard } from '../../store/listBoard';
import { ListCard } from '../ListCard';

interface ListPageProps extends RouteChildrenProps {
    name?: string;
    id?: string;
    listBoard?: Array<any>;
    onFetchBoards?: () => void;
    editListStatus?: (data: any) => void;
    editListName?: (data: any) => void;
    createNewCard?: (data: any) => void;
}

interface stateListProps {
    text?: string;
}

class ListBoard extends React.Component<ListPageProps>{

    public state: stateListProps = {
        text: ''
    }

    componentDidMount() {
        this.props.onFetchBoards!();
    }

    private toogleText(id: string) {
        const array = this.props.listBoard?.map((item) => {
            if (item.id === id) {
                if (item.flagTextArea) {
                    item = { ...item, flagTextArea: false };
                } else {
                    item = { ...item, flagTextArea: true };
                }
            }
            return item;
        });
        this.props.editListStatus!(array);
    }

    private textState(e: any) {
        this.setState({ text: e.target.value });
    };

    private createNewCard = (id: string) => {
        console.log('first');
        const textCard = 'I am live!!!';
        const text = { id: id, text: textCard };
        this.props.createNewCard!(text);
    };


    // handleKeyPress = (e: any, text: any) => {
    //     if (e.key === 'Enter') {
    //         this.props.editListName!(text);
    //     }
    // };

    render() {
        const createdListCard = this.props.listBoard!.map((item, index) => {

            const styleTextArea: any = [style.TextAreaCard];
            if (item.flagTextArea) {
                styleTextArea.push(style.TextAreaAnable);
            } else {
                styleTextArea.push(style.TextAreaDisable);
            }
            const styleSaveButton = item.flagTextArea === true ? style.anable : style.disable;
            const styleEdit = item.flagTextArea === true ? style.disable : style.anable;
            const text = { id: item.id, text: this.state.text };

            return <div className={style.ListCard} key={index}>
                <div className={style.HeaderListCard}>
                    <div>
                        <button type="button" onClick={() => this.createNewCard(item.id)}>
                            <i className="fas fa-plus-square"></i>
                        </button>
                        <button type="button" className={styleEdit} onClick={() => this.toogleText(item.id)}>
                            <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button type="button" className={styleSaveButton} onClick={() => this.props.editListName!(text)}>
                            <i className="fas fa-save"></i>
                        </button>
                    </div>
                    <p onDoubleClick={() => this.toogleText(item.id)}>Name list: {item.name} </p>
                    <textarea className={styleTextArea.join(' ')} placeholder={item.name} onChange={(e) => this.textState(e)}></textarea>
                </div>
                <ListCard id={item.id} />
            </div>
        }
        );

        return (
            <div className={style.ListBoard}>
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
        editListName: (data: any) => dispatch(editListName(data)),
        createNewCard: (data: any) => dispatch(createNewCard(data))
    };
};
const ConnectedListBoards = connect(mapStateToProps,
    mapDispatchToProps)(ListBoard);

export { ConnectedListBoards as ListBoard };



