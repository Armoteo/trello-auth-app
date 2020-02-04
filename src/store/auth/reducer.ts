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
        default:
            return state;
    }
}