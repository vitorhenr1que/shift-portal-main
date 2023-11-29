import { IAction } from "../sagas/interfaces"
import { GetWithdrawRequest } from "../../services/genesisApi/requests"
import { WithdrawResult } from "../../services/genesisApi/domain"
import { IGetWithdrawsReducer } from "./interfaces"

export const Types = {
    GET_WITHDRAWS_REQUEST: 'GetWithdrawsReducer/GET_WITHDRAWS_REQUEST',
    GET_WITHDRAWS_SUCCESS: 'GetWithdrawsReducer/GET_WITHDRAWS_SUCCESS',
    GET_WITHDRAWS_FAILURE: 'GetWithdrawsReducer/GET_WITHDRAWS_FAILURE'
}

export const InitialState : IGetWithdrawsReducer = {
    withdraws: [],
    loading: false,
    error: null,
    isRequested: false
}

export default function GetWithdrawsReducer(state: IGetWithdrawsReducer = InitialState, action: IAction) {
    switch (action.type) {
        case Types.GET_WITHDRAWS_REQUEST:
            return {
                ...state,
                loading: true,
                isRequested: true
            }
        case Types.GET_WITHDRAWS_SUCCESS:
            return {
                ...action.payload,
                loading: false,
                isRequested: true
            }
        case Types.GET_WITHDRAWS_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                loading: false
            }
        default:
            return state;
    }
}

export const GetWithdrawsActions = {
    execute: (request: GetWithdrawRequest) => ({
        type: Types.GET_WITHDRAWS_REQUEST,
        payload: request
    }),
    success: (response: WithdrawResult) => ({
        type: Types.GET_WITHDRAWS_SUCCESS,
        payload: { withdraws: response.result }
    }),
    failure: (error: string) => ({
        type: Types.GET_WITHDRAWS_FAILURE,
        payload: { error }
    })
}
