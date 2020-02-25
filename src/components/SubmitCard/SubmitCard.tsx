import React from 'react';
import style from './SubmitCard.module.scss';


export class SubmitCard extends React.Component<any> {

    public state = {
        text: ''
    }

    // private textState(e: any) {
    //     this.setState({ text: e.target.value });
    // };

    render() {
        return (
            <div className={style.Submit}>
                <div className={style.Container}>
                    <div>
                        <button onClick={() => this.props.createNewCard()}>
                            <i className="fas fa-check"></i>
                        </button>
                        <button onClick={() => this.props.unCreateCard()}>
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                    <textarea onChange={(e) => this.props.textStateCreate(e)}></textarea>
                </div>
            </div>
        );
    };
};
