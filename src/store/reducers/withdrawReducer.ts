export const Types = {
    CASHOUT_REQUEST: 'WithdrawReducer/AUTHENTICATE_REQUEST',
    CASHOUT_FAILURE: 'WithdrawReducer/AUTHENTICATE_FAILURE',
    CASHOUT_SUCCESS: 'WithdrawReducer/AUTHENTICATE_SUCCESS',

    SET_TRANSACTION_TYPE: 'WithdrawReducer/SET_TRANSACTION_TYPE'
}

export const InitialState = {
    transactionType: '',
    keyType: 0,
    keyValue: '',
    transactionValue: 0,
    error: null,
    loading: false
}

export default function UserReducer(state = InitialState, action: any) {
    switch (action.type) {
        case Types.CASHOUT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case Types.CASHOUT_SUCCESS:
            return {
                ...state,
                loading: false
            };
        case Types.CASHOUT_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                loading: false
            };
        case Types.SET_TRANSACTION_TYPE:
            return {
                ...state,
                isPix: action.payload.transactionType
            };
        default:
            return state;
    }
}

export const UserActions = {
    cashOutRequest: (user: string, password: string) => ({
        type: Types.CASHOUT_REQUEST,
        payload: { user, password }
    }),
    cashOutSuccess: (accessToken: string, expiresIn: number) => ({
        type: Types.CASHOUT_SUCCESS,
        payload: { accessToken, expiresIn }
    }),
    cashOutFailure: (error: string) => ({
        type: Types.CASHOUT_FAILURE,
        payload: { error }
    }),
    setTransactionType: (transactionType: string) => ({
        type: Types.CASHOUT_FAILURE,
        payload: { transactionType }
    })
}