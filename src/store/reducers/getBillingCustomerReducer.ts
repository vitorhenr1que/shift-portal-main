import { IAction } from "../sagas/interfaces"
import { GetBillingCustomerRequest } from "../../services/genesisApi/requests"
import { BillingCustomer } from "../../services/genesisApi/domain"

export const Types = {
    GET_BILLING_CUSTOMER_REQUEST: 'GetBillingCustomerReducer/GET_BILLING_CUSTOMER_REQUEST',
    GET_BILLING_CUSTOMER_SUCCESS: 'GetBillingCustomerReducer/GET_BILLING_CUSTOMER_SUCCESS',
    GET_BILLING_CUSTOMER_FAILURE: 'GetBillingCustomerReducer/GET_BILLING_CUSTOMER_FAILURE'
}

export const InitialState = {
    customers: null,
    loading: false,
    error: null
}

export default function GetBillingCustomerReducer(state = InitialState, action: IAction) {
    switch (action.type) {
        case Types.GET_BILLING_CUSTOMER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case Types.GET_BILLING_CUSTOMER_SUCCESS:
            return {
                ...state,
                billingCustomer: action.payload,
                loading: false
            }
        case Types.GET_BILLING_CUSTOMER_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                loading: false
            }
        default:
            return state;
    }
}

export const GetBillingCustomerActions = {
    execute: (request: GetBillingCustomerRequest) => ({
        type: Types.GET_BILLING_CUSTOMER_REQUEST,
        payload: request
    }),
    success: (response: BillingCustomer[]) => ({
        type: Types.GET_BILLING_CUSTOMER_SUCCESS,
        payload: { customers: response }
    }),
    failure: (error: string) => ({
        type: Types.GET_BILLING_CUSTOMER_FAILURE,
        payload: { error }
    })
}
