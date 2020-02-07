import { ACTION_TYPES } from "./types"


export interface AuthState {
    token: string;
}

const INITIAL_STATE = {
    token: ''
};

export default (state: AuthState = INITIAL_STATE, { type, payload }: any) => {
    switch (type) {
        case ACTION_TYPES.SET_TOKEN:
            return { ...state, token: payload };
            case ACTION_TYPES.DELETE_TOKEN:
                return { ...state, token: '' };
        default:
            return state;
    }
}