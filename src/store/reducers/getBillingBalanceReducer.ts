import { BillingBalance } from "../../services/genesisApi/domain"
import { applyCurrency } from "../../shared/utils"
import { IAction } from "../sagas/interfaces"
import { IGetBillingBalanceReducer } from "./interfaces"

export const Types = {
    GET_BILLING_BALANCE_REQUEST: 'GetBillingBalanceReducer/GET_BILLING_BALANCE_REQUEST',
    GET_BILLING_BALANCE_SUCCESS: 'GetBillingBalanceReducer/GET_BILLING_BALANCE_SUCCESS',
    GET_BILLING_BALANCE_FAILURE: 'GetBillingBalanceReducer/GET_BILLING_BALANCE_FAILURE'
}

export const InitialState: IGetBillingBalanceReducer = {
    totalReceivedAmount: 0,
    receivedAmount: 0,
    overDueAmount: 0,
    willReceiveAmount: 0,
    isRequested: false,
    loading: false,
    error: null
}

export default function GetBillingBalanceReducer(state: IGetBillingBalanceReducer = InitialState, action: IAction) {
    switch (action.type) {
        case Types.GET_BILLING_BALANCE_REQUEST:
            return {
                ...state,
                isRequested: true,
                loading: true
            }
        case Types.GET_BILLING_BALANCE_SUCCESS:
            return {
                ...state,
                totalReceivedAmount: applyCurrency(action.payload.totalReceivedAmount / 100, 'decimal'),
                receivedAmount: applyCurrency(action.payload.receivedAmount / 100, 'decimal'),
                overDueAmount: applyCurrency(action.payload.overDueAmount / 100, 'decimal'),
                willReceiveAmount: applyCurrency(action.payload.willReceiveAmount / 100, 'decimal'),
                loading: false
            }
        case Types.GET_BILLING_BALANCE_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                loading: false
            }
        default:
            return state;
    }
}

export const GetBillingBalanceActions = {
    execute: () => ({
        type: Types.GET_BILLING_BALANCE_REQUEST,
        payload: {}
    }),
    success: (response: BillingBalance) => {
        return {
            type: Types.GET_BILLING_BALANCE_SUCCESS,
            payload: response
        }
    },
    failure: (error: string) => ({
        type: Types.GET_BILLING_BALANCE_FAILURE,
        payload: { error }
    })
}