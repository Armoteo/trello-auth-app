import * as React from "react";


interface Board {
    id: string;
    name: string;
    pinned: boolean;
    //опционально
    desc?: string;
}

interface AppState {
    token: string;
    board: Array<Board>;
}

// interface AppProps extends RouteComponentProps { }

export class App extends React.Component<any, AppState> {
    public state = {
        token: '',
        board: []
    };

    public render() {
        return (
            <div>
                <h2>Hello!</h2>
            </div>
        )
    }
}
