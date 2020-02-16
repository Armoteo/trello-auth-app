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

public state={
    text: '',
    flafList:false
}


    componentDidMount() {
        this.props.onFetchBoards!();
    }

    private toggleListCardRight(idCard: any, idList: any) {
        const listID = this.genericIdList(idList, 'Right');
        this.toogleList(idCard, listID);
    }

    private toggleListCardLeft(idCard: any, idList: any) {
        const listID = this.genericIdList(idList, 'Left');
        this.toogleList(idCard, listID);
    }

    private genericIdList = (idList: string, action: string) => {

        let indexItem = this.props.lists.findIndex((el: any) => el.id === idList);

        if (indexItem < this.props.lists.length - 1 && action === 'Right') {
            indexItem = indexItem + 1;
            return this.props.lists[indexItem].id;
        } else if (indexItem <= this.props.lists.length - 1 && action === 'Left' && indexItem !== 0) {
            indexItem = indexItem - 1;
            return this.props.lists[indexItem].id;
        } else if (indexItem === 0 && action === 'Left') {
            indexItem = this.props.lists.length - 1;
            return this.props.lists[indexItem].id;
        } else {
            indexItem = 0;
            return this.props.lists[indexItem].id;
        }
    }

    private getToken = () => {
        return getFromLocalStorage(APP_TOKEN);
    }

    private async toogleList(id: string, idList: any) {
        const token = this.getToken();
        const url = `https://api.trello.com/1/cards/${id}/idList?value=${idList}&key=${REACT_APP_API_KEY}&token=${token}`;
        const response = await fetch(url, {
            method: 'PUT'
        });
        if (response.ok === true && response.status === 200) {
            this.props.onFetchBoards!();
        }
    }
    

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
    }

    private textState(e:any){
        this.setState({text:e.target.value});
    }


    private async setTextCards(id:string, type:string){
    const token = this.getToken();
        const text = this.state.text;
        const url = `https://api.trello.com/1/${type}/${id}/name?value=${text}&key=${REACT_APP_API_KEY}&token=${token}`;
        const response = await fetch(url, {
            method: 'PUT'
        });
        if (response.ok === true && response.status === 200) {
            this.props.onFetchBoards!();
        }
        
    }

    private createListItem() {
        return this.props.listCard.map((item: any, index: number) => {
            
            const styleTextArea = item.flagTextArea === true ? "TextAreaCard anable" : "TextAreaCard disable";
            const styleSaveButton = item.flagTextArea === true ? "anable" : "disable";
            const styleEdit = item.flagTextArea === true ? "disable" : "anable";

            return item.idList === this.props.id ?
                <div className="ItemListCard" key={index}>
                    <span>{item.name}</span>
                    <textarea className={styleTextArea} placeholder={item.name} onChange={(e)=>this.textState(e)}></textarea>
                    <div>
                        <button type="button" onClick={()=>this.toggleListCardLeft(item.id, item.idList)}>
                            <i className="fas fa-arrow-left"></i>
                        </button>
                        <button type="button" onClick={()=>this.toggleListCardRight(item.id, item.idList)}>
                            <i className="fas fa-arrow-right"></i>
                        </button>
                        <button type="button" className={styleEdit} onClick={() => this.toogleText(item.id)}>
                            <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button type="button" className={styleSaveButton} onClick={()=>this.setTextCards(item.id, 'cards')}>
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
        // toogleList: () => dispatch(toogleList(data)),
        // toogleText: () => dispatch(toogleText(payload)),
        editCardStatus: (data: any) => dispatch(editCardStatus(data))
    };
};
const ConnectedListCard = connect(mapStateToProps,
    mapDispatchToProps)(ListCard);

export { ConnectedListCard as ListCard };