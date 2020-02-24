import React from 'react';
import style from './ListCard.module.scss';
import { fetchBoards, getBoards, getListBoards, toogleList, editCardStatus, toogleText } from '../../store/listCard';
import { connect } from 'react-redux';
import { AppState } from '../../store';


interface ListCardsProps {
    id?: string;
    lists?: Array<any>;
    listCard?: Array<any>;

    onFetchBoards?: () => void;
    toogleList?: (data: any) => void;
    toogleText?: (data: any) => void;
    editCardStatus?: (data: any) => void;
}

interface stateCardsProps {
    text?: string;
}

class ListCard extends React.Component<ListCardsProps, stateCardsProps> {

    public state = {
        text: ''
    }

    componentDidMount() {
        this.props.onFetchBoards!();
    }

    private toggleListCard(idCard: string, idList: string, direction: string) {
        const listID = direction === 'left' ? this.genericIdList(idList, 'Left') : this.genericIdList(idList, 'Right');
        const toogleData = { idCard: idCard, idList: listID };
        this.props.toogleList!(toogleData);
    }


    private genericIdList = (idList: string, action: string) => {

        let indexItem = this.props.lists!.findIndex((el: any) => el.id === idList);

        if (indexItem < this.props.lists!.length - 1 && action === 'Right') {
            indexItem = indexItem + 1;
            return this.props.lists![indexItem].id;
        } else if (indexItem <= this.props.lists!.length - 1 && action === 'Left' && indexItem !== 0) {
            indexItem = indexItem - 1;
            return this.props.lists![indexItem].id;
        } else if (indexItem === 0 && action === 'Left') {
            indexItem = this.props.lists!.length - 1;
            return this.props.lists![indexItem].id;
        } else {
            indexItem = 0;
            return this.props.lists![indexItem].id;
        }
    }

    private toogleFlag(id: string) {
        const array = this.props.listCard!.map((item: any) => {
            if (item.id === id) {
                if (item.flagTextArea) {
                    item = { ...item, flagTextArea: false };
                } else {
                    item = { ...item, flagTextArea: true };
                }
            }
            return item;
        });
        this.props.editCardStatus!(array);
    }

    private textState(e: any) {
        this.setState({ text: e.target.value });
    }

    private createListItem() {
        return this.props.listCard!.map((item: any, index: number) => {

            const styleTextArea:any = [style.TextAreaCard];
            if(item.flagTextArea){
                styleTextArea.push(style.TextAreaCardAnable);
            }else{
                styleTextArea.push(style.TextAreaCardDisable);
            }
            const styleSaveButton = item.flagTextArea === true ? style.anable : style.disable;
            const styleEdit = item.flagTextArea === true ? style.disable : style.anable;
            const text = { id: item.id, text: this.state.text };

            return item.idList === this.props.id ?
                <div className={style.ItemListCard} key={index}>
                    <span onDoubleClick={() => this.toogleFlag(item.id)}>{item.name}</span>
                    <textarea 
                    className={styleTextArea.join(' ')} 
                    placeholder={item.name} 
                    onChange={(e) => this.textState(e)}
                    >
                    </textarea>
                    <div>
                        <button type="button" onClick={() => this.toggleListCard(item.id, item.idList, 'left')}>
                            <i className="fas fa-arrow-left"></i>
                        </button>
                        <button type="button" onClick={() => this.toggleListCard(item.id, item.idList, 'right')}>
                            <i className="fas fa-arrow-right"></i>
                        </button>
                        <button type="button" className={styleEdit} onClick={() => this.toogleFlag(item.id)}>
                            <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button type="button" className={styleSaveButton} onClick={() => this.props.toogleText!(text)}>
                            <i className="fas fa-save"></i>
                        </button>
                    </div>
                </div>
                : null;
        });
    };

    render() {
        return (
            <div>
                {this.createListItem()}
            </div>
        )
    }
}


const mapStateToProps = (state: AppState) => {
    return {
        listCard: getBoards(state),
        lists: getListBoards(state)
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onFetchBoards: () => dispatch(fetchBoards()),
        toogleList: (data: any) => dispatch(toogleList(data)),
        toogleText: (data: any) => dispatch(toogleText(data)),
        editCardStatus: (data: any) => dispatch(editCardStatus(data))
    };
};
const ConnectedListCard = connect(mapStateToProps,
    mapDispatchToProps)(ListCard);

export { ConnectedListCard as ListCard };