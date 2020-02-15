import React from 'react';
import './ListCard.scss';
import { RouteChildrenProps } from 'react-router';
import { fetchBoards, getBoards, getListBoards, toogleList, editCardStatus, toogleText } from '../../store/listCard';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import { getFromLocalStorage } from '../../utils';


interface ListCardsProps extends RouteChildrenProps {
    token?: string;
    name?: string;
    id?: string;
    listBoard?: Array<any>;
    onFetchBoards?: () => void;
}

const APP_TOKEN = 'TREELLO_CUSTOM_APP_TOKEN';
const { REACT_APP_API_KEY } = process.env;


class ListCard extends React.Component<any> {

    componentDidMount() {
        this.props.onFetchBoards!();
    }

    // private toggleListCardRight(idCard: any, idList: any) {
    //     const listID = this.genericIdList(idList, 'Right');
    //     this.toogleList(idCard, listID);
    // }

    // private toggleListCardLeft(idCard: any, idList: any) {
    //     // const listID = this.genericIdList(idList, 'Left');
    //     // this.toogleList(idCard, listID);
    // }

    // private genericIdList = (idList: string, action: string) => {

    //     let indexItem = this.props.lists.findIndex((el: any) => el.id === idList);

    //     if (indexItem < this.props.lists.length - 1 && action === 'Right') {
    //         indexItem = indexItem + 1;
    //         return this.props.lists[indexItem].id;
    //     } else if (indexItem <= this.props.lists.length - 1 && action === 'Left' && indexItem !== 0) {
    //         indexItem = indexItem - 1;
    //         return this.props.lists[indexItem].id;
    //     } else if (indexItem === 0 && action === 'Left') {
    //         indexItem = this.props.lists.length - 1;
    //         return this.props.lists[indexItem].id;
    //     } else {
    //         indexItem = 0;
    //         return this.props.lists[indexItem].id;
    //     }
    // }

    // private getToken = () => {
    //     return getFromLocalStorage(APP_TOKEN);
    // }

    // private async toogleList(id: string, idList: any) {
    //     const token = this.getToken();
    //     const url = `https://api.trello.com/1/cards/${id}/idList?value=${idList}&key=${REACT_APP_API_KEY}&token=${token}`;
    //     const response = await fetch(url, {
    //         method: 'PUT'
    //     });
    //     if (response.ok === true && response.status === 200) {
    //         this.props.onFetchBoards!();
    //     }
    // }
    // listCardsArray

    private toogleText(id: string) {
        const array = this.props.listCard.map((item: any) => {
            if (item.id === id) {
                if (item.flagTextArea) {
                    item = { ...item, flagTextArea: false };
                } else {
                    item = { ...item, flagTextArea: true };
                }
            }
            return item;
        });
        this.props.editCardStatus(array);
        // const token = this.getToken();
        // const text = 'Hello World'
        // const url = `https://api.trello.com/1/cards/${id}/name?value=${text}&key=${REACT_APP_API_KEY}&token=${token}`;
        // const response = await fetch(url, {
        //     method: 'PUT'
        // });
        // if (response.ok === true && response.status === 200) {
        //     this.props.onFetchBoards!();
        // }
    }

    private createListItem() {
        return this.props.listCard.map((item: any, index: number) => {
            const styleTextArea = item.flagTextArea === true ? "TextAreaCard anable" : "TextAreaCard disable";

            return item.idList === this.props.id ?
                <div className="ItemListCard" key={index}>
                    <span>{item.name}</span>
                    <textarea className={styleTextArea} placeholder={item.name}></textarea>
                    <div>
                        <button type="button">
                            <i className="fas fa-arrow-left"></i>
                        </button>
                        <button type="button">
                            <i className="fas fa-arrow-right"></i>
                        </button>
                        <button type="button" onClick={() => this.toogleText(item.id)}>
                            <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button type="button" className='Button-save'>
                            <i className="fas fa-save"></i>
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
                        <button type="button" className='Button-save'>
                            <i className="fas fa-save"></i>
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
        listCard: getBoards(state),
        lists: getListBoards(state)
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onFetchBoards: () => dispatch(fetchBoards()),
        // toogleList: () => dispatch(toogleList(data)),
        // toogleText: () => dispatch(toogleText(payload)),
        editCardStatus: (data: any) => dispatch(editCardStatus(data))
    };
};
const ConnectedListCard = connect(mapStateToProps,
    mapDispatchToProps)(ListCard);

export { ConnectedListCard as ListCard };