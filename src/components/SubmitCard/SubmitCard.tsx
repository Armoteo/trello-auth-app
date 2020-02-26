import React from 'react';
import style from './SubmitCard.module.scss';

interface SubmitCardProps{

    createNewCard?: ()=> void;
    unCreateCard?: ()=> void;
    textStateCreate?: (data:any)=>void;
}

export class SubmitCard extends React.Component<SubmitCardProps> {
    render() {
        const {createNewCard, unCreateCard, textStateCreate} = this.props;
        return (
            <div className={style.Submit}>
                <div className={style.Container}>
                    <div>
                        <button onClick={createNewCard}>
                            <i className="fas fa-check"></i>
                        </button>
                        <button onClick={unCreateCard}>
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                    <textarea onChange={textStateCreate}></textarea>
                </div>
            </div>
        );
    };
};
