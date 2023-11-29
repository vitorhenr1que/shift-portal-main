import { IAction } from "../sagas/interfaces"
import { Address, BankAccount, Company, Person, User } from "../../services/genesisApi/domain"
import { CreateAccountRequest } from "../../services/genesisApi/requests"
import { ICreateAccountReducer } from "./interfaces";

export const Types = {
    CREATE_ACCOUNT_REQUEST: 'CreateAccountReducer/CREATE_ACCOUNT_REQUEST',
    CREATE_ACCOUNT_FAILURE: 'CreateAccountReducer/CREATE_ACCOUNT_FAILURE',
    CREATE_ACCOUNT_SUCCESS: 'CreateAccountReducer/CREATE_ACCOUNT_SUCCESS',

    SET_ACCOUNT: 'CreateAccountReducer/SET_ACCOUNT'
}

export const InitialState: ICreateAccountReducer = {
    company: <Company>{},
    address: <Address>{},
    person: <Person>{},
    user: <User>{},
    bankAccount: <BankAccount>{ account: '000000', accountType: 'CC', bankCode: '001', branch: '0001'},
    loading: false,
    isSuccessful: false,
    error: null
}

export default function CreateAccountReducer(state = InitialState, action: IAction) {
    switch (action.type) {
        case Types.SET_ACCOUNT:
            return {
                ...state,
                company: action.payload.company,
                person: action.payload.person,
                user: action.payload.user,
                address: action.payload.address,
                bankAccount: action.payload.bankAccount,
                loading: false,
                error: false
            }
        case Types.CREATE_ACCOUNT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case Types.CREATE_ACCOUNT_SUCCESS:
            return {
                ...state,
                loading: false,
                isSuccessful: true
            }
        case Types.CREATE_ACCOUNT_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                loading: false,
                isSuccessful: false
            }
        default:
            return state
    }
}

export const CreateAccountActions = {
    set: (request: CreateAccountRequest) => ({
        type: Types.SET_ACCOUNT,
        payload: request
    }),
    execute: (request: CreateAccountRequest) => ({
        type: Types.CREATE_ACCOUNT_REQUEST,
        payload: request
    }),
    success: () => ({
        type: Types.CREATE_ACCOUNT_SUCCESS,
        payload: {}
    }),
    failure: (error: string) => ({
        type: Types.CREATE_ACCOUNT_FAILURE,
        payload: { error }
    })
}
