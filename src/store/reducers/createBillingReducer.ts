import { IAction } from "../sagas/interfaces"
import { CreateBillingRequest } from "../../services/genesisApi/requests"
import { CreateBillingResponse } from "../../services/genesisApi/responses"
import { ICreateBillingReducer } from "./interfaces";
import dayjs from 'dayjs';

export const Types = {
    CREATE_BILLING_REQUEST: 'CreateBillingReducer/CREATE_BILLING_REQUEST',
    CREATE_BILLING_FAILURE: 'CreateBillingReducer/CREATE_BILLING_FAILURE',
    CREATE_BILLING_SUCCESS: 'CreateBillingReducer/CREATE_BILLING_SUCCESS',
    CREATE_BILLING_RESET: 'CreateBillingReducer/CREATE_BILLING_RESET',
    CREATE_BILLING_RESEND: 'CreateBillingReducer/CREATE_BILLING_RESEND',

    SET_BILLING: 'CreateBillingReducer/UPDATE_BILLING_VALUE'
}

export const InitialState: ICreateBillingReducer = {
    title: '',
    amount: 0,
    description: '',
    customerName: '',
    customerDocument: '',
    customerPhoneNumber: '',
    dueDate: dayjs().add(1, 'day').format('YYYY-MM-DD 23:59:59'),
    loading: false,
    error: null,
    isSuccessful: false
}

export default function CreateBillingReducer(state = InitialState, action: IAction) {
    switch (action.type) {
        case Types.SET_BILLING:
            return {
                ...state,
                title: action.payload.title,
                amount: action.payload.amount,
                description: action.payload.description,
                customerName: action.payload.customerName,
                customerDocument: action.payload.customerDocument,
                customerPhoneNumber: action.payload.customerPhoneNumber,
                dueDate: action.payload.dueDate,
                loading: false
            }
        case Types.CREATE_BILLING_REQUEST:
            return {
                ...state,
                loading: true
            }
        case Types.CREATE_BILLING_SUCCESS:
            return {
                ...state,
                loading: false,
                isSuccessful: true
            }
        case Types.CREATE_BILLING_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                loading: false
            }
        case Types.CREATE_BILLING_RESET:
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

export const CreateBillingActions = {
    setBilling: (request: CreateBillingRequest) => ({
        type: Types.SET_BILLING,
        payload: request
    }),
    execute: (request: CreateBillingRequest) => ({
        type: Types.CREATE_BILLING_REQUEST,
        payload: request
    }),
    success: (response: CreateBillingResponse) => ({
        type: Types.CREATE_BILLING_SUCCESS,
        payload: response
    }),
    failure: (error: string) => ({
        type: Types.CREATE_BILLING_FAILURE,
        payload: { error }
    }),
    reset: () => ({
        type: Types.CREATE_BILLING_RESET,
        payload: null
    })
}