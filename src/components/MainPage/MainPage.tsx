import * as React from 'react';
import './MainPage.scss';
import { RouteChildrenProps } from 'react-router';


interface MainPageProps extends RouteChildrenProps {
    text?: string;
    token?: string;
}

export class MainPage extends React.Component<MainPageProps> {


    //go to  previous page
    goBack = () => {
        this.props.history.goBack();
    }

    render() {
        return (
            <div className="MainPage">
                <h2 onClick={this.goBack}>{this.props.text} TEST MAIN PAGE</h2>
            </div>
        )
    }

}