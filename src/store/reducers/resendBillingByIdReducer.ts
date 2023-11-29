import { Billing } from "../../services/genesisApi/domain"
import { IAction } from "../sagas/interfaces"

export const Types = {
    RESEND_BILLING_BY_ID_REQUEST: 'GetBillingByIdReducer/RESEND_BILLING_BY_ID_REQUEST',
    RESEND_BILLING_BY_ID_SUCCESS: 'GetBillingByIdReducer/RESEND_BILLING_BY_ID_SUCCESS',
    RESEND_BILLING_BY_ID_FAILURE: 'GetBillingByIdReducer/RESEND_BILLING_BY_ID_FAILURE'
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

export default function ResendBillingByIdReducer(state = InitialState, action: IAction) {
    switch (action.type) {
        case Types.RESEND_BILLING_BY_ID_REQUEST:
            return {
                ...state,
                loading: true
            }
        case Types.RESEND_BILLING_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case Types.RESEND_BILLING_BY_ID_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                loading: false
            }
        default:
            return state;
    }
}

export const ResendBillingByIdActions = {
    execute: (billingId: string) => ({
        type: Types.RESEND_BILLING_BY_ID_REQUEST,
        payload: billingId
    }),
    success: (response: Billing) => ({
        type: Types.RESEND_BILLING_BY_ID_SUCCESS,
        payload: response
    }),
    failure: (error: string) => ({
        type: Types.RESEND_BILLING_BY_ID_FAILURE,
        payload: { error }
    })
}