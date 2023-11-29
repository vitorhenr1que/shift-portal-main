import { IAction } from "../sagas/interfaces"
import { UpdatePasswordRequest } from "../../services/genesisApi/requests"

export const Types = {
    UPDATE_ACCOUNT_PASSWORD_REQUEST: 'UpdateAccountPasswordReducer/UPDATE_ACCOUNT_PASSWORD_REQUEST',
    UPDATE_ACCOUNT_PASSWORD_FAILURE: 'UpdateAccountPasswordReducer/UPDATE_ACCOUNT_PASSWORD_FAILURE',
    UPDATE_ACCOUNT_PASSWORD_SUCCESS: 'UpdateAccountPasswordReducer/UPDATE_ACCOUNT_PASSWORD_SUCCESS',
}

export const InitialState = {
    loading: false,
    error: null,
}

export default function updateAccountPasswordReducer(state = InitialState, action: IAction) {
    switch (action.type) {
        case Types.UPDATE_ACCOUNT_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true
            }
        case Types.UPDATE_ACCOUNT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case Types.UPDATE_ACCOUNT_PASSWORD_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                loading: false
            }
        default:
            return state
    }
}

export const UpdateAccountPasswordActions = {
    execute: (request: UpdatePasswordRequest) => ({
        type: Types.UPDATE_ACCOUNT_PASSWORD_REQUEST,
        payload: request
    }),
    success: () => ({
        type: Types.UPDATE_ACCOUNT_PASSWORD_SUCCESS,
        payload: {}
    }),
    failure: (error: string) => ({
        type: Types.UPDATE_ACCOUNT_PASSWORD_FAILURE,
        payload: { error }
    })
}
