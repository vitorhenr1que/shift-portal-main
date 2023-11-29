import { CashOutRequest } from "../../services/genesisApi/requests"
import { BankAccount } from "../../services/genesisApi/domain"
import { IAction } from "../sagas/interfaces"
import { ICashoutReducer } from './interfaces'

export const Types = {
    CASH_OUT_REQUEST: 'CashOutReducer/CASH_OUT_REQUEST',
    CASH_OUT_SUCCESS: 'CashOutReducer/CASH_OUT_SUCCESS',
    CASH_OUT_FAILURE: 'CashOutReducer/CASH_OUT_FAILURE',
    CASH_OUT_RESET: 'CashOutReducer/CASH_OUT_RESET',

    SET_CASHOUT: 'CashOutReducer/SET_CASHOUT',
}

export const InitialState: ICashoutReducer = {
    companyId: 0,
    amount: 0,
    pixKey: '',
    pixType: 1,
    bankAccount: <BankAccount>{},
    loading: false,
    error: null,
    isSuccessful: false
}

export default function CashOutReducer(state = InitialState, action: IAction) {
    switch (action.type) {
        case Types.SET_CASHOUT:
            return {
                ...state,
                amount: action.payload.amount,
                pixKey: action.payload.pixKey,
                pixType: action.payload.pixType,
                bankAccount: action.payload.bankAccount,
            }
        case Types.CASH_OUT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case Types.CASH_OUT_SUCCESS:
            return {
                ...state,
                loading: false,
                isSuccessful: true
            }
        case Types.CASH_OUT_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                loading: false,
                isSuccessful: false
            }
        case Types.CASH_OUT_RESET:
            return {
                ...InitialState,
                error: null,
                isSuccessful: false,
                loading: false
            }
        default:
            return state;
    }
}

export const CashOutActions = {
    set: (request: CashOutRequest) => ({
        type: Types.SET_CASHOUT,
        payload: request
    }),
    execute: (request: CashOutRequest) => ({
        type: Types.CASH_OUT_REQUEST,
        payload: request
    }),
    success: () => ({
        type: Types.CASH_OUT_SUCCESS,
        payload: {}
    }),
    failure: (error: string) => ({
        type: Types.CASH_OUT_FAILURE,
        payload: { error }
    }),
    reset: () => ({
        type: Types.CASH_OUT_RESET,
        payload: null
    })
}
