import { Billing } from "../../services/genesisApi/domain"
import { IAction } from "../sagas/interfaces"

export const Types = {
    GET_BILLING_BY_ID_REQUEST: 'GetBillingByIdReducer/GET_BILLING_BY_ID_REQUEST',
    GET_BILLING_BY_ID_SUCCESS: 'GetBillingByIdReducer/GET_BILLING_BY_ID_SUCCESS',
    GET_BILLING_BY_ID_FAILURE: 'GetBillingByIdReducer/GET_BILLING_BY_ID_FAILURE'
}

export const InitialState = {
    id: null,
    amount: null,
    image: null,
    content: null,
    description: null,
    status: null,
    errorMessage: null,
    isSuccessful: null,
    dueDate: null,
    loading: false,
    error: null
}

export default function GetBillingByIdReducer(state = InitialState, action: IAction) {
    switch (action.type) {
        case Types.GET_BILLING_BY_ID_REQUEST:
            return {
                ...state,
                loading: true
            }
        case Types.GET_BILLING_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case Types.GET_BILLING_BY_ID_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                loading: false
            }
        default:
            return state;
    }
}

export const GetBillingByIdActions = {
    execute: (billingId: string) => ({
        type: Types.GET_BILLING_BY_ID_REQUEST,
        payload: { id: billingId }
    }),
    success: (response: Billing) => ({
        type: Types.GET_BILLING_BY_ID_SUCCESS,
        payload: response
    }),
    failure: (error: string) => ({
        type: Types.GET_BILLING_BY_ID_FAILURE,
        payload: { error }
    })
}