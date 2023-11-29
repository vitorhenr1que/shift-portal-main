import { IAction } from "../sagas/interfaces"
import { GetBillingsRequest } from "../../services/genesisApi/requests"
import { Billing, BillingResult } from "../../services/genesisApi/domain"
import { IGetBillingsReducer } from "./interfaces"
import { act } from "@testing-library/react"

export const Types = {
    GET_BILLINGS_REQUEST: 'GetBillingsReducer/GET_BILLINGS_REQUEST',
    GET_BILLINGS_SUCCESS: 'GetBillingsReducer/GET_BILLINGS_SUCCESS',
    GET_BILLINGS_FAILURE: 'GetBillingsReducer/GET_BILLINGS_FAILURE'
}

export const InitialState : IGetBillingsReducer = {
    billings: [],
    loading: false,
    error: null,
    isRequested: false
}

export default function GetBillingsReducer(state = InitialState, action: IAction) {
    switch (action.type) {
        case Types.GET_BILLINGS_REQUEST:
            return {
                ...state,
                loading: true,
                isRequested: true
            }
        case Types.GET_BILLINGS_SUCCESS:
            return {
                ...action.payload,
                loading: false,
                isRequested: true
            }
        case Types.GET_BILLINGS_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                loading: false
            }
        default:
            return state;
    }
}

export const GetBillingsActions = {
    execute: (request: GetBillingsRequest) => ({
        type: Types.GET_BILLINGS_REQUEST,
        payload: request
    }),
    success: (response: BillingResult) => ({
        type: Types.GET_BILLINGS_SUCCESS,
        payload: { billings: response.result }
    }),
    failure: (error: string) => ({
        type: Types.GET_BILLINGS_FAILURE,
        payload: { error }
    })
}