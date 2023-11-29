import { IAction } from "../sagas/interfaces"
import { GetAccountBalanceResponse } from "../../services/genesisApi/responses"
import { IGetAccountBalanceReducer } from "./interfaces"

export const Types = {
    GET_ACCOUNT_BALANCE_REQUEST: 'GetAccountBalanceReducer/GET_ACCOUNT_BALANCE_REQUEST',
    GET_ACCOUNT_BALANCE_FAILURE: 'GetAccountBalanceReducer/GET_ACCOUNT_BALANCE_FAILURE',
    GET_ACCOUNT_BALANCE_SUCCESS: 'GetAccountBalanceReducer/GET_ACCOUNT_BALANCE_SUCCESS'
}

export const InitialState: IGetAccountBalanceReducer = {
    balance: 0,
    isRequested: false,
    loading: false,
    error: null
}

export default function GetAccountBalanceReducer(state: IGetAccountBalanceReducer = InitialState, action: IAction) {
    switch (action.type) {
        case Types.GET_ACCOUNT_BALANCE_REQUEST:
            return {
                ...state,
                isRequested: true,
                loading: true
            }
        case Types.GET_ACCOUNT_BALANCE_SUCCESS:
            return {
                ...state,
                balance: action.payload.balance,
                loading: false
            }
        case Types.GET_ACCOUNT_BALANCE_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                loading: false
            }
        default:
            return state;
    }
}

export const GetAccountBalanceActions = {
    execute: () => ({
        type: Types.GET_ACCOUNT_BALANCE_REQUEST,
    }),
    success: (response: GetAccountBalanceResponse) => ({
        type: Types.GET_ACCOUNT_BALANCE_SUCCESS,
        payload: response
    }),
    failure: (error: string) => ({
        type: Types.GET_ACCOUNT_BALANCE_FAILURE,
        payload: { error }
    })
}