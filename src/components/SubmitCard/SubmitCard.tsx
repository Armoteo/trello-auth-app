import React from 'react';
import style from './SubmitCard.module.scss';


export class SubmitCard extends React.Component<any> {

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
                    <textarea onChange={this.props.textStateCreate}></textarea>
                </div>
            </div>
        );
    };
};
