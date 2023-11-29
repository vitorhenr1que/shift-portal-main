import { User } from "../../services/genesisApi/domain";
import { LoginResponse } from "../../services/genesisApi/responses";
import { IAction } from "../sagas/interfaces";
import { IUserReducer } from "./interfaces";

export const Types = {
    AUTHENTICATE_REQUEST: 'UserReducer/AUTHENTICATE_REQUEST',
    AUTHENTICATE_FAILURE: 'UserReducer/AUTHENTICATE_FAILURE',
    AUTHENTICATE_SUCCESS: 'UserReducer/AUTHENTICATE_SUCCESS',
    AUTHENTICATE_LOGOUT: 'UserReducer/AUTHENTICATE_LOGOUT',

    REGISTER_REQUEST: 'UserReducer/REGISTER_REQUEST',
    REGISTER_FAILURE: 'UserReducer/REGISTER_FAILURE',
    REGISTER_SUCCESS: 'UserReducer/REGISTER_SUCCESS',

    SET_USER: 'UserReducer/UPDATE_USERNAME_VALUE',
}

export const InitialState: IUserReducer = {
    email: '',
    username: '',
    password: '',
    error: null,
    loading: false,
    isSuccessful: false
}

export default function UserReducer(state = InitialState, action: IAction) {
    switch (action.type) {
        case Types.SET_USER:
            return {
                ...state,
                email: action.payload.email,
                password: action.payload.password,
                loading: false,
                error: false
            }
        case Types.AUTHENTICATE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case Types.AUTHENTICATE_SUCCESS:
            localStorage.setItem('AUTHORIZATION_TOKEN', action.payload.accessToken);

            return {
                ...state,
                email: '',
                password: '',
                loading: false,
                isSuccessful: true
            };
        case Types.AUTHENTICATE_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                loading: false
            };
        case Types.REGISTER_REQUEST:
            return {
                ...state,
                loading: true
            };
        case Types.AUTHENTICATE_LOGOUT:
            localStorage.clear();

            return {
                ...state,
                email: '',
                password: '',
                loading: false,
                isSuccessful: false
            };
        case Types.REGISTER_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                expiresIn: action.payload.expiresIn,
                loading: false
            };
        case Types.REGISTER_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                loading: false
            };
        default:
            return state;
    }
}

export const UserActions = {
    setUser: (user: User) => ({
        type: Types.SET_USER,
        payload: user
    }),
    authenticate: (user: User) => ({
        type: Types.AUTHENTICATE_REQUEST,
        payload: user
    }),
    logout: () => ({
        type: Types.AUTHENTICATE_LOGOUT,
        payload: {}
    }),
    success: (response: LoginResponse) => ({
        type: Types.AUTHENTICATE_SUCCESS,
        payload: response
    }),
    failure: (error: string) => ({
        type: Types.AUTHENTICATE_FAILURE,
        payload: { error }
    }),
    registerRequest: (username: string, email: string, document: string, password: string) => ({
        type: Types.AUTHENTICATE_REQUEST,
        payload: { username, email, document, password }
    }),
    registerSuccess: () => ({
        type: Types.AUTHENTICATE_SUCCESS,
        payload: {}
    }),
    registerFailure: (error: string) => ({
        type: Types.AUTHENTICATE_FAILURE,
        payload: { error }
    })
}